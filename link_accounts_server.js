import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import { OAuth } from 'meteor/oauth'
import { Hook } from 'meteor/callback-hook'

/**
 * Hooks definition and registration
 */
Accounts._onLink = new Hook({
  bindEnvironment: false,
  debugPrintExceptions: 'onLink callback'
})
Accounts.onLink = (func) => Accounts._onLink.register(func)

Accounts._beforeLink = new Hook({
  bindEnvironment: false,
  debugPrintExceptions: 'beforeLink callback'
})
Accounts.beforeLink = (func) => Accounts._beforeLink.register(func)

Accounts._onUnlink = new Hook({
  bindEnvironment: false,
  debugPrintExceptions: 'onUnlink callback'
})
Accounts.onUnlink = (func) => Accounts._onUnlink.register(func)

Accounts.registerLoginHandler(function (options) {
  if (!options.link) return undefined

  check(options.link, {
    credentialToken: String,
    // When an error occurs while retrieving the access token, we store
    // the error in the pending credentials table, with a secret of
    // null. The client can call the login method with a secret of null
    // to retrieve the error.
    credentialSecret: Match.OneOf(null, String)
  })

  const result = OAuth.retrieveCredential(options.link.credentialToken, options.link.credentialSecret)
  if (!result) {
    return {
      type: 'link',
      error: new Meteor.Error(Accounts.LoginCancelledError.numericError, 'No matching link attempt found')
    }
  }

  if (result instanceof Error) throw result
  else return Accounts.LinkUserFromExternalService(result.serviceName, result.serviceData, result.options)
})

Meteor.methods({
  cordovaGoogle: function (serviceName, serviceData) {
    Accounts.LinkUserFromExternalService(serviceName, serviceData, {}) // passing empty object cause in any case it is not used
  }
})

Accounts.LinkUserFromExternalService = function (serviceName, serviceData, options) {
  options = { ...options }

  // We probably throw an error instead of call update or create here.
  if (!Meteor.userId()) return new Meteor.Error('You must be logged in to use LinkUserFromExternalService')

  if (serviceName === 'password' || serviceName === 'resume') { throw new Meteor.Error("Can't use LinkUserFromExternalService with internal service: " + serviceName) }
  if (!(serviceData.id || serviceData.userId)) { throw new Meteor.Error("'id' missing from service data for: " + serviceName) }

  const user = Meteor.user()

  if (!user) {
    return new Meteor.Error('User not found for LinkUserFromExternalService')
  }
  const checkExistingSelector = {}
  if (serviceData.userId) {
    serviceData.id = serviceData.userId
    delete serviceData.userId
  }
  checkExistingSelector['services.' + serviceName + '.id'] = serviceData.id

  const existingUsers = Meteor.users.find(checkExistingSelector).fetch()
  if (existingUsers.length) {
    existingUsers.forEach(function (existingUser) {
      if (existingUser._id !== Meteor.userId()) { throw new Meteor.Error('This social account is already in use by other user') }
    })
  }

  // we do not allow link another account from existing service.
  // TODO maybe we can override this?
  if (user.services && user.services[serviceName] && user.services[serviceName].id !== serviceData.id) {
    return new Meteor.Error('User can link only one account to service: ' + serviceName)
  } else {
    const setAttrs = {}

    // Before link hook
    Accounts._beforeLink.each(callback => {
      // eslint-disable-next-line standard/no-callback-literal
      callback({ type: serviceName, serviceData, user, serviceOptions: options })
      return true
    })

    Object.keys(serviceData).forEach(key => {
      setAttrs['services.' + serviceName + '.' + key] = serviceData[key]
    })

    Meteor.users.update(user._id, { $set: setAttrs })

    // On link hook
    Accounts._onLink.each(callback => {
      // eslint-disable-next-line standard/no-callback-literal
      callback({ type: serviceName, serviceData, user: Meteor.user(), serviceOptions: options })
      return true
    })

    return {
      type: serviceName,
      userId: user._id
    }
  }
}

Accounts.unlinkService = function (userId, serviceName, cb) {
  check(userId, Match.OneOf(String, Mongo.ObjectID))
  if (typeof serviceName !== 'string') {
    throw new Meteor.Error('Service name must be string')
  }
  const user = Meteor.users.findOne({ _id: userId })
  if (serviceName === 'resume' || serviceName === 'password') {
    throw new Meteor.Error('Internal services cannot be unlinked: ' + serviceName)
  }

  if (user.services[serviceName]) {
    const newServices = { ...user.services }
    delete newServices[serviceName]
    Meteor.users.update({ _id: user._id }, { $set: { services: newServices } }, function (result) {
      if (cb && typeof cb === 'function') {
        cb(result)
      }
    })
    // On unlink hook
    Accounts._onUnlink.each(callback => {
      // eslint-disable-next-line standard/no-callback-literal
      callback({ type: serviceName, user: Meteor.user() })
      return true
    })
  } else {
    throw new Meteor.Error(500, 'no service')
  }
}

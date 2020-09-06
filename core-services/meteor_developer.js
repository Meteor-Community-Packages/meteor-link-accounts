import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithMeteorDeveloperAccount = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['accounts-meteor-developer'] && !Package['meteor-developer-oauth']) {
    throw new Meteor.Error(403, 'Please include accounts-meteor-developer package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['meteor-developer-oauth'].MeteorDeveloperAccounts.requestCredential(options, credentialRequestCompleteCallback)
}

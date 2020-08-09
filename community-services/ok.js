import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithOk = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['mikepol:accounts-ok']) {
    throw new Meteor.Error(403, 'Please include mikepol:accounts-ok package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['mikepol:accounts-ok'].OK.requestCredential(options, credentialRequestCompleteCallback)
}

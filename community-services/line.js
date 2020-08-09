import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithLine = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['storyteller:accounts-line']) {
    throw new Meteor.Error(403, 'Please include storyteller:accounts-line package.')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['storyteller:accounts-line'].Line.requestCredential(options, credentialRequestCompleteCallback)
}

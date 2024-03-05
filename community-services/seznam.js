import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithSeznam = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (Package['storyteller:accounts-seznam']) {
    throw new Meteor.Error(403, 'Please include storyteller:accounts-seznam package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Package['storyteller:seznam-oauth']) {
    Package['storyteller:seznam-oauth'].Seznam.requestCredential(options, credentialRequestCompleteCallback)
  }
}

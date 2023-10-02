import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithBetapass = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(
      402,
      'Please login to an existing account before link.'
    )
  }
  if (!Package['storyteller:accounts-betapass']) {
    throw new Meteor.Error(
      403,
      'Please include storyteller:accounts-betapass package'
    )
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback =
    Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Package['storyteller:betapass-oauth']) {
    Package['storyteller:betapass-oauth'].Betapass.requestCredential(
      options,
      credentialRequestCompleteCallback
    )
  }
}

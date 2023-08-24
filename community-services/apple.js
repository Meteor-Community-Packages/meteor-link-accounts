import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

Meteor.linkWithApple = function (options, callback, nativeCallback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  const quavePackage = Package['quave:accounts-apple']
  const bigowlPackage = Package['bigowl:accounts-apple']
  if (!quavePackage && !bigowlPackage) {
    throw new Meteor.Error(403, 'Please include quave:accounts-apple or bigowl:accounts-apple package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  const nativeCredentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(nativeCallback || callback)

  quavePackage
    ? Package['quave:apple-oauth'].Apple.requestCredential(
      options,
      nativeCredentialRequestCompleteCallback,
      credentialRequestCompleteCallback
    )
    : bigowlPackage && Package['bigowl:apple-oauth'].Apple.requestCredential(
      options,
      credentialRequestCompleteCallback
    )
}

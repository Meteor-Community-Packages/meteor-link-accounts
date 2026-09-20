import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithNaver = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['storyteller:accounts-naver']) {
    throw new Meteor.Error(403, 'Please include storyteller:accounts-naver package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Package['storyteller:naver-oauth']) {
    Package['storyteller:naver-oauth'].Naver.requestCredential(options, credentialRequestCompleteCallback)
  }
}

import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithLinkedIn = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }

  if (!Package['pauli:linkedin-oauth']) {
    throw new Meteor.Error(403, 'Please include pauli:linkedin-oauth package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Package['pauli:linkedin-oauth']) {
    Package['pauli:linkedin-oauth'].Linkedin.requestCredential(options, credentialRequestCompleteCallback)
  }
}

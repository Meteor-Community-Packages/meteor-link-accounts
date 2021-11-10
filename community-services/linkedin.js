import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithLinkedIn = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }

  if (!Package['pauli:linkedin-oauth']) {
    throw new Meteor.Error(403, 'Please include pauli:linkedin-oauth package')
  }

  // Deprecation of jonperl:linkedin
  if (Package['jonperl:linkedin']) {
    console.warn('jonperl:linkedin has been deprecated in meteor linked accounts in favor of pauli:linkedin-oauth to keep up with linkedin api changes')
  }
  if (!Package['jonperl:linkedin'] && !Package['pauli:linkedin-oauth']) {
    throw new Meteor.Error(403, 'Please include pauli:linkedin-oauth package')
  }
  // End of deprecation messages

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Package['pauli:linkedin-oauth']) {
    Package['pauli:linkedin-oauth'].Linkedin.requestCredential(options, credentialRequestCompleteCallback)
  } else if (Package['jonperl:linkedin']) {
    Package['jonperl:linkedin'].LinkedIn.requestCredential(options, credentialRequestCompleteCallback)
  }
}

import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithTwitter = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }

  let twitterPackage
  if (Package.twitter) {
    twitterPackage = Package.twitter
  } else if (Package['twitter-oauth']) {
    twitterPackage = Package['twitter-oauth']
  }

  if (!Package['accounts-twitter'] && !twitterPackage) {
    throw new Meteor.Error(403, 'Please include accounts-twitter and twitter package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  twitterPackage.Twitter.requestCredential(options, credentialRequestCompleteCallback)
}

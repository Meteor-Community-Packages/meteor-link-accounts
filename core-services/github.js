import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithGithub = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['accounts-github'] && (!Package.github && !Package['github-oauth'])) {
    throw new Meteor.Error(403, 'Please include accounts-github and github package')
  }

  const githubOAuthPackageName = Package.github ? 'github' : 'github-oauth'

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package[githubOAuthPackageName].Github.requestCredential(options, credentialRequestCompleteCallback)
}

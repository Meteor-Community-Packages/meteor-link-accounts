import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithDiscord = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['lichthagel:accounts-discord']) {
    throw new Meteor.Error(403, 'Please include lichthagel:accounts-discord package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['lichthagel:discord-oauth'].Discord.requestCredential(options, credentialRequestCompleteCallback)
}

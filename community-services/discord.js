import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithDiscord = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['lichthagel:accounts-discord'] && !Package['storyteller:accounts-discord']) {
    throw new Meteor.Error(403, 'Please include lichthagel:accounts-discord or storyteller:accounts-discord package')
  }
  // TODO deprecate lichthagel:accounts-discord as it has not been updated in years and is not ready for Meteor 3

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Package['lichthagel:discord-oauth']) {
    Package['lichthagel:discord-oauth'].Discord.requestCredential(options, credentialRequestCompleteCallback)
  }
  if (Package['storyteller:discord-oauth']) {
    Package['storyteller:discord-oauth'].Discord.requestCredential(options, credentialRequestCompleteCallback)
  }
}

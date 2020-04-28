import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithSoundcloud = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['garbolino:accounts-soundcloud']) {
    throw new Meteor.Error(403, 'Please include garbolino:accounts-soundcloud package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['garbolino:accounts-soundcloud'].Soundcloud.requestCredential(options, credentialRequestCompleteCallback)
}

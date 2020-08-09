import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithSpotify = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['xinranxiao:spotify'] || !Package['xinranxiao:accounts-spotify']) {
    throw new Meteor.Error(403, 'Please include xinranxiao:meteor-spotify package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['xinranxiao:accounts-spotify'].Spotify.requestCredential(options, credentialRequestCompleteCallback)
}

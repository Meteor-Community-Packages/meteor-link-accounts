import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithGoogle = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['accounts-google'] && !Package.google) {
    throw new Meteor.Error(403, 'Please include accounts-google and google package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Meteor.isCordova) {
    window.plugins.googleplus.login(
      {},
      function (serviceData) {
        Meteor.call('cordovaGoogle', 'google', serviceData)
      },
      function (err) {
        callback(err)
      }
    )
  } else {
    Package['google-oauth'].Google.requestCredential(options, credentialRequestCompleteCallback)
  }
}

import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithVenmo = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['pcooney10:accounts-venmo']) {
    throw new Meteor.Error(403, 'Please include pcooney10:accounts-venmo package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['pcooney10:accounts-venmo'].Venmo.requestCredential(options, credentialRequestCompleteCallback)
}

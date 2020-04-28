import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithInstagram = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['bozhao:accounts-instagram']) {
    throw new Meteor.Error(403, 'Please include bozhao:accounts-instagram package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['bozhao:accounts-instagram'].Instagram.requestCredential(options, credentialRequestCompleteCallback)
}

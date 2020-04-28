import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithQq = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['leonzhang1109:accounts-qq']) {
    throw new Meteor.Error(403, 'Please include leonzhang1109:accounts-qq package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['leonzhang1109:accounts-qq'].Qq.requestCredential(options, credentialRequestCompleteCallback)
}

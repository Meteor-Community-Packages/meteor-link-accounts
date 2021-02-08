import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithOffice = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['lindoelio:accounts-office365'] && !Package['ermlab:accounts-office365']) {
    throw new Meteor.Error(403, 'Please include either lindoelio:accounts-office365 package or ermlab:accounts-office365 package.')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  if (Package['lindoelio:accounts-office365']) {
    Package['lindoelio:office365-oauth'].Office365.requestCredential(options, credentialRequestCompleteCallback)
  } else if (Package['ermlab:accounts-office365']) {
    Package['ermlab:office365-oauth'].Office365.requestCredential(options, credentialRequestCompleteCallback)
  }
}

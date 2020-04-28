import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.linkWithAngelList = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.')
  }
  if (!Package['nicolaiwadstrom:meteor-angellist'] || !Package['nicolaiwadstrom:meteor-accounts-angellist']) {
    throw new Meteor.Error(403, 'Please include nicolaiwadstrom:meteor-angellist package')
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback)
  Package['nicolaiwadstrom:meteor-accounts-angellist'].AngelList.requestCredential(
    options,
    credentialRequestCompleteCallback
  )
}

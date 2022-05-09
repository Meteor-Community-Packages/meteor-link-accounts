import { Meteor } from 'meteor/meteor'

Meteor.linkWithWeb3 = function (options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(
      402,
      'Please login to an existing account before link.'
    )
  }
  if (!Package['freedombase:web3-login']) {
    throw new Meteor.Error(
      403,
      'Please include freedombase:web3-login package.'
    )
  }

  if (!callback && typeof options === 'function') {
    callback = options
    options = null
  }

  // Since the flow for Web3 is different we are using a custom flow here.
  const credentialRequestCompleteCallback = (error, address) => {
    if (error.error === 403) {
      Meteor.call('bozhao:linkAccountsWeb3', address, callback)
    } else {
      throw error
    }
  }
  Package['freedombase:web3-login'].loginWithWeb3(
    credentialRequestCompleteCallback
  )
}

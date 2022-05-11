import { Meteor } from 'meteor/meteor'

/**
 *
 * @param options.linkMessage { String } Message to display on wallet confirmation
 * @param callback { Function }
 */
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
    if (error) {
      throw error
    }
    if (address) {
      Meteor.call('bozhao:linkAccountsWeb3', address, callback)
    }
  }
  Package['freedombase:web3-login'].loginWithWeb3(
    {
      loginMessage:
        options?.linkMessage ||
        `Please verify that you want to link your wallet to ${Meteor.absoluteUrl()}.`,
      onlyReturnAddress: true
    },
    credentialRequestCompleteCallback
  )
}

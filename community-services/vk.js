if (Meteor.isClient) {
  Meteor.linkWithVk = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['mrt:accounts-vk']) {
      throw new Meteor.Error(403, 'Please include mrt:accounts-vk package')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback =
      Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package['mrt:accounts-vk'].VK.requestCredential(options, credentialRequestCompleteCallback);
  };
}

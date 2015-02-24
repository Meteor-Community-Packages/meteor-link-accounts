if (Meteor.isClient) {
  Meteor.linkWithInstagram = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['bozhao:accounts-instagram']) {
      throw new Meteor.Error(403, 'Please include bozhao:accounts-instagram package')
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Instagram.requestCredential(options, credentialRequestCompleteCallback);
  };
}

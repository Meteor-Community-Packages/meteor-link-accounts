if (Meteor.isClient) {
  Meteor.linkWithFacebook = function (options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Facebook.requestCredential(credentialRequestCompleteCallback);
  };
}

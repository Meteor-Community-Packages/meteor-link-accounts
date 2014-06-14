if (Meteor.isClient) {
  Meteor.linkWithGoogle = function (options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Google.requestCredential(credentialRequestCompleteCallback);
  };
}

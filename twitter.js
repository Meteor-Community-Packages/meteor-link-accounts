if (Meteor.isClient) {
  Meteor.linkWithTwitter = function (options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Twitter.requestCredential(credentialRequestCompleteCallback);
  };
}

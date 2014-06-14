if (Meteor.isClient) {
  Meteor.linkWithGithub = function (options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Github.requestCredential(credentialRequestCompleteCallback);
  };
}

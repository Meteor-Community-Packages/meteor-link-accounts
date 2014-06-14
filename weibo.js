if (Meteor.isClient) {
  Meteor.linkWithWeibo = function (options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Weibo.requestCredential(credentialRequestCompleteCallback);
  };
}

if (Meteor.isClient) {
  Meteor.linkWithMeteorDeveloperAccount = function (options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    MeteorDeveloperAccounts.requestCredential(credentialRequestCompleteCallback);
  };
}

if(!Package['accounts-facebook']) return;

if (Meteor.isClient) {
  Meteor.linkWithFacebook = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback =
      Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Facebook.requestCredential(options, credentialRequestCompleteCallback);
  };
}

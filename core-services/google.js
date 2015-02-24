
if (Meteor.isClient) {
  Meteor.linkWithGoogle = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['accounts-google'] && !Package['google']) {
      throw new Meteor.Error(403, 'Please include accounts-google and google package')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package.google.Google.requestCredential(options, credentialRequestCompleteCallback);
  };
}

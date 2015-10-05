
if (Meteor.isClient) {
  Meteor.linkWithFacebook = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['accounts-facebook'] || !Package['facebook'] || !Package['particle4dev:cordova-fb']) {
      throw new Meteor.Error(403, 'Please include accounts-facebook and facebook package or cordova-fb package')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package.facebook.Facebook.requestCredential(options, credentialRequestCompleteCallback);
  };
}

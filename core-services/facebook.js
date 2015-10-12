
if (Meteor.isClient) {
  Meteor.linkWithFacebook = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if (Meteor.isCordova) {
      if (Meteor.isCordova() && !Package['btafel:accounts-facebook-cordova']) {
        throw new Meteor.Error(403, 'Please include btafel:accounts-facebook-cordova package or cordova-fb package')
      }
    } else {
      if(!Package['accounts-facebook'] || !Package['facebook']) {
        throw new Meteor.Error(403, 'Please include accounts-facebook and facebook package or cordova-fb package')
      }
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package.facebook.Facebook.requestCredential(options, credentialRequestCompleteCallback);
  };
}

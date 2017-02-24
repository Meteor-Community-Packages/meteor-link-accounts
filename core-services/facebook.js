
if (Meteor.isClient) {
  Meteor.linkWithFacebook = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    
    var facebookPackage;
    if (Package.facebook) {
      facebookPackge = Package.facebook;
    } else if (Package['facebook-oauth']) {
      facebookPackge = Package['facebook-oauth'];
    }
    
    if (Meteor.isCordova) {
      if (!Package['btafel:accounts-facebook-cordova']) {
        throw new Meteor.Error(403, 'Please include btafel:accounts-facebook-cordova package or cordova-fb package')
      }
    } else {
      if (!Package['accounts-facebook'] || !facebookPackge) {
        throw new Meteor.Error(403, 'Please include accounts-facebook and facebook-oauth package or cordova-fb package')
      }
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    facebookPackage.Facebook.requestCredential(options, credentialRequestCompleteCallback);
  };
}

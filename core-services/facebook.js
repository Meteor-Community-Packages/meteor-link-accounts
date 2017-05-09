if (Meteor.isClient) {
  Meteor.linkWithFacebook = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }

    var facebookPackage;
    if (Package.facebook) {
      facebookPackage = Package.facebook;
    } else if (Package['facebook-oauth']) {
      facebookPackage = Package['facebook-oauth'];
    }

    //if (Meteor.isCordova) {
    // Meteor.isCordova is broken on Ionic 2 + meteor-client-bundle
    if (typeof facebookConnectPlugin != "undefined") {
      if (!Package['btafel:accounts-facebook-cordova']) {
        throw new Meteor.Error(403, 'Please include btafel:accounts-facebook-cordova package or cordova-fb package')
      }
    } else {
      if ((!Package['accounts-facebook'] && !Package['btafel:accounts-facebook-cordova']) || !facebookPackage) {
        throw new Meteor.Error(403, 'Please include accounts-facebook and facebook-oauth package or cordova-fb package')
      }
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);

    var fbLoginSuccess = function (data) {
      data.cordovaLink = true;

      Accounts.callLoginMethod({
        methodArguments: [data],
        userCallback: callback
      });
    };

    if (typeof facebookConnectPlugin != "undefined" && (Meteor.settings || options)) {
      facebookConnectPlugin.getLoginStatus(
        function (response) {
          if (response.status != "connected") {
            facebookConnectPlugin.login(options.requestPermissions || Meteor.settings.public.facebook.permissions,
              fbLoginSuccess,
              function (error) {
                callback(new Meteor.Error(500, error));
              }
            );
          } else {
            fbLoginSuccess(response);
          }
        },
        function (error) {
          callback(new Meteor.Error(500, error));
        }
      );
    } else {
      facebookPackage.Facebook.requestCredential(options, credentialRequestCompleteCallback);
    }
  };
}

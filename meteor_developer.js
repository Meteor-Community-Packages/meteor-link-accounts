
if (Meteor.isClient) {
  Meteor.linkWithMeteorDeveloperAccount = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['accounts-meteor-developer'] && !Package['meteor-developer']) {
      throw new Meteor.Error(403, 'Please include accounts-meteor-developer and meteor-developer package')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package['meteor-developer'].MeteorDeveloperAccounts.requestCredential(options, credentialRequestCompleteCallback);
  };
}

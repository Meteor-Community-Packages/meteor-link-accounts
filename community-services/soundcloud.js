if (Meteor.isClient) {
  Meteor.linkWithSoundcloud = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['garbolino:accounts-soundcloud']) {
      throw new Meteor.Error(403, 'Please include garbolino:accounts-soundcloud package')
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Soundcloud.requestCredential(options, credentialRequestCompleteCallback);
  };
}



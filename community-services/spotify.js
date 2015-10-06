if (Meteor.isClient) {
  Meteor.linkWithSpotify = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if (!Package['xinranxiao:meteor-spotify'] || !Package['xinranxiao:accounts-spotify'] ) {
      throw new Meteor.Error(403, 'Please include xinranxiao:meteor-spotify package')
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Spotify.requestCredential(options, credentialRequestCompleteCallback);
  };
}

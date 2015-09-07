if (Meteor.isClient) {
  Meteor.linkWithTwitch = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['jameslefrere:accounts-twitch'] && !['jameslefrere:twitch']) {
      throw new Meteor.Error(403, 'Please include jameslefrere:accounts-twitch and jameslefrere:twitch packages')
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package['jameslefrere:twitch'].Twitch.requestCredential(options, credentialRequestCompleteCallback);
  };
}

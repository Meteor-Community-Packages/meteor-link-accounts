if (Meteor.isClient) {
  Meteor.linkWithLine = function(options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if (!Package['storyteller:accounts-line']) {
      throw new Meteor.Error(403, 'Please include storyteller:accounts-line package.');
    }

    if (!callback && typeof options === 'function') {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Line.requestCredential(options, credentialRequestCompleteCallback);
  };
}

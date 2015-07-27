if (Meteor.isClient) {
  Meteor.linkWithLinkedIn = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['jonperl:accounts-linkedin']) {
      throw new Meteor.Error(403, 'Please include jonperl:accounts-linkedin package')
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    LinkedIn.requestCredential(options, credentialRequestCompleteCallback);
  };
}

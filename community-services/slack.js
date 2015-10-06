if (Meteor.isClient) {
  Meteor.linkWithSlack = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if (!Package['acemtp:accounts-slack']) {
      throw new Meteor.Error(403, 'Please include acemtp:accounts-slack package')
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Slack.requestCredential(options, credentialRequestCompleteCallback);
  };
}

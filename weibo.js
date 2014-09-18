if(!Package['accounts-weibo']) return;

if (Meteor.isClient) {
  Meteor.linkWithWeibo = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Weibo.requestCredential(options, credentialRequestCompleteCallback);
  };
}

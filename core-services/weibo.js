if (Meteor.isClient) {
  Meteor.linkWithWeibo = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['accounts-weibo'] && !Package['weibo']) {
      throw new Meteor.Error(403, 'Please include accounts-weibo and weibo package')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package.weibo.Weibo.requestCredential(options, credentialRequestCompleteCallback);
  };
}

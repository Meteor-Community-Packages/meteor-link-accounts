if (Meteor.isClient) {
  Meteor.linkWithAngelList = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['nicolaiwadstrom:meteor-angellist']) {
      throw new Meteor.Error(403, 'Please include nicolaiwadstrom:meteor-angellist package')
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    AngelList.requestCredential(options, credentialRequestCompleteCallback);
  };
}

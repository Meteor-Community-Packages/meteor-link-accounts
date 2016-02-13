if (Meteor.isClient) {
  Meteor.linkWithEdmodo = function (options, callback) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if (! Package['merlin:accounts-edmodo'] && ! Package['merlin:edmodo']) {
      throw new Meteor.Error(403, 'Please include merlin:accounts-edmodo and merlin:edmodo package');
    }
    if (! callback && typeof options === 'function') {
      callback = options;
      options = null;
    }
  
    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Edmodo.requestCredential(options, credentialRequestCompleteCallback);
  };
}

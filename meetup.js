if (Meteor.isClient) {
  Meteor.linkWithMeetup = function (options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Meetup.requestCredential(credentialRequestCompleteCallback);
  };
}

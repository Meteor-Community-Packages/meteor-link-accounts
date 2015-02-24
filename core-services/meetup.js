
if (Meteor.isClient) {
  Meteor.linkWithMeetup = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['accounts-meetup'] && !Package['meetup']) {
      throw new Meteor.Error(403, 'Please include accounts-meetup and meetup package')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package.meetup.Meetup.requestCredential(options, credentialRequestCompleteCallback);
  };
}

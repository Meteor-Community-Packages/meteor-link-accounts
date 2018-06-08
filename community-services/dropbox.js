import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
  Meteor.linkWithDropbox = function(options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if (!Package['gcampax:dropbox-oauth']) {
      throw new Meteor.Error(403, 'Please include gcampax:dropbox-oauth package');
    }

    if (!callback && typeof options === 'function') {
      callback = options;
      options = null;
    }

    const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package['gcampax:dropbox-oauth'].DropboxOAuth.requestCredential(options, credentialRequestCompleteCallback);
  };
}

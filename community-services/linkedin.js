import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.linkWithLinkedIn = function(options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.');
  }
  if (!Package['jonperl:linkedin']) {
    throw new Meteor.Error(403, 'Please include jonperl:linkedin package');
  }

  if (!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
  Package['jonperl:linkedin'].LinkedIn.requestCredential(options, credentialRequestCompleteCallback);
};

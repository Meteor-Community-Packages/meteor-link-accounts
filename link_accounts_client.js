import { Accounts } from 'meteor/accounts-base';
import 'core-services/meteor_developer.js';
import 'core-services/facebook.js';
import 'core-services/github.js';
import 'core-services/google.js';
import 'core-services/meetup.js';
import 'core-services/twitter.js';
import 'core-services/weibo.js';
import 'community-services/angellist.js';
import 'community-services/dropbox.js';
import 'community-services/discord.js';
import 'community-services/edmodo.js';
import 'community-services/instagram.js';
import 'community-services/linkedin.js';
import 'community-services/mailru.js';
import 'community-services/qq.js';
import 'community-services/ok.js';
import 'community-services/slack.js';
import 'community-services/spotify.js';
import 'community-services/soundcloud.js';
import 'community-services/twitch.js';
import 'community-services/venmo.js';
import 'community-services/vk.js';
import 'community-services/wechat.js';
import 'community-services/line.js';

Accounts.oauth.tryLinkAfterPopupClosed = function(credentialToken, callback) {
  const credentialSecret = OAuth._retrieveCredentialSecret(credentialToken);
  Accounts.callLoginMethod({
    methodArguments: [
      {
        link: {
          credentialToken: credentialToken,
          credentialSecret: credentialSecret
        }
      }
    ],
    userCallback:
      callback &&
      function(err) {
        // Allow server to specify a specify subclass of errors. We should come
        // up with a more generic way to do this!
        if (err && err instanceof Meteor.Error && err.error === Accounts.LoginCancelledError.numericError) {
          callback(new Accounts.LoginCancelledError(err.details));
        } else {
          callback(err);
        }
      }
  });
};

Accounts.oauth.linkCredentialRequestCompleteHandler = function(callback) {
  return function(credentialTokenOrError) {
    if (credentialTokenOrError && credentialTokenOrError instanceof Error) {
      callback && callback(credentialTokenOrError);
    } else {
      Accounts.oauth.tryLinkAfterPopupClosed(credentialTokenOrError, callback);
    }
  };
};

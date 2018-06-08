import { Accounts } from 'meteor/accounts-base';
// TODO figure out a nice way to import services

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

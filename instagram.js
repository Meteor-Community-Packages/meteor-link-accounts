<<<<<<< HEAD

=======
>>>>>>> Add link with instagram
if (Meteor.isClient) {
  Meteor.linkWithInstagram = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['bozhao:accounts-instagram']) {
<<<<<<< HEAD
      throw new Meteor.Error(403, 'Please include bozhao:accounts-vk package')
    }

    if (!callback && typeof options === "function") {
=======
      throw new Meteor.Error(403, 'Please include bozhao:accounts-instagram package')
    }

    if (! callback && typeof options === "function") {
>>>>>>> Add link with instagram
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
<<<<<<< HEAD
    Package['bozhao:accounts-instagram'].Instagram.requestCredential(options, credentialRequestCompleteCallback);
=======
    Instagram.requestCredential(options, credentialRequestCompleteCallback);
>>>>>>> Add link with instagram
  };
}

if (Meteor.isClient) {
    Meteor.linkWithMailru = function (options, callback) {
        if (!Meteor.userId()) {
            throw new Meteor.Error(402, 'Please login to an existing account before link.');
        }
        if(!Package['mikepol:accounts-mailru']) {
            throw new Meteor.Error(403, 'Please include mikepol:accounts-mailru package')
        }

        if (!callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
        Package['mikepol:accounts-mailru'].Mailru.requestCredential(options, credentialRequestCompleteCallback);
    };
}

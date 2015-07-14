if (Meteor.isClient) {
    Meteor.linkWithLinkedIn = function (options, callback) {
        if (!Meteor.userId()) {
            throw new Meteor.Error(402, 'Please login to an existing account before link.');
        }
        if(!Package['pauli:linkedin']) {
            throw new Meteor.Error(403, 'Please include pauli:linkedin package')
        }

        if (!callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
        Package['pauli:linkedin'].LinkedIn.requestCredential(options, credentialRequestCompleteCallback);
    };
}

Accounts.registerLoginHandler(function (options) {
  if (!options.link)
    return undefined;

  check(options.link, {
    credentialToken: String,
    // When an error occurs while retrieving the access token, we store
    // the error in the pending credentials table, with a secret of
    // null. The client can call the login method with a secret of null
    // to retrieve the error.
    credentialSecret: Match.OneOf(null, String)
  });

  var result = OAuth.retrieveCredential(options.link.credentialToken,
                                        options.link.credentialSecret);
  if (!result) {
    return { type: "link",
             error: new Meteor.Error(
               Accounts.LoginCancelledError.numericError,
               "No matching link attempt found") };
  }

  if (result instanceof Error)
    throw result;
  else
    return Accounts.LinkUserFromExternalService(
      result.serviceName, result.serviceData, result.options);
});

Accounts.registerLoginHandler(function(loginRequest) {
  if(!loginRequest.cordovaLink) {
    return undefined;
  }

  loginRequest = loginRequest.authResponse;

  var whitelisted = ['id', 'email', 'name', 'first_name',
    'last_name', 'link', 'gender', 'locale', 'age_range'];

  var identity = getIdentity(loginRequest.accessToken, whitelisted);

  var profilePicture = getProfilePicture(loginRequest.accessToken);

  var serviceData = {
    accessToken: loginRequest.accessToken,
    expiresAt: (+new Date) + (1000 * loginRequest.expiresIn)
  };


  var fields = _.pick(identity, whitelisted);
  _.extend(serviceData, fields);

  var options = {profile: {}};
  var profileFields = _.pick(identity, Meteor.settings.public.facebook.profileFields);
  _.extend(options.profile, profileFields);

  options.profile.avatar = profilePicture;

  return Accounts.LinkUserFromExternalService("facebook", serviceData, options);
  //return Accounts.updateOrCreateUserFromExternalService("facebook", serviceData, options);

});

var getIdentity = function (accessToken, fields) {
  try {
    return HTTP.get("https://graph.facebook.com/me", {
      params: {
        access_token: accessToken,
        fields: fields.join(",")
      }
    }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Facebook. " + err.message),
      {response: err.response});
  }
};

var getProfilePicture = function (accessToken) {
  try {
    return HTTP.get("https://graph.facebook.com/v2.0/me/picture/?redirect=false", {
      params: {access_token: accessToken}}).data.data.url;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Facebook. " + err.message),
      {response: err.response});
  }
};

Accounts.LinkUserFromExternalService = function (serviceName, serviceData, options) {
  options = _.clone(options || {});

  //We probably throw an error instead of call update or create here.
  if (!Meteor.userId())
    return new Meteor.Error("You must be logged in to use LinkUserFromExternalService");

  if (serviceName === "password" || serviceName === "resume")
    throw new Meteor.Error(
      "Can't use LinkUserFromExternalService with internal service: "
        + serviceName);
  if (!_.has(serviceData, 'id'))
    throw new Meteor.Error(
      "'id' missing from service data for: " + serviceName);

  var user = Meteor.user();

  if (!user) {
    return new Meteor.Error('User not found for LinkUserFromExternalService');
  }
  var checkExistingSelector = {};
  checkExistingSelector['services.' + serviceName + '.id'] = serviceData.id;
  var existingUsers = Meteor.users.find(checkExistingSelector).fetch();
  if (existingUsers.length) {
    existingUsers.forEach(function(existingUser) {
      if (existingUser._id !== Meteor.userId())
        throw new Meteor.Error('This social account is already in use by other user');
    });
  }

  //we do not allow link another account from existing service.
  //XXX maybe we can override this?
  if (user.services && user.services[serviceName] &&
      user.services[serviceName].id !== serviceData.id) {

    return new Meteor.Error('User can link only one account to service: ' + serviceName);
  } else {
    var setAttrs = {};
    _.each(serviceData, function(value, key) {
      setAttrs["services." + serviceName + "." + key] = value;
    });

    Meteor.users.update(user._id, {$set: setAttrs});
    return {
      type: serviceName,
      userId: user._id
    };
  }
};

Accounts.unlinkService = function (userId, serviceName, cb) {
  check(userId, Match.OneOf(String, Mongo.ObjectID));
  if (typeof serviceName !== 'string') {
    throw new Meteor.Error('Service name must be string');
  }
  var user = Meteor.users.findOne({_id: userId});
  if (serviceName === 'resume' || serviceName === 'password') {
    throw new Meteor.Error('Interal services cannot be unlinked: ' + serviceName);
  }

  if (user.services[serviceName]) {
    var newServices = _.omit(user.services, serviceName);
    Meteor.users.update({_id: user._id}, {$set: {services: newServices}}, function (result) {
      if (cb && typeof cb === 'function') {
        cb(result);
      }
    });
  } else {
    throw new Meteor.Error(500, 'no service');
  }
};

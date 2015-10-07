if (Meteor.isClient) {
  Template.linkTemplate.events({
    'click .link-github': function () {
      Meteor.linkWithGithub();
    },
    'click .unlink-github': function () {
      Meteor.call('_accounts/unlink/service', Meteor.userId(), 'github');
    }
  });

  Template.linkTemplate.helpers({
    services: function () {
      var user = Meteor.user(); 
      if (user) {
        return _.keys(user.services);
      } else {
        return;
      }
    }
  });
}

if (Meteor.isServer) {
  //XXX input your api keys here or follow the onscreen popup  instructions
  /*
  ServiceConfiguration.configurations.upsert({service: 'github'}, {
    $set: {
      clientId: 'CLIENT_ID',
      secret: 'SECRET',
      loginStyle: 'popup'
    }
  });


  ServiceConfiguration.configurations.upsert({service: 'twitter'}, {
    $set: {
      api_key: 'API_KEY',
      api_secret: 'API_SECRET'
    }
  });
  */
}

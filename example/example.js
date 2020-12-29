import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating'

if (Meteor.isClient) {
  Template.linkTemplate.events({
    'click .link-github': function () {
      Meteor.linkWithGithub()
    },
    'click .unlink-github': function () {
      Meteor.call('_accounts/unlink/service', Meteor.userId(), 'github')
    }
  })

  Template.linkTemplate.helpers({
    services: function () {
      const user = Meteor.user()
      if (user) {
        return Object.keys(user.services)
      }
    }
  })
}

if (Meteor.isServer) {
  // XXX input your api keys here or follow the onscreen popup  instructions
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
  Meteor.methods({
    '_accounts/unlink/service': function (userId, serviceName) {
      Accounts.unlinkService(userId, serviceName)
    }
  })
}

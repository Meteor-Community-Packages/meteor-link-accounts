if (Meteor.isClient) {
  Template.linkTemplate.events({
    'click .link-github': function () {
      Meteor.linkWithGithub();
    }
  });

  Template.linkTemplate.helpers({
    services: function () {
      var user = Meteor.user();
      if (user) {
        var services = _.keys(user.services);
        return services;
      } else {
        return;
      }
    }
  });
}

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
        return _.keys(user.services);
      } else {
        return;
      }
    }
  })
}

#Meteor Link Accounts
A Meteor package designed to links social network accounts without any hassles.

##Goals
* Link additional social network accounts.
* Don't modify any Meteor core packages.
* Don't force users to add additional Meteor packages that they are not going to
  use.

##Usage
Call Meteor.linkWith[ServiceName] in place instead of loginWith


For github, if you run into the issue.

        Uncaught TypeError: Cannot read property 'redirectUrl' of undefinedGithub.requestCredential

You can use  Meteor.linkWithGithub({"redirectUrl": "redirect URL"});

##Design:
1. Piggyback on existing Meteor oauth login system. Use login handler.

2. We do not allow link different account from same service for now. For example, you
   could not link with 2 different github accounts.

3. Save the linked service info on user.services, instead of creating new field
   on user object.  This allow user logins the application from linked services.

##Support social accounts
* facebook
* github
* meteor developer accounts
* google
* twitter
* meetup
* weibo
* instagram
* linkedin
* angel list
* soundcloud
* twitch
* ok
* vk
* mailru

##Support Accounts Package
* accounts-meteor-developer
* accounts-github
* accounts-facebook
* particle4dev:cordova-fb
* accounts-google
* accounts-twitter
* accounts-meetup
* accounts-weibo
* bozhao:accounts-instagram
* mrt:accounts-vk
* mikepol:accounts-ok
* mikepol:accounts-mailru
* jonperl:accounts-linkedin
* garbolino:accounts-soundcloud
* jameslefrere:accounts-twitch
* nicolaiwadstrom:meteor-angellist
##License
MIT

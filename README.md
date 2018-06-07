# Meteor Link Accounts
A Meteor package designed to links social network accounts without any hassles.

## Next Steps
* Look into work with Apollo (graphQL)
* Look into merge into meteor/accounts.
* Update to be more open and catch up to current state of Javascript

## Goals
* Link additional social network accounts.
* Don't modify any Meteor core packages.
* Don't force users to add additional Meteor packages that they are not going to
  use.

## Usage
* Call Meteor.linkWith[ServiceName] in place instead of loginWith.  (client side)
* For unlink, Use Accounts.unlinkService(userId, serviceName).  (server side)

## Design notes:
1. Piggyback on existing Meteor oauth login system. Use login handler.

2. We do not allow link different account from same service for now. For example, you
   could not link with 2 different github accounts.

3. Save the linked service info on user.services, instead of creating new field
   on user object.  This allow user logins the application from linked services.

4. Don't create a temporary user account and then merge it.

## Support Accounts Package

### Official packages
* accounts-meteor-developer
* accounts-github
* accounts-facebook
* accounts-google
* accounts-twitter
* accounts-meetup
* accounts-weibo

### Community packages
* btafel:accounts-facebook-cordova
* bozhao:accounts-instagram
* mrt:accounts-vk
* mikepol:accounts-ok
* mikepol:accounts-mailru
* jonperl:accounts-linkedin
* garbolino:accounts-soundcloud
* alexbeauchemin:accounts-twitch
* nicolaiwadstrom:meteor-angellist
* acemtp:meteor-slack
* xinranxiao:meteor-spotify
* gcampax:accounts-dropbox
* pcooney10:accounts-venmo
* leonzhang1109:accounts-wechat
* leonzhang1109:accounts-qq
* storyteller:accounts-line

## License
MIT

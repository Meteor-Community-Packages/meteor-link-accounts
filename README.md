# Meteor Link Accounts

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

A [Meteor package](https://atmospherejs.com/bozhao/link-accounts) designed to links social network accounts without any hassles.

## Goals
* Link additional social network accounts.
* Don't modify any Meteor core packages.
* Don't force users to add additional Meteor packages that they are not going to use.

## Install
Install in Meteor with:

```bash
meteor add bozhao:link-accounts
```

## Usage
### Client side
#### Meteor.linkWith[ServiceName](options, callback)
You will call this on the page where you allow your users to connect to other services. This method will be triggered after they click the appropriate connect button.

`options` is expecting configuration object. Most often that is going to be: `{ loginStyle: 'popup' }`

##### `freedombase:web3-login`
The `options` object accepts `linkMessage` key where you can set message for signature.

### Server side
#### Accounts.unlinkService(userId, serviceName)
Given the `userId` and the name of the service (`serviceName`) as it is named in the user document (most often lower case name of the service).

### Hooks
There are 3 hooks available to you on the server at various time during the link process. All are triggered on the server side.
#### Accounts.beforeLink
Called before user account is linked with service. The hook will receive object with the following parameters:
* `type` - service name
* `serviceData` - data received from the service provider
* `user` - current user object
* `serviceOptions` - options that were used to call the service

If you return false the linking will be interrupted. 

#### Accounts.onLink
Called after user has been linked with a service. The hook will receive object with the following parameters:
* `type` - service name
* `serviceData` - data received from the service provider
* `user` - updated user object
* `serviceOptions` - options that were used to call the service

#### Accounts.onUnlink
Called after user is unlinking the service. The hook will receive object with the following parameters:
* `type` - service name that was unlinked
* `user` - user object before unlinking

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
* pauli:linkedin-oauth
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
* lindoelio:accounts-office365 / ermlab:accounts-office365
* quave:accounts-apple / bigowl:accounts-apple
* freedombase:web3-login
* storyteller:accounts-discord

## License
MIT

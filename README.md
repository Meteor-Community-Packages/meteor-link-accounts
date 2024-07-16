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
   could not link with 2 different Github accounts.

3. Save the linked service info on user.services, instead of creating new field
   on user object. This allows user logins the application from linked services.

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

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yubozhao"><img src="https://avatars1.githubusercontent.com/u/670949?s=460&v=4?s=100" width="100px;" alt="Yu Bozhao"/><br /><sub><b>Yu Bozhao</b></sub></a><br /><a href="https://github.com/Meteor-Community-Packages/template-package/commits?author=yubozhao" title="Code">💻</a> <a href="https://github.com/Meteor-Community-Packages/template-package/commits?author=yubozhao" title="Documentation">📖</a> <a href="#maintenance-yubozhao" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/StorytellerCZ"><img src="https://avatars2.githubusercontent.com/u/1715235?v=4?s=100" width="100px;" alt="Jan Dvorak"/><br /><sub><b>Jan Dvorak</b></sub></a><br /><a href="https://github.com/Meteor-Community-Packages/template-package/commits?author=StorytellerCZ" title="Code">💻</a> <a href="https://github.com/Meteor-Community-Packages/template-package/commits?author=StorytellerCZ" title="Documentation">📖</a> <a href="#maintenance-StorytellerCZ" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jankuester.com/"><img src="https://avatars.githubusercontent.com/u/1135285?v=4?s=100" width="100px;" alt="Jan Küster"/><br /><sub><b>Jan Küster</b></sub></a><br /><a href="#maintenance-jankapunkt" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

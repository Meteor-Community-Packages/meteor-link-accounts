Package.describe({
  summary: 'Meteor external service link system',
  version: '3.0.0-beta.0',
  git: 'https://github.com/Meteor-Community-Packages/meteor-link-accounts',
  name: 'bozhao:link-accounts',
  description: 'Link social accounts for Meteor'
})
Package.onUse(function (api) {
  api.versionsFrom(['3.0-beta.0'])

  api.imply('accounts-base', ['client', 'server'])
  api.use(['ecmascript', 'check', 'accounts-oauth', 'oauth'])
  api.use('callback-hook', 'server')

  api.mainModule('link_accounts_client.js', 'client')
  api.mainModule('link_accounts_server.js', 'server')
})

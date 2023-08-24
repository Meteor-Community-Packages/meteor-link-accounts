Package.describe({
  summary: 'Meteor external service link system',
  version: '2.8.0-alpha.1',
  git: 'https://github.com/yubozhao/meteor-link-accounts',
  name: 'bozhao:link-accounts',
  description: 'Link social accounts for Meteor'
})
Package.onUse(function (api) {
  api.versionsFrom(['2.9.1', '3.0-alpha.11'])

  api.imply('accounts-base', ['client', 'server'])
  api.use(['ecmascript', 'check', 'accounts-oauth', 'oauth'])
  api.use('callback-hook', 'server')

  api.mainModule('link_accounts_client.js', 'client')
  api.mainModule('link_accounts_server.js', 'server')
})

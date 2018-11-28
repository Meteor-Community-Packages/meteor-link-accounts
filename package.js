Package.describe({
  summary: 'Meteor external service link system',
  version: '2.0.2',
  git: 'https://github.com/yubozhao/meteor-link-accounts',
  name: 'bozhao:link-accounts',
  description: 'Link social accounts for Meteor'
});
Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.3');

  api.imply('accounts-base', ['client', 'server']);
  api.use(['ecmascript', 'check', 'accounts-oauth', 'oauth']);

  api.mainModule('link_accounts_client.js', 'client');
  api.mainModule('link_accounts_server.js', 'server');
});

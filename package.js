Package.describe({
  summary: 'Meteor external service link system',
  version: '2.0.0',
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
  api.addFiles(
    [
      'core-services/meteor_developer.js',
      'core-services/facebook.js',
      'core-services/github.js',
      'core-services/google.js',
      'core-services/meetup.js',
      'core-services/twitter.js',
      'core-services/weibo.js',
      'community-services/angellist.js',
      'community-services/dropbox.js',
      'community-services/discord.js',
      'community-services/edmodo.js',
      'community-services/instagram.js',
      'community-services/linkedin.js',
      'community-services/mailru.js',
      'community-services/qq.js',
      'community-services/ok.js',
      'community-services/slack.js',
      'community-services/spotify.js',
      'community-services/soundcloud.js',
      'community-services/twitch.js',
      'community-services/venmo.js',
      'community-services/vk.js',
      'community-services/wechat.js',
      'community-services/line.js'
    ],
    'client'
  );
});

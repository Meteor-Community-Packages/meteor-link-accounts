var fs = Npm.require('fs');
var path = Npm.require('path');

Package.describe({
  "summary": "Meteor external service link system",
  "version": "1.2.3",
  "git": "https://github.com/yubozhao/meteor-link-accounts",
  "name": "bozhao:link-accounts",
  "description": "Link social accounts for Meteor"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.imply('accounts-base', ['client', 'server']);
  api.use(['underscore', 'check']);
  api.use(['accounts-oauth', 'oauth'], ['client', 'server']);

  api.add_files('link_accounts_client.js', 'client');
  api.add_files('link_accounts_server.js', 'server');
  api.add_files([
    'core-services/meteor_developer.js',
    'core-services/facebook.js',
    'core-services/github.js',
    'core-services/google.js',
    'core-services/meetup.js',
    'core-services/twitter.js',
    'core-services/weibo.js',
    'community-services/instagram.js',
    'community-services/ok.js',
    'community-services/vk.js',
    'community-services/mailru.js',
    'community-services/linkedin.js',
    'community-services/twitch.js',
    'community-services/soundcloud.js',
    'community-services/slack.js',
    'community-services/angellist.js',
    'community-services/spotify.js',
    'community-services/venmo.js',
    'community-services/dropbox.js'
  ], 'client');
});

function isPackageAvailable (packageName) {
  function isAppDir (dir) {
    try {
      return fs.statSync(path.join(filepath, '.meteor', 'packages')).isFile();
    } catch (e) {
      return false;
    }
  };

  var currentDir = process.cwd();
  while (currentDir) {
    var newDir = path.dirname(currentDir);

    if (isAppDir(currentDir)) {
      break;
    } else if (newDir === currentDir) {
      currentDir = '';
    } else {
      currentDir = newDir;
    }
  };

  var meteorPackages = fs.readFileSync(path.join(currentDir, '.meteor', 'packages'), 'utf8');
  var packageName = new RegExp(packageName);
  return !!meteorPackages.match(packageName);
};

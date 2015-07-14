var fs = Npm.require('fs');
var path = Npm.require('path');

Package.describe({
  "summary": "Meteor external service link system",
  "version": "1.1.4",
  "git": "https://github.com/yubozhao/meteor-link-accounts",
  "name": "bozhao:link-accounts"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.imply('accounts-base', ['client', 'server']);
  api.use(['accounts-oauth', 'oauth'], ['client', 'server']);

  api.add_files('link_accounts_client.js', 'client');
  api.add_files('link_accounts_server.js', 'server');
  api.add_files([
    'meteor_developer.js',
    'facebook.js',
    'github.js',
    'google.js',
    'meetup.js',
    'twitter.js',
    'weibo.js',
    'instagram.js',
    'linkedin.js',
    'ok.js',
    'vk.js',
    'mailru.js'
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

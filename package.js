var fs = Npm.require('fs');
var path = Npm.require('path');

Package.describe({
  summary: "Meteor external service link system",
});

Package.on_use(function (api) {
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('oauth', ['client', 'server']);

  api.add_files('link_accounts_client.js', 'client');
  api.add_files('link_accounts_server.js', 'server');

  if (isPackageAvailable('meteor-developer')) {
    api.use('meteor-developer', ['client', 'server']);
    api.add_files(['meteor_developer.js'], 'client');
  }
  if (isPackageAvailable('github')) {
    api.use('github', ['client', 'server']);
    api.add_files(['github.js'], 'client');
  }

  if (isPackageAvailable('google')) {
    api.use('google', ['client', 'server']);
    api.add_files(['google.js'], 'client');
  }
  if (isPackageAvailable('meetup')) {
    api.use('meetup', ['client', 'server']);
    api.add_files(['meetup.js'], 'client');
  }
  if (isPackageAvailable('twitter')) {
    api.use('twitter', ['client', 'server']);
    api.add_files(['twitter.js'], 'client');
  }
  if (isPackageAvailable('weibo')) {
    api.use('weibo', ['client', 'server']);
    api.add_files(['weibo.js'], 'client');
  }
  if (isPackageAvailable('facebook')) {
    api.use('facebook', ['client', 'server']);
    api.add_files(['facebook.js'], 'client');
  }
});

function isPackageAvailable (packageName) {
  function isAppDir (dir) {
    try {
      return fs.statSync(path.join(dir, '.meteor', 'packages')).isFile();
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

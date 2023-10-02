import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { OAuth } from 'meteor/oauth'
import './core-services/facebook'
import './core-services/github'
import './core-services/google'
import './core-services/meetup'
import './core-services/meteor_developer'
import './core-services/twitter'
import './core-services/weibo'
import './community-services/angellist'
import './community-services/apple'
import './community-services/dropbox'
import './community-services/discord'
import './community-services/edmodo'
import './community-services/instagram'
import './community-services/linkedin'
import './community-services/mailru'
import './community-services/qq'
import './community-services/ok'
import './community-services/slack'
import './community-services/spotify'
import './community-services/soundcloud'
import './community-services/twitch'
import './community-services/venmo'
import './community-services/vk'
import './community-services/wechat'
import './community-services/line'
import './community-services/office365'
import './community-services/web3'
import './community-services/betapass'

Accounts.oauth.tryLinkAfterPopupClosed = function (
  credentialToken,
  callback,
  shouldRetry = true
) {
  const credentialSecret = OAuth._retrieveCredentialSecret(credentialToken)

  if (!credentialSecret) {
    if (!shouldRetry) {
      return
    }
    Meteor.setTimeout(
      () =>
        Accounts.oauth.tryLinkAfterPopupClosed(
          credentialToken,
          callback,
          false
        ),
      500
    )
    return
  }

  Accounts.callLoginMethod({
    methodArguments: [
      {
        link: {
          credentialToken,
          credentialSecret
        }
      }
    ],
    userCallback:
      callback &&
      function (err) {
        // Allow server to specify subclass of errors. We should come
        // up with a more generic way to do this!
        if (
          err &&
          err instanceof Meteor.Error &&
          err.error === Accounts.LoginCancelledError.numericError
        ) {
          callback(new Accounts.LoginCancelledError(err.details))
        } else {
          callback(err)
        }
      }
  })
}

Accounts.oauth.linkCredentialRequestCompleteHandler = function (callback) {
  return function (credentialTokenOrError) {
    if (credentialTokenOrError && credentialTokenOrError instanceof Error) {
      callback && callback(credentialTokenOrError)
    } else {
      Accounts.oauth.tryLinkAfterPopupClosed(credentialTokenOrError, callback)
    }
  }
}

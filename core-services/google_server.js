import { Meteor } from 'meteor/meteor'
import { ServiceConfiguration } from 'meteor/service-configuration'

/**
 * Verifies tokens from the Cordova Google plugin with Google and returns service data
 * built only from the verified response. Nothing else sent by the client is trusted.
 * Native apps often have a different client ID than the web one, extra accepted IDs go to
 * Meteor.settings.packages['bozhao:link-accounts'].googleClientIds
 *
 * @param tokens { Object } idToken and/or accessToken from the client
 * @returns {Promise<Object>}
 */
export const verifyGoogleTokens = async ({ idToken, accessToken }) => {
  const param = typeof idToken === 'string' ? 'id_token' : 'access_token'
  const token = param === 'id_token' ? idToken : accessToken
  if (typeof token !== 'string') {
    throw new Meteor.Error(400, 'Google idToken or accessToken is required')
  }

  const config = await ServiceConfiguration.configurations.findOneAsync({ service: 'google' })
  if (!config) throw new ServiceConfiguration.ConfigError()
  const clientIds = [
    config.clientId,
    ...(Meteor.settings?.packages?.['bozhao:link-accounts']?.googleClientIds || [])
  ]

  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?${new URLSearchParams({ [param]: token })}`
  )
  const info = await response.json()
  // aud check stops tokens issued to other apps from being replayed here
  if (!response.ok || !info.sub || !clientIds.includes(info.aud)) {
    throw new Meteor.Error(403, 'Google token verification failed')
  }

  const serviceData = { id: info.sub, [param === 'id_token' ? 'idToken' : 'accessToken']: token }
  if (info.email) {
    serviceData.email = info.email
    serviceData.verified_email = String(info.email_verified) === 'true'
  }
  if (info.name) serviceData.name = info.name
  if (info.picture) serviceData.picture = info.picture
  return serviceData
}

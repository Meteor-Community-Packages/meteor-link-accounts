const assert = require('node:assert/strict')
const { readFile } = require('node:fs/promises')
const { resolve } = require('node:path')
const { test } = require('node:test')
const { createContext, SourceTextModule, SyntheticModule } = require('node:vm')

test('verifyGoogleTokens', async (t) => {
  class MeteorError extends Error {
    constructor (error, reason) {
      super(reason)
      this.error = error
    }
  }
  const Meteor = { Error: MeteorError, settings: {} }
  const ServiceConfiguration = {
    configurations: { findOneAsync: async () => ({ clientId: 'our-client' }) },
    ConfigError: Error
  }
  let tokeninfo
  let requestedUrl
  const context = createContext({
    URLSearchParams,
    fetch: async (url) => {
      requestedUrl = url
      return { ok: !tokeninfo.error, json: async () => tokeninfo }
    }
  })
  const meteorModules = {
    'meteor/meteor': { Meteor },
    'meteor/service-configuration': { ServiceConfiguration }
  }
  const filename = resolve(__dirname, '../core-services/google_server.js')
  const module = new SourceTextModule(await readFile(filename, 'utf8'), { context })
  await module.link((specifier) => {
    const exports = meteorModules[specifier]
    return new SyntheticModule(Object.keys(exports), function () {
      for (const [name, value] of Object.entries(exports)) this.setExport(name, value)
    }, { context })
  })
  await module.evaluate()
  const { verifyGoogleTokens } = module.namespace

  await t.test('uses the verified id, not the one sent by the client', async () => {
    tokeninfo = { aud: 'our-client', sub: 'real-id', email: 'a@b.c', email_verified: 'true' }
    const data = await verifyGoogleTokens({ idToken: 'tok', id: 'victim', userId: 'victim', admin: true })
    assert.match(requestedUrl, /\?id_token=tok$/)
    assert.deepEqual({ ...data }, { id: 'real-id', idToken: 'tok', email: 'a@b.c', verified_email: true })
  })

  await t.test('rejects tokens issued to another app', async () => {
    tokeninfo = { aud: 'other-app', sub: 'real-id' }
    await assert.rejects(verifyGoogleTokens({ accessToken: 'tok' }), { error: 403 })
  })

  await t.test('accepts extra client IDs from settings', async () => {
    Meteor.settings = { packages: { 'bozhao:link-accounts': { googleClientIds: ['other-app'] } } }
    assert.equal((await verifyGoogleTokens({ accessToken: 'tok' })).id, 'real-id')
  })

  await t.test('rejects invalid and missing tokens', async () => {
    tokeninfo = { error: 'invalid_token' }
    await assert.rejects(verifyGoogleTokens({ idToken: 'bad' }), { error: 403 })
    await assert.rejects(verifyGoogleTokens({ id: 'victim' }), { error: 400 })
  })
})

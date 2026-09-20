const assert = require('node:assert/strict')
const { readFile } = require('node:fs/promises')
const { dirname, resolve } = require('node:path')
const { mock, test } = require('node:test')
const { createContext, SourceTextModule, SyntheticModule } = require('node:vm')

test('Meteor.linkWithNaver', async (t) => {
  let userId = 'reader'
  const Meteor = {
    userId: () => userId,
    Error: class extends Error {
      constructor (error, reason) {
        super(reason)
        this.error = error
      }
    }
  }
  const Accounts = { oauth: {}, callLoginMethod: mock.fn() }
  const OAuth = { _retrieveCredentialSecret: () => 'naver-secret' }
  const requestCredential = mock.fn((_options, complete) => complete('naver-token'))
  const packages = {
    'storyteller:accounts-naver': {},
    'storyteller:naver-oauth': { Naver: { requestCredential } }
  }
  const context = createContext({ Package: packages, Error })
  const meteorModules = {
    'meteor/meteor': { Meteor },
    'meteor/accounts-base': { Accounts },
    'meteor/oauth': { OAuth }
  }

  async function load (filename) {
    const module = new SourceTextModule(await readFile(filename, 'utf8'), {
      context,
      identifier: filename
    })
    await module.link((specifier, parent) => {
      const exports = meteorModules[specifier]
      if (!exports) return load(resolve(dirname(parent.identifier), `${specifier}.js`))
      return new SyntheticModule(Object.keys(exports), function () {
        for (const [name, value] of Object.entries(exports)) this.setExport(name, value)
      }, { context })
    })
    return module
  }

  const client = await load(resolve(__dirname, '../link_accounts_client.js'))
  await client.evaluate()

  await t.test('links credentials to the signed-in account', () => {
    const callback = mock.fn()
    const options = { loginStyle: 'popup' }
    Meteor.linkWithNaver(options, callback)
    assert.equal(requestCredential.mock.calls[0].arguments[0], options)
    const login = Accounts.callLoginMethod.mock.calls[0].arguments[0]
    assert.equal(login.methodArguments[0].link.credentialToken, 'naver-token')
    assert.equal(login.methodArguments[0].link.credentialSecret, 'naver-secret')
    login.userCallback()
    assert.equal(callback.mock.callCount(), 1)
    assert.equal(callback.mock.calls[0].arguments[0], undefined)
  })

  await t.test('accepts a callback alone and forwards provider errors', () => {
    Accounts.callLoginMethod.mock.resetCalls()
    const error = new Error('NAVER authorization cancelled')
    requestCredential.mock.mockImplementation((_options, complete) => complete(error))
    const callback = mock.fn()
    Meteor.linkWithNaver(callback)
    assert.equal(requestCredential.mock.calls[1].arguments[0], null)
    assert.equal(callback.mock.callCount(), 1)
    assert.equal(callback.mock.calls[0].arguments[0], error)
    assert.equal(Accounts.callLoginMethod.mock.callCount(), 0)
  })

  await t.test('rejects linking when signed out', () => {
    userId = null
    assert.throws(() => Meteor.linkWithNaver(), { error: 402 })
    assert.equal(requestCredential.mock.callCount(), 2)
  })

  await t.test('requires the NAVER accounts package', () => {
    userId = 'reader'
    delete packages['storyteller:accounts-naver']
    assert.throws(() => Meteor.linkWithNaver(), { error: 403 })
    assert.equal(requestCredential.mock.callCount(), 2)
  })
})

jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000

const {Nuxt, Builder} = require('nuxt')
const request = require('request-promise-native')

const config = require('./fixture/nuxt.config')

const url = path => `http://localhost:3000${path}`
const get = path => request(url(path))

describe('basic', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    await nuxt.listen(3000)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('index page', async () => {
    let html = await get('/')
    expect(html).toContain('|index|')
  })

  test('users page', async () => {
    let html = await get('/users/1')
    expect(html).toContain('|users/_id|')
  })

  test('post page', async () => {
    let html = await get('/post/random-slug')
    expect(html).toContain('|post/_slug|')
  })

  test('post comments page', async () => {
    let html = await get('/post/slug/comments')
    expect(html).toContain('|post/_slug/comments|')
  })

  test('category page', async () => {
    let html = await get('/random-cat')
    expect(html).toContain('|_category|')
    expect(html).toContain('|_category/index|')
  })

  test('subcategory page', async () => {
    let html = await get('/random-cat/random-sub-cat')
    expect(html).toContain('|_category|')
    expect(html).toContain('|_category/_subCategory|')
    expect(html).toContain('|_category/_subCategory/index|')
  })

  test('subcategory id page', async () => {
    let html = await get('/random-cat/random-sub-cat/1')
    expect(html).toContain('|_category|')
    expect(html).toContain('|_category/_subCategory|')
    expect(html).toContain('|_category/_subCategory/_id|')
  })
})

describe('fail', () => {
  test('if createRoutes is already defined', async () => {
    const conf = Object.assign({}, config, {build: {createRoutes: () => []}})
    const nuxt = new Nuxt(conf)

    try {
      await new Builder(nuxt).build()
    } catch (err) {
      expect(err.message).toContain('`build.createRoutes` option is already set in nuxt.config.js')
    }
  })

  test('for invalid Routes option', async () => {
    const conf = Object.assign({}, config, {nuxtRoutes: {}})
    const nuxt = new Nuxt(conf)

    try {
      await new Builder(nuxt).build()
    } catch (err) {
      expect(err.message).toContain('Routes option must be instance of Array')
    }
  })
})

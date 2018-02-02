const { resolve } = require('path')

const setRoute = (srcDir, route, parent = {}) => {
  if (typeof route === 'string') {
    route = { path: route }
  }

  if (typeof route.component === 'undefined') {
    if (route.path === '') {
      if (parent.component) {
        route.component = parent.component.replace(/^(.+)(\.(vue|js))$/, '$1/index$2')
      }
    } else if (route.path === '/') {
      route.component = 'index'
    } else {
      route.component = route.path
        .split('/')
        .filter(v => Boolean(v))
        .map(segment => {
          return segment === '*' ? '_' : segment.replace(':', '_').replace('?', '')
        })
        .join('/')

      if (parent.component) {
        route.component = parent.component.replace(/\.(vue|js)$/, '/' + route.component)
      }
    }
  }

  if (!/\.(vue|js)$/.test(route.component)) {
    route.component += '.vue'
  }

  if (route.children instanceof Array) {
    route.children = route.children.map(r => setRoute(srcDir, r, route))
  }

  route.component = resolve(srcDir, 'pages', route.component)

  return route
}

module.exports = async function module (moduleOptions) {
  if (this.options.build.createRoutes !== undefined) {
    throw new Error('[Nuxt Routes] `build.createRoutes` option is already set in nuxt.config.js')
  }

  const options = Object.assign({}, this.options.nuxtRoutes, moduleOptions)

  if (!(options.routes instanceof Array)) {
    throw new Error('[Nuxt Routes] Routes option must be instance of Array')
  }

  this.nuxt.options.build.createRoutes = srcDir => {
    return options.routes.map(r => setRoute(srcDir, r))
  }
}

# nuxt-routes
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-routes/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-routes)
[![npm](https://img.shields.io/npm/dt/nuxt-routes.svg?style=flat-square)](https://npmjs.com/package/nuxt-routes)
[![CircleCI](https://img.shields.io/circleci/project/github/ahalimkara/nuxt-routes.svg?style=flat-square)](https://circleci.com/gh/ahalimkara/nuxt-routes)
[![Codecov](https://img.shields.io/codecov/c/github/ahalimkara/nuxt-routes.svg?style=flat-square)](https://codecov.io/gh/ahalimkara/nuxt-routes)
[![Dependencies](https://david-dm.org/ahalimkara/nuxt-routes/status.svg?style=flat-square)](https://david-dm.org/ahalimkara/nuxt-routes)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Dynamic routes for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Features

Automatically maps your paths with components (follows same rules with [Nuxt.js](https://nuxtjs.org/guide/routing)) 

## Setup
- Add `nuxt-routes` dependency using yarn or npm to your project
- Add `nuxt-routes` to `modules` section of `nuxt.config.js`

```javascript
{
  modules: [
    // With options (routes required and it must be Array)
    ['nuxt-routes', {
      routes: []
    }],
 ],
 
 // Or options here
 nuxtRoutes: {
    routes: []
 }
}
```

## Usage

Set your routes in `nuxt.config.js`:
```javascript
{
  nuxtRoutes: {
    routes: [
      '/',
      '/users/:id?',
      '/post/:slug',
      '/post/:slug/comments',
      {
        path: '/:lang(en|ku)?/local/path',
        component: 'local/component.vue'
      },
      {
        path: '/:category',
        children: [
          '',
          {
            path: ':subCategory',
            children: [
              '',
              ':id'
            ]
          }
        ]
      }
    ]
 }
}
```

Automatically will be converted to:
```javascript
{
  nuxtRoutes: {
    routes: [
      {
        path: '/',
        component: 'srcDir/pages/index.vue'
      },
      {
        path: '/users/:id?',
        component: 'srcDir/pages/users/_id.vue'
      },
      {
        path: '/post/:slug',
        component: 'srcDir/pages/index.vue'
      },
      {
        path: '/post/:slug/comments',
        component: 'srcDir/pages/index.vue'
      },
      {
        path: '/:lang(en|ku)?/local/path',
        component: 'srcDir/pages/local/component.vue'
      },
      {
        path: '/:category',
        component: 'srcDir/pages/_category.vue',
        children: [
          {
            path: '',
            component: 'srcDir/pages/_category/index.vue'
          },
          {
            path: ':subCategory',
            component: 'srcDir/pages/_category/_subCategory.vue'
            children: [
              {
                path: '',
                component: 'srcDir/pages/_category/_subCategory/index.vue'
              },
              {
                path: ':id',
                component: 'srcDir/pages/_category/_subCategory/_id.vue'
              },
            ]
          }
        ]
      },
    ]
  }
}
```

For more details check [vue-router](https://router.vuejs.org/en/essentials/getting-started.html)

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## Notes

- If you want to use `.js` component instead of `.vue` then you need to set component of route explicitly. Example:
```javascript
[{
  path: '/index',
  component: 'index.js'
}]
```

- If you want to map optional params with `_param/index.vue` instead of `_param.vue` you need to set component of route explicitly.
```javascript
['/:slug']
```

will be converted to:
```javascript
[{
  path: '/:slug',
  component: '_slug.vue'
}]
```

- Use separate file for routes to keep `nuxt.config.js` clean:
```javascript
// routes.js
module.exports = ['/', '/login']

// nuxt.config.js
module.exports = {
  nuxtRoutes: { routes: require('./routes.js') }
}
```

## License

[MIT License](./LICENSE)

Copyright (c) Abdulhalim Kara <ahalimkara@gmail.com>

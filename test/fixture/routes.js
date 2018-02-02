module.exports = [
  '/',
  '/users/:id?',
  '/post/:slug',
  '/post/:slug/comments',
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

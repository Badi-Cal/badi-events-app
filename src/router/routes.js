
const routes = [
  {
    path: '/',
    redirect: '/calendar'
  },
  {
    path: '/calendar',
    component: () => import('layouts/LayoutDefault.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      {
        path: ':calendar/:period/:year/:month/:day',
        component: () => import('pages/index.vue'),
        props: route => (
          {
            tab: route.params.calendar,
            view: route.params.period,
            year: parseInt(route.params.year),
            month: parseInt(route.params.month) - 1,
            day: parseInt(route.params.day)
          })
      },
      {
        path: ':calendar',
        component: () => import('pages/index.vue'),
        props: route => ({ tab: route.params.calendar })
      },
      { path: '*', component: () => import('pages/index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

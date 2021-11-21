
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
        path: ':view',
        component: () => import('pages/index.vue'),
        props: route => ({ tab: route.params.view })
      }
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

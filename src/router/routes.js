/**
 * @fileoverview Router construction options
 * @see https://v3.router.vuejs.org/api/#router-construction-options
 */

/**
 * Validate route params
 *
 * @param {Object} route The Route object
 *
 * @returns {Object}
 */
const dynamicPropsFn = (route) => {
  return {
    view: route.params.period ?? 'month',
    year: route.params.year ? parseInt(route.params.year) : undefined,
    month: route.params.month ? parseInt(route.params.month) : undefined,
    day: route.params.day ? parseInt(route.params.day) : undefined
  }
}

const routes = [
  {
    path: '/',
    redirect: '/calendar'
  },
  {
    path: '/calendar',
    redirect: '/calendar/gregorian'
  },
  {
    path: '/calendar',
    component: () => import('layouts/LayoutDefault.vue'),
    children: [
      {
        path: '',
        props: dynamicPropsFn,
        component: () => import('pages/index.vue'),
        children: [
          {
            path: 'gregorian',
            component: () => import('pages/Gregorian.vue')
          },
          {
            path: 'badi',
            component: () => import('pages/Badi.vue')
          },
          {
            path: 'gregorian/:period/:year/:month/:day',
            component: () => import('pages/Gregorian.vue')
          },
          {
            path: 'badi/:period/:year/:month/:day',
            component: () => import('pages/Badi.vue')
          }
        ]
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

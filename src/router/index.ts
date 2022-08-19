import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/home',
    component: () => import('../views/home/home.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/store',
    component: () => import('../views/list/list.vue')
  },
  {
    path: '/main',
    redirect: '/main/login',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/main/login',
        component: () => import('../views/login/login.vue')
      },
      {
        path: '/main/home',
        component: () => import('../views/home/home.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/404.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// 根据登录态进行路由 是否需要登录
// 根据后台接口 获取侧边栏的路由 addRouter
let isMenu = false
const daymainRoute = new Promise((res, rej) => {
  setTimeout(() => {
    res({
      path: '/p2',
      component: () => import('../views/home/home.vue'),
      meta: {
        requireAuth: true
      }
    })
  }, 1000)
})
router.beforeEach(async (to, from, next) => {
  // console.log(to, from, next)
  const { meta, matched, path } = to
  // 当前路由是否存在
  const isMatch = matched.length ? true : false
  // 是否登录  是否拉取menu 有些不需要跳转登录
  const isLogin = sessionStorage.getItem('auth') || true
  // 不需要登录态
  if (['/login', '/404'].includes(path)) {
    next()
  }
  // 没有登录，不管哪个路由都跳转 登录
  if (!isLogin) {
    next({
      path: '/login'
    })
  } else {
    // 判断路由
    // 否则请求 menu
    if (!isMenu) {
      isMenu = true
      const res: any = await daymainRoute
      router.addRoute(res)
      next({ ...to })
    }
    next()
  }
})

export default router

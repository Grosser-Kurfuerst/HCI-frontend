import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/HomeView")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register'),
    meta: { title: '注册' }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/auth/Login'),
    meta: { title: '登录' }
  },
  // 发布
  {
    name: 'post-create',
    path: '/post/create',
    component: () => import('@/views/post/Create'),
    meta: { title: '信息发布', requireAuth: true }
  },
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/post/Detail"),
    meta: { title: "详情" }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    meta: {title: '404-NotFound'}
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

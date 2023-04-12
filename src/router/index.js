import Vue from 'vue'
import Router from 'vue-router' //版本对应问题，vue2.x router3.x

Vue.use(Router)

import Layout from '@/layout'

/**
 * 
 * 
 * hidden: true    // 控制侧边菜单的显示隐藏
 * meta {          // 元数据
 *   role          // 控制访问权限
 * 
 * }
 * 
 */

/** 所有用户都可访问的路由集合 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        hidden: false,
        children: [
            {
                // 路由中的路径需要带上斜杠
                path: '/dashboard',
                name: '首页',
                component: () => import('@/views/dashboard'),
                meta: { title: '首页' }
            }
        ]
    },
    {
        path: '/nest',
        component: Layout,
        hidden: false,
        redirect: '/nest/demo',
        meta: { title: '多级菜单' },
        children: [
            {
                path: 'demo',
                name: '一级菜单',
                component: () => import('@/views/demo'),
                meta: { title: '一级菜单', icon: '' },
                children: [
                    {
                        path: 'demo1',
                        name: '二级菜单1',
                        hidden: true,
                        component: () => import('@/views/demo/demo1/demo1-1'),
                        meta: { title: '二级菜单1' }
                    },
                    {
                        path: 'demo2',
                        name: '二级菜单2',
                        hidden: true,
                        component: () => import('@/views/demo/demo1/demo1-2'),
                        meta: { title: '二级菜单2' }
                    }
                ]
            },
        ]
    },
    // {
    //     path: '/permission',
    //     name: '权限配置',
    //     component: () => import('@/views/demo/demo2'),
    //     meta: { title: '权限配置', role: ['admin'] }
    // }
]

// 异步挂载路由
export const asyncRouterMap = [
    {
        path: '/dynamic',
        component: Layout,
        name: '动态路由',
        meta: { role: ['admin'] },
        children: []
    },
    // tip: 必须放在最后, 不然所有的页面都会被拦截到404，https://github.com/vuejs/vue-router/issues/1176
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    }
]

const createRouter = () => new Router({
    // 路由滚动行为，savePosition判断是否是浏览器的前进后退操作
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: constantRoutes
})

const router = createRouter()

export default router

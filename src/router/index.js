import Vue from 'vue'
import Router from 'vue-router' //版本对应问题，vue2.x router3.x

Vue.use(Router)

import Layout from '@/layout'

/**
 * 
 * 
 * hidden: true    if set true, item will not show in the sidebar
 * 
 */

// a base router page, all roles can be accessed
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
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
                name: 'Dashboard',
                component: () => import('@/views/dashboard'),
                meta: { title: 'dashboard'}
            }
        ]
    },
    {
        path: '/demo',
        name: 'demo',
        component: Layout,
        meta: { title: 'classification', icon: ''},
        children: [
            { 
                path: '/demo1',
                name: 'demo1',
                component: () => import('@/views/demo/demo1'),
                meta: { title: 'demo1', icon:'' },
                children: [
                    {
                        path: '/demo1/demo1-1',
                        name: 'demo1-1',
                        component: () => import('@/views/demo/demo1/demo1-1'),
                        meta: { title: 'demo1-1' }
                    },
                    {
                        path: '/demo1/demo1-2',
                        name: 'demo1-2',
                        component: () => import('@/views/demo/demo1/demo1-2'),
                        meta: { title: 'demo1-2' }
                    }
                ]
            },
            {
                path: '/demo2',
                name: 'damo2',
                component: () => import('@/views/demo/demo2'),
                meta: { title: 'demo2' }
            }
        ]
    },
    // {   
    //     path: '/test',
    //     name: 'test',
    //     redirect: '/test1',
    //     component: Layout,
    //     component: () => import('@/views/test/test1'),
    //     meta: { title: 'Testtting'},
    //     children: [
    //         {
    //             path: '/test1',
    //             name: 'test1',
    //             component: () => import('@/views/test/test1'),
    //             meta: {title: "Test1"}
    //         }
    //     ] 
    // }
]

const createRouter = () => new Router({
    // 路由滚动行为，savePosition判断是否是浏览器的前进后退操作
    scrollBehavior: (to, from, savedPosition) => { 
        if(savedPosition) {
            return savedPosition
        }else {
            return { x: 0, y: 0 }
        }
    },
    routes: constantRoutes
})

const router = createRouter()

export default router
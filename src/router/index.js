import Vue from 'vue'
import Router from 'vue-router' //版本对应问题，vue2.x router3.x

Vue.use(Router)

import Layout from '@/layout'
import ParentView from '@/components/ParentView'

/**
 *  先获取菜单，再通过处理菜单结构获取路由, 记住菜单是菜单路由是路由！
 * hidden: true              // 控制侧边菜单的显示与隐藏
 * redirect: 'noRedirect'    // 设置为noRedirect时，该路由在面包屑中不可点击
 * alawysShow: true          // 控制路由是否一直展示，设置为true 会忽略菜单路由展示规则
 * name                      // 定义路由的名字， 需要使用缓存的路由必须填写
 * meta {                    // 元数据
 *  roles：['admin', 'editor']           // 控制访问权限
 *  icon: 'svg-name'                     // 控制路由图标
 *  title: 'title'                       // 路由在侧边栏和面包屑中展示的名字
 *  noCache：true                        // 是否存在缓存，设置为true 则不会被缓存
 *  breadcrumb: false                    // 是否在面包屑中展示，如果为false 则不展示
 *  affix：true                          // 如果设置为true,它则会固定在tags-view 中
 * }
 * 
 */

/** 所有用户都可访问的路由集合 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect')
            }
        ]
    },
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
                name: 'Dashboard',
                component: () => import('@/views/dashboard'),
                meta: {
                    title: '首页',
                    icon: ''
                }
            }
        ]
    },
    {
        path: '/permission',
        component: Layout,
        hidden: false,
        children: [
            {
                path: '/setting',
                name: 'Permission',
                component: () => import('@/views/permission'),
                meta: {
                    title: '权限配置',
                    icon: ''
                }
            }
        ]
    },
    {
        path: '/nested',
        component: Layout,
        hidden: false,
        redirect: 'noRedirect',
        meta: { title: '多级菜单' },
        children: [
            {
                path: 'demo',
                name: 'NestedMenu',
                component: ParentView,
                meta: { title: '一级菜单', icon: '' },
                children: [
                    {
                        path: 'demo1',
                        name: 'TwoMenuOne',
                        hidden: false,
                        component: () => import('@/views/demo/demo1/demo1-1'),
                        meta: { title: '二级菜单1', icon: '' }
                    },
                    {
                        path: 'demo2',
                        name: 'TwoMenuTwo',
                        hidden: false,
                        component: () => import('@/views/demo/demo1/demo1-2'),
                        meta: { title: '二级菜单2', icon: '' }
                    }
                ]
            },
        ]
    },
    {
        path: '/file',
        component: Layout,
        redirect: '/file/upload',
        hidden: false,
        children: [
            {
                path: 'upload',
                name: 'FileUpload',
                component: () => import('@/views/file'),
                meta: { title: '文件管理', icon: '' }
            }
        ]

    },
    {
        path: 'external-link',
        component: Layout,
        hidden: false,
        children: [
            {
                path: "https://www.bilibili.com/",
                meta: { title: "bilibili", icon: "" }
            }
        ]
    },

    // tip: 必须放在最后加载, 不然动态添加的所有的页面都会被拦截到404，https://github.com/vuejs/vue-router/issues/1176
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    }
]

// 异步挂载路由
export const asyncRouterMap = [
    {
        path: '/dynamic',
        component: Layout,
        name: '动态路由',
        meta: { role: ['admin'] },
        children: []
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

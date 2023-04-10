import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import { Message } from 'element-ui'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

/** 路由白名单 */
const whiteSite = ['/login']

// 全局前置路由守卫, 进行页面访问权限的判断, tip:每次路由跳转时都会执行
router.beforeEach(async (to, from, next) => {
    // 页面加载进度条
    NProgress.start()
    if (getToken()) {
        // 存在 token
        if (to.path === '/login') {
            //  token 存在说明已登陆不能去登陆界面重定向跳转到首页
            next({ path: '/' })
            NProgress.done()
        } else {
            // token 存在跳转到非login路由，先判断用户信息是否存在，存在直接跳转，不存在先拉取用户信息
            if (store.getters.name) {
                // 用户信息存在
                //* 可拓展：根据用户权限获取动态访问的路由信息
                next()
            } else {
                // 用户信息不存在通过 token 拉取用户信息
                try {
                    await store.dispatch('user/GetInfo')
                    next()
                } catch (error) {
                    await store.dispatch('user/Logout')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        console.log('no token ')
        // 不存在 token
        // 是白名单里面的路由则直接跳转
        if (whiteSite.indexOf(to.path) !== -1) {
            next()
        } else {
            // 非白名单中的路由，先跳转到登陆界面进行登陆，再重定向到原路由
            next({ path: `/login?redirect=${to.path}` })
            NProgress.done()
        }
    }
})

// 全局后置路由守卫
router.afterEach((to, from) => {
    NProgress.done()
})
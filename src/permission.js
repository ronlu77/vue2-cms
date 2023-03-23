import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false})

const whiteSite = ['/login']

// 全局前置路由守卫, 进行页面访问权限的判断
router.beforeEach((to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    if(hasToken) {
        if(to.path === '/login') {
            // token is exist and user want to login page,  redirect to dashboard page
            next({ path: '/' })
            NProgress.done()
        }else {
            // token is exist user want not to login page, first pull userinfo
            // info is exist, to the to.path
            // info is not exist, to request pull userinfo by token
            const hasUserInfo = store.getters.username
            if(hasUserInfo) {
                console.log('code runing', to);
                next()
            }else {
                store.dispatch('user/getInfo', hasToken)
                next()
            }
        }
    }else {
        if(whiteSite.indexOf(to.path) !== -1) {
            next()
        }else {
            next({ path: '/login' })
            NProgress.done()
        }
    }
})

router.afterEach((to, from) => {
    // to and from are both route objects.
    NProgress.done()
})
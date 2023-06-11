import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// step 1: 创建 axios 实例
const serivce = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// step 2: 设置请求头， 在请求发送前执行
serivce.interceptors.request.use(
    config => {
        if (store.getters.token) {
            // set request header had "X-Token"
            config.headers['X-Token'] = getToken()
        }

        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// step 3: 设置响应头
serivce.interceptors.response.use(
    response => {
        const res = response.data

        if (res.code !== 200) {
            Message({
                type: 'error',
                message: res.message || 'Error',
                duration: 5 * 1000
            })

            if (res.code === 500 || 503 ) {
                MessageBox.confirm('你已经登录了,你可以取消在这个页面或再次登录', '确认退出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload() // refresh current websit, 重新实例化 vue-router 对象
                    })
                })
            }
            return Promise.reject(new Error(res.message) || 'Error')
        } else {
            return res
        }
    },
    error => {
        console.log('RESPONSE ERROR' + error) // debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        Promise.reject(error)
    }
)

// step 4： 暴露 axios 实例
export default serivce
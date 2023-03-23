import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// step 1: create axios instance
const serivce = axios.create({
    baseURL: '',
    timeout: 5000
})

// step 2: setting request interceptor
serivce.interceptors.request.use(
    config => {
        // do something before request is sent
        if(store.getters.token) {
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

// step 3: setting response interceptor
serivce.interceptors.response.use(
    response => {
        const res = response.data

        if(res.code !== 200) {
            Message({
                type: 'error',
                message: res.message || 'Error',
                duration: 5 * 1000
            })

            if(res.code === 401 || 403 || 400) {
                MessageBox.confirm('You have been logeed out, you can cancel to stay on this page, or login agiain', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }).then(() => {
                    store.dispatch('user/resetToken').then(()=> {
                        location.reload() // refresh current websit, 重新实例化 vue-router 对象
                    })
                })
            }

            return Promise.reject(new Error(res.message) || 'Error')
        }else {
            return res
        }
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default serivce
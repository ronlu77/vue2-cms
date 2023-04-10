import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/vue-cms/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/vue-cms/user/userinfo?token=' + token,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/api/vue-cms/user/logout',
    method: 'post'
  })
}
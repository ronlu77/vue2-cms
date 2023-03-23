import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'

import '@/styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import '@/permission'

import Hamburger from '@/components/Hamburger'
import Navtop from "@/components/Navtop"

Vue.component('Hamburger')
Vue.component('Navtop')
// 阻止启动生产消息
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

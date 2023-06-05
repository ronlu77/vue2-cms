import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'

// 引入全局样式
import '@/styles/index.scss'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/permission'
// quote svg
import './icons/index'
import Hamburger from '@/components/Hamburger'
import Navtop from "@/components/Navtop"

//#region 全局注册自定义指令
// import permission from './directive/permission/permission.js'

// Vue.directive('permission', permission)
//#endregion

//#region 插件的使用
Vue.use(ElementUI)
//#endregion

//#region 全局组件的注册
Vue.component('Hamburger', Hamburger)
Vue.component('Navtop', Navtop)
//#endregion

// 阻止启动生产消息
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

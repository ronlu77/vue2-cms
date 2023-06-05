import permission from './permission'

// 通过方法来注册自定义指令
const install = function (Vue) {
    Vue.directive('permission', permission)
}

if (window.Vue) {
    window['permission'] = permission
    Vue.use(install)
}

permission.install = install

// 这种属于局部实现自定义指令，在需要使用自定义指令的地方import进去
export default permission
// 查询所有svg 文件的路径
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/) // 遍历svg文件夹下的所有以.svg结尾的，能够被require的文件，（不包含子目录）
const requireAll = requireContext => requireContext.keys().map(requireContext)

requireAll(req) // 返回svg文件相对于整个工程的相对路径
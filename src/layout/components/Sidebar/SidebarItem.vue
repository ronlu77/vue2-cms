<template>
  <div v-if="!item.hidden">
    <!-- 目录下只有一个菜单的情况下只显示菜单，不展示目录 -->
    <template v-if="hasOnlyChildren(item.children, item) && (!onlyChildren.children || onlyChildren.noShowingChildren) && !item.awalysShow">
        <!-- app-link 实现对外部连接跳转的支持 -->
        <app-link v-if="onlyChildren.meta" :to="onlyChildren.path">
            <el-menu-item :index="onlyChildren.path">
                <menu-item :meta="onlyChildren.meta"></menu-item>
            </el-menu-item>
        </app-link>
    </template>
    <!-- 目录下有多个菜单，同时展示目录和菜单 -->
    <div v-else>
        <el-submenu ref="subMenu" :index="item.path">
            <template #title>
                <menu-item v-if="item.meta" :meta="item.meta"></menu-item>
            </template>

            <sidebar-item
                v-for="children in item.children"
                :key="children.path"
                :item="children"
                :base-path="resolvePath(children.path)">
            </sidebar-item>
        </el-submenu>
    </div>
  </div>
</template>

<script>
import AppLink from './Link'
import MenuItem from './Item'
import { isExternal } from '@/utils/validate'

export default {
    name: 'SidebarItem',
    props: {
        item: {type: Object, required: true},
        basePath: {type: String, default: ''},
        collpase: {type: Boolean, default: true},
    },
    components: { AppLink, MenuItem },
    data() {
        return {
            onlyChildren: null
        }
    },
    methods: {
        // 判断是否存在一个hidden 属性为false 的子项路由
        hasOnlyChildren(childrenRoute = [], parentRoute) {
            // 获取子项路由中显示的路由集合
            const showRoutesList = childrenRoute.filter(item => {
                if(item.hidden) {
                    return false
                }else {
                    // 如果子路由不被隐藏，且最终显示路由集合长度为1 则该存储路由为 onlychildren 路由
                    this.onlyChildren = item
                    return true
                }
            })
            if(showRoutesList.length === 1){
                return true
            }
            // 说明当前路由无开启 hidden: false 的路由
            if(showRoutesList.length === 0) {
                this.onlyChildren = { ...parentRoute, path: '', noShowingChildren: true }
                return true
            }
            return false
        },
        resolvePath(pathParam) {
            if(isExternal(pathParam)) {
                return pathParam
            }
            if(isExternal(this.basePath)) {
                return this.basePath
            }

            return this.basePath + this.basePath
        }
    }
}
</script>
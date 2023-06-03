<template>
  <div v-if="!item.hidden">
    <!-- 目录下只有一个菜单的情况下只显示菜单，不展示目录 -->
    <template
      v-if="
        hasOnlyChildren(item.children, item) &&
        (!onlyChildren.children || onlyChildren.noShowingChildren) &&
        !item.awalysShow
      "
    >
      <!-- app-link 实现对外部连接跳转的支持 -->
      <app-link
        v-if="onlyChildren.meta"
        :to="resolvePath(onlyChildren.path, onlyChildren.query)"
      >
        <el-menu-item :index="resolvePath(onlyChildren.path)">
          <i>icon</i>
          <item :meta="onlyChildren.meta"></item>
        </el-menu-item>
      </app-link>
    </template>
    <!-- 目录下有多个菜单，同时展示目录和菜单 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template v-if="item.meta" #title>
        <i>icon</i>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 嵌套使用组件, 嵌套路由调用resolvePath方法进行路由拼接后再传入basePath -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import AppLink from "./Link";
import Item from "./Item";
import { isExternal } from "@/utils/validate";

export default {
  name: "SidebarItem",
  props: {
    item: { type: Object, required: true }, // route 对象
    basePath: { type: String, default: "" }, // 基础路径，如果是嵌套路由则为上级路由路径
  },
  components: { AppLink, Item },
  data() {
    return {
      onlyChildren: null,
    };
  },
  methods: {
    /**
     * @description 判断当前路由是否只有一个子项
     * @param {Array} childrenRoutes
     * @param {Object} parentRoute
     */
    hasOnlyChildren(childrenRoutes = [], parentRoute) {
      // 获取子项路由中需要显示的路由集合
      const showRoutesList = childrenRoutes.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // 如果子路由 hidden: false，且最终显示路由集合长度为1 则该存储路由为 onlychildren 路由
          this.onlyChildren = item;
          return true;
        }
      });
      if (showRoutesList.length === 1) {
        return true;
      }
      // 当前路由子项没有要显示的则展示父级菜单
      if (showRoutesList.length === 0) {
        this.onlyChildren = {
          ...parentRoute,
          path: "",
          noShowingChildren: true,
        };
        return true;
      }
      return false;
    },
    /**
     * @description 处理路由路径, basePath 是路由上级路径, 需要拼接才能获取完整的路由路径，提供给router-link 使用
     * @param {*} routePath 当前路由路径
     * @param {*} routeQuery 当前路由携带参数
     */
    resolvePath(routePath, routeQuery) {
      // 对应路由指向外部链接
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      if (routeQuery) {
        return { path: this.basePath, query: routeQuery };
      }
      // 最后的菜单没有 children 属性也会进入一次导致路径最后添加了 '/'
      if (!this.item.children) return this.basePath;
      return this.basePath.endsWith("/")
        ? "" + routePath
        : this.basePath + "/" + routePath;
    },
  },
};
</script>
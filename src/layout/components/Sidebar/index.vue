<template>
  <div :class="{'has-logo': hasLogo}">
    <logo v-if="hasLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- el-menu 自身的过度效果需要关闭（collpase-transition），否则会引起过滤 bug -->
      <el-menu
        class="elmenu-container"
        router
        mode="vertical"
        :unique-opened="true"
        :collapse="isCollpase"
        :default-active="activeMenu.toString()"
        :collapse-transition="false"
        background-color="#0d569f"
        text-color="#fff"
      >
        <!-- 处理多级路由的情况 -->
        <sidebar-item
          v-for="(route, index) in routes" 
          :key="route.path + index" 
          :item="route" 
          :base-path="route.path"
          :collapse="!isCollpase"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
    name: 'Sidebar',
    components: {
      Logo,
      SidebarItem
    },
    data(){

        return {

        }
    },
    computed: {
      routes() {
        // 过滤不显示的路由项
        return this.$router.options.routes.filter(item => !item.hidden)
      },
      hasLogo() {
        return true
      },
      isCollpase() {
        // 侧边导航的展开状态
        return this.$store.state.app.sidebar.opened
      },
      activeMenu() {
        const route = this.$route
        let { meta, path } = route
        path = path.endsWith('/') ? path.slice(0,path.length -1) : path
        console.log('current PATH', typeof path);
        return meta.activeMenu ? meta.activeMenu : path
      }
    },
}
</script>

<style lang="scss" scoped>
.elmenu-container {
  width: 100%;
  text-align: center;
}

.has-logo {
  .scrollbar-wrapper {
     /* logo content height 50px */
    height: calc(100% - 50px) !important;
    overflow-x: hidden !important;
  }
}

.el-scrollbar {
  height: 100% !important;
}
</style>
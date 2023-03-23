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
        <sidebar-item v-for="item in routes" :key="item.path" :item="item" :base-path="item.path" :collpase="isCollpase"/>
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
        const { meta , path } = route
        // 路由源数据中设置了 activeMenu 则会高光
        if(meta.activeMenu) {
          return meta.activeMenu
        }
        console.log('this.path', path);
        return path
      }
    },
    mounted() {
      console.log('mounted', this.$route);
    }
}
</script>

<style lang="scss" scoped>
.elmenu-container {
  width: 100%;
  text-align: center;
}

.has-logo {
  .scrollbar-wrapper {
     /* has logo content height 50px */
    height: calc(100% - 50px) !important;
    overflow-x: hidden !important;
  }
}

.el-scrollbar {
  height: 100% !important;
}
</style>
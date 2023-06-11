<template>
  <div :class="{ 'has-logo': hasLogo }">
    <logo v-if="hasLogo" :collapse="isCollpase" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- el-menu 自身的过度效果需要关闭（collpase-transition），否则会引起过渡 bug -->
      <el-menu
        class="elmenu-container"
        mode="vertical"
        :unique-opened="true"
        :collapse="isCollpase"
        :default-active="activeMenu"
        :collapse-transition="false"
        background-color="#0d569f"
        text-color="#fff"
      >
        <!-- 处理多级路由的情况 -->
        <sidebar-item
          v-for="(route, index) in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: {
    Logo,
    SidebarItem,
  },
  data() {
    return {};
  },
  computed: {
    routes() {
      // 过滤不显示的路由项
      return this.$router.options.routes.filter((item) => !item.hidden);
    },
    hasLogo() {
      return true;
    },
    isCollpase() {
      // 侧边导航的展开状态
      return this.$store.state.app.sidebar.opened;
    },
    activeMenu() {
      const { path } = this.$route;
      return path.toString();
    },
  },
  mounted() {},
};
</script>
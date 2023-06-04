<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from "./components";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        "hidden-sidebar": this.sidebar.opened,
      };
    },
  },
};
</script>
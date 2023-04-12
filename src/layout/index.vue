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
import { Sidebar, Navbar, AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        'hidden-sidebar': this.sidebar.opened
      }
    }
  }
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  color: #fff;
  height: 100%;
  width: 200px;
  background-color: #0d569f;
  opacity: 0.9;
  transition: width 300ms ease-in;
}

.main-container {
  position: relative;
  min-height: 100%;
  margin-left: 200px;
  transition: margin-left 300ms ease-in;
}
</style>
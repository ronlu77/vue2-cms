<template>
    <div class="navbar-wrapper">
      <hamburger class="hamburger-container" :is-active="sidebar.opened" @toggleClick="toggleClick"/>
      <navtop class="navtop-container"/>
      <div class="nav-right">
        <el-dropdown placement="bottom" split-button hide-on-click>
          <span>userinfo</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Setting</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </template>
  
  <script>
  import Hamburger from '@/components/Hamburger'
  import Navtop from '@/components/Navtop'
  
  export default {
      name: 'Navbar',
      components: {
        Hamburger,
        Navtop
      },
      computed: {
        sidebar() {
          return this.$store.state.app.sidebar
        }
      },
      methods: {
        toggleClick() {
          this.$store.dispatch('app/toggleSidebar')
        },
        async handleLogout() {
          await this.$store.dispatch('user/Logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
      }
  }
  </script>
  
  <style lang="scss">
  .navbar-wrapper {
    position: relative;
    width: 100%;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,21,41,0.1);
  
   .hamburger-container {
      line-height: 46px;
      height: 100%;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;
      cursor: pointer;
      
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  
    .navtop-container {
      float: left;
      height: 100%;
      overflow: hidden;
    }
  
    .nav-right {
      float: right;
      cursor: pointer;
      line-height: 50px;
      margin-right: 15px;
    }
  }
  </style>
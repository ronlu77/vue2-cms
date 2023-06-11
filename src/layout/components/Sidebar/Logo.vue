<template>
  <div class="sidebar-logo-container" :class="{ isHasLogo: 'has-logo' }">
    <transition name="siedebarLogoFade">
      <router-link to="/">
        <img v-if="logo" :src="logo" />
        <span v-if="!collpase">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      title: "Vue CMS",
      logo: "https://p3-passport.byteimg.com/img/user-avatar/02a43675ca9234e9aaa4e30ac2accb09~100x100.awebp",
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-weight: 800;
  border-bottom: 2px solid #fff;

  a {
    text-align: center !important;
  }
}

.has-logo {
  img {
    display: inline-block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    position: relative;
    top: 8px;
  }
}

.siedebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.siedebarLogoFade-enter,
.siedebarLogoFade-leave-to {
  opacity: 0;
}
</style>
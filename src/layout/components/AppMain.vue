<template>
  <section class="app-main">
    <transition>
      <!-- 属性key 是用来充当路由是否更改的判断标识 -->
      <router-view :key="key"></router-view>
    </transition>
    <div class="copyright">vue-cms-ron</div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      // path： 判断路由地址是否发生变化，变化了就更新;
      // fullpath：只要路由发生变化，就会更新。
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" soped>
.app-main {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;

  .copyright {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
  }
}
</style>
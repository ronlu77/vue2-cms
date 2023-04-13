<template>
  <section class="app-main">
    <!-- transition 是为了实现路由切换的动画效果, mode：添加过度模式，处理上一个组件还未过渡完成造成的卡顿 -->
    <transition name="fade-transform" mode="out-in">
      <!-- 属性key 是用来充当路由是否更改的判断标识, 使得不同路由的相同组件可以复用，保证了路由切换可以触发生命周期钩子 -->
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
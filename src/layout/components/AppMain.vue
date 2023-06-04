<template>
  <section class="app-main">
    <!-- transition 是为了实现路由切换的动画效果, mode：添加过度模式，处理上一个组件还未过渡完成造成的卡顿 -->
    <transition name="fade-transform" mode="out-in">
      <!-- keep-alive 用来缓存路由 -->
      <keep-alive>
        <!-- 属性key 是用来充当路由是否更改的判断标识(需要确保唯一), 使得不同路由的相同组件可以复用，保证了路由切换可以触发生命周期钩子 -->
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
    <div class="copyright">2023&nbsp;-&nbsp;{{ currentYear }}&nbsp;vue-cms by ron</div>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    key() {
      // path： 判断路由地址是否发生变化，变化了就更新;
      // fullpath：只要路由发生变化，就会更新。
      return this.$route.path;
    },
  },
};
</script>
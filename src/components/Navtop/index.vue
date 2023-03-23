<template>
  <div>
    <el-menu class="navtop" mode="horizontal" :default-active="1-1" ellipsis active-text-color="#000">
        <el-menu-item v-for="item in navtopList" :key="item.url" :index="item.url">
            <template #title>
                <span>{{item.title}}</span>
            </template>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    name: "Navtop",
    data() {
        return {
            navtopList: []
        }
    },
    computed: {
    },
    mounted() {
    }
}
</script>

<style lang="scss">

</style>
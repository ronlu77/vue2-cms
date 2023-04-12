<template>
  <div>
    <!-- 利用动态组件实现同时支持外部链接和内部路由 -->
    <component :is="type" v-bind="linkProp(to)">
        <slot></slot>
    </component>
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
    name: 'Link',
    props: {
        to: {
            type: String,
            required: true,
        }
    },
    data() {
        return {}
    },
    computed: {
        isExternal() {
            return isExternal(this.to)
        },
        type() {
            if(this.isExternal) {
                return 'a'              // 外部链接使用 a 标签
            } else {
                return 'router-link'    // 内部连接用 router-link 类型
            }
        }
    },
    methods: {
        // 动态绑定属性，如果是外部连接开启新视口，如果是本地路由则直接跳转
        linkProp(to) {
            if(this.isExternal) {
                return {
                    href: to,
                    target: '_blank',
                    rel: noopepear
                }
            }
            console.log('current route-link to',to);
            return {
                to: to
            }
        }
    }
}
</script>
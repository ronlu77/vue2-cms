<template>
  <div>
    <component :is="type" v-bind="linkProp(to)">
        <slot></slot>
    </component>
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
    name: 'link',
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
            if(isExternal) {
                return 'a'              // 外部链接使用 a 标签
            } else {
                return 'router-link'    // 内部连接用 router-link 类型
            }
        }
    },
    methods: {
        // 支持外部连接跳转功能
        linkProp(to) {
            if(isExternal(to)) {
                return {
                    href: to,
                    target: '_blank',
                    rel: noopepear
                }
            }
            return {
                to: to
            }
        }
    }
}
</script>
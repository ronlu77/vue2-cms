<template>
  <div>
    <component :is="type" v-bind="linkProps(to)">
      <slot />
    </component>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  name: "Link",
  props: {
    to: {
      required: true,
      type: String,
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return "a"; // 外部链接使用 a 标签
      } else {
        return "router-link"; // 内部连接用 router-link 类型
      }
    },
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        to: to,
      };
    },
  },
};
</script>
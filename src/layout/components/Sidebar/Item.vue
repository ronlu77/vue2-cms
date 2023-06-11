<script>
export default {
  name: "MenuItem",
  functional: true, // 声明为函数式组件，没有method、mounted等提高性能
  props: {
    meta: {
      type: Object,
      required: true,
      defualt: {
        title: "",
        icon: "",
      },
    },
  },
  render: (h, context) => {
    const { title, icon } = context.props.meta;
    const vnodes = [];
    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    }
    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>
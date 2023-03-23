<script>
export default {
    name: 'MenuItem',
    functional: true, // 声明为函数式组件，没有method、mounted等提高性能
    props: {
        meta: {
            type: Object,
            required: true,
            defualt: ''
        }
    },
    render: (h, context) => {
        const { title, icon } = context.props.meta
        const vnode = []
        if(icon) {
            if(icon.includes('el-icon')) {
                vnode.push(<i class={[icon]}/>)
            }else {
                vnode.push(<svg></svg>)
            }
        }
        if(title) {
            vnode.push(<span slot='title'>{(title)}</span>)
        }
        return vnode
    }
}
</script>
import store from '@/store'

function checkPerssion(el, binding) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array) {
        if (value.length > 0) {
            const permissionRoles = value
            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role)
            })
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error("need roles! Like v-permission=['admin']")
        }
    }
}

export default {
    inserted(el, binding) {
        checkPerssion(el, binding)
    },
    update(el, binding) {
        checkPerssion(el, binding)
    }
} 
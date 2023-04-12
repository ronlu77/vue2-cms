import { constantRoutes, asyncRouterMap } from "@/router"


function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(route => route.meta.role.includes(route))
    } else {
        return true
    }
}

const permission = {
    state: {
        routes: constantRoutes,
    },
    mutations: {

    },
    actions: {
        // 传入参数为用用户的数据,含有用户权限
        GenerateRoutes({ commit }, data) {
            const { roles } = data
            return new Promise((resolve, reject) => {
                // 模拟从后端动态获取路由
                const asyncRoutes = asyncRouterMap.filter(route => {
                    if (roles.includes('admin')) return true
                    if (hasPermission(roles, route)) {
                        if (route.children && route.children.length) {
                            
                        }
                    }
                })
            })
        }
    },
    getters: {

    }
}

export default permission
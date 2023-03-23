import Cookies from "js-cookie"

const state = {
    sidebar: {
        opened: Cookies.get('sidebarOpenStatus') ? !!+Cookies.get('sidebarOpenStatus') : true
    }
}

const mutations = {
    TOGGLE_SIDEBAR: (state) => {
        state.sidebar.opened = !state.sidebar.opened
        if(state.sidebar.opened) {
            Cookies.set('sidebarOpenStatus', 1)
        } else {
            Cookies.set('sidebarOpenStatus', 0)
        }
    }
}

const actions = {
    toggleSidebar: ({commit}) => {
        console.log('toggle Sidebar');
        commit('TOGGLE_SIDEBAR')
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
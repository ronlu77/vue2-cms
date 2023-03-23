import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken} from '@/utils/auth'

const state = {
    token: getToken(),
    name: '',
    avator: '',
}

const mutations = {
    SET_TOKEN: (token) => {
        state.token = token
    },
    SET_USERNAME: (state, name) => {
        state.name = name
    },
    SET_AVATOR: (state, avator) => {
        state.avator = avator
    },
    RESETINFO: (state) => {
        state.name = ""
        state.avator = ""
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo

        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => reject(error))
        })
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo(state.token).then(response => {
                const { data } = response
                commit('SET_USERNAME', data.name)
                commit('SET_AVATOR', data.avator || '')
                resolve()
            }).catch(error => reject(error))
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(response => {
                const { code } = response
                if(code === 200) {
                    removeToken()
                    commit('RESETINFO')
                }
                resolve()
            }).catch(error => reject(error))
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
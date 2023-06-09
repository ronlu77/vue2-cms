import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app'
import user from './modules/user'

import getters from './getters'

const store = new Vuex.Store({
    modules: {
        app,
        user,
    },
    getters
})

export default store
// 使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import url from 'js/api.js'
// 创建store实例
export const store = new Vuex.Store({
  // 数据定义
  state: {
    lists: null
  },
  // 数据修改，同步触发
  mutations: {
    init(state, lists) {
      state.lists = lists
    }
  },
  // 异步操作的数据，只能调用mutations
  actions: {
    getLists({commit}){
      axios.get(url.addressLists)
      .then(res => {
        store.commit('init',res.data.lists)
      })
    }
  }
})

export default store
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
    },
    add(state, instance){
      state.lists.push(instance)
    },
    remove(state, id){
      let lists = state.lists
      let index = lists.findIndex(item =>{
        return item.id == id
      })
      lists.splice(index,1)
    },
    update(state, instance) {
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item =>{
        return item.id == instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
    setDefault(state, id) {
      let lists = state.lists
      lists.forEach(item =>{
        item.isDefault = item.id == id ? true : false
      })
    }
  },
  // 异步操作的数据，只能调用mutations
  actions: {
    getLists({commit}){
      axios.get(url.addressLists)
      .then(res => {
        commit('init',res.data.lists)
      })
    },
    addAction({commit},instance){
      axios.post(url.addressAdd, instance)
      .then(res => {
        // 模拟添加id,instance最好后台返回
        instance.id = parseInt(Math.random()*10000)
        commit('add', instance)
      })
    },
    removeAction({commit}, id){
      axios.post(url.addressRemove,id)
      .then(res => {
        commit('remove', id)
      })
    },
    updateAction({commit},instance){
      axios.post(url.addressUpdate,instance)
      .then(res => {
        commit('update', instance)
      })
    },
    setDefaultAction({commit},id){
      axios.post(url.addressSetDefault,id)
      .then(res => {
        commit('setDefault', id)
      })
    }
  }
})

export default store
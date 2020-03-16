// 1、使用vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import member from './components/member.vue'
Vue.use(VueRouter)

let routes = [{
  path: '/',
  component: require('./components/member.vue')
}]

// 2、创建vue-router实例
let router = new VueRouter({
  routes
})


new Vue({
  el: '#app',
  router,
  render: h => h(member),
})
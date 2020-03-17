// 1、使用vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
  { path: '/', component: require('./components/member.vue').default},
  { path: '/address', component: require('./components/address.vue').default}
]

// 2、创建vue-router实例
let router = new VueRouter({
  routes
})


new Vue({
  el: '#app',
  router

}).$mount('#app');
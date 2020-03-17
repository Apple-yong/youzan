// 1、使用vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import member from '../components/member.vue'
import allAddress from '../components/allAddress.vue'
import address from '../components/address.vue'
import form from '../components/form.vue'


let routes = [
  { path: '/', component: member},
  { path: '/address', 
    component: address,
    children: [
      { 
        path: '',
        // component: require('./components/all.vue').default,
        redirect: 'allAddress'  // 重定向
      },
      { 
        path: 'allAddress',
        name: 'allAddress',
        component: allAddress,
      },
      { 
        path: 'form',
        name: 'form',
        component: form
      }
    ]
  }
]

// 2、创建vue-router实例
let router = new VueRouter({
  routes
})

export default router
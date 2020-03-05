import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
// import Foot from 'components/Footer.vue'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },
  created() {
    this.getTopList()
    this.getSubList(0)
  },
  methods: {
    getTopList() {
      axios.get(url.topLists)
      .then(res => {
        this.topLists = res.data.lists
      })
    },
    getSubList(index,id) {
      this.topIndex = index
      if(index===0){
        this.getRank()
      }else{
        axios.get(url.subList, {id})
        .then(res => {
          this.subData = res.data.data
        })
      }
      
    },
    getRank() {
      axios.get(url.rank)
      .then(res => {
        this.rankData = res.data.data
      })
    },
    toSearch(list){
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  mixins: [mixin]
  // components: {
  //   Foot
  // },
  // filters: {
  //   numFilter (value) {
  //     let realVal = ''
  //     if (!isNaN(value) && value!== '') {
  //       // 截取当前数据到小数点后两位
  //       realVal = parseFloat(value).toFixed(2)
  //     } else {
  //       realVal = '--'
  //     }
  //     return realVal
  //   }
  // }
})


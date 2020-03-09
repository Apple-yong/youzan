import './search.css'
import 'css/common.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'
// Velocity动画插件
import Velocity from 'velocity-animate'

let {keyword, id} = qs.parse(location.search.substr(1))

new Vue({
  el: '.container',
  data: {
    searchList: null,
    keyword,
    isShow: false,
    scroll: null
  },
  created(){
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      axios.get(url.searchList, {keyword, id})
      .then(res => {
        this.searchList = res.data.lists
      })
    },
    move() {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if(this.scroll > 100) {
        this.isShow = true
      }else {
        this.isShow = false
      }
    },
    toTop() {
      Velocity(document.body, 'scroll', {duration: 1000})
    }
  },
  mixins: [mixin]
})
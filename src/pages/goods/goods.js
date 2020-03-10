import './goods.css'
import './goods_base.css'
import './goods_common.css'
import './goods_custom.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_theme.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'
import swipe from 'components/swipe.vue'

// 获取url的id值
let {id} = qs.parse(location.search.substr(1))
let detailTab = ['商品详情', '本店成交']

new Vue({
    el: '#app',
    data: {
        details: null,
        detailTab,
        tabIndex: 0,
        dealLists: null,
        bannerLists: null
    },
    methods: {
        getDetails(){
            axios.get(url.details, {id})
            .then(res => {
                this.details = res.data.data
                this.bannerLists = []
                this.details.imgs.forEach(element => {
                  this.bannerLists.push({
                    clickUrl: '',
                    img: element
                  })
                });
            })
        },
        changeTab(index){
            this.tabIndex = index
            if(index === 1){
                this.getDeal()
            }
        },
        getDeal(){
            axios.get(url.deal, {id})
            .then(res => {
                this.dealLists = res.data.data.lists
            })
        }
    },
    created(){
        this.getDetails()
    },
    components: {
      swipe
    },
    mixins: [mixin]
})
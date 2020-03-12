import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'


new Vue({
    el:'.container',
    data: {
        lists: null,
        totalPrice: 0
    },
    created(){
        this.getList()
    },
    computed: {
        allSelected: {
            // get根据店铺来判断
            get(){
                if(this.lists && this.lists.length){
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    });
                });
            }
        },
        selectLists() {
            if(this.lists && this.lists.length){
                let arr = []
                let totalPrice = 0
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if(good.checked){
                            arr.push(good)
                            totalPrice += good.price * good.number
                        }
                    })
                })
                this.totalPrice = totalPrice
                return arr
            }
            return []
        }
    },
    methods: {
        getList() {
            axios.get(url.cartLists).then(res => {
                // 先处理，再赋值，响应式原理
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true
                    shop.goodsList.forEach(good => {
                        good.checked = true
                    })
                })
                this.lists = lists
            })
        },
        // 商品选择
        selectGood(shop,good){
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good => {
                return good.checked
            })
        },
        // 店铺选择后里面商品全选
        selectShop(shop){
            shop.checked = !shop.checked
            shop.goodsList.forEach(good => {
                good.checked = shop.checked
            })
        },
        // 全选
        selectAll(){
            this.allSelected = !this.allSelected
        }
    },
    mixins: [mixin]
})





































// import Mock from 'mockjs'
// let Random = Mock.Random

// let data = Mock.mock({
//     "goodsImage|5": [{
//         id: Random.int(100,1000),
//         image: Random.image('200x100',Random.color())
//     }]
// })


// console.log(data)
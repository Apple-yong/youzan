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
        totalPrice: 0,
        editingShop: null,
        editingShopIndex: -1,
        // 是否进行删除
        removePopup: false,
        removeData: null
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
        allRemoveSelected: {
            get() {
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good => {
                        good.removeChecked = newVal
                    })
                }
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
        },
        removeLists() {
            if(this.editingShop){
               let arr = []
               this.editingShop.goodsList.forEach(good => {
                    if(good.removeChecked){
                        arr.push(good)
                    }
               })
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
                    // 初始状态
                    shop.checked = false
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = false
                        good.removeChecked = false
                    })
                })
                this.lists = lists
            })
        },
        // 商品选择
        selectGood(shop,good){
            // 判断是否在编辑状态，编辑是removeChecked，正常是checked
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },
        // 店铺选择后里面商品全选
        selectShop(shop){
            // 判断是否在编辑状态，编辑是removeChecked，正常是checked
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        // 全选
        selectAll(){
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item,i) => {
                if(shopIndex !== i){
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(good){
            if(good.number === 1) return
            axios.post(url.cartReduce, {
                id: good.id,
                number: 1
            })
            .then(res => {
                good.number--
            })
        },
        add(good){
            axios.post(url.cartAdd, {
                id: good.id,
                number: 1
            })
            .then(res => {
                good.number++
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            this.removePopup = true
            this.removeData = {shop,shopIndex,good,goodIndex}
        },
        removeConfirm(){
            let {shop,shopIndex,good,goodIndex} = this.removeData
            axios.post(url.cartRemove,{
                id: good.id
            })
            .then(res => {
                shop.goodsList.splice(goodIndex, 1)
                if(!shop.goodsList.length){
                    this.lists.splice(shopIndex, 1)
                    this.removeShop()
                }
                this.removePopup = false
            })
        },
        // 删除完店铺所有商品，回到编辑状态
        removeShop() {
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop => {
                shop.editingMsg = '编辑'
                shop.editing = false
            });
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
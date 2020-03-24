<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" >
      <a class="block-item js-address-item address-item" 
        @click="toEdit(list)"
        :class="{'address-item-default':list.isDefault}"
        v-for="list in lists"
        :key="list.id"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
        :to="{ name: 'form', query:{type: 'add'}}"
      >
            新增地址
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  @import 'https://meyerweb.com/eric/tools/css/reset/reset200802.css';
  @import './css/address_base.css';
  @import './css/address.css';
</style>

<script>
  export default {
    // data(){
    //   return {
    //     lists: null
    //   }
    // },
    computed: {
      lists(){
        return this.$store.state.lists
      }
    },
    created(){
      // this.getLists()
      if(!this.lists){
        this.$store.dispatch('getLists')
      }
    },
    methods: {
      toEdit(list){
        this.$router.push({name: 'form', query: {
          type: 'edit',
          instance: list
        }})
      },
      // getLists(){
      //   axios.get(url.addressLists)
      //   .then(res => {
      //     this.lists = res.data.lists
      //   })
      //   .catch(err => {
      //     console.error(err); 
      //   })
      // }
    }
  }
</script>
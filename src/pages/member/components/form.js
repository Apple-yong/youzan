import axios from 'axios'
import url from 'js/api.js'
export default {
    data() {
      return {
        name: '',
        tel: '',
        provinceValue: -1,
        cityValue: -1,
        districtValue: -1,
        address: '',
        id: '',
        type: this.$route.query.type,
        addressData: require('js/address.json'),
        cityList: null,
        districtList: null,
        instance: this.$route.query.instance,
        // instance: JSON.parse(sessionStorage.getItem('instance'))
      }
    },
    created() {
      if(this.type === 'edit') {
        let ad = this.instance
        this.provinceValue = parseInt(ad.provinceValue)
        this.name = ad.name
        this.tel = ad.tel
        this.address = ad.address
        this.id = ad.id
      }
    },
    computed: {
      lists(){
        return this.$store.state.lists
      }
    },
    methods: {
      add() {
        // 校验
        let {name, tel, provinceValue, cityValue, districtValue, address} = this
        let data = {name, tel, provinceValue, cityValue, districtValue, address}
        if(this.type === 'add'){
          this.$store.dispatch('addAction',data)
        }
        if(this.type === 'edit') {
          data.id = this.id
          // axios.post(url.addressUpdate,data)
          // .then(res => {
          //   this.$router.go(-1)
          // })
          this.$store.dispatch('updateAction',data)
        }
      },
      remove() {
        if (window.confirm("确认删除?")) { 
            // axios.post(url.addressRemove,this.id)
            // .then(res => {
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('removeAction',this.id)
        } 
      },
      setDefault() {
        // axios.post(url.addressSetDefault,this.id)
        // .then(res => {
        //     this.$router.go(-1)
        // })
        this.$store.dispatch('setDefaultAction',this.id)
      }
    },
    watch: {
      lists: {
        handler() {
          this.$router.go(-1)  // 对lists数据进行监听，数据变化就跳转
        },
        deep: true  // 深度监听
      },
      provinceValue(val) {  // val是这个省份的value
        if(val === -1) return
        let index = this.addressData.list.findIndex(item => {
          return item.value === val
        })
        this.cityList = this.addressData.list[index].children
        this.cityValue = -1
        this.districtValue = -1
        if(this.type === 'edit') {
          this.cityValue = parseInt(this.instance.cityValue)
          this.cityValue = -1
        }
      },
      cityValue(val) {
        if(val === -1) return
        let index = this.cityList.findIndex(item => {
          return item.value === val
        })
        this.districtList = this.cityList[index].children
        this.districtValue = -1
        if(this.type === 'edit') {
          this.districtValue = parseInt(this.instance.districtValue)
          this.districtValue = -1
        }
      }
    }
  }
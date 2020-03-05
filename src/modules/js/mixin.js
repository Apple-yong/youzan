import Foot from 'components/Footer.vue'

let mixin = {
  filters: {
    currency (value) {
      let realVal = ''
      if (!isNaN(value) && value!== '') {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  components: {
    Foot
  }
}
export default mixin
let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  topLists: '/category/topList',
  rank: '/category/rank',
  subList: '/category/subList',
  searchList: '/search/list',
  details: '/goods/details',
  deal: '/goods/deal',
  addCart: '/cart/add',
  cartLists: '/cart/list',
  cartUpdate: '/cart/update',
  cartReduce: '/cart/reduce',
  cartRemove: '/cart/remove',
  cartMrremove: '/cart/mrremove',
  addressLists: '/address/list',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressUpdate: '/address/update',
  addressSetDefault: '/address/setDefault'
}
// 开发环境和真实环境的切换
// let host = ''
let host = 'http://rap2api.taobao.org/app/mock/7058'
// let host = 'https://www.easy-mock.com/mock/5c9c3045d172204b3a07ecb0/youzan'


for (const key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url

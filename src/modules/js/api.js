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
  cartMrremove: '/cart/mrremove'
}
// 开发环境和真实环境的切换
// let host = ''
let host = 'http://rap2api.taobao.org/app/mock/7058'

for (const key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url

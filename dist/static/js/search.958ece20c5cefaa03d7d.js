webpackJsonp([5],{"035s":function(t,e){},"0mhr":function(t,e){},5636:function(t,e){},TFhR:function(t,e,a){"use strict";var r={hotLists:"/index/hotLists",banner:"/index/banner",topLists:"/category/topList",rank:"/category/rank",subList:"/category/subList",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",cartLists:"/cart/list",cartUpdate:"/cart/update",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMrremove:"/cart/mrremove",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var s in r)r.hasOwnProperty(s)&&(r[s]="http://rap2api.taobao.org/app/mock/7058"+r[s]);e.a=r},TVmP:function(t,e,a){"use strict";var r=a("mw3O"),s=a.n(r).a.parse(location.search.substr(1)).index,n=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],o={data:function(){return{navConfig:n,curIndex:parseInt(s)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,r){return a("li",{key:e.index,class:{active:r===t.curIndex},on:{click:function(a){return t.changeNav(e,r)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}),0)])},staticRenderFns:[]};var i=a("VU/8")(o,c,!1,function(t){a("5636")},"data-v-d00daa7e",null);e.a=i.exports},"U/rD":function(t,e,a){"use strict";var r={filters:{currency:function(t){return isNaN(t)||""===t?"--":parseFloat(t).toFixed(2)}},components:{Foot:a("TVmP").a}};e.a=r},sSMw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("0mhr"),s=(a.n(r),a("035s")),n=(a.n(s),a("7+uW")),o=a("mtWM"),c=a.n(o),i=a("TFhR"),d=a("U/rD"),u=a("mw3O"),l=a.n(u),h=a("9qgI"),m=a.n(h),f=l.a.parse(location.search.substr(1)),v=f.keyword,p=f.id;new n.default({el:".container",data:{searchList:null,keyword:v,isShow:!1,scroll:null},created:function(){this.getSearchList()},methods:{getSearchList:function(){var t=this;c.a.get(i.a.searchList,{keyword:v,id:p}).then(function(e){t.searchList=e.data.lists})},move:function(){this.scroll=document.documentElement.scrollTop||document.body.scrollTop,this.scroll>100?this.isShow=!0:this.isShow=!1},toTop:function(){m()(document.body,"scroll",{duration:1e3})}},mixins:[d.a]})}},["sSMw"]);
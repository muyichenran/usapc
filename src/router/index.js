import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Common/Login'
import GoodsList from '@/components/Goods/goodsList'
import GoodsDetail from '@/components/Goods/goodsDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
    },
    {
      path: '/GoodsDetail',
      component: GoodsDetail
    },
    {
    	path: '/Login',
      component: Login
    }
  ]
})

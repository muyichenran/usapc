import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Common/Login'
import GoodsList from '@/components/Goods/goodsList'
import GoodsDetail from '@/components/Goods/goodsDetail'
import Index from '@/components/Index/Index'

import orderHistory from '@/components/order/orderHistory'
import shoppingCart from '@/components/order/shoppingCart'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/Index',
      component: Index
    },
    {
      path: '/GoodsDetail',
      component: GoodsDetail
    },
    {
    	path: '/GoodsList',
      component: GoodsList
    },
    {
    	path: '/orderHistory',
      component: orderHistory
    },
    {
    	path: '/shoppingCart',
      component: shoppingCart
    }
  ]
})

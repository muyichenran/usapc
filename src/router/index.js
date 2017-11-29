import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/components/Goods/goodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
    }
  ]
})

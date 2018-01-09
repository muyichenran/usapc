import Vue from 'vue';
import Vuex from 'vuex';
import cookie from  'vue-cookie'
Vue.use(Vuex);
Vue.use(cookie);
// 需要维护的状态
const state = {
  common:{},  
  orderList:[],
  userLogin:''
};
var vm=this;
const mutations = {
  // 登陆
  LOG_IN(state, userLogin){
      state.userLogin=userLogin;
  },
  cart_Goods(state, orderList){
    state.orderList=orderList;
  },
  LOG_OFF(state) {
    state.userLogin='';
    // cookie.delete('userId', {domain: 'helpyoulove.com'});
    // cookie.delete('token', {domain: 'helpyoulove.com'});
  },
};
export default new Vuex.Store({
  state,
  mutations,
});
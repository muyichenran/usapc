import Vue from 'vue';
import Vuex from 'vuex';
import cookie from  'vue-cookie'
Vue.use(Vuex);
Vue.use(cookie);
// 需要维护的状态
const state = {
  common:{},  
  orderList:JSON.parse(localStorage.getItem("cartGoods")),
  userLogin:''
};
var vm=this;
const mutations = {
  // 登陆
  LOG_IN(state, userLogin){
      state.userLogin=userLogin;
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
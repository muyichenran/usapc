// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource';
import ElementUI from 'element-ui'
import cookie from  'vue-cookie'


import 'element-ui/lib/theme-default/index.css'
Vue.use(cookie);
Vue.use(ElementUI)
Vue.use(VueResource);
Vue.config.productionTip = false
Vue.http.options.credentials = true
Vue.http.options.xhr = {withCredentials: true}
router.beforeEach(({meta, path}, from, next) => {
    if(cookie.get('userLogin')==null||cookie.get('userLogin')==undefined){
      if(path=="/login"||path=="/Login"){
        next()
      }else{       
        next({
          path: '/Login'
        })
      }
    }else{     
      if(path=="/login"||path=="/Login"){
        next({
          path: '/Index'
        })
      }else{
        next()
      }
    }    
})
Vue.filter('formatTime',function(time){
  var year=new Date(time).getFullYear();
  var mou=new Date(time).getMonth()+1;
  var day=new Date(time).getDate();
  var hour=new Date(time).getHours();
  var min=new Date(time).getMinutes();
  if (mou < 10) {
    mou = '0' + mou;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (min < 10) {
    min = '0' + min;
  }
  time=year+'-'+mou+'-'+day+' '+ hour +':'+min
  return time;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

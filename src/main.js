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

    if(cookie.get('JSESSIONID')==null||cookie.get('JSESSIONID')==undefined){
      if(path=="/login"||path=="/Login"){
        next()
      }else{       
        next({
          path: '/Login'
        })
      }
    }else{
      alert('2')
     
      if(path=="/login"||path=="/Login"){
        next({
          path: '/Index'
        })
      }else{
        next()
      }
    }    
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

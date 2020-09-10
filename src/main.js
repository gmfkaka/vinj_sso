// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import * as util from './utils/util'
import * as api from './api/api'
import filters from './utils/filter.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/reset.css'
import './assets/style/global.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  adapter: {
    loaded ({
      bindType,
      el,
      naturalHeight,
      naturalWidth,
      $parent,
      src,
      loading,
      error,
      Init
    }) {
      // do something here
      // example for call LoadedHandler
      // console.log(el)
      el.style.width = 'unset'
    },
    loading (listender, Init) {
      // console.log('loading')
    },
    error (listender, Init) {
      // console.log('error')
    }
  }
})
Vue.use(ElementUI)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
util.defVueProto({
  api,
  util
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

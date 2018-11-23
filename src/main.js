import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

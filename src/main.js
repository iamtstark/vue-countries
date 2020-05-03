import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(Vuex)
Vue.config.productionTip = false

// configure vuex here

new Vue({
  render: h => h(App),
}).$mount('#app')

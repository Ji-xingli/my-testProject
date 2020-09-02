import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import notice from './utils/create.js'
Vue.use(notice);


import router from './krouter';
// import router from './router';

// import store from './store'
import store from './kstore'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()



new Vue({
  router,//此处挂上VueRouter实例，让子组件路由可以使用；
  store,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './app.vue';
import router from './router/index';
import store from './store/';
import ElementUI from 'element-ui';
import axios from './util/http'

console.log(qs);
Vue.prototype.$axios = axios;
window.Promise = Promise;

Vue.config.productionTip = false;

Vue.use(ElementUI);

// 路由守卫
router.beforeEach(({meta, path}, from, next) => {
  console.log(path);
  next();
});

/* eslint-disable no-new */
window.Vue = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
});

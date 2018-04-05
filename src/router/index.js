'use strict';

/**
 * 路由
 */
import Vue from 'vue';
import Router from 'vue-router';

import App from '../app.vue';

Vue.use(Router);


const routes = {
  path: '/',
  component: App,
  children: [
    { path: '/index',redirect:'/service'},
    { path: '/service', meta: { title: '服务端' }, component: view('service') },
    { path: '/*', meta: { title: 'page not found' }, component: view('404')} // 页面不存在, 只能放在路由最后面
  ]
};

// 异步加载
// function view (name) { return (resolve) => require(['@/components/' + name + '.vue'], resolve); };
function view (name) {
  return (resolve) => {
    require(['@/components/' + name + '.vue'], resolve);
  };
}
// export router
// @TODO if browser supports history.pushState

export default new Router({
  strict: process.env.NODE_ENV !== 'production', // use strict mode if not in production environment
  routes: [routes],
  mode: 'history'
});

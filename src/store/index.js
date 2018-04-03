/**
 * Vuex.Store
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//全局通用 root
import root from './root';





const modules = {
  root
};


// export
export default new Vuex.Store({ modules });

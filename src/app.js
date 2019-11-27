import '@babel/polyfill';
import Vue from 'vue';
import App from '@/views/App';

import heyuiConfig from 'js/config/heyui-config';
import routerConfig from 'js/config/router/router-config';
import store from 'js/vuex/store';
import 'js/vue/components';
import 'js/vue/filters';

require('./css/app.less');

// 开发环境判断
// eslint-disable-next-line no-unused-expressions
// process.env.NODE_ENV === 'development';

// 使用mock文件， 自己开发的时候请删除
require('../mock/index');

// 设定全局变量请参考根目录下的hey.conf.js文件
heyuiConfig();
Vue.use(HeyUI);

const router = routerConfig();

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

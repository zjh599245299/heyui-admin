import '@babel/polyfill';
import Vue from 'vue';
import App from '@/views/App';
// heyui相关配置
import heyuiConfig from 'js/config/heyui-config';
// 路由配置
import router from 'js/router';
// vuex配置
import store from 'js/vuex/store';
// 组件注册
import 'js/vue/components';
// filter注册
import 'js/vue/filters';
// 指令注册
import 'js/vue/directives';
require('./css/app.less');
// 开发环境判断
// eslint-disable-next-line no-unused-expressions
// process.env.NODE_ENV === 'development';
// 使用mock文件， 自己开发的时候请删除
require('../mock/index');
// 设定全局变量请参考根目录下的hey.conf.js文件
heyuiConfig();
Vue.use(HeyUI);

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import VueRouter from 'vue-router';
import demoComponents from './demo-components';
import { isAuthPage } from 'js/config/menu-config';

Vue.use(VueRouter);

const initRouter = () => {
  const routerParam = {
    mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ 'views/login/index')
      },
      {
        path: '/',
        component: () => import(/* webpackChunkName: "app-frame" */ 'components/app/app-frame'),
        children: [
          {
            path: '',
            name: 'Home',
            component: () => import(/* webpackChunkName: "app-home" */ 'views/home/index'),
            meta: { title: '首页', icon: 'icon-monitor' }
          },
          {
            path: '/system-error',
            name: 'SystemError',
            component: () => import(/* webpackChunkName: "app-error-page" */ 'views/error-pages/500'),
            meta: { title: '系统错误' }
          },
          {
            path: '/permission-error',
            name: 'PermissionError',
            component: () => import(/* webpackChunkName: "app-error-page" */ 'views/error-pages/403'),
            meta: { title: '权限错误' }
          },
          {
            path: '/notfound-error',
            name: 'NotfoundError',
            component: () => import(/* webpackChunkName: "app-error-page" */ 'views/error-pages/404'),
            meta: { title: '页面找不到' }
          },
          {
            path: '/authorization',
            name: 'Authorization',
            component: () => import(/* webpackChunkName: "app-authorization" */ 'views/management/authorization'),
            meta: { title: '权限管理' }
          },
          {
            path: '/users',
            name: 'Users',
            component: () => import(/* webpackChunkName: "app-users" */ 'views/management/users'),
            meta: { title: '用户管理' }
          },
          ...demoComponents,
          {
            path: '*',
            name: 'CommonNotfoundError',
            component: () => import(/* webpackChunkName: "app-error-page" */ 'views/error-pages/404'),
            meta: { title: '页面找不到' }
          }
        ]
      }
    ]
  };

  let router = new VueRouter(routerParam);
  let isFirstRouter = true;

  router.beforeEach((to, from, next) => {
    if (!isFirstRouter && !isAuthPage(to.name)) {
      next({ name: 'PermissionError' });
      return;
    }
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 管理应用';
    } else {
      document.title = '管理系统';
    }
    isFirstRouter = false;
    next();
  });
  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let layoutContent = document.querySelector('.h-layout-content');
    if (layoutContent) {
      layoutContent.scrollTop = 0;
    }
    // baidu 统计，如果有自己的统计，请至index.html修改至自己的埋点
    if (window._hmt) {
      window._hmt.push(['_trackPageview', window.location.pathname]);
    }
  });
  return router;
};

export default initRouter;

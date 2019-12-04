import Vue from 'vue';
import VueRouter from 'vue-router';
import AppFrame from 'components/app/app-frame';

import Login from 'views/login/index';
import Dashboard from 'views/dashboard/index';
import manageRouters from './modules/manage-router';

Vue.use(VueRouter);

const routerParam = {
  mode: 'history',
  routes: [
    {
      path: '/login',
      hideInMenu: true,
      component: Login
    },
    {
      path: '/',
      component: AppFrame,
      redirect: '/dashboard',
      hideInMenu: true,
      children: [
        {
          path: '/dashboard',
          component: Dashboard,
          meta: { title: '控制台', icon: 'icon-monitor', key: '/dashboard' }
        },
        {
          path: '/403',
          hideInMenu: true,
          component: () => import('views/error-pages/403'),
          meta: { key: '/403' }
        },
        {
          path: '/404',
          hideInMenu: true,
          component: () => import('views/error-pages/404'),
          meta: { key: '/404' }
        },
        {
          path: '/500',
          hideInMenu: true,
          component: () => import('views/error-pages/500'),
          meta: { key: '/500' }
        },
        manageRouters
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
};

const router = new VueRouter(routerParam);

router.beforeEach((to, from, next) => {
  HeyUI.$LoadingBar.start();
  if (!Utils.checkLogin() && to.path !== '/login') {
    HeyUI.$LoadingBar.fail();
    HeyUI.$Message.error('用户登录超时，请重新登录');
    next('/login');
    return;
  }
  next();
});
router.afterEach(() => {
  HeyUI.$LoadingBar.success();
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const layoutContent = document.querySelector('.h-layout-content');
  if (layoutContent) {
    layoutContent.scrollTop = 0;
  }
  // baidu 统计，如果有自己的统计，请至index.html修改至自己的埋点
  // if (window._hmt) {
  //   window._hmt.push(['_trackPageview', window.location.pathname]);
  // }
});
export default router;

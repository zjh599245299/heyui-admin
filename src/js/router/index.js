import Vue from 'vue';
import VueRouter from 'vue-router';
import AppFrame from 'components/App/AppFrame';

import Login from 'views/login/index';

Vue.use(VueRouter);

let asyncRoutes = [];
if (Utils.getLocal2Json('sys_menus')) {
  asyncRoutes = Utils.getAsyncRoutes(Utils.getLocal2Json('sys_menus'));
}
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
      redirect: '/home',
      hideInMenu: true,
      children: [
        {
          path: '/home',
          component: () => import('views/home')
        },
        {
          path: '/icons',
          component: () => import('views/icons'),
          meta: { title: '系统图标库' }
        },
        {
          path: '/profile',
          component: () => import('views/profile/index'),
          hideInMenu: true,
          meta: { title: '设置中心' }
        },
        {
          path: '/403',
          hideInMenu: true,
          component: () => import('views/error-pages/403')
        },
        {
          path: '/404',
          hideInMenu: true,
          component: () => import('views/error-pages/404')
        },
        {
          path: '/500',
          hideInMenu: true,
          component: () => import('views/error-pages/500')
        },
        ...asyncRoutes
      ]
    },
    {
      path: '*',
      hideInMenu: true,
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
  if (to.meta && to.meta.title) {
    document.title = '管理系统-' + to.meta.title;
  } else {
    document.title = '管理系统';
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

/**
 * 系统管理模块路由
 */
export default {
  path: '/manage',
  component: { render: h => h('router-view') },
  redirect: '/404',
  meta: { title: '系统管理', icon: 'icon-cog', key: '/manage', isMenu: true },
  children: [
    {
      path: '/manage/user',
      component: () => import('views/manage/user'),
      meta: { title: '用户管理', key: '/manage/user', icon: 'icon-fast-forward' }
    },
    {
      path: '/manage/role',
      component: () => import('views/manage/role'),
      meta: { title: '角色管理', key: '/manage/role', icon: 'icon-fast-forward' },
      children: [
        {
          path: '/manage/role/add',
          component: () => import('views/manage/user'),
          meta: { title: '添加角色', key: '/manage/role/add' },
          hideInMenu: true
        }
      ]
    },
    {
      path: '/manage/permission',
      component: () => import('views/manage/permission'),
      meta: { title: '权限管理', key: '/manage/permission', icon: 'icon-fast-forward' }
    },
    {
      path: '/manage/department',
      component: () => import('views/manage/department'),
      meta: { title: '机构管理', key: '/manage/department', icon: 'icon-fast-forward' }
    }
  ]
};

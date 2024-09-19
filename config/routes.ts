export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', name: '系统状态', icon: 'DashboardOutlined', component: './Welcome' },
  {
    path: '/system',
    icon: 'setting',
    access: 'canAdmin',
    name: '系统管理',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        component: './System/User',
      },
    ],
  },
  {
    path: '/usercenter',
    icon: 'user',
    name: '账户',
    routes: [
      { path: '/usercenter/info', name: '个人信息', component: './Account/Profile' },
      { path: '/usercenter/settings', name: '账户设置', component: './Account/Settings' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

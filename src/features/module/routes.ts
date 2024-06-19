import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'HomePage',
        path: '',
        component: () => import('./pages/ModuleList.vue')
      }
    ]
  }
];

export default routes;

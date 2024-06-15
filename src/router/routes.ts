import { RouteRecordRaw } from 'vue-router';

import moduleRouter from '../features/module/routes';
import quizeRouter from '../features/quize/routes';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  // },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  ...moduleRouter,
  ...quizeRouter
];

export default routes;

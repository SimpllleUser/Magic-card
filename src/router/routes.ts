import DefaultLayout from '../layouts/default.vue';
import { PageNames } from './types';

export const routes = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        name: PageNames.Home,
        component: () => import('../pages/HomePage.vue')
      },
      {
        path: '/dictionary/:id',
        meta: { breadcrumb: 'Detail', useName: true },
        children: [
          {
            path: '',
            name: PageNames.DictionaryDetail,
            meta: { useName: true },
            component: () => import('../pages/DictionaryDetail.vue')
          },
          {
            path: 'view',
            name: PageNames.WordViewer,
            component: () => import('../pages/WordViewerPage.vue'),
            meta: { breadcrumb: 'Word viewer' }
          },
          {
            path: 'quiz',
            name: PageNames.Quiz,
            component: () => import('../pages/QuizePage.vue'),
            meta: { breadcrumb: 'Quiz' }
          }
        ]
      },
      {
        path: 'create',
        name: PageNames.DictionaryCreate,
        component: () => import('../pages/DictionaryCreate.vue'),
        meta: { breadcrumb: 'Create dictionary' }
      },
      {
        path: 'update/:id',
        name: PageNames.DictionaryUpdate,
        component: () => import('../pages/DictionaryUpdate.vue'),
        meta: { breadcrumb: (route) => route.params.id, useName: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: PageNames.NotFound,
    component: () => import('../pages/NotFound.vue')
  }
];

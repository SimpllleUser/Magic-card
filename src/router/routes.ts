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
        meta: { breadcrumb: 'Detail' },
        children: [
          {
            path: '',
            name: PageNames.DictionaryDetail,
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
          },
          {
            path: 'quiz-flow',
            name: PageNames.QuizFlow,
            component: () => import('../pages/QuizFlow.vue'),
            meta: { breadcrumb: 'Quiz flow' }
          }
        ]
      },
      {
        path: 'create',
        name: PageNames.DictionaryCreate,
        component: () => import('../pages/DictionaryCreate.vue'),
        meta: { breadcrumb: 'Create'}
      },
      {
        path: 'update/:id',
        name: PageNames.DictionaryUpdate,
        component: () => import('../pages/DictionaryUpdate.vue'),
        meta: { breadcrumb: (route) => `Update (ID: ${route.params.id})` }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: PageNames.NotFound,
    component: () => import('../pages/NotFound.vue')
  }
];

import DefaultLayout from '../layouts/default.vue';
import { PageNames } from './types';

export const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: PageNames.Home,
        component: () => import('../pages/HomePage.vue'),
        meta: { title: 'Home' }
      },
      {
        path: '/dictionary/:id',
        name: PageNames.DictionaryDetail,
        component: () => import('../pages/DictionaryDetail.vue'),
        meta: { title: 'Dictionary detail' }
      },
      {
        path: '/dictionary/update/:id',
        name: PageNames.DictionaryUpdate,
        component: () => import('../pages/DictionaryUpdate.vue'),
        meta: { title: 'Dictionary update' }
      },
      {
        path: '/dictionary/create',
        name: PageNames.DictionaryCreate,
        component: () => import('../pages/DictionaryCreate.vue'),
        meta: { title: 'Dictionary Create' }
      },
      {
        path: '/dictionary/:id/view',
        name: PageNames.WordViewer,
        meta: { title: 'Word cards' },
        component: () => import('../pages/WordViewerPage.vue')
      },
      {
        path: '/quize',
        name: PageNames.Quize,
        component: () => import('../pages/QuizePage.vue'),
        meta: { title: 'Quize' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: PageNames.NotFound,
    component: () => import('../pages/NotFound.vue')
  }
];

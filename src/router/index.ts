import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/default.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: () => import('../pages/HomePage.vue'),
        meta: { title: 'Home' }
      },
      {
        path: '/dictionary/:id',
        name: 'DictionaryDetail',
        component: () => import('../pages/DictionaryDetail.vue'),
        meta: { title: 'Dictionary detail' }
      },
      {
        path: '/dictionary/update/:id',
        name: 'DictionaryUpdate',
        component: () => import('../pages/DictionaryUpdate.vue'),
        meta: { title: 'Dictionary update' }
      },
      {
        path: '/dictionary/create',
        name: 'DictionaryCreate',
        component: () => import('../pages/DictionaryCreate.vue'),
        meta: { title: 'Dictionary Create' }
      },
      {
        /// Add view mode of cards
        path: '/dictionary/:id/view',
        name: 'ViewModeWords',
        meta: { title: 'View cards' },
        component: () => import('../pages/quize/ViewMode.vue')
      },
      {
        path: '/quize',
        name: 'Quize',
        component: () => import('../pages/quize/index.vue'),
        meta: { title: 'Quize' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.onError((error) => {
  console.error('Router error:', error);
});

export default router;

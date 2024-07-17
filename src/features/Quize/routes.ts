const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'QuizePage',
        path: '/quize/:id',
        component: () => import('pages/QuizePage.vue')
      }
    ]
  }
];

export default routes;

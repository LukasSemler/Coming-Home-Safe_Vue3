import { createRouter, createWebHistory } from 'vue-router';

import Login_RegisterViewVue from '../views/Login_RegisterView.vue';
import UserMap_View from '../views/UserMap_View.vue';
import Mitarbeiter_View from '../views/Mitarbeiter_View.vue';
import Comp_Login from '../Components/Comp_Login.vue';
import Comp_Register from '../Components/Comp_Register.vue';
import Error404 from '../views/Error_404.vue';

import { PiniaStore } from '../Store/Store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login_RegisterView',
      component: Login_RegisterViewVue,
      children: [
        { path: '', component: Comp_Login },
        { path: 'register', component: Comp_Register },
      ],
    },
    {
      path: '/userMap',
      name: 'UserMap',
      component: UserMap_View,
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.aktiverUser) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/mitarbeiterMap',
      name: 'UserMap',
      component: UserMap_View,
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.aktiverUser) {
          next();
        } else {
          next('/');
        }
      },
    },

    { path: '/:pathmatch(.*)*', name: 'not-found', component: Error404 },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

import Login_RegisterViewVue from '../views/Login_RegisterView.vue';
import MitarbeiterView from '../views/Mitarbeiter_View.vue';
import Comp_Login from '../Components/Comp_Login.vue';
import Comp_Register from '../Components/Comp_Register.vue';
import Error404 from '../views/Error_404.vue';
import UserMap from '../views/UserMap_View.vue';
import AccountView from '../views/AccountView.vue';
import SubViewAccount from '../views/Subviews/SubViewAccount.vue';
import SubViewAccountDelete from '../views/Subviews/SubViewAccountDelete.vue';
import SubViewChangePW from '../views/Subviews/SubViewChangePW.vue';

import { PiniaStore } from '../Store/Store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/usermap',
      name: 'usermap',
      component: UserMap,
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.getAktivenUser) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/',
      name: 'Login_RegisterView',
      component: Login_RegisterViewVue,
      children: [
        { path: '', component: Comp_Login },
        { path: 'register', component: Comp_Register },
        { path: 'pw_vergessen', component: () => import('../Components/Comp_PW_Vergessen.vue') },
      ],
    },
    {
      path: '/mitarbeiterMap',
      name: 'UserMap',
      component: MitarbeiterView,
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.aktiverUser.isadmin) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      children: [
        { path: '', component: SubViewAccount },
        { path: 'password', component: SubViewChangePW },
        { path: 'deleteAccount', component: SubViewAccountDelete },
      ],
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.getAktivenUser) {
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

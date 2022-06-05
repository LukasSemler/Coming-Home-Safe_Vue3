import { createRouter, createWebHistory } from 'vue-router';

import Login_RegisterViewVue from '../views/Login_RegisterView.vue';
import Comp_Login from '../Components/Comp_Login.vue';
import Comp_Register from '../Components/Comp_Register.vue';

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

    // { path: '/:pathmatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
});

export default router;

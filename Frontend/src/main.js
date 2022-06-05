import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/index.css';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(router);

//Pinia Store
const pinia = createPinia();
app.use(pinia);

app.mount('#app');

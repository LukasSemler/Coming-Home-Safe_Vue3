import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/index.css';
import { createPinia } from 'pinia';
import axios from 'axios';

//Base-URL axios
if (location.origin === 'http://localhost:8080') {
  axios.defaults.baseURL = 'http://localhost:2410';
}

const app = createApp(App);

app.use(router);

//Pinia Store
const pinia = createPinia();
app.use(pinia);

app.mount('#app');

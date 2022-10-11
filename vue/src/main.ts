import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Icon from './components/Icon.vue';

import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App).use(router).use(Toast);

app.component('Icon', Icon);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');

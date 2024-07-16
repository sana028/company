import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import routers from './routers';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import VueApexCharts from "vue3-apexcharts";

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
      },
})

createApp(App).use(createPinia()).use(routers).use(vuetify).use(VueApexCharts).mount('#app')

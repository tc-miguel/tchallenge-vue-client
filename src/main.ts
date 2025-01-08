import './assets/styles.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Material from '@primevue/themes/material';
import Button from "primevue/button"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import Toast from 'primevue/toast';
import router from './router'
import { ToastService } from 'primevue';

const app = createApp(App)
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('FloatLabel', FloatLabel);
app.component('Paginator', Paginator);
app.component('Panel', Panel);
app.component('Toast', Toast);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Material
  }
});

app.mount('#app')

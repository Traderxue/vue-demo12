import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vant from "vant"
import 'vant/lib/index.css';
import i18n from "@/lang/index.js"

const app = createApp(App)

app.use(vant)
app.use(i18n)

app.use(createPinia())
app.use(router)

app.mount('#app')

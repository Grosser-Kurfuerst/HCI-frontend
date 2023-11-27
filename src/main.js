import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bulma
import Bulma from 'bulma'
import 'bulma/css/bulma.css'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App).use(store).use(router)
app.use(ElementPlus)
app.use(Bulma)
app.mount('#app')

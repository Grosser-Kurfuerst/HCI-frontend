import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import format from 'date-fns/format'

// Bulma
import Bulma from 'bulma'
import 'bulma/css/bulma.css'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

// permission
import '@/permission'
import '@/assets/app.css'

import relativeTime from 'dayjs/plugin/relativeTime';
// 国际化
import 'dayjs/locale/zh-cn'

//Font Awesome
import 'font-awesome/css/font-awesome.min.css';


const dayjs = require('dayjs');
// 相对时间插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

const app = createApp(App).use(store).use(router)

// 设置全局属性，以便在组件中访问
app.config.globalProperties.$dayjs = dayjs;
app.use(ElementPlus)
app.use(Bulma)
app.use(store)
app.mount('#app')

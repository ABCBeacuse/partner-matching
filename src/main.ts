import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from './config/route'
import '../global.css'


const app = createApp(App)
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})
app.use(router)
app.mount('#app')
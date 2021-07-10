import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue";
import First from './First.vue'
import Second from './Second.vue'
import About from './About.vue'


const routes = [
  { path: '/', component: First },
  { path: '/second', component: Second },
  { path: '/about' , component: About }
]
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})

const app = createApp(App)
app.use(router)

app.mount('#app')
import { createApp, ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './app.vue'
import 'virtual:uno.css'
import './styles/base.css'

import HomeView from './pages/Home.vue'

const routes = [
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
const app = createApp(App)

app.use(router)
app.mount('#app')
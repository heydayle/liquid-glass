import { createApp } from 'vue'
import App from './App.vue'
import SolaraUI from '../src/index.js' // or '../src/index.js' for live dev
import '../src/styles/liquid-glass.css'

const app = createApp(App)
app.use(SolaraUI)
app.mount('#app')

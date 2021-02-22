import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.provide({
  theme: {
    color: 'red'
  }
})

app.mount('#app')

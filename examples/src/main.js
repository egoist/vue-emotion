import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import {VueEmotion} from '../../src/index'
const app = createApp(App)

app.provide(
  'theme', {
    color: 'green'
  }
)
app.use(VueEmotion)


app.mount('#app')

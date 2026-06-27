import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$apiUrl = "https://my-json-server.typicode.com/gabxnz/banco-json"

app.use(router).mount('#app')
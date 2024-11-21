import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import students from './api/Students.js'
// Import Bootstrap CSS và JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import global CSS sau Bootstrap để có thể override Bootstrap styles
import './assets/main.css'
if (!localStorage.getItem('students')) {
  localStorage.setItem('students', JSON.stringify(students))
}

createApp(App).use(router).mount('#app')

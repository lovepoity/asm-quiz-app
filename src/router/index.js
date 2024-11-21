import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SubjectView from '@/views/SubjectView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import QuizView from '../views/QuizView.vue'
import QuizResultsView from '@/views/QuizResultsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import QuizDetailView from '@/views/QuizDetailView.vue'
import ContactView from '@/views/ContactView.vue'
import FeedbackView from '@/views/FeedbackView.vue'
import FaqView from '@/views/FaqView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: SubjectView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackView,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: QuizView,
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz-results',
      name: 'quiz-results',
      component: QuizResultsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz-results/:resultId',
      name: 'quiz-detail',
      component: QuizDetailView,
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

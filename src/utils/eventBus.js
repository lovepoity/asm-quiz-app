import { ref } from 'vue'

export const currentUser = ref(JSON.parse(localStorage.getItem('user')))

export function updateUser(user) {
  currentUser.value = user
  localStorage.setItem('user', JSON.stringify(user))
}

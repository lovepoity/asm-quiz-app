<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2 class="text-center mb-4">Đăng nhập</h2>

      <!-- Alert for error message -->
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Tên đăng nhập</label>
          <input type="text" class="form-control" v-model="username" required />
        </div>
        <div class="mb-4">
          <label class="form-label">Mật khẩu</label>
          <input type="password" class="form-control" v-model="password" required />
        </div>
        <button type="submit" class="btn w-100 mb-3">Đăng nhập</button>
        <p class="text-center mb-0">
          Chưa có tài khoản?
          <router-link to="/register" style="color: #fd7608">Đăng ký ngay</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/utils/eventBus'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    handleLogin() {
      this.error = ''

      try {
        const currentStudents = JSON.parse(localStorage.getItem('students')) || []
        const student = currentStudents.find(
          (s) => s.username === this.username && s.password === this.password,
        )

        if (student) {
          updateUser(student)
          this.$router.push('/')
          this.$root.$refs.toast.showToast('Đăng nhập thành công!', 'success')
        } else {
          this.error = 'Tên đăng nhập hoặc mật khẩu không đúng'
        }
      } catch (error) {
        this.error = 'Có lỗi xảy ra, vui lòng thử lại'
        console.error(error)
      }
    },
  },
  created() {
    if (localStorage.getItem('user')) {
      this.$router.push('/')
    }
  },
}
</script>

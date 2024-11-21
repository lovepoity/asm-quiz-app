<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2 class="text-center mb-4">Đăng ký</h2>

      <!-- Alert for error/success message -->
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">Họ và tên</label>
          <input type="text" class="form-control" v-model="fullname" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" v-model="email" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Tên đăng nhập</label>
          <input type="text" class="form-control" v-model="username" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input type="password" class="form-control" v-model="password" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Giới tính</label>
          <select class="form-select" v-model="gender">
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="form-label">Ngày sinh</label>
          <input type="date" class="form-control" v-model="birthday" required />
        </div>
        <button type="submit" class="btn w-100 mb-3">Đăng ký</button>
        <p class="text-center mb-0">
          Đã có tài khoản?
          <router-link to="/login" style="color: #fd7608">Đăng nhập</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import students from '@/api/Students.js'
import { updateUser } from '@/utils/eventBus'

export default {
  data() {
    return {
      fullname: '',
      email: '',
      username: '',
      password: '',
      gender: 'true',
      birthday: '',
      error: '',
    }
  },
  methods: {
    handleRegister() {
      this.error = ''

      // Validate
      if (students.some((s) => s.username === this.username)) {
        this.error = 'Tên đăng nhập đã tồn tại'
        return
      }

      if (students.some((s) => s.email === this.email)) {
        this.error = 'Email đã được sử dụng'
        return
      }

      // Create new student object
      const newStudent = {
        username: this.username,
        password: this.password,
        fullname: this.fullname,
        email: this.email,
        gender: this.gender,
        birthday: this.birthday,
        schoolfee: '0',
        marks: '0',
      }

      try {
        // Get current students list
        let currentStudents = JSON.parse(localStorage.getItem('students')) || students

        // Add new student
        currentStudents.push(newStudent)

        // Save to localStorage
        localStorage.setItem('students', JSON.stringify(currentStudents))

        // Update user through eventBus
        updateUser(newStudent)

        // Redirect and show message
        this.$router.push('/')
        this.$root.$refs.toast.showToast('Đăng ký thành công!', 'success')
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

<template>
  <div class="containerNN">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-4">Thông tin tài khoản</h3>

            <form @submit.prevent="handleUpdateProfile">
              <div class="mb-3">
                <label class="form-label">Họ và tên</label>
                <input type="text" class="form-control" v-model="userInfo.fullname" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="userInfo.email" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Tên đăng nhập</label>
                <input type="text" class="form-control" v-model="userInfo.username" disabled />
                <small class="text-muted">Tên đăng nhập không thể thay đổi</small>
              </div>

              <div class="mb-3">
                <label class="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="newPassword"
                  placeholder="Để trống nếu không đổi mật khẩu"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="confirmPassword"
                  :disabled="!newPassword"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Giới tính</label>
                <select class="form-select" v-model="userInfo.gender">
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </div>

              <div class="mb-4">
                <label class="form-label">Ngày sinh</label>
                <input type="date" class="form-control" v-model="userInfo.birthday" required />
              </div>

              <button
                type="submit"
                class="btn w-100"
                style="background-image: var(--primary-gradient)"
              >
                Cập nhật thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currentUser } from '@/utils/eventBus'

export default {
  data() {
    return {
      userInfo: {
        fullname: '',
        email: '',
        username: '',
        gender: '',
        birthday: '',
      },
      newPassword: '',
      confirmPassword: '',
    }
  },

  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      this.$router.push('/login')
      return
    }
    this.userInfo = { ...user }
  },

  methods: {
    handleUpdateProfile() {
      if (this.newPassword) {
        if (this.newPassword !== this.confirmPassword) {
          this.$root.$refs.toast.showToast('Mật khẩu xác nhận không khớp', 'danger')
          return
        }
      }

      try {
        let students = JSON.parse(localStorage.getItem('students')) || []

        const emailExists = students.some(
          (s) => s.username !== this.userInfo.username && s.email === this.userInfo.email,
        )
        if (emailExists) {
          this.$root.$refs.toast.showToast('Email đã được sử dụng bởi tài khoản khác', 'danger')
          return
        }

        const studentIndex = students.findIndex((s) => s.username === this.userInfo.username)
        if (studentIndex !== -1) {
          const updatedStudent = {
            username: this.userInfo.username,
            fullname: this.userInfo.fullname,
            email: this.userInfo.email,
            gender: this.userInfo.gender,
            birthday: this.userInfo.birthday,
            schoolfee: students[studentIndex].schoolfee,
            marks: students[studentIndex].marks,
            password: this.newPassword || students[studentIndex].password,
          }

          // Cập nhật trong danh sách students
          students[studentIndex] = updatedStudent
          localStorage.setItem('students', JSON.stringify(students))

          // Cập nhật thông tin user hiện tại
          localStorage.setItem('user', JSON.stringify(updatedStudent))
          currentUser.value = updatedStudent

          this.$root.$refs.toast.showToast('Cập nhật thông tin thành công!', 'success')

          // Reset mật khẩu fields
          this.newPassword = ''
          this.confirmPassword = ''

          // Trigger storage event để cập nhật UI
          window.dispatchEvent(new Event('storage'))
        }
      } catch (error) {
        this.$root.$refs.toast.showToast('Có lỗi xảy ra, vui lòng thử lại', 'danger')
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
.card {
  padding: 24px;
}
@media (max-width: 576px) {
  .card {
    border-radius: 0;
    margin: 0 -15px;
  }

  .form-control,
  .form-select {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
</style>

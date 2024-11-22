<template>
  <div class="profile">
    <div class="profile__container">
      <div class="profile__card">
        <h3 class="profile__title">Thông tin tài khoản</h3>

        <form class="profile__form" @submit.prevent="handleUpdateProfile">
          <div class="profile__form-group">
            <label class="profile__label">Họ và tên</label>
            <input type="text" class="profile__input" v-model="userInfo.fullname" required />
          </div>

          <div class="profile__form-group">
            <label class="profile__label">Tên đăng nhập</label>
            <input type="text" class="profile__input" v-model="userInfo.username" disabled />
            <span class="profile__hint">Tên đăng nhập không thể thay đổi</span>
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Email</label>
            <input type="email" class="profile__input" v-model="userInfo.email" required />
          </div>

          <div class="profile__form-group">
            <label class="profile__label">Mật khẩu mới</label>
            <input
              type="password"
              class="profile__input"
              v-model="newPassword"
              placeholder="Để trống nếu không đổi mật khẩu"
            />
          </div>

          <div class="profile__form-group">
            <label class="profile__label">Giới tính</label>
            <select class="profile__select" v-model="userInfo.gender">
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              class="profile__input"
              v-model="confirmPassword"
              :disabled="!newPassword"
            />
          </div>

          <div class="profile__form-group">
            <label class="profile__label">Ngày sinh</label>
            <input type="date" class="profile__input" v-model="userInfo.birthday" required />
          </div>

          <button type="submit" class="profile__button">Cập nhật thông tin</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { currentUser } from '@/assets/eventBus'

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

          students[studentIndex] = updatedStudent
          localStorage.setItem('students', JSON.stringify(students))

          localStorage.setItem('user', JSON.stringify(updatedStudent))
          currentUser.value = updatedStudent

          this.$root.$refs.toast.showToast('Cập nhật thông tin thành công!', 'success')
          this.newPassword = ''
          this.confirmPassword = ''

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

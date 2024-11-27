<template>
  <div class="register">
    <div class="py-3">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="register__header text-center mb-5">
            <h1 class="register__title">Đăng ký tài khoản</h1>
            <p class="register__subtitle">
              Tạo tài khoản để bắt đầu hành trình học tập cùng Sunao Education
            </p>
          </div>

          <div class="row g-4 justify-content-center">
            <div class="col-lg-6">
              <div class="register__form-wrapper">
                <div class="alert alert-danger" v-if="error">
                  {{ error }}
                </div>

                <form class="register__form" @submit.prevent="handleRegister">
                  <div class="form-group">
                    <label class="form-label">Họ và tên</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="fullname"
                      required
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="email"
                      required
                      placeholder="Nhập email"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Tên đăng nhập</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="username"
                      required
                      placeholder="Nhập tên đăng nhập"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Mật khẩu</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                      required
                      placeholder="Nhập mật khẩu"
                    />
                  </div>

                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Giới tính</label>
                        <select class="form-select" v-model="gender">
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Ngày sinh</label>
                        <input type="date" class="form-control" v-model="birthday" required />
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="register__submit-btn">
                    <i class="bi bi-person-plus me-2"></i>
                    Đăng ký
                  </button>

                  <p class="text-center mt-4 mb-0" style="font-size: 0.9rem">
                    Đã có tài khoản?
                    <router-link to="/login" class="register__link">Đăng nhập</router-link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register {
  margin: 70px 0;
}

.register__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.register__subtitle {
  font-size: 1.1rem;
  color: #6c757d;
}

.register__form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.register__submit-btn {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  background: var(--orange-dark);
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.register__submit-btn:hover {
  background: var(--orange-light);
  color: var(--orange-dark);
}

.register__link {
  color: var(--orange-dark);
  text-decoration: none;
  font-weight: 600;
}

.register__link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register__title {
    font-size: 2rem;
  }

  .register__form-wrapper {
    padding: 1.5rem;
  }
}
</style>

<script>
import students from '@/api/Students.js'
import { updateUser } from '@/assets/eventBus'

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
      if (students.some((s) => s.username === this.username)) {
        this.error = 'Tên đăng nhập đã tồn tại'
        return
      }
      if (students.some((s) => s.email === this.email)) {
        this.error = 'Email đã được sử dụng'
        return
      }
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
        let currentStudents = JSON.parse(localStorage.getItem('students')) || students
        currentStudents.push(newStudent)
        localStorage.setItem('students', JSON.stringify(currentStudents))
        updateUser(newStudent)
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

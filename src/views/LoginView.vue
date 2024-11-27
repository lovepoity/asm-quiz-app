<template>
  <div class="login">
    <div class="py-3">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="login__header text-center mb-5">
            <h1 class="login__title">Đăng nhập</h1>
            <p class="login__subtitle">
              Đăng nhập để trải nghiệm đầy đủ tính năng của Sunao Education
            </p>
          </div>

          <div class="row g-4 justify-content-center">
            <div class="col-lg-6">
              <div class="login__form-wrapper">
                <div class="alert alert-danger" v-if="error">
                  {{ error }}
                </div>

                <form class="login__form" @submit.prevent="handleLogin">
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

                  <button type="submit" class="login__submit-btn">
                    <i class="bi bi-box-arrow-in-right me-2"></i>
                    Đăng nhập
                  </button>

                  <p class="text-center mt-4 mb-0" style="font-size: 0.9rem">
                    Chưa có tài khoản?
                    <router-link to="/register" class="login__link">Đăng ký ngay</router-link>
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
.login {
  margin: 70px 0;
}

.login__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.login__subtitle {
  font-size: 1.1rem;
  color: #6c757d;
}

.login__form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.login__submit-btn {
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

.login__submit-btn:hover {
  background: var(--orange-light);
  color: var(--orange-dark);
}

.login__link {
  color: var(--orange-dark);
  text-decoration: none;
  font-weight: 600;
}

.login__link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login__title {
    font-size: 2rem;
  }

  .login__form-wrapper {
    padding: 1.5rem;
  }
}
</style>

<script>
import { updateUser } from '@/assets/eventBus'

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

          // Lấy redirect path từ URL query
          const redirect = this.$route.query.redirect || '/'

          // Chuyển đến trang redirect hoặc home
          this.$router.push(redirect)

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
      const redirect = this.$route.query.redirect || '/'
      this.$router.push(redirect)
    }
  },
}
</script>

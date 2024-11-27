<template>
  <div class="feedback">
    <div class="py-3">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="feedback__header text-center mb-5">
            <h1 class="feedback__title">Đánh giá & Góp ý</h1>
            <p class="feedback__subtitle">
              Ý kiến của bạn giúp chúng tôi cải thiện chất lượng dịch vụ tốt hơn
            </p>
          </div>

          <div class="row g-4">
            <div class="col-md-4">
              <div class="feedback__info">
                <div class="feedback__info-item">
                  <div class="feedback__info-icon">
                    <i class="bi bi-star"></i>
                  </div>
                  <h3>Đánh giá</h3>
                  <p>4.8/5 từ hơn 10,000+ học viên</p>
                </div>

                <div class="feedback__info-item">
                  <div class="feedback__info-icon">
                    <i class="bi bi-patch-check"></i>
                  </div>
                  <h3>Chất lượng</h3>
                  <p>500+ bài thi được cập nhật liên tục</p>
                </div>

                <div class="feedback__info-item">
                  <div class="feedback__info-icon">
                    <i class="bi bi-people"></i>
                  </div>
                  <h3>Cộng đồng</h3>
                  <p>10,000+ thành viên tích cực</p>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="feedback__form-wrapper">
                <form class="feedback__form" @submit.prevent="handleSubmit">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Họ và tên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="form.name"
                          required
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="form.email"
                          required
                          placeholder="Nhập email"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group">
                        <label class="form-label">Đánh giá của bạn</label>
                        <div class="feedback__rating">
                          <div
                            v-for="star in 5"
                            :key="star"
                            class="feedback__star"
                            @click="form.rating = star"
                            :class="{ 'feedback__star--active': star <= form.rating }"
                          >
                            <i class="bi bi-star-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group">
                        <label class="form-label">Nội dung góp ý</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="form.message"
                          required
                          placeholder="Nhập nội dung góp ý của bạn"
                        ></textarea>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="feedback__submit-btn">
                        <i class="bi bi-send me-2"></i>
                        Gửi đánh giá
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedbackView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        rating: 0,
        message: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.form)
      this.form = {
        name: '',
        email: '',
        rating: 0,
        message: '',
      }
      alert('Cảm ơn bạn đã gửi đánh giá!')
    },
  },
}
</script>

<style scoped>
.feedback {
  margin-top: 70px;
  font-size: 1.4rem;
}

.feedback__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.feedback__subtitle {
  font-size: 1.1rem;
  color: #6c757d;
}

.feedback__info {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  height: 100%;
}

.feedback__info-item {
  margin-bottom: 2rem;
  text-align: center;
}

.feedback__info-item:last-child {
  margin-bottom: 0;
}

.feedback__info-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--orange-light);
}

.feedback__info-icon i {
  font-size: 1.5rem;
  color: var(--orange-dark);
}

.feedback__info-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.feedback__info-item p {
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 0;
}

.feedback__form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.feedback__rating {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.feedback__star {
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.3s ease;
}

.feedback__star:hover,
.feedback__star--active {
  color: var(--orange-dark);
}

.feedback__submit-btn {
  width: 100%;
  padding: 9px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--orange-dark);
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.feedback__submit-btn:hover {
  background: var(--orange-light);
  color: var(--orange-dark);
}

@media (max-width: 768px) {
  .feedback__title {
    font-size: 2rem;
  }

  .feedback__info {
    margin-bottom: 2rem;
  }

  .feedback__form-wrapper {
    padding: 1.5rem;
  }
}
</style>

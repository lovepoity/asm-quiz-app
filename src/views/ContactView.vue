<template>
  <div class="contact">
    <div class="py-3">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="contact__header text-center mb-5">
            <h1 class="contact__title">Liên hệ với chúng tôi</h1>
            <p class="contact__subtitle">Bạn có câu hỏi? Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
          </div>

          <div class="row g-4 flex-column align-items-center">
            <!-- Contact Form -->
            <div class="col-md-8">
              <div class="contact__form-wrapper">
                <form class="contact__form" @submit.prevent="handleSubmit">
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

                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="tel"
                          class="form-control"
                          v-model="form.phone"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Chủ đề</label>
                        <select class="form-select" v-model="form.subject">
                          <option value="general">Chung</option>
                          <option value="technical">Kỹ thuật</option>
                          <option value="billing">Thanh toán</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group">
                        <label class="form-label">Nội dung</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="form.message"
                          required
                          placeholder="Nhập nội dung tin nhắn"
                        ></textarea>
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="contact__submit-btn">
                        <i class="bi bi-send me-2"></i>
                        Gửi tin nhắn
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="col-md-8">
              <div class="contact__info">
                <div class="row">
                  <div class="col-md-4">
                    <div class="contact__info-item">
                      <div class="contact__info-icon">
                        <i class="bi bi-geo-alt"></i>
                      </div>
                      <h3>Địa chỉ</h3>
                      <p>Số 1, ngõ 41, Trần Duy Hưng, Cầu Giấy, Hà Nội</p>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="contact__info-item">
                      <div class="contact__info-icon">
                        <i class="bi bi-envelope"></i>
                      </div>
                      <h3>Email</h3>
                      <p>info@sunao.edu.vn</p>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="contact__info-item">
                      <div class="contact__info-icon">
                        <i class="bi bi-telephone"></i>
                      </div>
                      <h3>Điện thoại</h3>
                      <p>0943 09 0202</p>
                    </div>
                  </div>
                </div>

                <div class="contact__social">
                  <a href="#" class="contact__social-link">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="#" class="contact__social-link">
                    <i class="bi bi-youtube"></i>
                  </a>
                  <a href="#" class="contact__social-link">
                    <i class="bi bi-linkedin"></i>
                  </a>
                  <a href="#" class="contact__social-link">
                    <i class="bi bi-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Google Map -->
    <div class="contact__map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4855345714517!2d105.79399470000001!3d21.007051100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aca6fcc5b62b%3A0x5b99cce1def5a9a9!2zVHLhuqduIER1eSBIxrBuZywgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1647916415016!5m2!1svi!2s"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: 'general',
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
        phone: '',
        subject: 'general',
        message: '',
      }
      alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!')
    },
  },
}
</script>

<style scoped>
.contact {
  margin-top: 70px;
  font-size: 1.4rem;
}

.contact__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.contact__subtitle {
  font-size: 1.1rem;
  color: #6c757d;
}

.contact__info {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  height: 100%;
}

.contact__info-item {
  text-align: center;
  margin-bottom: 1.5rem;
}

.contact__info-item:last-child {
  margin-bottom: 1.5rem;
}

.contact__info-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--orange-light);
}

.contact__info-icon i {
  font-size: 1.5rem;
  color: var(--orange-dark);
}

.contact__info-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.contact__info-item p {
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.contact__social {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.contact__social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--orange-light);
  color: var(--orange-dark);
  transition: all 0.3s ease;
}

.contact__social-link:hover {
  background: var(--orange-dark);
  color: white;
}

.contact__form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-control,
.form-select {
  border: 1px solid var(--border-color);
  padding: 9px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--orange-dark);
  box-shadow: none;
}

.contact__submit-btn {
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

.contact__submit-btn:hover {
  background: var(--orange-light);
  color: var(--orange-dark);
}

.contact__map {
  margin-top: 5rem;
}

@media (max-width: 768px) {
  .contact__title {
    font-size: 2rem;
  }

  .contact__info {
    margin-bottom: 2rem;
  }

  .contact__form-wrapper {
    padding: 1.5rem;
  }
}
</style>

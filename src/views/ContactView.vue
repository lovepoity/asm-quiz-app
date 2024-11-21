<template>
  <div class="contact padding-top">
    <!-- Hero Section -->
    <section class="contact-hero py-5 mb-5">
      <div class="container text-center text-white">
        <h1 class="display-4 fw-bold mb-4">Liên hệ với chúng tôi</h1>
        <p class="lead">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
      </div>
    </section>

    <div class="container pb-5">
      <div class="row">
        <!-- Contact Info -->
        <div class="col-lg-4 mb-4">
          <div class="contact-info p-4 rounded-4 shadow-sm">
            <h3 class="fw-bold mb-4">Thông tin liên hệ</h3>

            <div class="d-flex align-items-center mb-4">
              <div class="contact-icon me-3">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">Địa chỉ</h5>
                <p class="mb-0 text-muted">137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng</p>
              </div>
            </div>

            <div class="d-flex align-items-center mb-4">
              <div class="contact-icon me-3">
                <i class="bi bi-telephone"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">Điện thoại</h5>
                <p class="mb-0 text-muted">0943.090.202</p>
              </div>
            </div>

            <div class="d-flex align-items-center mb-4">
              <div class="contact-icon me-3">
                <i class="bi bi-envelope"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">Email</h5>
                <p class="mb-0 text-muted">support@sunao.edu.vn</p>
              </div>
            </div>

            <div class="d-flex align-items-center">
              <div class="contact-icon me-3">
                <i class="bi bi-clock"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">Giờ làm việc</h5>
                <p class="mb-0 text-muted">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="col-lg-8">
          <div class="contact-form p-4 rounded-4 shadow-sm">
            <h3 class="fw-bold mb-4">Gửi tin nhắn cho chúng tôi</h3>

            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Họ và tên</label>
                  <input type="text" class="form-control" v-model="form.name" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="form.email" required />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Số điện thoại</label>
                <input type="tel" class="form-control" v-model="form.phone" />
              </div>

              <div class="mb-3">
                <label class="form-label">Chủ đề</label>
                <select class="form-select" v-model="form.subject">
                  <option value="general">Thông tin chung</option>
                  <option value="support">Hỗ trợ kỹ thuật</option>
                  <option value="billing">Thanh toán</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div class="mb-4">
                <label class="form-label">Nội dung tin nhắn</label>
                <textarea class="form-control" rows="5" v-model="form.message" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-lg">Gửi tin nhắn</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <section class="map mt-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8025459042683!2d108.1670675!3d16.0750095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b509a30cfb%3A0x96e408c6b0419760!2zMTM3IE5ndXnhu4VuIFRo4buLIFRo4bqtcCwgVGhhbmggS2jDqiBUw6J5LCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1624271371407!5m2!1svi!2s"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </section>
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
      // Xử lý gửi form ở đây
      console.log('Form submitted:', this.form)
      // Reset form
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      }
      // Hiển thị thông báo thành công
      alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!')
    },
  },
}
</script>

<style scoped>
.contact-hero {
  background: linear-gradient(45deg, #f73232, #fd7608);
  position: relative;
  overflow: hidden;
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  opacity: 0.1;
}

.contact-info,
.contact-form {
  background: white;
  height: 100%;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #f73232, #fd7608);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.form-control,
.form-select {
  border: 2px solid #e8e8e8;
  padding: 0.8rem;
  border-radius: 8px;
}

.form-control:focus,
.form-select:focus {
  border-color: #f73232;
  box-shadow: 0 0 0 0.25rem rgba(247, 50, 50, 0.25);
}

.btn-primary {
  background: linear-gradient(to right, #f73232 0%, #fd7608 50%, #f73232 100%);
  background-size: 200% auto;
  border: none;
  transition: all 0.5s ease;
  padding: 0.8rem 2rem;
}

.btn-primary:hover {
  background-position: right center;
}

.map {
  filter: grayscale(100%);
  transition: filter 0.3s;
}

.map:hover {
  filter: grayscale(0%);
}

@media (max-width: 576px) {
  .contact-info {
    margin-bottom: 2rem;
  }

  .contact-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .map {
    height: 300px;
  }
}
</style>

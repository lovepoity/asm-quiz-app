<template>
  <div class="feedback padding-top">
    <!-- Hero Section -->
    <section class="feedback-hero py-5">
      <div class="container text-center text-white">
        <h1 class="display-4 fw-bold mb-4">Góp ý & Đánh giá</h1>
        <p class="lead">Ý kiến của bạn giúp chúng tôi hoàn thiện hơn mỗi ngày</p>
      </div>
    </section>

    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="feedback-form p-4 rounded-4 shadow-sm bg-white">
            <h3 class="fw-bold mb-4">Gửi góp ý của bạn</h3>

            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="form-label fw-bold">Đánh giá chung</label>
                <div class="rating-group d-flex gap-3">
                  <div v-for="star in 5" :key="star" class="rating-item">
                    <input
                      type="radio"
                      :id="'star' + star"
                      :value="star"
                      v-model="form.rating"
                      class="d-none"
                    />
                    <label :for="'star' + star" class="rating-label">
                      <i class="bi" :class="form.rating >= star ? 'bi-star-fill' : 'bi-star'" />
                    </label>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Phân loại góp ý</label>
                <div class="row">
                  <div class="col-md-4 mb-3" v-for="category in categories" :key="category.value">
                    <div
                      class="category-card p-3 rounded-3 text-center"
                      :class="{ active: form.category === category.value }"
                      @click="form.category = category.value"
                    >
                      <i :class="category.icon + ' fs-4 mb-2'"></i>
                      <div>{{ category.label }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Họ và tên</label>
                  <input type="text" class="form-control" v-model="form.name" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Email</label>
                  <input type="email" class="form-control" v-model="form.email" required />
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Nội dung góp ý</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="form.content"
                  required
                  placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                ></textarea>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Đính kèm hình ảnh (nếu có)</label>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="handleFileUpload"
                />
                <div class="form-text">Hỗ trợ: JPG, PNG (tối đa 5MB)</div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg">Gửi góp ý</button>
            </form>
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
      categories: [
        { value: 'interface', label: 'Giao diện', icon: 'bi bi-laptop' },
        { value: 'content', label: 'Nội dung', icon: 'bi bi-book' },
        { value: 'technical', label: 'Kỹ thuật', icon: 'bi bi-gear' },
      ],
      form: {
        rating: 5,
        category: 'interface',
        name: '',
        email: '',
        content: '',
        file: null,
      },
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('File không được vượt quá 5MB')
          event.target.value = ''
          return
        }
        this.form.file = file
      }
    },
    handleSubmit() {
      console.log('Form submitted:', this.form)
      this.form = {
        rating: 5,
        category: 'interface',
        name: '',
        email: '',
        content: '',
        file: null,
      }
      alert('Cảm ơn bạn đã gửi góp ý!')
    },
  },
}
</script>

<style scoped>
.feedback-hero {
  background: linear-gradient(45deg, #f73232, #fd7608);
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
}

.feedback-hero::before {
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

.rating-label {
  font-size: 2rem;
  color: #ffc107;
  cursor: pointer;
  transition: all 0.3s;
}

.rating-label:hover {
  transform: scale(1.1);
}

.category-card {
  border: 2px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;
}

.category-card:hover {
  border-color: #f73232;
  background: #fff5f5;
}

.category-card.active {
  border-color: #f73232;
  background: linear-gradient(45deg, #f73232, #fd7608);
  color: white;
}

.form-control {
  border: 2px solid #e8e8e8;
  padding: 0.8rem;
  border-radius: 8px;
}

.form-control:focus {
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
</style>

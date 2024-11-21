<template>
  <div class="faq padding-top">
    <!-- Hero Section -->
    <section class="faq-hero py-5">
      <div class="container text-center text-white">
        <h1 class="display-4 fw-bold mb-4">Câu hỏi thường gặp</h1>
        <p class="lead">Tìm câu trả lời cho những thắc mắc của bạn</p>
      </div>
    </section>

    <div class="container py-5">
      <!-- Search Box -->
      <div class="row justify-content-center mb-5">
        <div class="col-lg-6">
          <div class="search-box">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Tìm kiếm câu hỏi..."
              v-model="searchQuery"
            />
            <i class="bi bi-search"></i>
          </div>
        </div>
      </div>

      <!-- FAQ Categories -->
      <div class="row mb-5">
        <div class="col-md-3 mb-3" v-for="cat in categories" :key="cat.id">
          <div
            class="category-card p-3 rounded-4 text-center"
            :class="{ active: selectedCategory === cat.id }"
            @click="selectedCategory = cat.id"
          >
            <i :class="cat.icon + ' fs-3 mb-2'"></i>
            <h5 class="mb-0">{{ cat.name }}</h5>
            <small class="text-muted">{{ cat.count }} câu hỏi</small>
          </div>
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="accordion" id="faqAccordion">
        <div
          class="accordion-item rounded-4 mb-3"
          v-for="(faq, index) in filteredFaqs"
          :key="index"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed rounded-4"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#faq' + index"
            >
              {{ faq.question }}
            </button>
          </h2>
          <div
            :id="'faq' + index"
            class="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Still Have Questions -->
      <div class="text-center mt-5 pt-4">
        <h3 class="fw-bold mb-4">Vẫn chưa tìm thấy câu trả lời?</h3>
        <router-link to="/contact" class="btn btn-primary btn-lg"> Liên hệ hỗ trợ </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqView',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'general',
      categories: [
        { id: 'general', name: 'Chung', icon: 'bi bi-info-circle', count: 5 },
        { id: 'courses', name: 'Khóa học', icon: 'bi bi-book', count: 8 },
        { id: 'payment', name: 'Thanh toán', icon: 'bi bi-credit-card', count: 6 },
        { id: 'technical', name: 'Kỹ thuật', icon: 'bi bi-gear', count: 4 },
      ],
      faqs: [
        {
          category: 'general',
          question: 'Sunao Education là gì?',
          answer: 'Sunao Education là nền tảng học tập trực tuyến hàng đầu tại Việt Nam...',
        },
        {
          category: 'courses',
          question: 'Làm sao để bắt đầu một khóa học?',
          answer: 'Bạn có thể dễ dàng bắt đầu khóa học bằng cách...',
        },
        {
          category: 'payment',
          question: 'Các phương thức thanh toán được hỗ trợ?',
          answer: 'Chúng tôi hỗ trợ nhiều phương thức thanh toán như...',
        },
        // Thêm nhiều FAQ khác
      ],
    }
  },
  computed: {
    filteredFaqs() {
      return this.faqs.filter((faq) => {
        const matchCategory =
          this.selectedCategory === 'all' || faq.category === this.selectedCategory
        const matchSearch = faq.question.toLowerCase().includes(this.searchQuery.toLowerCase())
        return matchCategory && matchSearch
      })
    },
  },
}
</script>

<style scoped>
.faq-hero {
  background: linear-gradient(45deg, #f73232, #fd7608);
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
}

.faq-hero::before {
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

.search-box {
  position: relative;
}

.search-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.category-card {
  background: white;
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

.category-card.active small {
  color: white !important;
}

.accordion-button:not(.collapsed) {
  background: linear-gradient(45deg, #f73232, #fd7608);
  color: white;
}

.accordion-button:focus {
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

@media (max-width: 576px) {
  .search-box {
    margin-bottom: 1.5rem;
  }

  .category-card {
    margin-bottom: 1rem;
  }

  .accordion-button {
    padding: 0.75rem;
  }
}
</style>

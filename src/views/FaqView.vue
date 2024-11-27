<template>
  <div class="faq">
    <div class="py-3">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="faq__header text-center mb-5">
            <h1 class="faq__title">Câu hỏi thường gặp</h1>
            <p class="faq__subtitle">Tìm câu trả lời cho những thắc mắc phổ biến của bạn</p>
          </div>

          <div class="faq__content">
            <div class="accordion" id="faqAccordion">
              <div class="accordion-item" v-for="(item, index) in faqItems" :key="index">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: !item.isOpen }"
                    type="button"
                    @click="toggleAccordion(index)"
                  >
                    {{ item.question }}
                  </button>
                </h2>
                <div class="accordion-collapse collapse" :class="{ show: item.isOpen }">
                  <div class="accordion-body">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="faq__contact text-center mt-5">
            <h3>Không tìm thấy câu trả lời bạn cần?</h3>
            <p>Hãy liên hệ với chúng tôi để được hỗ trợ</p>
            <router-link to="/contact" class="faq__contact-btn">
              <i class="bi bi-envelope me-2"></i>
              Liên hệ hỗ trợ
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqView',
  data() {
    return {
      faqItems: [
        {
          question: 'Sunao Education là gì?',
          answer:
            'Sunao Education là nền tảng thi trắc nghiệm IT trực tuyến, cung cấp hơn 500+ bài thi về lập trình, giúp người học đánh giá và nâng cao kiến thức IT một cách hiệu quả.',
          isOpen: true,
        },
        {
          question: 'Làm thế nào để bắt đầu một bài thi?',
          answer:
            'Để bắt đầu bài thi, bạn cần đăng nhập vào tài khoản, sau đó chọn môn học mong muốn và nhấn nút "Bắt đầu thi". Mỗi bài thi có 30 câu hỏi và thời gian làm bài là 30 phút.',
          isOpen: false,
        },
        {
          question: 'Làm sao để xem kết quả bài thi?',
          answer:
            'Sau khi hoàn thành bài thi, hệ thống sẽ tự động chấm điểm và hiển thị kết quả chi tiết. Bạn có thể xem lại các câu trả lời đúng/sai và giải thích cho từng câu hỏi.',
          isOpen: false,
        },
        {
          question: 'Tôi có thể thi lại một bài thi không?',
          answer:
            'Có, bạn có thể thi lại bất kỳ bài thi nào không giới hạn số lần. Mỗi lần thi sẽ có các câu hỏi được chọn ngẫu nhiên từ ngân hàng đề.',
          isOpen: false,
        },
        {
          question: 'Làm sao để theo dõi tiến độ học tập?',
          answer:
            'Bạn có thể xem thống kê chi tiết về kết quả học tập trong phần "Kết quả thi". Hệ thống sẽ hiển thị điểm số, thời gian làm bài và tiến độ hoàn thành của từng môn học.',
          isOpen: false,
        },
        {
          question: 'Tôi quên mật khẩu phải làm sao?',
          answer:
            'Bạn có thể sử dụng chức năng "Quên mật khẩu" trên trang đăng nhập. Nhập email đã đăng ký, hệ thống sẽ gửi link đặt lại mật khẩu qua email của bạn.',
          isOpen: false,
        },
      ],
    }
  },
  methods: {
    toggleAccordion(index) {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen
    },
  },
}
</script>

<style scoped>
.faq {
  margin-top: 70px;
  font-size: 1.4rem;
}

.faq__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.faq__subtitle {
  font-size: 1.1rem;
  color: #6c757d;
}

.faq__content {
  max-width: 800px;
  margin: 0 auto;
}

.accordion-item {
  border: 1px solid var(--border-color);
  border-radius: 8px !important;
  margin-bottom: 1rem;
  overflow: hidden;
}

.accordion-button {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1.5rem;
  background: white;
  border: none;
}

.accordion-button:not(.collapsed) {
  color: var(--orange-dark);
  background: var(--orange-light);
  box-shadow: none;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: var(--border-color);
}

.accordion-button::after {
  background-size: 1.2rem;
  transition: all 0.3s ease;
}

.accordion-body {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  padding: 1.5rem;
  background: white;
}

.faq__contact {
  margin-top: 4rem;
}

.faq__contact h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.faq__contact p {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.faq__contact-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  background: var(--orange-dark);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.faq__contact-btn:hover {
  background: var(--orange-light);
  color: var(--orange-dark);
}

@media (max-width: 768px) {
  .faq__title {
    font-size: 2rem;
  }

  .accordion-button {
    font-size: 1rem;
    padding: 1rem;
  }

  .accordion-body {
    font-size: 0.9rem;
    padding: 1rem;
  }

  .faq__contact h3 {
    font-size: 1.3rem;
  }

  .faq__contact p {
    font-size: 1rem;
  }
}
</style>

<template>
  <div class="subject">
    <div class="subject__banner">
      <img src="/public/images/banner.png" alt="banner" />
    </div>
    <div class="subject__list">
      <div
        class="subject__card"
        v-for="(subject, index) in subjects"
        :key="subject.Id"
        :style="{ background: gradientColors[index % gradientColors.length] }"
      >
        <img
          :src="getLogoUrl(subject.Id)"
          :alt="subject.Name"
          class="subject__image"
          loading="lazy"
          decoding="async"
          fetchpriority="high"
        />
        <div class="subject__content">
          <h5 class="subject__title">{{ subject.Name }}</h5>
          <div class="subject__block">
            <p class="subject__id">ID: {{ subject.Id }}</p>
            <button class="subject__button" @click="startQuiz(subject)">Start quiz</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showConfirmStart" class="quiz__popup-overlay">
      <div class="quiz__popup">
        <h3 class="quiz__popup-title">Xác nhận bắt đầu</h3>
        <p class="quiz__popup-message">
          Bạn có chắc chắn muốn bắt đầu làm bài thi môn {{ selectedSubject?.Name }}?<br />
          - Thời gian làm bài: 30 phút<br />
          - Số câu hỏi: 30 câu
        </p>
        <div class="quiz__popup-actions">
          <button class="quiz__button quiz__button--outline" @click="cancelStart">Hủy</button>
          <button class="quiz__button quiz__button--success" @click="confirmStart">Bắt đầu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subjects from '@/api/Subjects.js'

export default {
  data() {
    return {
      subjects: subjects,
      gradientColors: [
        'linear-gradient(45deg, #4B6CB7, #FFB347)',
        'linear-gradient(45deg, #00B4DB, #FF1493)',
        'linear-gradient(45deg, #00F260, #1E90FF)',
        'linear-gradient(45deg, #FF69B4, #4B0082)',
        'linear-gradient(45deg, #40E0D0, #32CD32)',
        'linear-gradient(45deg, #FF6B6B, #20B2AA)',
        'linear-gradient(45deg, #98FB98, #9370DB)',
        'linear-gradient(45deg, #FFD700, #00CED1)',
        'linear-gradient(45deg, #48C6EF, #FF4500)',
        'linear-gradient(45deg, #FFA07A, #4169E1)',
        'linear-gradient(45deg, #9400D3, #3CB371)',
        'linear-gradient(45deg, #FFD700, #FF7F50)',
        'linear-gradient(45deg, #32CD32, #E0FFFF)',
        'linear-gradient(45deg, #FFA500, #483D8B)',
        'linear-gradient(45deg, #20B2AA, #00BFFF)',
        'linear-gradient(45deg, #87CEEB, #00CED1)',
        'linear-gradient(45deg, #DA70D6, #6A5ACD)',
        'linear-gradient(45deg, #008B8B, #98FB98)',
        'linear-gradient(45deg, #00FA9A, #B0E0E6)',
        'linear-gradient(45deg, #1E90FF, #32CD32)',
        'linear-gradient(45deg, #FFB6C1, #87CEFA)',
        'linear-gradient(45deg, #00CED1, #FFA07A)',
        'linear-gradient(45deg, #FF4500, #FF69B4)',
        'linear-gradient(45deg, #00BFFF, #FF69B4)',
        'linear-gradient(45deg, #98FF98, #4169E1)',
      ],
      showConfirmStart: false,
      selectedSubject: null,
    }
  },
  methods: {
    getLogoUrl(subjectId) {
      return new URL(`../api/logos/${subjectId}.png`, import.meta.url).href
    },
    startQuiz(subject) {
      const isLoggedIn = localStorage.getItem('user')

      if (!isLoggedIn) {
        this.$router.push('/login?redirect=/subjects')
        return
      }

      this.selectedSubject = subject
      this.showConfirmStart = true
    },
    cancelStart() {
      this.showConfirmStart = false
      this.selectedSubject = null
    },
    confirmStart() {
      this.showConfirmStart = false
      this.$router.push(`/quiz/${this.selectedSubject.Id}`)
    },
  },
}
</script>

<template>
  <div class="quiz-results">
    <div class="quiz-results__container">
      <div class="quiz-results__card">
        <h3 class="quiz-results__title">Kết quả các bài thi</h3>

        <div v-if="quizResults.length === 0" class="quiz-results__empty">
          <i class="quiz-results__empty-icon bi bi-journal-x"></i>
          <p class="quiz-results__empty-text">Bạn chưa có bài thi nào</p>
          <router-link to="/subjects" class="quiz-results__button">Làm bài thi ngay</router-link>
        </div>

        <div v-else class="quiz-results__table-wrapper">
          <table class="quiz-results__table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Môn học</th>
                <th>Điểm số</th>
                <th>Thời gian làm bài</th>
                <th>Ngày thi</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, index) in quizResults" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ result.subjectName }}</td>
                <td>
                  <span
                    class="quiz-results__score"
                    :class="getScoreClass(result.score, result.totalQuestions)"
                  >
                    {{ result.score }}/{{ result.totalQuestions }}
                  </span>
                </td>
                <td>{{ formatTime(result.timeSpent) }}</td>
                <td>{{ formatDate(result.date) }}</td>
                <td>
                  <button class="quiz-results__detail-button" @click="viewDetail(result)">
                    <i class="bi bi-eye"></i>
                    Chi tiết
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="quizResults.length > 0" class="quiz-results__stats">
          <div class="quiz-results__stat-card">
            <div class="quiz-results__stat-content">
              <h5 class="quiz-results__stat-title">Số bài đã thi</h5>
              <p class="quiz-results__stat-value">{{ quizResults.length }}</p>
            </div>
          </div>
          <div class="quiz-results__stat-card">
            <div class="quiz-results__stat-content">
              <h5 class="quiz-results__stat-title">Điểm trung bình</h5>
              <p class="quiz-results__stat-value">{{ averageScore.toFixed(1) }}/10</p>
            </div>
          </div>
          <div class="quiz-results__stat-card">
            <div class="quiz-results__stat-content">
              <h5 class="quiz-results__stat-title">Bài thi gần nhất</h5>
              <p class="quiz-results__stat-value">{{ formatDate(lastQuizDate) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizResults',

  data() {
    return {
      quizResults: [],
    }
  },

  computed: {
    averageScore() {
      if (this.quizResults.length === 0) return 0
      const total = this.quizResults.reduce((sum, result) => {
        return sum + (result.score / result.totalQuestions) * 10
      }, 0)
      return total / this.quizResults.length
    },

    lastQuizDate() {
      if (this.quizResults.length === 0) return null
      return this.quizResults[0].date
    },
  },

  created() {
    this.loadResults()
  },

  methods: {
    loadResults() {
      const currentUser = JSON.parse(localStorage.getItem('user'))
      if (!currentUser) {
        this.$router.push('/login')
        return
      }
      const quizHistoryKey = `quizHistory_${currentUser.username}`
      const results = localStorage.getItem(quizHistoryKey)

      if (results) {
        this.quizResults = JSON.parse(results)
        this.quizResults.sort((a, b) => new Date(b.date) - new Date(a.date))
      }
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },

    getScoreClass(score, total) {
      const percentage = (score / total) * 100
      if (percentage >= 80) return 'bg-success'
      if (percentage >= 60) return 'bg-primary'
      if (percentage >= 40) return 'bg-warning'
      return 'bg-danger'
    },

    viewDetail(result) {
      this.$router.push({
        name: 'quiz-detail',
        params: {
          resultId: result.id,
        },
      })
    },
  },
}
</script>

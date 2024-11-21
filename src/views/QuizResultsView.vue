<template>
  <div class="container py-5 mt-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-4">Kết quả các bài thi</h3>

            <div v-if="quizResults.length === 0" class="text-center py-5">
              <i class="bi bi-journal-x display-1 text-muted"></i>
              <p class="mt-3">Bạn chưa có bài thi nào</p>
              <router-link to="/" class="btn btn-primary"> Làm bài thi ngay </router-link>
            </div>

            <div v-else class="table-responsive">
              <table class="table">
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
                        class="badge"
                        :class="getScoreClass(result.score, result.totalQuestions)"
                      >
                        {{ result.score }}/{{ result.totalQuestions }}
                      </span>
                    </td>
                    <td>{{ formatTime(result.timeSpent) }}</td>
                    <td>{{ formatDate(result.date) }}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary" @click="viewDetail(result)">
                        <i class="bi bi-eye me-1"></i>
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Thống kê tổng quát -->
            <div v-if="quizResults.length > 0" class="row mt-4">
              <div class="col-md-4">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5>Số bài đã thi</h5>
                    <p class="h3">{{ quizResults.length }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5>Điểm trung bình</h5>
                    <p class="h3">{{ averageScore.toFixed(1) }}/10</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5>Bài thi gần nhất</h5>
                    <p class="h3">{{ formatDate(lastQuizDate) }}</p>
                  </div>
                </div>
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

      // Lấy lịch sử thi theo username
      const quizHistoryKey = `quizHistory_${currentUser.username}`
      const results = localStorage.getItem(quizHistoryKey)

      if (results) {
        this.quizResults = JSON.parse(results)
        // Sắp xếp theo thời gian mới nhất
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

<style scoped>
.badge {
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;
}

@media (max-width: 768px) {
  .table-responsive {
    margin: 0 -15px;
  }

  .table td,
  .table th {
    white-space: nowrap;
    padding: 0.5rem;
  }

  .badge {
    padding: 0.35rem 0.5rem;
  }
}
</style>

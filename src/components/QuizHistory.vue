<template>
  <div class="quiz-history">
    <h3 class="mb-4">Lịch sử làm bài</h3>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Môn học</th>
            <th>Điểm số</th>
            <th>Thời gian</th>
            <th>Ngày thi</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in quizHistory" :key="index">
            <td>{{ result.subjectName }}</td>
            <td>{{ result.score }}/{{ result.totalQuestions }}</td>
            <td>{{ formatTime(result.timeSpent) }}</td>
            <td>{{ formatDate(result.date) }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="viewDetail(result)">
                Xem chi tiết
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizHistory',
  data() {
    return {
      quizHistory: [],
    }
  },
  created() {
    this.loadHistory()
  },
  methods: {
    loadHistory() {
      const history = localStorage.getItem('quizHistory')
      if (history) {
        this.quizHistory = JSON.parse(history)
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN')
    },
    viewDetail(result) {
      this.$router.push({
        name: 'quiz-detail',
        params: {
          id: result.subjectId,
          resultId: this.quizHistory.indexOf(result),
        },
      })
    },
  },
}
</script>

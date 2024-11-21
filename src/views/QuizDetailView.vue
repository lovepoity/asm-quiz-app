<template>
  <div class="container py-5 mt-5">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="card-title mb-0">Chi tiết bài thi {{ quizResult?.subjectName }}</h3>
          <router-link to="/quiz-results" class="btn btn-outline-primary">
            <i class="bi bi-arrow-left me-2"></i>Quay lại
          </router-link>
        </div>

        <div class="quiz-info mb-4">
          <div class="row">
            <div class="col-md-3">
              <div class="card bg-light">
                <div class="card-body text-center">
                  <h5>Điểm số</h5>
                  <p class="h3">
                    <span :class="getScoreClass(quizResult?.score, quizResult?.totalQuestions)">
                      {{ quizResult?.score }}/{{ quizResult?.totalQuestions }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card bg-light">
                <div class="card-body text-center">
                  <h5>Thời gian làm bài</h5>
                  <p class="h3">{{ formatTime(quizResult?.timeSpent) }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card bg-light">
                <div class="card-body text-center">
                  <h5>Ngày thi</h5>
                  <p class="h3">{{ formatDate(quizResult?.date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="questions-review">
          <h4 class="mb-3">Chi tiết câu trả lời:</h4>
          <div v-for="(question, index) in quizResult?.questions" :key="index" class="mb-4">
            <div class="question-item p-3 border rounded">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="mb-0">Câu {{ index + 1 }}</h5>
                <span class="badge" :class="isCorrectAnswer(index) ? 'bg-success' : 'bg-danger'">
                  {{ isCorrectAnswer(index) ? 'Đúng' : 'Sai' }}
                </span>
              </div>

              <p class="question-text mb-3">{{ question.Text }}</p>

              <div class="answers">
                <div
                  v-for="(answer, ansIndex) in question.Answers"
                  :key="ansIndex"
                  class="answer-item p-2 mb-2 rounded"
                  :class="{
                    'correct-answer': answer.Id === question.AnswerId,
                    'wrong-answer':
                      quizResult.answers[index] === ansIndex && answer.Id !== question.AnswerId,
                    'selected-answer': quizResult.answers[index] === ansIndex,
                  }"
                >
                  {{ answer.Text }}
                  <i
                    v-if="answer.Id === question.AnswerId"
                    class="bi bi-check-circle-fill text-success float-end"
                  ></i>
                  <i
                    v-if="quizResult.answers[index] === ansIndex && answer.Id !== question.AnswerId"
                    class="bi bi-x-circle-fill text-danger float-end"
                  ></i>
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
  name: 'QuizDetail',

  data() {
    return {
      quizResult: null,
    }
  },

  created() {
    this.loadQuizResult()
  },

  methods: {
    loadQuizResult() {
      const currentUser = JSON.parse(localStorage.getItem('user'))
      if (!currentUser) {
        this.$router.push('/login')
        return
      }

      const quizHistoryKey = `quizHistory_${currentUser.username}`
      const results = JSON.parse(localStorage.getItem(quizHistoryKey) || '[]')

      const resultId = parseInt(this.$route.params.resultId)
      const result = results.find((r) => r.id === resultId)

      if (result) {
        this.quizResult = result
      } else {
        this.$router.push('/quiz-results')
      }
    },

    formatTime(seconds) {
      if (!seconds) return ''
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },

    formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },

    getScoreClass(score, total) {
      if (!score || !total) return ''
      const percentage = (score / total) * 100
      if (percentage >= 80) return 'text-success'
      if (percentage >= 60) return 'text-primary'
      if (percentage >= 40) return 'text-warning'
      return 'text-danger'
    },

    isCorrectAnswer(questionIndex) {
      const question = this.quizResult.questions[questionIndex]
      const selectedAnswerIndex = this.quizResult.answers[questionIndex]
      const correctAnswerId = question.AnswerId
      return question.Answers[selectedAnswerIndex]?.Id === correctAnswerId
    },
  },
}
</script>

<style scoped>
.question-item {
  background-color: #f8f9fa;
}

.answer-item {
  background-color: white;
  border: 1px solid #dee2e6;
}

.correct-answer {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.wrong-answer {
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.selected-answer {
  font-weight: 500;
}

.badge {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}
</style>

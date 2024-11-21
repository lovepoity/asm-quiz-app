<template>
  <div class="quiz-detail">
    <div class="quiz-detail__container">
      <div class="quiz-detail__card">
        <div class="quiz-detail__header">
          <h3 class="quiz-detail__title">Chi tiết bài thi {{ quizResult?.subjectName }}</h3>
          <router-link to="/quiz-results" class="quiz-detail__back-button">
            <i class="bi bi-arrow-left"></i>Quay lại
          </router-link>
        </div>

        <div class="quiz-detail__summary">
          <div class="quiz-detail__stats">
            <div class="quiz-detail__stat-card">
              <h5 class="quiz-detail__stat-title">Điểm số</h5>
              <p class="quiz-detail__stat-value">
                <span :class="getScoreClass(quizResult?.score, quizResult?.totalQuestions)">
                  {{ quizResult?.score }}/{{ quizResult?.totalQuestions }}
                </span>
              </p>
            </div>

            <div class="quiz-detail__stat-card">
              <h5 class="quiz-detail__stat-title">Thời gian làm bài</h5>
              <p class="quiz-detail__stat-value">{{ formatTime(quizResult?.timeSpent) }}</p>
            </div>

            <div class="quiz-detail__stat-card">
              <h5 class="quiz-detail__stat-title">Ngày thi</h5>
              <p class="quiz-detail__stat-value">{{ formatDate(quizResult?.date) }}</p>
            </div>
          </div>
        </div>

        <div class="quiz-detail__content">
          <h4 class="quiz-detail__subtitle">Chi tiết câu trả lời:</h4>
          <div
            v-for="(question, index) in quizResult?.questions"
            :key="index"
            class="quiz-detail__question"
          >
            <div class="quiz-detail__question-card">
              <div class="quiz-detail__question-header">
                <h5 class="quiz-detail__question-title">Câu {{ index + 1 }}</h5>
                <span
                  class="quiz-detail__question-status"
                  :class="
                    isCorrectAnswer(index)
                      ? 'quiz-detail__question-status--correct'
                      : 'quiz-detail__question-status--wrong'
                  "
                >
                  {{ isCorrectAnswer(index) ? 'Đúng' : 'Sai' }}
                </span>
              </div>

              <p class="quiz-detail__question-text">{{ question.Text }}</p>

              <div class="quiz-detail__answers">
                <div
                  v-for="(answer, ansIndex) in question.Answers"
                  :key="ansIndex"
                  class="quiz-detail__answer"
                  :class="{
                    'quiz-detail__answer--correct': answer.Id === question.AnswerId,
                    'quiz-detail__answer--wrong':
                      quizResult.answers[index] === ansIndex && answer.Id !== question.AnswerId,
                    'quiz-detail__answer--selected': quizResult.answers[index] === ansIndex,
                  }"
                >
                  {{ answer.Text }}
                  <i
                    v-if="answer.Id === question.AnswerId"
                    class="bi bi-check-circle-fill quiz-detail__answer-icon quiz-detail__answer-icon--correct"
                  ></i>
                  <i
                    v-if="quizResult.answers[index] === ansIndex && answer.Id !== question.AnswerId"
                    class="bi bi-x-circle-fill quiz-detail__answer-icon quiz-detail__answer-icon--wrong"
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
      if (percentage >= 80) return 'quiz-detail__score--success'
      if (percentage >= 60) return 'quiz-detail__score--primary'
      if (percentage >= 40) return 'quiz-detail__score--warning'
      return 'quiz-detail__score--danger'
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

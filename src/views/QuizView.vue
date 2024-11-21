<template>
  <div class="quiz">
    <div class="quiz__container">
      <div class="quiz__header">
        <h2 class="quiz__title">{{ subject.Name }}</h2>
        <div class="quiz__info">
          <span class="quiz__badge quiz__badge--primary">
            Câu hỏi: {{ currentQuestion + 1 }}/{{ questions.length }}
          </span>
          <span class="quiz__badge quiz__badge--warning">
            Thời gian: {{ formatTime(timeLeft) }}
          </span>
        </div>
      </div>

      <div class="quiz__content" v-if="!quizCompleted">
        <div class="quiz__card">
          <h5 class="quiz__question-text">{{ currentQuestionData.Text }}</h5>

          <div class="quiz__answers">
            <div
              v-for="(answer, index) in currentQuestionData.Answers"
              :key="index"
              class="quiz__answer"
              :class="{ 'quiz__answer--selected': selectedAnswer === index }"
              @click="selectAnswer(index)"
            >
              <input
                type="radio"
                :id="'answer' + index"
                :name="'question'"
                :value="index"
                v-model="selectedAnswer"
                class="quiz__answer-input"
              />
              <label :for="'answer' + index" class="quiz__answer-label">
                {{ answer.Text }}
              </label>
            </div>
          </div>
        </div>

        <div class="quiz__navigation">
          <button
            class="quiz__button quiz__button--outline"
            @click="previousQuestion"
            :disabled="currentQuestion === 0"
          >
            <i class="bi bi-arrow-left"></i> Câu trước
          </button>
          <button
            v-if="currentQuestion < questions.length - 1"
            class="quiz__button quiz__button--primary"
            @click="nextQuestion"
          >
            Câu tiếp <i class="bi bi-arrow-right"></i>
          </button>
          <button v-else class="quiz__button quiz__button--success" @click="submitQuiz">
            Nộp bài <i class="bi bi-check2"></i>
          </button>
        </div>
      </div>

      <div class="quiz__result" v-else>
        <div class="quiz__card">
          <div class="quiz__result-header">
            <h3 class="quiz__result-title">Kết quả bài thi</h3>
            <div class="quiz__result-score">
              <h1>{{ score }}/{{ questions.length }}</h1>
              <p>Điểm số của bạn</p>
            </div>
          </div>

          <div class="quiz__result-details">
            <h4 class="quiz__result-subtitle">Chi tiết bài làm:</h4>
            <div v-for="(question, index) in questions" :key="index" class="quiz__question">
              <div
                class="quiz__question-card"
                :class="
                  isCorrectAnswer(index)
                    ? 'quiz__question-card--correct'
                    : 'quiz__question-card--wrong'
                "
              >
                <p class="quiz__question-header">
                  <span
                    class="quiz__question-badge"
                    :class="
                      isCorrectAnswer(index)
                        ? 'quiz__question-badge--correct'
                        : 'quiz__question-badge--wrong'
                    "
                  >
                    Câu {{ index + 1 }}
                  </span>
                  {{ question.Text }}
                </p>
                <div class="quiz__answer-list">
                  <div
                    v-for="(answer, ansIndex) in question.Answers"
                    :key="ansIndex"
                    class="quiz__answer-item"
                    :class="{
                      'quiz__answer-item--correct': answer.Id === question.AnswerId,
                      'quiz__answer-item--wrong':
                        answers[index] === ansIndex && answer.Id !== question.AnswerId,
                    }"
                  >
                    {{ answer.Text }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="quiz__actions">
            <router-link to="/" class="quiz__button quiz__button--primary">
              Về trang chủ
            </router-link>
            <button class="quiz__button quiz__button--outline" @click="retryQuiz">Làm lại</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastMessage ref="toast" />
</template>

<script>
import ToastMessage from '@/components/ToastMessage.vue'
import subjects from '@/api/Subjects.js'
import ADAV from '@/api/quizs/ADAV.js'
import ADBS from '@/api/quizs/ADBS.js'
import ADTE from '@/api/quizs/ADTE.js'
import ADUI from '@/api/quizs/ADUI.js'
import ASNE from '@/api/quizs/ASNE.js'
import CLCO from '@/api/quizs/CLCO.js'
import DBAV from '@/api/quizs/DBAV.js'
import DBBS from '@/api/quizs/DBBS.js'
import GAME from '@/api/quizs/GAME.js'
import HTCS from '@/api/quizs/HTCS.js'
import INMA from '@/api/quizs/INMA.js'
import JAAV from '@/api/quizs/JAAV.js'
import JABS from '@/api/quizs/JABS.js'
import JSPR from '@/api/quizs/JSPR.js'
import LAYO from '@/api/quizs/LAYO.js'
import MOWE from '@/api/quizs/MOWE.js'
import PHPP from '@/api/quizs/PHPP.js'
import PMAG from '@/api/quizs/PMAG.js'
import VBPR from '@/api/quizs/VBPR.js'
import WEBU from '@/api/quizs/WEBU.js'

export default {
  components: {
    ToastMessage,
  },
  data() {
    return {
      subjects: subjects,
      subject: null,
      questions: [],
      currentQuestion: 0,
      selectedAnswer: null,
      answers: [],
      quizCompleted: false,
      timeLeft: 1800,
      timer: null,
      score: 0,
    }
  },
  computed: {
    currentQuestionData() {
      return this.questions[this.currentQuestion]
    },
  },
  methods: {
    getQuizBySubjectId(subjectId) {
      const quizMap = {
        ADAV: ADAV,
        ADBS: ADBS,
        ADTE: ADTE,
        ADUI: ADUI,
        ASNE: ASNE,
        CLCO: CLCO,
        DBAV: DBAV,
        DBBS: DBBS,
        GAME: GAME,
        HTCS: HTCS,
        INMA: INMA,
        JAAV: JAAV,
        JABS: JABS,
        JSPR: JSPR,
        LAYO: LAYO,
        MOWE: MOWE,
        PHPP: PHPP,
        PMAG: PMAG,
        VBPR: VBPR,
        WEBU: WEBU,
      }
      return quizMap[subjectId] || []
    },

    getRandomQuestions(allQuestions, count) {
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    },

    nextQuestion() {
      if (this.selectedAnswer !== null) {
        this.answers[this.currentQuestion] = this.selectedAnswer
        this.currentQuestion++
        this.selectedAnswer = this.answers[this.currentQuestion] ?? null
        this.saveQuizState()
      } else {
        this.$refs.toast.showToast('Vui lòng chọn câu trả lời', 'warning')
      }
    },

    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--
        this.selectedAnswer = this.answers[this.currentQuestion]
        this.saveQuizState()
      }
    },

    submitQuiz() {
      if (this.selectedAnswer === null) {
        this.$refs.toast.showToast('Vui lòng chọn câu trả lời', 'warning')
        return
      }

      this.answers[this.currentQuestion] = this.selectedAnswer
      this.calculateScore()
      clearInterval(this.timer)
      this.saveQuizResult()
      this.quizCompleted = true
      this.clearQuizState()
      this.$refs.toast.showToast('Nộp bài thành công!', 'success')
    },

    calculateScore() {
      this.score = this.answers.reduce((score, selectedAnswerIndex, questionIndex) => {
        const question = this.questions[questionIndex]
        const correctAnswerId = question.AnswerId
        const selectedAnswer = question.Answers[selectedAnswerIndex]
        return score + (selectedAnswer?.Id === correctAnswerId ? 1 : 0)
      }, 0)
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },

    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          this.submitQuiz()
        }
      }, 1000)
    },

    isCorrectAnswer(questionIndex) {
      const question = this.questions[questionIndex]
      const selectedAnswer = question.Answers[this.answers[questionIndex]]
      return selectedAnswer?.Id === question.AnswerId
    },

    retryQuiz() {
      this.clearQuizState()
      this.currentQuestion = 0
      this.selectedAnswer = null
      this.answers = new Array(this.questions.length).fill(null)
      this.quizCompleted = false
      this.score = 0
      this.timeLeft = 1800
      this.startTimer()
      this.questions = this.getRandomQuestions(this.getQuizBySubjectId(this.$route.params.id), 20)
      this.$refs.toast.showToast('Bắt đầu làm lại bài thi', 'info')
    },

    saveQuizResult() {
      const currentUser = JSON.parse(localStorage.getItem('user'))
      if (!currentUser) return

      const result = {
        id: Date.now(),
        subjectId: this.$route.params.id,
        subjectName: this.subject.Name,
        score: this.score,
        totalQuestions: this.questions.length,
        date: new Date().toISOString(),
        timeSpent: 1800 - this.timeLeft,
        answers: this.answers,
        questions: this.questions,
      }

      const quizHistoryKey = `quizHistory_${currentUser.username}`
      let userQuizHistory = JSON.parse(localStorage.getItem(quizHistoryKey) || '[]')
      userQuizHistory.push(result)
      localStorage.setItem(quizHistoryKey, JSON.stringify(userQuizHistory))
    },

    selectAnswer(index) {
      this.selectedAnswer = index
      this.saveQuizState()
    },

    saveQuizState() {
      const quizState = {
        questions: this.questions,
        currentQuestion: this.currentQuestion,
        selectedAnswer: this.selectedAnswer,
        answers: this.answers,
        timeLeft: this.timeLeft,
        subject: this.subject,
      }
      localStorage.setItem('quizState', JSON.stringify(quizState))
    },

    loadQuizState() {
      const savedState = localStorage.getItem('quizState')
      if (savedState) {
        const state = JSON.parse(savedState)
        this.questions = state.questions
        this.currentQuestion = state.currentQuestion
        this.selectedAnswer = state.selectedAnswer
        this.answers = state.answers
        this.timeLeft = state.timeLeft
        this.subject = state.subject
        return true
      }
      return false
    },

    clearQuizState() {
      localStorage.removeItem('quizState')
    },
  },
  created() {
    const subjectId = this.$route.params.id

    if (!this.loadQuizState()) {
      this.subject = subjects.find((s) => s.Id === subjectId)
      if (!this.subject) {
        this.$router.push('/')
        return
      }

      const allQuestions = this.getQuizBySubjectId(subjectId)
      if (!allQuestions || !allQuestions.length) {
        this.$refs.toast.showToast('Không tìm thấy câu hỏi cho môn học này', 'danger')
        this.$router.push('/')
        return
      }

      this.questions = this.getRandomQuestions(allQuestions, 20)
      this.answers = new Array(this.questions.length).fill(null)
    }

    this.startTimer()

    window.addEventListener('beforeunload', this.saveQuizState)
  },
  beforeUnmount() {
    clearInterval(this.timer)
    window.removeEventListener('beforeunload', this.saveQuizState)
  },
}
</script>

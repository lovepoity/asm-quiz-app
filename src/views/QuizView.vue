<template>
  <div class="quiz">
    <div v-if="!quizCompleted" class="quiz__overlay"></div>
    <div class="quiz__container" :class="{ 'quiz--in-progress': !quizCompleted }">
      <div v-if="!quizCompleted">
        <div class="quiz__header">
          <h2 class="quiz__title">{{ subject.Name }}</h2>
          <div class="quiz__info">
            <span class="quiz__badge quiz__badge--primary">
              Question: {{ currentQuestion + 1 }}/{{ questions.length }}
            </span>
            <span class="quiz__badge quiz__badge--warning">
              Time left: {{ formatTime(timeLeft) }}
            </span>
          </div>
        </div>

        <div class="quiz__content">
          <div class="quiz__content-wrapper">
            <div class="quiz__question--left">
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
            <div class="quiz__question-navigator">
              <div
                v-for="(question, index) in questions"
                :key="index"
                class="quiz__question-number"
                :class="{
                  'quiz__question-number--current': currentQuestion === index,
                  'quiz__question-number--answered': answers[index] !== null,
                }"
                @click="goToQuestion(index)"
              >
                {{ index + 1 }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="quiz__completed">
        <div class="quiz__completed-content">
          <i class="bi bi-check-circle-fill quiz__completed-icon"></i>
          <h2 class="quiz__completed-title">Chúc mừng!</h2>
          <p class="quiz__completed-message">Bạn đã hoàn thành bài thi</p>
          <router-link to="/" class="quiz__button quiz__button--primary">
            Về trang chủ
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="showConfirmSubmit" class="quiz__popup-overlay">
      <div class="quiz__popup">
        <h3 class="quiz__popup-title">Xác nhận nộp bài</h3>
        <p class="quiz__popup-message">
          Bạn có chắc chắn muốn nộp bài?<br />
          Số câu đã làm: {{ answers.filter((a) => a !== null).length }}/{{ questions.length }}
        </p>
        <div class="quiz__popup-actions">
          <button class="quiz__button quiz__button--outline" @click="showConfirmSubmit = false">
            Hủy
          </button>
          <button class="quiz__button quiz__button--success" @click="confirmSubmit">Nộp bài</button>
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
      showConfirmSubmit: false,
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
      this.answers[this.currentQuestion] = this.selectedAnswer
      this.currentQuestion++
      this.selectedAnswer = this.answers[this.currentQuestion] ?? null
      this.saveQuizState()
    },

    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--
        this.selectedAnswer = this.answers[this.currentQuestion]
        this.saveQuizState()
      }
    },

    submitQuiz() {
      this.showConfirmSubmit = true
    },

    confirmSubmit() {
      this.score = this.answers.reduce((total, answer, index) => {
        return total + (this.isCorrectAnswer(index) ? 1 : 0)
      }, 0)

      this.saveQuizResult()

      this.showConfirmSubmit = false
      this.quizCompleted = true

      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }

      this.clearQuizState()
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
          this.submitQuiz(true)
        }
      }, 1000)
    },

    isCorrectAnswer(questionIndex) {
      const question = this.questions[questionIndex]
      const selectedAnswer = question.Answers[this.answers[questionIndex]]
      return selectedAnswer?.Id === question.AnswerId
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
      this.answers[this.currentQuestion] = index
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
        quizCompleted: this.quizCompleted,
        score: this.score,
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
        this.quizCompleted = state.quizCompleted
        this.score = state.score
        return true
      }
      return false
    },

    clearQuizState() {
      localStorage.removeItem('quizState')
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    lockScroll() {
      document.body.style.overflow = 'hidden'
    },

    unlockScroll() {
      document.body.style.overflow = 'auto'
    },

    disableInteractions() {
      document.addEventListener('contextmenu', this.preventDefault)
      document.addEventListener('keydown', this.preventKeyboardShortcuts)
      document.addEventListener('selectstart', this.preventDefault)
      window.addEventListener('popstate', this.preventBrowserBack)
      history.pushState(null, null, location.href)
      window.addEventListener('popstate', () => {
        history.pushState(null, null, location.href)
      })
    },

    enableInteractions() {
      document.removeEventListener('contextmenu', this.preventDefault)
      document.removeEventListener('keydown', this.preventKeyboardShortcuts)
      document.removeEventListener('selectstart', this.preventDefault)
      window.removeEventListener('popstate', this.preventBrowserBack)
    },

    preventDefault(e) {
      if (!this.quizCompleted) {
        e.preventDefault()
      }
    },

    preventKeyboardShortcuts(e) {
      if (!this.quizCompleted) {
        if (
          (e.ctrlKey && e.key === 'c') ||
          (e.ctrlKey && e.key === 'v') ||
          (e.ctrlKey && e.key === 'a') ||
          e.key === 'F12' ||
          e.altKey
        ) {
          e.preventDefault()
        }
      }
    },

    preventBrowserBack(event) {
      event.preventDefault()
      return false
    },

    goToQuestion(index) {
      if (index !== this.currentQuestion) {
        this.answers[this.currentQuestion] = this.selectedAnswer
        this.currentQuestion = index
        this.selectedAnswer = this.answers[index] ?? null
        this.saveQuizState()
      }
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

      this.questions = this.getRandomQuestions(allQuestions, 30)
      this.answers = new Array(this.questions.length).fill(null)
    }

    this.startTimer()
    this.lockScroll()
    this.disableInteractions()
  },
  beforeRouteLeave(to, from, next) {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    this.clearQuizState()
    next()
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    this.unlockScroll()
    this.enableInteractions()
  },
  watch: {
    quizCompleted(newValue) {
      if (newValue) {
        this.unlockScroll()
      } else {
        this.lockScroll()
      }
    },
  },
}
</script>

<style scoped>
.quiz {
  margin-top: 70px;
  padding: 48px 64px 128px;
  font-size: 14px;
}

.quiz__content-wrapper {
  display: flex;
  gap: 24px;
}

.quiz__question--left {
  flex: 1;
}

/* Thêm responsive styles */
@media (max-width: 1200px) {
  .quiz {
    padding: 32px;
  }

  .quiz__title {
    font-size: 28px;
  }
}

@media (max-width: 992px) {
  .quiz__content-wrapper {
    flex-direction: column;
  }

  .quiz__question-navigator {
    width: 100%;
    grid-template-columns: repeat(10, 1fr);
  }
}

@media (max-width: 768px) {
  .quiz {
    padding: 16px;
  }

  .quiz__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .quiz__title {
    font-size: 24px;
  }

  .quiz__question-navigator {
    grid-template-columns: repeat(8, 1fr);
  }

  .quiz__navigation {
    flex-direction: column;
    gap: 12px;
  }

  .quiz__button {
    width: 100%;
  }

  .quiz__popup {
    width: 95%;
    padding: 16px;
  }
}

@media (max-width: 576px) {
  .quiz__question-navigator {
    grid-template-columns: repeat(5, 1fr);
  }

  .quiz__question-text {
    font-size: 16px;
  }

  .quiz__answer {
    padding: 12px;
  }

  .quiz__completed-content {
    padding: 16px;
  }

  .quiz__completed-icon {
    font-size: 48px;
  }

  .quiz__completed-title {
    font-size: 24px;
  }

  .quiz__completed-message {
    font-size: 16px;
  }

  .quiz__badge {
    font-size: 12px;
    padding: 4px 8px;
  }
}
</style>

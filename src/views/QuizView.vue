<template>
  <div class="quiz-container py-5 mt-5">
    <div class="container">
      <!-- Quiz Header -->
      <div class="quiz-header mb-4">
        <h2>{{ subject.Name }}</h2>
        <div class="quiz-info">
          <span class="badge bg-primary me-2"
            >Câu hỏi: {{ currentQuestion + 1 }}/{{ questions.length }}</span
          >
          <span class="badge bg-warning">Thời gian: {{ formatTime(timeLeft) }}</span>
        </div>
      </div>

      <!-- Quiz Content -->
      <div class="quiz-content" v-if="!quizCompleted">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">{{ currentQuestionData.Text }}</h5>

            <div class="answers-list">
              <div
                v-for="(answer, index) in currentQuestionData.Answers"
                :key="index"
                class="answer-item"
              >
                <input
                  type="radio"
                  :id="'answer' + index"
                  :name="'question'"
                  :value="index"
                  v-model="selectedAnswer"
                  class="form-check-input"
                />
                <label :for="'answer' + index" class="form-check-label">
                  {{ answer.Text }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="d-flex justify-content-between mt-4">
          <button
            class="btn btn-outline-primary"
            @click="previousQuestion"
            :disabled="currentQuestion === 0"
          >
            <i class="bi bi-arrow-left"></i> Câu trước
          </button>
          <button
            class="btn btn-primary"
            @click="nextQuestion"
            v-if="currentQuestion < questions.length - 1"
          >
            Câu tiếp <i class="bi bi-arrow-right"></i>
          </button>
          <button class="btn btn-success" @click="submitQuiz" v-else>
            Nộp bài <i class="bi bi-check2"></i>
          </button>
        </div>
      </div>

      <!-- Quiz Result -->
      <div class="quiz-result" v-else>
        <div class="card">
          <div class="card-body">
            <div class="text-center mb-4">
              <h3>Kết quả bài thi</h3>
              <div class="result-score mb-4">
                <h1>{{ score }}/{{ questions.length }}</h1>
                <p>Điểm số của bạn</p>
              </div>
            </div>

            <div class="result-details">
              <h4 class="mb-3">Chi tiết bài làm:</h4>
              <div v-for="(question, index) in questions" :key="index" class="mb-4">
                <div
                  class="question-result"
                  :class="{
                    'border-success': isCorrectAnswer(index),
                    'border-danger': !isCorrectAnswer(index),
                  }"
                >
                  <p class="mb-2">
                    <span
                      class="badge"
                      :class="isCorrectAnswer(index) ? 'bg-success' : 'bg-danger'"
                    >
                      Câu {{ index + 1 }}
                    </span>
                    {{ question.Text }}
                  </p>
                  <div class="answers">
                    <div
                      v-for="(answer, ansIndex) in question.Answers"
                      :key="ansIndex"
                      class="answer"
                      :class="{
                        correct: answer.Id === question.AnswerId,
                        incorrect: answers[index] === ansIndex && answer.Id !== question.AnswerId,
                      }"
                    >
                      {{ answer.Text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <router-link to="/" class="btn btn-primary me-2"> Về trang chủ </router-link>
              <button class="btn btn-outline-primary" @click="retryQuiz">Làm lại</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      } else {
        alert('Vui lòng chọn câu trả lời')
      }
    },

    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--
        this.selectedAnswer = this.answers[this.currentQuestion]
      }
    },

    submitQuiz() {
      if (this.selectedAnswer === null) {
        alert('Vui lòng chọn câu trả lời')
        return
      }

      this.answers[this.currentQuestion] = this.selectedAnswer
      this.calculateScore()
      clearInterval(this.timer)

      this.saveQuizResult()
      this.quizCompleted = true
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
      // Reset quiz state
      this.currentQuestion = 0
      this.selectedAnswer = null
      this.answers = new Array(this.questions.length).fill(null)
      this.quizCompleted = false
      this.score = 0
      this.timeLeft = 1800
      this.startTimer()

      // Get new random questions
      this.questions = this.getRandomQuestions(this.getQuizBySubjectId(this.$route.params.id), 20)
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
  },
  created() {
    const subjectId = this.$route.params.id

    // Get subject info
    this.subject = subjects.find((s) => s.Id === subjectId)
    if (!this.subject) {
      this.$router.push('/')
      return
    }

    // Get all questions for this subject
    const allQuestions = this.getQuizBySubjectId(subjectId)
    if (!allQuestions || !allQuestions.length) {
      alert('Không tìm thấy câu hỏi cho môn học này')
      this.$router.push('/')
      return
    }

    // Get 30 random questions
    this.questions = this.getRandomQuestions(allQuestions, 2)

    // Initialize answers array
    this.answers = new Array(this.questions.length).fill(null)

    // Start timer
    this.startTimer()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
}
</script>

<style scoped>
.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.answer-item:hover {
  background-color: #f8f9fa;
}

.result-score h1 {
  font-size: 4rem;
  color: var(--primary-color);
}

.question-result {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #dee2e6;
  margin-bottom: 1rem;
}

.answer {
  padding: 0.5rem 1rem;
  margin: 0.25rem 0;
  border-radius: 4px;
  background: #f8f9fa;
}

.answer.correct {
  background: #d4edda;
  color: #155724;
}

.answer.incorrect {
  background: #f8d7da;
  color: #721c24;
}

.progress {
  height: 1.5rem;
  border-radius: 1rem;
}

.progress-bar {
  background-image: var(--primary-gradient);
  transition: width 0.3s ease;
}

@media (max-width: 576px) {
  .quiz-header {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .quiz-info {
    width: 100%;
    text-align: center;
  }

  .answer-item {
    padding: 0.75rem;
  }

  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>

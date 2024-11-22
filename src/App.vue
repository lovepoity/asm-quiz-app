<template>
  <header class="header" v-if="!isQuizRoute">
    <div class="header__container">
      <router-link to="/" class="header__logo">
        <img src="/favicon.ico" alt="logo" />
        <span>SUNAO EDUCATION</span>
      </router-link>

      <div class="header__search">
        <div class="header__search-box" ref="searchBox">
          <input
            type="text"
            class="header__search-input"
            placeholder="Tìm kiếm môn học..."
            v-model="searchQuery"
            @input="handleSearch"
          />
          <i class="bi bi-search header__search-icon"></i>

          <div class="header__search-results" v-show="searchQuery.length > 0">
            <div
              v-for="subject in filteredSubjects"
              :key="subject.Id"
              class="header__search-item"
              @click="handleSelectSubject(subject)"
            >
              <img
                :src="getLogoUrl(subject.Id)"
                :alt="subject.Name"
                @error="handleImageError(subject.Id)"
              />
              <div class="header__search-info">
                <div class="header__search-name">{{ subject.Name }}</div>
                <div class="header__search-id">{{ subject.Id }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="header__actions">
        <template v-if="!currentUser">
          <router-link to="/register" class="header__register">Đăng ký</router-link>
          <router-link to="/login" class="header__login">Đăng nhập</router-link>
        </template>

        <div class="header__user" v-else ref="dropdown">
          <button class="header__user-btn" @click="toggleDropdown">
            <img :src="userAvatar" :alt="currentUser.fullname" />
            <i class="bi bi-chevron-down"></i>
          </button>

          <div class="header__dropdown" :class="{ 'header__dropdown--active': isDropdownOpen }">
            <div class="header__dropdown-header">
              <img :src="userAvatar" :alt="currentUser.fullname" />
              <div class="header__dropdown-info">
                <strong>{{ currentUser.fullname }}</strong>
                <span>{{ currentUser.email }}</span>
              </div>
            </div>

            <div class="header__dropdown-content">
              <router-link to="/profile" class="header__dropdown-item" @click="closeDropdown">
                <i class="bi bi-person"></i>Tài khoản
              </router-link>
              <router-link to="/quiz-results" class="header__dropdown-item" @click="closeDropdown">
                <i class="bi bi-journal-check"></i>Kết quả thi
              </router-link>
              <div class="header__dropdown-divider"></div>
              <button
                @click="handleLogout"
                class="header__dropdown-item header__dropdown-item--danger"
              >
                <i class="bi bi-box-arrow-right"></i>Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="layout" :class="{ 'layout--full': isQuizRoute }">
    <Sidebar v-if="!isQuizRoute" />
    <main class="main-content" :class="{ 'main-content--full': isQuizRoute }">
      <router-view></router-view>
    </main>
  </div>

  <footer class="footer" v-if="!isQuizRoute">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__section footer__section--about">
          <div class="footer__logo">
            <img src="/public/favicon.ico" alt="F8 logo" />
            <span>SUNAO EDUCATION</span>
          </div>
          <p class="footer__contact">
            Điện thoại: 0943 09 0202<br />
            Email: sunao@gmail.com<br />
            Địa chỉ: Số 1, ngõ 41, Trần Duy Hưng, Cầu Giấy, Hà Nội
          </p>
          <img src="/public/images/dmca-protected.png" alt="DMCA" class="footer__dmca" />
        </div>

        <div class="footer__section">
          <h3 class="footer__heading">VỀ SUNAO</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">Giới thiệu</a></li>
            <li><a href="#" class="footer__link">Liên hệ</a></li>
            <li><a href="#" class="footer__link">Điều khoản</a></li>
            <li><a href="#" class="footer__link">Bảo mật</a></li>
          </ul>
        </div>

        <div class="footer__section">
          <h3 class="footer__heading">SẢN PHẨM</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">Game Nester</a></li>
            <li><a href="#" class="footer__link">Game CSS Diner</a></li>
            <li><a href="#" class="footer__link">Game CSS Selectors</a></li>
            <li><a href="#" class="footer__link">Game Froggy</a></li>
            <li><a href="#" class="footer__link">Game Froggy Pro</a></li>
            <li><a href="#" class="footer__link">Game Scoops</a></li>
          </ul>
        </div>

        <div class="footer__section">
          <h3 class="footer__heading">CÔNG CỤ</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">Tạo CV xin việc</a></li>
            <li><a href="#" class="footer__link">Rút gọn liên kết</a></li>
            <li><a href="#" class="footer__link">Clip-path maker</a></li>
            <li><a href="#" class="footer__link">Snippet generator</a></li>
            <li><a href="#" class="footer__link">CSS Grid generator</a></li>
            <li><a href="#" class="footer__link">Cảnh báo sờ tay lên mặt</a></li>
          </ul>
        </div>

        <div class="footer__section footer__section--company">
          <h3 class="footer__heading">CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC SUNAO</h3>
          <p>Mã số thuế: 0123456789</p>
          <p>Ngày thành lập: 20/11/2024</p>
          <p>
            Lĩnh vực: Công nghệ, giáo dục, lập trình. SUNAO xây dựng và phát triển những sản phẩm
            mang lại giá trị cho cộng đồng.
          </p>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">© 2024 SUNAO. Nền tảng học lập trình hàng đầu Việt Nam</p>
        <div class="footer__social">
          <a href="#" class="footer__social-link">
            <i class="bi bi-youtube"></i>
          </a>
          <a href="#" class="footer__social-link">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="#" class="footer__social-link">
            <i class="bi bi-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>

  <ToastMessage ref="toast" />
</template>

<script>
import ToastMessage from '@/components/ToastMessage.vue'
import { currentUser } from '@/assets/eventBus'
import subjects from '@/api/Subjects.js'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    ToastMessage,
    Sidebar,
  },
  data() {
    return {
      subjects: subjects,
      isDropdownOpen: false,
      searchQuery: '',
      filteredSubjects: [],
      isSearchResultsVisible: false,
    }
  },

  computed: {
    currentUser() {
      return currentUser.value
    },
    userAvatar() {
      // Tạo avatar ngẫu nhiên từ DiceBear API
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.currentUser?.username}`
    },
    isQuizRoute() {
      return this.$route.path.includes('/quiz/')
    },
  },

  created() {
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods: {
    handleImageError(subjectId) {
      const iconMap = {
        ADAV: 'android',
        ADBS: 'android',
        ADTE: 'bug_report',
        ADUI: 'phone_android',
        ASNE: 'code',
        CLCO: 'cloud',
        DBAV: 'storage',
        DBBS: 'database',
        GAME: 'sports_esports',
        HTCS: 'html',
        INMA: 'campaign',
        JAAV: 'coffee',
        JABS: 'coffee',
        JSPR: 'javascript',
        LAYO: 'grid_view',
        MOWE: 'phone_iphone',
        PHPP: 'php',
        PMAG: 'assignment',
        VBPR: 'terminal',
        WEBU: 'web',
      }
      event.target.src = `https://placehold.co/200x200/2fbdff/ffffff?text=${iconMap[subjectId] || 'school'}`
    },
    handleLogout() {
      // Clear user data
      localStorage.removeItem('user')
      currentUser.value = null
      this.isDropdownOpen = false
      this.$router.push('/')
      this.$refs.toast.showToast('Đã đăng xut thành công!', 'success')
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown() {
      this.isDropdownOpen = false
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isDropdownOpen = false
      }

      if (this.$refs.searchBox && !this.$refs.searchBox.contains(event.target)) {
        this.searchQuery = ''
        this.filteredSubjects = []
      }
    },
    handleSearch() {
      const query = this.searchQuery.toLowerCase()
      if (!query) {
        this.filteredSubjects = []
        return
      }

      this.filteredSubjects = this.subjects
        .filter((subject) => {
          const subjectName = subject.Name.toLowerCase()
          const subjectId = subject.Id.toLowerCase()
          return subjectName.startsWith(query) || subjectId.startsWith(query)
        })
        .slice(0, 5)
    },

    handleSelectSubject(subject) {
      this.searchQuery = ''
      this.$router.push(`/quiz/${subject.Id}`)
    },

    getLogoUrl(subjectId) {
      return new URL(`/src/api/logos/${subjectId}.png`, import.meta.url).href
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
  }
}

.header__search {
  position: relative;
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
}

.header__search-box {
  position: relative;
  pointer-events: auto;
}

.header__search-input {
  width: 100%;
  padding: 8px 40px 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  cursor: text;
  pointer-events: auto;
  z-index: 1;
}

.header__search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
  z-index: 2;
}

.header__search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.header__search-item {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.header__search-item:hover {
  background-color: #f3f4f6;
}

.header__search-item img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 12px;
}

.header__search-info {
  flex: 1;
}

.header__search-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.header__search-id {
  font-size: 0.875rem;
  color: #6b7280;
}

.layout--full {
  margin: 0;
  padding: 0;
}

.main-content--full {
  margin-left: 0;
  padding: 0;
}
</style>

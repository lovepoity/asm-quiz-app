<template>
  <header class="header">
    <div class="header__container">
      <router-link to="/" class="header__logo">
        <img src="/favicon.ico" alt="logo" />
        <span>SUNAO EDUCATION</span>
      </router-link>

      <div class="header__search">
        <div class="header__search-box">
          <input
            type="text"
            class="header__search-input"
            placeholder="Tìm kiếm môn học..."
            v-model="searchQuery"
            @focus="showSearchResults = true"
            @input="handleSearch"
          />
          <i class="bi bi-search header__search-icon"></i>

          <div
            class="header__search-results"
            v-if="showSearchResults && filteredSubjects.length > 0"
          >
            <div
              v-for="subject in filteredSubjects"
              :key="subject.Id"
              class="header__search-item"
              @click="handleSelectSubject(subject)"
            >
              <img :src="getLogoUrl(subject.Id)" :alt="subject.Name" />
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

  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>

  <footer class="footer">
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
          <img src="/src/assets/images/dmca-protected.png" alt="DMCA" class="footer__dmca" />
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
import { currentUser } from '@/utils/eventBus'
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
      showSearchResults: false,
      filteredSubjects: [],
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
  },

  created() {
    // Add click outside listener
    document.addEventListener('click', this.handleClickOutside)

    // Thêm event listener để đóng search results khi click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        this.showSearchResults = false
      }
    })
  },

  beforeUnmount() {
    // Remove click outside listener
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
      return `https://placehold.co/200x200/2fbdff/ffffff?text=${iconMap[subjectId] || 'school'}`
    },
    handleLogout() {
      // Clear user data
      localStorage.removeItem('user')
      currentUser.value = null
      this.isDropdownOpen = false
      this.$router.push('/')
      this.$refs.toast.showToast('Đã đăng xuất thành công!', 'success')
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
    },
    handleSearch() {
      if (!this.searchQuery.trim()) {
        this.filteredSubjects = []
        return
      }

      const query = this.searchQuery.toLowerCase()
      this.filteredSubjects = this.subjects
        .filter(
          (subject) =>
            subject.Name.toLowerCase().includes(query) || subject.Id.toLowerCase().includes(query),
        )
        .slice(0, 5) // Giới hạn 5 kết quả
    },

    handleSelectSubject(subject) {
      this.searchQuery = ''
      this.showSearchResults = false
      this.$router.push(`/quiz/${subject.Id}`)
    },

    getLogoUrl(subjectId) {
      return new URL(`../api/logos/${subjectId}.png`, import.meta.url).href
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
</style>

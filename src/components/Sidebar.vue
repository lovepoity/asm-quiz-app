<template>
  <aside class="sidebar">
    <nav class="sidebar__nav">
      <router-link to="/" class="sidebar__item" exact>
        <i class="fa-solid fa-house"></i>
        <span>Trang chủ</span>
      </router-link>

      <router-link to="/subjects" class="sidebar__item">
        <i class="fa-solid fa-book"></i>
        <span>Môn học</span>
      </router-link>

      <router-link to="/contact" class="sidebar__item">
        <i class="fa-solid fa-envelope"></i>
        <span>Liên hệ</span>
      </router-link>

      <router-link to="/feedback" class="sidebar__item">
        <i class="fa-solid fa-comment-dots"></i>
        <span>Góp ý</span>
      </router-link>

      <router-link to="/faq" class="sidebar__item">
        <i class="fa-solid fa-question-circle"></i>
        <span>Hỏi đáp</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 70px;
  left: 0;
  height: fit-content;
  background: white;
  padding: 16px;
  overflow-y: auto;
}

.sidebar__menu {
  display: flex;
  flex-direction: column;
}

.sidebar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 82px;
  height: 82px;
  border-radius: 16px;
  margin-bottom: 8px;
  font-size: 0.85rem;
  font-weight: 600;
}

.sidebar__item:hover {
  background: #f5f5f5;
  color: var(--primary-color);
}

.sidebar__item.router-link-active {
  background: #e8ebed;
  color: var(--primary-color);
}

.sidebar__item i {
  margin-bottom: 8px;
  font-size: 1.1rem;
}
</style>

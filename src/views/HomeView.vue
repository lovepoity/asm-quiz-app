<template>
  <div class="home">
    <!-- Hero Section với gradient overlay -->
    <section class="home__hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="home__title">
              Nền tảng thi trắc nghiệm
              <span class="home__title-highlight">IT hàng đầu</span>
            </h1>
            <p class="home__subtitle">
              Sunao Education cung cấp hơn
              <span class="text-primary">500+ bài thi trắc nghiệm</span> về lập trình, giúp bạn đánh
              giá và nâng cao kiến thức IT một cách hiệu quả.
            </p>
            <router-link to="/subjects" class="home__cta-button">
              <span>Bắt đầu ngay</span>
              <i class="bi bi-arrow-right"></i>
            </router-link>
            <div class="home__hero-stats">
              <div class="home__hero-stat">
                <i class="bi bi-people-fill"></i>
                <span>10K+ Học viên</span>
              </div>
              <div class="home__hero-stat">
                <i class="bi bi-star-fill"></i>
                <span>4.8/5 Đánh giá</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="home__hero-image-wrapper">
              <img
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg"
                alt="Hero"
                class="home__hero-image"
              />
              <div class="home__hero-badge">
                <span>500+</span>
                <small>Bài thi</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section với animation -->
    <section class="home__features">
      <div class="container">
        <h2 class="home__section-title">
          Tại sao chọn <span class="text-primary">Sunao Education</span>?
        </h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="home__feature-card">
              <div class="home__feature-icon">
                <i class="bi bi-collection-play"></i>
              </div>
              <h3>500+ Bài thi</h3>
              <p>Kho bài thi đa dạng, cập nhật liên tục với nhiều chủ đề IT khác nhau</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="home__feature-card">
              <div class="home__feature-icon">
                <i class="bi bi-clock-history"></i>
              </div>
              <h3>Thi mọi lúc</h3>
              <p>Làm bài thi online 24/7, kết quả và đáp án chi tiết ngay sau khi hoàn thành</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="home__feature-card">
              <div class="home__feature-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <h3>Theo dõi tiến độ</h3>
              <p>Thống kê chi tiết kết quả học tập, đánh giá sự tiến bộ qua từng bài thi</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Subjects với hiệu ứng hover đẹp -->
    <section class="home__subjects">
      <div class="container">
        <h2 class="home__section-title">Chủ đề phổ biến</h2>
        <div class="row g-4">
          <div class="col-md-3" v-for="subject in popularSubjects" :key="subject.id">
            <div class="home__subject-card">
              <div class="home__subject-image-wrapper">
                <img :src="subject.image" :alt="subject.name" class="home__subject-image" />
                <div class="home__subject-overlay">
                  <router-link :to="'/quiz/' + subject.id" class="home__subject-button">
                    Làm bài thi ngay
                  </router-link>
                </div>
              </div>
              <div class="home__subject-content">
                <h4>{{ subject.name }}</h4>
                <p>{{ subject.description }}</p>
                <div class="home__subject-meta">
                  <span><i class="bi bi-clock"></i> 30 phút</span>
                  <span><i class="bi bi-question-circle"></i> 30 câu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section với animation số -->
    <section class="home__stats">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-3">
            <div class="home__stat-card">
              <div class="home__stat-icon">
                <i class="bi bi-people"></i>
              </div>
              <h3>10K+</h3>
              <p>Học viên</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="home__stat-card">
              <div class="home__stat-icon">
                <i class="bi bi-journal-check"></i>
              </div>
              <h3>500+</h3>
              <p>Bài thi</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="home__stat-card">
              <div class="home__stat-icon">
                <i class="bi bi-book"></i>
              </div>
              <h3>50+</h3>
              <p>Chủ đề</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="home__stat-card">
              <div class="home__stat-icon">
                <i class="bi bi-star"></i>
              </div>
              <h3>4.8</h3>
              <p>Đánh giá</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      popularSubjects: [
        {
          id: 'JAAV',
          name: 'Java Core',
          image: 'https://placehold.co/300x200/2fbdff/ffffff?text=Java',
          description: 'Kiểm tra kiến thức nền tảng về Java Core',
        },
        {
          id: 'JSPR',
          name: 'JavaScript',
          image: 'https://placehold.co/300x200/ffd700/ffffff?text=JavaScript',
          description: 'Bài thi về JavaScript và ES6+',
        },
        {
          id: 'PHPP',
          name: 'PHP',
          image: 'https://placehold.co/300x200/8892bf/ffffff?text=PHP',
          description: 'Trắc nghiệm PHP từ cơ bản đến nâng cao',
        },
        {
          id: 'DBBS',
          name: 'Database',
          image: 'https://placehold.co/300x200/ff6b6b/ffffff?text=Database',
          description: 'Kiến thức về SQL và quản trị cơ sở dữ liệu',
        },
      ],
    }
  },
}
</script>

<style scoped>
.home__hero {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
}

.home__title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(45deg, var(--orange-dark), #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home__title-highlight {
  color: var(--orange-dark);
  position: relative;
  display: inline-block;
}

.home__subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.home__hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.home__hero-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #495057;
}

.home__hero-stat i {
  color: var(--orange-dark);
}

.home__hero-image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.home__hero-image {
  width: 100%;
  height: auto;
  transform: scale(1.05);
  transition: transform 0.5s ease;
}

.home__hero-image-wrapper:hover .home__hero-image {
  transform: scale(1.1);
}

.home__hero-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.home__hero-badge span {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--orange-dark);
}

.home__hero-badge small {
  color: #6c757d;
}

.home__cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(45deg, var(--orange-dark), #ff6b6b);
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(253, 118, 8, 0.3);
}

.home__cta-button:hover {
  box-shadow: 0 6px 20px rgba(253, 118, 8, 0.4);
}

.home__features {
  padding: 100px 0;
  background: white;
}

.home__feature-card {
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: transform 0.3s ease;
}

.home__feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--orange-light);
}

.home__feature-icon i {
  font-size: 2.5rem;
  color: var(--orange-dark);
}

.home__feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3436;
}

.home__feature-card p {
  color: #636e72;
  line-height: 1.6;
}

.home__section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  color: #2d3436;
}

.home__subject-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: all 0.3s ease;
}

.home__subject-image-wrapper {
  position: relative;
  overflow: hidden;
}

.home__subject-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.home__subject-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.home__subject-card:hover .home__subject-overlay {
  opacity: 1;
}

.home__subject-card:hover .home__subject-image {
  transform: scale(1.1);
}

.home__subject-content {
  padding: 1.5rem;
}

.home__subject-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3436;
}

.home__subject-content p {
  color: #636e72;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  min-height: 60px;
}

.home__subject-meta {
  display: flex;
  justify-content: space-between;
  color: #b2bec3;
  font-size: 0.9rem;
}

.home__subject-meta i {
  margin-right: 0.3rem;
}

.home__subject-button {
  padding: 0.8rem 1.5rem;
  background: var(--orange-dark);
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.home__subject-button:hover {
  background: white;
  color: var(--orange-dark);
}

.home__stats {
  padding: 80px 0;
  background: #f8f9fa;
}

.home__stat-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.home__stat-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--orange-light);
}

.home__stat-icon i {
  font-size: 1.8rem;
  color: var(--orange-dark);
}

.home__stat-card h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--orange-dark);
  margin-bottom: 0.5rem;
}

.home__stat-card p {
  font-size: 1.1rem;
  color: #636e72;
  margin: 0;
}

@media (max-width: 768px) {
  .home__title {
    font-size: 2.5rem;
  }

  .home__hero {
    padding: 60px 0;
    text-align: center;
  }

  .home__hero-stats {
    justify-content: center;
  }

  .home__hero-image-wrapper {
    margin-top: 2rem;
  }

  .home__section-title {
    font-size: 2rem;
  }

  .home__feature-card,
  .home__subject-card,
  .home__stat-card {
    margin-bottom: 1rem;
  }
}
</style>

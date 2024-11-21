<template>
  <div class="home padding-top">
    <!-- Hero Section -->
    <section class="hero py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Học tập trực tuyến cùng Sunao Education</h1>
            <p class="lead mb-4">Nền tảng học tập trực tuyến với hơn 50,000 học viên tin dùng</p>
            <button class="btn btn-light btn-lg">Bắt đầu học ngay</button>
          </div>
          <div class="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
              alt="Hero"
              class="img-fluid rounded-4 shadow-lg hero__image"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 mb-4">
            <div class="stats__card p-4 rounded-4 shadow-sm">
              <div class="h1 fw-bold text-primary mb-2">50K+</div>
              <div class="text-muted">Học viên</div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="stats__card p-4 rounded-4 shadow-sm">
              <div class="h1 fw-bold text-primary mb-2">100+</div>
              <div class="text-muted">Khóa học</div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="stats__card p-4 rounded-4 shadow-sm">
              <div class="h1 fw-bold text-primary mb-2">200+</div>
              <div class="text-muted">Bài giảng</div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="stats__card p-4 rounded-4 shadow-sm">
              <div class="h1 fw-bold text-primary mb-2">98%</div>
              <div class="text-muted">Đánh giá tích cực</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="courses py-5 bg-light">
      <div class="container">
        <h2 class="text-center fw-bold mb-2">Khóa học nổi bật</h2>
        <p class="text-center text-muted mb-5">
          Khám phá các khóa học chất lượng cao từ các chuyên gia
        </p>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 course-card">
              <div class="card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500"
                  class="card-img-top"
                  alt="Java"
                />
                <div class="card-overlay">
                  <button class="btn btn-light">Xem chi tiết</button>
                </div>
              </div>
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <span class="badge bg-primary me-2">Bestseller</span>
                  <span class="text-muted small">4.8 ⭐ (2.5k reviews)</span>
                </div>
                <h5 class="card-title fw-bold">Lập trình Java cơ bản</h5>
                <p class="card-text text-muted">
                  Học lập trình Java từ cơ bản đến nâng cao với 100+ bài tập thực hành.
                </p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="fw-bold text-primary">1,299,000₫</span>
                  <button class="btn btn-primary">Đăng ký ngay</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 course-card">
              <div class="card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500"
                  class="card-img-top"
                  alt="JavaScript"
                />
                <div class="card-overlay">
                  <button class="btn btn-light">Xem chi tiết</button>
                </div>
              </div>
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <span class="badge bg-primary me-2">Bestseller</span>
                  <span class="text-muted small">4.8 ⭐ (2.5k reviews)</span>
                </div>
                <h5 class="card-title fw-bold">JavaScript & ReactJS</h5>
                <p class="card-text text-muted">
                  Làm chủ JavaScript và xây dựng ứng dụng web với ReactJS.
                </p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="fw-bold text-primary">1,299,000₫</span>
                  <button class="btn btn-primary">Đăng ký ngay</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 course-card">
              <div class="card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500"
                  class="card-img-top"
                  alt="Python"
                />
                <div class="card-overlay">
                  <button class="btn btn-light">Xem chi tiết</button>
                </div>
              </div>
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <span class="badge bg-primary me-2">Bestseller</span>
                  <span class="text-muted small">4.8 ⭐ (2.5k reviews)</span>
                </div>
                <h5 class="card-title fw-bold">Python cho AI</h5>
                <p class="card-text text-muted">
                  Học Python và ứng dụng trong AI, Machine Learning.
                </p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="fw-bold text-primary">1,299,000₫</span>
                  <button class="btn btn-primary">Đăng ký ngay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-2">Tại sao chọn Sunao Education?</h2>
        <p class="text-center text-muted mb-5">
          Những lý do khiến hơn 50,000 học viên tin tưởng chúng tôi
        </p>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="benefit-card text-center p-4 rounded-4 shadow-sm">
              <div class="benefit-icon mb-3">
                <i class="bi bi-laptop"></i>
              </div>
              <h4 class="fw-bold mb-3">Học mọi lúc mọi nơi</h4>
              <p class="text-muted mb-0">Truy cập và học tập mọi lúc mọi nơi trên mọi thiết bị</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card text-center p-4 rounded-4 shadow-sm">
              <div class="benefit-icon mb-3">
                <i class="bi bi-people"></i>
              </div>
              <h4 class="fw-bold mb-3">Giảng viên chất lượng</h4>
              <p class="text-muted mb-0">
                Đội ngũ giảng viên giàu kinh nghiệm từ các doanh nghiệp lớn
              </p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card text-center p-4 rounded-4 shadow-sm">
              <div class="benefit-icon mb-3">
                <i class="bi bi-trophy"></i>
              </div>
              <h4 class="fw-bold mb-3">Chứng chỉ giá trị</h4>
              <p class="text-muted mb-0">Nhận chứng chỉ có giá trị sau khi hoàn thành khóa học</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">Sẵn sàng để bắt đầu hành trình học tập?</h2>
        <p class="lead mb-4">Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt</p>
        <button class="btn btn-light btn-lg px-5">Đăng ký ngay</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.hero {
  background: linear-gradient(45deg, #f73232, #fd7608);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  opacity: 0.1;
}

.hero__image {
  transform: perspective(1000px) rotateY(-15deg);
  transition: transform 0.5s;
}

.hero__image:hover {
  transform: perspective(1000px) rotateY(0);
}

.stats__card {
  background: white;
  transition: transform 0.3s;
}

.course-card {
  overflow: hidden;
}

.card-img-wrapper {
  position: relative;
  overflow: hidden;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s;
}

.card-overlay {
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
  transition: opacity 0.3s;
}

.course-card:hover .card-img-top {
  transform: scale(1.1);
}

.course-card:hover .card-overlay {
  opacity: 1;
}

.benefit-card {
  background: white;
  transition: all 0.3s;
}

.benefit-card:hover {
  background: linear-gradient(45deg, #f73232, #fd7608);
  color: white !important;
}

.benefit-card:hover p {
  color: white !important;
}

.benefit-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #f73232, #fd7608);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: white;
  font-size: 2rem;
  transition: all 0.3s;
}

.benefit-card:hover .benefit-icon {
  background: white;
  color: #f73232;
}

.btn-primary {
  background: linear-gradient(to right, #f73232 0%, #fd7608 50%, #f73232 100%);
  background-size: 200% auto;
  border: none;
  transition: all 0.5s ease;
}

.btn-primary:hover {
  background-position: right center;
}

.cta {
  background: linear-gradient(45deg, #f73232, #fd7608);
  color: white;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="0.1" d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,170.7C672,139,768,85,864,80C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  opacity: 0.1;
}

@media (max-width: 576px) {
  .hero__image {
    margin-top: 2rem;
  }

  .stats__card {
    margin-bottom: 1rem;
  }

  .course-card {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {
  .quiz-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>

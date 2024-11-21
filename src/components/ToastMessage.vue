<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      class="toast custom-toast"
      :class="{
        show: show,
        'toast--success': type === 'success',
        'toast--danger': type === 'danger',
        'toast--warning': type === 'warning',
        'toast--info': type === 'info',
      }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex align-items-center">
        <div class="toast-icon me-2">
          <i class="bi" :class="getIcon"></i>
        </div>
        <div class="toast-body flex-grow-1">{{ message }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="closeToast"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastMessage',
  data() {
    return {
      show: false,
      message: '',
      type: 'success',
      timeout: null,
    }
  },
  computed: {
    getIcon() {
      const icons = {
        success: 'bi-check-circle-fill',
        danger: 'bi-x-circle-fill',
        warning: 'bi-exclamation-circle-fill',
        info: 'bi-info-circle-fill',
      }
      return icons[this.type]
    },
  },
  methods: {
    showToast(message, type = 'success', duration = 3000) {
      this.message = message
      this.type = type
      this.show = true

      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
        this.closeToast()
      }, duration)
    },
    closeToast() {
      this.show = false
    },
  },
  beforeUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
}
</script>

<style scoped>
.toast-container {
  z-index: 9999;
}

.custom-toast {
  min-width: 300px;
  transition: all 0.3s ease;
  opacity: 0;
  border: none;
}

.custom-toast.show {
  opacity: 1;
}

.toast--success {
  background: linear-gradient(to right, #28a745, #20c997);
  color: white;
}

.toast--danger {
  background: linear-gradient(to right, #dc3545, #ff4444);
  color: white;
}

.toast--warning {
  background: linear-gradient(to right, #ffc107, #ff9800);
  color: white;
}

.toast--info {
  background: linear-gradient(to right, #17a2b8, #0dcaf0);
  color: white;
}

.toast-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

.toast-body {
  padding: 1rem 0;
  font-weight: 500;
}

.btn-close {
  opacity: 0.8;
}

.btn-close:hover {
  opacity: 1;
}

@media (max-width: 576px) {
  .toast-container {
    padding: 0.5rem;
  }

  .custom-toast {
    min-width: auto;
    width: calc(100vw - 2rem);
  }
}
</style>

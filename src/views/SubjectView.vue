<template>
  <div class="subject">
    <div class="subject__banner">
      <img src="/public/banner.png" alt="banner" />
    </div>
    <div class="subject__list">
      <div class="subject__card" v-for="subject in subjects" :key="subject.Id">
        <img :src="getLogoUrl(subject.Id)" :alt="subject.Name" class="subject__image" />
        <div class="subject__content">
          <h5 class="subject__title">{{ subject.Name }}</h5>
          <div class="subject__block">
            <p class="subject__id">{{ subject.Id }}</p>
            <router-link :to="`/quiz/${subject.Id}`" class="subject__button">
              Bắt đầu thi
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subjects from '@/api/Subjects.js'

export default {
  data() {
    return {
      subjects: subjects,
    }
  },
  methods: {
    getLogoUrl(subjectId) {
      return new URL(`../api/logos/${subjectId}.png`, import.meta.url).href
    },
  },
}
</script>

<style scoped></style>

<template lang="pug">
v-card.article-card 
  v-img(:src='article.image')
  v-card-title
    router-link(:to="'/article/' + article._id" ) {{ article.title }}
  v-card-subtitle(style="white-space: pre;") {{ article.content }}
  v-card-actions
    v-btn(v-if="article.category === '講座資訊'" color='primary' @click='addLecture({ lecture:article._id })') 我要報名
</template>

<script setup>
import { useStudentStore } from '@/stores/students.js';
const student = useStudentStore()
const { addLecture } = student
// 自己設定哪些東西傳進來
const props = defineProps(['article'])


</script>
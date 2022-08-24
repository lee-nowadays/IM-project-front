<template lang="pug">
v-app
  router-view
</template>


<script setup>
import { useStudentStore } from '@/stores/student'
useStudentStore().getStudent()
</script>

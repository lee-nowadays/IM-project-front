<template lang="pug">
v-app
  router-view
</template>

<script setup>
import { useStudentStore } from '@/stores/student'
useStudentStore().getStudent()
</script>
<style>
.v-dialog .v-overlay__content > .contactCard{
  width: 300px;
  height: 500px;
}
.v-dialog .v-overlay__content > .teacherCard{
  width: 350px;
  height: 500px;
  margin: auto;
}
@media (min-width:576px){
  .v-dialog .v-overlay__content > .contactCard{
    width: 400px;
    height: 600px;
  }
  .v-dialog .v-overlay__content > .teacherCard{
    width: 600px;
    height: 600px;
  }
}
@media (min-width:992px){
  .v-dialog .v-overlay__content > .contactCard{
    width: 500px;
    height: 700px;
  }
  .v-dialog .v-overlay__content > .teacherCard{
    width: 700px;
    height: 700px;
  }
}
@media (min-width:1200px){
  .v-dialog .v-overlay__content > .contactCard{
    width: 600px;
    height: 800px;
  }
  .v-dialog .v-overlay__content > .teacherCard{
    width: 800px;
    height: 800px;
  }
}
</style>
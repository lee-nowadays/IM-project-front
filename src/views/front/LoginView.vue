<template lang="pug">
#login.mt-5.pt-5
  .container
    .row
      .col-12
        h1.text-center.pb-3 登入
      .col-12
        v-form(v-model='valid' @submit.prevent='login' style="width: 500px;").mx-auto
          .col-12.mx-auto
            v-text-field(type='text' label='學號' v-model="form.studentId" :rules='rules.studentId' counter="8" maxlength="8"  variant="outlined")
          .col-12.mx-auto
            v-text-field(type='password' label='密碼' v-model="form.password" :rules='rules.password' counter="20" maxlength="20"  variant="outlined" autocomplete="on")
          .col-12.mx-auto
            v-btn.mx-auto(color='success' type='submit' :loading='loading') 登入
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useStudentStore } from '@/stores/student'

const student = useStudentStore()
const valid = ref(false)
const loading = ref(false)

const form = reactive({
  studentId: '',
  password: ''
})
// 用欄位分類
const rules = reactive({
  studentId: [
    v => !!v || '學號必填',
    v => /^[0-9]+$/.test(v) || '學號只有數字',
    v => (v.length >= 8 && v.length <= 8) || '學號為8位數'
  ],
  password: [
    v => !!v || '密碼必填',
    v => /^[a-zA-z0-9]+$/.test(v) || '密碼由英數字組成',
    v => (v.length >= 8 && v.length <= 20) || '密碼長度 8 到 20 個字'
  ]
})

const login = () => {
  student.login(form)
}
</script>
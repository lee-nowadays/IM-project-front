<template lang="pug">
#contact.mt-5.pt-5
  .container
    .row
      h1.text-center 聯絡我們
    .row
      v-card
        .col-12
          v-form( v-model='form.valid' @submit.prevent='submitForm' ref='aaa')
            .col-12.col-md-6
              v-text-field(v-model='form.studentId' label='學號'  counter='8' maxlength='8' variant="outlined")
            .col-12.col-md-6
              v-select(v-model='form.question' :items='items' label='問題類型'  variant="outlined")
            .col-12 
              v-text-field(v-model='form.subject' label='主旨'  variant="outlined")
            .col-12 
              v-textarea(v-model='form.description' label='問題描述'  variant="outlined")
            .col-12
              v-spacer
              v-btn(type='submit' color='blue darken-4' :loading='form.submitting' ).ms-auto.text-white 送出
      .col-12
        h1.text-center 系所位置
      .col-12
        v-img(src='https://im100.chihlee.edu.tw/var/file/37/1037/img/3/101012048.jpg ')
</template>
<style>

.col-12{
  padding: 12px;
}
.v-card{
  width: 100%;
}
.v-form{
  width: 100%;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
}
</style>

<script setup>
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'

const items = reactive(['教師問題', '系所問題', '學校問題', '畢業問題'])

const aaa = ref(null)

const form = reactive({
  subject:'',
  description:'',
  studentId:'',
  question:'',
  valid : false,
  submitting : false,
})


const submitForm = async () => {
  if (!form.valid) return
  form.submitting = true
  try {
    
    Swal.fire({
      icon: 'success',
      title: '成功',
      text: '送出成功'
    })
    
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
  form.submitting = false 
  aaa.value.reset()
}
</script>
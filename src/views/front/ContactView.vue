<template lang="pug">
#contact.mt-5.pt-5
  .container
    .row
      .col-12
        h1.text-center 系所位置
      .col-12
        v-img(src='https://im100.chihlee.edu.tw/var/file/37/1037/img/3/101012048.jpg ')
    .row
      h1.text-center 聯絡我們
      v-card
        .col-12
          v-form(v-model='form.valid' @submit.prevent='submitForm' ref='aaa')
            .col-12.col-md-6
              v-text-field(v-model='form.subject' label='主旨'  variant="outlined" :rules='[rules.required]')
            .col-12.col-md-6
              v-select(v-model='form.question' :items='items' label='問題類型'  variant="outlined")
            .col-12 
              v-textarea(v-model='form.description' label='問題描述'  variant="outlined" :rules='[rules.required]')
            .col-12
              v-spacer
              v-btn(type='submit' color='blue darken-4' :loading='form.submitting' ).ms-auto.text-white 送出
      
</template>

<script setup>
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import { api } from '@/plugins/axios';

const items = reactive(['教師問題', '系所問題', '學校問題', '畢業問題'])

const aaa = ref(null)
const contacts = reactive([])
const form = reactive({
  question:'',
  subject:'',
  description:'',
  valid : false,
  submitting : false,
  idx:-1,
  _id:''
})

const rules = reactive({
  required(v) {
    return !!v || '必填'
  }
})

const submitForm = async () => {
  if (!form.valid) return
  form.submitting = true
  const contactfd = new FormData()
  for (const key in form) {
    if (['_id', 'idx', 'valid', 'submitting'].includes(key)) continue
    else {
      contactfd.append(key, form[key])
    }
  }
  try {
    const { data } = await api.post('/contacts',contactfd)
    contacts.push(data)
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
<template lang="pug">
#studentProfile.mt-5.pt-5
  .container
    .row
      .col-12
        h1.text-center 個人資料
    .row
      v-card
        .row.profile
          .col-12
            v-btn(color='blue darken-4' @click="openForm").edit 編輯
          .col-12(cols='12' v-if='form.open === true')
            v-form(v-model='form.valid' @submit.prevent='submitForm')
              .col-12.col-md-6 學號：{{ student.studentId }}
              .col-12.col-md-6 班級：{{ student.class }}
              .col-12.col-md-6 身份證字號：{{ student.personalId }}
              .col-12.col-md-6 姓名：{{ student.name }}
              .col-12.col-md-6
                v-text-field(type='email' v-model='form.email' label='信箱' :rules='rules.email'  variant="outlined")
              .col-12.col-md-6 
                v-text-field(v-model='form.phone' label='手機' :rules='rules.phone' counter = "10" maxlength = '10'  variant="outlined")
              .col-12.col-md-6 
                v-text-field(v-model='form.residenceAddress' label='戶籍地址：'  variant="outlined")
              .col-12.col-md-6 
                v-text-field(v-model='form.currentAddress' label='聯絡地址：'  variant="outlined")
              .col-12
                h1.text-center 密碼
              .col-12.col-md-6
                v-text-field(type='password' v-model='form.password' label='新密碼：' :rules='rules.password'  autocomplete="on" counter = "20" maxlength = '20'  variant="outlined")
              .col-12.col-md-6
                v-text-field(type='password' v-model='form.confirmpassword' label='確認新密碼：' :rules='rules.confirmpassword'  autocomplete="on" counter = "20" maxlength = '20'  variant="outlined")
              .col-12
                v-spacer
                v-btn(color='blue darken-4' @click='closeForm()' :disabled='form.submitting' variant="outlined").me-3 取消
                v-btn(:disabled='form.password !== form.confirmpassword' type='submit' color='blue darken-4' :loading='form.submitting').text-white 確定
          .col-12(cols='12' v-else)
            .row
              .col-12.col-md-6 學號：{{ student.studentId }}
              .col-12.col-md-6 班級：{{ student.class }}
              .col-12.col-md-6 身份證字號：{{ student.personalId }}
              .col-12.col-md-6 姓名：{{ student.name }}
              .col-12.col-md-6 信箱：{{ student.email }}
              .col-12.col-md-6 手機：{{ student.phone }}
              .col-12.col-md-6 戶籍地址：{{ student.residenceAddress }}
              .col-12.col-md-6 聯絡地址：{{ student.currentAddress }}

</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { apiAuth } from '@/plugins/axios'
import { isEmail } from 'validator'
import Swal from 'sweetalert2'


const route = useRoute()


const form = reactive({
  _id : '',
  studentId : '',
  email : '',
  name : '',
  class : '',
  residenceAddress : '',
  currentAddress : '',
  personalId : '',
  phone : '',
  valid : false,
  submitting : false,
  password : '',
  confirmpassword : '',
  open : false
})

const student = reactive({
  _id : '',
  studentId: '',
  email: '',
  password : '',
  name: '',
  class: '',
  residenceAddress: '',
  currentAddress: '',
  personalId: '',
  phone: '',
})

const openForm = () => {
  form.open = true
  if(form.open === true){
    form.email =  student.email 
    form.phone =  student.phone 
    form.residenceAddress =  student.residenceAddress 
    form.currentAddress =  student.currentAddress 
  }
  
  form.valid = false
  form.submitting = false
}
const closeForm = () => {
  form.open = false
}



const rules = reactive({
  phone:[
    v => /^[0][9][0-9]*$/.test(v) || '手機格式錯誤',
    v => (v.length >= 10 && v.length <= 10) || '手機長度為 10 位數'
  ],
  password: [
    v => (v.length >= 8 && v.length <= 20 || v === "")  || '密碼長度為 8 到 20 個字',
    v => (/[a-zA-z]+/.test(v) && /[0-9]+/.test(v) && /^[a-zA-Z0-9]+$/.test(v) || v === "") || '密碼只能由英數字組成'
  ],
  confirmpassword:[
    v => (v.length >= 8 && v.length <= 20 || v === "")  || '密碼長度為 8 到 20 個字',
    v => v === form.password || '密碼不一樣'
  ],
  email: [
    v => !!v || '信箱必填',
    v => isEmail(v) || '信箱格式錯誤'
  ]
})

const submitForm = async () => {
  if (!form.valid) return
  form.submitting = true
  const studentfd = new FormData()

  for (const key in form) {
    if (['_id','confirmpassword', 'valid', 'submitting', 'open'].includes(key)) continue
    else if(form[key] === ''){
      continue
    }else{
      studentfd.append(key, form[key])
    }
  }
  try {
    const { data } = await apiAuth.patch('/students/me' , studentfd)
    student.email = data.student.email
    student.phone = data.student.phone
    student.residenceAddress = data.student.residenceAddress
    student.currentAddress = data.student.currentAddress
    student.password = data.student.password
    
    Swal.fire({
      icon: 'success',
      title: '成功',
      text: '更新成功'
    })
    
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
  form.password = ''
  form.confirmpassword = ''
  form.submitting = false 
  form.open = false
}

const init = async () => {
  try {
    const { data } = await apiAuth.get('/students/'+ route.params.id)
    student._id = data.student._id
    student.studentId = data.student.studentId
    student.email = data.student.email
    student.name = data.student.name
    student.class = data.student.class
    student.residenceAddress = data.student.residenceAddress
    student.currentAddress = data.student.currentAddress
    student.personalId = data.student.personalId
    student.phone = data.student.phone
    student.password = data.student.password
    } catch (error) {
    console.log(error)
    Swal.fire({
      icon:'error',
      title:'失敗',
      text:'取得學生資料失敗'
    })
  }
}
init()
</script>
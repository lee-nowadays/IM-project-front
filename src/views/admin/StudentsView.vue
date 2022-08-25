<template lang="pug">
.container.mt-5
  #students
    .row
      .col-12
        h1.text-center 學生管理
      v-divider
      .col-12
        v-btn(color='blue darken-4' @click="openDialog('', -1)").text-white 新增學生
      .col-12
        v-table
          thead
            tr
              th 學號
              th 班級
              th 姓名
              th 電話
              th(colspan="2") 管理
          tbody
            tr(v-if='sliceStudents.length > 0' v-for='(student, idx) in sliceStudents' :key='student._id')
              td {{ student.studentId }}
              td {{ student.class }}
              td {{ student.name }}
              td {{ student.phone }}
              td 
                v-btn(v-if='currentPage === 1' color='blue darken-4' @click='openDialog(student._id,idx)' variant="outlined") 編輯
                v-btn(v-else color='blue darken-4' @click='openDialog(student._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 編輯
              td
                v-btn(v-if='currentPage === 1' color='error' @click='del(student._id,idx)' variant="outlined") 刪除
                v-btn(v-else color='error' @click='del(student._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 刪除
            tr(v-else)
              td.text-center(colspan="5") 沒有學生             
    v-dialog(v-model='form.dialog' scrollable)
      v-form(v-model='form.valid' @submit.prevent='submitForm' style="height:900px ; width: 100%;")
        v-card
          v-card-title
            .text-h5 {{form._id.length > 0 ? '編輯學生' : '新增學生' }}
          v-card-text
            .container
              .row
                .col-12
                  v-text-field(v-model='form.studentId' label='學號' :rules='[rules.required]'  variant="outlined"  counter="8" maxlength="8")
                .col-12
                  v-text-field(v-model='form.personalId' label='身份證字號' :rules='[rules.required]'  variant="outlined" counter="10" maxlength="10")
                .col-12
                  v-text-field(v-model='form.name' label='姓名' :rules='[rules.required]'  variant="outlined")
                .col-12.col-md-6
                  v-text-field( v-model='form.class' label='班級' :rules='[rules.required]'  variant="outlined")
                .col-12.col-md-6
                  v-text-field(v-model='form.phone' label='手機' :rules='[rules.required]'  variant="outlined"  counter="10" maxlength="10")
                .col-12.col-md-6
                  v-text-field(v-model='form.residenceAddress' label='戶籍地址' :rules='[rules.required]'  variant="outlined")
                .col-12.col-md-6
                  v-text-field(v-model='form.currentAddress' label='聯絡地址' :rules='[rules.required]'  variant="outlined")
                .col-12
                  v-text-field(v-model='form.email' label='信箱' :rules='[rules.required]'  variant="outlined")
          v-card-actions
            v-spacer
            v-btn(color='error' @click='form.dialog = false' :disabled='form.submitting') 取消
            v-btn(type='submit' color='blue darken-4' :loading='form.submitting') 確定
    v-pagination(
      v-model='currentPage'
      :length="Math.ceil(students.length / pageSize) " 
      rounded="circle" 
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left" 
    )
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios'

const students = reactive([])

const pageSize = 10
const currentPage = ref(1)

const sliceStudents = computed (()=>{
  return students.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize))
})

const form = reactive({
  _id: '',
  studentId: '',
  name: '',
  class: '',
  phone: '',
  residenceAddress:'',
  currentAddress:'',
  personalId:'',
  email:'',
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
})
// 用規則分類
const rules = reactive({
  studentId(v){
    !!v || '學號必填',
    /^[0-9]+$/.test(v) || '學號只有數字',
    (v.length >= 8 && v.length <= 8) || '學號為8位數'
  },
  required(v) {
    return !!v || '必填'
  }
})

const openDialog = (_id, idx) => { 
  form._id = _id
  if (idx > -1) {
    form.studentId = students[idx].studentId
    form.name = students[idx].name
    form.class = students[idx].class
    form.phone = students[idx].phone
    form.residenceAddress = students[idx].residenceAddress
    form.currentAddress = students[idx].currentAddress
    form.personalId = students[idx].personalId
    form.email = students[idx].email
  } else {
    form.studentId = ''
    form.name = ''
    form.class = ''
    form.phone = ''
    form.residenceAddress = ''
    form.currentAddress = ''
    form.personalId = ''
    form.email = ''
  }
  form.idx = idx
  form.dialog = true
  form.valid = false
  form.submitting = false
}
const del = async (_id,idx) => {
  await apiAuth.delete('/students/'+ _id)
  students.splice(idx, 1)
}
const submitForm = async () => {
  if (!form.valid) return
  form.submitting = true
  const studentfd = new FormData()

  // FormData 要放資料進去要用 append 第一個放 key，第二個放 data，可以一行一行寫，或者寫一個 for 迴圈，把不要進去的寫出來
  // studentfd.append('title', form.title)
  for (const key in form) {
    if (['_id', 'idx', 'dialog', 'valid', 'submitting'].includes(key)) continue
    else {
      studentfd.append(key, form[key])
      
    }
  }
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/students', studentfd)
      students.push(data.student)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/students/' + form._id, studentfd)

      students[form.idx] = data.student
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
    }
    form.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
  form.submitting = false
}

const init = async () => {
  try {
    const { data } = await apiAuth.get('/students/all')
    students.push(...data.student)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
init()
</script>
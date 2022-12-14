<template lang="pug">
.container.mt-5
  #adminTeachers
    .row
      .col-12
        h1.text-center 老師管理
      v-divider
      .col-12
        v-btn(color='blue darken-4' @click="openDialog('', -1)").text-white 新增老師
      .col-12
        v-table
          thead
            tr
              th 姓名
              th 圖片
              th 研究室
              th 電話
              th(colspan="2") 管理
          tbody
            tr(v-if='sliceTeachers.length > 0' v-for='(teacher, idx) in sliceTeachers' :key='teacher._id')
              td {{ teacher.name }}
              td 
                v-img(:src='teacher.image')
              td {{ teacher.lab }}
              td {{ teacher.telephone }}
              td 
                v-btn(v-if='currentPage === 1' color='blue darken-4' @click='openDialog(teacher._id,idx)' variant="outlined") 編輯
                v-btn(v-else color='blue darken-4' @click='openDialog(teacher._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 編輯
              td
                v-btn(v-if='currentPage === 1' color='error' @click='del(teacher._id,idx)' variant="outlined") 刪除
                v-btn(v-else color='error' @click='del(teacher._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 刪除
            tr(v-else)
              td.text-center(colspan="5") 沒有老師             
    v-dialog(v-model='form.dialog' scrollable)
      v-form(v-model='form.valid' @submit.prevent='submitForm' style="height:900px ; width: 100%;")
        v-card.adminForm
          v-card-title
            .text-h5 {{form._id.length > 0 ? '編輯老師' : '新增老師' }}
          v-card-text
            .container
              .row
                .col-12.col-md-4
                  v-text-field(v-model='form.name' label='老師姓名' :rules='[rules.required]'  variant="outlined")
                .col-12.col-md-4
                  v-file-input(v-model='form.image' show-size accept='image/*' label='圖片' :prepend-icon="''"  :rules='[rules.size]'  variant="outlined")
                .col-12.col-md-4
                  v-text-field(v-model='form.lab' label='研究室'  variant="outlined")
                .col-12.col-md-4
                  v-text-field(v-model='form.telephone' label='電話'  variant="outlined")
                .col-12.col-md-4
                  v-text-field(v-model='form.fax' label='傳真'  variant="outlined")
                .col-12.col-md-4
                  v-text-field(v-model='form.email' label='信箱' :rules='emailrules.email'  variant="outlined")
                .col-12
                  v-textarea( v-model='form.experience' label='經歷'  variant="outlined")
                .col-12
                  v-textarea(v-model='form.proInterest' label='專業興趣'  variant="outlined")
                .col-12
                  v-textarea(v-model='form.course' label='課程'  variant="outlined")
          v-card-actions
            v-spacer
            v-btn(color='error' @click='form.dialog = false' :disabled='form.submitting') 取消
            v-btn(type='submit' color='blue darken-4' :loading='form.submitting') 確定
    v-pagination(
      v-model='currentPage'
      :length="Math.ceil(teachers.length / pageSize) " 
      rounded="circle" 
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left" 
    )
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios'
import isEmail from 'validator/lib/isEmail'


const teachers = reactive([])

const pageSize = 10
const currentPage = ref(1)

const sliceTeachers = computed (()=>{
  return teachers.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize))
})

const form = reactive({
  _id: '',
  name: '',
  proInterest: '',
  experience:'',
  course:'',
  lab:'',
  telephone:'',
  fax:'',
  email:'',
  image: [],
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
})
// 用規則分類
const rules = reactive({
  required(v) {
    return !!v || '必填'
  },
  size(v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size < 1024 * 1024) || '檔案格式不符'
  },
})
const emailrules = reactive ({
  email: [
    v => !!v || '信箱必填',
    v => isEmail(v) || '信箱格式錯誤'
  ]
})

const openDialog = (_id, idx) => { 
  form._id = _id
  if (idx > -1) {
    form.name = teachers[idx].name
    form.proInterest = teachers[idx].proInterest
    form.experience = teachers[idx].experience
    form.course = teachers[idx].course
    form.lab = teachers[idx].lab
    form.email = teachers[idx].email
    form.telephone = teachers[idx].telephone
    form.fax = teachers[idx].fax
  } else {
    form.name = ''
    form.proInterest = ''
    form.experience = ''
    form.course = ''
    form.email = ''
    form.lab = ''
    form.telephone = ''
    form.fax = ''
  }
  form.image = []
  form.idx = idx
  form.dialog = true
  form.valid = false
  form.submitting = false
}

const del = async (_id,idx) => {
  await apiAuth.delete('/teachers/'+ _id)
  teachers.splice(idx, 1)
}
const submitForm = async () => {
  if (!form.valid) return
  form.submitting = true
  const teacherfd = new FormData()

  // FormData 要放資料進去要用 append 第一個放 key，第二個放 data，可以一行一行寫，或者寫一個 for 迴圈，把不要進去的寫出來
  // teacherfd.append('title', form.title)
  for (const key in form) {
    if (['_id', 'idx', 'dialog', 'valid', 'submitting'].includes(key)) continue
    else if (key === 'image') {
      teacherfd.append(key, form[key][0])
    }
    else {
      teacherfd.append(key, form[key])
      
    }
  }
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/teachers', teacherfd)
      const result = (data.teacher.image = import.meta.env.VITE_API + "/files/" + data.teacher.image , data)
      teachers.push(result.teacher)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/teachers/' + form._id, teacherfd)
      const result = (data.teacher.image = import.meta.env.VITE_API + "/files/" + data.teacher.image , data)
      teachers[form.idx] = result.teacher
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
    const { data } = await apiAuth.get('/teachers/all')
    data.teacher.map(a => {
      const result = (a.image = import.meta.env.VITE_API + "/files/" + a.image, a )
      teachers.push(result)
    })
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
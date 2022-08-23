<template lang="pug">
.container.mt-5
  #teachers
    v-row
      v-col(cols='12')
        h1.text-center 老師管理
      v-divider
      v-col(cols='12')
        v-btn(color='success' @click="openDialog('', -1)") 新增老師
      v-col(cols='12')
        v-table
          thead
            tr
              th 姓名
              th 圖片
              th 研究室
              th 電話
              th(colspan="2") 管理
          tbody
            tr(v-if='teachers.length > 0' v-for='(teacher, idx) in teachers' :key='teacher._id')
              td {{ teacher.name }}
              td 
                v-img(:src='teacher.image')
              td {{ teacher.lab }}
              td {{ teacher.telephone }}
              td 
                v-btn(color='blue darken-4' @click='openDialog(teacher._id, idx)' variant="outlined") 編輯
              td
                v-btn(color='error' @click='del(teacher._id,idx)' variant="outlined") 刪除
            tr(v-else)
              td.text-center(colspan="5") 沒有老師             
    v-dialog(v-model='form.dialog' scrollable)
      v-form(v-model='form.valid' @submit.prevent='submitForm' style="height:900px ; width: 100%;")
        v-card
          v-card-title
            .text-h5 {{form._id.length > 0 ? '編輯老師' : '新增老師' }}
          v-card-text
            v-container
              v-row
                v-col(cols='12' md='4')
                  v-text-field(v-model='form.name' label='老師姓名' :rules='[rules.required]'  variant="outlined")
                v-col(cols='12' md='4')
                  v-file-input(v-model='form.image' show-size accept='image/*' label='圖片' :prepend-icon="''"  :rules='[rules.size]'  variant="outlined")
                v-col(cols='12' md='4')
                  v-text-field(v-model='form.lab' label='研究室'  variant="outlined")
                v-col(cols='12' md='4')
                  v-text-field(v-model='form.telephone' label='電話'  variant="outlined")
                v-col(cols='12' md='4')
                  v-text-field(v-model='form.fax' label='傳真'  variant="outlined")
                v-col(cols='12' md='4')
                  v-text-field(v-model='form.email' label='信箱' :rules='[rules.required]'  variant="outlined")
                v-col(cols='12')
                  v-textarea( v-model='form.experience' label='經歷'  variant="outlined")
                v-col(cols='12')
                  v-textarea(v-model='form.proInterest' label='專業興趣'  variant="outlined")
                v-col(cols='12')
                  v-textarea(v-model='form.course' label='課程'  variant="outlined")
          v-card-actions
            v-spacer
            v-btn(color='error' @click='form.dialog = false' :disabled='form.submitting') 取消
            v-btn(type='submit' color='primary' :loading='form.submitting') 確定
</template>
<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios'

const teachers = reactive([])

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
  }
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
      teachers.push(data.teacher)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/teachers/' + form._id, teacherfd)

      teachers[form.idx] = data.teacher
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
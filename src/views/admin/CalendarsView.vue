<template lang="pug">
.container.mt-5
  #calendars
    .col-12
      h1.text-center 行事曆管理
    v-divider
    FullCalendar(:options="calendarOptions") 
  .row.mt-5
    v-divider
    .col-12
      v-table
        thead
          tr
            th 標題
            th 開始日期
            th 結束日期
            th(colspan="2") 管理
        tbody
          tr(v-if='sliceCalendars.length > 0' v-for='(calendar, idx) in sliceCalendars' :key='calendar._id')
            td {{ calendar.title }}
            td {{ new Date(calendar.startDate).toLocaleDateString() }}
            td {{ new Date(calendar.endDate).toLocaleDateString() }}
            td 
              v-btn(v-if='currentPage === 1' color='blue darken-4' @click='openDialog(calendar._id,idx)' variant="outlined") 編輯
              v-btn(v-else color='blue darken-4' @click='openDialog(calendar._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 編輯
            td
              v-btn(v-if='currentPage === 1' color='error' @click='del(calendar._id,idx)' variant="outlined") 刪除
              v-btn(v-else color='error' @click='del(calendar._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 刪除
          tr(v-else)
            td.text-center(colspan="5") 
              h3.mt-3 沒有行事曆             
  v-dialog(v-model='form.dialog' scrollable)
    v-form(v-model='form.valid' @submit.prevent='submitForm' style="height:900px ; width: 500px;")
      v-card.adminForm
        v-card-title
          .text-h5 {{form._id.length > 0 ? '編輯行事曆' : '新增行事曆' }}
        v-card-text
          .container
            .row
              .col-12
                v-text-field(v-model='form.title' label='標題' :rules='[rules.required]'  variant="outlined")
        v-card-actions
          v-spacer
          v-btn(color='error' @click='form.dialog = false' :disabled='form.submitting') 取消
          v-btn(type='submit' color='blue darken-4' :loading='form.submitting') 確定
  v-dialog(v-model="dialog").display-flex.justify-content-center
      v-card
        v-card-text {{ text }}
  v-pagination(
    v-model='currentPage'
    :length="Math.ceil(calendars.length / pageSize) " 
    rounded="circle" 
    next-icon="mdi-menu-right"
    prev-icon="mdi-menu-left" 
  )
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios'
import '@fullcalendar/core/vdom' 
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhlocale from '@fullcalendar/core/locales/zh-tw'



const calendars = reactive([])

const pageSize = 10
const currentPage = ref(1)

const sliceCalendars = computed (()=>{
  return calendars.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize))
})

const dialog = ref(false)
const text = ref('')
const showInfo = ({ event }) =>{
  dialog.value = true
  text.value = event._def.title
}

const selectmultiple= async (selectionInfo) =>{
  let title = prompt('請輸入標題')
  if(title === ''){
    return
  }else if(title === null){
    return
  }else{
    const { data } = await apiAuth.post('/calendars', {startDate : selectionInfo.startStr ,endDate:selectionInfo.endStr, title })
    calendarOptions.events.push({
      id: data.calendar._id,
      title: data.calendar.title,
      start: new Date(data.calendar.startDate),
      end: new Date(data.calendar.endDate),
      allDay: true
    })
  }
}

const calendarOptions = reactive({
  plugins: [ dayGridPlugin, interactionPlugin],
  select:selectmultiple,
  eventClick:showInfo,
  initialView: 'dayGridMonth',
  locale:zhlocale,
  selectable: true,
  selectOverlap: true,
  events:[],
})

const form = reactive({
  _id: '',
  title:'',
  date:'',
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
})
// 用規則分類
const rules = reactive({
  required(v) {
    return !!v || '必填'
  }
})
const del = async (_id,idx) => {
  await apiAuth.delete('/calendars/'+ _id)
  calendars.splice(idx, 1)
  calendarOptions.events.splice(idx, 1)
}
const openDialog = (_id, idx) => { 
  form._id = _id
  if (idx > -1) {
    form.title = calendars[idx].title
    form.date = calendars[idx].date
  } else {
    form.title = ''
    form.date = ''
  }
  form.idx = idx
  form.dialog = true
  form.valid = false
  form.submitting = false
}

const submitForm = async () => {
  if (!form.valid) return
  form.submitting = true
  const calendarfd = new FormData()

  // FormData 要放資料進去要用 append 第一個放 key，第二個放 data，可以一行一行寫，或者寫一個 for 迴圈，把不要進去的寫出來
  // calendarfd.append('title', form.title)
  for (const key in form) {
    if (['_id', 'idx', 'dialog', 'valid', 'submitting'].includes(key)) continue
    else {
      calendarfd.append(key, form[key])
    }
  }
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/calendars', calendarfd)
      calendars.push(data.calendar)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/calendars/' + form._id, calendarfd)
      calendars[form.idx] = data.calendar
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
    const { data } = await apiAuth.get('/calendars/all')
    calendars.push(...data.calendar)
    calendarOptions.events.push(...data.calendar.map(a => {
      return {
        id: a._id,
        title: a.title,
        start: new Date(a.startDate),
        end: new Date(a.endDate),
        allDay: true
      }
    }))
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
<template lang="pug">
#calendar.mt-5.pt-5
  .container
    .row
      .col-12
        h1.text-center.pb-3 行事曆
    FullCalendar(:options="calendarOptions")
    v-dialog(v-model="dialog").display-flex.justify-content-center
      v-card
        v-card-text {{ text }}
</template>

<style>

</style>

<script setup>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhlocale from '@fullcalendar/core/locales/zh-tw'
import Swal from 'sweetalert2'
import { api } from '@/plugins/axios'
import { reactive,ref } from 'vue'

const dialog = ref(false)

const text = ref('')

const showInfo = ({ event }) =>{
  dialog.value = true
  text.value = event._def.title
}

const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  locale: zhlocale,
  eventClick:showInfo,
  selectable: true,
  selectOverlap: true,
  events: [],
})


const init = async () => {
  try {
    const { data } = await api.get('/calendars')
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
      text: '伺服器錯誤'
    })
  }
}
init()
</script>
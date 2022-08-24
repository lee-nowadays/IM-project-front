<template lang="pug">
#applyLecture.mt-5.pt-5
  .container
    .row
      .col-12
        h1.text-center 報名狀態
      v-divider
      .col-12
        v-table
          thead
            tr
              th  活動日期 
              th  講座名稱
              th  報名狀態
              th  
          tbody
            tr(v-if='lectures.length > 0' v-for='(item, idx) in lectures' :key='item._id' :class="{'bg-red': !item.lecture.post}")
              td  {{ new Date(item.lecture.date).toLocaleDateString() }}
              td  {{ item.lecture.title }}
              td  報名成功
              td
                v-btn(color='blue darken-4' @click='deleteLecture(idx, 0)') 取消報名
            tr(v-else)
              td.text-center(colspan="4") 沒有報名記錄
</template>

<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios.js';
import { useStudentStore } from '@/stores/student'

const student = useStudentStore()

const lectures = reactive([])


const deleteLecture = async (idx) => {
  const result = await student.deleteLecture({ lectures:lectures[idx].lecture._id })
  if(result) lectures.splice(idx, 1)
}

const init = async () => {
  try {
    const { data } = await apiAuth.get('/students/lectures')
    data.result.map(lec => {   
      const time = Date.parse(lec.lecture.date)
      if(time > Date.now()){
        lectures.push(lec)
      }
    })
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
<template lang="pug">
#teachers.mt-5.pt-5
  .container.teacher
    .row
      .col-12
        h1.text-center.pb-3 師資介紹
    .row
      .col-12.col-md-6.col-lg-3(v-if="teachers.length > 0" v-for='(teacher, idx) in teachers')
        .col-12.m-3.mx-auto
          v-img(:src='teacher.image')
            v-btn(variant="text" @click='teacherInfo(teacher._id,idx)').overlay {{ teacher.name }}
      .col-12(v-else)
        h1.mx-auto(v-if='loaded') 沒有老師
        .col-12(v-else).mx-auto
          svg( xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink' style='margin:auto;background:#fff;display:block;' width='200px' height='200px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid')
            circle(cx='50' cy='50' fill='none' stroke='#0D47A1' stroke-width='10' r='35' stroke-dasharray='164.93361431346415 56.97787143782138')
              animateTransform(attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;360 50 50' keyTimes='0;1')
    v-dialog(v-model='dialog' transition="dialog-bottom-transition" scrollable)
      v-card.teacherCard
        .row 
          .col-12.col-lg-6
            v-img(:src='card.image')
          .col-12.col-lg-6
            v-card-text 
              h2 {{ card.name }}
            v-card-text 研究室：{{ card.lab }}
            v-card-text 電話：{{ card.telephone }}
            v-card-text 傳真：{{ card.fax }}
            v-card-text 信箱：{{ card.email }}
          .col-12
            v-tabs(v-model="tab" )
              v-tab(value="proInterest") 專業興趣
              v-tab(value="experience") 經歷
              v-tab(value="course") 課程
            v-card-text
              v-window(v-model='tab' style="white-space:pre ;")
                v-window-item(value='proInterest') {{ card.proInterest }}
                v-window-item(value='experience') {{ card.experience }}
                v-window-item(value='course') {{ card.course }}
</template>

<script setup>
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import { api } from '@/plugins/axios'


const dialog = ref(false)
const tab = ref('proInterest')
const teachers = reactive([])
const loaded = ref(false)

const teacherInfo = (_id,idx) =>{
  card._id = _id
  card.name = teachers[idx].name 
  card.image = teachers[idx].image 
  card.lab = teachers[idx].lab 
  card.telephone = teachers[idx].telephone 
  card.fax = teachers[idx].fax 
  card.email = teachers[idx].email 
  card.proInterest = teachers[idx].proInterest 
  card.experience = teachers[idx].experience 
  card.course = teachers[idx].course 
  dialog.value = true
}

const card = reactive({
  _id:'',
  name:'',
  image:'',
  lab:'',
  telephone:'',
  fax:'',
  email:'',
  proInterest:'',
  experience:'',
  course:'',
})

const init = async () => {
  try {
    const { data } = await api.get('/teachers')
    data.teacher.map(a => {
      const result = (a.image = import.meta.env.VITE_API + "/files/" + a.image, a )
      teachers.push(result)
    })
  } catch (error) {
    Swal.fire({
      icon:'error',
      title:'失敗',
      text:'伺服器錯誤'
    })
  }
  loaded.value = true
}
init()
</script>
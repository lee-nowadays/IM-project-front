<template lang="pug">
.container
  #lecture.mt-5.pt-5
    v-row 
      v-col(cols='12')
        h1() {{ article.title }}
      v-divider 
      v-col.text-center(cols='12')
        v-img(v-if='article.image' :src='article.image')
      v-col(cols='12')
        p(v-html='article.content' ) 
      v-col(cols='12' v-for='(file, idx) in article.files')
        //- a(:href='file.link' target='_blank')  附件{{ idx + 1 }}
        v-btn(variant="text" @click='dl(file.link, idx+1)') 附件{{ idx + 1 }}
      v-col(cols='12')
        v-btn(v-if="article.category === '講座資訊'" color='primary' @click='addLecture({ lecture:article._id })') 我要報名
      v-overlay.align-center.justify-center(:model-value='!article.post')
        h1.text-black 已下架
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/plugins/axios'
import Swal from 'sweetalert2'
import { useStudentStore } from '@/stores/students'
import axios from 'axios'
import download from 'downloadjs'

const route = useRoute()

const router = useRouter()
const student = useStudentStore()
const { addLecture } = student


const article = reactive({
  _id : '',
  title : '',
  content : '',
  image : '',
  files : [],
  category : '',
  post : true,
  date :''
})

const dl = async (file, number) => {
  const response = await axios.get(file, { responseType: 'blob', headers: {
    accept: 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  }})
  const content = response.headers['content-type'];
  download(response.data, '附件'+number+'.'+file.split('.').reverse()[0], content)
}
const init = async () => {
  try {
    const { data } = await api.get('/articles/' + route.params.id)
    article._id = data.article._id
    article.title = data.article.title
    article.content = data.article.content
    article.image = article.image.length > 0 ? import.meta.env.VITE_API + "/files/" + data.article.image : ''
    article.files = data.article.files.map(file => {
      return {
        name: file,
        link: import.meta.env.VITE_API + "/files/" + file
      }
    })
    article.category = data.article.category
    article.post = data.article.post
    article.date = data.article.date
  } catch (error) {
    Swal.fire({
      icon:'error',
      title:'失敗',
      text:'取得文章資料失敗'
    })
    router.go(-1)
  }
}
init()
</script>
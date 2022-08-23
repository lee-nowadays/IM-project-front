<template lang="pug">
#home
  #mainphoto
    .container-fluid
      .row
        .overlay 
          p  Department of 
          p  Information Management
          p  資訊管理學系
          ul
            li
              h5  多媒體工程研究所
            li
              h5  圖資工程研究所
            li
              h5  網路工程研究所

  .container.mt-5.lastnews
    .row
      h1.text-center 最新消息
      v-divider
      .col-12
        v-list
          router-link(v-if="sliceArticles.length > 0" v-for='(sliceArticle, idx) in sliceArticles' :key='idx' :to="'/article/' + sliceArticle._id" ) {{ new Date(sliceArticle.date).toLocaleDateString() }}  {{ sliceArticle.title }}
          .col(v-else)
            h1.text-center 沒有消息
      v-pagination(
        v-model='currentPage'
        :length="Math.ceil(articles.length / pageSize) " 
        rounded="circle" 
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left" 
      )
</template>


<script setup>
import { reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { api } from '@/plugins/axios'


const articles = reactive([])

const pageSize = 10
const currentPage = ref(1)

const sliceArticles = computed (()=>{
  return articles.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize))
})
// const Pagination = () =>{
//   if(sliceArticles.length === 0 ){
//     sliceArticles.push(...articles.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize)))
//   }else{
//     sliceArticles.splice(0,10)
//     sliceArticles.push(...articles.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize)))
//   }
// }

const init = async () => {
  try {
    const { data } = await api.get('/articles')
    articles.push(...data.article)
  } catch (error) {
    Swal.fire({
      icon:'error',
      title:'失敗',
      text:'伺服器錯誤'
    })
  }
}
init()
</script>
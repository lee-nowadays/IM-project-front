<template lang="pug">
#home
  #mainphoto
    .container-fluid
      .row
        .overlay.animate__animated.animate__fadeInLeft
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
          v-list-item(prepend-icon='mdi-book-open-page-variant-outline' v-if="sliceArticles.length > 0" v-for='(sliceArticle, idx) in sliceArticles' :key='idx')
            router-link(:to="'/article/' + sliceArticle._id" ) {{ new Date(sliceArticle.date).toLocaleDateString() }}  {{ sliceArticle.title }}
          .col-12(v-else)
              h1.mx-auto(v-if='loaded') 沒有消息
              .col-12(v-else).mx-auto
                svg( xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink' style='margin:auto;background:#fff;display:block;' width='200px' height='200px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid')
                  circle(cx='50' cy='50' fill='none' stroke='#0D47A1' stroke-width='10' r='35' stroke-dasharray='164.93361431346415 56.97787143782138')
                    animateTransform(attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;360 50 50' keyTimes='0;1')
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

const loaded = ref(false)
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
  loaded.value = true
}
init()
</script>
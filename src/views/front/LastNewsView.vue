<template lang="pug">
#lastnews.mt-5.pt-5
  .container.lastnews
    .row 
      .col-12(v-if='tab === "最新消息"')
        h1.text-center.mb-5 最新消息
      .col-12(v-if='tab === "講座資訊"')
        h1.text-center.mb-5 講座資訊
      .col-12(v-if='tab === "競賽資訊"')
        h1.text-center.mb-5 競賽資訊
      .col-12
        v-tabs(v-model='tab')
          v-tab(value="最新消息") 最新消息
          v-tab(value="講座資訊") 講座資訊
          v-tab(value="競賽資訊") 競賽資訊
      .col-12
        v-window(v-model='tab')
          v-window-item(value='最新消息')
            .col-12(v-if="sliceArticles.length > 0 ")
              v-list
                v-list-item(prepend-icon='mdi-book-open-page-variant-outline' v-for='article in sliceArticles')
                  router-link(:to="'/article/' + article._id" ) {{ new Date(article.date).toLocaleDateString() }}  {{ article.title }}
            .col-12(v-else)
              h1.text-center 沒有消息
          v-window-item(value='講座資訊')
            .col-12(v-if="sliceArticles.length > 0 ")
              v-list
                v-list-item(prepend-icon='mdi-book-open-page-variant-outline' v-for='article in sliceArticles')
                  router-link(:to="'/article/' + article._id" ) {{ new Date(article.date).toLocaleDateString() }}  {{ article.title }}
            .col-12(v-else )
              h1.text-center 沒有講座
          v-window-item(value='競賽資訊')
            .col-12( v-if="sliceArticles.length > 0 ")
              v-list
                v-list-item(prepend-icon='mdi-book-open-page-variant-outline' v-for='article in sliceArticles')
                  router-link(:to="'/article/' + article._id" ) {{ new Date(article.date).toLocaleDateString() }}  {{ article.title }}
            .col-12(v-else )
              h1.text-center 沒有競賽
          v-pagination(
            v-model='currentPage'
            :length="Math.ceil(sliceArticles.length / pageSize) " 
            rounded="circle" 
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left" 
          )
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { api } from '@/plugins/axios'
import _ from 'lodash'

const router = useRouter()

const articles = reactive({
  最新消息: [],
  講座資訊: [],
  競賽資訊: []
})
const tab = ref('最新消息')

const pageSize = 10
const currentPage = ref(1)
const sliceArticles = computed(()=>{
  return articles[tab.value].slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize))
})
// console.log(tab.value)
const init = async () => {
  try {
    const { data } = await api.get('/articles')
    // const group = _.groupBy([...data.article], 'category')
    // articles.最新消息 = group.最新消息
    // articles.講座資訊 = group.講座資訊
    // articles.競賽資訊 = group.競賽資訊
    Object.assign(articles, _.groupBy([...data.article], 'category'))
  }catch (error) {
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
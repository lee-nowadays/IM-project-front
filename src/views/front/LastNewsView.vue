<template lang="pug">
#lastnews.mt-5.pt-5
  .container.lastnews
    .row 
      .col-12(v-if='tab === "one"')
        h1.text-center.mb-10 最新消息
      .col-12(v-if='tab === "two"')
        h1.text-center.mb-10 講座資訊
      .col-12(v-if='tab === "three"')
        h1.text-center.mb-10 競賽資訊
      .col-12
        v-tabs(v-model='tab')
          v-tab(value="one") 最新消息
          v-tab(value="two") 講座資訊
          v-tab(value="three") 競賽資訊
      v-divider
      .col-12
        v-window(v-model='tab')
          v-window-item(value='one')
            .col-12(v-if="articles.最新消息.length > 0 ")
              v-list
                v-list-item(v-for='article in articles.最新消息')
                  router-link(:to="'/article/' + article._id" ) {{ new Date(article.date).toLocaleDateString() }}  {{ article.title }}
            .col-12(v-else)
              h1.text-center 沒有消息
          v-window-item(value='two')
            .col-12(v-if="articles.講座資訊.length > 0 ")
              v-list
                v-list-item(v-for='article in articles.講座資訊')
                  router-link(:to="'/article/' + article._id" ) {{ new Date(article.date).toLocaleDateString() }}  {{ article.title }}
            .col-12(v-else )
              h1.text-center 沒有講座
          v-window-item(value='three')
            .col-12( v-if="articles.競賽資訊.length > 0 ")
              v-list
                v-list-item(v-for='article in articles.競賽資訊')
                  router-link(:to="'/article/' + article._id" ) {{ new Date(article.date).toLocaleDateString() }}  {{ article.title }}
            .col-12(v-else )
              h1.text-center 沒有競賽
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

const tab = ref('one')

const pageSize = 10
const currentPage = ref(1)
const sliceArticle = computed(()=>{
  return articles.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize))
})
console.log(articles)
const init = async () => {
  try {
    const { data } = await api.get('/articles')
    // console.log(data.article.filter(a=>{
    //   return a.category === '最新消息'
    // }))
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
<template lang="pug">
.container.mt-5
  #articles
    .row
      .col-12
        h1.text-center 文章管理
      v-divider
      .col-12
        v-btn(color='blue darken-4' @click="openDialog('', -1)").text-white.mb-3 新增文章
        v-text-field(
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          variant="outlined"
        )
      .col-12
        v-table
          thead
            tr
              th 日期
              th 標題
              th 分類
              th 發布狀態
              th(colspan="2") 管理
          tbody
            tr(v-if='sliceArticles.length > 0' v-for='(article, idx) in sliceArticles' :key='article._id' )
              td {{ new Date(article.date).toLocaleDateString() }}
              td {{ article.title }}
              td {{ article.category }}
              td 
                v-checkbox(@click='postArticle(article._id, idx)' :model-value='article.post')
              td 
                v-btn(v-if='currentPage === 1' color='blue darken-4' @click='openDialog(article._id,idx)' variant="outlined") 編輯
                v-btn(v-else color='blue darken-4' @click='openDialog(article._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 編輯
              td
                v-btn(v-if='currentPage === 1' color='error' @click='del(article._id,idx)' variant="outlined") 刪除
                v-btn(v-else color='error' @click='del(article._id,idx + (currentPage - 1) * pageSize)' variant="outlined") 刪除
            tr(v-else)
              td.text-center(colspan="7") 沒有文章
    v-dialog(v-model='form.dialog' scrollable)
      v-form(v-model='form.valid' @submit.prevent='submitForm' style="height:900px ; width: 100%;")
        v-card
          v-card-title
            .text-h5 {{ form._id.length > 0 ? '編輯文章' : '新增文章' }}
          v-card-text
            .container
              .row
                .col-12
                  v-text-field(v-model='form.title' label='標題' :rules='[rules.required]'  variant="outlined")
                .col-12.quill
                  QuillEditor(:options="quillOptions" toolbar='full' v-model:content='form.content' contentType="html")
                  //- v-textarea(v-model='form.content' label='內文' :rules='[rules.required]'  variant="outlined")
                .col-12.col-md-6
                  v-file-input(v-model='form.image' show-size accept='image/*' label='圖片' :prepend-icon="''" :rules='[rules.size]'  variant="outlined")
                .col-12.col-md-6
                  v-file-input(type='file' v-model='form.files' multiple show-size accept='.doc,.docx,.pdf'  label='附件' :prepend-icon="''"  variant="outlined")
                .col-12.col-md-6
                  v-select(:items='categories' v-model='form.category' label='分類' :rules='[rules.required]'  variant="outlined")
                .col-12.col-md-6
                  v-text-field(v-model='form.date' type="date" label='日期' :rules='[rules.required]'  variant="outlined")
                .col-12.col-md-6
                  v-checkbox(v-model='form.post' label='發布')
          v-card-actions
            v-spacer
            v-btn(color='error' @click='form.dialog = false' :disabled='form.submitting') 取消
            v-btn(type='submit' color='blue darken-4' :loading='form.submitting') 確定
    v-pagination(
      v-model='currentPage'
      :length="Math.ceil(articles.length / pageSize) " 
      rounded="circle" 
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left" 
    )
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive, ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios'

// 跟後台設定要一樣
const search = ref('')

const categories = reactive(['最新消息', '講座資訊', '競賽資訊'])
const articles = reactive([])
const form = reactive({
  _id: '',
  title: '',
  content: '',
  image: [],
  files: [],
  category: '',
  post: false,
  date: '',
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
})

const pageSize = 10
const currentPage = ref(1)

const sliceArticles = computed (()=>{
  return articles.slice((currentPage.value * pageSize) - pageSize,(currentPage.value * pageSize)).filter(item=>{
    const inc = item.title.toLowerCase().includes(search.value.toLowerCase())
    return inc
  })
})
const searchArticles = reactive([])
searchArticles.push(sliceArticles)
// console.log(searchArticles)


const quillOptions = reactive({
  theme: 'snow'
})

// 用規則分類
const rules = reactive({
  required(v) {
    return !!v || '必填'
  },
  size(v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size < 2048 * 2048) || '檔案格式不符'
  }
})



const openDialog = (_id,idx) => {
  form._id = _id
  if (idx > -1) {
    form.title = articles[idx].title
    form.content = articles[idx].content
    form.category = articles[idx].category
    form.post = articles[idx].post
    form.date = articles[idx].date
  } else {
    form.title = ''
    form.content = ''
    form.category = ''
    form.post = false
    form.date = ''
  }
  form.image = []
  form.files = []
  form.idx = idx
  form.date = ''
  form.dialog = true
  form.valid = false
  form.submitting = false
}

const del = async (_id,idx) => {
  await apiAuth.delete('/articles/'+ _id)
  articles.splice(idx, 1)
}


const postArticle = async (_id, idx) => {
  try {
    await apiAuth.patch('/articles/'+ _id +'/post',{ post : !articles[idx].post })
    articles[idx].post = !articles[idx].post
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
  
}

const submitForm = async () => {
  if (!form.valid) return
  form.submitting = true
  const articlefd = new FormData()

  // FormData 要放資料進去要用 append 第一個放 key，第二個放 data，可以一行一行寫，或者寫一個 for 迴圈，把不要進去的寫出來
  // articlefd.append('title', form.title)
  for (const key in form) {
    if (['_id', 'idx', 'dialog', 'valid', 'submitting'].includes(key)) continue
    else if (key === 'image') {
      articlefd.append(key, form[key][0])
    }
    else if (key === 'files') {
      for (const file of form.files) {
        articlefd.append(key, file)
      }
    }
    else {
      articlefd.append(key, form[key])
    }
  }
  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/articles', articlefd)
      // data.article 在 back/controllers/articles 
      articles.push(data.article)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/articles/' + form._id, articlefd)
      // data.article 在 back/controllers/articles
      articles[form.idx] = data.article
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
    const { data } = await apiAuth.get('/articles/all')
    // data.article 在 back/controllers/articles 裡面寫的getAllArticles
    data.article.map(a => {
      const result = (a.image = import.meta.env.VITE_API + "/files/" , a )
      articles.push(result)
    })
    // articles.push(...data.article)
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
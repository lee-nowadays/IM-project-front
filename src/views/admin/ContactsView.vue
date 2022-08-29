<template lang="pug">
.container.mt-5 
  #contacts
    .col-12
      h1.text-center 聯絡管理
    v-divider
  .row.mt-5
    .col-12
      v-table
        thead
          tr
            th 主旨
            th 問題類型
            th 問題描述
            th(colspan="2") 管理
        tbody
          tr(v-if='contacts.length > 0' v-for='(contact, idx) in contacts' :key='contact._id')
            td {{ contact.subject }}
            td {{ contact.question }}
            td {{ contact.description }}
            td
              v-btn(color='blue darken-4' @click='openDialog(contact._id,idx)' variant="outlined") 查看
          tr(v-else)
            td.text-center(colspan="4") 
              h3.mt-3 沒有聯絡 
      v-dialog(v-model='dialog' )
        v-card.contactCard
          .row 
            .col-12
              h3(style="color:#0D47A1;font-weight: bold;") 主旨
              p(style="color: #000; font-weight: bold; font-size: 1.1rem;") {{ contacts.subject }}
            .col-12
              h3(style="color:#0D47A1;font-weight: bold;") 問題類型
              p(style="color: #000; font-weight: bold; font-size: 1.1rem;") {{ contacts.question }}
            .col-12(style="width: 300px; text-overflow: ellipsis;")
              h3(style="color:#0D47A1;font-weight: bold;") 問題描述
              p(style="color: #000; font-weight: bold; font-size: 1.1rem;") {{ contacts.description }}
</template>

<script setup>
import { reactive,ref } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios'

const contacts = reactive([])
const dialog = ref(false)
const openDialog = (_id, idx) => {
  contacts.subject = contacts[idx].subject
  contacts.question = contacts[idx].question
  contacts.description = contacts[idx].description
  dialog.value = true
}

const init = async () => {
  try {
    const { data } = await apiAuth.get('/contacts')
    contacts.push(...data.contact)
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
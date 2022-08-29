<template lang="pug">
Menu(right).menu
  v-navigation-drawer(expand-on-hover rail permanent )
  v-list-item(:prepend-avatar="avatar" :title='name' )
  v-list-item(to='/admin/calendar' title="行事曆管理" prepend-icon="mdi-calendar")
  v-list-item(to='/admin/students' title="學生管理" prepend-icon="mdi-account")
  v-list-item(to='/admin/teachers' title="師資管理" prepend-icon="mdi-school")
  v-list-item(to='/admin/articles' title="文章管理" prepend-icon="mdi-nativescript")
  v-list-item(to='/admin/contacts' title="聯絡管理" prepend-icon="mdi-email")
  v-list-item(to='/' title="回前台" prepend-icon="mdi-home")
  v-list-item(title="登出" prepend-icon="mdi-logout" @click="logout")
v-navigation-drawer(expand-on-hover rail permanent )
  v-list
    v-list-item(:prepend-avatar="avatar" :title='name')
  v-divider
  v-list
    v-list-item(to='/admin/calendar' title="行事曆管理" prepend-icon="mdi-calendar")
    v-list-item(to='/admin/students' title="學生管理" prepend-icon="mdi-account")
    v-list-item(to='/admin/teachers' title="師資管理" prepend-icon="mdi-school")
    v-list-item(to='/admin/articles' title="文章管理" prepend-icon="mdi-nativescript")
    v-list-item(to='/admin/contacts' title="聯絡管理" prepend-icon="mdi-email")
    v-list-item(to='/' title="回前台" prepend-icon="mdi-home")
    v-list-item(title="登出" prepend-icon="mdi-logout" @click="logout")
v-main
  router-view
</template>

<script setup>
import { useStudentStore } from '@/stores/student'
import { Slide as Menu } from 'vue3-burger-menu'
import { storeToRefs } from 'pinia'

const student = useStudentStore()
const { avatar, name } = storeToRefs(student)
const { logout } = student



</script>

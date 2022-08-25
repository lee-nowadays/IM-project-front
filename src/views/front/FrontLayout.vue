<template lang="pug">
Menu.menu
  v-list-item(to='/') 回首頁
  v-list-item(to='/lastnews') 最新消息
  v-list-item(to='/about') 關於我們
  v-list-item(to='/calendar') 行事曆
  v-list-item(to='/teachers') 師資介紹
  v-list-item(to='/contact') 聯絡我們
  v-list-item(v-if='isLogin && isAdmin' to='/admin') 管理
  v-list-item(v-if='!isLogin' to='/login') 登入
  v-list-item(v-if='isLogin' :to="'/student/' + student._id") 個人資料
  v-list-item(v-if='isLogin' to='/applyLecture') 查看報名講座
  v-list-item(v-if='isLogin' to='/passLecture') 歷史報名講座
  v-list-item(v-if='isLogin' @click='logout') 登出
v-app-bar.appbar
  v-avatar.me-3
    v-img(src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/ROC_Workforce_Development_Agency_Logo.svg/640px-ROC_Workforce_Development_Agency_Logo.svg.png')
  v-app-bar-title 泰山資訊管理系
  //- #append 是 v-slot
  template(#append)
    v-btn(exact to='/') 回首頁
    v-btn(exact to='/lastnews') 最新消息
    v-btn(exact to='/about') 關於我們
    v-btn(exact to='/calendar') 行事曆
    v-btn(exact to='/teachers') 師資介紹
    v-btn(exact to='/contact') 聯絡我們
    v-btn(v-if='isLogin && isAdmin' to='/admin') 管理
    v-btn(v-if='!isLogin' to='/login') 登入
    v-menu(open-on-hover)
      template(#activator="{ props }")
        v-btn(v-if='isLogin' icon='mdi-account' v-bind="props")
      v-list
        v-list-item(:to="'/student/' + student._id")
          v-list-item-title 個人資料
        v-list-item(to='/applyLecture')
          v-list-item-title 查看報名講座
        v-list-item(to='/passLecture')
          v-list-item-title 歷史報名講座
        v-list-item(@click='logout')
          v-list-item-title 登出
v-main
  router-view
#footer
  .container
    .row.pt-4
      .col-12.col-sm-6.col-lg-3.footer-text
        p 電話：(02)2901-8274
      .col-12.col-sm-6.col-lg-3.footer-text
        p 傳真：(02)2908-4773
      .col-12.col-sm-6.col-lg-3.footer-text
        p Email：WDATaishan@gmail.com
      .col-12.col-sm-6.col-lg-3.footer-text
        p 243新北市泰山區貴子里致遠新村55之1號
      .col-12.footer-text
        //- p 電話：(02)2901-8274| 傳真：(02)2908-4773 | Email：WDATaishan@gmail.com | 243新北市泰山區貴子里致遠新村55之1號
        p.text-center Copyright &copy; 2022 . All rights reserved.

</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import { Slide as Menu } from 'vue3-burger-menu'

const student = useStudentStore()
const { logout } = student
const { isLogin, isAdmin } = storeToRefs(student)

</script>
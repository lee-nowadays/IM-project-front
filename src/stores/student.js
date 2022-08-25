import { defineStore } from 'pinia'
import { api } from '@/plugins/axios'
import Swal from 'sweetalert2'
// 在 pinia 這樣寫 useRouter() 會是 undefined
// import { useRouter } from 'vue-router'
import router from '@/router'
import { apiAuth } from '../plugins/axios'

export const useStudentStore = defineStore({
  id: 'student',
  state () {
    return{
      token:'',
      studentId:'',
      name:'',
      email:'',
      class:'',
      residenceAddress:'',
      currentAddress:'',
      personalId:'',
      about:'',
      phone:'',
      lectures:'',
      _id:'',
      role:0
    }
  },
  getters:{
    isLogin(){
      return this.token.length !== 0
    },
    isAdmin(){
      return this.role === 1
    },
    avatar () {
      return 'https://source.boringavatars.com/beam/120/' + this.name
    }
  },
  actions:{
    async login (form) { 
      try {
        const { data } = await api.post('/students/login', form)
        this._id = data.result._id
        this.token = data.result.token
        this.studentId = data.result.studentId
        this.name = data.result.name
        this.email = data.result.email
        this.class = data.result.class
        this.residenceAddress = data.result.residenceAddress
        this.currentAddress = data.result.currentAddress
        this.personalId = data.result.personalId
        this.about = data.result.about
        this.phone = data.result.phone
        this.lectures = data.result.lectures
        this.role = data.result.role
        Swal.fire({
          icon:'success',
          title:'成功',
          text:'登入成功'
        })
        router.push('/')
        } catch (error) {
        Swal.fire({
          icon:'error',
          title:'登入失敗',
          text:(error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
        })
      }
    },
    async logout () {
      try {
        // await api.delete('/users/logout', {
        //   headers: {
        //     authorization: `Bearer ${this.token}`
        //   }
        // })
        await apiAuth.delete('/students/logout')
        router.push('/')
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '登出成功'
        })
      } catch (error) {
        console.log(error)
        // empty
      }
      this.token = ''
      this.studentId = 0
      this.name = ''
      this.email = ''
      this.class = ''
      this.residenceAddress = ''
      this.currentAddress = ''
      this.personalId = ''
      this.about = ''
      this.phone = 0
      this.lectures = ''
      this.role = 0
    },
    async addLecture(data) {
      if(this.token.length === 0) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '請先登入'
        })
        router.push('/login')
        return
      }
      try {
        const { data: resData } = await apiAuth.post('/students/lectures', data)
        console.log(this.articles)
        this.lectures = resData.lecture
        // console.log(resData.lecture)
        await apiAuth.post('/events')
        // this.lectures = 0
        // console.log(this.lectures)
        if(resData.message === '已報名過此講座') {
          Swal.fire({
            icon: 'error',
            title: '失敗',
            text: '重覆報名'
          })
        }else {
          Swal.fire({
            icon: 'success',
            title: '成功',
            text: '報名成功'
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '報名失敗'
        })
      }
    },
    async deleteLecture (data) {
      try {
        await apiAuth.patch('/students/lectures', data)
        // 將資料結果往外傳
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '取消報名成功'
        })
        return true
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '取消報名失敗'
        })
        return false
      }
    },
    async getStudent () {
      if (this.token.length === 0) return
      try {
        const { data } = await apiAuth.get('/students')
        this.studentId = data.result.studentId
        this.name = data.result.name
        this.email = data.result.email
        this.class = data.result.class
        this.residenceAddress = data.result.residenceAddress
        this.currentAddress = data.result.currentAddress
        this.personalId = data.result.personalId
        this.about = data.result.about
        this.phone = data.result.phone
        this.lectures = data.result.lectures
        this.role = data.result.role
        this._id = data.result._id
      } catch (error) {
        this.logout()
      }
    }
  },
  persist: {
    key: 'vite-IM',
    paths: ['token']
  }
})
import { defineStore } from 'pinia'


export const useTeacherStore = defineStore({
  id: 'teacher',
  state () {
    return{
      name:'',
      lab:'',
      image:'',
      telephone:'',
      description:'',
      proInterest:'',
      experience:'',
      course:'',
      paper:''
    }
  }
})
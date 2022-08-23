import axios from "axios"
import { useStudentStore } from "@/stores/students"
import router from '@/router'

// 會將 env 設定的網址 帶入 post get 這種東西前面
export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})
// 給 post delete 這種東西帶入資料用的
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API

})
// axios ---> axios 攔截請求 --> API SERVER --> axios 攔截回應 --> 呼叫的地方
// 使用 apiAuth 就會自動帶入 jwt
// config 是傳出前設定，改寫成新的回傳出去，就會用新的改寫後的設定發送請求
apiAuth.interceptors.request.use(config => {
  const student = useStudentStore()
  // 改寫設定，把 header 加入 jwt
  config.headers.authorization = `Bearer ${student.token}`
  return config
})
apiAuth.interceptors.response.use(res => {
  return res
}, error => {
  // 如果請求有回應
  if(error.response) {
    // 如果是 401 ， 可能是 JWT 過期
    if(error.response.status === 401) {
      // 確認原始請求的網址不是延長登入，才重新登入
      if(error.config.url !== '/students/extend' && error.config.url !== '/students/logout'){
        const student = useStudentStore()
        // 傳送延長請求
        return apiAuth.post('/students/extend', {}).then(({ data }) => {
          // 取得原始請求的設定
          const originalRequest = error.config
          // 更新 JWT
          student.token = data.result
          // 使用新的 JWT 再次嘗試請求
          originalRequest.headers.authorization = `Bearer ${student.token}`
          return axios(originalRequest)
        }).catch(error => {
          // 重新登入失敗，強制登出
          student.logout()
          // 回傳延長登入請求的錯誤訊息
          return Promise.reject(error)
        })
      }
    }
  }
  return Promise.reject(error)
})

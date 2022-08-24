import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayout from '../views/front/FrontLayout.vue'
import HomeView from '../views/front/HomeView.vue'
import NotFoundView from '@/views/NotFound.vue'
import { useStudentStore } from '@/stores/student'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FrontLayout,
      children:[
        {
          path:'',
          name:'home',
          component:HomeView,
          meta:{
            title:'泰山資訊管理系',
            login: false,
            admin: false
          }
        },
        {
          path:'login',
          name:'login',
          component:()=>import('@/views/front/LoginView.vue'),
          meta:{
            title:'泰山資訊管理系 | 登入',
            login: false,
            admin: false
          }
        },
        {
          path:'lastnews',
          name:'lastnews',
          component:()=>import('@/views/front/LastNewsView.vue'),
          meta:{
            title:'泰山資訊管理系 | 最新消息',
            login: false,
            admin: false
          }
        },
        {
          path:'about',
          name:'about',
          component:()=>import('@/views/front/AboutView.vue'),
          meta:{
            title:'泰山資訊管理系 | 關於我們',
            login: false,
            admin: false
          }
        },
        {
          path:'calendar',
          name:'calendar',
          component:()=>import('@/views/front/CalendarView.vue'),
          meta:{
            title:'泰山資訊管理系 | 行事曆',
            login: false,
            admin: false
          }
        },
        {
          path:'teachers',
          name:'teachers',
          component:()=>import('@/views/front/TeachersView.vue'),
          meta:{
            title:'泰山資訊管理系 | 師資介紹',
            login: false,
            admin: false
          }
        },
        {
          path:'contact',
          name:'contact',
          component:()=>import('@/views/front/ContactView.vue'),
          meta:{
            title:'泰山資訊管理系 | 聯絡我們',
            login: false,
            admin: false
          }
        },
        {
          path:'applylecture',
          name:'applylecture',
          component:()=>import('@/views/front/ApplyLecture.vue'),
          meta:{
            title:'泰山資訊管理系 | 報名講座',
            login: true,
            admin: false
          }
        },
        {
          path:'passlecture',
          name:'passlecture',
          component:()=>import('@/views/front/PassLecture.vue'),
          meta:{
            title:'泰山資訊管理系 | 歷史講座',
            login: true,
            admin: false
          }
        },
        {
          path:'article/:id',
          name:'article',
          component:()=>import('@/views/front/ArticleView.vue'),
          meta:{
            title:'泰山資訊管理系',
            login: false,
            admin: false
          }
        },
        {
          path:'student/:id',
          name:'student',
          component:()=>import('@/views/front/StudentProfileView.vue'),
          meta:{
            title:'泰山資訊管理系',
            login: true,
            admin: false
          }
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin-home',
          component: () => import('@/views/admin/HomeView.vue'),
          meta: {
            title: '泰山資訊管理系 | 管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'calendar',
          name: 'admin-calendar',
          component: () => import('@/views/admin/CalendarsView.vue'),
          meta: {
            title: '泰山資訊管理系 | 行事曆管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'students',
          name: 'admin-students',
          component: () => import('@/views/admin/StudentsView.vue'),
          meta: {
            title: '泰山資訊管理系 | 學生管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'teachers',
          name: 'admin-teachers',
          component: () => import('@/views/admin/TeachersView.vue'),
          meta: {
            title: '泰山資訊管理系 | 老師管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'articles',
          name: 'admin-articles',
          component: () => import('@/views/admin/ArticlesView.vue'),
          meta: {
            title: '泰山資訊管理系 | 文章管理',
            login: true,
            admin: true
          }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: '泰山資訊管理系 | 404',
        login: false,
        admin: false
      }
    },
    {
      // 上面沒有出現的路徑全部導向到 404
      path: '/:pathMatch(.*)*',
      name: 'all',
      redirect: '/404'
    }
  ]
})

router.afterEach((to, from)=>{
  // 改 meta title
  document.title  = to.meta.title
})

router.beforeEach((to, from, next) => {
  // 使用者導向，路由守衛
  const student = useStudentStore()
  if(student.isLogin && (to.path === '/login')){
    next('/')
  }else if(to.meta.login && !student.isLogin){
    next('/login')
  }else if(to.meta.admin && !student.isAdmin){
    next('/')
  }else{
    next()
  }
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import login from '../view/login.vue'  //登录
import menu from '../view/menu.vue'  //左侧菜单栏
import companyInfo from '../view/menu/companyInfo.vue'  //企业信息
import releasePositions from '../view/menu/releasePositions.vue'  //发布职位
import allPosition from '../view/menu/allPosition.vue'  //职位管理
import resume from '../view/menu/resume.vue'  //简历管理
import cookerTel from '../view/menu/preview/cookerTel.vue'  //有联系方式厨师
import notCookerTel from '../view/menu/preview/notCookerTel.vue'  //有联系方式非厨师
// import certification from '../view/certification.vue'  //新企业认证
export default new Router({
  routes: [
    { path: '/login', name: '登录', component: login },
    { path: '/menu', component: menu,
      children:[
        { path:'/companyInfo', name: '企业信息', component:companyInfo , meta: {requireAuth: true} },
        { path:'/releasePositions', name: '发布职位', component:releasePositions , meta: {requireAuth: true} },
        { path:'/allPosition', name: '职位管理', component:allPosition , meta: {requireAuth: true} },
        { path:'/resume', name: '简历管理', component:resume , meta: {requireAuth: true} },
      ]
    },
    { path: '/cookerTel', name: '有联系方式厨师', component: cookerTel , meta: {requireAuth: true}},
    { path: '/notCookerTel', name: '有联系方式厨师', component: notCookerTel , meta: {requireAuth: true}},
    // { path: '/certification', name: '新企业认证', component: certification },
    {  path: '*', redirect: { path: '/login' } },
  ]
})


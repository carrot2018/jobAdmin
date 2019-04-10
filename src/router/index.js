import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)
// import login from '../view/login.vue'  //登录
// import menu from '../view/menu.vue'  //左侧菜单栏
// import companyInfo from '../view/menu/companyInfo.vue'  //企业信息
// import releasePositions from '../view/menu/releasePositions.vue'  //发布职位
// import allPosition from '../view/menu/allPosition.vue'  //职位管理
// import resume from '../view/menu/resume.vue'  //简历管理
// import cookerTel from '../view/menu/preview/cookerTel.vue'  //有联系方式厨师
// import notCookerTel from '../view/menu/preview/notCookerTel.vue'  //有联系方式非厨师
// import { resolve } from 'dns';
// import certification from '../view/certification.vue'  //新企业认证
// export default new Router({
//   routes: [
//     { path: '/login', name: '登录', component: login },
//     { path: '/menu', component: menu,
//       children:[
//         { path:'/companyInfo', name: '企业信息', component:companyInfo , meta: {requireAuth: true} },
//         { path:'/releasePositions', name: '发布职位', component:releasePositions , meta: {requireAuth: true} },
//         { path:'/allPosition', name: '职位管理', component:allPosition , meta: {requireAuth: true} },
//         { path:'/resume', name: '简历管理', component:resume , meta: {requireAuth: true} },
//       ]
//     },
//     { path: '/cookerTel', name: '有联系方式厨师', component: cookerTel , meta: {requireAuth: true}},
//     { path: '/notCookerTel', name: '有联系方式厨师', component: notCookerTel , meta: {requireAuth: true}},
//     // { path: '/certification', name: '新企业认证', component: certification },
//     {  path: '*', redirect: { path: '/login' } },
//   ]
// })
const router = new vueRouter({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/view/menu.vue'], resolve),
      children: [
        {
          path: '',
          redirect: '/companyInfo'
        },
        {
          path: 'companyInfo',
          name: '企业信息',
          component: resolve => require(['@/view/menu/companyInfo.vue'], resolve),
          meta: {requireAuth: true}
        },
        {
          path: 'releasePositions',
          name: '发布职位',
          component: resolve => require(['@/view/menu/releasePositions.vue'], resolve),
          meta: {requireAuth: true}
        },
        {
          path: 'allPosition',
          name: '职位管理',
          component: resolve => require(['@/view/menu/allPosition.vue'], resolve),
          meta: {requireAuth: true}
        },
        {
          path: 'resume',
          name: '简历管理',
          component: resolve => require(['@/view/menu/resume.vue'], resolve),
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/cookerTel',
      name: '有联系方式厨师',
      component: resolve => require(['@/view/menu/preview/cookerTel.vue'], resolve),
      meta: {requireAuth: true}
    },
    {
      path: '/notCookerTel',
      name: '无联系方式厨师',
      component: resolve => require(['@/view/menu/preview/notCookerTel.vue'], resolve),
      meta: {requireAuth: true}
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/view/login.vue'], resolve),
      meta: { requireAuth: false }
    },
    {
      path: '*',
      redirect: {path: '/login'},
    }

  ],
   // 路由跳转回到顶部
   scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { 
    //判断该路由是否需要登录权限
  let requestId = localStorage.getItem('requestId');
  if(requestId) {
    //通过封装好的cookies读取token，如果存在，name接下一步如果不存在，那跳转回登录页
    next();//不要在next里面加"path:/",会陷入死循环
  } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} //将跳转的路由path作为参数，登录成功后跳转到该路由 
      });
    }
  }else {
    next()
  }
})

export default router;
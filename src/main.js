// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cube from 'cube-ui'
import axios from 'axios'
// 引入字体图标
import './common/font/iconfont.js'
import './common/font/iconfont.css'
Vue.prototype.$http = axios;
import 'swiper/dist/css/swiper.min.css'
Vue.use(ElementUI)
Vue.use(Cube)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      
    }
  },
  methods: {
    isLogin(){
      let requestId = localStorage.getItem('requestId');
      // let requestId = this.requestId;
      axios.get('/api/checkLogin?loginRequestId='+requestId)
      .then((res)=>{

          if (res.data.code ==='203'){
            if (res.data.message === '请先登陆然后操作每个业务请求,请先带上本地cooke的requestId' || res.data.message === '免密登录失败,当前用户未登录') {
              // localStorage.removeItem('requestId');
              this.$router.replace({
                path: '/login'
              })
              this.$message.warning('登录过期，请重新登录');
            } else {
              this.$message.error('操作失败');
            }
          }
      })
    },
  },
  mounted() {
    
  },
  watch: {

    $route: {
      handler: function(val, oldVal){
        console.log(val)
        if (val.path !== '/login') {
          this.isLogin()
        }
      },
      // 深度观察监听
      deep: true
    }
  
  },
}
</script>

<style>
*{
  margin: 0;padding: 0;
  box-sizing: border-box;
  /* -webkit-overflow-scrolling: touch; */
  font-family:'MicrosoftYaHei';
}
a{
  text-decoration: none;
}
li{
  list-style: none;
}
input,textarea{
  border: none;
  outline:none;
  -webkit-tap-highlight-color: transparent;
}
html,body{
  width: 100%;
  height: 100%;
  font-size: 14px;
  min-width:1366px;
}
#app{
  width: 100%;
  height: 100%;
}
.el-message{
   min-width: 180px;
}
</style>

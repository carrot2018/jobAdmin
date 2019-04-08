<template>
<div id="layOut">
    <span v-show='interview'>面试安排</span>
    <span>我的订单</span>
    <span>账号权益</span>
    <span>
        <img src="../../static/img/logo.png" >
        <span v-text='userInfo.name'></span>
        <span class="iconfont iconxiala"></span>
    </span>
</div>
</template>

<script>
export default {
  data () {
    return {
        interview:false,
        userInfo:{},//企业信息
    }
  },
  methods:{
    
  },
  created(){
    let userInfo=localStorage.getItem('userInfo');
    this.userInfo=JSON.parse(userInfo);
    console.log(this.userInfo)



  },
  mounted(){
   
  }
}
</script>
<style scoped lang='scss'>
#layOut{
    position: absolute;
    right:112px;top:20px;
    >span{
        margin-right: 30px;   
        cursor: pointer;
    }
    span:last-of-type{
        margin-right: 0;
        >img{
            position: relative;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            top: 6px;
            right: 4px;
        }  
        >span:last-of-type{
            font-size: 20px;
            position: relative;
            top: 2px;
        } 
    }
}
</style>
<style>

</style>




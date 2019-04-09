<template>
<div id="login">
    <div class="login-box">
        <input type="number" placeholder="输入11位手机号码" id='phone' v-model='phone' v-on:input='phoneInput'>
        <span class='no-user' v-show='phoneShow'><span class="iconfont icongantanhao"></span><span v-text='phoneText'></span></span>
        <!-- <input type="password" placeholder="输入登录号码" id='password' v-model='password' v-on:input='phoneInput'> -->
        <el-input placeholder="输入登录密码" v-model="password" show-password @keyup.enter='login'></el-input>
        <span class='error-pwd' v-show='passwordShow'><span class="iconfont icongantanhao"></span><span v-text='passwordText'></span></span>
        <p class='click-login' @click='login()'>登录</p>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        phone:'15019230830',
        phoneShow:false,
        phoneText:'',
        password:'123456789',
        passwordShow:false,
        passwordText:'',
        requestId:localStorage.getItem('requestId'),
    }
  },
  methods:{
    phoneInput(){//输入整数
        this.phone=this.phone.replace(/^(0+)|[^\d]+/g,'');
    },
    pwdInput(){//输入整数
        // this.password=this.password.replace(/^(0+)|[^\d]+/g,'');
    },
    isLogin(){
        let that=this;
        that.$http.get('/api/job-route-invoker/checkLogin?loginRequestId='+that.requestId )
        .then((res)=>{
            if(res.data.code=='000'){//免密登录成功
                let userInfo=res.data.data;
                window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
                that.$router.push({path:'/companyInfo'}) 
            }
        })
    },
    login(){
        let phoneReg=/^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if(!this.phone){
            this.phoneShow=true;
            this.phoneText='手机号不能为空';
            return;
        }else{
            this.phoneShow=false;
        }
        if(!phoneReg.test(this.phone)){
            this.phoneShow=true;
            this.phoneText='请输入正确的手机格式！';
            this.phone='';
            return;
        }else{
            this.phoneShow=false;
        }
        if(!this.password){
            this.passwordShow=true;
            this.passwordText='密码不能为空';
            return;
        }else{
            this.passwordShow=false;
        }
        let that=this;
        that.$http.get('/api/job-route-invoker/login?mobile='+that.phone+'&password='+that.password)
        .then((res)=>{
            console.log(res)
            if(res.data.code=='000'){
                that.toast = this.$createToast({
                    txt: '登陆成功',
                    type: 'txt',
                    time: 1500,
                    onTimeout: () => {
                        let requestId=res.data.data.requestId;
                        let userInfo=res.data.data.user;
                        window.localStorage.setItem('requestId',requestId);
                        window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
                        setTimeout(function(){
                            window.localStorage.removeItem('requestId');
                        },1000*60*60*24*7)
                        that.$router.push({path:'/companyInfo'})  
                    }
                })
                that.toast.show()    
                                    
            }else if(res.data.code=='669'){
                that.toast = this.$createToast({
                    txt: '密码错误',
                    time: 1500,
                    type: 'txt',                  
                })
                that.toast.show()                      
            }else if(res.data.code=='500'){
                that.toast = this.$createToast({
                    txt: '登陆失败',
                    type: 'txt',
                    time: 1500,
                })
                that.toast.show()                  
            }
           
        })
    }
  },
  created(){
    this.isLogin();

  },
  mounted(){
   
  }
}
</script>
<style scoped lang='scss'>
#login{
    .login-box{
        width: 320px;
        background: #e5e5e5;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -160px;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        border-radius: 6px;
        padding: 40px 30px;
        #phone{
            width: 100%;
            height: 40px;
            padding-left: 15px;
            border: 1px solid #e5e5e5;
            border-radius: 4px;
        }
        #password{
            width: 100%;
            height: 40px;
            padding-left: 10px;
            margin-top: 20px;
            border: 1px solid #e5e5e5;
            border-radius: 2px;
        }
        .no-user,.error-pwd{
            margin: 6px 0;
            color: #e42424;
            display: inline-block;
        }
        .click-login{
            width: 100%;
            height: 40px;
            line-height: 40px;
            margin-top: 80px;
            background: rgb(243, 177, 54);
            color: #fff;
            font-size: 15px;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
        }
        input[type=number] {
            -moz-appearance: textfield;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
}
</style>
<style>
#login .el-input {
    margin-top: 30px;
}
#login .el-input__inner{
    border: none;
    color: #333;
}
#login .el-input__inner::-webkit-input-placeholder {
    color: #666;
    font-size: 13px;
}
#login .el-input .el-input__clear {
    font-size: 20px;
    margin-right: 10px;
}
</style>




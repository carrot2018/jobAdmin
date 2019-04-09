<template>
<div id="login">
    <div class="login-box">
        <div class="logo">
            <img src="../../static/img/logo.png" >
        </div>
        <p class="title">企业招聘服务平台</p>
        <div class="phone-box">
            <span class="iconfont iconshouji1" ></span>
            <input type="number" placeholder="输入11位手机号码" id='phone' v-model='phone' v-on:input='phoneInput'>
            <span class='no-user' v-show='phoneShow'><span class="iconfont icongantanhao"></span><span v-text='phoneText'></span></span>
        </div>
        <div class="pwd-box">  
            <span class="iconfont iconmima"></span> 
            <div class="pwd-input">
                <el-input placeholder="输入登录密码" v-model="password" show-password @keyup.enter='login'></el-input>
            </div> 
            <span class='error-pwd' v-show='passwordShow'><span class="iconfont icongantanhao"></span><span v-text='passwordText'></span></span>
        </div>
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
        width: 360px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -160px;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        border-radius: 6px;
        padding: 32px 40px 45px 40px;
        border: 1px solid #e5e5e5;
        position: relative;
        >.title{
            font-size: 22px;
            color: #142D46;
            text-align: center;
            font-weight: 700;
            padding-bottom: 24px;
            border-bottom: 1px solid #e5e5e5;
            letter-spacing: 2px;
        }
        >.phone-box{
            width: 100%;
            height: 48px;
            line-height: 48px;
            border: 1px solid #e6eef1;
            border-radius: 4px;
            background: #eee;
            margin-top: 32px;
            position: relative;
            .iconfont{
                font-size: 28px;
                margin-left: 6px;
            }
            #phone{
                height: 32px!important;
                line-height: 30px;
                background: #eee;
                position: absolute;
                left: 40px;
                top: 6px;  
                cursor: pointer; 
            }

        }
       .pwd-box{
            width: 100%;
            height: 48px;
            line-height: 48px;
            border: 1px solid #e6eef1;
            border-radius: 4px;
            background: #eee;
            margin-top: 32px;
            position: relative;
            .iconfont{
                font-size: 22px;
                margin-left: 9px;
            }
            .pwd-input{
                width: 200px;
                height: 40px !important;
                line-height: 40px;
                background: #eee;
                position: absolute;
                left: 40px;
                top: 4px;
                cursor: pointer; 
            }

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
            margin-top: 72px;
            background: #FF607a;
            color: #fff;
            font-size: 17px;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 700;
            letter-spacing: 6px;
        }
        .logo{
            position: absolute;
            left: 0;
            top: 0; 
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
.el-input{
    position: absolute;
    left: 0;
    top: 0;  
}
#login .el-input__inner{
    border: none;
    color: #333;
    background: #eee!important;
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




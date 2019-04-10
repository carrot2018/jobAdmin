<template>
<div id="login">
    <div class="login-box">
        <p class="logo">
            <img src="../../static/img/logoLogin.png" >
        </p>
        <p class="title">企业招聘服务平台</p>
        <div class="phone-box">
            <img src="../../static/img/phone.png" >
            <input type="number" placeholder="输入11位手机号码" id='phone' v-model='phone' v-on:input='phoneInput'>
           
        </div>
        <p v-show='phoneShow' class='no-user'>
            <span class="iconfont icongantanhao"></span><span v-text='phoneText'></span>
        </p>
        <div class="pwd-box">  
            <img src="../../static/img/Password.png" > 
            <div class="pwd-input">
                <el-input placeholder="输入登录密码" v-model="password" show-password @keyup.enter='login'></el-input>
            </div> 
        </div>
        <p class='error-pwd' v-show='passwordShow'>
            <span class="iconfont icongantanhao"></span><span v-text='passwordText'></span>
        </p>
        <p class='click-login' @click='login()'>登录</p>

    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        // 15019230830
        // 123456789
        phone:'',
        // phone:'15019230830',
        phoneShow:false,
        phoneText:'',
        password:'',
        // password:'123456789',
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
        that.$http.get('/api/checkLogin?loginRequestId='+that.requestId,{})
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
        that.$http.get('/api/login?mobile='+that.phone+'&password='+that.password)
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
            }else if(res.data.code=='668'){
                this.phoneShow=true;
                this.phoneText="账号不存在";
                return;            
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
    background: url('../../static/img/bg.jpg') no-repeat;
    background-size: 100% 100%;
    height: 100%;
    .login-box{
        width: 400px;
        height: 412px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        // transform: translateY(-50%);
        // -webkit-transform: translateY(-50%);
        margin-top: -206px;
        border-radius: 6px;
        padding: 32px 40px 45px 40px;
        z-index: 999;
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
            img{
                margin-left: 14px;
                height: 28px;
                margin-top: 10px;
            }
            #phone{
                width: calc(100% - 45px);
                height: 47px!important;
                line-height: 47px;
                background: #eee;
                position: absolute;
                left: 45px;
                top: 0;  
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
            img{
                margin-left: 12px;
                height: 26px;
                margin-top: 10px;
            }
            .pwd-input{
                width: calc(100% - 45px);
                height: 46px !important;
                line-height: 46px;
                background: #eee;
                position: absolute;
                left: 45px;
                top: 0;
            }

       }
        .no-user,.error-pwd{
            color: #FF607a;
            height: 20px;
            line-height: 20px;
        }
        .click-login{
            width: 100%;
            height: 48px;
            line-height: 48px;
            margin-top: 60px;
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
            top: -70px;
            left: 50%; 
            transform: translateX(-50%);
            img{
                width: 84%;
                margin-left: 7%;
            }
        }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
    }
    input[type="number"]{-moz-appearance:textfield;}
}
</style>
<style>
#login .el-input{
    position: absolute;
    left: 0;
    top: 0;  
}
#login .el-input__inner{
    border: none!important;
    color: #333!important;
    background: #eee!important;
    padding: 0!important;
}
#login .el-input__inner::-webkit-input-placeholder,#login input::-webkit-input-placeholder {
    color: #666;
    font-size: 16px;
}
#login .el-input .el-input__clear {
    font-size: 20px;
    margin-right: 10px;
}
</style>




<template>
<div id="menu">
<!-- 新用户认证 -->
    <div class="logo">
        <div class="title">
            <img src="../../static/img/logo.png" >
            <span>• 企业版招聘</span>
        </div>
        <div class="layout">
            <!-- <span v-show='interview'>面试安排</span> -->
            <!-- <span>我的订单</span> -->
            <span>
                <img src="../../static/img/huangguan.png" >
                <span>账号权益</span>
            </span>
            <span class='click-layout'>
                <span v-text='userInfo.name' @click='showLayout()'></span>
                <span class="iconfont iconxiala" @click='showLayout()'></span>
                <div v-show="isLayout" @click='clickLayout()' class="layout-Btn">
                  <i></i>
                  <span>退出</span> 
                </div>
            </span>
        </div>
    </div>
    <div class="content-box" @click='closeLayout()'>
        <div class="left">
            <div class="logo-title">
        
                    <el-menu
                        router
                        :default-active="thisRoute"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#142D46"
                        text-color="#ffffff"
                        >
                        <!-- <el-submenu index="1">
                            <template slot="title">
                                <span>发布职位</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu> -->
                        <el-menu-item index="/releasePositions">
                            <template slot="title">
                                <i class="img1 img"></i>
                                <span>发布职位</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/allPosition">
                            <template  slot="title">
                                <i class="img2 img"></i>
                                <span>职位管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/resume">
                            <template slot="title">
                                <i class="img3 img"></i>
                                <span>简历管理</span>
                            </template>
                        </el-menu-item>
                        <!-- <el-menu-item index="4">
                            <span slot="title">搜索简历</span>
                        </el-menu-item> -->
                        <!-- <el-menu-item index="5">
                            <span slot="title">资质认证</span>
                        </el-menu-item> -->
                        <el-menu-item index="/companyInfo">
                            <template slot="title">
                                <i class="img4 img"></i>
                                <span>企业信息</span>
                            </template>
                        </el-menu-item>
                    </el-menu>

            </div>
        </div>
        <div class="right" id='scrollBox'>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      thisRoute:'',
      requestId:localStorage.getItem('requestId'),
      isLayout:false
    }
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },

    // 显示/关闭 退出登录按钮
    showLayout() {
      this.isLayout === false ? this.isLayout = true : this.isLayout = false;
    },

    // 关闭退出登录按钮
    closeLayout() {
      this.isLayout = false
    },

    // 退出登录
    clickLayout(){
        this.$http.get('/api/loginOut?requestId='+this.requestId,
        ).then((res)=>{
            console.log('2323',res)
            if(res.data.code=='202'){
                this.toast = this.$createToast({
                    txt: '退出成功',
                    type: 'txt',
                    time: 1500,
                    onTimeout: () => {                   
                        window.localStorage.removeItem('requestId'); 
                        window.localStorage.removeItem('userInfo');  
                        this.$router.push('login');                                           
                    }
                })
                this.toast.show() 
            }
            if(res.data.message=='退出登陆失败'){
                this.toast = this.$createToast({
                    txt: '退出登陆失败',
                    type: 'txt',
                    time: 1500,                  
                })
                this.toast.show() 
            }

           
        })
    }

  },
  created(){
    let userInfo=localStorage.getItem('userInfo');
    this.userInfo=JSON.parse(userInfo);
    console.log(this.userInfo)

  },
  mounted(){
      let height=$('.content-box .right').height();
      console.log(height)
      $('.content-box .left').height(height);
      this.thisRoute = this.$route.fullPath;

  },

  watch: {
    $route(to,from){
      // console.log(to)
      // 监听路由变化，高亮菜单选项
      this.thisRoute = to.path
      sessionStorage.removeItem('hasRelease');
    }
  }
}
</script>
<style scoped lang='scss'>
.img{
  display: inline-block;
    width: 18px; 
    height: 18px; 
}
.img1 {
  background-image:url('../../static/img/sidebar-no-1.png');
  background-size: 100%;
  background-repeat: no-repeat;
}
.img2 {
  background-image:url('../../static/img/sidebar-no-2.png');
  background-size: 100%;
  background-repeat: no-repeat;
}
.img3 {
  background-image:url('../../static/img/sidebar-no-3.png');
  background-size: 100%;
  background-repeat: no-repeat;
}
.img4 {
  background-image:url('../../static/img/sidebar-no-4.png');
  background-size: 100%;
  background-repeat: no-repeat;
}
#menu{
    height: 100%;
    overflow: hidden;
    >.logo{
        height: 70px;
        padding: 0 35px;
        >.title{
            float: left;
            line-height: 70px;
            height: 70px;
            img{
                display: inline-block;
                height: 32px;
                position: relative;
                top: 9px;
            }
            >span{
                font-size: 22px;
                color: #142D46;
                font-family:'PingFang SC';
                margin-left: 4px;
            }
            
        }
        >.layout{
            float: right;
            height: 70px;
            line-height: 70px;
            >span{
                margin-right: 30px;   
                cursor: pointer;
                img{
                    width:18px;
                    position: relative;
                    top: 2px;
                }
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
            .click-layout {
              position: relative;
              .layout-Btn {
                position: absolute;
                height: 48px;
                width: 144px;
                z-index: 888;
                right: 0;
                
                display: flex;
                justify-content: center;
                align-items: center;
                background: white;
                border: 1px solid #eee;
                border-radius: 6px;
              
                >i {
                  display: inline-block;
                  height: 18px;
                  width: 18px;
                  background-image: url('../../static/img/exit.jpg');
                  background-size: 100%;
                  margin-right: 5px;
                }
                >span {
                  display: inline-block;
                  font-size: 18px;
                  color: #6b6b6b;
                  letter-spacing: 5px;
                }
              }
            }
        }
    }      
}
.content-box{
    position: relative;
    width: 100%;
    height: calc(100% - 70px);
    .left{
        width: 180px;
        background: #142D46;
        min-height: 100%;
        height: 100%;
        float: left;
        padding-top: 25px;
        .logo-title{
            // span{
            //     color: #fff;
            //     font-size: 16px;
            //     opacity: .5;
            // }
        }
        
    } 
    .right{
        width: calc(100% - 180px);
        height: 100%;
        overflow-y: auto;
        background: #f9fcfe;
        margin-left: 180px;
        padding: 0 250px;
        -webkit-box-shadow: #eee 0px 0px 10px 1px inset;//边框内阴影
        box-shadow: #eee 0px 0px 10px 1px inset;//边框内阴影
    }
}
/deep/ .el-menu {
  border-right: none;
  background: #142D46;
}
/deep/ .el-menu-item{
      padding: 0 35px;
    text-align: center;
    color: #fff;
    span {
    font-size: 16px;
    color: #fff;
    opacity: .5;
  }
}
/deep/ .el-menu-item.is-active {
  color: #fffefe;
  background-image: url('../../static/img/active.png');
  background-repeat: no-repeat;
  background-position: 0 -2px;
    .img1 {
      background-image:url('../../static/img/sidebar-yes-1.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .img2 {
      background-image:url('../../static/img/sidebar-yes-2.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .img3 {
      background-image:url('../../static/img/sidebar-yes-3.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .img4 {
      background-image:url('../../static/img/sidebar-yes-4.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    span {
    font-size: 16px;
    color: #fffefe;
    opacity: 1;
  }

}

/deep/ .el-menu-item:focus,
/deep/ .el-menu-item:hover {
    // background-image: url('../../static/img/active.png');
    // background-repeat: no-repeat;
    // background-position: 0 -2px;
    color: #fffefe;
}
</style>
<style>
/* .el-menu {
    border-right: none;
    background: #142D46;
    width: 180px;
}
.el-menu:hover li{
    background: #142D46;
    width: 180px;
}
.el-menu-item{
    text-align: center;
}
.el-menu-item, .el-submenu__title {
    height: 46px!important;
    line-height: 46px!important;
} */

</style>






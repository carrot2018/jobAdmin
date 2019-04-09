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
            <span>
                <span v-text='userInfo.name'></span>
                <span class="iconfont iconxiala"></span>
            </span>
        </div>
    </div>
    <div class="content-box">
        <div class="left">
            <div class="logo-title">
                <el-col :span="12">
                    <el-menu
                        default-active=""
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
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
                        <el-menu-item index="1">
                            <router-link to="/releasePositions" slot="title">
                                <img src="../../static/img/sidebar-no-1.png">
                                <span>发布职位</span>
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link to="/allPosition" slot="title">
                                <img src="../../static/img/sidebar-no-2.png">
                                <span>职位管理</span>
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <router-link to="/resume" slot="title">
                                <img src="../../static/img/sidebar-no-3.png">
                                <span>简历管理</span>
                            </router-link>
                        </el-menu-item>
                        <!-- <el-menu-item index="4">
                            <span slot="title">搜索简历</span>
                        </el-menu-item> -->
                        <!-- <el-menu-item index="5">
                            <span slot="title">资质认证</span>
                        </el-menu-item> -->
                        <el-menu-item index="6">
                            <router-link to="/companyInfo" slot="title">
                                <img src="../../static/img/sidebar-no-4.png">
                                <span>企业信息</span>
                            </router-link>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
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

  }
}
</script>
<style scoped lang='scss'>
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
        padding-top: 20px;
        .logo-title{
            img{
                width: 18px; 
                height: 18px; 
            }
            span{
                color: #fff;
                font-size: 16px;
                opacity: .5;
            }
        }
        
    } 
    .right{
        width: calc(100% - 180px);
        height: 100%;
        overflow-y: auto;
        background: #f9fcfe;
        margin-left: 180px;
        padding: 0 200px;
        -webkit-box-shadow: #eee 0px 0px 10px 1px inset;//边框内阴影
        box-shadow: #eee 0px 0px 10px 1px inset;//边框内阴影
    }
}
</style>
<style>
.el-menu {
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
}
</style>






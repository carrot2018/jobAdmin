<template>
<div id="menu">
<!-- 新用户认证 -->
<div class="menu-box">
    <div class="left">
        <img src="../../static/img/logo.png" >
        <div class="logo-title">
           <!-- <div>发布职位</div>
           <div>职位管理</div>
           <div>简历管理</div>
           <div>搜索简历</div>
           <div>资质认证</div>
           <div>企业信息</div> -->
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
                    <router-link to="/releasePositions" slot="title">发布职位</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/allPosition" slot="title">职位管理</router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="/resume" slot="title">简历管理</router-link>
                </el-menu-item>
                <!-- <el-menu-item index="4">
                    <span slot="title">搜索简历</span>
                </el-menu-item> -->
                <!-- <el-menu-item index="5">
                    <span slot="title">资质认证</span>
                </el-menu-item> -->
                 <el-menu-item index="6">
                    <router-link to="/companyInfo" slot="title">企业信息</router-link>
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

  },
  mounted(){
   
  }
}
</script>
<style scoped lang='scss'>
#menu{
    width: 100%;
    height: 100%;
    .menu-box{
        width: 100%;
        height: 100%;
        position: relative;
        .left{
            width: 200px;
            height: 100%;
            background: yellowgreen;
            img{
                width: 80px;
                margin-left: 60px;
                margin-top: 20px;
                border-radius: 4px;
            }
        } 
        .right{
            width: calc(100% - 200px);
            height: 100%;
            position: absolute;
            left: 200px;
            top: 0;
        }
    }
}
</style>
<style>
.el-col-12 {
    width: 100%;
    margin-top: 20px;
}
.el-menu {
    border-right: none;
    background: yellowgreen;

}
.el-menu-item{
    text-align: center;
}
.el-menu-item * {
vertical-align: middle;
display: inline-block;
width: 100%;
height: 100%;
}
</style>






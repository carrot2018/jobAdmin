<template>
<div id="certification">
<!-- 新用户认证 -->
<div class="certification-box">
    <div class="left">
        <img src="../../static/img/logo.png" >
    </div>
    <div class="right">
        <div class="content-box">
            <h3>
                <span>企业资质 ＞ 认证营业执照</span><i>请提交以下资料，审核后将开启招聘服务</i>
            </h3>
            <div class="step">
                <el-steps :active="1" align-center>
                    <el-step title="填写资料" ></el-step>
                    <el-step title="平台审核" ></el-step>
                    <el-step title="开启服务" ></el-step>
                </el-steps>
            </div>
            <div class="content">
                <p class='title'>
                    <span class="iconfont icongantanhao"></span>
                    <span>请上传“营业执照”，需年检章齐全，当年注册除外</span>
                </p>
                <div class="enterprise">
                    <div class="name">
                        <span>企业名称 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                        <input type="text" placeholder="请填写企业名称" id='company'>
                    </div>
                    <div class="type">
                        <span>营业执照类型 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                        <div>
                        </div>
                    </div>
                </div>
            </div>
           

           
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
        active:1
    }
  },
  methods:{


  },
  created(){

  },
  mounted(){
   
  }
}
</script>
<style scoped lang='scss'>
#certification{
    width: 100%;
    height: 100%;
    .certification-box{
        width: 100%;
        height: 100%;
        position: relative;
        .left{
            width: 120px;
            height: 100%;
            background: pink;
            img{
                width: 80px;
                margin-left: 20px;
                margin-top: 20px;
                border-radius: 4px;
            }
        } 
    }
}
.right{     
    width: calc(100% - 120px);
    height: 100%;
    position: absolute;
    left: 120px;
    top: 0;
    .content-box{
        padding: 50px 40px 0 40px;
        h3{
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            margin-right: 20px;
            span{
                font-size: 16px;
                font-weight: 700;
            }
            i{
                font-style: normal;
                font-size: 13px;
                color: #999;
                position: relative;
                top: 1px;
                left: 8px;
            }
        }
        .step{
           padding: 30px 0;
        }
        .content{
            padding: 0 50px;
            .title{
                color: #666;
                span:nth-of-type(1){
                    font-size: 18px;
                    color: #409EFF;
                }
                span:nth-of-type(2){
                    margin-left: 6px;
                    font-size: 13px;
                    position: relative;
                    top: -2px;
                }
            }
            .enterprise{
                >div{
                    padding: 10px 0;
                    >span:nth-of-type(1){
                        color: #333;
                        width: 120px;
                        text-align: right;
                        display: inline-block;
                        font-size: 15px;
                        span{
                            font-size: 16px;
                            color: red;
                        }
                    }
                    #company{
                        height: 36px;
                        border: 1px solid #ccc;
                        width: 240px;
                        border-radius: 3px;
                        padding-left: 10px;
                        margin-left: 10px;
                    }
                }
            }
        }


      

    }
}
</style>
<style>
.el-step.is-center .el-step__line {
    left: 60%;
    right: -40%;
}
</style>




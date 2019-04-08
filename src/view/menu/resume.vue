<template>
<div id="resume">
  <div class='content-box'>
        <!-- <lay-out></lay-out> -->
        <h3>
            <span>简历管理</span>
        </h3>
        <div class="title">
            <span @click='checkTitle(1)'>主动投递(10) </span>
        </div>
        <div class="list-box">
            <div class="every" v-for='i in arr' @click='preview(i.xxx)'>
                <p class="title">
                    <span>2019-1-22 17:15</span>
                    <span>应聘:厨师长</span>
                </p>
                <div class="list" >
                    <p>
                        <span>
                            <span>行政管理</span>
                            <i></i>
                        </span>
                        <span>厨艺作品</span>                      
                    </p>
                    <p>
                        <span>45岁 / 男 / 黑龙江籍 / 当前在深圳-光明新区</span>                     
                    </p>
                    <p>
                        <span>工作环境干净</span><span>工工作环境干净作环境干净</span><span>工作环工作环境干净境干净</span> 
                    </p>

                </div>
            </div>
           
        
        </div>
       
  </div>
</div>
</template>
<script>
import Vue from 'vue';
import CKEDITOR from 'CKEDITOR';
// import layOut from '../layOut.vue'//退出
export default {
//   components: { layOut },
  data () {
    return {
      arr:[
        {xxx:1},
        {xxx:2},
        {xxx:1},
        {xxx:2},
      ]
       

    }
  },
  methods:{
    preview(item){//预览简历
        if(item==1){
            this.$router.push('/cookerTel')
        }else{
            this.$router.push('/notCookerTel')
        }
        

    }
    
   
  },
  created(){

  },
  mounted(){
   
  }
}
</script>
<style scoped lang='scss'>
#resume{
    height: 100%;
    overflow-y: auto;
}
.content-box{
    height: 100%;
    overflow-y: auto;
    padding: 50px 80px 40px 40px;
    h3{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        span{
            font-size: 16px;
            font-weight: 700;
        }

    }
    >.title{
        padding-top: 25px;
        span{
            cursor: pointer;
        }
        span:nth-of-type(1){
            font-size: 16px;
        }
        span:nth-of-type(2){
            color: #666;
            font-size: 16px;
            margin-left: 50px;
        }
        span:nth-of-type(3){
            color: #999;
            font-size: 16px;
            margin-left: 50px;
        }
    }
     .list-box{
        .every{
            margin-top: 25px;
            >.title{
                color: #999;
                font-size: 12px;
            }
            .list{
                cursor: pointer;
                padding: 18px;
                border: 1px solid #e5e5e5;
                border-radius: 3px;
                box-shadow: 2px 2px 1px 1px #eee;
                margin-top: 8px;
                >p:nth-of-type(1){                    
                    >span:nth-of-type(1){
                        position: relative;
                        i{
                            position: absolute;
                            width: 7px;
                            height: 7px;
                            background: red;
                            border-radius: 7px;
                            right: -8px;
                            top: -4px;
                        }
                        
                    }
                    >span:nth-of-type(2){
                        display: inline-block;
                        margin-left: 20px;
                        height: 24px;
                        line-height: 23px;
                        width: 60px;
                        text-align: center;
                        border: 1px solid #666;
                        border-radius: 2px;
                        font-size: 12px;
                    }                      
                }
                >p:nth-of-type(2){
                    margin-top: 14px;
                    color: #666;                     
                }
                >p:nth-of-type(3){
                    margin-top: 14px;
                    span{
                        padding: 4px 6px;
                        display: inline-block;
                        background: #eee;
                        border-radius: 2px;
                        margin-right: 10px;
                        font-size: 12px;
                    }
                    
                }
                    >p:nth-of-type(4){
                        margin-top: 12px;
                        color: #999;
                        font-size: 12px;
                        span:nth-of-type(2){
                        float: right;
                        }
                        
                    }
            }
        }


        
    }

}
</style>





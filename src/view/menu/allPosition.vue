<template>
<div id="allPosition">
  <div class='content-box'>
        <h3>
            <span>职位管理</span>
        </h3>
        <div class="title">
            <span @click='checkTitle(1)' :class='{color:template==1}'>全部职位<i v-show='allNum'>({{allNum}})</i></span>
            <span @click='checkTitle(2)' :class='{color:template==2}'>发布中<i v-show='releaseNum'>({{releaseNum}})</i></span>
            <span @click='checkTitle(3)' :class='{color:template==3}'>已关闭
                <i v-show='shutDown'>({{shutDown}})</i></span>
        </div>
        <div class="list-box">
            <div class="content">
                <div class='list' :class="{shutDown:template==3 || template==1&&item.publishStatus==2}" v-for='item in list'>
                    <p>
                        <span>{{item.name}}</span>
                        <span @click="goResume(item.name)">主动投递 <i>{{item.sendNum}}</i>&gt;&gt;</span>
                        <span>
                            <span>
                                <span v-show='item.publishStatus==1&&item.refresh==0' class='refresh' @click='toRefresh(item,$event)'>刷新<i></i></span>
                                <span v-show='item.publishStatus==1&&item.refresh==1' class='hasRefresh'>已刷新</span>
                                <span v-show='item.publishStatus==2' @click='hasShutDown(item,1)'>发布</span>                               
                            </span>
                            <span @click='editor(item)'>编辑</span>
                            <span>
                                <!-- "publishStatus": 职位状态 1发布中 显示刷新已刷新和关闭 2关闭 显示发布和删除 -->
                                <span v-show='item.publishStatus==1' @click='hasShutDown(item,2)'>关闭</span>
                                <span v-show='item.publishStatus==2' @click='deleteList(item)'>删除</span>
                            </span>
                        </span>
                    </p>
                    <p>
                        <span>{{item.paytype==1?item.paymentMinStr+"~"+item.paymentMaxStr:item.paymentMax}}元 / <span v-text='item.paytype==1?"月":"日"'></span></span>
                        <span><span class="iconfont iconjiguan"></span>{{item.cityName+'-'+item.areaName}}</span>
                    </p>
                    <p v-show='item.remark'>
                        <span v-for='v in item.remark.split(",")'>{{v}}</span>
                    </p>
                    <p>
                        <span  v-show='item.updatedAt'>{{item.updatedAt|formatDate}}最后刷新</span>
                        <span>{{item.createdAt|formatDate}}发布</span>
                    </p>

                </div>
                <div class="page" v-show='page'>
                    <el-pagination @current-change="handleCurrent" 
                        :current-page.sync="pageNum"
                        :page-size="pageSize"
                        background
                        layout="prev, pager, next"
                        :total='allTotal'>
                    </el-pagination>
                </div>               
            </div>
          
        </div>  
  </div>
</div>
</template>
<script>
import Vue from 'vue';
import CKEDITOR from 'CKEDITOR';
import {formatDate} from '../../common/js/formatDate.js';
export default {
  data () {
    return {
        template:1,
        allNum:'',
        releaseNum:'',
        shutDown:'',
        pageNum:1,
        pageSize:10,
        list:[],
        allTotal:0,
        page:false,//分页显示
        requestId:localStorage.getItem('requestId'),
        stateColor: '#727272'
    }
  },
  methods:{
    handleCurrent(val) {//送检列表翻页
        this.pageNum = val;//val默认1
        console.log(this.pageNum)
        this.getList();
    },
    checkTitle(status){
        this.template=status;
        this.pageNum=1;
        console.log(this.template)
        this.getAll();
        this.getRelease();
        this.getShutDown();
        this.getList();
    },
    getList(){
        let that=this;
        let params={
            pageNum:this.pageNum,
            pageSize:this.pageSize
        }
        that.$http.post('/api/job/selectJobOfPageList?pushStatus='+that.template+'&requestId='+that.requestId,params
        ).then((res)=>{
            // console.log(res)
             if(res.data.code=='202'){
                this.list=res.data.data.jobs;
                // console.log(this.list)
                this.allTotal=res.data.data.totalRecord;  
                if(this.allTotal>this.pageSize){
                    this.page=true;
                }else{
                    this.page=false;
                }       
             }
           
        })
    },
    getAll(){
        console.log(this.requestId)
        this.$http.get('/api/job/countJobs?requestId='+this.requestId,{
        }).then((res)=>{
            if(res.data.code=='202'){
                this.allNum=res.data.data;
            }
              
        })
    },
    getRelease(){
        this.$http.get('/api/job/countJobReleases?requestId='+this.requestId,{
        }).then((res)=>{
            if(res.data.code=='202'){
                this.allNum=res.data.data;
            }
        })
    },
    getShutDown(){
        this.$http.get('/api/job/countJobCloses?requestId='+this.requestId,{
        }).then((res)=>{
            if(res.data.code=='202'){
                this.shutDown=res.data.data;
            }
        })
    },
    hasShutDown(item,index){//1 发布中 2 关闭
        let that=this;
        that.$http.post('/api/job/updateJobsById?requestId='+that.requestId,{
            publishStatus:index,
            id:item.id
        }
        ).then((res)=>{
            console.log(res)
            if(res.data.code=='202'){
                if(index==1){
                    if(res.data.code=='202'){
                        this.$message({
                            type: 'success',
                            message: '发布成功!',
                            center: true
                        });
                        this.pageNum=1;
                        this.getAll();
                        this.getRelease();
                        this.getShutDown();
                        this.getList();
                    }
                }
                if(index==2){
                    if(res.data.code=='202'){
                        this.$message({
                            type: 'success',
                            message: '关闭成功!',
                            center: true
                        });
                        this.pageNum=1;
                        this.getAll();
                        this.getRelease();
                        this.getShutDown();
                        this.getList();
                    }
                }
            }
           
           
            
        }).catch((error)=>{
        })
    },
    deleteList(item){//删除
        let that=this;
        that.$http.get('/api/job/deleteJobsById/'+item.id+'?requestId='+that.requestId,{
        }
        ).then((res)=>{
            console.log(res)
            if(res.data.code=='202'){
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                    center: true
                });
                this.getAll();
                this.getRelease();
                this.getShutDown();
                this.getList();
            }

               
        }).catch((error)=>{
        })
    },
    toRefresh(item,event){
        let that=this;
        that.$http.get('/api/job/setLockFlushZpJobsByOneDay/'+item.id+'?requestId='+that.requestId,{
        }
        ).then((res)=>{         
            if(res.data.code=='202'){
                this.$message({
                    type: 'success',
                    message: '刷新成功!',
                    center: true,
                });
                $(event.target).text('已刷新')
                $(event.target).css('color','#999');
                // this.pageNum=1;
                // this.getList(); 
                // $('#scrollBox').scrollTop(0)
            }
           
        }).catch((error)=>{
        })
    },
    editor(item){
        this.$router.push({
    　　　　path: '/releasePositions',
    　　　　query:{id:item.id }　
    　　});
       
    },

    // 查看主动投递该类简历
    goResume(name) {
      this.$router.push({
        path:'/resume',
        query:{jobName:name}
      })
    }

   
  },
  filters:{
    //时间戳
    formatDate(time) {
        return formatDate(time);
    },
  },
  created(){
    // this.requestId=localStorage.getItem('requestId');
    this.getAll();
    this.getRelease();
    this.getShutDown();
    this.getList();
  },
  mounted(){
   
  }
}
</script>
<style scoped lang='scss'>
#allPosition{
    // height: 100%;
    // min-height: 100%;
    // #00b7ee
}
.content-box{
    padding: 27px 0 40px 0;
    h3{
        height: 50px;
        line-height: 50px;
        span{
            color: #142D46;
            font-size: 24px;
            font-weight: 700;
        }

    }
    >.title{
        padding-top: 17px;
        padding-bottom: 18px;
        border-bottom: 1px solid #e6eef1;
        span{
            color: #727272;
            font-size: 16px;
            cursor: pointer;
            i{
                font-style: normal;
            }
        }
        span:nth-of-type(2),span:nth-of-type(3){
            margin-left: 50px;
        }
        .color{
            color:#FF5571;
        }
        
    }
    .list-box{
        .list{
            cursor: pointer;
            padding: 18px;
            border-radius: 8px;
            box-shadow: 0px 4px 12px rgba($color: #ececef, $alpha: 0.4);
            margin-top: 25px;
            margin-bottom: 20px;
            background: #fff;
            >p:nth-of-type(1){
                    display: -webkit-box;
                    display: -moz-box; 
                    display: -webkit-flex;
                    display: -moz-flex; 
                    display: -ms-flexbox; 
                    display: flex; 
                    >span:nth-of-type(1){
                        flex: 2;
                        font-size: 24px;
                        color: #142d46;
                    }
                    >span:nth-of-type(2){
                        text-align: center;
                        flex: 2;
                        font-size:18px;
                        i{
                            
                            font-style: normal;
                            color: #ff5571;
                        }
                    }
                    >span:nth-of-type(3){
                        flex: 2;
                        text-align: right;
                        font-size: 18px;
                        >span{
                            margin-right: 15px;
                            color: #00b7ee;                       
                        }
                        >span:nth-of-type(1){
                            .refresh{
                                position: relative;
                                >i{
                                    position: absolute;
                                    width: 7px;
                                    height: 7px;
                                    background: #FF5571;
                                    border-radius: 7px;
                                    right: -8px;
                                    top: -4px;
                                }
                            }
                            .hasRefresh{
                                color: #999;
                            }
                          
                        }
                    }
            }
            >p:nth-of-type(2){
                margin-top: 16px;
                    color: #666;
                    span:nth-of-type(2){
                        margin-left: 15px;
                        .iconjiguan{
                            font-size: 18px;
                            position: relative;
                            top: 2px;
                        }
                    }
            }
            >p:nth-of-type(3){
                margin-top: 14px;
                span{
                    padding: 4px 6px;
                    display: inline-block;
                    background: #f5f6fa;
                    border-radius: 2px;
                    margin-right: 10px;
                    font-size: 12px;
                    color: #6a6a6a;
                }
                
            }
            >p:nth-of-type(4){
                margin-top: 18px;
                color: #999;
                font-size: 14px;
                padding-right: 12px;
                span:nth-of-type(2){
                float: right;
                }
                
            }
        }
        .shutDown{
            cursor: pointer;
            padding: 18px;
            border-radius: 8px;
            box-shadow: 0px 4px 12px rgba($color: #ececef, $alpha: 0.8);
            margin-top: 25px;
            >p:nth-of-type(1){  
                    color: #999;               
                    display: -webkit-box;
                    display: -moz-box; 
                    display: -webkit-flex;
                    display: -moz-flex; 
                    display: -ms-flexbox; 
                    display: flex; 
                    >span:nth-of-type(1){
                        flex: 2;
                        font-size: 24px;
                        // font-weight: 700;
                        color: #999;
                    }
                    >span:nth-of-type(2){
                        text-align: center;
                        flex: 2;
                        font-size:18px;
                        i{
                            font-style: normal;
                            color: #999;
                        }
                    }
                    >span:nth-of-type(3){
                        flex: 2;
                        text-align: right;
                        font-size: 18px;
                        >span{
                            margin-right: 15px;
                            color: #999;                       
                        }
                        >span:nth-of-type(1){
                            position: relative;
                            i{
                                position: absolute;
                                width: 7px;
                                height: 7px;
                                background: #e5e5e5;
                                border-radius: 7px;
                                right: -8px;
                                top: -4px;
                            }
                        }
                    }
            }
            >p:nth-of-type(2){
                margin-top: 14px;
                color: #999;
                span:nth-of-type(1){
                    color: #999;
                }
                span:nth-of-type(2){
                    margin-left: 15px;
                    color: #999;
                }
            }
            >p:nth-of-type(3){
                margin-top: 14px;
                color: #999;
                span{
                    padding: 4px 6px;
                    display: inline-block;
                    background: #eee;
                    border-radius: 2px;
                    margin-right: 10px;
                    font-size: 12px;
                    color: #999;
                }
                
            }
            >p:nth-of-type(4){
                    margin-top: 18px;
                    color: #999;
                    font-size: 14px;
                    padding-right: 12px;
                span:nth-of-type(2){
                    float: right;
                }
                
            }
        }
        .shutDown:hover{
            box-shadow: 0px 4px 12px rgba($color: #e5e5e5, $alpha: 1);
             >p:nth-of-type(1){
                    >span:nth-of-type(3){
                        >span{                           
                            color: #00b7ee;                       
                        }                     
                    }
            }
            
        }
        .page{
            margin-top: 20px;
            text-align: center;
        }


        
    }
}
</style>
<style>
/* 分页样式 */
.el-pager li {
    height: 36px!important;
    line-height: 36px!important;
    min-width: 36px!important;
    font-size: 16px!important;
}
.el-pagination button, .el-pagination span:not([class*=suffix]) {
    height: 36px!important;
    line-height: 36px!important;
    min-width: 36px!important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #00b7ee!important;
    color: #FFF!important;
    font-size: 16px!important;
}
.el-pager li:hover {
    color: #00b7ee!important;
}
</style>






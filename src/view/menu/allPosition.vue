<template>
<div id="allPosition">
  <div class='content-box'>
        <!-- <lay-out></lay-out> -->
        <h3>
            <span>职位管理</span>
        </h3>
        <div class="title">
            <span @click='checkTitle(1)'>全部职位(<i v-text='allNum'></i>) </span>
            <span @click='checkTitle(2)'>发布中(<i v-text='releaseNum'></i>) </span>
            <span @click='checkTitle(3)'>已关闭(<i v-text='shutDown'></i>)</span>
        </div>
        <div class="list-box">
            <div class="content">
                <div class='list' :class="{shutDown:template==3 || template==1&&item.publishStatus==2}" v-for='item in list'>
                    <p>
                        <span>{{item.name}}</span>
                        <span>主动投递 <i>{{item.sendNum}}</i></span>
                        <span>
                            <span>
                                <span v-show='item.publishStatus==1&&item.refresh==0' class='refresh' @click='toRefresh(item)'>刷新<i></i></span>
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
                        <span>{{parseInt(item.paymentMin/1000)+'k~'+parseInt(item.paymentMax/1000)+'k'}} 元/<span v-text='item.paytype==1?"月":"日"'></span></span>
                        <span>{{item.cityName+'-'+item.areaName}}</span>
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
            <!-- <div class="release" v-show='template==2'>
                <div class="list" v-for='item in list'>
                    <p>
                        <span>{{item.name}}</span>
                        <span>主动投递 <i>{{item.sendNum}}</i></span>
                        <span>
                            <span>刷新<i></i></span>
                            <span>编辑</span>
                            <span>关闭</span>
                        </span>
                    </p>
                    <p>
                        <span>{{parseInt(item.paymentMin/1000)+'k~'+parseInt(item.paymentMax/1000)+'k'}} 元/月</span>
                        <span>{{item.cityName+'-'+item.areaName}}</span>
                    </p>
                    <p>
                        <span v-for='v in item.remark.split(",")'>{{v}}</span>
                    </p>
                    <p>
                        <span>{{item.updatedAt|formatDate }}最后刷新</span>
                        <span>2019-1-26 17:00发布</span>
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
            </div> -->
            <!-- <div class="shut-down-box" v-show='template==3'>
                <div class="shut-down" v-for='item in list'>
                    <p>
                        <span>{{item.name}}</span>
                        <span>主动投递 <i>{{item.sendNum}}</i></span>
                        <span>
                            <span>刷新<i></i></span>
                            <span>编辑</span>
                            <span>关闭</span>
                        </span>
                    </p>
                    <p>
                        <span>{{parseInt(item.paymentMin/1000)+'k~'+parseInt(item.paymentMax/1000)+'k'}} 元/月</span>
                        <span>{{item.cityName+'-'+item.areaName}}</span>
                    </p>
                    <p>
                        <span v-for='v in item.remark.split(",")'>{{v}}</span>
                    </p>
                    <p>
                        <span>{{item.updatedAt|formatDate }}最后刷新</span>
                        <span>2019-1-26 17:00发布</span>
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
            </div> -->

        </div>  
  </div>
</div>
</template>
<script>
import Vue from 'vue';
import CKEDITOR from 'CKEDITOR';
import {formatDate} from '../../common/js/formatDate.js';
// import layOut from '../layOut.vue'//退出
export default {
//   components: { layOut },
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
        that.$http.post('/api/job-route-invoker/job/selectJobOfPageList?pushStatus='+that.template+'&requestId='+that.requestId,params
        ).then((res)=>{
            console.log(res)
            // if(res.data.code=='666'){
            //     that.$message({
            //         message: '请先登录',
            //         center: true,
            //         onClose:function(){
            //             that.$router.push('/login');
            //         }
            //     });
            // }else{
                this.list=res.data.data.jobs;
                console.log(this.list)
                this.allTotal=res.data.data.totalRecord;  
                if(this.allTotal>this.pageSize){
                    this.page=true;
                }else{
                    this.page=false;
                }
            // }
           
        }).catch((error)=>{
            console.log(error)
        })

    },
    getAll(){
        console.log(this.requestId)
        this.$http.get('/api/job-route-invoker/job/countJobs?requestId='+this.requestId,{
        }).then((res)=>{
            this.allNum=res.data.data;  
        }).catch((error)=>{
        })
    },
    getRelease(){
        this.$http.get('/api/job-route-invoker/job/countJobReleases?requestId='+this.requestId,{
        }).then((res)=>{
            this.releaseNum=res.data.data;
        }).catch((error)=>{
        })
    },
    getShutDown(){
        this.$http.get('/api/job-route-invoker/job/countJobCloses?requestId='+this.requestId,{
        }).then((res)=>{
            this.shutDown=res.data.data;
        }).catch((error)=>{
        })
    },
    hasShutDown(item,index){//1 发布中 2 关闭
        let that=this;
        that.$http.post('/api/job-route-invoker/job/updateJobsById?requestId='+that.requestId,{
            publishStatus:index,
            id:item.id
        }
        ).then((res)=>{
            console.log(res)
            if(index==1){
                if(res.data.code=='000'){
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                    this.pageNum=1;
                    this.getAll();
                    this.getRelease();
                    this.getShutDown();
                    this.getList();
                }
            }
            if(index==2){
                if(res.data.code=='000'){
                    this.$message({
                        type: 'success',
                        message: '关闭成功!'
                    });
                    this.pageNum=1;
                    this.getAll();
                    this.getRelease();
                    this.getShutDown();
                    this.getList();
                }
            }
           
            
        }).catch((error)=>{
        })
    },
    deleteList(item){//删除
        let that=this;
        that.$http.get('/api/job-route-invoker/job/deleteJobsById/'+item.id+'&requestId='+that.requestId,{
        }
        ).then((res)=>{
            console.log(res)
            if(res.data.code=='000'){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getAll();
                this.getRelease();
                this.getShutDown();
                this.getList();
            }

               
        }).catch((error)=>{
        })
    },
    toRefresh(item){
        let that=this;
        that.$http.get('/api/job-route-invoker/job/setLockFlushZpJobsByOneDay/'+item.id+'?requestId='+that.requestId,{
        }
        ).then((res)=>{
            if(res.data.code=='000'){
                this.$message({
                    type: 'success',
                    message: '刷新成功!',
                    center: true,
                });
                this.getList(); 
            }
           
        }).catch((error)=>{
        })
    },
    editor(item){
        let that=this;
        // that.$http.get('/api/job-route-invoker/job/setLockFlushZpJobsByOneDay/'+item.id,
        // ).then((res)=>{ 
        // })
        this.$router.push({
    　　　　path: '/releasePositions',
    　　　　query:{id:item.id }　
    　　});
       
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
    height: 100%;
    min-height: 100%;

}
.content-box{
    height: 100%;

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
            i{
                font-style: normal;
            }
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
        .list{
            cursor: pointer;
            padding: 18px;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            box-shadow: 2px 2px 1px 1px #eee;
            margin-top: 25px;
            >p:nth-of-type(1){
                    display: -webkit-box;
                    display: -moz-box; 
                    display: -webkit-flex;
                    display: -moz-flex; 
                    display: -ms-flexbox; 
                    display: flex; 
                    >span:nth-of-type(1){
                        flex: 2;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    >span:nth-of-type(2){
                        text-align: center;
                        flex: 2;
                        i{
                            font-style: normal;
                            color: #409EFF;
                        }
                    }
                    >span:nth-of-type(3){
                        flex: 2;
                        text-align: right;
                        >span{
                            margin-right: 15px;
                            color: #409EFF;                       
                        }
                        >span:nth-of-type(1){
                            .refresh{
                                position: relative;
                                >i{
                                    position: absolute;
                                    width: 7px;
                                    height: 7px;
                                    background: red;
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
                margin-top: 14px;
                    span:nth-of-type(1){
                        color: red;
                    }
                    span:nth-of-type(2){
                    margin-left: 15px;
                    }
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
        .shutDown{
            cursor: pointer;
            padding: 18px;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            box-shadow: 2px 2px 1px 1px #eee;
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
                        font-size: 16px;
                        font-weight: 700;
                        color: #999;
                    }
                    >span:nth-of-type(2){
                        text-align: center;
                        flex: 2;
                        i{
                            font-style: normal;
                            color: #999;
                        }
                    }
                    >span:nth-of-type(3){
                        flex: 2;
                        text-align: right;
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
                margin-top: 12px;
                color: #999;
                font-size: 12px;
                span:nth-of-type(2){
                    float: right;
                }
                
            }
        }
        .shutDown:hover{
            background: #eee;
            border: 1px solid #409EFF;
             >p:nth-of-type(1){
                    >span:nth-of-type(3){
                        >span{                           
                            color: #409EFF;                       
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





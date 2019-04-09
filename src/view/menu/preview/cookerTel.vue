<template>
<div id="cookerTel">
  <div 
  class='content-box'>
    <h3>
        <span @click='checkTitle(1)' :class='{item:template==1}'>在线简历 /  </span>
        <span @click='checkTitle(2)' :class='{item:template==2}'>证书及荣誉 /</span>
        <span @click='checkTitle(3)' :class='{item:template==3}'>联系方式</span>
    </h3>
    <div class="name">
        <span>
          <img src="../../../../static/img/logo.png" >
          <span>{{remuces.realName}}</span>
          <span class="iconfont iconfemale"></span>
          <span v-show='template==2'>
            <i>普</i>
          </span>
          <span v-show='template==2'>
            <i>厨师证</i>
          </span>
        </span>
        <span v-show='template!=3'>
          <span><span class="iconfont iconcakes"></span><i>{{remuces.birthday}}</i>岁 &emsp;/&emsp;</span>
          <span><span class="iconfont iconfangwuzongshu"></span><i></i>{{remuces.bornProvinceName}} &emsp;/&emsp;</span>
          <span><span class="iconfont iconjiguan"></span><i></i>当前在{{remuces.currentCityName}}</span>
        </span>
    </div>
    <div class="resume_1" v-show="template==1">
      <p>
        <span>自我评价</span>
        <span>
          <i 
          v-for="(item1,index) in detialList.remark"
          :key="index">{{item1}}</i>
        </span>
      </p>
      <p>            
        <span>期望工作</span>
        <span>
          <span>{{detialList.expectJob}} /  </span>
          <span>{{detialList.currentCity}} /</span>
          <span>{{detialList.expectMinPayment}}k-{{detialList.expectMaxPayment}}k</span>
        </span>  
      </p>
      <p>            
        <span>师承</span>
        <span>{{detialList.master}}</span>
      </p>
      <p>            
        <span>擅长菜系 </span>
        <span>{{detialList.cookingStyle}}</span>
      </p>
      <p>            
        <span>擅长菜品 </span>
        <span>{{detialList.discribe}}</span>
      </p>
      <p class='p_pic'>
        <img v-for='(item, index) in remuces.cookingImages'
        :key="index"
        :src="item">
      </p>
      <div>            
        <span>工作经历 </span>
        <div>
          <div 
          v-for='(item1, index) in works' 
          class='item'
          :key="index">
            <p>
              <span>{{item1.company}}  /  {{item1.position}}  /  {{item1.isParttime}}  /  {{item1.cityName}}</span>
              <span>{{item1.startTime}} 至 {{item1.endTime}}</span>
            </p>
            <p>{{item1.description}}               
            </p>
          </div>
        </div>
      </div>
      <!-- 教育经历 -->
      <div>            
        <span>教育经历 </span>
        <div>
          <div 
          v-for='(item2, index) in educations'
          :key="index"
          >
            <p>
              <span>{{item2.school}}  /  {{item2.major}}</span>
              <span>{{item2.joinDate}} 至 {{item2.leaveDate}}</span>
            </p>
          </div>
        </div>
      </div>
      <div>            
        <span>获得荣誉 </span>
        <div>
          <div v-for='(item3, index) in prizes'
          :key="index">
            <p>
              <span>{{item3.prizeNotes}}</span>
              <span>{{item3.receiveTime}}</span>
            </p>
          </div>
        </div>
      </div>

    </div> 
    <div class='resume_2' v-show="template==2">
      <div class="text">获奖证书</div>
      <div class="box">
        <div class="win" 
        v-for="(item,index) in remuces.cookingImages"
        :key="index">
          <img :src="item" >
          <div>
            <div>
              <p>十大最好吃的顺德菜</p>
              <p>2002.12</p>
            </div>
          </div>
        </div>
      </div>
      <div class="text">荣誉照片</div>
      <div class="box">
        <div class="win" 
        v-for='(item, index) in prizes'
        :key="index">
          <img :src="item.image" >
          <div>
            <div>
              <p>{{item.prizeNotes}}</p>
              <p>{{item.receiveTime}}</p>
            </div>          
          </div>
        </div>
      </div>

    </div>
    <div class='resume_3' v-show="template==3">
      <p>
        <span class="iconfont iconshouji"></span>
        <span>手机号码</span>
        <span>{{remuces.mobile}}</span>
      </p>
      <!-- <p>
        <span class="iconfont iconyouxiang"></span>
        <span>联系邮箱</span>
        <span>13700000000@163.com</span>
      </p> -->
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      template:1,
      detialList:[],
      remuces:[],
      works:[],
      educations:[],
      prizes:[],

      sesId:0 // 发送简历的用户id
      
    }
  },
  methods:{
    checkTitle(status){
      this.template=status;
    },
   
    getDetail() {
      let jobsId = this.$route.query.jobsId;
      let requestId = this.$route.query.requestId;
      let sesId = this.$route.query.sesId;
      // let data = { 'jobsId':jobsId, 'requestId':requestId}
      // console.log(data)
      axios.post('/api/job-route-invoker/getDetialList?jobsId='+jobsId+'&sesId='+sesId+'&requestId='+requestId,
      ).then((response) => {
        
        let res = response.data;
        this.sesId = res.data.remuces.sesId;
        console.log('88888', res.data.remuces[0].sesId)

        // 修改阅读状态
        
        // 时间戳转换成日期格式
        function timestampToTime(timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '';
          let D = date.getDate() + ' ';
          let h = date.getHours() + ':';
          let m = date.getMinutes() + '';
          let s = date.getSeconds();
          return Y+M;
        }
        
        if(res.data.detialList.length !== 0) {
          console.log('xxxxxxx',res.data.detialList)
          res.data.detialList.some((item,i) => {
            let mark = item.remark
            // console.log('xxxxxxx',item.remark)
            item.remark = mark.split(",")
            // 期望工资下限
            item.expectMinPayment = parseInt(item.expectMinPayment/1000)
            // 期望工资上限
            item.expectMaxPayment = parseInt(item.expectMaxPayment/1000)
      
          })

          this.detialList = res.data.detialList[0]
        } 
          // else {
          //   res.data.detialList = [{'remark':'无'}]
          //   res.data.detialList.some((item,i) => {
          //     let mark = item.remark
              
          //     item.remark = mark.split(",")
          //     // 期望工资下限
          //     item.expectMinPayment = ' '
          //     // 期望工资上限
          //     item.expectMaxPayment = ' '
          //   })
          // }
        
        if(res.data.remuces.length !== 0) {
          res.data.remuces.some((item,i) => {
            // 展示图片
            let cookingImages = item.cookingImages
            item.cookingImages = cookingImages.split(",")
          })

          this.remuces = res.data.remuces[0]
        } 

        if(res.data.works.length !== 0) {
          res.data.works.some((item,i) => {
            item.isParttime === 0?item.isParttime = '全职':item.isParttime = '兼职'
            let thisStartTime = item.startTime
            let thisEndTime = item.endTime
            item.startTime = thisStartTime.split("-").join('.')
            item.endTime = thisEndTime.split("-").join('.')
          })

          this.works = res.data.works
        }
        
        if(res.data.prizes.length !== 0) {
          res.data.prizes.some((item, i) => {
            item.receiveTime = timestampToTime(item.receiveTime);
            let thisTime = item.receiveTime;
            item.receiveTime = thisTime.split("-").join('.')
          })
          this.prizes = res.data.prizes
        }

        if(res.data.educations.length !== 0) {
          res.data.educations.some((item, i) => {
            let thisDate = item.joinDate
            item.joinDate = thisDate.split("-").join('.')
          })

          this.educations = res.data.educations
        }
        // 渲染的数组
        // this.detialList = res.data.detialList[0]
        // this.remuces = res.data.remuces[0]
        // this.works = res.data.works
        // this.educations = res.data.educations
        // this.prizes = res.data.prizes
        console.log(res,res.data.remuces)
      })
    },

    // 更改
    getReadStatus() {
      console.log(this.$route.query)
      // console.log(this.sesId,this.sesId,this.sesId)
      // let sesId = this.sesId;
      let sesIds = this.$route.query.sesId;
      let requestId = window.localStorage.getItem('requestId')
      axios.get('/api/job-route-invoker/updateUserRemucesBySesId?sesId='+sesIds+'&requestId='+requestId).then((response) => {
        console.log(11,response);
      })
    }
  },
  created(){

  },
  mounted(){
    this.getDetail();
    this.getReadStatus();
  }
}
</script>
<style scoped lang='scss'>
#cookerTel{
    height: 100%;
    padding: 30px 50px;
    width: 1200px;
}
.content-box{
  padding-bottom: 30px;
  >h3{
    font-size: 16px;
    color: #666;
    cursor: pointer;
    >.item{
      color: #333;
    }
  }
 
  >.name{
    width: 870px;
    height: 60px;
    line-height: 60px;
    margin-top: 30px;
    >span:nth-of-type(1){
      display: inline-block;
      >img{
        width: 32px;height: 32px;
        border-radius: 50%;
        position: relative;
        top: 10px;
      }
      >span:nth-of-type(1){
        font-size: 20px;
        font-weight: 700;
        margin-left: 4px;
      }
      >span:nth-of-type(2){
        font-size: 20px;
        color: #666;
        margin-left: 4px;
      }
      >span:nth-of-type(3){
        padding: 3px 8px;
        border: 1px solid #eee;
        text-align: center;
        margin-left: 4px;
        border-radius: 3px;
        i{
          font-style: normal;
        }
      }
      >span:nth-of-type(4){
        text-align: center;
        padding: 3px 8px;
        background: #f5f5f5;
        border: 1px solid #eee;
        margin-left: 6px;
        border-radius: 3px;
        i{
          font-style: normal;
        }
      }
    }
    >span:nth-of-type(2){
      float: right;
      >span{
        // margin-right: 20px;
        color: #666;
        >span:nth-of-type(1){
          margin-right: 8px;
        }
        >i{
          font-style: normal;
        }
      }
      >span:last-of-type{
        margin-right: 0;
      }
    }
    
  }
  >.resume_1{
    >p{
      color: #666;
      margin-top: 15px;
      >span:nth-of-type(1){
        width: 70px;
        display: inline-block;
        float: left;
      }
      >span:nth-of-type(2){
        position: relative;
        top: -3px;
        i{
          display: inline-block;
          padding: 3px 6px;
          background: #f5f5f5;
          border:1px solid #eee;
          font-style: normal;
          margin-right: 5px;
          border-radius: 2px;
        }
      }
      >p{
        margin-left: 80px;
        width: 100%;
        >span{
          display: block;
         
        }
      }
      
    }
    >div{
      color: #666;
      margin-top: 34px;
      >span:nth-of-type(1){
        width: 70px;
        display: inline-block;
        float: left;
      }
      >div{
        margin-left: 70px;
        width: 800px;
        >div{
          margin-top: 10px;
          >p:nth-of-type(1){
            margin-bottom: 20px;
            >span:nth-of-type(2){
              float: right;
            }
          }
          >p:nth-of-type(2){
            margin-top: 10px;
            line-height: 20px;
            text-align: justify;
          }
        }
        >div.item{
          margin-top: 25px;
        }
       
      }
    }
    >.p_pic{
      width: 550px;
      margin-top: 24px;
      img{
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 2px;
        margin-right: 10px;
        margin-top: 10px;
      }
    }
    >p:nth-of-type(1),p:nth-of-type(2),p:nth-of-type(3){
      margin-top: 30px;
    }
  }
  >.resume_2{
    .text{
      margin-top: 20px;
      font-size: 15px;
      color: #666;
    }
    .box{
      >div{
        // height: 100px;
        margin-top: 10px;
        >img{
          display: inline-block;
          width: 100px;
          height: 100px;
          border-radius: 2px;
          float: left;
        }
        >div{
          margin-left: 110px;
          width: 300px;
          height: 100px;
          position: relative;
          >div{
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            transform: translateY(-50%);
            p:nth-of-type(1){
              color: #333;
            }
            p:nth-of-type(2){
              color: #666;
              margin-top: 8px;
            }
          }
         
        }
      }
    }
  }
  >.resume_3{
    p{
      margin-top: 14px;
      span{
        color: #666;
      }
      span:last-of-type{
        margin-left: 6px;
      }
     
    }
    p:first-of-type{
      >span:first-of-type{
        font-size: 24px;
        position: relative;
        top: 4px;
      }
      span:nth-of-type(2){
        margin-left: 3px;
      }
    }
    p:last-of-type{
      span:nth-of-type(2){
        margin-left: 6px;
      }
      >span:first-of-type{
        font-size: 20px;
        position: relative;
        top: 2px;
        margin-left: 2px;
        width: 20px;
      }
    }
  }
}
</style>





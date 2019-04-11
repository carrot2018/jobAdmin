<template>
<div id="cookerTel">
  <h3>
    <span @click='checkTitle(1)' :class='{item:template==1}'>在线简历</span>&emsp;|&emsp;
    <span @click='checkTitle(2)' :class='{item:template==2}'>证书及荣誉</span>&emsp;|&emsp;
    <span @click='checkTitle(3)' :class='{item:template==3}'>联系方式</span>
  </h3>
  <div class='content-box'>
    
    <div class="message">
        <div class="message-box">
          <div class="message-left">
            <span class="message-left__name">{{remuces.realName}}</span>
            <i class="message-left__img">
              <img src="static/img/man.png" alt="">
            </i>
          </div>
          
          <div class="message-right">
            <p><img src="static/img/Age.png" alt=""><span>{{remuces.birthday}}岁</span>&emsp;|&emsp;</p>
            <p><img src="static/img/Nativeplace.png" alt=""><span>{{remuces.bornProvinceName}}</span> &emsp;|&emsp;</p>
            <p><img src="static/img/Location.png" alt=""><span>当前在{{remuces.currentCityName}}</span></p>
          </div>
        </div>

        <div class="message-img">
          <img src="static/img/icon.png" alt="">
        </div>
        
    </div>

    <!-- 在线简历 -->
    <div class="resume-1" v-show="template==1">
      <div class="resume-1__content">
        <div class="resume-1__content__left">
          <span class="resume-1__content__text">自我评价</span>  
        </div>
        <div class="resume-1__content__right">
          <span class="resume-1__content__right__line"></span>
          <div class="resume-1__content__right__remark">
            <p 
              v-for="(item1,index) in detialList.remark"
              :key="index"
            >{{item1}}</p>
          </div>
        </div>
      </div>

      <div class="resume-1__content">
        <div class="resume-1__content__left">
          <span class="resume-1__content__text">期望工作</span>  
        </div>
        <div class="resume-1__content__right">
          <span class="resume-1__content__right__line"></span>
          <div class="resume-1__content__right__expectedWork">
            <div class="resume-1__content__right__expectedWork__left">
              <p>期望职位</p>
              <p>期望地区</p>
              <p>期望薪资</p>
            </div>
            <div class="resume-1__content__right__expectedWork__right">
              <p>{{detialList.expectJob}}</p>
              <p>{{detialList.currentCity}}</p>
              <p>{{detialList.expectMinPayment}}k-{{detialList.expectMaxPayment}}k</p>
            </div>
          </div>

        </div>
      </div>

      <div class="resume-1__content">
        <div class="resume-1__content__left">
          <span class="resume-1__content__text">厨艺展示</span>  
        </div>
        <div class="resume-1__content__right">
          <span class="resume-1__content__right__line"></span>
          <div class="resume-1__content__right__expectedWork">
            <div class="resume-1__content__right__expectedWork__left">
              <p>师承</p>
              <p>擅长菜系</p>
              <p>擅长菜品</p>
            </div>
            <div class="resume-1__content__right__expectedWork__right">
              <p>{{detialList.master}}</p>
              <p>{{detialList.cookingStyle}}</p>
              <p>{{detialList.discribe}}</p>
            </div>
          </div>
          
        </div>
      </div>

      <div class="resume-1__content">
        <div class="resume-1__content__left">
          <span class="resume-1__content__text">厨艺作品</span>  
        </div>
        <div class="resume-1__content__right">
          <span class="resume-1__content__right__line"></span>
          <div class="resume-1__content__right__cookingWorks">
           
              <img v-for='(item, index) in remuces.cookingImages'
                :key="index"
                :src="item"
              >

              <!-- <img v-for='i in 10'
                
                src="../../../../static/img/icon.png"
              > -->
          </div>
          
        </div>
      </div>
    
      <div class="resume-1__content">
        <div class="resume-1__content__left">
          <span class="resume-1__content__text">工作经历</span>  
        </div>
        <div class="resume-1__content__right">
          <span class="resume-1__content__right__line"></span>
          <div class="resume-1__content__right__workExperience">
            <div 
              v-for='(item1, index) in works' 
              :key="index"
              class="works"
            >
             <p class="works__left"><span>{{item1.startTime}} 至</span><span>{{item1.endTime}}</span></p>
              <p class="works__right">
                <span class="works__right__title">{{item1.company}} &emsp;|&emsp;{{item1.position}}&emsp;|&emsp;{{item1.isParttime}}&emsp;|&emsp;{{item1.cityName}}</span>
                <span class="works__right__text">{{item1.description}}</span>
              </p>
             
              
            </div>
             <!-- <div 
              v-for='i in 2' 
              class="works"
            >
             <p class="works__left"><span>2019.1 至</span><span>2012.12</span></p>
              <p class="works__right">
                <span class="works__right__title">问问餐饮有限公司&emsp;|&emsp;主厨&emsp;|&emsp;全职&emsp;|&emsp;深圳</span>
                 <span class="works__right__text">无动为大大所大所所的啊无动为大大所大所所的啊无动为大大所大所所的啊无动为大大所大所所的啊无动为大大所大所所的啊无动为大大所大所所的啊无动为大大所大所所的啊无动为大大所大所所的啊</span>
              </p>
             
             
            </div> -->
          </div>
          
        </div>
      </div>


      <div class="resume-1__content">
        <div class="resume-1__content__left">
          <span class="resume-1__content__text">教育经历</span>  
        </div>
        <div class="resume-1__content__right">
          <span class="resume-1__content__right__line"></span>
          <div class="resume-1__content__right__educationExperience">

             <div 
              v-for='(item2, index) in educations'
              :key="index"
              class="education"
              >
                <p class="education__left">
                  <span>{{item2.school}}&emsp;|&emsp;{{item2.major}}</span>
                </p>
                <p class="education__right">
                  <span>{{item2.joinDate}} 至 {{item2.leaveDate}}</span>
                </p>
               
              </div>
              
              <!-- <div 
              v-for='i in 2'
              class="education"
              >
                <p class="education__left">
                  <span>西点学校&emsp;|&emsp;蛋糕</span>
                </p>
                <p class="education__right">
                  <span>2009.1 至 2012.1</span>
                </p>
                
              </div> -->
          </div>
          
        </div>
      </div>
      
     
     <!--  <div>            
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
      </div> -->

    </div>  

    <div class='resume_2' v-show="template==2">

      <div class="resume-2__content">
        <div class="resume-2__content__left">
          <span class="resume-2__content__text">获奖证书</span>  
        </div>
        <div class="resume-2__content__right">
          <span class="resume-2__content__right__line"></span>
          <div class="resume-2__content__right__awardCertificate">
            <div class="awardCertificate" 
              v-for="(item,index) in qualifications"
              :key="index">

              <div class="awardCertificate__left">
                <img :src="item.image" >
              </div>

              <div class="awardCertificate__right">
                <p class="awardCertificate__right__title">{{item.name}}</p>
                <p class="awardCertificate__right__time">{{item.receiveTime}}</p>
              </div>
             
            </div>

            <div class="awardCertificate" 
              v-for="i in 2"
            >
              <div class="awardCertificate__left">
                <img src="static/img/icon.png" >
              </div>
              
              <div class="awardCertificate__right">
                <p class="awardCertificate__right__title">十大最好吃的顺德菜</p>
                <p class="awardCertificate__right__time">2018.12</p>
              </div>
              
            </div>

          </div>
        </div>
      </div>

      <div class="resume-2__content">
        <div class="resume-2__content__left">
          <span class="resume-2__content__text">荣誉照片</span>  
        </div>
        <div class="resume-2__content__right">
          <span class="resume-2__content__right__line"></span>
          <div class="resume-2__content__right__honoraryPhotos">
            <!-- <div class="honoraryPhotos" 
              v-for="(item,index) in prizes"
              :key="index">

              <div class="honoraryPhotos__left">
                <img :src="item.image" >
              </div>

              <div class="honoraryPhotos__right">
                <p class="honoraryPhotos__right__title">{{item.prizeNotes}}</p>
                <p class="honoraryPhotos__right__time">{{item.receiveTime}}</p>
              </div>
             
            </div> -->

            <div class="honoraryPhotos" 
              v-for="i in 2"
            >
              <div class="honoraryPhotos__left">
                <img src="static/img/icon.png" >
              </div>
              
              <div class="honoraryPhotos__right">
                <p class="honoraryPhotos__right__title">十大最好吃的顺德菜</p>
                <p class="honoraryPhotos__right__time">2018.12</p>
              </div>
              
            </div>

          </div>
        </div>
      </div>

    </div>

    <div class='resume_3' v-show="template==3">

      <div class="resume-3__content">
        <div class="resume-3__content__left">
          <span class="resume-3__content__text">联系方式</span>  
        </div>
        <div class="resume-3__content__right">
          <span class="resume-3__content__right__line"></span>
          <div class="resume-3__content__right__phoneNum">
            <p class="phoneNum">
              <i class="phoneNum__icon"></i>
              <span>手机号码&emsp;&emsp;{{remuces.mobile}}</span>
            </p>
          </div>
        </div>
      </div>

    </div>

    <!--<div class='resume_3' v-show="template==3">
      <p>
        <span class="iconfont iconshouji"></span>
        <span>手机号码</span>
        <span>{{remuces.mobile}}</span>
      </p>
       <p>
        <span class="iconfont iconyouxiang"></span>
        <span>联系邮箱</span>
        <span>13700000000@163.com</span>
      </p> 
    </div>-->
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
      qualifications:[],

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

      axios.post('/api/getDetialList?jobsId='+jobsId+'&sesId='+sesId+'&requestId='+requestId,
      ).then((response) => {
        
        let res = response.data;
        this.sesId = res.data.remuces.sesId;
        console.log('88888', response.data.data)
        
        // 时间戳转换成日期格式
        function timestampToTime(timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '';
          let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
          let h = date.getHours() + ':';
          let m = date.getMinutes() + '';
          let s = date.getSeconds();
          return Y+M;
        }
        
        // 个人详细
        if(res.data.detialList.length !== 0) {
          res.data.detialList.some((item,i) => {
            if(item.remark !== null && item.remark !== undefined) {
              let mark = item.remark
              // 标签分割
              item.remark = mark.split(",")
              
            }
           
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
        
        // 展示菜品图片
        if(res.data.remuces.length !== 0 && res.data.remuces !== null) {
          res.data.remuces.some((item,i) => {
             if(item.cookingImages !== null && item.cookingImages !== undefined) {
               // 展示图片
              let cookingImages = item.cookingImages
              item.cookingImages = cookingImages.split(",")
             }
            
          })

          this.remuces = res.data.remuces[0]
        } 

        // 工作经历
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
        
        // 获得荣誉
        if(res.data.prizes.length !== 0) {
          res.data.prizes.some((item, i) => {
            item.receiveTime = timestampToTime(item.receiveTime);
            let thisTime = item.receiveTime;
            item.receiveTime = thisTime.split("-").join('.')
          })
          this.prizes = res.data.prizes
        }

        // 教育经历
        if(res.data.educations.length !== 0) {
          res.data.educations.some((item, i) => {
            let thisDate = item.joinDate
            item.joinDate = thisDate.split("-").join('.')
          })

          this.educations = res.data.educations
        }

        // 获奖证书
        if(res.data.qualifications.length !== 0) {
           this.qualifications = res.data.qualifications
        }
        // 渲染的数组
        // this.detialList = res.data.detialList[0]
        // this.remuces = res.data.remuces[0]
        // this.works = res.data.works
        // this.educations = res.data.educations
        // this.prizes = res.data.prizes
        console.log('xx',res)
      })
    },

    // 更改
    getReadStatus() {
      console.log(this.$route.query)
      // console.log(this.sesId,this.sesId,this.sesId)
      // let sesId = this.sesId;
      let sesIds = this.$route.query.sesId;
      let requestId = window.localStorage.getItem('requestId')
      axios.get('/api/updateUserRemucesBySesId?sesId='+sesIds+'&requestId='+requestId).then((response) => {
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
    min-height: 100%;
    // height: 100%;
    padding: 60px 0 40px 0;
    width: 100%;
    background: url('../../../../static/img/telbg.png')
}
h3{
    display: block;
    width: 800px;
    margin: 0 auto;
    font-size: 20px;
    color: #727272;
    cursor: pointer;
    margin-bottom: 30px;
    >.item{
      min-width: 100px;
      font-size: 24px;
      color: #333;
      &:nth-of-type(2) {
        min-width: 124px;
      }
    }
  }
.content-box{
  // min-height: 700px;
  min-height: 970px;
  margin: 0 auto;
   width: 800px;
   background: #fff;
  // padding-bottom: 30px;
  padding: 0 40px;
  box-shadow: 0 2px 12px #dedede;
  .message{
    width: 100%;
    height: 190px;
    // line-height: 60px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .message-box{
      .message-left{
        display: flex;
        align-items: flex-end;
        height: 30px;
        &__name {
          color: #000;
          font-size: 28px;
          margin-right: 5px;
        }
        &__img {
          display: inline-block;
          width: 24px;
          height: 24px;
          img {
            width: 100%;
          }
        }
      }
      .message-right {
        margin-top: 25px;
        height: 30px;
        line-height: 30px;
        display: flex;
        color: #727272;
        >p {
          height: 30px;
          line-height: 30px;
          // display: inline-block;
          display: flex;
          align-items: center;
          >img {
            margin-right: 5px;
          }
        }
      }
    }
    .message-img {
      height: 120px;
      width: 120px;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
   
  .resume-1{
    &__content{
      color: #333;
      font-size: 20px;
      display: flex;
      &__left {
        flex-shrink: 0;
          .resume-1__content__text {
            display: inline-block;
            font-size: 20px;
            color: #333;
          }
        }
        &__right {
        margin-left: 38px;
        flex: 1;
          &__line {
            width: 100%;
            // margin-left: 38px;
            height: 24px;
            display: inline-block;
            background: url('../../../../static/img/telbg.png');
          }

          &__remark {
            margin-top: 20px;
            width: 100%;
            display: flex;
            margin-bottom: 50px;
            p {
              margin-right: 12px;
              font-size: 14px;
              color: #141e32;
              display: flex;
              justify-content: center;
              align-items: center;
              // width: 88px;
              padding: 0 20px;
              height: 30px;
              border-radius: 20px;
              background: #dbdce0;
            }
          }

          &__expectedWork {
            margin: 20px 0 50px 0;
            width: 100%;
            display: flex;
            font-size: 16px;
            &__left {
              color: #999;
            }
            &__right {
              margin-left: 20px;
              color: #4c4c4c;
            }
            p {
              height: 30px;
            }
          }

          &__cookingWorks {
            margin: 20px 0 50px 0;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            img {
              height: 140px;
              width: 24%;
              // border: 1px solid red;
              margin-right: 8px;
              &:nth-of-type(4n) {
                margin-right: 0
              }
            }
          }

          &__workExperience {
            margin: 6px 0 26px 0;
            width: 100%;
            // display: flex;
            
            .works {
              position: relative;
              padding-bottom: 24px;
              &:nth-last-of-type(2) {
                border-bottom: 1px solid #eee;
              }
              .works__left {
                position: absolute;
                left: -120px;
                top: 24px;
                >span {
                  font-size: 16px;
                  color: #666;
                  display: block;
                }
              }
              .works__right {
                &__title{
                  font-size: 16px;
                  color: #142d46;
                  font-weight: 600;
                  display: inline-block;
                  margin-bottom: 26px;
                  margin-top: 24px;
                }
                &__text {
                  display: block;
                  font-size: 14px;
                  line-height: 24px;
                }
              }
            }
          }


          &__educationExperience {
            margin: 0 0 30px 0;
            width: 100%;
            // display: flex;
            .education {
              padding: 26px 0;
              display: flex;
              justify-content: space-between;
              &:nth-last-of-type(2) {
                border-bottom: 1px solid #eee;
              }
              .education__left {
                 >span {
                   font-size: 16px;
                  color: #142d46;
                  font-weight: 600;
                  display: inline-block;
                 }
              }
              .education__right {
                >span {
                   font-size: 14px;
                  color: #666;
                  display: inline-block;
                 }
              }
            }
          }
        }
      }

  }

  .resume-2{
    &__content{
      color: #333;
      font-size: 20px;
      display: flex;
      &__left {
        flex-shrink: 0;
          .resume-2__content__text {
            display: inline-block;
            font-size: 20px;
            color: #333;
          }
        }
        &__right {
        margin-left: 38px;
        flex: 1;
          &__line {
            width: 100%;
            // margin-left: 38px;
            height: 24px;
            display: inline-block;
            background: url('../../../../static/img/telbg.png');
          }

          &__awardCertificate {
            margin: 20px 0 50px 0;
            width: 100%;
            .awardCertificate {
              display: flex;
              align-items: center;
              &__left {
                height: 140px;
                width: 140px;
              }
              &__right {
                margin-left: 20px;
                &__title {
                  font-size: 20px;
                  color: #333;
                }
                &__time {
                  font-size: 16px;
                  color: #727272;
                  margin-top: 10px;
                }
              }
            }
          }

          &__honoraryPhotos {
            margin: 20px 0 50px 0;
            width: 100%;
            .honoraryPhotos {
              display: flex;
              align-items: center;
              &__left {
                height: 140px;
                width: 140px;
              }
              &__right {
                margin-left: 20px;
                &__title {
                  font-size: 20px;
                  color: #333;
                }
                &__time {
                  font-size: 16px;
                  color: #727272;
                  margin-top: 10px;
                }
              }
            }
          }

        }
    }
  }

  .resume-3{
    
    &__content{
      color: #333;
      font-size: 20px;
      display: flex;
       
      &__left {
        flex-shrink: 0;
          .resume-3__content__text {
            display: inline-block;
            font-size: 20px;
            color: #333;
          }
        }
        &__right {
        margin-left: 38px;
        flex: 1;
          &__line {
            width: 100%;
            // margin-left: 38px;
            height: 24px;
            display: inline-block;
            background: url('../../../../static/img/telbg.png');
          }

          &__phoneNum {
            margin: 20px 0 50px 0;
            width: 100%;
            
            .phoneNum {
              display: flex;
              align-items: center;
              &__icon {
                display: inline-block;
                width: 14px;
                height: 20px;
                background-image: url('../../../../static/img/phoneNum.png');
                background-size: 100% 100%;
                margin-right: 15px;
              }
              >span {
                font-size: 20px;
                color: #333;
              }
            }
            
          }

        }
    }
  }

}
  

</style>





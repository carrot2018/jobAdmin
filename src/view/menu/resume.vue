<template>
  <div id="resume">
    <div class="content-box">
      <h3>
        <span>简历管理</span>
      </h3>
      <div class="title">
        <span @click="checkTitle(1)">主动投递<span class="title--pink"> ({{totalNum}})</span></span>
      </div>
      <div class="list-box">
        <div class="every" 
        v-for="(item, index) in arr" 
        :key="index" 
        @click="preview(item.xxx,item.jobsId,item.sesId)"
        >
          <!-- <p class="title">
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

          </div> -->
          <p class="list-box__title">
            <span class="list-box__title__time">{{item.sendTime}}</span>
            <span class="list-box__title__position">应聘: {{item.name}}</span>
          </p>
          <div class="list-box__content">
            <p class="list-box__content__header">
              <span>
                <span class="content__realname">{{item.realName}}</span>
                <i v-show="item.reads"></i>
              </span>
              <span v-show="hasCookieImage">厨艺作品</span>
            </p>
            <p>
              <span class="list-box__content__menu">{{item.birthday}}岁&emsp;/&emsp;{{item.sex}}&emsp;/&emsp;{{item.bornProvinceName}}&emsp;/&emsp;当前在{{item.bornCityName}}</span>
            </p>
            <p>
              <span
              v-for="(items,index) in item.remark"
              :key="index">{{items}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CKEDITOR from "CKEDITOR";
export default {
  data() {
    return {
      // arr: [{ xxx: 1 }, { xxx: 2 }, { xxx: 1 }, { xxx: 2 }],
      arr:[], // 简历渲染的数据
      totalNum:0, // 简历总份数
      readStatus:true, // 阅读状态
      hasCookieImage:false
    };
  },
  methods: {
    preview(item,jobsId,sesId) {
      //预览简历
      // if (item == 1) {
      //   this.$router.push("/cookerTel");
      // } else {
      //   this.$router.push("/notCookerTel");
      // }
      console.log(123123,sesId)
      
      this.$router.push({
        path: '/cookerTel',
        query: {
          jobsId:jobsId,
          sesId:sesId,
          requestId:window.localStorage.getItem('requestId'),
        }
      })
    },

    // 获取简历管理信息
    getResumeAdminMessage() {
      axios.get('/api/job-route-invoker/list?requestId=8f4fc2e6-6fec-4058-a220-e8902833021c',
      ).then((response) => {
        console.log(response)
        let res = response.data;
        let data = res.data.list;
        
        this.totalNum = res.data.record;
        // 时间戳转换成日期
        function timestampToTime(timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
          // let D = date.getDate() + ' ';
          let h = date.getHours() + ':';
          let m = date.getMinutes() + '';
          let s = date.getSeconds();
          return Y+M+D+h+m;
        }
        if(res.code === '000') {
          data.some((item,i) => {
            // 时间戳转换
            item.sendTime = timestampToTime(item.sendTime)
            // 1男，2女
            item.sex === 1?item.sex = '男':item.sex = '女'
            // 标签分隔
            let mark = item.remark
            item.remark = mark.split(",")
            
            // 0未读，1已读
            // if(item.isRead === 1) {
            //   item.isRead = false
            // }
            
            // 添加
            item.reads = true
            item.isRead === 1 ? item.reads = false : item.reads = true
            // console.log( mark.split(","))
            if(item.cookingImages.length !== 0) {
              this.hasCookieImage = true
            }
          })
          this.arr = data
          console.log(this.arr)

        }
      })
    }
  },
  created() {},
  mounted() {
    this.getResumeAdminMessage();
  }
};
</script>
<style scoped lang='scss'>
#resume {

}
.list-box__content__menu {
  font-size: 16px;
  color: #6a6a6a;
}
.content-box {

  padding: 50px 80px 40px 40px;
  h3 {
    height: 50px;
    line-height: 50px;
    span {
      font-size: 24px;
      font-weight: 700;
      color: #142D46;
    }
  }
  > .title {
    padding-top: 17px;
    border-bottom: 1px solid #e6eef1;
    padding-bottom: 18px;
    .title--pink {
      color: #ff5571;
    }
    span {
      cursor: pointer;
    }
    span:nth-of-type(1) {
      font-size: 16px;

    }
    span:nth-of-type(2) {
      color: #666;
      font-size: 16px;
      margin-left: 50px;
    }
    span:nth-of-type(3) {
      color: #999;
      font-size: 16px;
      margin-left: 50px;
    }
  }
  .list-box {
    .every {
      margin-top: 25px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 4px 12px rgba($color: #ececef, $alpha: 0.8);
      .list-box__title {
        color: #999;
        font-size: 14px;
        padding: 30px 0 0 30px;
        &__time {
          margin-right: 10px;
        }
      }
      .list-box__content {
        cursor: pointer;
        padding: 24px 0 30px 30px;
        // border: 1px solid #e5e5e5;
        border-radius: 3px;

        // margin-top: 8px;
        > p:nth-of-type(1) {
          position: relative;
          > span:nth-of-type(1) {
            position: relative;

            .content__realname {
              font-size: 24px;
              // font-weight: 600;
              color: #142D46;
            }

            i {
              position: absolute;
              width: 7px;
              height: 7px;
              background: red;
              border-radius: 7px;
              right: -8px;
              top: -4px;
            }
          }
          > span:nth-of-type(2) {
            display: inline-block;
            margin-left: 20px;
            height: 24px;
            line-height: 24px;
            width: 80px;
            text-align: center;
            /* border: 1px solid #666; */
            border-radius: 4px;
            font-size: 16px;
            color: white;
            background: #ff5571;
            position: absolute;
          }
        }
        > p:nth-of-type(2) {
          margin-top: 14px;
          color: #666;
        }
        > p:nth-of-type(3) {
          margin-top: 14px;
          span {
            padding: 4px 6px;
            display: inline-block;
            background: #f5f6fa;
            border-radius: 2px;
            margin-right: 10px;
            font-size: 12px;
            color: #6a6a6a;
          }
        }
        > p:nth-of-type(4) {
          margin-top: 12px;
          color: #999;
          font-size: 12px;
          span:nth-of-type(2) {
            float: right;
          }
        }
      }
    }
  }
}
</style>





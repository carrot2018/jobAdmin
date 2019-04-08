<template>
<div id="cookerTel">
  <div class='content-box'>
    <h3>
        <span @click='checkTitle(1)' :class='{item:template==1}'>在线简历 /  </span>
        <span @click='checkTitle(2)' :class='{item:template==2}'>联系方式</span>
    </h3>
    <div class="name">
        <span>
          <img src="../../../../static/img/logo.png" >
          <span>哈哈哈</span>
          <span class="iconfont iconfemale"></span>
          <span v-show='template==2'>
            <i>普</i>
          </span>
          <span v-show='template==2'>
            <i>厨师证</i>
          </span>
        </span>
        <span v-show='template!=3'>
          <span><span class="iconfont iconcakes"></span><i></i>岁 &nbsp;/  </span>
          <span><span class="iconfont iconfangwuzongshu"></span><i></i>黑龙江籍 &nbsp;/  </span>
          <span><span class="iconfont iconjiguan"></span><i></i>当前在深圳-光明新区</span>
        </span>
    </div>
    <div class="resume_1" v-show="template==1">
      <p>
        <span>自我评价</span>
        <span>
          <i>踏实肯干</i><i>踏实肯干</i><i>踏实肯干</i><i>踏实肯干</i><i>踏实肯干</i>
        </span>
      </p>
      <p>            
        <span>期望工作</span>
        <span>
          <span>行政总厨 /  </span>
          <span>深圳 光明新区 /</span>
          <span>8k-10k</span>
        </span>  
      </p>
      <div>            
        <span>工作经历 </span>
        <div>
          <div v-for='i in 3' class='item'>
            <p>
              <span>胜记餐饮有限公司  /  主厨  /  全职  /  深圳</span>
              <span>2001.1 至 2002.12</span>
            </p>
            <p>我在这里担任主厨，为餐厅做了5道创新菜，赢得许多回头客。我在这里担任主厨，为餐厅做了5道创新菜，
              赢得许多回头客。我在这里担任主厨，为餐厅做了5道创新菜，赢得许多回头客。我在这里担任主厨，为餐
              厅做了5道创新菜，赢得许多回头客。我在这里担任主厨，为餐厅做了5道创新菜，赢得许多回头客。               
            </p>
          </div>
        </div>
      </div>
      <!-- 教育经历 -->
      <div>            
        <span>教育经历 </span>
        <div>
          <div v-for='i in 3'>
            <p>
              <span>西点学校  /  蛋糕</span>
              <span>2001.1 至 2002.12</span>
            </p>
          </div>
        </div>
      </div>
      <div>            
        <span>获得荣誉 </span>
        <div>
          <div v-for='i in 3'>
            <p>
              <span>十大最好吃的顺德菜</span>
              <span>2001.1 至 2002.12</span>
            </p>
          </div>
        </div>
      </div>

    </div> 
    <div class='resume_2' v-show="template==2">
      <p>
        <span class="iconfont iconshouji"></span>
        <span>手机号码</span>
        <span>15222018978</span>
      </p>
      <p>
        <span class="iconfont iconyouxiang"></span>
        <span>联系邮箱</span>
        <span>13700000000@163.com</span>
      </p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      template:1,
      
    }
  },
  methods:{
    checkTitle(status){
        this.template=status;
    }
   
  },
  created(){

  },
  mounted(){
   
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
        margin-right: 20px;
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





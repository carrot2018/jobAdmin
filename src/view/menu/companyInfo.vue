<template>
<div id="companyInfo">
    <div class="content-box">
        <!-- <lay-out></lay-out> -->
        <h3>
            <span>企业信息</span><i>为了使求职者在投递前了解企业的基本情况，请完善以下企业相关信息，同时提升求职者的信任感</i>
        </h3>
        <div class="step">
            <el-steps :active="active" align-center>
                <el-step title="企业简介"></el-step>
                <el-step title="主营餐饮"></el-step>
            </el-steps>
        </div>
        <div class="content-1" v-show='template==1'>        
            <div>
                <span>企业名称</span> 
                <div class="right">
                    <span class="company-name">企业名称企业名称企业名称</span>
                    
                </div>             
            </div>
            <div>
                <span>员工人数 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
                    <input type="text" class='people-num' placeholder="填写" 
                    v-model='number' v-on:input="numberInput()" maxlength="6">
                    <span>人</span>
                    <p class='employees'><span class="iconfont icongantanhao"></span>填写员工人数</p>
                </div>   
            </div>
            <div>
                <span>企业地址 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
                    <p>
                        <el-select v-model="province" filterable placeholder="省份" @change='getCity'>
                            <el-option
                            v-for="item in provinceArr"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="city" filterable placeholder="城市" @change='getArea'>
                            <el-option
                            v-for="item in cityArr"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="area" filterable placeholder="所在区">
                            <el-option
                            v-for="item in areaArr"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                            </el-option>
                        </el-select>                   
                    </p>
                    <p>
                        <input type="text" placeholder="填写详细地址，例：深南大道1001号腾讯大厦1楼7-11商铺"
                        v-model="detailArea" class="detail-area">
                    </p>
                    <p class='tip-text' v-show='addressShow'>
                        <span class="iconfont icongantanhao"></span>
                        <span v-text='addressText'></span>
                        <!-- 填写企业所在详细地址 -->    
                    </p>
                </div>
                
            </div>
            <div>
                <span>企业简介 </span> 
                <div class="right">
                    <div class="textarea-box">
                        <textarea id="" placeholder="简要描述企业概况，以便给求职者留下初步印象"
                        v-model='textarea' maxlength="1000"></textarea>
                        <span>{{textarea.length}}/1000</span>
                    </div>
                    
                </div>
            </div>
            <div>
                <span>企业标签 </span> 
                <div class="right">
                   <p class="label-text">选择符合的企业标签，也可以自定义，最多6项</p>                 
                   <div class="label-box">
                      <span v-for='item in enterprise' 
                      v-bind:class='{bg:item.flag==true}'
                      @click='checkLabel(item)'>{{item.name}}</span>  
                   </div>
                    <p class='error-label'><span><span class="iconfont icongantanhao"></span>您已添加6个企业标签，取消后再进行更新或者自定义添加。</span></p>
                   <div class="custom_input" v-show='!custom'>
                       <input type="text" placeholder="最多6个字" maxlength="6" v-model="add">
                       <span @click='addConfirm()'>确定</span>
                       <span @click='addCancel()'>取消</span>  
                   </div>
                   <div class="custom" @click='clickCustom()' v-show='custom'>
                       <span class="iconfont iconjia"></span><span>自定义</span>
                   </div>
                   <div class="next" @click='next()'>
                       下一步
                   </div>                  
                </div>
            </div>

        </div> 
        <div class="content-2" v-show='template==2'>        
            <div>
                <span>主营菜系 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
                   <div class="label-box">
                      <span :class='{bg:item.flag==true}' v-for='item in mainCuisine' @click='checkCuisine(item)'>{{item.name}}</span>  
                   </div>  
                    <p class='tip-text' v-show='cuisineShow'>
                        <span class="iconfont icongantanhao"></span>
                        <span>选择主营菜系,最多2项</span>
                    </p>                 
                </div>
            </div>
            <div>
                <span>餐饮类型 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
                   <div class="label-box">
                      <span :class='{bg:item.flag==true}' v-for='item in diningType' @click='checkCookType(item)'>{{item.name}}</span>
                   </div>  
                   <p class='tip-text' v-show='cookTypeShow'>
                        <span class="iconfont icongantanhao"></span>
                        <span>选择餐饮类型,最多2项</span>
                    </p>  
                </div>
            </div>
            <div>
                <span>工作环境</span> 
                <div class="right">
                    <p class="label-text">请使用jpg、png、gif格式图片，每张图片不超过10M，最多可上传 5 张；</p>
                    <div class="upload">
                        <cube-upload
                        :max="5"
                        action="//jsonplaceholder.typicode.com/photos/"
                        :simultaneous-uploads="1"
                        @files-added="filesAdded" />
                    </div>
                    <div class="has-success" >
                      <span @click='prevStep()'>上一步</span>
                      <span @click='success()'>完成</span>
                    </div>
                </div>
            </div>

        </div> 
        <el-dialog
            title="已完善企业信息，辛苦了！"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>你填写的企业资料将会在审核通过后向求职者展示。</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click='toRelease()'>马上开启招聘</el-button>
            </span>
        </el-dialog>
         
    </div> 
   
</div>
</template>
<script>
// import layOut from '../layOut.vue'//退出
export default {
//   components: { layOut },
  data () {
    return {
        template:1,//企业简介
        number:'',//员工人数
        centerDialogVisible: false,
        active:1,     
        labelBg:false,//被选择的企业标签样式
        custom:true,//自定义按钮显示
        add:'',//自定义添加的内容
        textarea:'',//文本框里的内容
        province: '',
        city: '',
        area: '',
        detailArea:'',//详细地址
        addressShow:false,//地址不显示
        addressText:'',//地址文案
        provinceArr:[],//省
        cityArr:[],//市
        areaArr:[],//区
        cuisineShow:false,//菜系提示
        cuisineArr:[],//菜系
        cuisineNewArr:[],//被选择菜系
        cookTypeShow:false,//餐饮类型提示
        cookTypeArr:[],//餐饮类型
        cookTypeNewArr:[],//被选择餐饮类型
        enterprise:[],//企业标签
        mainCuisine:[],//主营菜系
        diningType:[],//餐饮类型
    }
  },
  methods:{
    getEnterprise(){//企业标签
        this.$http.get('/service/taxonomies/486',{
        }).then((res)=>{
            let enterprise=res.data.allNodes;
            enterprise.forEach(function(v){
                v.flag=false;
            })
            this.enterprise=enterprise;
        }).catch((error)=>{
        })
    },
    getMainCuisine(){//主营菜系
        this.$http.get('/service/taxonomies/484',{
        }).then((res)=>{
            let mainCuisine=res.data.allNodes;
            mainCuisine.forEach(function(v){
                v.flag=false;
            })
            this.mainCuisine=mainCuisine;
        }).catch((error)=>{
        })
    },
    getDiningType(){//餐饮类型
        this.$http.get('/service/taxonomies/485',{
        }).then((res)=>{
            let diningType=res.data.allNodes;
            diningType.forEach(function(v){
                v.flag=false;
            })
            this.diningType=diningType;
        }).catch((error)=>{
        })
    },
    clickCustom(){//点击自定义
      this.custom=!this.custom;
      this.add='';
    },
    numberInput(){//员工人数
        this.number=this.number.replace(/^(0+)|[^\d]+/g,'');
    },
    addConfirm(){//自定义添加确定
        if(!this.add){
            this.$message({
                message: '请输入自定义内容',
                type: 'warning',
                center: true
            });
            return;
        }
        let flagArr=[];
        this.enterprise.forEach(function(v){
            if(v.flag){
                flagArr.push(v);
            }
        })
        if(flagArr.length>=6){
            $('.error-label').show();
        }else{
            this.custom=!this.custom;
            this.enterprise.unshift({
                name:this.add,flag:true
            });  
            $('.error-label').hide(); 
        }
       
    },
    addCancel(){//自定义添加取消
        this.custom=!this.custom;
    },
    checkLabel(item){//点击企业标签
        console.log(item)
        let that=this;
        if(!item.flag){
            let flagArr=[];
            that.enterprise.forEach(function(v){
                if(v.flag){
                    flagArr.push(v);
                }
            })
            if(flagArr.length>=6){
                $('.error-label').show();
            }else{
                item.flag=!item.flag;
                $('.error-label').hide();
            }
        }else{
            item.flag=!item.flag;
            $('.error-label').hide();
        }  
    },
    getProvince(){
        let that=this;
        that.$http.get('/php/api/areas',{
        }).then((res)=>{
            that.provinceArr=res.data;
        }).catch((error)=>{
        })
    },
    getCity(){
        let that=this;
        that.city='';
        that.area='';
        that.provinceArr.forEach(function(v){     
            if(that.province==v.id){
                that.cityArr=v.children;
            }                
        })
    },
    getArea(){
        let that=this;
        that.area='';
        $('.el-select-dropdown__empty').hide()
        this.cityArr.forEach(function(v){ 
            if(that.city==v.id){
                that.areaArr=v.children;
            }                
        })
    },
    next(){//点击下一步
        // let detailReg=/^(?=.*?[\u4E00-\u9FA5])[\u4e00-\u9fffa-zA-Z\d\-]+$/;
        // if(!this.number ){
        //     $('.employees').show();
        //     return;
        // }else{
        //     $('.employees').hide();
        // }
        // if(!this.province){
        //     this.addressShow=true;
        //     this.addressText='请选择省份'
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!this.city){
        //     this.addressShow=true;
        //     this.addressText='请选择城市'
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!this.area){
        //     this.addressShow=true;
        //     this.addressText='请选择所在区'
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!this.detailArea){
        //     this.addressShow=true;
        //     this.addressText='请填写企业所在详细地址'
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!detailReg.test(this.detailArea)){
        //     this.addressShow=true;
        //     this.addressText='详细地址有误'
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        $('.error-label').hide(); 
        this.template=2;
        this.active=2;
    },
    filesAdded(files) {
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >1M files'
      }).show()
    },
    success(){//完成
        if(this.cuisineNewArr.length==0){
            this.cuisineShow=true;
            return;
        }else{
            this.cuisineShow=false;
        }
        if(this.cookTypeNewArr.length==0){
            this.cookTypeShow=true;
            return;
        }else{
            this.cookTypeShow=false;
        }
        this.centerDialogVisible=true;
    },
    toRelease(){//去发布职位
        this.$router.push({path:'/allPosition'})
    },
    prevStep(){//点击上一步
        this.active=1;
        this.template=1;    
    },
    checkCuisine(item){//选择菜系标签
        let that=this;
        if(!item.flag){
            let cuisineNewArr=[];
            that.mainCuisine.forEach(function(v){
                if(v.flag){
                    cuisineNewArr.push(v);
                }
            })

            if(cuisineNewArr.length>=2){
                this.cuisineShow=true;
                return;
            }else{
                item.flag=!item.flag;
                this.cuisineShow=false;
                cuisineNewArr.push(item);        
            }
            that.cuisineNewArr=cuisineNewArr; 
            console.log(that.cuisineNewArr)             
        }else{
            item.flag=!item.flag;
            this.cuisineShow=false;
            that.cuisineNewArr.forEach(function(v,i){
                if(v.name==item.name){
                    that.cuisineNewArr.splice(i,1)
                }
            })
            console.log(that.cuisineNewArr) 
        }
         
    },
    checkCookType(item){//选择餐饮类型
        let that=this;
        if(!item.flag){
            let cookTypeNewArr=[];
            that.diningType.forEach(function(v){
                if(v.flag){
                    cookTypeNewArr.push(v);
                }
            })
            if(cookTypeNewArr.length>=2){
                this.cookTypeShow=true;
                return;
            }else{
                item.flag=!item.flag;
                this.cookTypeShow=false;
                cookTypeNewArr.push(item);
            }
            that.cookTypeNewArr=cookTypeNewArr;
            console.log( that.cookTypeNewArr)
        }else{
            item.flag=!item.flag;
            this.cookTypeShow=false;
            that.cookTypeNewArr.forEach(function(v,i){
                if(v.name==item.name){
                    that.cookTypeNewArr.splice(i,1)
                }
            })   
            console.log( that.cookTypeNewArr) 
        }
        

         
    },

  },
  created(){
    this.getProvince();
    this.getEnterprise();
    this.getMainCuisine();
    this.getDiningType();
  },
  mounted(){
   
  }
}
</script>
<style scoped lang='scss'>
#companyInfo{
    height: 100%;
    overflow-y: auto;
}
.content-box{
padding: 50px 80px 0 40px;
position: relative;
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
.content-1{
    padding: 0 50px;
    >div{
        padding: 10px 0;
        >span:nth-of-type(1){
            color: #333;
            width: 100px;
            display: inline-block;
            font-size: 15px;
            float: left;
            span{
                font-size: 16px;
                color: red;
            }
        }
        >.right{
            margin-left: 100px;
            width: calc(100% - 100px);
            .company-name{
                font-size: 15px;
            }
            .people-num{
                width: 80px;
                height: 34px;
                border: 1px solid #ccc;
                border-radius: 3px;
                margin-right: 8px;
                padding-left: 10px;
            }
            .detail-area{
                width: 560px;
                height: 40px;
                border: 1px solid #ccc;
                border-radius: 3px;
                margin-top: 15px;
                padding-left: 10px;
            }
            .textarea-box{
                width: 560px;
                height: 120px;
                border: 1px solid #ccc;
                position: relative;
                border-radius: 3px;
                >textarea{
                    position: absolute;
                    width: 540px;
                    height: 100px;
                    left: 10px;
                    top: 10px;
                    resize:none 
                    
                }
                >span{
                    position: absolute;
                    bottom: 10px;
                    right: 10px; 
                    color: #999;
                }
            }
            .label-text{
                color: #999;
                font-size: 13px;
                margin-bottom: 6px;
            }
            .label-box{
                width: 800px;
                >span{
                    display: inline-block;
                    padding: 8px;
                    border-radius: 2px;
                    margin-right: 15px;
                    background: #e5e5e5;
                    margin-top: 15px;
                    cursor: pointer;
                }
                >span.bg{
                    background: cyan;
                    color: #fff;
                }
            }
            .custom_input{
                input{
                    width: 160px;
                    height: 36px;
                    line-height: 34px;
                    border: 1px solid #ccc;
                    margin-top: 15px;
                    border-radius: 3px;
                    padding-left: 10px;
                }
                span{
                    display: inline-block;
                    width: 50px;
                    height: 30px;
                    line-height: 28px;
                    border: 1px solid #ccc;
                    margin-top: 15px;
                    border-radius: 3px;
                    margin-left: 10px;
                    text-align: center;
                    cursor: pointer;
                }
                span:nth-of-type(1){
                   background: #aaa;
                   color: #fff;
                }                
              
            }
            .custom{
                width: 120px;
                height: 36px;
                line-height: 34px;
                border: 1px solid #ccc;
                background: #e5e5e5;
                margin-top: 15px;
                text-align: center;
                border-radius: 3px;
                cursor: pointer;
                span:nth-of-type(1){
                    font-size: 12px;
                }
            }
            .next{
                width: 140px;
                height: 44px;
                line-height: 42px;
                background: #ccc;
                margin-top: 40px;
                text-align: center;
                border-radius: 3px;
                font-size: 15px;
                margin-bottom: 30px;
                cursor: pointer;
            }
            .employees{
                color: red;
                margin-top: 5px;
                display: none;
            }
            .tip-text{
                margin-top: 5px;
                color: red;
            }
            .error-label{
                color: red;
                display: none;
                margin-top: 6px;
            }
        }
     
    }
}
.content-2{
    padding: 0 50px;
    >div{
        padding: 10px 0;
        >span:nth-of-type(1){
            color: #333;
            width: 100px;
            display: inline-block;
            font-size: 15px;
            float: left;
            span{
                font-size: 16px;
                color: red;
            }
        }
        >.right{
            margin-left: 100px;
            .label-text{
                color: #999;
                font-size: 13px;
            }
            .label-box{
                width: 800px;
                span{
                    display: inline-block;
                    padding: 8px;
                    border-radius: 2px;
                    margin-right: 15px;
                    background: #e5e5e5;
                    margin-bottom: 15px;
                    cursor: pointer;
                }
                >span.bg{
                    background: cyan;
                    color: #fff;
                }
            }
            .upload{
                margin-top: 20px;
            }
            .has-success{
                span{
                    display: inline-block;
                    width: 120px;
                    height: 44px;
                    line-height: 42px;
                    background: #ccc;
                    margin-top: 40px;
                    text-align: center;
                    border-radius: 3px;
                    font-size: 15px;
                    margin-bottom: 30px;
                    cursor: pointer;
                }
                span:nth-of-type(2){
                    margin-left: 20px;
                }
               
            }
            .tip-text{
                span{
                    color: red;
                }
                span:nth-of-type(1){
                    position: relative;
                    top: 1px;
                }
                span:nth-of-type(2){
                    margin-left: 2px;
                }
            }

        }
     
    }
}

}
</style>
<style>
#companyInfo .el-step.is-center .el-step__line {
    left: 60%;
    right: -40%;
}
#companyInfo .el-input {
    width: 180px;
    margin-right: 10px;
} 
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #999;
    font-size: 13px;
}
#companyInfo .el-input__inner::-webkit-input-placeholder{
    color: #999;
    font-size: 13px;
}
#companyInfo .cube-upload-file-status.cubeic-warn {
    display: none;
}
#companyInfo .cube-upload-file-def {
    width: 120px;
    height: 120px;
}
#companyInfo .cube-upload-btn-def {
   width: 120px;
   height: 120px;
}
#companyInfo .el-dialog--center .el-dialog__body {
    text-align: center;
}
#companyInfo .el-dialog--center {
    width: 34%!important;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin-top: 0!important;
}
#companyInfo .el-dialog__header {
    padding: 80px 20px 10px;
   
}
#companyInfo .el-dialog__title{
    font-weight: 700;
    font-size: 22px;
}
#companyInfo .el-dialog__body {
    padding: 10px 25px 30px;
}
#companyInfo .el-dialog__headerbtn .el-dialog__close{
    font-size: 30px;
}
#companyInfo .el-dialog__footer{
    padding: 10px 20px 40px;
}

</style>


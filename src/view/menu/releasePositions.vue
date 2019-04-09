<template>
<div id="releasePositions">
    <div class="content-box">
        <!-- <lay-out></lay-out> -->
        <h3>
            <span>发布职位</span><i>相同职位名、相同工作地点的职位只允许发布一个</i>
        </h3>
        <div class="content-1">  
            <!-- 职位名称       -->
            <div>
                <span>职位名称 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
                    <input type="text" class='job-name' placeholder="填写职位名，例：湘菜炒锅师傅"
                    maxlength="30" v-model='name' :disabled='requestId!=null'>
                    <span class="job-name-tip"><span class="iconfont icongantanhao"></span> 请认真填写职位名，发布后不可更改</span>
                </div>               
            </div>
            <!-- 职位类别 -->
            <!-- <div>
                <span>职位类别 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right job-type">
                    <el-select v-model="value4" filterable placeholder="选择类别">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div> -->
            <!-- 工作地点 -->
            <div>
                <span>工作地点 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
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
                    <el-select v-model="area" filterable placeholder="所在区/县">
                        <el-option
                        v-for="item in areaArr"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                        </el-option>
                    </el-select>     
                    <p>
                        <input type="text" placeholder="填写详细地址，例：深南大道1001号腾讯大厦1楼7-11商铺"
                        class="detail-area" v-model='detailArea'>
                    </p>
                    <p class='tip' v-show='addressShow'>
                        <span class="iconfont icongantanhao"></span>
                        <span v-text='addressText'></span>
                        <!-- 填写企业所在详细地址 -->    
                    </p>
                </div>
            </div>
            <!-- 薪资 -->
            <div>
                <span>薪<i>薪资</i>资 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
                    <div class="money" >
                        <span class="month" v-show="month==1">
                            <el-input
                                v-on:input="integerOne()"
                                placeholder="例：5000"
                                v-model="salaryOne"
                                clearable>
                            </el-input> 
                            <span>至</span> 
                            <el-input
                                v-on:input="integerTwo()"
                                @focus="integerTwoFocus()"
                                @blur="integerTwoBlur()"
                                placeholder="例：10000"
                                v-model="salaryTwo"
                                clearable>
                            </el-input> 
                            <span>元</span>
                        </span>
                        <span class="day" v-show="month==2">
                            <el-input
                                placeholder="例：10000"
                                v-on:input="integerDay()"
                                v-model="salaryTwo"
                                clearable>
                            </el-input> 
                        </span>                       
                        <i>
                            <span @click='checkMonth(1)'>
                                <span class="iconfont iconradio-checked1" v-show="month==1"></span> 
                                <span class="iconfont icondanxuan" v-show="month==2"></span>                               
                                <span>月结</span>
                            </span>
                            <span @click='checkMonth(2)'>
                                <span class="iconfont iconradio-checked1" v-show="month==2"></span> 
                                <span class="iconfont icondanxuan" v-show="month==1"></span>    
                                <span>日结</span>
                            </span>
                        </i>     
                    </div>
                    <p class='tip' v-show='moneyTipShow'>
                       <span class="iconfont icongantanhao"></span>
                       <span v-text='moneyTip'></span>
                    </p>
                </div>
            </div>
            <div class="line"></div>
            <!-- 工作类型 -->
            <div>
                <span>工作类型 <span class="iconfont iconjiufuqianbaoicon14"></span></span> 
                <div class="right">
                    <span class='job-type-check'>
                        <span @click='checkJobType(0)'>
                            <span class="iconfont iconradio-checked1" v-show="jobType==0"></span> 
                            <span class="iconfont icondanxuan" v-show="jobType==1"></span>
                            <span>全职</span>
                        </span>
                        <span @click='checkJobType(1)'>
                             <span class="iconfont iconradio-checked1" v-show="jobType==1"></span> 
                            <span class="iconfont icondanxuan" v-show="jobType==0"></span> 
                            <span>兼职</span>
                        </span>
                    </span> 
                </div>
                
            </div>
            <!-- 经验要求 -->
            <div>
                <span>经验要求 </span> 
                <div class="right job-time">
                    <el-select v-model="experience" filterable placeholder="">
                        <el-option
                        v-for="item in experienceArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span>年以上</span>
                </div>
            </div>
            <!-- 年龄要求 -->
            <div>
                <span>年龄要求 </span> 
                <div class="right age"> 
                    <div>    
                        <el-input
                            v-model='age_1'
                            v-on:input="ageOne()"
                            placeholder="18~70"
                            clearable>
                        </el-input>                           
                        <span>至</span>
                        <el-input
                            v-model='age_2'
                            v-on:input="ageTwo()"
                            @focus="ageTwoFocus()"
                            @blur="ageTwoBlur()"
                            placeholder="18~70"
                            clearable>
                        </el-input>                        
                    </div> 
                    <p class='tip' v-show='ageTipShow'>
                        <span class="iconfont icongantanhao"></span>
                        <span v-text='ageTip'></span>
                    </p>                 
                </div>
               
            </div>
            <div class="line"></div>
            <!-- 企业简介 -->
            <div>
                <span class='no-line-height'>职位描述</span> 
                <div class="right">
                    <div class="textarea-box">
                        <textarea id="editor" placeholder="请简要描述工作职责或工作内容，最多1000字。" maxlength="1000"                       
                        ></textarea>
                        <span>{{textareaText}}/1000</span>
                    </div>
                </div>
            </div>
            <!-- 技能标签 -->
            <div>
                <span class='no-line-height'>技能标签 </span> 
                <div class="right">
                   <p class="label-text">选择该职位要求的技能标签，最多4项</p>
                   <div class="label-box">
                      <span v-for='item in skillArr' 
                      v-bind:class='{bg:item.flag==true}'
                      @click='checkSkill(item)'>{{item.name}}</span>  
                   </div>
                   <p class='error-label' v-show='skillTip'><span><span class="iconfont icongantanhao"></span>您已添加4个技能标签，取消后再进行更新或者自定义添加。</span></p>
                   <div class="custom_input" v-show='!customSkill'>
                       <input type="text" placeholder="最多6个字" maxlength="6" v-model="addSkill">
                       <span @click='skillConfirm()'>确定</span>
                       <span @click='skillCancel()'>取消</span>  
                   </div>
                   <div class="custom" @click='clickCustomSkill()' v-show='customSkill'>
                       <span class="iconfont iconjia"></span><span>自定义</span>
                   </div>
                    
                </div>
            </div>
            <!-- 福利待遇 -->
            <div>
                <span class='no-line-height'>福利待遇 </span> 
                <div class="right">
                   <p class="label-text">选择该职位享有的福利待遇，最多6项</p>
                   <div class="label-box">
                      <span v-for='item in welfareArr' 
                      v-bind:class='{bg:item.flag==true}'
                      @click='checkWelfare(item)'>{{item.name}}</span>  
                   </div>
                   <p class='error-label' v-show='welfareTip'><span><span class="iconfont icongantanhao"></span>您已添加6个福利待遇标签，取消后再进行更新或者自定义添加。</span></p>
                   <div class="custom_input" v-show='!customWelfare'>
                       <input type="text" placeholder="最多6个字" maxlength="6" v-model="addWelfare">
                       <span @click='welfareConfirm()'>确定</span>
                       <span @click='welfareCancel()'>取消</span>  
                   </div>
                   <div class="custom" @click='clickCustomWelfare()' v-show='customWelfare'>
                       <span class="iconfont iconjia"></span><span>自定义</span>
                   </div>
                   <p class='rule'>已阅读并遵守<span>《名厨之家职位信息发布规则》</span></p>
                   <div class="next">
                       <span @click='release()'>发布</span>
                       <span><span class="iconfont icongantanhao"></span> 每个职位默认有效期为30天，到期自动关闭，可手动重新发布</span>
                   </div>
                    <div class="sensitive">
                       <span v-show='sensitive'><span class="iconfont icongantanhao"></span> 职位内容中不允许含有敏感词， 请修改后再发布</span>
                   </div>  
                    
                </div>
            </div>

        </div> 
        <el-dialog
            title="恭喜你，职位发布成功！"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>职位每天可刷新1次，有求职者投递请到“简历管理”中查看。</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click='i_know()'>我知道了</el-button>
            </span>
        </el-dialog>
         
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
        editorId:'',//编辑id
        name:'',//职位名称
        centerDialogVisible: false,
        moneyTip:'',//薪资提示文字
        moneyTipShow:false,//薪资提示显示
        salaryOne:'',//薪资1
        salaryTwo:'',//薪资2
        month:1,//默认月1日2
        day:'',//日结
        experience:'',//经验
        textareaText:0,//企业简介
        experienceArr:[
            // 0、1、3、5、7、10、15、20
            { value: '1', label: '1'},
            { value: '2', label: '3'},
            { value: '3', label: '5'},
            { value: '4', label: '7'},
            { value: '5', label: '10'},
            { value: '6', label: '15'},
            { value: '7', label: '20'},
        ],
        jobType:0,//工作类型 全职
        province: '',
        city: '',
        area: '',
        provinceArr:[],//省
        cityArr:[],//市
        areaArr:[],//区
        detailArea:'',//详细地址
        addressShow:false,//地址不显示
        addressText:'',//地址文案
        age_1:'',//年龄1
        age_2:'',//年龄2
        ageTipShow:false,
        ageTip:'',
        customSkill:true,//自定义技能按钮显示
        addSkill:'',//自定义技能添加的内容
        skillArr:[],//技能标签
        addSkillArr:[],//被选中的技能标签
        skillTip:false,
        customWelfare:true,//自定义福利按钮显示
        addWelfare:'',//自定义福利添加的内容
        welfareTip:false,
        welfareArr:[],//福利待遇
        addWelfareArr:[],//被选中的福利待遇
        sensitive:false,
        requestId:localStorage.getItem('requestId'),  
    }
  },
  methods:{
    getSkillArr(){//技能标签
        this.$http.get('/service/taxonomies/486',{
        }).then((res)=>{
            let skillArr=res.data.allNodes;
            skillArr.forEach(function(v){
                v.flag=false;
            })
            this.skillArr=skillArr;
        }).catch((error)=>{
        })
    },
    getWelfareArr(){//福利待遇
        this.$http.get('/service/taxonomies/488',{
        }).then((res)=>{
            let welfareArr=res.data.allNodes;
            welfareArr.forEach(function(v){
                v.flag=false;
            })
            this.welfareArr=welfareArr;
        }).catch((error)=>{
        })
    },
    release(){//发布
        let detailReg=/^(?=.*?[\u4E00-\u9FA5])[\u4e00-\u9fffa-zA-Z\d\-]+$/;
        // name(职位名称)
        // province(省code值)
        // city(市code值)
        // area(区code值)
        // address(地址)
        // paymentMin(薪酬最低值)
        // paymentMax(薪酬最高值),note:日结只传这个参数
        // paytype薪酬结算方式  1 月结 2日结 3 其他
        // isParttime  是否兼职 0否1全职 jobType
        // workYear  工作经验
        // age 年龄要求
        // description 职位描述
        // remark 技能标签
        // welfare  福利待遇
        // if(!this.name ){
        //     $('#releasePositions').scrollTop(0);
        //     return;
        // }
        // if(!this.province){
        //     this.addressShow=true;
        //     this.addressText='请选择省份'
        //     $('#releasePositions').scrollTop(0);
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!this.city){
        //     this.addressShow=true;
        //     this.addressText='请选择城市'
        //     $('#releasePositions').scrollTop(0);
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!this.area){
        //     this.addressShow=true;
        //     this.addressText='请选择所在区'
        //     $('#releasePositions').scrollTop(0);
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!this.detailArea){
        //     this.addressShow=true;
        //     this.addressText='请填写企业所在详细地址'
        //     $('#releasePositions').scrollTop(0);
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(!detailReg.test(this.detailArea)){
        //     this.addressShow=true;
        //     this.addressText='详细地址有误'
        //     $('#releasePositions').scrollTop(0);
        //     return;
        // }else{
        //     this.addressShow=false;
        // }
        // if(this.month==1){
        //     if(!this.salaryOne){
        //         this.moneyTipShow=true;
        //         this.moneyTip='请填写薪资';
        //         $('#releasePositions').scrollTop(0);
        //         return;
        //     }else{
        //         this.moneyTipShow=false;
        //     }
        //     if(!this.salaryTwo){
        //         this.moneyTipShow=true;
        //         this.moneyTip='请填写薪资范围';
        //         $('#releasePositions').scrollTop(0);
        //         return;
        //     }else{
        //         this.moneyTipShow=false;
        //     }
        // }
        // if(this.month==2){
        //     this.salaryOne='';
        //     if(!this.salaryTwo){
        //         this.moneyTipShow=true;
        //         this.moneyTip='请填写薪资';
        //         $('#releasePositions').scrollTop(0);
        //         return;
        //     }else{
        //         this.moneyTipShow=false;             
        //     }
        // }
        let age=this.age_1+'~'+this.age_2;
        let description=this.editor.getData();
        console.log( description.length )
        let remarkArr=[],welfareArr=[];
        console.log( this.addSkillArr, this.addWelfareArr)
        this.addSkillArr.forEach(function(v){
           remarkArr.push(v.name)   
        })
        this.addWelfareArr.forEach(function(v){
           welfareArr.push(v.name)   
        })
        let remark=remarkArr.join(',');
        let welfare=welfareArr.join(',');
        let params={//发布参数
            name:this.name,//职位名称
            province:this.province,
            city:this.city,
            area:this.area,
            address:this.detailArea,
            paymentMin:this.salaryOne,//薪酬最低值
            paymentMax:this.salaryTwo,//薪酬最高值
            paytype:this.month,//1 月结 2日结
            isParttime:this.jobType,//是否兼职 0全职1兼职
            workYear:this.experience,//工作经验
            age:age,//年龄要求
            description:description,//职位描述
            remark:remark,//技能标签
            welfare:welfare,//福利待遇
           
        }
        let that=this;
        that.$http.post('/api/job-route-invoker/job/pushJob',params
        ).then((res)=>{
            console.log(res)
            if(res.data.code=='002'){
                this.$message({
                    type: 'success',
                    message: '发布成功!'
                });
                this.sensitive=false;
                this.centerDialogVisible=true;
            }
            if(res.data.code=='503'){
               this.sensitive=true;
            }
        }).catch((error)=>{
        })
        
    },
    clickCustomSkill(){//点击技能自定义
      this.customSkill=!this.customSkill;
      this.addSkill='';
    },
    checkSkill(item){//点击技能
        let that=this;
        if(!item.flag){
            let addSkillArr=[];
            that.skillArr.forEach(function(v){
                if(v.flag){
                    addSkillArr.push(v);
                }
            })
            if(addSkillArr.length>=4){
                that.skillTip=true;
            }else{
                item.flag=!item.flag;
                addSkillArr.push(item);
                that.skillTip=false;
            }
            that.addSkillArr=addSkillArr;
            console.log(that.addSkillArr)
        }else{
            item.flag=!item.flag;
            that.addSkillArr.forEach(function(v,i){
                if(v.name==item.name){
                    that.addSkillArr.splice(i,1)
                }
            })
           
            console.log(that.addSkillArr);
            that.skillTip=false;
        }  
    },
    skillConfirm(){//技能确定
        if(!this.addSkill){
            this.$message({
                message: '请输入自定义内容',
                type: 'warning',
                center: true
            });
            return;
        }
        let addSkillArr=[];
        this.skillArr.forEach(function(v){
            if(v.flag){
                addSkillArr.push(v);
            }
        })
        if(addSkillArr.length>=4){
            this.skillTip=true;
        }else{
            this.customSkill=!this.customSkill;
            this.skillArr.unshift({
                name:this.addSkill,flag:true
            }); 
            addSkillArr.unshift({
                name:this.addSkill,flag:true
            }); 
            this.addSkillArr=addSkillArr;
            console.log( this.addSkillArr)
            this.skillTip=false;
        }
        
       
    },
    skillCancel(){//技能取消
        this.customSkill=!this.customSkill;
    },
    clickCustomWelfare(){//点击福利自定义
      this.customWelfare=!this.customWelfare;
      this.addWelfare='';
    },
    checkWelfare(item){//点击福利
        console.log(item)
        let that=this;
        if(!item.flag){
            let addWelfareArr=[];
            that.welfareArr.forEach(function(v){
                if(v.flag){
                    addWelfareArr.push(v);
                }
            })
            if(addWelfareArr.length>=6){
                this.welfareTip=true;
            }else{
                item.flag=!item.flag;
                addWelfareArr.push(item);
                this.welfareTip=false;
            }
            this.addWelfareArr=addWelfareArr;
            console.log(that.addWelfareArr)
        }else{
            item.flag=!item.flag;
            that.addWelfareArr.forEach(function(v,i){
                if(v.name==item.name){
                    that.addWelfareArr.splice(i,1)
                }
            })         
            console.log(that.addWelfareArr);
            this.welfareTip=false;
        }  
    },
    welfareConfirm(){//福利确定
        if(!this.addWelfare){
            this.$message({
                message: '请输入自定义内容',
                type: 'warning',
                center: true
            });
            return;
        }
        let addWelfareArr=[];
        this.welfareArr.forEach(function(v){
            if(v.flag){
                addWelfareArr.push(v);
            }
        })
        if(addWelfareArr.length>=6){
            this.welfareTip=true;
        }else{
            this.customWelfare=!this.customWelfare;
            this.welfareArr.unshift({
                name:this.addWelfare,flag:true
            }); 
            addWelfareArr.unshift({
                name:this.addSkill,flag:true
            });  
            this.addWelfareArr=addWelfareArr;
            this.welfareTip=false;
        }
       
    },
    welfareCancel(){//福利取消
        this.customWelfare=!this.customWelfare;
    },
    integerOne(){//输入整数
        this.salaryOne=this.salaryOne.replace(/^(0+)|[^\d]+/g,'')
    },
    integerTwoFocus(){//2薪资获取焦点
        if(!this.salaryOne){
            this.moneyTipShow=true;
            this.moneyTip='请先写入第一个薪资';
        }
    },
    integerTwoBlur(){//2薪资失去焦点
        this.moneyTipShow=false;
        let salaryTwo=parseInt( this.salaryTwo );
        let salaryOne=parseInt( this.salaryOne );
        if( salaryOne > salaryTwo){//1>2
            this.moneyTipShow=true;
            this.moneyTip='第二薪资不能小于第一薪资';
        }
    },
    integerTwo(){//输入整数
        this.salaryTwo=this.salaryTwo.replace(/^(0+)|[^\d]+/g,'');
        if(!this.salaryOne){
            this.moneyTipShow=true;
            this.moneyTip='请先写入第一个薪资';
            this.salaryTwo='';
            return;
        }
        let salaryTwo=parseInt( this.salaryTwo );
        let salaryOne=parseInt( this.salaryOne );
        if(salaryTwo > 2*salaryOne){
            this.moneyTipShow=true;
            this.moneyTip='薪资跨度不能超过2倍';
            this.salaryTwo='';
            return;
        }else{
            this.moneyTipShow=false;
        }

       
    },
    integerDay(){
        this.salaryTwo=this.salaryTwo.replace(/^(0+)|[^\d]+/g,'');
    },
    checkMonth(status){//薪资
      this.month=status;
      this.salaryTwo='';
      this.salaryOne='';
      this.day='';
    },
    ageOne(){//输入年龄1
        this.age_1=this.age_1.replace(/^(0+)|[^\d]+/g,'');
    },
    ageTwoFocus(){//年龄2获取焦点
        if(!this.age_1){
            this.ageTipShow=true;
            this.ageTip='请输入起始年龄';
        }else{
            if(this.age_1<18 || this.age_1>70){
                this.ageTipShow=true;
                this.ageTip='年龄在18~70之间';
                this.age_1='';
            }
        }
       
    },
    ageTwoBlur(){//年龄2失去焦点
        this.ageTipShow=false;
        if(this.age_1&&this.age_2){
            if(this.age_2<18 || this.age_2>70){
                this.ageTipShow=true;
                this.ageTip='年龄在18~70之间';
                this.age_2='';
            }else{
                this.ageTipShow=false;
                if( this.age_1 > this.age_2){
                    this.ageTipShow=true;
                    this.ageTip='最大年龄不能小于起始年龄';
                    this.age_2='';
                }else{
                    this.ageTipShow=false;
                }
            }
           
        }
       
    },
    ageTwo(){//输入整数
        this.age_2=this.age_2.replace(/^(0+)|[^\d]+/g,'');
        if(!this.age_1){
            this.ageTipShow=true;
            this.ageTip='请输入起始年龄';
            this.age_2='';
            return;
        }
        if(this.age_1<18 || this.age_1>70){
            this.ageTipShow=true;
            this.ageTip='年龄在18~70之间';
            this.age_2='';
            return;
        }
        if(this.age_2>70){
            this.ageTipShow=true;
            this.ageTip='年龄在18~70之间';
            this.age_2='';
            return;
        }
        this.ageTipShow=false;
    },
    checkJobType(status){//工作类型
      this.jobType=status;
    },
    open7() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    i_know(){//我知道了
        this.centerDialogVisible=false;
        this.$router.push('/allPosition');//跳转到职位管理
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
    getEditorData(){
        let that=this;
        that.$http.get('/api/job-route-invoker/job/getZpJobById/'+that.editorId+'?requestId='+that.requestId,{
        }).then((res)=>{
           console.log(res) 
           if(res.data.code=='000'){
              let detail=res.data.data;
              this.name=detail.name;
              this.province=detail.name;
              this.city=detail.city;
              this.area=detail.area;
              if(detail.paytype==1){//1 月结 2日结
                this.month=1;
                this.salaryOne=detail.paymentMin;
                this.salaryTwo=detail.paymentMax;
              }else if(detail.paytype==2){
                this.month=2;
                this.salaryTwo=detail.paymentMax;
              }
              this.jobType=detail.isParttime;
              this.experience=detail.workYear;
              this.age=detail.age;
              this.editor.setData(detail.description)
           }
            // name:this.name,//职位名称
            // province:this.province,
            // city:this.city,
            // area:this.area,
            // address:this.detailArea,
            // paymentMin:this.salaryOne,//薪酬最低值
            // paymentMax:this.salaryTwo,//薪酬最高值
            // paytype:this.month,//1 月结 2日结
            // isParttime:this.jobType,//是否兼职 0全职1兼职
            // workYear:this.experience,//工作经验
            // age:age,//年龄要求
            
            // description:description,//职位描述
            // remark:remark,//技能标签
            // welfare:welfare,//福利待遇 
        }).catch((error)=>{
        })

    }
  },
  beforeRouteLeave(to, from, next) {
      let ckeditor=this.editor.getData();
      if(this.name!=''||this.province!=''||this.detailArea!=''
      ||this.salaryOne!=''||this.salaryTwo!=''||this.age_1!=''||ckeditor!=''||this.experience!=''||
       this.addSkillArr.length!=0|| this.addWelfareArr.length!=0){
        this.$confirm('内容没有保存，确定要离开吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
        }).then(() => {
            next();
        })
          
      }else{
        next();
      }
  },
  watch:{ 
    
  },
  created(){
    this.getProvince();
    this.getSkillArr();
    this.getWelfareArr();
    this.editorId=this.$route.query.id;
    console.log(this.editorId)
  },
  mounted(){
    let that=this;
    that.getEditorData();
    CKEDITOR.replace('editor', {height: '200px', width: '600px', toolbar: 'toolbar_Full'});
    that.editor = CKEDITOR.instances.editor;  
    // CKEDITOR.instances.WORK_INTRODUCTION.setData(“要显示的文字内容”);
    that.editor.on('change',function(){
        if(that.editor.getData()==''){
            that.editor.getData('')
            that.textareaText=0;
            return;
        }else{
            setTimeout(function(){
                let content=that.editor.document.getBody().getText();
                that.textareaText=content.length;   
            },1600)
        }     
    }); 
  }
}
</script>
<style scoped lang='scss'>
#releasePositions{
    height: auto;
    min-height: 100%;
}
.content-box{
    padding: 50px 80px 0 40px;
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
    .content-1{
        padding: 0 50px;
        .line{
            border-bottom:1px solid #e5e5e5;
        }
        >div{
            margin-top: 20px;
            >span:nth-of-type(1){
                color: #333;
                width: 100px;
                display: inline-block;
                font-size: 15px;
                float: left;
                margin-top: 8px;
                span{
                    font-size: 15px;
                    color: red;
                }
                i{
                    visibility: hidden;
                }
            }
            span.no-line-height{
            margin-top: 0;

            }
            >.right{
                margin-left: 100px;
                >.job-name-tip{
                    color: red;
                    span{
                        color: red;
                        position: relative;
                        top: 1px;
                    }
                }
                .job-name{
                    width: 300px;
                    height: 34px;
                    border: 1px solid #DCDFE6;
                    border-radius: 3px;
                    margin-right: 8px;
                    padding-left: 10px;
                    padding-right: 10px;
                }
                .detail-area{
                    width: 480px;
                    height: 40px;
                    border: 1px solid #DCDFE6;
                    border-radius: 3px;
                    margin-top: 15px;
                    padding-left: 10px;
                }
                .money{
                    >.month{ 
                        display: inline-block;                      
                        span{
                            margin: 0 5px;
                        }
                    }
                    >.day{ 
                        display: inline-block;                      
                    }
                    >i{
                        font-style: normal;                  
                        margin-left: 30px;
                        >span{
                            cursor: pointer;
                            >.iconradio-checked1{
                                font-size: 24px!important;
                                position: relative;
                                top: 3px;
                                color: #999;
                            }
                            >.icondanxuan{
                                font-size: 22px!important;
                                position: relative;
                                top: 2px;
                                color: #999;
                            }
                            span:nth-of-type(2){
                                font-size: 15px;
                            }

                        }
                        >span:nth-of-type(2){
                            margin-left: 20px;
                        }

                    }
                }
                .tip{
                    margin-top: 6px;
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
                .job-type-check{               
                    >span{
                        cursor: pointer;
                        >.iconradio-checked1{
                            font-size: 24px!important;
                            position: relative;
                            top: 3px;
                            color: #999;
                        }
                        >.icondanxuan{
                            font-size: 22px!important;
                            position: relative;
                            top: 2px;
                            color: #999;
                        }
                        span:nth-of-type(2){
                            font-size: 15px;
                        }

                    }
                    >span:nth-of-type(2){
                        margin-left: 20px;
                    }
                }
                .textarea-box{
                    position: relative;
                    border-radius: 3px;
                    width: 600px;
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
                }
                .label-box{
                    width: 800px;
                    margin-top: 10px;
                    span{
                        display: inline-block;
                        padding: 8px;
                        border-radius: 2px;
                        margin-right: 15px;
                        background: #e5e5e5;
                        margin-top: 15px;
                        cursor: pointer;
                    }
                    span.bg{
                        background: pink;
                        color: #fff;
                    }
                }
                .custom{
                    width: 80px;
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
                >.rule{
                    margin-top: 40px;
                    color: #999;
                }
                .next{
                    >span:nth-of-type(1){
                        display: inline-block;
                        width: 140px;
                        height: 44px;
                        line-height: 42px;
                        background: #ccc;
                        margin-top: 10px;
                        text-align: center;
                        border-radius: 3px;
                        font-size: 15px;
                        margin-bottom: 10px;
                        cursor: pointer;
                    }
                    >span:nth-of-type(2){
                        margin-left: 10px;
                        color: #999;
                        span{
                            color: #666;
                            position: relative;
                            top: 1px;
                        }
                    }
                
                }
                .sensitive{
                    padding-bottom: 50px;
                    >span{
                        color: red;
                        span{
                            color: red;
                            position: relative;
                            top: 1px;
                        }
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
                .error-label{
                    color: red;
                    margin-top: 8px;
                }
                
            }
            >.right.age{
                div{
                    span{
                        margin: 0 6px;
                    }
                }
                
            }
        
        }
    }
}
</style>
<style>
#releasePositions .el-select{
   margin-right: 10px;
}
#releasePositions .el-select>.el-input {
   width: 150px;
}
#releasePositions .money .el-input{
    width: 120px;
}
#releasePositions .right.age .el-input{
    width: 90px;
}
#releasePositions .job-type .el-input{
    width: 300px;
}
#releasePositions .job-time .el-input{
    width: 80px;
    margin-right: 6px;
}
#releasePositions .ck.ck-editor {
    width: 600px;
}
#releasePositions input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #999;
    font-size: 13px;
}
#releasePositions .el-input__inner::-webkit-input-placeholder{
    color: #999;
    font-size: 13px;
}
#releasePositions .el-dialog--center {
    width: 40%!important;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin-top: 0!important;
}
#releasePositions .el-dialog__header {
    padding: 80px 20px 10px;
   
}
#releasePositions .el-dialog__title{
    font-weight: 700;
    font-size: 22px;
}
#releasePositions .el-dialog__body {
    padding: 10px 25px 30px;
}
#releasePositions .el-dialog__headerbtn .el-dialog__close{
    font-size: 30px;
}
#releasePositions .el-dialog__footer{
    padding: 10px 20px 40px;

}
#releasePositions .el-dialog--center .el-dialog__body {
    text-align: center;
}
#releasePositions .el-button--primary {
    color: #333;
    background-color: #ccc;
    border-color: #ccc;
}
#releasePositions .el-message-box__message p {
    font-size: 18px;
}
.el-message-box__message p{
    font-size: 18px;
    margin-bottom: 20px;
}
.el-button--small {
    padding: 10px 24px!important;
    font-size: 16px;
}
.el-message-box__btns button:nth-child(2) {
    margin-left: 36px!important;
    font-size: 16px;
}
.el-message-box__headerbtn .el-message-box__close{
    font-size: 24px;
}
</style>




<template>
    

<div class="createTender_page">
    
    <header-top title='修改订单' back></header-top>
    <div class="fixed-top-div"></div>

    <div class="content fbcg">

        <div class="form-box">

            <form action="" class="form-container layui-form">
                <div class="form-group icon-gt">
                    <label for="">货物类目：</label>
                    <input type="text" lay-verify="pId" @click=" showSelectProductTypeBox = true " v-bind:value="typeProductItem.p_name" readonly placeholder="必填"/>
                </div>

                <div class="form-group">
                    <label for="">标题：</label>
                    <input type="text" v-model:value="order.sTitle" placeholder="必填"/>
                </div>

                <div class="form-group radio-group">
                    <label for="">货物类型：</label>
                    <p style="display: inline-block;">
                        <input id="type1" 
                        v-bind:checked=" order.sType=='全新' " 
                        @click="order.sType='全新' " type="radio" style="opacity:0!important;" name="type-order"/>
                        <label for="type1" class="type-icon"></label>全新
                    </p>

                    <p style="display:inline-block;">
                        <input id="type2"

                         @click="order.sType='旧' " 
                         v-bind:checked=" order.sType=='旧' "
                         type="radio" style="opacity:0!important;" name="type-order"/>
                        <label for="type2" class="type-icon"></label>旧
                    </p>
                </div>

                <!-- ++++++++++++++++++++++++++++++++++++++++++++++ -->



                <div class="form-group">
                    <label for="">数量：</label>
                    <input type="text" v-model:value="order.sQuality"  placeholder="必填"/>
                    <span class="unit" @click="alertSelectBox(3)"  v-text="unit.u_name"></span>
                </div>



                <div class="form-group univalent">
                    <label for="">货物单价：</label>
                    <input type="number" v-model:value="order.sPrice" placeholder="必填，价格面议请写0"/>
                    <span class="unit"  @click="alertSelectBox(2)" v-text="currency.c_name">币种</span>
                </div>


                <div class="form-group icon-gt">
                    <label for="">包装：</label>
                    <input type="text" readonly @click="alertSelectBox(1)" v-bind:value="pack.p_type" placeholder="必填"/>
                </div>




<!-- 
                <div class="form-group">
                    <label for="">出价计价单位：</label>
                    <input type="text" lay-verify="dw_id"  v-bind:value="unit.u_name"  readonly placeholder="个"/>
                </div>

                <div class="form-group icon-gt">
                    <label for="">交易币种：</label>
                    <input type="text" lay-verify="currencyId" readonly @click="alertSelectBox(2)"  v-bind:value="currency.c_name" placeholder="必填"/>
                </div> -->


                <div class="form-group icon-gt">
                    <label for="">交易方式：</label>
                    <input type="text" lay-verify="tradeId" readonly @click="alertSelectBox(4)"  v-bind:value="tradeType.t_type" placeholder="必填"/>
                </div>

                <h3 class="h3-tips" @click="queryrealUserInfo">点击这里使用默认实名信息</h3>


                <!-- +++++++++++++++++++++++货物所在地区+++++++++++++++++ -->
                <div class="form-group icon-gt">
                    <label for="">货物所在地区：</label>
                    <input type="text" @click="showSelectCityBox = true " v-model:value="typeAreaItem.dz_name" readonly placeholder="必填"/>
                </div>



                <div class="form-group">
                    <label for="">联系人：</label>
                    <input type="text" v-model:value="order.s_userName" placeholder="必填"/>
                </div>
                <div class="form-group">
                    <label for="">联系电话：</label>
                    <input type="text" v-model:value="order.sPhone" placeholder="必填"/>
                </div>
                <div class="form-group">
                    <label for="">交易地址：</label>
                    <input type="text" v-model:value="order.sAddress" placeholder="必填"/>
                </div>
                <div class="form-group">
                    <label for="">公司名称：</label>
                    <input type="text"  v-model:value="order.sCompany" placeholder=""/>
                </div>
                <div class="form-group">
                    <label for="">邮箱：</label>
                    <input type="text" v-model:value="order.sEmail" placeholder=""/>
                </div>

                <div class="form-group icon-gt">
                    <label for="">供应期限：</label>
                    <input type="text" readonly @click="alertSelectBox(5)"  v-model:value="order.sDate" placeholder="必填"/>
                </div>

<!--                 <div class="form-group icon-gt">
                    <label for="">对方提货时间：</label>
                    <input type="text" lay-verify="tPicktime" readonly @click="alertSelectBox(6)"  v-model:value="order.t_picktime" placeholder="必填"/>
                </div> -->

                <div class="form-group desc-group">
                    <label for="">详情描述：</label>
                    <textarea v-model:value="order.sDetail" placeholder="请描述货物详细情况，如型号、货物成色、包装大小等货物明细，以便于找到优质商家。"></textarea>
                </div>
                <div class="form-group image-group main-img" id="upload1">
                    <label for="" @click="test()">建议上传高清图片，有助于客户看货出价
                    (<span class='font-style-red'>{{ uploadImgCount }}</span>/5)</label>
                    <!-- 上传图片组件框 -->
                    <drop-zone id="myVueDropzone" ref='uploadImg' :useFontAwesome="false" enctype="multipart/form-data" methods='post' 
                      :autoProcessQueue=false
                      :maxFileSizeInMB=10
                      :showRemoveLink=true

                      :maxNumberOfFiles="pFileCount"

                      :language="{dictRemoveFile:'删除',dictMaxFilesExceeded:'超过最大上传图片数量',dictCancelUpload:'取消上传',dictFileTooBig:'目标文件为{{filesize}}Mib，超过最大尺寸{{maxFilesize}}Mib'}"

                      acceptedFileTypes="image/*" 
                      :url=uploadUrl 
                      v-bind:preview-template="template"
                      v-on:vdropzone-success="showSuccess"
                      v-on:vdropzone-removed-file="removeImg"
                      v-on:vdropzone-file-added="addImg"
                      v-on:vdropzone-queue-complete="complete"
                    >


                    <div v-show=" uploadSwitch " class="img-upload-box dz-default dz-message">
                        <img src="../../../assets/imgs/publish/img-upload.png" alt="" />
                    </div>

                    <div class="dz-preview dz-image-preview" v-for=" (item,index) in pFileArr ">
                        <div class="dz-thumb">
                          <div class="dz-image">
                            <img :src="item"/>
                          </div>
                        </div>
                        <a class="dz-remove" href="javascript:undefined;" @click="deleteImg(index,'pri')" data-dz-remove="">删除</a>
                    </div>


                    </drop-zone>


                </div>
                <div id="upload2" class="form-group image-group info-img">
                    <label>货物详情图(<span class='font-style-red'>{{ uploadImg2Count }}</span>/100)</label>

                    <!-- 上传图片组件框 -->
                    <drop-zone id="myVueDropzone2" ref='uploadImg2' :useFontAwesome="true" enctype="multipart/form-data" methods='post' 
                      :autoProcessQueue=false
                      :maxFileSizeInMB=10
                      :showRemoveLink=true
                      :maxNumberOfFiles="pDetailCount"
                      :language="{dictRemoveFile:'删除',dictMaxFilesExceeded:'超过最大上传图片数量',dictCancelUpload:'取消上传',dictFileTooBig:'目标文件为{{filesize}}Mib，超过最大尺寸{{maxFilesize}}Mib'}"

                      acceptedFileTypes="image/*" 
                      url=uploadUrl 
                      v-bind:preview-template="template"
                      v-on:vdropzone-success="showSuccess2"
                      v-on:vdropzone-removed-file="removeImg2"
                      v-on:vdropzone-file-added="addImg2"
                      v-on:vdropzone-queue-complete="complete"
                    >

                    <div v-show=" uploadSwitch2 " class="img-upload-box dz-default dz-message">
                        <img src="../../../assets/imgs/publish/img-upload.png" alt="" />
                    </div>



                    <div class="dz-preview dz-image-preview" v-for=" (item,index) in pDetailArr ">
                        <div class="dz-thumb">
                          <div class="dz-image">
                            <img :src="item"/>
                          </div>
                        </div>
                        <a class="dz-remove" href="javascript:undefined;" @click="deleteImg(index,'det')" data-dz-remove="">删除</a>
                    </div>
                    
                    </drop-zone>
                </div>
                <div class="form-group btn-group">
                    <input type="submit" value="提交" @click.prevent="submitPhoto" class="btn-control"/>
                </div>
                <div class="form-group agree-group">
                    <input type="checkbox" @click=" agree = !agree " id="agree"/>
                    <label for="agree" id="agreeStyle"></label>
                    <span @click=" showRule ">我已阅读<i>《采购供应信息发布规则》</i></span>
                </div>
            </form>
        </div>


        <!--地区选择框-->

        <!--选择类目-->

        <!--单位选择弹窗-->

    </div>

  <!-- 产品类别选择组件 -->
  <transition>
    <product-type v-show="showSelectProductTypeBox" @selectProductType="selectProductType"></product-type>
  </transition>


  <!-- 地区选择组件 -->
  <transition>
    <city v-show='showSelectCityBox' @selectCity='selectCity'></city>
  </transition>



<!-- 选择单位框 -->

  <div class="layui-m-layer" index="1" style="z-index:9999" @click=" closeMask " v-if=" showSelectBox ">
    <div class="layui-m-layershade"></div>
  </div>


  <div class="selectBox" id='selectBox' v-if=" showSelectBox ">

    <div class="selectBox_cell" v-show=" showSelectBoxId == 1 ">
      <h3>选择包装类型</h3>
      <ul>
        <li v-for="(item,index) in unitList.Packs" @click="pack=item" v-text="item.p_type"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 2 ">
      <h3>交易币种</h3>
      <ul>
        <li v-for="(item,index) in unitList.Currencys" @click="currency = item" v-text="item.c_name"></li>
      </ul>
    </div>
    <div class="selectBox_cell" v-show=" showSelectBoxId == 3 ">
      <h3>单位</h3>
      <ul>
        <li v-for="(item,index) in unitList.Units" @click="unit=item" v-text="item.u_name"></li>
      </ul>
    </div>


    <div class="selectBox_cell" v-show=" showSelectBoxId == 4 ">
      <h3>包装方式</h3>
      <ul>
        <li v-for="(item,index) in unitList.Trades" @click="tradeType=item" v-text="item.t_type"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 5 ">
      <h3>期限(天)</h3>
      <ul>
        <li v-for="item in 30" @click="endTime = item" v-text="item"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 6 ">
      <h3>期限</h3>
      <ul>

        <li v-for="item in 30" @click="getTime = item" v-text="item"></li>
        <li @click="getTime = 60">60</li>
        <li @click="getTime = 90">90</li>
        <li @click="getTime = 120">120</li>
        <li @click="getTime = 150">150</li>
        <li @click="getTime = 180">180</li>
        
      </ul>
    </div>

  </div>


</div>


</template>


<script>
    
import headerTop from '@/components/header/header'
import productType from '@/components/common/productType'
import city from '@/components/common/city'

import dropZone from 'vue2-dropzone'
import bScroll from 'better-scroll'

import unit from '@/data/unit'

import {showRule3,uploadUrl} from '@/tool/tool'


export default{
    components:{
        headerTop,
        productType,
        city,
        dropZone
    },

  data(){

    return{
      uploadUrl:uploadUrl,
      showSelectBoxId:3,
      showSelectBox:false,

      unitList:null,//所有单位数据

      uploadSwitch:true,//上传图片入口状态
      uploadImgCount:0,//上传图片数主图

      showSelectProductTypeBox:false,//选择产品分类
      showSelectCityBox:false,//选择城市

      uploadSwitch2:true,//详情图上传开关

      uploadImg2Count:0,//上传详情图总数

      pFileCount:5,//主图显示张数
      pDetailCount:100,//详情图显示张数


      order:{

        pId:"",
        pFile:"",
        pDetail:'',
        unitId:'',
        currencyId:'',
        usrId:this.$store.getters.getVip,
        packId:"",
        tradeId:"",
        areaId:"",
        sTitle:"",
        sType:"",
        sQuality:"",
        sPrice:"",
        s_userName:"",
        sPhone:"",
        sAddress:"",
        sCompany:"",
        sEmail:"",
        sDate:"",
        sDetail:"",

        listRar:"",
        pRar:"",
        pCargolist:""

      },

        unitList:[],//包装类型
        unit:{
            "u_name":""
        },//数量单位
        currency:{
            "c_name":""
        },//币种
        pack:{
            "p_type":""
        },//包装
        openPrice:true,//是否开价
        typeProductItem:{},//选择类目
        //交易方式
        tradeType:{
          "t_type":""
        },
        typeAreaItem:{},//货物地区

        pFileArr:[],//主图路径
        pDetailArr:[],//详情图路径

        pFileArrStr:'',//主图str
        pDetailArrStr:'',//详情图str


        newPriList:[],
        newDetList:[],

        //供应期限
        endTime:null,
        agree:false,//是否阅读规则协议

        scroller:null,



    }

  },


  mounted(){


    //赋值单位
    this.unitList = unit;

    //
    this.$nextTick(()=>{

      // console.log(this.$route.query);

      this.querySupplyInfo();

      this.scroller = new bScroll(".fbcg",{
        bounce:false,
        click:true,
        momentum:true,
      })



    })

  },
  watch:{

    uploadImgCount(){
      this.refresh();
    },
    uploadImg2Count(){
      this.refresh();
    },
    endTime:function(val){
        this.order.sDate = val;
        this.showSelectBox = false;
    },

    //币种
    currency:function(val){
        this.order.currencyId = val.c_id;
        this.showSelectBox = false;

    },
    //包装
    pack:function(val){
        this.order.packId = val.p_id;
        this.showSelectBox = false;

    },
    //单位
    unit:function(val){

        this.order.dw_id = val.u_id;
        this.order.dw_name = val.u_name;

        this.order.unitId = val.u_id;

        this.showSelectBox = false;

    },
    //交易方式
    tradeType:function(val){
        this.order.tradeId = val.t_id;
        this.order.jy_name = val.t_type;
        this.showSelectBox = false;

    },




  },

  methods:{
    refresh(){
      setTimeout(()=>{

        this.scroller.refresh();

      },200)
    },
    //显示规则
    showRule(){
      showRule3();
    },
    //验证表单输入
    checkInput(){


      if(!this.typeProductItem.p_name){
        layer.msg("请选择货物类目")
        return;
      }
      if(this.order.sTitle==""){
        layer.msg("请输入标题")
        return;
      }

      if(this.order.sQuality==""){
        layer.msg("请输入货物数量")
        return;
      }
      if(this.order.sPrice == ""){
        layer.msg("请输入货物单价")
        return;
      }
      if(!this.pack.p_type){
        layer.msg("请选择包装")
        return;
      }

      if(!this.tradeType.t_type){
        layer.msg("请选择交易方式")
        return;
      }

      if(!this.typeAreaItem.a_name){
        layer.msg("请选择货物所在地区")
        return;
      }
      if(this.order.s_userName =="" ){
        layer.msg("请输入联系人")
        return;
      }
      if(this.order.sPhone =="" ){
        layer.msg("请输入联系电话")
        return;
      }
      if(this.order.sAddress =="" ){
        layer.msg("请输入交易地址")
        return;
      }
      if(this.order.sDate =="" ){
        layer.msg("请选择供应期限")
        return;
      }

      if(this.$refs.uploadImg.dropzone.files.length < 1){
        layer.msg("请上传货物主图")
        return;
      }

      if(this.$refs.uploadImg2.dropzone.files.length < 1){
        layer.msg("请上传货物详情图")
        return;
      }

      if(!this.agree){
        layer.msg("请阅读并同意信息发布规则")
        return;
      }

      return true;


    },


    //查询订单信息
    querySupplyInfo(){

        // console.log(this.$route.query);
        // return;
        this.$http.post('/querySupplyByid1',this.$route.query).then((res)=>{


            if(res.data.code == 0){

                let order = res.data.response;

                console.log(order);
                //设置类目名称
                this.typeProductItem.p_name = order.lb_name;
                // this.typeProductItem.p_name = ;
                //主图
                let pFileStr = order.p_file.split(',');
                this.pFileArr = pFileStr.slice(0,pFileStr.length-1);

                //拆分主图
                for(var i = 0;i<this.pFileArr.length;i++){
                    if(this.pFileArr[i]){
                        this.newPriList.push(this.pFileArr[i].substring(this.pFileArr[i].lastIndexOf('/')+1,this.pFileArr[i].length ))
                    }
                }

                //输出新的主图
                console.log(this.newPriList);

                //详情图
                let pDetailStr = order.p_detail.split(',');
                this.pDetailArr = pDetailStr.slice(0,pDetailStr.length-1);

                //拆分详情图
                for(var i = 0;i<this.pDetailArr.length;i++){
                    if(this.pDetailArr[i]){
                        this.newDetList.push( this.pDetailArr[i].substring(this.pDetailArr[i].lastIndexOf('/')+1,this.pDetailArr[i].length ))
                    }

                }
                //输入新的详情图
                console.log(this.newDetList);

                //包装
                this.pack.p_type = order.pack_name;
                //单位
                this.unit.u_name = order.dw_name;
                // 交易方式
                this.tradeType.t_type = order.jy_name;
                //交易币种
                this.currency.c_name = order.bz_name;
                //货物所在地
                this.typeAreaItem.dz_name = order.dz_name;
                //设置主图上传图片数量
                this.uploadImgCount = this.pFileArr.length;
                this.pFileCount = 5 - this.pFileArr.length;
                //设置详情图上传图片数量
                this.uploadImg2Count = this.pDetailArr.length;
                this.pDetailCount = 100 - this.pFileArr.length;



                /*+++++++++++++++++++++++++++++++++*/



                this.order.sTitle = order.s_title;//标题
                this.order.sType = order.s_type;//类型
                this.order.sQuality = order.s_quality;//数量
                this.order.dw_name = order.dw_name;//单位名称
                this.order.sPrice = order.s_price;//价格
                this.order.bz_name = order.bz_name;//币种名称
                this.order.packId = order.pack_id;//包装ID



                this.typeAreaItem.a_name = order.dz_name;//地址名称
                this.order.s_userName = order.s_userName;//用户名
                this.order.unitId = order.unit_id;//单位ID
                this.order.tradeId = order.trade_id;//交易方式ID
                this.order.packid = order.pack_id;//包装ID
                this.pack.p_type = order.pack_name;//包装名称
                this.tradeType.t_type = order.jy_name;//交易名称
                this.order.sid = order.s_id;//订单ID
                this.order.areaId = order.area_id;//地址
                this.order.pId = order.p_id;//
                this.order.currencyId = order.currency_id;//币种ID


                this.order.sPhone = order.s_phone;//电话
                this.order.sAddress = order.s_address;//地址
                this.order.sCompany = order.s_company;//公司
                this.order.sEmail = order.s_email;//邮箱
                this.order.sDate = order.s_date;//期限

                this.order.sDetail = order.s_detail;//详情描述









            }

        })
    },

    //查询实名信息(使用实名认证信息)
    queryrealUserInfo(){

        this.$http.post('/querySmrzInfo',{vip:this.$store.getters.getVip}).then((res)=>{
            //查询成功
            if(res.data.code==0){
                let info = res.data.response;
                this.order.s_userName = info.name;
                this.order.sPhone = info.phone;
                this.order.sAddress = info.address;
                this.order.sEmail = info.email;
                this.order.sCompany = info.company;
                this.typeAreaItem.dz_name = info.areaName;

                if(info.a_id3!=""){
                    this.typeAreaItem.a_id = info.a_id3;
                    this.order.areaId = info.a_id3;
                }else{
                    this.typeAreaItem.a_id = info.a_id2;
                    this.order.areaId = info.a_id2;
                }

            }
        }).catch(function(res){
            console.log(res);
        })
    },



    //删除图片
    deleteImg(ind,from){
        let e = event||window.event;
        let target = e.target||e.srcElement;
        //删除节点
        // target.parentNode.parentNode.removeChild(target.parentNode);


        //主图
        if(from=="pri"){

            //当前展示数组
            this.pFileArr.splice(ind,1);
            //过滤图片数组，表示只有名称的图片数组(没有前缀)
            this.newPriList.splice(ind,1);



            //设置余数
            this.pFileCount = 5 - this.pFileArr.length;
            //显示数量
            this.uploadImgCount = this.$refs.uploadImg.dropzone.files.length + this.pFileArr.length;
            //开关
            this.uploadSwitch = this.uploadImgCount>=5?false:true;


        }else{

            //展示图片的原始数据
            this.pDetailArr.splice(ind,1);
            //只有名称的数据
            this.newDetList.splice(ind,1);


            this.pFileCount = 100 - this.pDetailArr.length;
            this.uploadImg2Count =  this.$refs.uploadImg2.dropzone.files.length + this.pDetailArr.length;
            this.uploadSwitch2 = this.uploadImg2Count>=100?false:true;



        }

    },








    //弹出单位选择框
    alertSelectBox(id){
      console.log(id);
      this.showSelectBoxId = id;
      this.showSelectBox = true;
    },
    //点击遮罩，关闭窗口
    closeMask(){
      this.showSelectBox = false;
    },
    test(){
      //获取上传文件总数
      // console.log(this.$refs.uploadImg.getAcceptedFiles())
      //获取失败文件数
      console.log(this.$refs.uploadImg)

      this.uploadSwitch = false;

    },
    //初始化dropzone
    initDropzone(){

      console.log(this.$refs.uploadImg)

    },
    //添加图片
    addImg(file){


      if(this.$refs.uploadImg.dropzone.files.length >= this.pFileCount){
        this.uploadSwitch = false;
      }

      if(this.$refs.uploadImg.dropzone.files.length > this.pFileCount){
        this.$refs.uploadImg.removeFile(file);
      }



      this.uploadImgCount = this.$refs.uploadImg.dropzone.files.length + this.pFileArr.length;
    },
    //删除图片
    removeImg(file){
      if(this.$refs.uploadImg.dropzone.files.length >= this.pFileCount){
        this.uploadSwitch = false;
      }else{
        this.uploadSwitch = true;
      }
      this.uploadImgCount = this.$refs.uploadImg.dropzone.files.length + this.pFileArr.length;
    },
    //上传成功调用
    showSuccess(file,res){
      //上传成功！
      if(res.code==0){
        console.log(res)
        // this.pFileArrStr += res.response;
        let imgSrc = res.response;

        this.newPriList.push(imgSrc.substring(0,imgSrc.length-1));


      }

    },

    //添加图片
    addImg2(file){
      if(this.$refs.uploadImg2.dropzone.files.length >= 100){
        this.uploadSwitch2 = false;
      }
      if(this.$refs.uploadImg2.dropzone.files.length > 100){
        this.$refs.uploadImg2.removeFile(file);
      }


      this.uploadImg2Count = this.$refs.uploadImg2.dropzone.files.length + this.pDetailArr.length ;
    },
    //删除图片
    removeImg2(file){
      if(this.$refs.uploadImg2.dropzone.files.length >= 100){
        this.uploadSwitch2 = false;
      }else{
        this.uploadSwitch2 = true;
      }

      this.uploadImg2Count = this.$refs.uploadImg2.dropzone.files.length + this.pDetailArr.length ;
    },
    //上传成功调用
    showSuccess2(file,res){
      //上传成功！
      if(res.code==0){
        console.log(res)
        let imgSrc = res.response;
        this.newDetList.push(imgSrc.substring(0,imgSrc.length-1));


      }
    },

    //上传完成
    complete(){

      //清空图片描述信息，重新全部赋值
      // this.priList = [];
      // this.detList = [];

      //待上传文件数都为0时，表示所有图片都已经上传，可以提交表单。
      if( this.$refs.uploadImg.getUploadingFiles().length == 0 && this.$refs.uploadImg2.getUploadingFiles().length ==0 ){
        // //所有图片描述信息
        // let imgDesc = document.getElementsByClassName("priList");
        // //新上传主图数量1
        // let newUploadImg1Count = this.$refs.uploadImg.getAcceptedFiles().length;
        // //新上传详情图数量2
        // let newUploadImg2Count = this.$refs.uploadImg2.getAcceptedFiles().length;
        // for(let i = 0;i < this.uploadImgCount  ;i++){
        //   //追加主图的描述信息。
        //   this.priList.push(imgDesc[i].value);
        // }
        // for(let i = this.uploadImgCount ; i < imgDesc.length;i++){
        //   this.detList.push(imgDesc[i].value)
        // }
        

        //提交表单
        this.submitForm();
      }

    },




    //图片上传模板
    template() {
      return `
              <div class="dz-preview dz-file-preview">
                <div class="dz-thumb">
                  <div class="dz-image">
                      <img data-dz-thumbnail />
                  </div>
                  
                  <div class="dz-progress">
                    <span class="dz-upload" data-dz-uploadprogress></span>
                  </div>

                  <div class="dz-error-message"><span class="error-info" data-dz-errormessage></span></div>

                  <div class="dz-details">
                    <div class="dz-size"><span data-dz-size></span></div>
                  </div>
                </div>
              </div>
          `;
    },
    //上传图片
    submitPhoto(){

      if(!this.checkInput()) return;


      //开启加载动画
      layer.open({
        type:2,
        shadeClose:false,
      })


      //如果没有上传新的图片，则直接提交表单
      if(this.$refs.uploadImg.dropzone.files.length <= 0 && this.$refs.uploadImg2.dropzone.files.length <= 0){
        this.submitForm();
      }else{
        //开始上传图片，完成之后再提交表单。
        this.$refs.uploadImg.processQueue();
        this.$refs.uploadImg2.processQueue();
      } 





    },
    //上传表单
    submitForm(){


      //更新图片路径
      this.order.pFile = this.newPriList.toString();
      this.order.pDetail = this.newDetList.toString();


      console.log(this.order);


      // return ;
      //修改订单
      this.$http.post('/ModifySupply',this.order).then((res)=>{
        //后台传来结果，关闭加载动画
        layer.closeAll();
        if(res.data.code==0){
          layer.msg("订单修改成功，请耐心等待审核！");
        }else{
          layer.msg(res.data.message);
        }
      })


    },
    //选择产品分类
    selectProductType(item){
      this.typeProductItem.p_name = item.textContent;
      this.order.pId = item.getAttribute("data-id");

      this.showSelectProductTypeBox = false;
    },
    selectCity(item){
      // console.log(item);

      this.order.area_id = item.getAttribute("data-id");
      this.typeAreaItem.dz_name = item.textContent;

      this.showSelectCityBox = false;
    }

  }


}

</script>

<style lang='less'>
@import '../../../assets/css/variable'; 


.layui-m-layercont{
  text-align:left;
}

.selectBox{

  z-index:99999;
  position: fixed;
  width:40%;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
  text-align:center;
  display:flex;
  align-items:center;

  h3{
    font-size:.7rem;
    padding:.5rem 0;
  }
  .selectBox_cell{
    width:100%;
    background: #fff;
    padding:0 10%;
    max-height:70%;
    overflow: scroll;

    -webkit-overflow-scrolling:touch;
  }

  li{

    line-height: 1.8rem;
    font-size:.6rem;
    color:#444444;
    border-bottom:1px solid #37C6BD;
  }

  li:last-child{
    border:none;
  }

}




.createTender_page{
    .fixed();
    z-index:999;
    height:100%;
}

.fbcg{

  height:100%;

  .form-box{

    .form-group{

      font-size:.7rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;


      .unit{



        &:after{


          content:'';

          position: absolute;
          top:.75rem;

          bottom:0;
          margin:auto;

          border-style:solid;
          border-width:.5rem;
          border-color: #959595 transparent transparent transparent;
        }

      }

      position: relative;
      border-bottom:1px solid #D5D5D5;
      padding:0 5/@root-font-size;

    }
    .radio-group{
      line-height:30/@root-font-size;
      input[type=radio]:checked + label{
        background: #93DB91;
      }

      .type-icon{
        vertical-align: middle;
        display: inline-block;
        width:15/@root-font-size;
        height:15/@root-font-size;
        border:2px solid #C1C2BD;
        border-radius:50%;
        margin-right:.3rem;
        padding:0;
        position: relative;

      }


    }

    .image-group{

      padding:10px;
      position: relative;
      background: #F0F0F0;
      border:none;
      label{
        text-align: left;
        padding-bottom:5px;
        font-size:.7rem;
        display: block;
        width:100%;
      }


      input[type=file]{
        opacity: 0;
        width:100%;
        height:100%;
        top:0;
        left:0;
        position: absolute;
        display: none;
      }

      .img-upload-box{
        /*margin-bottom:10px;*/
        height:80/@root-font-size;
        margin:.2rem;
        position: relative;
        /*padding:10px 0;*/
        overflow: hidden;
        display: flex;
        justify-content: center;



        img{
          height:100%;
          vertical-align: middle;
        }


        p.img{
          width:40%;
          padding-right: 5/@root-font-size;
          overflow: hidden;

          img{
            max-width:100%;
          }
        }
        p.desc{
          width:60%;
          textarea{
            border:1px solid #f00;
            border-radius:5px;
            padding:4/@root-font-size;
          }
        }



      }

      .flex-box{
        display: flex;
        flex-wrap: wrap;

        justify-content: space-between;
        height:auto;
      }



    }

    .agree-group{
      background: #F0F0F0;
      border:none;
      text-align: center;
      line-height:22/@root-font-size;
      padding-bottom:30/@root-font-size;

      display: flex;
      align-items: center;
      justify-content: center;

      color:#0042FF;

      label{
        width:17/@root-font-size;
        height:17/@root-font-size;
        border:2px solid #999;
        background: #fff;
        padding:0;
        margin:0 5px;
        position: relative;

      }



      input[type=checkbox]:checked + label{
        border-color:#f00;

        &:after{
            content:' ';
            display: block;
            width:.5rem;
            height:.5rem;
            position: absolute;
            background: #f00;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
        }
      }


/*
      input[type=checkbox]:checked +label i{
        display: block;
      }
*/
    }

    .btn-group{
      background: #F0F0F0;
      border:none;

      .btn-control{
        margin:20/@root-font-size 0;
        background: #389E3A;
        line-height:2rem;
        border-radius:8px;
        font-size:.7rem;
        width:100%;
        color:#fff;
        text-align: center;

      }
    }


    .desc-group{
      label{
        display: block;
        padding:5px 0;
      }

    }

    textarea{
      width:100%;
      height:80/@root-font-size;
      resize: none;
      font-size:.7rem;

    }
    label{
      display: inline-block;
      width:6em;
      padding-right:5/@root-font-size;
      text-align:left;
      margin:.3rem 0;
    }

    input[type=text],input[type=number]{
      line-height:12/@root-font-size;
      padding:10/@root-font-size 0 10/@root-font-size 5/@root-font-size;
      width:42%;
      font-size:.7rem;

    }


    .h3-tips{
      line-height:40/@root-font-size;
      background: #EAEAEA;
      padding:0 5/@root-font-size;
      font-size:.75rem;


    }




  }

}




/*.dz-preview{
  border:2px solid #f00;
}*/



#upload1,#upload2{


  .dropzone{

    padding:.1rem;
    min-height: inherit;

    .dz-message{
      margin:0;
    }

    .dz-image{
      width:100%;
      /*height:auto;*/
      display: flex;
      justify-content: center;
    }

    .dz-desc{
      position: relative;
      z-index:99;
      margin-left:2%;

      textarea{
        border:1px solid #ddd;
        padding:.2rem;
        height:5rem;

      }
    }

    .dz-preview{

      display:block;
      /*min-height:4rem;*/
      display:flex;
      min-height:3rem;
      max-height:5rem;


      div.dz-desc,div.dz-thumb{
        flex:1;
      }

      div.dz-thumb{
        width:50%;
        overflow: hidden;
      }
      div.dz-desc{
        width:48%;
      }

      &:hover{
        z-index:90;
      };

  
    }
    .dz-details{
/*      line-height: inherit;
      height:200px;*/
      font-size:.8rem;
      text-align:center;
      width:100%;

      padding:inherit;
      min-width: inherit;
      min-height: inherit;

      .dz-size{
        font-size:.6rem;
      }


    }

    .dz-remove{
      left:50%;
      bottom:0;
      line-height:.5rem;
      font-size:.6rem;
      width:3rem;
      margin-left:-1.5rem;
      background: #66CBE5;
      display: block;
      opacity: 1;
      visibility: visible;

    }

    .dz-error-message{

      font-size:.5rem;
      width:auto;
      /*bottom:0;*/
      opacity: 1;
      top:1rem;
      z-index:995;

    }

    .dz-progress{
      z-index:99;
      border-radius:1rem;
      height:.6rem;
      width:4rem;
      margin-left:-2rem;
      top:0;
      left:50%;

      background: #FDF6E3;

      opacity: 1;
      visibility: visible;

      .dz-upload{
        background:#2BA38E;
      }
      
    }


  }

  
}


/*货物单价*/
.univalent{
	/*label{
		width: 5em !important;
	}*/
	input{
		font-size: .65em !important;
	}
}


</style>
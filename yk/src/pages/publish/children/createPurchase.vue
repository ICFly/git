<template>
	

<div class="createTender_page">
	
	<header-top title='发布采购' back></header-top>
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
                    <input type="text" v-model:value="order.purTitle" placeholder="必填"/>
                </div>

                <div class="form-group radio-group">
                    <label for="">货物类型：</label>
                    <p style="display: inline-block;">
                        <input id="type1" lay-ignore @click="order.purType='全新' " type="radio" style="opacity:0!important;" name="type-order"/>
                        <label for="type1" class="type-icon"></label>全新
                    </p>

                    <p style="display:inline-block;">
                        <input id="type2" checked @click="order.purType='旧' " type="radio" style="opacity:0!important;" name="type-order"/>
                        <label for="type2" class="type-icon"></label>旧
                    </p>
                </div>

                <div class="form-group">
                    <label for="">数量：</label>
                    <input type="number" v-model:value="order.purQuality"  placeholder="必填"/>
                    <span class="unit" @click="alertSelectBox(3)"  v-text="unit.u_name"></span>
                </div>

                <div class="form-group univalent">
                    <label for="">货物单价：</label>
                    <input type="text" lay-verify="purPrice" v-model:value="order.purPrice"  placeholder="必填，价格面议请写0"/>
                    <span class="unit"  @click="alertSelectBox(2)" v-text="currency.c_name"></span>
                </div>


                <div class="form-group">
                    <label for="">包装：</label>
                    <input type="text" lay-verify="packId" readonly v-bind:value="pack.p_type" @click="alertSelectBox(1)"  placeholder="必填"/>
                </div>


                <div class="form-group icon-gt">
                    <label for="">交易方式：</label>
                    <input type="text" lay-verify="tradeId" readonly @click="alertSelectBox(4)"  v-bind:value="tradeType.t_type" placeholder="必填"/>
                </div>



                <h3 class="h3-tips" @click="queryrealUserInfo">点击这里使用默认实名信息</h3>

                <div class="form-group icon-gt">
                    <label for="">所在地区：</label>
                    <input type="text" @click="showSelectCityBox = true " v-model:value="typeAreaItem.a_name" readonly placeholder="必填"/>
                </div>
                <div class="form-group">
                    <label for="">联系人：</label>
                    <input type="text" v-model:value="order.p_userName" placeholder="必填"/>
                </div>
                <div class="form-group">
                    <label for="">联系电话：</label>
                    <input type="text" v-model:value="order.purPhone" placeholder="必填"/>
                </div>
                <div class="form-group">
                    <label for="">交易地址：</label>
                    <input type="text" v-model:value="order.purAddress" placeholder="必填"/>
                </div>
                <div class="form-group">
                    <label for="">公司名称：</label>
                    <input type="text"  v-model:value="order.pCompany" placeholder=""/>
                </div>
                <div class="form-group">
                    <label for="">邮箱：</label>
                    <input type="text" v-model:value="order.pEmail" placeholder=""/>
                </div>



                <div class="form-group icon-gt">
                  <label for="">采购期限：</label>
                  <input type="text" lay-verify="purDate" readonly @click="alertSelectBox(5)" v-model:value="order.purDate" placeholder="必填"/>
                </div>

                <div class="form-group desc-group">
                    <label for="">详情描述：</label>
                    <textarea v-model:value="order.purDetail" placeholder="请描述货物详细情况，如型号、货物成色、包装大小等货物明细，以便于找到优质商家。"></textarea>
                </div>


                <!-- 主图 -->
                <div class="form-group image-group main-img" id="upload1">
                    <label for="">货物主图
                    (<span class='font-style-red'>{{ uploadImgCount }}</span>/5)</label>

                    <!-- 上传图片组件框 -->
                    <drop-zone id="myVueDropzone1" class="myVueDropzone"  ref='uploadImg' :useFontAwesome="false" enctype="multipart/form-data" methods='post' 
                      :autoProcessQueue=false
                      :maxFileSizeInMB=10
                      :showRemoveLink=true
                      :maxNumberOfFiles=5
                      :language="{dictRemoveFile:'删除',dictMaxFilesExceeded:'超过最大上传图片数量',dictCancelUpload:'取消上传',dictFileTooBig:'目标文件为{{filesize}}Mib，超过最大尺寸{{maxFilesize}}Mib'}"

                      acceptedFileTypes="image/*" 
                      :url=uploadUrl 
                      v-bind:preview-template="template"
                      v-on:vdropzone-success="showSuccess"
                      v-on:vdropzone-removed-file="removeImg"
                      v-on:vdropzone-file-added="addImg"
                      v-on:vdropzone-mounted="initDropzone"
                      v-on:vdropzone-queue-complete="complete"
                    >

                      <div v-show=" uploadSwitch " class="img-upload-box dz-default dz-message">
                          <img src="../../../assets/imgs/publish/img-upDetail.png" alt="" />
                      </div>

                    </drop-zone>
                </div>

                <!-- 详情图 -->
                <div id="upload2" class="form-group image-group info-img">
                    <label>货物详情图(<span class='font-style-red'>{{ uploadImg2Count }}</span>/100)</label>

                    <!-- 上传图片组件框 -->
                    <drop-zone id="myVueDropzone2" class="myVueDropzone" ref='uploadImg2' :useFontAwesome="true" enctype="multipart/form-data" methods='post' 
                      :autoProcessQueue=false
                      :maxFileSizeInMB=10
                      :showRemoveLink=true
                      :maxNumberOfFiles=100
                      :language="{dictRemoveFile:'删除',dictMaxFilesExceeded:'超过最大上传图片数量',dictCancelUpload:'取消上传',dictFileTooBig:'目标文件为{{filesize}}Mib，超过最大尺寸{{maxFilesize}}Mib'}"

                      acceptedFileTypes="image/*" 
                      :url=uploadUrl 
                      v-bind:preview-template="template"
                      v-on:vdropzone-success="showSuccess2"
                      v-on:vdropzone-removed-file="removeImg2"
                      v-on:vdropzone-file-added="addImg2"
                      v-on:vdropzone-queue-complete="complete"
                    >

                      <div v-show=" uploadSwitch2 " class="img-upload-box dz-default dz-message">
                          <img src="../../../assets/imgs/publish/img-upDetail.png" alt="" />
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


    </div>

  <!-- 产品类别选择组件 -->
  <transition>
    <product-type v-show="showSelectProductTypeBox" @selectProductType="selectProductType"></product-type>
  </transition>


  <!-- 地区选择组件 -->
  <transition>
    <city v-show='showSelectCityBox' :switchStatus="showSelectCityBox" @selectCity='selectCity'></city>
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

<!-- +++++++++++++ -->

</div>


</template>


<script>
	
import headerTop from '@/components/header/header'
import productType from '@/components/common/productType'
import city from '@/components/common/city'

import dropZone from 'vue2-dropzone'

import bScroll from 'better-scroll'

import unit from '@/data/unit'
import {showRule2,uploadUrl,checkAuthen2} from '@/tool/tool'

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

      unitList:null,
      uploadSwitch:true,//上传图片入口状态
      uploadImgCount:0,//上传图片数
      showSelectProductTypeBox:false,//选择产品分类
      showSelectCityBox:false,//选择城市


      uploadSwitch2:true,
      uploadImg2Count:0,



      order:{
          pId:"",
          pFile:"",
          pDetail:'',
          unitId:'DW201604203054',
          currencyId:'BZ201604204494',
          usrId:this.$store.getters.getVip,
          packId:"",
          tradeId:"",
          areaId:"",
          purTitle:"",
          purType:"旧",
          purQuality:"",
          purPrice:"",
          p_userName:"",
          purPhone:"",
          purAddress:"",
          pCompany:"",
          pEmail:"",
          purDate:"",
          purDetail:"",
          listRar:"",
          pRar:"",
          pCargolist:""
      },
      unitList:[],//包装类型
      boxId:1,//当前视图窗口
      agree:false,//规则
      unit:{
          "u_name":"个"
      },//数量单位
      currency:{
          "c_name":"人民币"
      },//币种
      pack:{
          "p_type":""
      },//包装
      openPrice:false,//是否开价
      typeProductItem:{},//选择类目
      //交易方式
      tradeType:{
          "t_type":""
      },
      typeAreaItem:{},//货物地区
      loadIndex:0,//等待窗口ID
      getTime:0,//采购期限

      scroller:null,//




  	}

  },

  mounted(){


//	document.getElementById("myVueDropzone1").addEventListener("click",(e)=>{
//		console.log(e);
//	})
//	document.querySelectorAll(".dz-preview").addEventListener("click",()=>{
//		console.log(this);
//	})

    this.unitList = unit;

    this.$nextTick(()=>{

      this.scroller = new bScroll(".fbcg",{
        click:true,
        bounce:false,//回弹
        momentum: true,//惯性滑动
        deceleration: 0.0001,

      })

    })

  },
  watch:{

    //监视上传图片，重新计算盒子高度，
    uploadImgCount(){
      this.refresh();
    },
    uploadImg2Count(){
      this.refresh();
    },

    getTime:function(val){
        this.order.purDate = val;
        this.showSelectBox = false;
    },

    currency:function(val){

        this.order.currencyId = val.c_id;

        this.showSelectBox = false;

    },
    pack:function(val){


        this.order.packId = val.p_id;

        this.showSelectBox = false;

    },
    unit:function(val){

        this.order.unitId = val.u_id;
        this.order.dw_id = val.u_id;

        this.showSelectBox = false;

    },
    tradeType:function(val){
        this.order.tradeId = val.t_id;
        this.showSelectBox = false;
    },
  },
  methods:{
    //重新计算滑动盒子
    refresh(){
      setTimeout(()=>{
        this.scroller.refresh();
      },100)
    },


    //显示交易规则
    showRule(){
      showRule2();
    },
    //验证表单字段
    checkInput(){
      if(!this.typeProductItem.p_name){
        layer.msg("请选择货物类目")
        return;
      }
      if(this.order.purTitle==""){
        layer.msg("请输入标题")
        return;
      }
      if(this.order.purQuality==""){
        layer.msg("请输入货物数量")
        return;
      }
      if(this.order.purPrice == ""){
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
      if(this.order.p_userName =="" ){
        layer.msg("请输入联系人")
        return;
      }
      if(this.order.purPhone =="" ){
        layer.msg("请输入联系电话")
        return;
      }
      if(this.order.purAddress =="" ){
        layer.msg("请输入交易地址")
        return;
      }
      if(this.order.purDate =="" ){
        layer.msg("请选择采购期限")
        return;
      }

      //判断如果没有上传，则添加一张默认图片
      if(this.$refs.uploadImg.dropzone.files.length < 1){
        // layer.msg("请上传货物主图")
        // return;
        this.order.pFile = "default.jpg";
      }
      //判断如果没有上传，则添加一张默认图片
      if(this.$refs.uploadImg2.dropzone.files.length < 1){
        // layer.msg("请上传货物详情图")
        // return;
        this.order.pDetail = "default.jpg";

      }
      if(!this.agree){
        layer.msg("请阅读并同意《采购供应信息发布规则》")
        return;
      }
      return true;


    },


    //查询实名信息(使用实名认证信息)
    queryrealUserInfo(){





      //判断是否实名认证，给出相应提示
      if(!checkAuthen2()){
        layer.msg("你尚未完成实名认证信息")
        return;
      }

      this.$http.post('/querySmrzInfo',{vip:this.$store.getters.getVip}).then((res)=>{
          //查询成功
          if(res.data.code==0){
              var info = res.data.response;
              this.order.p_userName = info.name;
              this.order.purPhone = info.phone;
              this.order.purAddress = info.address;
              this.order.pEmail = info.email;
              this.order.pCompany = info.company;
              this.typeAreaItem.a_name = info.areaName;


              if(info.a_id3!=""){
                  this.typeAreaItem.a_id = info.a_id3;
                  this.order.areaId = info.a_id3;
              }else{
                  this.typeAreaItem.a_id = info.a_id2;
                  this.order.areaId = info.a_id2;
              }
          }
      })

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
    // test(){
    //   //获取上传文件总数
    //   // console.log(this.$refs.uploadImg.getAcceptedFiles())
    //   //获取失败文件数
    //   console.log(this.$refs.uploadImg)

    //   this.uploadSwitch = false;

    // },
    //初始化dropzone
    initDropzone(){

      console.log(this.$refs.uploadImg)

    },
    //添加图片
    addImg(file){
      if(this.$refs.uploadImg.dropzone.files.length >= 5){
        this.uploadSwitch = false;
      }
      if(this.$refs.uploadImg.dropzone.files.length > 5){
        this.$refs.uploadImg.removeFile(file);
      }
      this.uploadImgCount = this.$refs.uploadImg.dropzone.files.length;
    },
    //删除图片
    removeImg(file){
      if(this.$refs.uploadImg.dropzone.files.length >= 5){
        this.uploadSwitch = false;
      }else{
        this.uploadSwitch = true;
      }
      this.uploadImgCount = this.$refs.uploadImg.dropzone.files.length;
    },
    //上传成功调用
    showSuccess(file,res){
      //上传成功！
      if(res.code==0){

        console.log(res)

        this.order.pFile += res.response;
        // this.user.license = res.response;
        //提交表单
        // this.submitForm();
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
      this.uploadImg2Count = this.$refs.uploadImg2.dropzone.files.length;
    },
    //删除图片
    removeImg2(file){
      if(this.$refs.uploadImg2.dropzone.files.length >= 100){
        this.uploadSwitch2 = false;
      }else{
        this.uploadSwitch2 = true;
      }
      this.uploadImg2Count = this.$refs.uploadImg2.dropzone.files.length;
    },
    //上传成功调用
    showSuccess2(file,res){
      //上传成功！
      if(res.code==0){
        console.log(res)
        this.order.pDetail += res.response;
      }

    },

    //上传完成
    complete(){

      //待上传文件数都为0时，表示所有图片都已经上传，可以提交表单。
      if( this.$refs.uploadImg.getUploadingFiles().length==0 && this.$refs.uploadImg2.getUploadingFiles().length ==0 ){

        console.log(this.order);
        console.log("上传完成，提交表单");

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
                <img data-dz-thumbnail style="width:100px;height:100px;"/>
            </div>
            
            <div class="dz-progress">
              <span class="dz-upload" data-dz-uploadprogress></span>
            </div>

            <div class="dz-error-message"><span class="error-info" data-dz-errormessage></span></div>

            <div class="dz-details" id="details">
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


      //如果没有上传图片，则直接提交表单
      if(this.$refs.uploadImg.dropzone.files.length <= 0 && this.$refs.uploadImg2.dropzone.files.length <= 0){
        this.submitForm();
      }else{
        //开始上传图片，完成之后再提交表单。
        this.$refs.uploadImg.processQueue();
        this.$refs.uploadImg2.processQueue();
      } 





      //开始上传图片
      // this.$refs.uploadImg.processQueue();
      // this.$refs.uploadImg2.processQueue();



    },
    //上传表单
    submitForm(){

      this.$http.post('/addPurchase',this.order).then((res)=>{
        //后台传来结果，关闭加载动画
        let vm = this;
        layer.closeAll();
        if(res.data.code==0){

          layer.open({
            content:"订单发布成功，请耐心等待审核！",
            btn:'确定',
            style:"width:80%",
            end:function(){
              vm.$router.go(-1);
            }
          })
        }else{

          layer.open({
            type:"skin",
            content:res.data.message
          })

        }
      })


    },
    //选择产品分类
    selectProductType(item){
      console.log(item);
      this.typeProductItem.p_name = item.textContent;
      // this.pId = item.getAttribute("data-id");

      this.order.pId = item.getAttribute("data-id");

      this.showSelectProductTypeBox = false;
    },
    selectCity(item){
      // console.log(item);

      this.order.areaId = item.getAttribute("data-id");
      this.typeAreaItem.a_name = item.textContent;
      if(item.getAttribute("data-level") == 3){
      	this.showSelectCityBox = false;
      }else if(item.getAttribute("data-level") == 2 && item.getAttribute("data-id") !="QY201606011002"){
      	this.showSelectCityBox = false;
      }
    }

  }


}

</script>

<style lang='less'>
@import '../../../assets/css/variable';	



.layui-m-layercont{
  /*text-align:left;*/
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


    -webkit-overflow-scrolling : touch;



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

  position: relative;
  background: #fff;
	z-index:999;
  height:100%;




}

.fbcg{



  height: 100%;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-scrolling:touch;
  overflow-scrolling:touch;
  

  .form-box{

    .form-group{

      font-size:.7rem;
      overflow: hidden;
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
        height:92/@root-font-size;
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
        width:14/@root-font-size;
        height:14/@root-font-size;
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
        	width:.4rem;
        	height:.4rem;
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
      text-align: center;


    }




  }

}




/*.dz-preview{
  border:2px solid #f00;
}*/



#upload1,#upload2{


  .myVueDropzone{

    padding:.1rem;
    min-height: inherit;
    border:none;
    background:none;


	.dz-default{
		width:6rem;
		padding:.1rem .2rem;
		
	}


    .dz-message{
      margin:0;
    }

    .dz-image{
      width:100%;
      /*height:auto;*/
      display: flex;
      justify-content: center;
      /*img{
      	width:100%;
      	height:100%;
      }*/
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
      
      width:6rem;


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
      /*opacity: 1;*/
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
    
    .dz-preview:hover{
    	opacity: 1;
    	border: 1px solid red;
    }


    .dz-progress{
      z-index:99;
      display:none;
      border-radius:1rem;
      height:.6rem;
      width:4rem;
      margin-left:-2rem;
      top:-0.3rem;
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
	label{
		width: 5em !important;
		padding-right: 0 !important;
	}
	input{
		font-size: .65em !important;
	}
}


</style>
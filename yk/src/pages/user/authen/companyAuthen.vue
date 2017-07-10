<template>
	

<div class="personalAuthen_page">
	
	<header-top title='企业认证' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content gerenrenzheng">

        <form action="" class="layui-form">

            <div class="tips1">
                您好，为了给广大用户营造一个真实、安全的再生资源
                信息分享环境，请进行实名认证，再商网承诺对实名认
                证的信息严格保密！
            </div>


            <div class="form-tit">
                填写资料进行企业认证
            </div>
            <div class="form-group">
                <label for="name">企业名称：</label>
                <input type="text" v-model:value="user.company" id="name" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="principal">负责人 ：</label>
                <input type="text" v-model:value="user.principal"  id="principal"  placeholder="必填">
            </div>
            <div class="form-group">
                <label for="idCard">负责人有效证件号：</label>
                <input type="text" v-model:value="user.principal_id"  id="idcard" placeholder="非必填">
            </div>
            <div class="form-group">
                <label for="phone">手机号码：</label>
                <input type="text" v-model:value="user.phone"  id="phone" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="area">国家/地区：</label>
                <input type="text" readonly @click="showSelectCityBox = true " v-bind:value='user.city' id="area" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="address">详细地址：</label>
                <input type="text" v-model:value="user.address" id="address" placeholder="必填">
            </div>

            <div class="form-group from-img">
                <div>
                    <p>上传营业执照：</p>
                    <p class="font-style-red">图片需清晰，注册号、企业名称、法人代表、年检章等需清晰可辨别</p>

                    <!-- 上传图片组件框 -->
                    <drop-zone id="myVueDropzone" ref='uploadImg' :useFontAwesome="false" enctype="multipart/form-data" methods='post' 
                      :autoProcessQueue=false

                      :maxFileSizeInMB=5

                      :maxNumberOfFiles=1
                      :language="{dictRemoveFile:'删除',dictCancelUpload:'取消上传',dictFileTooBig:'目标文件为{{filesize}}Mib，超过最大尺寸{{maxFilesize}}Mib'}"
                      :headers="{cache:false,processData:false,contentType:false}"
                      acceptedFileTypes="image/*"
                      :url=uploadUrl
                      v-bind:preview-template="template"
                      v-on:vdropzone-success="showSuccess"
                      v-on:vdropzone-removed-file="removeImg"
                      v-on:vdropzone-complete="complete"
                    >



                    <div class="dz-preview dz-image-preview" style="width:100%;height:100%;padding:.1rem;margin:0;" v-for=" (item,index) in imgList" v-if="item">
                        <div class="dz-image" style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;">
                            <img style="height:8rem;width:100%" :src="item"/>
                        </div>
                        <div class="dz-progress">
                          <span class="dz-upload" data-dz-uploadprogress=""></span>
                        </div>
                        <a class="dz-remove" @click="deleteImg(index)" data-dz-remove="" style="background:#3883FF;opacity:1;">删除</a>
                    </div>

                    <div class="dz-default dz-message" v-show=" imgList.length <= 0 "><span><i class="material-icons">上传图片</i><br>点击这里</span></div>

                        <!-- Optional parameters if any! -->
                        <!-- <input type="hidden" name="token" value="xxx"> -->
                    </drop-zone>




                </div>
            </div>

            <div class="tips2">
                注意：请按照样图上传图片，证件需要清晰有效且为原
                件数码照，虚假者将封号并信用减半！仅支持.jpg.jpeg
                png.gif的图片格式，图片大小不超过10MB
            </div>

            <div class="form-btn">
                <!-- <p v-if="personReal" class="btn btn-button center" v-text="statusText"></p> -->
<!--                 <input type="submit" @click.prevent="uploadPhoto" value='提交' class="btn btn-button">
                <input type="submit" @click.prevent="uploadPhoto" value='提交' class="btn btn-button">
                <input type="submit" @click.prevent="uploadPhoto" value='提交' class="btn btn-button">

                <p class="btn btn-button">认证成功</p>
                //this.statusText = {0:"认证失败",1:"审核中",2:"认证成功"}[obj.state];
 -->

                <input v-if='user.state==0' type="submit" @click.prevent="uploadPhoto" value=" 修改 " class="btn btn-button">
                <p v-else-if='user.state==1' class='btn btn-button'>审核中</p>
                <p v-else-if='user.state==2' class='btn btn-button'>认证成功</p>
                <input v-else type="submit" @click.prevent="uploadPhoto" value=" 提交 " class="btn btn-button">

            </div>

        </form>



    </div>


    <!-- 选择地区 -->
    <transition>
      <city v-show='showSelectCityBox' @selectCity='selectCity'></city>
    </transition>



</div>




</template>

<script>

// import headerTop from '@/components/header/header'	
import headerTop from '@/components/header/header'

import dropZone from 'vue2-dropzone'
import city from '@/components/common/city'
import {uploadUrl} from '@/tool/tool'

console.log(dropZone)

export default{

	components:{
		headerTop,
    dropZone,
    city
	},
  data(){
    return{
      dropZoneBox:null,

      showSelectCityBox:false,

      user:{
          vip:this.$store.getters.getVip,
          company:'',
          principal:'',
          fdb:'法人代表',
          principal_id:'',
          phone:'',
          license:'',
          aId1:'',
          aId2:'',
          aId3:'',
          address:'',
          areaName:"",
          registrid:'123456',
          city:'',
      },

      imgList:[],//预览历史图片
      newImgList:[],//新上传的图片

      uploadUrl:uploadUrl,
    }
  },
  created(){
    layer.closeAll();
  },
  mounted(){
    this.$nextTick(()=>{
      // this.user.vip = this.$store.getters.getVip;
      //查询认证信息
      this.queryInfo();

    })
  },

  methods:{

    checkInput(){


        if(this.user.company == ""){
          layer.msg("请填写企业名称")
          return;
        }
        if(this.user.principal == ""){
          layer.msg("请填写负责人名字")
          return;
        }
        if(this.user.phone == ""){
          layer.msg("请填写手机号")
          return;
        }
        if(this.user.city == ""){
          layer.msg("请选择国家/地区")
          return;
        }
        if(this.user.address == ""){
          layer.msg("请填写详细地址")
          return;
        }
        //如果是修改的话，判断imgList表示依然有两种图片，uploadimg表示新上传的图片数量，相加表示只上传了一张新图片和原纪录图片
        if(this.imgList.length < 1 && this.$refs.uploadImg.dropzone.files.length < 1){
          layer.msg("请上传营业执照")
          return;
        }

        return true;


    },
    //删除图片
    deleteImg(index){
      
      this.imgList.splice(index,1);

    },
    //图片上传完成，可以提交表单了
    complete(){

    },

    //查询认证信息
    queryInfo(){

      this.$http.post('/queryqysmrz?vip=',{vip:this.$store.getters.getVip}).then((res)=>{

          //查询到数据并且有状态标记。
          if(res.data.code==0 && res.data.response.state ){
              var obj = res.data.response;

              this.user.company = obj.company;
              this.user.principal = obj.principal;

              var img = obj.license;
              this.imgList = obj.license.split(',');
              this.user.license = img.substring(img.lastIndexOf('/')+1,img.length);

              this.user.phone = obj.phone;
              this.user.principal_id = obj.principal_id;
              this.user.address = obj.address;
              this.user.state = obj.state;
              this.user.city = obj.a_id3;
              this.user.areaName = obj.a_id3;
              this.images = obj.license;
          }

      }).catch(function(res){
          console.log(res);
      });

    },
    //提交表单
    submitForm(){
      let url;
      //表示审核未通过，则更新继续提交。
      if(this.user.state == 0){
        url = "updateSmrzqy"
      }else{
        url = "smrzqy"
      }


      this.$http.post(url,this.user).then((res)=>{
          if(res.data.code==0){
            layer.msg("您的企业实名认证已提交，审核时间为1个工作日内!",{time:1.2},()=>{
              location.reload();
            });

          //提交了实名认证信息后，应该立马更新实名认证状态
          this.$store.commit("updateAuthenState",this.$store.getters.getVip);

          }else{
              layer.msg(res.data.message);
          }

      }).catch(function(res){
          console.log(res);
      });

    },
    //上传图片
    uploadPhoto(){
      //验证表单字段
      if(!this.checkInput()) return;
      //如果重新上传的图片，并且上传队列中存在未上传的图片，则先上传图片
      if(this.$refs.uploadImg.dropzone.files.length && this.$refs.uploadImg.getQueuedFiles().length > 0){
        this.$refs.uploadImg.processQueue();
      }else{
        this.submitForm();
      }

    },
    showSuccess(file,res){
      //上传成功！
      if(res.code==0){
        this.user.license = res.response;
        //提交表单
        this.submitForm();
      }

    },
    //删除图片
    removeImg(file){

      this.user.license = "";

    },
    //选择地区
    selectCity(item){
      console.log(item);
      //关闭地区显示
      if(item.getAttribute("data-level")==3){
        this.user.aId1 = item.getAttribute("data-topid");
        this.user.aId2 = item.getAttribute("data-superid");
        this.user.aId3 = item.getAttribute("data-id");
        //判断选择的是中国，需要提示精确到省份
      }else if(item.getAttribute("data-level")==2 && item.getAttribute("data-id") != "QY201606011002" ){
        this.user.aId1 = item.getAttribute("data-superid")
        this.user.aId2 = item.getAttribute("data-id")
        this.user.aId3 = ""
      }else{

        layer.msg("请精确到国家/省份")
        return;
      }

      console.log(this.user);
      //设置显示的城市名称
      this.user.city = item.textContent;
      this.user.areaName = item.textContent;
      //关闭选择框
      this.showSelectCityBox = false;
    },
    template() {
          return `
                  <div class="dz-preview dz-file-preview" style="width:100%;height:100%;padding:.1rem;margin:0;">
                      <div class="dz-image" style="width:100%;height:100%;display:flex;justify-content:center;">
                          <img data-dz-thumbnail />
                      </div>
                      <div class="dz-progress">
                        <span class="dz-upload" data-dz-uploadprogress></span>
                      </div>

                      <div class="dz-error-message" style="top:inherit;"><span data-dz-errormessage></span></div>

                      <div class="dz-details">
                        <div class="dz-size"><span data-dz-size></span></div>
                        <div class="dz-filename"><span data-dz-name></span></div>
                      </div>
                  </div>
              `;
      }



  }



}


</script>
<style lang='less' scoped>



@import '../../../assets/css/variable.less';



.personalAuthen_page{

	.fixed();

}


#myVueDropzone{
  padding:0;


  .dz-image{
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
  }

  .dz-remove{
    left:0;
    right:0;
    width:3rem;
    font-size:.6rem;
    margin:0 auto;
  }
}

/*//个人认证*/

.gerenrenzheng{

  background: #fff;
  .tips1,.tips2{
    background: #EAEAEA;
    color:#f00;
    padding:8/@root-font-size 9/@root-font-size;
    font-size:.6rem;
    line-height:.9rem;
  }

/*  .tips2{
    font-size:.6rem;
    color:#f00;
    padding:8/@root-font-size 9/@root-font-size;
  }*/


  
  .border-bottom{
    border-bottom:1px solid #E4E4E4;
  }

  .form-tit{
    text-align: center;
    line-height:35/@root-font-size;
    .border-bottom;
    font-size:.78rem;
  }

  .form-group{
    .border-bottom;
    padding:10/@root-font-size 12/@root-font-size;

    display: flex;
    justify-content: flex-start;

    label{

      width:35%;
      font-size:.7rem;
      display: flex;
      align-items: center;

      

    }
    input{
      width:72%;
      font-size:.7rem;
      /*box-sizing:border-box;*/
    }

    

  }

  .from-img{

/*  	display: flex;
  	justify-content:space-around; */

    div{
/*		width:49%;*/
		flex:1;

    }
    img{
      height:90/@root-font-size;
      width:100%;
    }
    p{
      font-size:.7rem;
      margin-bottom:10/@root-font-size;
    }
    p.img{
      position: relative;
      color:#f00;
    }
    input{
      opacity:0;
      width:100%;
      height:100%;
      left:0;
      top:0;
      position: absolute;

    }
  }

  .form-btn{
    padding:8/@root-font-size 9/@root-font-size;

    .btn{
    	font-size:.8rem;
      width:100%;
      line-height:38/@root-font-size;
      background: #389E3A;
      color:#fff;
      border-radius:4px;
      text-align: center;
    }
  }


}


</style>
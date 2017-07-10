<br /><template>
	

<div class="personalAuthen_page">
	
	<header-top title='个人实名认证' back></header-top>
	<div class="fixed-top-div"></div>



    <div class="content gerenrenzheng">

        <form action="" class="layui-form">

            <div class="tips1">
                您好，为了给广大用户营造一个真实、安全的再生资源
                信息分享环境，请进行实名认证，再商网承诺对实名认
                证的信息严格保密！
            </div>
            <div class="form-tit">
                填写资料进行实名认证
            </div>

            <div class="form-group">
                <label for="name">真实姓名：</label>
                <input type="text" v-model="user.name" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="id-card">有效证件号：</label>
                <input type="text" v-model="user.idcardno" id="id-card" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="phone">手机号码：</label>
                <input type="text" v-model="user.phone"  id="phone" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="area">国家/地区：</label>
                <input type="text" readonly v-model="user.city" @click="showSelectCityBox=true" id="area" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="address">详细地址：</label>
                <input type="text" v-model="user.address" id="address" placeholder="必填">
            </div>
            
            <div class="form-group from-img">
                <div>
                    <p>请上传证件正面照片</p>
                </div>
                <div>
                    <p>请上传证件反面照片</p>
                </div>
            </div>

            <div>

              <!-- //:clickable=false -->

              <!-- 上传图片组件框 -->
              <drop-zone id="personalAuthen_myVueDropzone" ref='uploadImg'  useFontAwesome="false" enctype="multipart/form-data" methods='post' 
                :autoProcessQueue=false
                :useFontAwesome=false

                :maxFileSizeInMB=10
                :uploadMultiple=true
                :maxNumberOfFiles=2
                :language="{dictRemoveFile:'删除',dictCancelUpload:'取消上传',dictFileTooBig:'目标文件为{{filesize}}Mib，超过最大尺寸{{maxFilesize}}Mib'}"

                :headers="{cache:false,processData:false,contentType:false}"
                acceptedFileTypes="image/*" 
                :url=uploadUrl
                v-bind:preview-template="template"

                v-on:vdropzone-success="showSuccess"
                v-on:vdropzone-success-multiple="showSuccess2"

                v-on:vdropzone-file-added="addImg"
                v-on:vdropzone-removed-file="removeImg"
                v-on:vdropzone-queue-complete="complete"
              >

            <div class="dz-preview dz-image-preview" style="width:50%;height:100%;padding:.1rem;margin:0;" v-for=" (item,index) in imgList" v-if="item">
                <div class="dz-image" style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;">
                    <img style="height:8rem;width:100%" :src="item"/>
                </div>
                <div class="dz-progress">
                  <span class="dz-upload" data-dz-uploadprogress=""></span>
                </div>
                <a class="dz-remove" @click="deleteImg(index)" data-dz-remove="" style="background:red;opacity:1;">删除</a>
            </div>

              <div class="dz-default dz-message" v-show=" imgList.length<2 "><span><i class="material-icons">上传图片</i><br>点击这里</span></div>

                  <!-- Optional parameters if any! -->
                  <!-- <input type="hidden" name="token" value="xxx"> -->
              </drop-zone>

            </div>

            <div class="tips2">
                注意：请按照样图上传图片，证件需要清晰有效且为原
                件数码照，虚假者将封号并信用减半！仅支持.jpg.jpeg
                png.gif的图片格式，图片大小不超过10MB
            </div>

            <div class="form-btn">
                <!-- <p v-if="personReal" class="btn btn-button center" v-text="statusText"></p> -->
                <input v-if='user.state==0' type="submit" @click.prevent="uploadPhoto" value=" 修改 " class="btn btn-button">
                <p v-else-if='user.state==1' class='btn btn-button'>审核中</p>
                <p v-else-if='user.state==2' class='btn btn-button'>认证成功</p>
                <input v-else type="submit" @click.prevent="uploadPhoto" value=" 提交 " class="btn btn-button">

            </div>

        </form>
    </div>

<!-- <transition>
  <router-view></router-view>
</transition> -->

<transition>
  <city v-show='showSelectCityBox' @selectCity='selectCity'></city>
</transition>


<transition>
  <product-type v-show="showSelectProductTypeBox" @selectProductType="selectProductType"></product-type>
</transition>


</div>


</template>

<script>

import city from '@/components/common/city'

import productType from '@/components/common/productType'
// import headerTop from '@/components/header/header'	
import headerTop from '@/components/header/header'

import {getCookie} from '@/config/util'
import {uploadUrl} from '@/tool/tool'
import dropZone from 'vue2-dropzone'

// dropZone.autoDiscover = false;

// console.log(dropZone)


export default{

	components:{
		headerTop,
    dropZone,
    city,
    productType
	},
	data(){
		return{
      currentCity:null,
      showSelectCityBox:false,
      showSelectProductTypeBox:false,

      user:{


        name:'',
        idcardno:'',
        phone:'',
        city:'',
        photo:[],

        aId1:'',
        aId2:'',
        aId3:'',
        address:''

      },
      newImgList:[],//新上传的图片
      imgList:[],//预览图片地址

      uploadUrl:uploadUrl

		}
	},
  mounted(){

    this.$nextTick(()=>{
      this.user.vip = this.$store.getters.getVip;
      // console.log(dropZone);

      // if(getCookie("personAuthen")==1){
        //如果已经实名认证，查询信息。
        this.queryUserInfo();
      // }



    })


  },
  methods:{

    //验证字段
    checkInput(){

        if(this.user.name == ""){
          layer.msg("请填写姓名")
          return;
        }

        if(this.user.idcardno == ""){
          layer.msg("请填写有效证件号")
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
        if(this.imgList.length < 2 
          && this.imgList.length < 2 
          && (this.imgList.length + this.$refs.uploadImg.dropzone.files.length <2) ){
          layer.msg("请同时上传证件正反面照片")
          return;
        }

        return true;

    },


    //上传图片调用方法
    addImg(file){

      if(this.$refs.uploadImg.dropzone.files.length > 2){
        this.$refs.uploadImg.removeFile(file);
        layer.msg("最多只能上传两张图片");
      }
    },
    //完成所有图片上传
    complete(){
      if(this.user.state == 0){//表示修改实名认证
        let newImgSrc = this.newImgList.toString(",");
        this.user.photo = newImgSrc;
      }else{
        this.user.photo = this.newImgList.toString(",");
      }
      //提交表单
      this.submitForm();


    },
    //删除图片
//  deleteImg(id){
//
//	  console.log(id)
//    this.imgList.splice(id,1);
//
//    let e = event || window.event;
//    let target = e.target || e.srcElement;
//    while(true){
//
//      if(target.getAttribute("class") && target.getAttribute("class").indexOf("dz-preview") >= 0){
//        // target.remove();
//        if(this.imgList.length>=2){
//          this.imgList.splice(id,1);
//        }else{
//          this.imgList.splice(0,1);
//        }
//        console.log(id);
//        break;
//      }
//      target = target.parentNode;
//    }
//
//  },
    deleteImg(id){
    	this.imgList.splice(id,1);
    },
    //查询实名认证信息
    queryUserInfo:function(){
        //http://192.168.0.123:8080/zswh5/querygrsmrz?vip=ZS1703161274
        var vm = this;
        this.$http.post('/querygrsmrz',{vip:this.$store.getters.getVip}).then((res)=>{
            console.log(res.data);

            //查询到认证信息并且有状态标记
            if(res.data.code == 0 && res.data.response.state){
              let user = res.data.response;
              this.user = user;
              this.user.city = user.a_id3;
              this.imgList = user.photo.substring(0,user.photo.length-1).split(',');
            }
        })
        //查询认证信息
    },



    getCount(){
      // console.log(this.$refs.uploadImg.$options);
      // console.log(dropZone);
      console.log(this.$refs.uploadImg);
      console.log(this.$refs.uploadImg.dropzone.files.length);

    },
    selectCity(item){
      //关闭地区显示
      if(item.getAttribute("data-level")==3){

        this.user.aId1 = item.getAttribute("data-topid");
        this.user.aId2 = item.getAttribute("data-superid");
        this.user.aId3 = item.getAttribute("data-id");

        //如果当前选择的是中国，提示需要精确到省份。
      }else if(item.getAttribute("data-level")==2 && item.getAttribute("data-id") != "QY201606011002"){

        this.user.aId1 = item.getAttribute("data-superid")
        this.user.aId2 = item.getAttribute("data-id")
        this.user.aId3 = ""

      }else{
        layer.msg("请精确到国家/省份");
        return;
      }

      this.user.city = item.textContent;
      this.showSelectCityBox = false;
    },
    selectProductType(item){
      this.showSelectProductTypeBox = false;
      console.log(item);
    },

    dropzoneTips(){
      // console.log("dropZone初始化完成");
    },
    uploadPhoto(){

      if(!this.checkInput()) return;
      // console.log(this.$refs.uploadImg.getAcceptedFiles().length); //获取上传文件总数
      // console.log(this.$refs.uploadImg.getQueuedFiles().length); //货物上传文件队列数


      //如果选择了图片，并且上传队列中存在未上传的图片，则先开始上传图片
      if(this.$refs.uploadImg.dropzone.files.length > 0 && this.$refs.uploadImg.getQueuedFiles().length > 0){
        //重新选择了图片，上传图片
        this.$refs.uploadImg.processQueue();
      }else{ //提交表单
        this.submitForm();

      }

    },
    //提交表单
    submitForm(){

      console.log("======提交表单======");
      let url;
      if(this.user.state==0){
        url = "/updateSmrzinfo"
        //如果有重新上传图片，则追加图片
        if(this.newImgList.length > 0){
          for(let i = 0;i<this.imgList.length;i++){
            let currentSrc = this.imgList[i];
            this.user.photo += ","+currentSrc.substring(currentSrc.lastIndexOf("/")+1,currentSrc.length);
          }
        }else{ //否则直接过滤掉图片的前缀，然后赋值
          this.user.photo = "";
          for(let i = 0;i<this.imgList.length;i++){
            let currentSrc = this.imgList[i];
            this.user.photo += currentSrc.substring(currentSrc.lastIndexOf("/")+1,currentSrc.length)+",";
          }
        }
      }else{
        url = "/grsmrz"
      }

      this.$http.post(url,this.user).then((res)=>{
        if(res.data.code==0){
          layer.open({
            content:'您的个人实名认证已提交，审核时间为1个工作日',
            btn:'确定',
            end:function(){
              location.reload();
            }
          })

          //提交了实名认证信息后，应该立马更新实名认证状态
          this.$store.commit("updateAuthenState",this.$store.getters.getVip);

        }else{

          layer.open({
            content:res.data.message||res.data.response,
            style:"width:80%",
            btn:'确定',
            time:2
          })


        }
      })
    },

    //上传图片成功回调！
    showSuccess(file,res){
      if(res.code==0){
        this.newImgList.push(res.response.substring(0,res.response.length-1));
      }
    },

    //删除图片
    removeImg(file){
      for(let i = 0;i<this.user.photo.length;i++){
        let obj = this.user.photo[i];
        if(obj['name']==file.name){
          this.user.photo.splice(i,1)
        }
      }
    },
    //同时上传，并成功
    showSuccess2(file,res){

    },

    template() {
          return `
                  <div class="dz-preview dz-file-preview" style="width:50%;height:100%;padding:.1rem;margin:0;">
                      <div class="dz-image" style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;">
                          <img data-dz-thumbnail />
                      </div>
                      <div class="dz-progress" style="display:none">
                        <span class="dz-upload" data-dz-uploadprogress></span>
                      </div>

                      <div class="dz-error-message" style="top:inherit;"><span data-dz-errormessage></span></div>

                      <div class="dz-details" style="position:static">
                        <div class="dz-size"><span data-dz-size></span></div>
                        <div class="dz-filename"><span data-dz-name></span></div>
                      </div>
                  </div>
              `;
      }

      }
  }



</script>
<style lang='less'>
@import '../../../assets/css/variable.less';



#personalAuthen_myVueDropzone{
  overflow: hidden;
  display: flex;
  justify-content: flex-start;

  /*flex-wrap: wrap;*/


}
/*#myVueDropzone{
  .dz-image{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;
  }
}
*/





.personalAuthen_page{

	.fixed();

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

    padding:5/@root-font-size 12/@root-font-size;

/*  	display: flex;
  	justify-content:space-around; */

    div{
/*		width:49%;*/
  		flex:1;
      padding:.1rem;

    }
    img{
      height:90/@root-font-size;
      width:100%;
    }
    p{
      font-size:.7rem;
      color:#f00;

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




.hide{
  display: none !important;
}

/* vue-dropzone css*/

.dropzone{
  padding:0;

}

.vue-dropzone {


  /*overflow: hidden;*/
  height:8rem;



    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: background-color .2s linear;
    &:hover {
        background-color: #F6F6F6;
    }
    i {
        color: #CCC;
    }
    .dz-preview {

        .dz-image {
            border-radius: 1;
            &:hover {
                img {
                    transform: none;
                    -webkit-filter: none;
                }
            }
        }
        .dz-details {
            bottom: 0;
            top: 0;
            color: white;
            background-color: rgba(33, 150, 243, 0.8);
            transition: opacity .2s linear;
            text-align: left;
            .dz-filename span, .dz-size span {
                background-color: transparent;
            }
            .dz-filename:not(:hover) span {
                border: none;
            }
            .dz-filename:hover span {
                background-color: transparent;
                border: none;
            }
        }
        .dz-progress .dz-upload {
            background: #cccccc;
        }
        .dz-remove {
            position: absolute;
            z-index: 30;
            color: white;
            margin-left: 15px;
            padding: 10px;
            top: inherit;
            bottom: 15px;
            border: 2px white solid;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 1.1px;
     		background: #66CBE5;
            opacity: 0;
        }
        &:hover {
            .dz-remove {
                opacity: 1;
            }
        }
        .dz-success-mark, .dz-error-mark {
            margin-left: auto !important;
            margin-top: auto !important;
            width: 100% !important;
            top: 35% !important;
            left: 0;
            i {
                color: white !important;
                font-size: 5rem !important;
            }
        }
    }
	.dz-default{
		width: 100%;
	}
}


</style>
<template>
	

<div class='uploadVoucher_page'>
	
	<header-top title='上传汇款凭证' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content shangchuanhuikuan">

        <form action="" class="layui-form">

            <div class="tips1">
                如已汇款请填写汇款信息
            </div>
            <div class="form-group">
                <label for="name">汇款人姓名：</label>
                <input type="text" id="name" lay-verify="name" v-model:value="uploadInfo.p_name" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="id-card">充值金额：</label>
                <input type="number" v-model:value="uploadInfo.p_money" id="id-card" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="idCard">汇款银行：</label>
                <input type="text" id="idCard" lay-verify="b_name"  v-model:value="uploadInfo.b_name"  placeholder="必填">
            </div>
            <div class="form-group">
                <label for="address">银行账号：</label>
                <input type="text" id="address" lay-verify="b_no"  v-model:value="uploadInfo.b_no" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="phone">流水单号：</label>
                <input type="text" id="phone" lay-verify="serial"  v-model:value="uploadInfo.serial" placeholder="必填">
            </div>
            <div class="form-group">
                <label for="area">联系电话：</label>
                <input type="text" id="area" lay-verify="phone"  v-model:value="uploadInfo.phone" placeholder="必填">
            </div>
            <div class="form-img">

              <!-- 上传图片组件框 -->
              <drop-zone id="voucherUpload" ref='uploadImg' useFontAwesome="false" methods='post' 
                :autoProcessQueue=false
                :useFontAwesome=false
                :maxFileSizeInMB=10
                :maxNumberOfFiles=1
                :language="{dictRemoveFile:'删除',dictCancelUpload:'取消上传',dictFileTooBig:'目标文件为{{filesize}}Mib，超过最大尺寸{{maxFilesize}}Mib'}"
                :headers="{cache:false,processData:false,contentType:false}"
                acceptedFileTypes="image/*" 
                :url= uploadUrl 
                v-bind:preview-template="template"
                v-on:vdropzone-success="showSuccess"
                v-on:vdropzone-removed-file="removeImg"
              >
                <div class="dz-default dz-message"><img src="../../../../assets/imgs/center/icon_pinzheng.png" ></div>

                  <!-- Optional parameters if any! -->
                  <!-- <input type="hidden" name="token" value="xxx"> -->
              </drop-zone>

            </div>

            <div class="form-btn">
                <button class="btn btn-button" @click.prevent="submitPhoto">提交</button>
            </div>
        </form>

    </div>

</div>




</template>

<script>

import headerTop from '@/components/header/header'	
import dropZone from 'vue2-dropzone'
import {uploadUrl} from '@/tool/tool'

export default{

	components:{
		headerTop,
        dropZone
	},
	data(){
		return{

            uploadInfo:{
                vip:this.$store.getters.getVip,//会员编号
                p_name:"",//会员姓名
                p_money:"",//汇款金额
                b_name:"",//汇款银行
                b_no:"",//银行账号
                serial:"",//流水单号
                phone:"",//手机号
                photo:"",//汇款截图
                otherNo:this.$route.query.otherNo,//转到再商网 账号
            },
            uploadUrl:uploadUrl
		}
	},
  watch:{
    $route(){
      //重置表单
      this.reset();
    }
  },
  mounted(){
  	this.$nextTick(()=>{
  		this.queryTenderById()
  	})
  },
	methods:{
	
	
	queryTenderById(){
        this.$http.post('/queryTenderByid',this.$route.query).then((res)=>{
			console.log(res)
        })
     },


    checkInput(){
      if(this.uploadInfo.p_name == ""){

        layer.msg("请填写汇款人姓名")
        return;
      }
      if(this.uploadInfo.p_money == ""){
        layer.msg("请填写充值金额")
        return;
      }

      if(parseInt(this.uploadInfo.p_money) < 1){
        layer.msg("充值金额必须大于等于1")
        return;
      }

      if(this.uploadInfo.b_name == ""){
        layer.msg("请填写汇款银行")
        return;
      }
      if(this.uploadInfo.b_no == ""){
        layer.msg("请填写银行账号")
        return;
      }
      if(this.uploadInfo.serial == ""){
        layer.msg("请填写流水单号")
        return;
      }
      if(this.uploadInfo.phone == ""){
        layer.msg("请填写联系电话")
        return;
      }
      if(this.$refs.uploadImg.dropzone.files.length <= 0){
        layer.msg("请上传汇款凭证")
        return;
      }

      return true;
    },

    //提交表单
    submitForm(){

        this.$http.post("/GnRecharge",this.uploadInfo).then((res)=>{

            console.log(res.data);

            if(res.data.code==0){
              let vm = this;
              layer.msg("提交充值单成功!",{time:1.2},()=>{
              	this.$route.go(-1);
                vm.reset();
              })

            }

        })

    },
    //重置表单
    reset(){

      for(let key in this.uploadInfo){
        this.uploadInfo[key] = "";
      }
      //删除图片
      this.$refs.uploadImg.removeAllFiles();

    },

    submitPhoto(){

        //验证所有表单字段
        if(!this.checkInput()) return;

        //开始上传图片
        this.$refs.uploadImg.processQueue();
    },

    //上传成功回调
    showSuccess(file,res){

        console.log(res)

        if(res.code==0){
            this.uploadInfo.photo = res.response;
            //上传表单
            this.submitForm();
        }

    },
    //删除图片
    removeImg(){

    },
    //图片模板
    template() {
      return `
        <div class="dz-preview dz-file-preview" style="width:100%;height:100%;padding:.1rem;margin:0;">
            <div class="dz-image" style="width:100%;height:100%;">
                <img data-dz-thumbnail />
            </div>
            <div class="dz-progress" style="display:none;">
              <span class="dz-upload" data-dz-uploadprogress></span>
            </div>

            <div class="dz-error-message" style="top:inherit;"><span data-dz-errormessage></span></div>

            <div class="dz-details" >
              <div class="dz-size"><span data-dz-size></span></div>
              <div class="dz-filename"><span data-dz-name></span></div>
            </div>
        </div>
          `;
    },

	}


}

</script>


<style lang='less'>
	
@import '../../../../assets/css/variable';




#voucherUpload{
    min-height: inherit;
    padding:0;
    width:100%;

    border:none;

    .dz-message{
        /*margin:.2rem auto;*/
        width:50%;
        /*border:1px solid #ddd;*/
        margin:1rem .2rem;
        height:5rem;

        img{
          height:100%;
        }
    }
    .dz-remove{
        opacity: 1;
        background: #1880D8;
        left:0;
        right:0;
        margin:auto;
        width:3rem;
        font-size:.6rem;
        bottom:0;

    }
    .dz-image{
        display: flex;
        justify-content: center;

        img{
            max-height: 8rem;
        }
    }
}



.uploadVoucher_page{
	.fixed();
	z-index: 9999;

}


/*//上传汇款凭证*/
.shangchuanhuikuan{

  background: #fff;
  .tips1{
    background: #EAEAEA;
    color:#f00;
    padding:10/@root-font-size 9/@root-font-size;
    font-size:.8rem;
  }

  .border-bottom{
    border-bottom:1px solid #E4E4E4;
  }


  .form-group{
    .border-bottom;
    padding:12/@root-font-size 12/@root-font-size;

    display: flex;
    label{
      justify-content: flex-start;
      width:35%;
      font-size:.6rem;

    }
    input{
      width:65%;
      font-size:.6rem;
    }

  }

  .form-img{
    /*position: relative;*/
    width:100%;
    display: inline-block;
    /*padding:5/@root-font-size;*/
    text-align: center;



/*    img{
      max-height:90/@root-font-size;
      border-radius:4px;
      border:1px solid #dddddd;

    }*/
    input{
      opacity:0;
      width:100%;
      height:100%;
      left:0;
      top:0;
      position: absolute;


    }

    span.del{
      position: absolute;
      font-weight: bold;
      top:5/@root-font-size;
      font-size:.8rem;
      right:-20px;
    }
  }

  .form-btn{
    padding:0/@root-font-size 9/@root-font-size;

    .btn{
      width:100%;
      line-height:35/@root-font-size;
      background: #389E3A;
      color:#fff;
      border-radius:4px;
      font-size:.7rem;
      margin-top: 0.3rem ;
    }
  }

}

.vue-dropzone{
	.dz-preview:hover .dz-details{
		opacity: 0 !important;
	}
	
	.dz-preview:hover .dz-image img {
		    transform: scale(1) !important;
		    filter: blur(0px) !important;
	}

}

</style>






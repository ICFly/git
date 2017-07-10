<template>
	


<div class="register_page">
	



    <div class="header">
        <div class="left-back" @click='$router.go(-1)'>
        	<div class="back-icon" ></div>
        </div>
        <div class="header-type">
            <span @click="typeReg=1" v-bind:class="{active:typeReg==1}">手机找回</span>
            <span @click="typeReg=2" v-bind:class="{active:typeReg==2}">邮箱找回</span>
        </div>
    </div>

    <div class="content">
        <form action="" class="form-box layui-form" id="layui-form">

            <div class="form-group" v-if="typeReg==1">
                <span class="area-code" @click='areaBox=!areaBox' :class="{active:currentArea.text}"  v-text=" currentArea.text ||'选择区号' "></span>
                <input type="text" placeholder="请输入手机号" v-model:value="user.phone" class="pd form-control">
            </div>

            <div class="form-group" v-if="typeReg==2">
                <input type="text" placeholder="请输入邮箱" v-model:value="user.name" class="form-control">
            </div>

            <div class="form-group">
                <input v-if="!showPassword1" type="password" ref="pwd1" placeholder="请输入密码" v-model:value="user.pwd" class="form-control">
                <input v-else type="text" ref="pwd1" placeholder="请输入密码" v-model:value="user.pwd" class="form-control">

                <span class="icon-eye" :class=" {open:showPassword1} " @click=" showPassword1 = !showPassword1 "></span>

            </div>
            <div class="form-group">
                <input v-if="!showPassword2" type="password" ref="pwd2" placeholder="请再次输入密码" v-model:value="user.repwd" class="form-control">
                <input v-else type="text" ref="pwd2" placeholder="请再次输入密码" v-model:value="user.repwd" class="form-control">
                <span class="icon-eye" :class=" {open:showPassword2} " @click=" showPassword2 = !showPassword2 "></span>
            </div>
            <div class="form-group">
                <input type="number" placeholder="请输入验证码" v-model:value="user.code" class="form-control">
                <span class="btn btn-getCode on" v-if='sendCode' @click='getCode'>获取验证码</span>
                <span class="btn btn-getCode" v-else >{{timer}}秒</span>
                
            </div>
            <div class="btn-group">
                <button class="btn btn-register" @click.prevent='submit'>确定</button>
            </div>
        </form>
    </div>

    <!-- 提示信息 -->
    <transition>
      <dialog-tip :alertText="tip" v-show="showTip" @closeTip="closeTip"></dialog-tip>
    </transition>


	<transition>
		<area-code @chooseArea='chooseArea' v-show='areaBox'></area-code>
	</transition>


</div>	


</template>

<script>
	

import areaCode from '@/components/common/areaCode'


import dialogTip from '@/components/common/dialog'


export default{
	data(){
		return{
      showPassword1:false,
      showPassword2:false,
			typeReg:1,
			user:{
        name:"",
        phone:"",
        pwd:"",
        repwd:"",
        referrer_vip:"",
        code:"",
      },
			areaBox:false,
			currentArea:{},
      sendCode:true,//发送验证码按钮
      timer:60,//发送验证码时隔
      showTip:false,//显示提示信息
      tip:"",//提示信息
		}
	},
	components:{
		areaCode,dialogTip
	},
	methods:{


    //显示提示信息
    showAlert(val){
      this.tip = val,
      this.showTip = true;
    },
    //获取验证码
    getCode(){


      if(!this.sendCode) return;
      //1,手机 2，邮箱
      let options,url;
      if(this.typeReg==1){

          if(!this.user.area){
              layer.msg('请选择区号');
              return;
          }
          if(!this.user.phone){
              layer.msg('手机号不能为空');
              return;
          }
          url = '/getPhoneCode';
          options = {
              name:this.user.phone,
              type:2,
              area:this.user.area,
          }
      }else{
          if(!this.user.name){
              layer.msg('请输入邮箱');
              return;
          }
          url = '/getcode';
          options = {
              name:this.user.name,
              type:2,
          }
      }      


      this.sendCode = false;//标记已发送，

      this.$http.post(url,options).then((res)=>{

        if(res.data.code==0){


          layer.msg("验证码发送成功！")
          //发送成功，倒计时60秒
          // this.sendCode = false;

          let time = setInterval(()=>{
            this.timer--
            if(this.timer<=1){
              this.timer = 60;
              this.sendCode = true;
              clearInterval(time);
            }

          },1000)
        }else{
          // layer.msg(res.data.message,true)
          layer.msg(res.data.message);
          this.sendCode = true;
        }


      }).catch((err)=>{
        console.log(err);
      })

    },

    //非空检查
    checkInput(){

      if(this.typeReg==1){
        if(!this.user.area){
          layer.msg('请选择区号');
          return;
        }
        if(!this.user.phone){
          layer.msg('请输入手机号');
          return;
        }
      }else{
        if(!this.user.name){
          layer.msg('请输入邮箱');
          return;
        }
      }

      if(!this.user.pwd){
        layer.msg('请输入密码');
        return;
      }

      if(this.user.pwd.length<6){
        layer.msg('密码长度必须不小于6位');
        return;
      }
      if(!this.user.repwd){
        layer.msg('请再次输入密码');
        return;
      }

      if(this.user.repwd != this.user.pwd){
        layer.msg('两次输入的密码不一致');
        return;
      }

      if(!this.user.code){
        layer.msg('请输入验证码');
        return;
      }

      return true;

    },
    //关闭提示
    closeTip(){
      this.showTip = false;
    },
    //选择区号
		chooseArea(current){
			this.areaBox = false;
			this.currentArea.code = current[2]
			this.currentArea.text = current[1]
      this.user.area = this.currentArea.code;
		},
    //提交表单
    submit(){

      if(!this.checkInput()) return;
      let options;
      if(this.typeReg==1){
        options = this.user;
        options.name = options.phone;
      }else{

        options = this.user;
      }


      this.$http.post('/findpwd',options).then((res)=>{
        if(res.data.code == 0){

          let vm = this;

          layer.msg("密码修改成功",{time:1.2},()=>{
            vm.$router.push("/login")
          })

        }else{
          layer.msg(res.data.message);
        }
      })

    }
	},
  watch:{
    //切换方式，清空数据
    typeReg(){
      for(let key in this.user){
        this.user[key] = '';
      }

      this.showPassword2 = false;
      this.showPassword1 = false;
    }
  }
}


</script>


<style lang='less' scoped>
@import '../../assets/css/variable';	

.register_page{


  position:absolute;
  top:0;
  bottom:0;
  height:100%;
  width:100%;
  overflow:hidden;
  z-index:99999;



	background:#F4F4F4;
}

.header{
  line-height:2rem;
  background: #46C95E;
  height:2rem;
  position: relative;
  text-align: center;
  color:#fff;

 .left-back{
 	height:2rem;
 	width:2rem;

 }

  .back-icon{
    display: inline-block;
    width: .5rem;
    height: .5rem;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    -webkit-transform: rotate(225deg);
    transform: rotate(225deg);

    position: absolute;
    left:1rem;
    top:0;
    bottom:0;
    margin:auto;
  }


  .header-type{

    border:1px solid #fff;

    line-height:1.5rem;
    height:1.5rem;
    width:130/@root-font-size;
    margin:auto auto;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;

    border-radius:3px;
    display: flex;


  }
  span{
    flex: 1;
    font-weight:bold;
    color:#fff;
    font-size:.7rem;
   
    &.active{
        background: #fff;
        color:#46C95E;
    }
  }

}


.content{

  .form-box{
    padding:20/@root-font-size 20/@root-font-size;
  }

  .form-group{
    margin-bottom:12/@root-font-size;
    position: relative;


    .icon-eye{
      position: absolute;
      right:1/@root-font-size;
      top:0;
      bottom:0;
      background: url('../../assets/imgs/icon_eye.png') no-repeat center center;
      background-size: 20/@root-font-size 14/@root-font-size;
      width:20/@root-font-size;
      padding:0 25/@root-font-size;
    }
    .icon-eye.open-eye{
      background: url('../../assets/imgs/icon-eye-open.png') no-repeat center center;
      background-size: 20/@root-font-size 14/@root-font-size;
    }

    .btn-getCode{

      position: absolute;
      right:0;
      top:0;
      bottom:0;
      margin:auto;
      font-size:.6rem;
      background: #DCDCDC;
      color:#919191;

      width:90/@root-font-size;
      height:25/@root-font-size;
      text-align: center;
      line-height:25/@root-font-size;


    }
    .btn-getCode.on{
      background: #79DA4B;
      color:#fff;
    }



  }

  .form-control{
    width:100%;
    font-size:.7rem;
    display: block;
    border-bottom:1px solid #D5D5D5;
    line-height:15/@root-font-size;
    padding:12/@root-font-size 6/@root-font-size;
    background: #F4F4F4;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .btn-group{
    margin-top:30/@root-font-size;
  }

  .btn{
    width:100%;
    height:35/@root-font-size;
    background: #33d436;
    border-radius:5px;
    font-size:.8rem;
    color:#fff;
  }
  .area-code{
    position: absolute;
    overflow:hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding:0 .2rem;


    left:0;
    top:0;
    bottom:0;
    margin:auto;


    width:60/@root-font-size;
    height:30/@root-font-size;

    /*padding:0 10px 0 5px;*/

    text-align: center;
    line-height:30/@root-font-size;

    color:#919191;
    background: #D5D5D5;
    border-radius:3px;
    font-size:.6rem;

  }
  .area-code.active{
  	color:#fff;
  	background:#30C58E;
  }
  .pd{
    padding-left:70/@root-font-size;



  }


}

</style>
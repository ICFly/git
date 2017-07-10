<template>

<div class="login_page">
	<header-top back title='再商网登录'></header-top>
	<div class="fixed-top-div"></div>

	
    <div class="logo">
        <router-link to='/sale'><img src="../../assets/imgs/LOGO.png"/></router-link>
    </div>

    <div class="content">
        <form action="" class="form-box">
            <div class="form-group">
                <i class="form-icon icon-user"></i>
                <input type="text" placeholder="请输入邮箱或手机号码" v-model:value="user.name" class="form-control">
            </div>
            <div class="form-group">
                <i class="form-icon icon-pwd"></i>
                <input v-if="!showPassword" type="password" ref="pwd" placeholder="请输入登录密码" v-model:value="user.pwd" class="form-control">
                <input v-else type="text" ref="pwd" placeholder="请输入登录密码" v-model:value="user.pwd" class="form-control">
                <span class="icon-eye" :class=" {open:showPassword} " @click=" showPassword = !showPassword "></span>
            </div>
            <div class="form-link clear">
                <!-- <a href="#" class="right">找回密码</a> -->
                <router-link class='right' to="/found">找回密码</router-link>
            </div>
            <div class="form-group">
                <input type="button" class="btn btn-login" @click.prevent="login"  value="登录"/>

                <input type="button" class="btn btn-register" @click.prevent="toPage('/register')" value="注册"/>

                <!-- <router-link to="/register">register</router-link> -->
            </div>
        </form>
    </div>

    <!-- 提示信息 -->
    <transition>
      <dialog-tip :alertText="tip" v-show="showTip" @closeTip="closeTip"></dialog-tip>
    </transition>

</div>

</template>

<script>
	
import headerTop from '@/components/header/header'

import dialogTip from '@/components/common/dialog'

import * as types from '@/store/types'


// console.log(this.$store);

export default{
	components:{
		headerTop,
    dialogTip
	},
	data(){
		return{
      showPassword:false,//显示密码
			user:{
				"equipment":"H5",
        "name":'',
        "pwd":''
			},
      tip:"",//提示内容
      showTip:false,//是否显示提示
		}
	},
  activated(){
    //判断是否是注册跳转过来，如果存在用户信息，则自动填充用户名
    if(this.$route.query.user){
      this.user.name = this.$route.query.user;
    }

  },
	methods:{
    checkInput(){

      if(!this.user.name){
        layer.msg("请输入邮箱或手机号码")
        return false
      }
      if(!this.user.pwd){
        layer.msg("请输入密码")
        return false
      }
      return true;
    },
    closeTip(){
      this.showTip = false;
    },
    showTips(val){
      this.tip = val;
      this.showTip = true;
    },
    //跳转页面
    toPage(url){
      this.$router.push(url);
    },
		login(){

      if(!this.checkInput()) return 


			this.$http.post('/login',this.user).then((res)=>{
				// console.log(res.data);

				if(res.data.code == 0){
					// console.log(res.data.response);
					let user = res.data.response;
					this.$store.commit('setUser',user);

          //如果是判断登录，则成功后继续访问之前的页面。
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          //跳转
          this.$router.push(redirect)
				}else{
          layer.msg(res.data.message);
        }
			}).catch((err)=>{
				console.log(err);
			})
		}
	}
}

</script>

<style lang='less' scoped>
	
@import '../../assets/css/variable';


.login_page{
	.fixed();
}

.logo{
  line-height:80/@root-font-size;
  text-align: center;
  width:100%;
  img{
    height:60/@root-font-size;
    vertical-align: middle;
  }
}



.content{
  .form-box{
    padding:10/@root-font-size 15/@root-font-size;
  }

  .form-group{
    width:100%;
    margin-bottom:20/@root-font-size;
    position: relative;
  }

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

  .icon-eye.open{
    background: url('../../assets/imgs/icon-eye-open.png') no-repeat center center;
    background-size: 20/@root-font-size 14/@root-font-size;
  }



  .form-control{
    display: block;
    width:100%;
    border-radius:4px;
    border:1px solid #DCDCDC;
    line-height: 20/@root-font-size;
    padding:6/@root-font-size 40/@root-font-size;
    box-sizing: border-box;
    font-size:.7rem;


  }

  .form-icon{
    position: absolute;
    top:0;
    bottom:0;
    margin:auto;
    display: block;
    width:40/@root-font-size;
  }
  
  .icon-user{
    background: url('../../assets/imgs/icon_user.png') no-repeat center center;
    background-size:15/@root-font-size 15/@root-font-size;
  }
  .icon-pwd{
    background: url('../../assets/imgs/icon_pwd.png') no-repeat center center;
    background-size:15/@root-font-size 15/@root-font-size;
  }

  .form-link{
    margin-bottom:20/@root-font-size;
    a{
      color: #007aff;
      font-size:.6rem;
      float: right;
      margin-right:5px;
    }
  }

  .btn{
    display: block;
    background: #33d436;
    width:100%;
    border-radius:4px;
    margin-bottom:10px;
    color:#fff;
    height:30/@root-font-size;
    font-size:.7rem;
  }





}





</style>
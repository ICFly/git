<template>
	
<div class="balance_page">
	<header-top title='余额查询' back></header-top>
	<div class="fixed-top-div"></div>



    <div class="content">
        <div class="column1"><img src="../../../assets/imgs/center/icon_list1.png"/> </div>
        <div class="column2">
            <span>现金账户余额：</span>
            <span><i v-text="userInfo.account_balance"></i>元</span>
            <span><a @click="toPage('/user/accountDetail')">账户明细</a></span>
        </div>
        <div class="column2">
            <span>保证金冻结金额：</span>
            <span><i v-text="userInfo.ensure_money"></i>元</span>
            <span><a @click="toPage('/user/bondDetail')">保证金明细</a></span>
        </div>
        <div class="column2">
            <span>准入金<a @click="submitAccess">{{accessStatus}}</a></span>
        </div>

        <div class="column3">
            <a @click="toPageBeforeCheck('/user/balance/recharge')">充值</a>
            <a @click="toPageBeforeCheck('/user/balance/withdraw')">提现</a>
        </div>

    </div>

    <transition name='slide'>
      <loading v-if='showLoading'></loading>
    </transition>




    <transition>
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>

</div>

</template>

<script>
	
import headerTop from '@/components/header/header'

import loading from '@/components/common/loading'	
import {checkAndToAuthen} from '@/tool/tool'

	export default{

		components:{
			headerTop,
      loading
		},
    
    data(){
      return{
        showLoading:true,//显示加载状态
        userInfo:{},//用户信息
        accessStatus:"",//保证金状态
      }
    },
    activated(){

    },
    mounted(){


      this.$nextTick(()=>{
        
        this.loadInfo()

      })
    },
    methods:{
      //判断准入金
      submitAccess(){



        if(!checkAndToAuthen(this)) return;

        //如果已经提交，则退款
        if(this.userInfo.access_money && this.userInfo.access_money > 0){
          // console.log("退款")

          this.$http.post("/returnAccess",{vip:this.$store.getters.getVip}).then((res)=>{
            if(res.data.code == 0){
              layer.msg("保证金已退回",{time:1},()=>{
                location.reload();
              });

            }else{
              layer.msg(res.data.message);
            }
          })

        }else{
          //跳转到投标现货交易的提交保证金页面
          this.$router.push("/user/balance/submitMargin");
          
        }
      },
      //跳转之前验证实名认证状态
      toPageBeforeCheck(url){

        if(!checkAndToAuthen(this)) return;
        this.$router.push(url)

      },
      //跳转页面
      toPage(url){
        this.$router.push(url);
      },
      //查询信息
      loadInfo(){

        this.$http.post('/GetInfoByvip',{vip:this.$store.getters.getVip}).then((res)=>{
          this.userInfo = res.data.response.user;
          //保证金状态
          this.accessStatus =  this.userInfo.access_money && this.userInfo.access_money > 0?"退款":"提交";
          this.showLoading = false;

        })

        
      }
    }

	}
</script>


<style scoped lang='less'>

@import '../../../assets/css/variable.less';
	
.slide-enter-active,.slide-leave-active{
  transition: all .3s;
}
.slide-enter-active,.slide-leave-active{
  opacity:0;
}

.balance_page{


  /*position:absolute;*/
	position:fixed;


	top:0;
	bottom:0;
	left:0;
	right:0;
	background: #fff;
	z-index:99;
  overflow: hidden;
}



.content{
  background: #fff;

  .column1{
    text-align: center;
    height:50/@root-font-size;
    padding:.5rem 0;

    img{
      max-height:40/@root-font-size;
    }

  }
  .column2{
    display: flex;
    padding:.5rem .5rem;
    font-size:.8rem;
    text-align: center;
    margin:.4rem 0;

    span{
      /*justify-content: flex-start;*/
      flex:1;
      font-size:.6rem;
      /*white-space: pre-wrap;*/
    }

    a{
      color:#3C9CFF;
      padding:.2rem;
      border-radius:.2rem;
    }

    i{
      color:#ff0000;
      font-weight:bold;
      margin:0 .1rem;
    }

    /*span:first-child{
      width:42%;
    }
    span:nth-child(2){
      width:25%;
      text-align: left;
    }
    span:last-child{
      width:33%;
    }*/
  }

  .column3{

    display: flex;
    position: relative;
    border-top:1px solid #ECECEC;
    height:40/@root-font-size;
    line-height:40/@root-font-size;
    font-size:.7rem;

    &:after{
      content:'';
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      margin:auto;
      
      width:1px;
      background: #dadada;
      height:20/@root-font-size;
    }

    a{
      flex:1;
      text-align: center;
      color:#3C9CFF;
    }

  }

}

</style>
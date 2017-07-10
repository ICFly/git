<template>
	<div class="submitMargin_page">
	<header-top title="提交保证金" back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content tjzrj">
        <form action="" class="money-box">
            <div class="pd">
                <div class="form-group">
                    <p>准入金金额：<span>{{accessMoney}}</span> 元</p>
                    <p>您的账户现金余额：
                      <span>{{accountBalance}}</span> 元
                      <router-link to="/user/balance/recharge">充值</router-link>
                    </p>
                </div>
                <div class="form-group form-pwd">
                    <input type="password" v-if=" !showPassword " v-model:value="payment" placeholder="请输入支付密码" class="form-control"/>
                    <input type="text" v-else v-model:value="payment" placeholder="请输入支付密码" class="form-control"/>
                    <!-- <span class="icon-eye"></span> -->
                    <span class="icon-eye" :class=" {open:showPassword} " @click=" showPassword = !showPassword "></span>
                </div>
                <div class="form-group">
                    <p class="clear">

                        <span class="tips">如未修改默认为登录密码</span>
                        <router-link to="/found" class="link-found">找回密码</router-link>

                    </p>
                </div>
            </div>
            <div class="form-btn">
                <input type="button" @click.prevent="submitAccess" class="btn" value="确认提交"/>
            </div>
        </form>
    </div>

	</div>
</template>

<script>
	
import headerTop from '@/components/header/header'

export default{
	components:{
		headerTop
	},
  data(){
    return{

      accountBalance:0,//账户余额
      accessMoney:0,//准入金金额
      payment:'',//支付密码

      showPassword:false,

    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.queryAccountBalance();
      this.queryAccess();



    })
  },

  methods:{

    //检查输入框
    checkInput(){
      if(this.payment == ""){
        layer.msg("请输入支付密码")
        return;
      }
      if(this.payment.length < 6){
        layer.msg("支付密码格式不正确")
        return;
      }
      return true;
    },

  //查询账户余额
  queryAccountBalance(){


    this.$http.post('/GetInfoByvip',{vip:this.$store.getters.getVip}).then((res)=>{

      if(res.data.code == 0){

        this.accountBalance = res.data.response.user.account_balance;

      }


    })
  },
  //查询准入金金
  queryAccess(){


    //console.log( {vip:this.$store.getters.getVip,bid:this.$route.query.id});

    this.$http.post('/queryAccess',{vip:this.$store.getters.getVip}).then((res)=>{
      if(res.data.code == 0){
        let access = res.data.response;
        if(access && access > 0){
          this.accessMoney = access;
        }else{
          this.$router.go(-1);
        }

      }
      
    })



  },
  //提交准入金

  submitAccess(){

    if(!this.checkInput()) return;

    //submitAccess
    //submitAccessByVip
    this.$http.post('/submitAccessByVip',{money:this.accessMoney,payment:this.payment,vip:this.$store.getters.getVip}).then((res)=>{

        // this.accessMoney = res.data.response;
        // console.log(res.data);

        if(res.data.code == 0){
          let vm = this;
          layer.msg("准入金提交成功",{time:1.5},()=>{
            // vm.$router.go(-1);
            // location.reload();
            vm.$router.go(-1);
          })
        }else{
          layer.msg(res.data.message);
        }
    })


  },



  }

}

</script>

<style lang='less' scoped>
@import '../../../assets/css/variable.less';	



.submitMargin_page{
	.fixed();
  background: #F0F0F0;
}

/*提交保证金*/

.tjzrj{


  .pd{
    padding:20/@root-font-size 1rem;
  }

  .form-pwd{
    margin:10/@root-font-size 0;
    position: relative;


    /*//密码显示框*/
    .icon-eye{
      position: absolute;
      right:1/@root-font-size;
      top:0;
      bottom:0;
      background: url('../../../assets/imgs/icon_eye.png') no-repeat center center;
      background-size: 20/@root-font-size 14/@root-font-size;
      width:20/@root-font-size;
      padding:0 25/@root-font-size;
    }
    .icon-eye.open-eye{
      background: url('../../../assets/imgs/icon-eye-open.png') no-repeat center center;
      background-size: 20/@root-font-size 14/@root-font-size;
    }

  }

  p{
    color:#f00;
    font-size:.7rem;
    margin:.2rem 0;
  }

  .tips{
    color:#a0a0a0;
    font-size:.7rem;
    float:left;
  }
  .link-found{
    float:right;
    font-size:.7rem;
  }
  .form-control{
    width:100%;

    line-height:20/@root-font-size;
    font-size:.8rem;
    padding:10/@root-font-size 10/@root-font-size;

    border-radius:4px;
  }
  .form-group{
    a{
      color:#0042ff;
      margin:0 5px;
    }
  }

  .form-btn{
    padding:0 5%;
  }
  .form-btn .btn{
    width:100%;
    margin:0 auto;
    background: #389E3A;
    height: 32/@root-font-size;
    text-align: center;
    color:#fff;
    border-radius:5px;
    font-size:.7rem;
  }
}

</style>
<template>
<div class="withdraw_page">
	
	<header-top title="提现" back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content tixian">
        <div class="account-info">
            <p><span>现金账户余额：</span><i class="font-style-red" >{{user.account_balance}}</i>元</p>
            <p><span>可提现金额：</span><i class="font-style-red" >{{user.account_balance}}</i>元</p>
            <!-- <p><span>微信可提现金额：</span><i class="font-style-red" >{{user.account_balance}}</i>元</p> -->
            <div class="btn">
                <a @click="toPage('/user/balance/withdrawByCard',{'to':'0'})">国内账户</a>
                <a @click="toPage('/user/balance/withdrawByCard',{'to':'1'})">国际账户</a>
                <!-- <a @click="toPage('/user/balance/withdrawToWeChart')">微信账户</a> -->

            </div>
        </div>

        <div class="tixian-content">
            <p>
                用户可随时申请提现，申请提交成功后，1个工作日内工作人员将会处理，具体到账时间为各个银行处理时间为准。
            </p>
            <p>
                温馨提醒：确保填写您的准确电话，再商网客服
                会在给您汇款提现时联系您。 有任何提现疑问请
                在每天9：00-18：00咨询客服。（法定节假日除
                外）
            </p>
            <p>
                提现规则说明：1.当前账户余额大于等于1000
                元时，最低提现金额为1000元，如当前余额为19
                99元，则最低可提现1000元； 2.当前账户余额
                小于1000元时，最低提现金额为当前余额，如当
                前额为999元，则提现全部余额：999元； 3.当
                进行国外账户提现时，汇率根据再商网所属银行的
                实时汇率进行货币兑换。
            </p>
        </div>
    </div>

    <loading v-show=" showLoading "></loading>

</div>	

</template>

<script>
	
import headerTop from '@/components/header/header'
import loading from '@/components/common/loading'

export default{

	components:{
		headerTop,
    loading,
	},
	data(){
		return{
			user:{},
      showLoading:true,
		}
	},
	mounted(){

		this.$nextTick(()=>{
			this.getInfo();
		})

	},
	methods:{
		toPage(url,param){
			this.$router.push({path:url,query:param})
		},
      //查询信息
      getInfo(){

        
        this.$http.post('/GetInfoByvip',{vip:this.$store.getters.getVip}).then((res)=>{
          // console.log(res);

          this.user = res.data.response.user;

          this.showLoading = false;



        })
      }
		// getInfo(){
		// 	this.$http.post('/getInfoByvip',{vip:this.$store.getters.getVip}).then((res){

		// 		// if(res.data.code == 0){
		// 		// 	this.user = res.data.response;
		// 		// }

		// 	})
		// }
	}
}

</script>


<style lang='less' scoped >

@import '../../../assets/css/variable';



.withdraw_page{
	.fixed();
	z-index:999;
	background: #F0F0F0;
}


/*//提现*/
.tixian{
  




}




.account-info{
	text-align: center;
	background: #fff;
	padding:10/@root-font-size 0;
	line-height:30/@root-font-size;
	font-size:.7rem;

	div{
	  justify-content: center;
	  display: flex;
	  margin-top:12px;

	  a{
	    border-radius:4px;
      margin:0 .3rem;
	    width:60/@root-font-size;
	    line-height:30/@root-font-size;
	    background: #389E3A;
	    color:#fff;
	    text-align: center;
	  }
	}


}


  .tixian-content{
    padding:10/@root-font-size 10/@root-font-size;
    line-height:.9rem;

    p{
      margin-bottom:10/@root-font-size;
      font-size:.66rem;
    }
  }





/*//国际提现*/
/*
.guojitixian{
  background: #fff;

  .account-info{
    padding:18/@root-font-size 0;
    text-align: center;
  }


  .tips1{
    background: #F0F0F0;
    padding:16/@root-font-size 18/@root-font-size;
  }

  .form-box{
    padding:0 16/@root-font-size 10/@root-font-size 16/@root-font-size;
  }

  .form-tit{
    color:#f00;
    text-align: center;
    padding:12/@root-font-size;
  }

  .form-group{
    display: flex;
    margin-bottom: 10/@root-font-size;
    position: relative;


    label{
      justify-content: flex-start;
      width:40%;
      line-height:37/@root-font-size;
      font-size:1px*@font-middle-size;
    }

    .form-control{
      width:60%;
      padding:10/@root-font-size 5px;
      border:1px solid #D5D5D5;
      border-radius:2px;
      line-height:15/@root-font-size;

      display: block;

    }

  }

  .icon-type:after{
    content: '';
    position: absolute;
    margin: auto;
    top: 13px;
    right: 10px;
    border-width:8px;
    border-style:solid;
    border-color: #8C8C8C transparent transparent transparent;
  }





  .btn{
    width:100%;
    background: #389E3A;
    color:#fff;
    line-height:45/@root-font-size;
    border-radius:5px;
  }

  */




/*}*/
	


</style>
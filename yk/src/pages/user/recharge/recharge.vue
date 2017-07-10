<template>

<div class="recharge_page">
	
	<header-top title='账户充值' back></header-top>
	<div class="fixed-top-div"></div>



    <div class="content chongzhi">

        <div class="col1">
            <h3>账户说明</h3>
            <p>
                以下对公账号为我公司收款银行信息，在此网
                站“关于我们-付款方式”中可查询到。请您按
                照以下任何一种方式办理汇款后，点击“上传
                汇款凭证”进入页面填写汇款信息，我们核实
                后会将款项充值到您的账户，届时请留意余额
                变动以及系统通知。
            </p>
        </div>
        <div class="col2">
            <h3>请选择再商网银行账户</h3>
            <div class="bank-list">
                <ul>

                    <li @click="toPage('/user/balance/uploadVoucher',{otherNo:'4000103809100324859'})">

						<!-- <li click="toPage('/user/recharge/uploadVoucher',{otherNo:'4000103809100324859'})"></li> -->

                        <div class="bank-img">
                            <img src="../../../assets/imgs/center/bank_img1.png" alt="">
                        </div>
                        <div class="bank-info">
                            <p>开户名：深圳银河丽赛特科技有限公司</p>
                            <p>开户银行：中国工商银行 民治支行</p>
                            <p>账号：<span class="bank-id">4000103809100324859</span></p>
                        </div>
                    </li>

                    <li @click="toPage('/user/balance/uploadVoucher',{otherNo:'4000103819100433583'})">
                        <div class="bank-img">
                            <img src="../../../assets/imgs/center/bank_img2.png" alt="">
                        </div>
                        <div class="bank-info">
                            <p>开户名：GALAXY LST CO.,LTD</p>
                            <p>开户银行：Industrial and Commercial Bank of China</p>
                            <p>账号：<span class="bank-id">4000103819100433583</span></p>
                            <p>地址：NORTH BLOCK FINANCIAL CENTRE SHENNAN ROAD EAST SHENZHEN</p>
                            <p>国名：P. R. OF CHINA</p>
                            <p>收款行SWIFT编号：ICBKCNBJSZN 【工商银行 l Bank of China】</p>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

    </div>


   <!--  <transition>
    	<router-view></router-view>
    </transition>
 -->

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

		}
	},
	methods:{
		toPage(url,params){
			this.$router.push({path:url,query:params});
		}
	}


}

</script>


<style lang='less' scoped>
@import '../../../assets/css/variable';


.recharge_page{
	.fixed();
	z-index:9999;
}
/*
#header_top{
	z-index:9999;
}*/
/*//充值*/

.chongzhi{


  .pd{padding-left:15/@root-font-size;}


  h3{
    background: #F0F0F0;
    line-height:40/@root-font-size;
    font-size:.8rem;
    .pd;
  }

  .col1{
    p{
      padding:5/@root-font-size 10/@root-font-size;
      color:#f00;
      line-height:.9rem;
      font-size:.6rem;
    }
  }

  .col2{
    li{
      display: flex;
      position: relative;
      border-bottom:1px solid #C8C8C8;
      padding:10/@root-font-size 8/@root-font-size;
      font-size:.6rem;


      div{
        justify-content: flex-start;
      }

      &:after{
        position: absolute;
        right:8px;
        top:0;
        bottom:0;
        margin:auto;
        content:'';
        width: .6rem;
        height: .6rem;
        border-top: 2px solid #8a8c7f;
        border-right: 2px solid #8C8C8C;
        -webkit-transform: rotate(225deg);
        transform: rotate(45deg);

      }
    }

    .bank-img{
      margin-right:5/@root-font-size;
      overflow: hidden;
      width:30%;
      img{
        //height:66/@root-font-size;
        width:100%;
      }
    }

    .bank-info{
      width:70%;
      line-height:.8rem;
      overflow: hidden;
      font-size:.6rem;
    }
  }
}


</style>
<template>
	
<div class="withdrawByCard_page">
	
	<header-top :title=' title ' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content guojitixian">
        <div class="account-info">
            <p><span>现金账户余额：</span><i class="font-style-red" v-text="userInfo.account_balance + userInfo.ensure_money "></i>元</p>
            <p><span>可提现金额：</span><i class="font-style-red" v-text="userInfo.account_balance"></i>元</p>
        </div>

        <div class="tips1">
            用户可随时申请提现，申请提交成功后，3个工作日内到帐（节假日顺延）
        </div>

        <form action="" class="form-box layui-form">
            <div class="form-tit">
                请填写详细提款（收款）明细
            </div>

            <div class="form-group">
                <label for="money">提现金额：</label>
                <input type="number" class="form-control" lay-verify="money" v-model:value="orderInfo.money" id="money">
            </div>
            <div class="form-group icon-type">
                <label>收款币种：</label>
                <input id="type" type="text" @click="showSelectBox = true " 
                :value=" currency.c_name " readonly placeholder="默认为人民币" class="form-control" >

            </div>
            <div class="form-group">
                <label for="name">收款人姓名：</label>
                <input type="text" class="form-control" lay-verify="name" v-model:value="orderInfo.name"  id="name">
            </div>

            <div class="form-group">
                <label for="bankName">收款人银行：</label>
                <input type="text" class="form-control" lay-verify="branch" v-model:value="orderInfo.branch"  id="bankName">
            </div>
            <div class="form-group">
                <label for="bankCard">收款人银行账号:</label>
                <input type="text" class="form-control" lay-verify="no" v-model:value="orderInfo.no"  id="bankCard">
            </div>
            <div class="form-group">
                <label for="bankAddress">收款人银行地址：</label>
                <input type="text" class="form-control" lay-verify="address" v-model:value="orderInfo.address"  id="bankAddress">
            </div>

            <div class="form-group" v-show=" withdrawType ">
                <label for="bankAddress">银行国际代码：</label>
                <input type="text" class="form-control" v-model:value="orderInfo.icnb" >
            </div>


            <div class="form-group">
                <label for="phone">提现申请人电话：</label>
                <input type="text" class="form-control" lay-verify="phone" v-model:value="orderInfo.phone"  id="phone">
            </div>
            <div class="form-group">
                <label for="pwd">请输入支付密码：</label>
                <input type="password" class="form-control" lay-verify="payment" v-model:orderInfo="orderInfo.payment" id="pwd">
            </div>

            <div class="form-group">

                <!--<input type="submit" class="btn">-->
                <button @click.prevent="submitForm" class="btn">提交</button>


            </div>

        </form>



    </div>




<!-- 选择单位框 -->

  <div class="layui-m-layer" index="1" style="z-index:9999" @click=" showSelectBox = false " v-if=" showSelectBox ">
    <div class="layui-m-layershade"></div>
  </div>


  <div class="selectBox" id='selectBox' v-if=" showSelectBox ">
    <div class="selectBox_cell">
      <h3>交易币种</h3>
      <ul>
        <li v-for="(item,index) in unitList.Currencys" @click="currency = item" v-text="item.c_name"></li>
      </ul>
    </div>

  </div>

<!-- +++++++++++++ -->




<loading v-show=" showLoading "></loading>




</div>


</template>


<script>

import headerTop from '@/components/header/header'	
import loading from '@/components/common/loading'
//引入单位组件
import unit from '@/data/unit'

export default{

	components:{
		headerTop,
    loading
	},
	data(){
		return{

			account_balance:0,
			ensure_money:0,
      userInfo:{},
      orderInfo:{
          money:'',
          currency:'BZ201604204494',
          name:'',
          branch:'',
          no:'',
          icnb:'',//银行国际代码
          address:'',
          phone:'',
          payment:'',
          vip:this.$store.getters.getVip
      },
      title:"提现",//标题
      withdrawType:false,//默认为国内，所以不显示 国际代码
      selectCurrency:{},
      unitList:unit,
      currency:{},
      showSelectBox:false,

      showLoading:true,//加载层

		}
	},
  activated(){

    // console.log(this.$route.query);

    this.queryInfo();

    //0、表示国内体现。1、表示国际体现
    if(this.$route.query.to==1){
      this.title = "国际提现"
      this.withdrawType = true
    }else{
      this.title = "国内提现"
      this.withdrawType = false
    }

  },
  methods:{

    //验证表单输入
    checkInput(){
      if(this.orderInfo.money == ""){
        layer.msg("请输入提现金额")
        return;
      }

      if(this.orderInfo.money > this.userInfo.account_balance){
        layer.msg("提现金额超出可提现余额")
        return;
      }




      if(this.orderInfo.name == ""){
        layer.msg("请输入收款人姓名")
        return;
      }
      if(this.orderInfo.branch == ""){
        layer.msg("请输入银行支行地址")
        return;
      }
      if(this.orderInfo.no == ""){
        layer.msg("请输入银行账号")
        return;
      }
      if(this.orderInfo.address == ""){
        layer.msg("请填写银行地址")
        return;
      }
      //如果是国外的话，同时需要填写国际代码
      if(this.withdrawType && this.orderInfo.icnb == ""){
        layer.msg("请输入银行国际代码")
        return;
      }

      if(this.orderInfo.phone == ""){
        layer.msg("请输入电话号码")
        return;
      }
      if(this.orderInfo.payment == ""){
        layer.msg("请输入支付密码")
        return;
      }

      return true;
    },


    //查询用户余额
    queryInfo(){
    this.$http.post('/GetInfoByvip',{vip:this.$store.getters.getVip}).then((res)=>{
      if(res.data.code == 0){
        this.userInfo = res.data.response.user;

        this.showLoading = false;//关闭加载层
      }
    })


    },
    //提交表单
    submitForm(){
      //验证所有表单字段，通过则提交表单

      if(!this.checkInput()) return;

      let url = '';
      if(this.$route.query.to == 1){
        url = "GwWithdrawals"
      }else{
        url = "/GnWithdrawals"
      }

      this.$http.post(url,this.orderInfo).then((res)=>{

          if(res.data.code==0){

            layer.open({
              content:'提交申请成功，请等待后台审核！',
              time:2,
              btn:'确定',
              end:function(){
                location.reload();
              }
            })

          }else{

            layer.msg(res.data.message);

          }
      })


    }
  },
  watch:{
    currency(val,old){

      // console.log(val);

      this.orderInfo.currency = val.c_id;
      this.currency = val;
      this.showSelectBox = false;
    }
  }



}



</script>

<style lang='less' scoped>
	
@import '../../../../assets/css/variable';


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














.withdrawByCard_page{
	.fixed();
	z-index:9999;
}

/*//国际提现*/

.guojitixian{
  background: #fff;

  .account-info{
    padding:10/@root-font-size 0;
    text-align: center;
    font-size:.8rem;
    line-height: 1.2rem;
  }


  .tips1{
    background: #F0F0F0;
    padding:10/@root-font-size 12/@root-font-size;
    font-size:.7rem;
  }

  .form-box{
    padding:0 16/@root-font-size 10/@root-font-size 16/@root-font-size;
  }

  .form-tit{
    color:#f00;
    text-align: center;
    padding:12/@root-font-size;
    font-size:.6rem;
  }

  .form-group{
    display: flex;
    margin-bottom: 8/@root-font-size;
    position: relative;
    height:2rem;


    label{
      justify-content: flex-start;
      width:40%;
      line-height:37/@root-font-size;
      font-size:.65rem;
    }

    .form-control{
      width:60%;
      padding:0/@root-font-size 5px;
      border:1px solid #D5D5D5;
      border-radius:2px;
      line-height:10/@root-font-size;

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
    /*line-height:40/@root-font-size;*/
    border-radius:5px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  




}


</style>
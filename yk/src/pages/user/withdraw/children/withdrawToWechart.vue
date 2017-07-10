<template>
  
<div class="withdrawByCard_page">
  
  <header-top title=' 微信提现 ' back></header-top>
  <div class="fixed-top-div"></div>

    <div class="content guojitixian">
        <div class="account-info">

            <!-- <p><span>现金账户余额：</span><i class="font-style-red" v-text="userInfo.account_balance + userInfo.ensure_money "></i>元</p> -->
          <p>您可提现<i class="font-style-red">1000</i>人民币至您的微信账户，若有剩余余额，请申请提现至国内账户或国外账户</p>

        </div>


        <form action="" class="form-box layui-form">
            <div class="form-group">
                <label for="money">提现金额：</label>
                <input type="text" class="form-control" lay-verify="money" v-model:value="orderInfo.money" id="money">
            </div>
            <div class="form-group">
                <label for="pwd">请输入支付密码：</label>
                <input type="password" class="form-control" lay-verify="payment" v-model:orderInfo="orderInfo.payment" id="pwd">
            </div>
            <div class="form-group">
              <!--<input type="submit" class="btn">-->
              <button @click.prevent="submitForm" class="btn">确定</button>
            </div>
        </form>
    </div>


</div>


</template>


<script>

import headerTop from '@/components/header/header'  
//引入单位组件
import unit from '@/data/unit'

export default{

  components:{
    headerTop
  },
  data(){
    return{
      account_balance:0,
      ensure_money:0,
      userInfo:{},
      orderInfo:{
          money:'',
          payment:'',
          vip:this.$store.getters.getVip
      },

    }
  },
  activated(){

    this.queryInfo();

  },
  methods:{

    //验证表单输入
    checkInput(){
      if(this.orderInfo.money == ""){
        layer.msg("请输入提现金额")
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
      }
    })

    },
    //提交表单
    submitForm(){
      //验证所有表单字段，通过则提交表单

      if(!this.checkInput()) return;

      this.$http.post(url,this.orderInfo).then((res)=>{
          if(res.data.code==0){
            layer.open({
              content:'提交申请成功，请等待后台审核！',
              time:2,
              btn:'确定',
            })
          }else{
            layer.msg(res.data.message);
          }

      })


    }
  },
  watch:{
    currency(val,old){
      console.log(val);
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

    p{

      padding:1rem;
      font-size:.6rem;
      text-align: left;
    }
  }




  .form-box{
    padding:0 16/@root-font-size 10/@root-font-size 16/@root-font-size;
  }


  .form-group{
    display: flex;
    margin-bottom: 10/@root-font-size;
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
    border-radius:5px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  




}


</style>
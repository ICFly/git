<template>
	<div class="toBid_page">

	<header-top v-if="dicker.t_price !='' ||dicker.t_price !=0" title='我要还价' back></header-top>
	<header-top v-else title='我要出价' back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content wycj">

        <form action="" class="form-box layui-form">


            <div class="form-group flex">
            	<p v-if="dicker.t_price !='' ||dicker.t_price !=0">第{{ priceList.length||1 }}次还价</p>
                <p v-else>第{{ priceList.length||1 }}次出价</p>
                
            	<p v-if="dicker.t_price !='' ||dicker.t_price !=0">还价有效期</p>
                
                <p v-else>出价有效期</p>
            </div>



            <div class="form-group flex2">
                <input type="number" lay-verify="price" v-model:value="price" class="form-control"/>
                <span class="unit">英镑/公斤</span>
                <span class="icon"><input type="text" placeholder="天" @click=" showSelectBox = true " :value="time +'天' " readonly class="form-control"/><i class="icon-down"></i></span>
            </div>

            <div class="form-group">
                <ul class="list" >
                	
                   
                    <li v-for="(item,index) in priceList">
                    	第{{ priceList.length - index }}次{{dicker.t_price !='' && dicker.t_price !=0?"还价":"出价"}}：
                    	<span class="order-price" v-text="item.tb_price"></span>，有效期：
                    	<span class="order-times" v-text="item.tb_time"></span>天，时间：
                    	<span class="order-date" v-text="item.tb_date"></span>
                    </li>
                </ul>
            </div>

            <div class="form-btn">
            
                <input v-if="dicker.t_price !='' ||dicker.t_price !=0" type="submit" class='btn' @click.prevent=" submitBid" value="还价" />
                <input v-else type="submit" class='btn' @click.prevent=" submitBid" value="出价" />

            </div>

            <div class="form-group agree">
                <input type="checkbox" @click="agree = !agree" lay-ignore lay-verify="agree" class="hide" id="agree"/>
                <label class="agree-label" for="agree"></label>
                <span>我已阅读，理解并能接收</span><a>《再商网现货交易规则》</a>
            </div>
            <div class="tips">
                <span class="tips-tit">温馨提示：</span>一个现货交易项目一人最多可还价（出价）3次，3次价格都会进入卖家的选择，请谨慎还价（出价）。交易成交后境外（含港澳台）项目收取100元服务费，境内项目免费。
            </div>

        </form>

    </div>


  <select-box :showSelectBox=" showSelectBox ">
    <div class="selectBox_cell">
      <h3>选择出价有效期</h3>
      <ul>
        <li v-for="item in 30" @click=" time = item " v-text="item"></li>
      </ul>
    </div>
  </select-box>
		


	</div>
</template>

<script>
import headerTop from '@/components/header/header'

import selectBox from '@/components/common/selectBox2'


export default{
	components:{
		headerTop,
    selectBox,
	},
  data(){
    return{

      priceList:[],//出价列表
      time:3,
      price:"",
      bid:this.$route.query.id,

      agree:false,

      showSelectBox:false,
      //还价
      dicker:{},


    }
  },
  created(){
      this.queryTenderById();
    },
  mounted(){
    this.$nextTick(()=>{
      this.queryBidInfo();
    })
  },
  watch:{
    time(){
      this.showSelectBox = false;
    }
  },
  methods:{

	queryTenderById(){
        this.$http.post('/queryTenderByid',this.$route.query).then((res)=>{
        	this.dicker = res.data.response;
        })
      },
    //检查表单字段
    checkForm(){

      if(this.price==""){
        layer.msg("请输入价格")
        return
      }

      if(this.time <= 0){
        layer.msg("请选择出价期限")
        return
      }

      if(!this.agree){
        layer.msg("请阅读并同意再商网交易规则")
        return
      }

      return true;


    },
    //查询出价记录
    queryBidInfo(){

      this.$http.post('/queryJingBiao',{vip:this.$store.getters.getVip,bid:this.$route.query.id}).then((res)=>{
			
          this.priceList = res.data.response;
          
      })

    },

    //出价
    submitBid(){


      if(!this.checkForm()) return;

      this.$http.post('/JingBiao',{vip:this.$store.getters.getVip,edition:'1.0',bid:this.bid,price:this.price,tb_time:this.time}).then((res)=>{
			console.log(res.data)
			
          if(res.data.code == 0){

            layer.msg("出价成功")
            
            this.queryBidInfo();
            
            
          }else{
          	
            layer.msg(res.data.message)
            
          }

      })


    }




  }

}	
</script>

<style lang='less' scoped>
	
@import '../../../assets/css/variable.less';

/*//我要出价*/

.toBid_page{
	.fixed();
	background:#F0F0F0;
  z-index:9999;
}

.wycj{

  .flex{
    display: flex;
    p{
      flex:1;
      text-align: center;
    }
  }

  .flex2{
    justify-content: center;
    display: flex;
    .icon{
      position: relative;
      width:35%;
      .form-control{
        width:100%;
        height:2.4rem;
        position: relative;
        top:-1px;
      }
    }

    .icon-down{
      right:10px;
      top:18px;
      position: absolute;
      border-style:solid;
      border-width:8px;
      border-color:#C1C1C1 transparent transparent transparent;
    }

    .unit{
      margin:0 3%;
      text-align: center;
      vertical-align: middle;
      font-size:.6rem;
    }
  }


  .form-box{

    .form-control{
      width:35%;
      font-size:.7rem;
      height:2.4rem;
      padding:5/@root-font-size 6/@root-font-size;
      border:1px solid #C1C1C1;
      border-radius:5px;
    }

    .form-group{
      line-height:40/@root-font-size;
      font-size:.7rem;
    }

    .tips{
      font-size:.6rem;
      padding:6px 15px;
      line-height:.8rem;
      .tips-tit{
        color:#f00;
      }
    }
    .agree{
      margin:6/@root-font-size 0;


      font-size:.6rem;
      text-align: center;
      .agree-label{
        width:12/@root-font-size;
        height:12/@root-font-size;
        border:2px solid #C1C1C1;
        margin:0 3px;
        display: inline-block;
        vertical-align: middle;
        top:-1px;
        position: relative;
      }
      input[type=checkbox]:checked{
        background:#f00;
      }
      input[type=checkbox]:checked + label{
        border-color:#f00;
      }
      input[type=checkbox]:checked + label:after{
        content:'';
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin:auto;
        width:6/@root-font-size;
        height:6/@root-font-size;
        background: #f00;
        /*//transition: background-color .1s ease-in;*/
      }

      a{
        color:#0011f4
      }
    }

    .form-btn{
      padding:0 6%;
      .btn{
        width:100%;
        background: #389E3A;
        height:35/@root-font-size;
        color:#fff;
        border-radius:5px;
        font-size:.7rem;
      }
    }

    ul.list{
      line-height:20/@root-font-size;
      padding:10/@root-font-size 0;
    }

    li{
   		width: 130%;
      	font-size:.6rem;
      	padding-left:8px;
      	color:#FF4202;
      	-webkit-transform-origin-x: 0;
      	-webkit-transform: scale(0.8);
    }
  }

  .days{
    ul{
      padding:0;
    }
    li{

      line-height:25/@root-font-size;
      color:#333;

    }
  }


}


</style>
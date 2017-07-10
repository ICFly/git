<template>
<div class="list_page">
	
	<header-top title='出价管理' back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content look_price" id="wrapper_container">
      <div id="wrapper" >
        <div class="info">
            <div>
                <span>交易单号：</span><b v-text="orderInfo.t_id"></b>
            </div>
            <div>
                <span>交易名称：</span><b v-text="orderInfo.t_title"></b>
            </div>
            <div>
                <span>交易数量：</span><b v-text="orderInfo.t_quality + orderInfo.dw_name "></b>
            </div>
            <div>
                <span>交易地区：</span><b v-text="orderInfo.dz_name"></b>
            </div>
            <div>
                <span>结束时间</span><b v-text="endDate"></b>
            </div>
            <div>
                <span style="width:12em;">交易成功后买家提货时间：</span><b v-text="orderInfo.t_picktime+'天' "></b>
            </div>
        </div>

        <div class="deal_list" v-for="(item,index) in dealList ">
            <div class="col1">
                <span><img v-bind:src=" item.photo "/> <i v-text=" item.district "></i></span>
                <span v-text=" item.date "></span>
            </div>
            <div class="col2">
                <span>出价</span>
                <span class="font-style-red" v-text=" item.tb_price "></span>
                <span class="font-style-red">出价期限 <i v-text=" item.tb_time "></i> 天</span>
            </div>
            <div class="col3">
            	<span class="overdue" v-if="item.state == 2">已过期</span>
                <span v-else @click="dealByOrder(index)">成交</span>
            </div>
        </div>

      </div>
    </div>


<!-- 
  <transition name='slide' mode='out-in'>
    <router-view></router-view>
  </transition> -->

</div>	
</template>

<script>
	
import headerTop from '@/components/header/header'

import bScroll from 'better-scroll'
export default{
	components:{
		headerTop
	},
  data(){
    return{

  		orderInfo:{},
  		dealList:{},
  		endDate:'',

      scroller:null,


    }
  },
  mounted(){
    this.$nextTick(()=>{

      this.queryInfo();



      setTimeout(()=>{

        this.scroller = new bScroll("#wrapper_container",{
          click:true,
          bounce:false,
        })

      },1000)

    })
  },
  methods:{

    //选择成交
    dealByOrder:function(index){

      let cjid = this.dealList[index];
  
        this.$http.post('/Deal',{cjid:cjid,zbrid:this.$store.getters.getVip,bid:this.$route.query.id,vip:this.$store.getters.getVip,edition:"h5"}).then((res)=>{
            if(res.data.code == 0){
                layer.msg("成交成功");
            }else{
                layer.msg(res.data.message);
            }
        })

    },

    //查询信息
    queryInfo(){

        this.$http.post('/queryTenderByid',{id:this.$route.query.id}).then((res)=>{
            if(res.data.code==0){
            	console.log(res.data.response)
                this.orderInfo = res.data.response;
                this.formatDate(this.orderInfo.pass_time,this.orderInfo.t_date)
            }
        })

        this.$http.post('/bidmanagement',{bid:this.$route.query.id,vip:this.$store.getters.getVip}).then((res)=>{
            if(res.data.code==0){
            	console.log(res.data.response)
            	
                this.dealList = res.data.response.JBRinfo;
            }
        })
    },

    //计算剩余时间
    formatDate(dated,day){
        var vm = this;
        var dated = dated.replace(/-/g,'/');

        var date = new Date(dated);
        date.setDate(date.getDate()+parseInt(day));
        var date3 = date.getTime() - new Date().getTime();

        var days=Math.floor(date3/(24*3600*1000));
        //计算出小时数
        var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));
        //计算相差秒数
        var leave3=leave2%(60*1000);     //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3/1000);
        vm.endDate = days+"天"+hours+"时"+minutes+"分";
    }

  }
}

</script>

<style lang='less' scoped>
@import '../../../../assets/css/variable.less';

/*//查看出价*/
.look_price{
/*
height:100%;
overflow: hidden;*/

position:absolute;
top:2rem;
bottom:0;
left:0;
/*z-index:9999;*/
right:0;


  .info{
    background: #fff;
    font-size:1px*@font-middle-size;
    padding:15/@root-font-size;
    line-height:26/@root-font-size;

    span{
      width:8em;
      display: inline-block;
    }

    b{
      font-weight:normal;
    }
  }



  .deal_list{
    display: flex;
    height:3.5rem;
    margin:10/@root-font-size 0;
    font-size:1px*@font-middle-size;
/*    div{
      justify-content: flex-start;
      overflow: hidden;

    }*/

    span{
      display: block;
      text-align: center;
    }
    img{
      max-height:20/@root-font-size;
      vertical-align: middle;
    }

    .font-style-red{
      color:#f00;
    }
  }


  .col1{
    background: #fff;
    width:40%;
  }
  .col2{

    width:40%;
  }
  .col3{
    color:#fff;
    width:20%;
	span{
		display: block;
		width: 100%;
		height: 100%;
    	background: red;
		display: flex;
    	justify-content: center;
    	align-items: center;
    	background: #54D321;
	}
    /*line-height:80/@root-font-size;*/

  }



}

.overdue{
	background: rgba(84, 211, 33, 0.59) !important;
}

</style>






















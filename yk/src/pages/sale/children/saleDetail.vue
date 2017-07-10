<template>
	
<div class="saleDetail_page">

	
<header-top title='详情' back></header-top>
<div class="fixed-top-div"></div>

<div class="content" id='wrapper_box'>
	

  <div class="order-info" style='padding-bottom:2.1rem;' id="wrapper">
  <!-- banner图片 -->
  <template id='template' class="swiper-container banner">

	  <swiper :options="swiperOption"  class="swiper-wrapper banner-wrapper">
	    <swiper-slide class="swiper-item" :key='index' v-for=" (item,index) in mainList ">
	    	<img :src='item'>
	    	<span v-if='priList[index]' >{{ priList[index] }}</span>
	    </swiper-slide>
	    <div class="swiper-pagination" slot="pagination"></div>
	  </swiper>

    <p class="link-href">
      <span class="share-icon right" @click=" nShare.call() "><img src="../../../assets/imgs/xhjy/xqy2.png"></span>

      <span v-if="favoriteState" class="favorite right" @click="removeFavorite"><img src="../../../assets/imgs/xhjy/xqy4.png"/> </span>
      <span v-else class="favorite right" @click="addFavorite"><img src="../../../assets/imgs/xhjy/xqy3.png"/> </span>


    </p>
  </template>

  <!--banner图-->

    <div class="status">
        <p v-if="TenderInfo.t_price">
            <span class="lt">单价：</span>
            <span class="price">{{TenderInfo.t_price}}</span>
            <span class="unit">{{TenderInfo.bz_name}}/{{TenderInfo.dw_name}}</span>
        </p>
        <p v-else>
            <span>卖家尚未开价，请出价</span>
        </p>

        <p>
            <span class="block">距离交易结束还剩：</span>
            <span v-if='tenderStatus'>
              <i class="i-day" >{{timer[0]}}</i>天
              <i class="i-hour" >{{timer[1]}}</i>时
              <i class="i-min" >{{timer[2]}}</i>分
              <i class="i-sec" >{{timer[3]}}</i>秒
            </span>
            <span v-else style="color:red;">已结束</span>
        </p>

    </div>
    <div class="desc">
        <h3>
            <img v-if="TenderInfo.vipState==2" src="../../../assets/imgs/icon_vip2.png"/>
            <img v-if="TenderInfo.vipState==1" src="../../../assets/imgs/icon_vip22.png"/>
            <span v-text="TenderInfo.t_title" id="title"></span>
        </h3>

        <section>
            <p><span>交易编号：</span>{{TenderInfo.t_id}}</p>
            <p><span>卖方保证金：</span>{{TenderInfo.a_bail}}人民币</p>
            <p><span>货物数量：</span>{{TenderInfo.t_quality}}{{TenderInfo.dw_name}}</p>
            <p><span>货物包装：</span>{{TenderInfo.pack_name}}</p>
            <p><span>货物类型：</span>{{TenderInfo.t_type}}</p>
            <p><span>所在地区：</span>{{TenderInfo.dz_name}}</p>
            <p><span>交易币种：</span>{{TenderInfo.bz_name}}</p>
            <p><span>交易方式：</span>{{TenderInfo.jy_name}}</p>
        </section>

        <div class="tips">
            <span class="tips-tit font-style-red">提示：</span>
            <span>买家在交易成功<i class='font-style-red'>7</i>天内必须在货物所在地进行交易验货，如不能满足该要求，请谨慎议价。</span>

        </div>
        <div class="info">
            <p>{{TenderInfo.t_detail}}</p>
        </div>

    </div>
    <div class="detail-img">
        <li v-for="(item,index) in imgsList ">
            <img v-bind:src="item" alt=""/>
            <p>{{ detList[index] }}</p>
        </li>
    </div>
    <div style='height:2.1rem;'></div>
  </div>



<!--   <div  style="position: absolute;width:100%;bottom:0;">
      <div class="btn">

          <router-link :to="{path:'/sale/submitMargin',query:{id:TenderInfo.t_id}}">提交准入金</router-link>
          <a @click='showDeal'>立即成交</a>
          <router-link :to="{path:'/sale/toBid',query:{id:TenderInfo.t_id}}">我要出价</router-link>

      </div>
  </div>
 -->



  <div v-if="TenderInfo.finish_state != 1 && tenderStatus != false" style="position: fixed;width:100%;bottom:0;">
      <div class="btn"  v-if="isMyVip != TenderInfo.usr_id " >
        <a @click="submitAccess">提交准入金</a>
        <a @click=" showDeal " v-show=" TenderInfo.t_price !='' ||TenderInfo.t_price !=0 ">立即成交</a>
        <a @click=" goOffer ">{{ TenderInfo.t_price==''?'我要出价':'我要还价' }}</a>
        
      </div>
  </div>

  <transition>
    <loading v-if='showLoading'></loading>
  </transition>



</div>


<transition>
  <router-view></router-view>
</transition>

</div>


</template>
<script>


// console.log(layui);


// import layer from '@/plugins/layer/layer'


import {checkLogin,checkLogin2,checkAndToAuthen,checkAuthen,checkAuthen2,addFootPrint,addFavorite} from '@/tool/tool'

import nativeShare from 'nativeShare'

import loading from '@/components/common/loading'

import {formatTime} from '@/config/util'

import headerTop from '@/components/header/header'

import bScroll from 'better-scroll'
	
	export default{
		data(){
			return{

		    //配置轮播图参数
	      	swiperOption: {
	          pagination: '.swiper-pagination',
	          direction: 'horizontal',
	          slidesPerView: 1,
	          paginationClickable: true,
	          spaceBetween: 1,
	          loop:true,
            autoPlay:true,
	          mousewheelControl: true
	        },
	      isMyVip: "",
          TenderInfo:{},
          timer:[],
          tenderStatus:true,//订单状态，是否结束
          accessState:null,//保证金提交状态
          accessMoney:0,//保证金金额
          scroller:null,
          showLoading:false,
          favoriteState:false,//收藏状态

          nShare:null,
			}
		},
		components:{
			headerTop,
      loading,
      // SweetModal,
      // SweetModalTab
		},
    mounted(){

      this.nShare = new nativeShare();

      this.$nextTick(()=>{
      	
      	this.isMyVip = this.$store.getters.getVip;
		
		console.log(this.isMyVip)
      	
        //开启加载
        layer.open({type:2,shadeClose:false,shade:'background-color: rgba(0,0,0,.6)',})
        setTimeout(()=>{
          //关闭加载动画，开启回弹效果。
          layer.closeAll();
          this.scroller = new bScroll('#wrapper_box',{
            momentum: true,//开启惯性移动
            bounce:false,//回弹效果
            deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
            HWCompositing: false,//硬件加速
            swipeTime: 2000,//2500 swipe 持续时间
            click: true, //支持点击事件
          })
        },1000)


        //判断是否登录，添加足迹
        if(!checkLogin()) return;
        //添加足迹
        addFootPrint(this,this.$route.query.id,"TB");
        //查询收藏状态
        this.queryFavorite();
        //查询准入金状态
        this.queryAccess();
      })

      // this.byScroll();
    },
    computed:{
      // 主图列表
      mainList(){
      	
      	
        if(this.TenderInfo.p_file){
          let srcs =  this.TenderInfo.p_file.split(',');
          return srcs.slice(0,srcs.length-1);
        }
        
        return []
      },
      //主图描述信息
      priList(){
        return this.TenderInfo.priList;
      },
      //详情图描述
      detList(){
        return this.TenderInfo.detList;
      },
      //详情图列表
      imgsList(){
        if(this.TenderInfo.p_detail){
          let srcs =  this.TenderInfo.p_detail.split(',');
          return srcs.slice(0,srcs.length-1);
        }else{
          return [];
        }
      }
    },
    created(){
      this.queryTenderById();
    },
    watch:{
      $route(to,from){
        //判断如果是从子页面退回来的，则重新请求，刷新数据
        if(from.path.length > to.path.length){
          this.queryAccess();
        }
      }
    },
    methods:{
      //提交准入金
      submitAccess(){
        //检查登录状态
        if(!checkLogin2(this)){
          return;
        }
        //检查实名认证状态
        if(!checkAndToAuthen(this)){
          return;
        }
        if(this.accessState){
          layer.msg("已提交准入金");
          return;
        }else{
          //跳转到提交准入金页面
          // this.$router.push({path:'/sale/saleDetail/submitMargin',query:{id:this.TenderInfo.t_id}});
          this.$router.push({path:'/sale/saleDetail/submitMargin'});
        }
      },
      //查询是否收藏
      queryFavorite(){
        let currentTenderId = this.$route.query.id;//当前订单ID
        this.$http.post("/queryShoucang",{vip:this.$store.getters.getVip}).then((res)=>{
          let list = res.data.response['TenderVo'];
          if(list){
            for(var i = 0;i < list.length;i++){
                if( list[i] && list[i].t_id==currentTenderId){
                  //标记收藏状态
                  this.favoriteState = true;
                }
            }
          }
        })
      },
      removeFavorite(){
        let currentTenderId = this.$route.query.id;//当前订单ID
        this.$http.post("/DeleteShoucang",{vip:this.$store.getters.getVip,sid:currentTenderId}).then((res)=>{
          //取消收藏状态
          if(res.data.code == 0 ){
            this.favoriteState = false;
          }else{
            layer.open({
              skin:'msg',
              content:res.data.response||res.data.message,
            })
          }
        })
      },
      //添加收藏
      addFavorite(){
        //检查登录，添加收藏
        if(!checkLogin2(this)){
          // layer.msg("请先登录")
        }else{
          addFavorite(this,this.$route.query.id,"TB")
        }
      },
      //查询是否提交保证金
      queryAccess(){

        //判断只有通过了实名认证才能提交准入金，故.
        if(!checkAuthen2()) return;

        //queryAccess
        this.$http.post('/queryAccess',{vip:this.$store.getters.getVip,bid:this.$route.query.id}).then((res)=>{
        	
          if(res.data.code == 0){
            //表示需要提交保证金，且返回值为需要提交保证金金额
            if(res.data.response > 0){
              this.accessState = false;
              this.accessMoney = res.data.response;
            }else{
              this.accessState = true;//不需要提交了，
            }
          }else{
            layer.msg(res.data.message||res.data.response);
          }
        })
      },

      //立即成交
      showDeal(){
        if(!checkLogin2(this)) return;
        let vm = this;
        let tender = this.TenderInfo;
        //货物信息
        let info = tender.t_price+tender.bz_name+"/"+tender.dw_name;
        //货物名称
        let name = tender.t_title;
        layer.open({
          content:`
            <div class='modal'>
              <div class="alert-linkbox">
                <h3>立即成交</h3>
                <p>您好，您将以“${info}”的价格完成“${name}”的交易。</p>
              </div>
            </div>
          `,
          btn:['确定','取消'],
          yes:function(index){
            layer.close(index);
            //成交
            vm.deal();
          },
        })
      },

      //立即成交
      deal(){
        this.$http.post('/Deal',{vip:this.$store.getters.getVip,bid:this.TenderInfo.t_id,zbrid:this.TenderInfo.usr_id,cjid:this.$store.getters.getVip}).then((res)=>{
            console.log(res.data);
            if(res.data.code==0){
                layer.msg("已成交");
                //标记订单结束
                this.tenderStatus = false;
            }else{
                layer.msg(res.data.message);
            }
        })

      },
      //去出价
      goOffer(){
        //判断登录
        if(!checkLogin2(this)) return;
        
        console.log(this.accessState)
        //判断是否提交准入金
        if(this.accessState){
          this.$router.push({path:'/sale/saleDetail/toBid',query:{id:this.TenderInfo.t_id}});
        }else{
          layer.msg("请先提交准入金");
          return;
        }
      },
      byScroll(){
        //开启滚动
        setTimeout(()=>{
          //console.log("kaishi====")
          this.scroller = new bScroll(this.$refs.wrapper_box,{
            click:true,
          })
        },3000);
      },

      //倒计时
      getTime(){
        let t_date = this.TenderInfo.t_date;
        let pass_time = this.TenderInfo.pass_time;
        let timers = setInterval(()=>{
          //this.timer = formatTime(t_date,pass_time);
          if(formatTime(t_date,pass_time)){
              this.timer = formatTime(t_date,pass_time);
            }else{
              this.tenderStatus = false;
              clearInterval(timers);
            }
          },1000)
      },
      queryTenderById(){
        this.$http.post('/queryTenderByid',this.$route.query).then((res)=>{
			console.log(res)
			console.log(res.data.response.p_file)
			
          if(res.data.code == 0){
            this.TenderInfo = res.data.response;

            this.TenderInfo.priList = this.TenderInfo.priList?JSON.parse(this.TenderInfo.priList):[];
            this.TenderInfo.detList = this.TenderInfo.detList?JSON.parse(this.TenderInfo.detList):[];

            //如果状态 finish_state == 1，表示已结束，并标记.
            if(this.TenderInfo.finish_state != 1){
              this.getTime();
            }else{
              this.tenderStatus = false;
            }
          }

        })
      }
    },

	}
</script>
<style scoped lang='less'>

@import '../../../assets/css/variable.less';

.modal{
  position: fixed;
  top:100px;
  width:80%;
  left:0;
  right:0;
  margin:auto;
  overflow: hidden;
}

.alert-linkbox{
    background: #fff;
    text-align: center;
    padding-top: 0.625rem;
    overflow: hidden;
    border-radius: 8px;
    width: 17.5rem;
    box-sizing: border-box;
}

.saleDetail_page{

  .fixed();

	z-index: 9999;
}



/*//初始化轮播样式*/
.swiper-wrapper{
	position: relative;
}


.swiper-pagination{
  bottom:0px !important;
}

.banner-wrapper {
  height:180/@root-font-size;

}



.swiper-pagination-bullet-active{
  background: #66D231!important;
}

.banner-wrapper div img{
  width:100%;
  height:100%;
}
.banner-wrapper div span{
  position: absolute;
  width:100%;
  height:2rem;
  overflow: hidden;
  left:0;
  bottom:0;
  background: #dbefec;
  color: #000b35;
  font-size:.5rem;
  word-break: break-all;
  padding:3px;
  line-height:1.1em;
  text-align: left;
}

.content{
  height:100%;
}
/*
//现货交易-立即成交*/
.saleDetail_page{

  .order-info{

  	position: relative;

  }

  .img{
    position: relative;
    text-align: center;
    height: 240/@root-font-size;
    overflow: hidden;
    img{
      width:100%;
    }
  }
  .link-href{
    position: absolute;
    width:100%;
    top:0;
    z-index:99;
    span{
      margin:12/@root-font-size 8/@root-font-size;

    }
    img{
      height:25/@root-font-size;
      width:auto;
    }
  }

  .block{
    display: block;
  }

  .status{

    display: flex;
    font-size:.5rem;
    overflow: hidden;

    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;

    white-space: nowrap;
    
    
    
    p{
      flex:1;
      text-align: center;

      i{
        background: #387E02;
        padding:1/@root-font-size;
        width:2em;
        display: inline-block;
        text-align: center;
        color:#fff;
        margin:0 1px;
        border-radius:8px;
      }



    }
    p:first-child{

      background: linear-gradient(to right, #94C73F 0%,#64A01F 60%,#367D01 100%);
      overflow: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-size:.6rem;

      display: flex;
		align-items: center;
		justify-content: center;

		span{
			color:#fff;

		}


      .price{
        font-size:1px*@font-big-size;
      }
    }
    p:last-child{
      padding:2/@root-font-size 0;
      line-height:15/@root-font-size;
      background: #EBFFDC;
      color:#377d02;
    }

  }




  .desc{
    padding:5/@root-font-size;
    /*font-size:1px*@font-middle-size;*/
    font-size:.6rem;

    h3{
      color:#000;
      line-height:40/@root-font-size;
      overflow: hidden;

      img{
        vertical-align: middle;
        margin:0 5px;
        height:25/@root-font-size;
      }
      span{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /*display: block;*/
      }
    }

    section{
      border-top:1px solid #DCDCDC;
      border-bottom:1px solid #DCDCDC;
      line-height:25/@root-font-size;
      padding:6/@root-font-size /*35/@root-font-size*/0;
      color:#000;
      /*font-size:.6rem;*/

      p{
        display: flex;
      }

      span{
        justify-content: flex-start;
        width:30%;
      }

    }

    .font-red{
      color:#f00;
      margin:0 3px;
    }
    .tips{
      padding:8/@root-font-size 0;
      border-bottom:1px solid #DCDCDC;
      font-size:.5rem;
      display: flex;
    }

    .tips-tit{
      display: flex;
      align-items: center;
      justify-content: center;
      width:30%;
      white-space: nowrap;

    }

  }

  .detail-img{
    li{
      margin-bottom:5px;
      padding:0 8px;
    }
    img{
      width:100% !important;
    }
    p{
      font-size:1px*@font-middle-size;
      padding:3px;
    }
  }

  .btn{
    display: flex;
    line-height:1.9rem;
    a{
      flex:1;
      text-align: center;
      color:#fff;
      font-size:.7rem;
    }
    a:first-child{
      background: #68CC1E;
    }
    a:nth-child(2){
      background: #FE9402;
    }
    a:last-child{
      background: #FF5000;
    }
  }


}





</style>
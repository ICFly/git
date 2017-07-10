<template>
<div class="orderInfo_page">
	
	<header-top title='订单详情' back></header-top>
	<!-- <header-top></header-top> -->
	<div class="fixed-top-div"></div>



	<div class="content" id='wrapper_box'>
	


        <div class="order-info" id="wrapper" style='padding-bottom:2.1rem;'>

        <!-- banner图片 -->
        <template id='template' class="swiper-container banner">
      		  <swiper :options="swiperOption" class="swiper-wrapper banner-wrapper">

      		    <swiper-slide class="swiper-item" :key="index" v-if="item" v-for="(item,index) in getImg(purchaseInfo.p_file) ">
      		    	<img :src="item">
      		    </swiper-slide>

      		    <div class="swiper-pagination" slot="pagination"></div>
      		  </swiper>

    		  <p class="link-href">
            <span class="share-icon right" @click=" nShare.call() ">
              <img src="../../../assets/imgs/xhjy/xqy2.png"></span>

            <span v-if="favoriteState" class="favorite right" @click="removeFavorite"><img src="../../../assets/imgs/xhjy/xqy4.png"/> </span>
            <span v-else class="favorite right" @click="addFavorite"><img src="../../../assets/imgs/xhjy/xqy3.png"/> </span>




          </p>

    		</template>

            <!--banner图-->

            <div class="desc">
                <div class="tit">
                    <h3>
                        <img src="../../../assets/imgs/icon_vip.png">
                        <i v-text="purchaseInfo.pur_title" id="title"></i>
                    </h3>
                </div>
                <section>
                    <p><span>交易编号：</span><i v-text="purchaseInfo.pur_id"></i></p>
                    <p><span>货物数量：</span><i v-text="purchaseInfo.pur_quality"></i><i v-text="purchaseInfo.dw_name"></i></p>
                    <p><span>货物包装：</span><i v-text="purchaseInfo.pack_name"></i></p>
                    <p><span>货物成色：</span><i v-text="purchaseInfo.pur_type"></i></p>
                    <p><span>货物价格：</span><i v-text="purchaseInfo.pur_price==0?'面议':purchaseInfo.pur_price "></i></p>
                    <p><span>交易币种：</span><i v-text="purchaseInfo.bz_name"></i></p>
                    <p><span>所在地区：</span><i v-text="purchaseInfo.dz_name"></i></p>
                    <p><span>交易方式：</span><i v-text="purchaseInfo.jy_name"></i></p>
                    <p><span>供应期限：</span><i v-text="purchaseInfo.pur_date"></i>天</p>
                    <p><span>发布时间：</span><i v-text="purchaseInfo.pass_time"></i></p>

                </section>
            </div>
            <div class="info">
            <!-- 描述 -->
                <p class="desc" v-text="purchaseInfo.pur_detail"></p>

                <div class="img-info layer2-photos-demo">
                    <p v-for="item in getImg(purchaseInfo.p_file) ">
                        <img v-if=" item " v-bind:layer2-src="item" v-bind:src="item" />
                    </p>
                   <!--  <p v-for="item in purchaseInfo.p_detail.split(',') ">
                        <img v-if=" item " v-bind:layer2-src="item" v-bind:src="item" />
                    </p> -->

                </div>
            </div>

            <div class="fixed-bottom-div"></div>

        </div>

        <div class='fixed-bottom'>
            <div class="btn" @click="showLinkInfo">
                <a>联系商家</a>
            </div>
        </div>

</div>





</div>	
</template>

<script>
	
import {checkLogin,checkLogin2,checkAuthen2,checkAndToAuthen,addFootPrint,addFavorite} from '@/tool/tool'
import nativeShare from 'nativeShare'
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
	          mousewheelControl: true
	        },

          purchaseInfo:{},
          scroller:null,
          favoriteState:false,//收藏状态

          nShare:null,
		}
	},
	created(){
		// console.log(this.$route.query);
	},

  mounted(){

    this.nShare = new nativeShare();
    layer.open({type:2,shade:'background-color: rgba(0,0,0,.6)',})

    this.$nextTick(()=>{

      setTimeout(()=>{
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

      this.queryPurchaseInfo();

      //判断是否登录，添加足迹
      if(!checkLogin()) return;
      addFootPrint(this,this.$route.query.id,"CG")

      //查询收藏
      this.queryFavorite();

      

    })



  },


	methods:{


    //查询是否收藏
    queryFavorite(){
      let currentTenderId = this.$route.query.id;//当前订单ID
      this.$http.post("/queryShoucang",{vip:this.$store.getters.getVip}).then((res)=>{
        let list = res.data.response['PurchaseVo'];
        if(list){
          for(var i = 0;i < list.length;i++){
              if(list[i].pur_id==currentTenderId){
                //标记收藏状态
                this.favoriteState = true;
              }
          }
        }
      })
    },
    //移除收藏
    removeFavorite(){
      let currentTenderId = this.$route.query.id;//当前订单ID
      this.$http.post("/DeleteShoucang",{vip:this.$store.getters.getVip,sid:currentTenderId}).then((res)=>{
        //取消收藏状态
        if(res.data.code == 0 ){
          this.favoriteState = false;
        }else{
          layer.open({
            skin:'msg',
            content:res.data.message||res.data.response
          })
        }


      })
    },
    //添加收藏
    addFavorite(){

        //判断是否登录，添加足迹
        if(!checkLogin()) return;
        addFavorite(this,this.$route.query.id,"CG")

    },

    //显示联系人信息
    showLinkInfo(){ 


      //检查登录
      if(!checkLogin2(true)) return;
      
      // if(!checkAndToAuthen(this)) return;
      //查看采购联系人信息

      let userInfo = this.purchaseInfo;

      layer.open({
        content:
          `<div>
            <div class="alert-linkbox hide layui-layer-wrap" style="display: block;">
               <h3>联系方式</h3> 
               <div class="content">
                <p><span>公司名称：</span>${userInfo.p_company}<i></i></p> 
                <p><span>联系人：</span>${userInfo.name}<i>768</i></p> 
                <p><span>联系电话：</span><i>${userInfo.pur_phone}</i></p> 
                <p><span>联系邮箱：</span><i>${userInfo.p_email}</i></p> 
                <p><span>联系地址：</span><i>${userInfo.pur_address}</i></p> 
                <p>#联系时请说是在再商网看到的#</p>
               </div> 
              </div>
          </div>
          `,
        btn:['立即联系','稍后联系'],
        style:"width:75%",
        yes:function(index){
          layer.close(index);
          window.location.href = "tel:"+userInfo.pur_phone;
        }
      })
    },


    getImg(src){
      if(!src){
        return []
      }
      return src.split(',')
    },
    //
    queryPurchaseInfo(){

      this.$http.post('/queryPurchaseByid',this.$route.query).then((res)=>{
        console.log(res);
        this.purchaseInfo = res.data.response;
      })
    },
    //
		toPage(url){
			this.$ruoter.push(url);
		}
	},

	components:{
		headerTop
	}
}


</script>



<style lang='less' scoped>
@import '../../../assets/css/variable.less';	

.orderInfo_page{

.fixed();
z-inde:999;

}

/*.swiper-pagination{
	position: absolute !important;
	bottom:0 !important;
	height:1rem;

}*/

.content{
  height:100%;
}

.fixed-bottom{
  position: absolute;
  width:100%;
  bottom:0;
}
/*//初始化轮播样式*/
.swiper-wrapper{
	position: relative;
	height:160/@root-font-size;
}

.swiper-pagination{
  bottom:.5rem !important;
}

.swiper-pagination-bullet-active{
  background: #66D231!important;
}

.banner-wrapper div img{
  width:100%;
  height:100%;
}

/*
//现货交易-立即成交*/
.orderInfo_page{

  .order-info{
    padding:0 .2rem;
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
    font-size:1px*@font-middle-size;

    h3{
      color:#000;
      font-size:.8rem;
      line-height:40/@root-font-size;

      img{
        vertical-align: middle;
        margin:0 5px;
        height:25/@root-font-size;
      }
    }

    section{
      border-top:1px solid #DCDCDC;
      border-bottom:1px solid #DCDCDC;
      line-height:25/@root-font-size;
      padding:6/@root-font-size /*35/@root-font-size*/;
      color:#000;
      font-size:.6rem;

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

      display: flex;
    }

    .tips-tit{
      justify-content: flex-start;
      width:30%;
      white-space: nowrap;

    }

  }
  .info{
    img{
      width:100%;
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
      background: #8ad01a;
    }
    /*a:first-child{
      background: #68CC1E;
    }
    a:nth-child(2){
      background: #FE9402;
    }
    a:last-child{
      background: #FF5000;
    }*/
  }


}


</style>
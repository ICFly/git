<template>
	
	<div class="favorite_page">
		
		<header-top :title=' key || "搜索结果" ' back></header-top>
		<div class="fixed-top-div"></div>

    <div class="content my-foot" style='height:100%'>

        <ul class="order-state">
            <li v-bind:class="{on:active==1}" @click="active=1">现货交易({{tenderList.length}})</li>
            <li v-bind:class="{on:active==2}" @click="active=2">供应({{supplyList.length}})</li>
            <li v-bind:class="{on:active==3}" @click="active=3">采购({{purchaseList.length}})</li>
        </ul>

        <div class="foot-list" id="wrapper">

            <div id="scroller" ref="scroller" style='padding-bottom:4rem;'>
            	<p class="more">more...</p>
                <!--现货交易-->
                <ul class="order-state-4 product-list" v-show="active==1" ref="scroller1">

<!--                 
    <li v-for="item in tenderList" @click="toPage('/searchListBy/tenderInfo?id='+item.t_id)">
        <div class="order-info">
            <div class="order-flex">
                <div class="order-img">
                    <img v-bind:src="item.p_file.split(',')[0]" alt="">
                </div>
                <div class="order-param">
                    <h3 v-text="item.t_title"></h3>
                    <p><span>数量：</span><i v-text="item.t_quality"></i><i v-text="item.dw_name"></i></p>
                    <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                    <p><span>上线时间：</span>2017-2-20</p>
                    <p><span>成交价格：</span><i class="font-red-money">1000</i>韩元/吨</p>
                </div>
            </div>
        </div>
    </li> -->

                        <li @click="toPage('/searchListBy/tenderInfo?id='+item.t_id)" v-for='item in tenderList'>
                            <div class="order-info">
                                <div class="order-flex">
                                    <div class="order-img">
                                        <img :src=" item.p_file.split(',')[0] " alt="">
                                    </div>
                                    <div class="order-param">
                                        <h3>
                                            <img v-if="item.v_type == 1" src="../../assets/imgs/icon_vip2.png"/>
                                            <img v-if="item.v_type == 2" src="../../assets/imgs/icon_vip1.png"/>
                                            <span v-text="item.t_title"></span>
                                        </h3>

                                        <p><span v-text=""><i v-text=" '数量：' "></i></span><i v-text="item.t_quality"></i> <i v-text="item.dw_name"></i></p>
                                        <p><span><i v-text=" '地区：' "></i></span><i v-text="item.dz_name"></i></p>

                                        <p v-if="item.t_price == '' " ><i class="font-orange-money" v-text=" '未开价' "></i></p>
                                        <p v-else ><i class="font-orange-money" v-text="item.t_price"></i><i v-text="item.bz_name"></i><i v-text=" '/' "></i><i v-text="item.dw_name"></i></p>

                                         <p class='btn_info disabled' v-if=" item.finish_state == 1 ">交易结束</p>
                                         <p class='btn_info' v-else >货物详情</p>

                                    </div>
                                </div>
                            </div>
                        </li>



                    <!-- <li v-if="favoriteList.TenderVo.length <= 0" class="data_status">没有了...</li> -->
                </ul>
                <!--供应-->
                <ul class="order-state-4" v-show="active==2" ref="scroller2">
                    <li v-for="item in supplyList" @click="toPage('/searchListBy/supplyInfo?id='+item.s_id)">
                        <div class="order-info">
                            <div class="order-flex">
                                <div class="order-img">
                                    <img v-bind:src="item.p_file.split(',')[0]" alt="">
                                </div>
                                <div class="order-param">
                                    <h3 v-text="item.s_title"></h3>
                                    <p><span>数量：</span><i v-text="item.s_quality"></i><i v-text="item.dw_name"></i></p>
                                    <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                    <p><span>上线时间：</span>{{item.pass_time.substring(0,10)}}</p>
                                    
                                    <!--<p><span>上线时间：</span>2017-2-20</p>-->
                                    <!--<p><span>成交价格：</span><i class="font-red-money">1000</i>韩元/吨</p>-->
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <li v-if="favoriteList.SupplyVo.length <= 0" class="data_status">没有了...</li> -->
                </ul>
                <!--采购-->
                <ul class="order-state-4" v-show="active==3" ref="scroller3">
                    <li v-for="item in purchaseList" @click="toPage('/searchListBy/purchaseInfo?id='+item.pur_id)">
                        <div class="order-info">
                            <div class="order-flex">
                                <div class="order-img">
                                    <!--<img src="../../images/center/order_pic.png" alt="">-->
                                    <img v-bind:src="item.p_file.split(',')[0]" alt="">

                                </div>
                                <div class="order-param">
                                    <h3 v-text="item.pur_title"></h3>
                                    <p><span>数量：</span><i v-text="item.pur_quality"></i><i v-text="item.dw_name"></i></p>
                                    <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                    <p><span>上线时间：</span>{{item.pass_time.substring(0,10)}}</p>
                                    <!--<p><span>成交价格：</span><i class="font-red-money">1000</i>韩元/吨</p>-->
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <li v-if="favoriteList.PurchaseVo.length <= 0" class="data_status">没有了...</li> -->
                </ul>


				<!-- <aside class="return_top" @click="backTop">
					<svg class="back_top_svg">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
					</svg>
				</aside>
 -->
            </div>



		<!-- <load></load> -->

		<transition>
			
			<loading v-if='showLoading'></loading>
		</transition>


        </div>

    </div>



    <!-- <keep-alive> -->

    <!-- </keep-alive> -->

    <transition name='slider' mode='out-in'>
        <router-view></router-view>
    </transition>

	</div>
</template>

<script>
	
import {loadMore} from '@/config/util'
import headerTop from '@/components/header/header'

import loading from '@/components/common/loading'

import bScroll from 'better-scroll'





export default{
	data(){
		return{
			favoriteList:[],
			active:1,


			purchaseList:[],
			supplyList:[],
			tenderList:[],

			pageNoBySupply:1,
			pageNoByPurchase:1,
			pageNoByTender:1,


			key:"",


			scroller:null,
			showLoading:true,//显示加载动画
			preventRepeat:false,//防止重复加载




		}
	},
	components:{
		headerTop,
		loading,
	},
	watch:{

		active(val,old){
			this.showLoading = true;
			setTimeout(()=>{
				this.scroller.scrollTo(0,0);
				this.scroller.refresh();

				this.showLoading = false;
			},500)
		}


	},
	mounted(){


		this.$nextTick(()=>{
		setTimeout(()=>{
			this.scroller = new bScroll("#wrapper",{
	    		probeType: 3,//1 监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
                deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
                bounce: false,//回弹
                HWCompositing: false,//硬件加速
                swipeTime: 2000,//2500 swipe 持续时间
                click: true, //支持点击事件
			})

	      //   this.scroller = new bScroll('#wrapper',{
	    		// probeType: 3,//1 监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
       //          deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
       //          bounce: true,//回弹
       //          HWCompositing: false,//硬件加速
       //          swipeTime: 2000,//2500 swipe 持续时间
       //          click: true, //支持点击事件
	      //   })

	        this.scroller.on('scroll',(position)=>{

	        	// if(position.y == 0){
	        	// 	return;
	        	// //表示上拉，刷新
	        	// }else if(position.y >= 60 ){
	        	// 	console.log("刷新");

	        	// }else if(Math.abs(position.y) > Math.abs(this.scroller.maxScrollY)+100){

	        	// 	console.log("加载");

	        	// }



/*
	        	console.log(position.y);


	        	console.log(this.scroller.maxScrollY);*/



	        	// if(position.y>=60){
	        	// 	this.tipsText = '释放立即刷新'
	        	// }else{
	        	// 	this.tipsText = '下拉刷新'
	        	// }


	        })




	        //下拉刷新
	        this.scroller.on('touchend',(position)=>{

	        	// console.log(position.y)
	        	// if(position.y>60){
	        		
	        	// 	//重置数据
	        	// 	this.pageNo = 1;
	        	// 	this.showLoading = true;
	        	// 	this.list = [];
	        	// 	this.queryMessage();
	        	// }


	        	if(position.y == 0){
	        		return;
	        	//表示上拉，刷新
	        	}else if(position.y >= 60 ){
	        		// console.log("执行刷新=============");

                // }else if(Math.abs(position.y) > Math.abs(this.scroller.maxScrollY)+100){
	        	}else if(this.scroller.y <= this.scroller.maxScrollY){
	        		//console.log("加载更多+++++++++++++");
	        		this.showLoading = true;
	        		this.loadMore();

	        	}

	        })





	      //   // this.scroller.on('scrollEnd')


	      //上拉加载
	        // this.scroller.on('scrollEnd',(position)=>{
	        // 	// console.log(position.y);

	        // 	if(Math.abs(this.scroller.y) == Math.abs(this.scroller.maxScrollY)){

	        // 		if(this.preventRepeat) return;

	        // 		this.preventRepeat = true;
	        // 		this.showLoading = true;

	        // 		// this.pageNo++;
	        // 		this.loadMore();
	        // 	}
	        // })







			this.showLoading = false;


			// this.scroller.addEventListen("")


		},1000)








		})



	},
	activated(){
		// console.log('activated')


        //如果没有更改搜索条件，则不进行任何操作
        if(this.key == this.$route.query.key){
            return;
        }



		this.searchByTitle();

		this.searchTenderByTitle();

		this.searchSupplyByTitle();

		this.searchPurchaseByTitle();


		// this.searchByTitle();
	},
	deactivated(){
		// console.log("deactivated")
	},
	methods:{


		refresh(){
			if(!this.scroller) return;

			setTimeout(()=>{
				this.scroller.refresh();
				this.showLoading = false;

				this.preventRepeat = false;
			},500)

		},
		//loadmore
		loadMore(){
			console.log("loadmore");



			// this.showLoading = false;

			if(this.preventRepeat) return;//防止重复执行

			this.preventRepeat = true;


			if(this.active==1){

				this.pageNoByTender ++;

				this.searchTenderByTitle();


			}else if(this.active==2){

				this.pageNoBySupply ++;

				this.searchSupplyByTitle();

			}else{

				this.pageNoByPurchase ++;

				this.searchPurchaseByTitle();

			}





		},
		toPage(url){
			this.$router.push(url);
		},
		//查询收藏


		searchTenderByTitle(){


            //搜索现货交易
            this.$http.post('/queryTenderByTitle',{title:this.key,pageNo:this.pageNoByTender}).then((res)=>{
            	console.log(res)

            	if(res.data.code == 0){

            		if(res.data.response.length<=0&&this.pageNoByTender!=1){
                        layer.msg("没有更多了");
            		}

            		this.tenderList = this.tenderList.concat(res.data.response);

            		this.refresh();

            	}

            })


		},
		searchSupplyByTitle(){

            //搜索供应
            this.$http.post('/queryGoodsByTitle',{type:"GY",title:this.key,pageNo:this.pageNoBySupply}).then((res)=>{

            	console.log(res);

            	if(res.data.code == 0){

            		if(res.data.response.length<=0&&this.pageNoBySupply!=1){

                        layer.msg("没有更多了");


            		}
            		this.supplyList = this.supplyList.concat(res.data.response);

            		this.refresh();
            	}

            })

		},
		searchPurchaseByTitle(){

            //搜索采购
            this.$http.post('/queryGoodsByTitle',{type:"CG",title:this.key,pageNo:this.pageNoByPurchase}).then((res)=>{
            	console.log(res)
            	if(res.data.code == 0){
            		if(res.data.response.length<=0&&this.pageNoByPurchase!=1){

                        layer.msg("没有更多了");
            		}
            		this.purchaseList = this.purchaseList.concat(res.data.response);
					console.log(this.purchaseList)
            		this.refresh();
            	}

            })

		},

		searchByTitle(){



			let keyWords = this.$route.query.key;



			console.log(this.key);





			if(this.key != keyWords){
				
				this.tenderList = [];
				this.supplyList = [];
				this.purchaseList = [];

				this.pageNoByTender = 1;
				this.pageNoByPurchase = 1;
				this.pageNoBySupply = 1;


			}


			this.key = keyWords;
			

		}

	}
}

</script>

<style lang='less' scoped>
	
@import '../../assets/css/variable';



.slider-enter-active,.slider-leave-active{
    transition: all .3s
}

.slider-enter,.slider-leave-active{
    opacity:0;
}


.favorite_page{
	.fixed();
}


.data-status{
    text-align: center;
    padding:.3rem 0;
}


#wrapper{
	overflow: hidden;
	height: 100%;
	position: relative;

}

.more{

	text-align: center;
	padding:.5rem 0;
	position: absolute;
	top:0;
	left:0;
	right:0;
	margin:auto;

	display: none;
}

/*//我的足迹*/
.order-state{
  display: flex;
  background: #fff;
  li{
    flex:1;
    text-align: center;
    line-height:2rem;
    border-bottom:2px solid #AAAAAA;
    position: relative;
    font-size:.8rem;

    &:after{
      content:'';
      width:1px;
      height:1.1rem;
      background: #AAAAAA;

      position: absolute;

      right:-1px;
      top:0;
      bottom:0;
      margin:auto;

    }

  }

  li.on{
    color:#7adc4d;
    border-color:#7adc4d;
  }


}





.product-list{


li{
  background: #fff;
  overflow: hidden;
  padding-left:5/@root-font-size;
  border-top:1px solid #D5D5D5;
}


.order-flex{

  display: flex;
  padding:5/@root-font-size 0;
  margin:3/@root-font-size 0;
  height:5rem;
  justify-content: space-between;

}

.order-img{
  overflow: hidden;
  width:38%;
  height:4.5rem;
  text-align: center;
  img{
    /*height:80/@root-font-size;*/
    height:100%;
    width:100%;
  }
}

.order-param{
  line-height:1.1rem;
  color:#888888;
  width:58%;
  font-size:0.6rem;

  position: relative;
  span{
    display: inline-block;
    font-size:.6rem;

    /*position: absolute;*/
  }


  p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}


h3{
  color:#000;
  padding-right:0.5rem;
  overflow:hidden;
  margin-left:-.1rem;

 font-size:.8rem;

  display: flex;
  align-items: center;


  img{
    height:14/@root-font-size;
    margin-right:.1rem;
    vertical-align: middle;
  }

  span{

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;


  }

 
}
.btn_info{

    background: #60B13B;
    height:1.4rem;
    line-height:1.4rem;
    /*padding:0 3px;*/
    text-align: center;
    font-size:.6rem;
    border-radius:3px;
    color:#fff;

   
    width:2.8rem;
    white-space: nowrap;


    position: absolute;
    right:.5rem;
    top:0;
    bottom:0;
    margin:auto;
}
.btn_info.disabled{
    background: #888a87;

}

}





















.my-foot{
	background: #E8E7E7;
  .order-state-suc{
    color:#ff8a00;
  }

  li{
    /*//height:195/@root-font-size;*/
    background: #fff;
    overflow: hidden;
    /*padding:0 15/@root-font-size;*/
    font-size:.7rem;
    margin-bottom:.3rem;
    /*//overflow: hidden;*/
  }

  .order-tit{
    line-height:22/@root-font-size;
    border-bottom:1px solid #F0F0F0;
    font-size:.6rem;
    display: flex;
    justify-content: space-between;
  }

  .order-flex{
    display: flex;
    padding:5/@root-font-size 0;
    div{
      justify-content: flex-start;
    }
  }

  .order-img{
    margin-right:20/@root-font-size;
    overflow: hidden;
    width:35%;
    img{
      height:70/@root-font-size;
      width:100%;
    }
  }
  h3{
    color:#333;
    margin-bottom:3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right:.3rem;
  }
  .order-param{
    line-height:1.2rem;
    color:#888888;
    width:60%;
    font-size:.6rem;

    span{
      display: inline-block;
/*      //width:40%;
      //text-align: right;*/
    }
  }



}


</style>
<template>
<div data-id='sale'>
	<!-- <header-top></header-top> -->

	<div class="sale_content" >

        <div class="fixed-top">
		    <div class="header-top">
		        <form action="" class="search-box">
		            <div class="form-group">
		                <p class="p_r">
		                    <input type="text" @click="toPage('/search')" readonly placeholder="搜一搜试试" class="form-control"/>
		                    <i class="icon icon-search"></i>
		                    <!-- <input type="submit" value="发布"  class="form-btn"/> -->
		                </p>
		            </div>
		        </form>
		        <ul class="search-list">
		            <li>
		                <div class='sort-title' :class='{"activity":sortBy == "type" }' @click=' chooseType("type") '>
			                <img src="../../assets/imgs/xhjy/cg1.png" alt="">
			                <span>{{currentType.text ||'类别'}}</span>
		                </div>

		                <transition name='showlist'>
		                	<!-- 类别选择组件 -->
		                	<types :sortBy='sortBy' @changeType='changeType'></types>

		                </transition>

		            </li>
		            <li>


		               	<div class='sort-title' :class='{"activity":sortBy == "area" }' @click=' chooseType("area") '>
			                <img src="../../assets/imgs/xhjy/cg2.png" alt="">
			                <span>{{currentCity.text ||'地区'}}</span>
		                </div>

		                <transition name=' showlist '>
		                	<!-- 地区选择组件 -->
		                	<city :sortBy='sortBy' @changeCity='changeCity'></city>

		                </transition>

		            </li>
		            <li >

		                <div class="sort-title" @click="toPage('/publish')">
		                	
			                <img src="../../assets/imgs/xhjy/cg3.png" alt="">
			                <span>发布</span>

		                </div>

		            </li>
		        </ul>
		    </div>
		</div>
		<!-- <div style='height:4rem;'></div> -->


		<transition name='showmask'>
			<div class="back-mask" @click=" sortBy = '' " v-show=' sortBy '></div>
		</transition>
	        <div id="wrapper" class='orderBox'>
	        	<div class='box'>
	        		<!-- banner图片 -->

	        		<transition name='fade'>
				        <template id='template'>
						  <swiper :options="swiperOption" class="swiper-box">
						    <swiper-slide class="swiper-item" :key="index" v-for='(item,index) in bannerList '>
						    	<img :src=" item.c_img.split(',')[0] ">
						    </swiper-slide>
						    <div class="swiper-pagination" slot="pagination"></div>
						  </swiper>
						</template>
	        		</transition>


	            <div class="product-list" ref='list'>
	                <ul class="order-state-4">

	                    <li @click='detail("/sale/saleDetail?id="+item.t_id)' v-for='(item,index) in tenderList'>
	                        <div class="order-info">
	                            <div class="order-flex">
	                                <div class="order-img">
	                                    <!-- <img :src=" item.p_file.split(',')[0] " alt=""> -->
                                        <drawimg :src=" item.p_file.split(',')[0] " :id=" 'sale_'+index "></drawimg>
	                                </div>
	                                <div class="order-param">
	                                    <h3>
	                                        <img v-if="item.v_type == 1" src="../../assets/imgs/icon_vip2.png"/>
	                                        <img v-if="item.v_type == 2" src="../../assets/imgs/icon_vip1.png"/>
	                                        <span v-text="item.t_title"></span>
	                                    </h3>

	                                    <p><span v-text=""><i v-text=" '数量：' "></i></span><i v-text="item.t_quality"></i> <i v-text="item.dw_name"></i></p>
	                                    <p><span><i v-text=" '地区：' "></i></span><i v-text="item.dz_name"></i></p>

	                                    <p v-if="item.t_price == '' " ><i v-text=" '未开价' "></i></p>
	                                    <p v-else ><i class="font-orange-money" v-text="item.t_price"></i><i v-text="item.bz_name"></i><i v-text=" '/' "></i><i v-text="item.dw_name"></i></p>

	                                	<p class='btn_info disabled' v-if=" item.finish_state == 1 ">交易结束</p>
	                                	<p class='btn_info' v-else >货物详情</p>

	                                </div>
	                            </div>
	                        </div>
	                    </li>




<!--                         <li @click='detail("/sale/saleDetail?id="+item.t_id)' v-for='(item,index) in tenderList'>
                            <div class="order-info">
                                <div class="order-flex">
                                    <div class="order-img">
                                        <img :src=" item.p_file.split(',')[0] " alt="">
                                    </div>
                                    <div class="order-param">
                                        <drawimg :src=" item.p_file.split(',')[0] " :id=" index "></drawimg>
                                    </div>
                                </div>
                            </div>
                        </li> -->






                      <li class="more" v-if=" hasMore ">
                        <img src="../../assets/imgs/load.gif" alt="">
                        <span>加载中...</span>
                      </li>
                      <!-- <li class="more" v-else><span>没有了</span></li> -->

            

<!-- 						<li v-if='hasMore' class='more'>
							<img src="../../assets/imgs/load.gif" alt="">
							<span>加载中...</span>
						</li>
						<li v-else class='more' style='padding:.5rem 0;'>
							<span>没有了...</span>
						</li>	 -->
	
	                </ul>
	            </div>


	        </div>
	    </div>
	</div>
	<!-- 发布悬浮按钮 -->
    <div class="publish_btn" @click='getUser'>
    	<a>Top</a><!--@click="loadMore"-->
    </div>


<!--     <transition>
    	<tender-info v-show='true'></tender-info>
    </transition> -->

	<!-- 订单详情 -->
	<transition name='router-slid'>
		<router-view></router-view>
	</transition>

</div>
</template>
<script>


import {loadMore,setStore} from '@/config/util'

// import  from '@/plugins/sha'
import bScroll from 'better-scroll'

import imgZip from '@/plugins/imgZip'

import HeaderTop from '@/components/header/header'

import city from '@/components/city'
import types from '@/components/common/type'

import drawimg from '@/components/common/drawimg'



export default{
	components:{
		HeaderTop,
		city,types,
        drawimg,
		// tenderInfo
	},
	data () {
      return {
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
        maskState:false,//显示遮罩
        sortBy:'',
        currentCity:{text:"",id:"",level:""},
        currentType:{text:"",id:"",level:""},
        keepcurrentCity1:{text:"",id:"",level:""},
        keepcurrentCity2:{text:"",id:"",level:""},
        keepcurrentType1:{text:"",id:"",level:""},
        keepcurrentType2:{text:"",id:"",level:""},
        tenderList:[],
        bannerList:[],
        pageNo:1,
        preventRepeat:false,//防止重复获取
        hasMore:true,//是否还有更多

        menuList:null,

      }
    },
    //计算属性，根据数据状态，实时改变
    computed:{

    	// mainImg:function(src){
    	// }
    },

    //页面加载完执行
    mounted(){

    	this.$nextTick(()=>{



    		// console.log('1121212');
    		// console.log(sha);

    
	    	//加载更多
	    	// loadMore(this.$refs.list,this.load);
	    	//查询订单和banner
	    	this.queryTender();
	    	this.queryBanner();


	    	// setTimeout((){



	    	// },100)

	    	setTimeout(()=>{

		    	this.menuList = new bScroll("#wrapper",{
		    		probeType: 3,//1 监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
		            deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
		            bounce: false,//回弹
		            // bounce: true,//回弹
		            HWCompositing: false,//硬件加速
		            swipeTime: 2000,//2500 swipe 持续时间
		            click: true, //支持点击事件
		    	})

          //运动结束，判断是否到达底部。
				this.menuList.on('scrollEnd',(pos) => {
					if(Math.abs(this.menuList.y) >= Math.abs(this.menuList.maxScrollY)){
						this.load();
					}
				})

	    	},1000)









    	})
    },

    created(){
    	// this.$i18n.locale = 'zh';
    	// console.log(11);
    	// this.initData();
    	// this.initData();
    },
    methods:{

    	load(){
    		//是否正在执行加载。
    		if(this.preventRepeat){
    			return
    		}
    		this.preventRepeat = true;
    		this.pageNo ++;
    		
    		this.$http.post('/queryTender',{
    			pageNo:this.pageNo,
    			type:this.currentType.id,
    			area:this.currentCity.id,
    			areaLevel:this.currentCity.level,
    			typeLevel:this.currentType.level
    		}).then((res)=>{
    			//如果没有数据返回，表示没有更多了。
    			if(!res.data.response.length){ 
    				this.hasMore = false;
    				return
    			}

    			this.tenderList = this.tenderList.concat(res.data.response);

    			if(!res.data.response.length || res.data.response.length<10){
    				//没有更多了
    				this.hasMore = false;
    				//标记状态，不在加载
    				this.preventRepeat = true;
    			}else{
	    			this.preventRepeat = false;
    			}
    		},(err)=>{
    			console.log(err);
    		})

    	},

    	queryTender(){

    		this.$http.post('/queryTender',{
    			pageNo:this.pageNo,
    			type:this.currentType.id,
    			area:this.currentCity.id,
    			areaLevel:this.currentCity.level,
    			typeLevel:this.currentType.level
    		}).then((res)=>{

    			this.tenderList = res.data.response;

    			//回到顶部
    			document.body.scrollTop = 0
				  document.documentElement.scrollTop = 0

    			if(!res.data.response.length || res.data.response.length<10){
    				this.hasMore = false;
    			}else{
    				this.hasMore = true;
    				//开放查询更多入口
    				this.preventRepeat = false;
    			}

    		},(err)=>{
    			console.log(err);
    		})

    	},



    	queryBanner(){

    		this.$http.post('/carousel',{n_language:'cn',type:1,release_machine:'AZ'}).then((res)=>{
    			this.bannerList = res.data.response;
    		},(err)=>{
    			console.log(err);
    		})

    	},

    	//选择产品类别
    	changeType(target){
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==3){
    			this.currentType.text = this.keepcurrentType2.text
	    		this.currentType.id = this.keepcurrentType2.id
	    		this.currentType.level = this.keepcurrentType2.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==2){
    			this.currentType.text = this.keepcurrentType1.text
	    		this.currentType.id = this.keepcurrentType1.id
	    		this.currentType.level = this.keepcurrentType1.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute('data-level')==1){
    			this.keepcurrentType1.text = target.textContent;
	    		this.keepcurrentType1.id = target.getAttribute('data-id');
	    		this.keepcurrentType1.level = target.getAttribute('data-level');
			}
    		if(target.getAttribute('data-level')==2){
    			this.keepcurrentType2.text = target.textContent;
	    		this.keepcurrentType2.id = target.getAttribute('data-id');
	    		this.keepcurrentType2.level = target.getAttribute('data-level');
			}

    		console.log(target);
    		this.currentType.text = target.textContent;
    		this.currentType.id = target.getAttribute("data-id");
    		this.currentType.level = target.getAttribute("data-level");

			if(target.getAttribute('data-level')==3){
				this.sortBy = "";
			}
    	},
    	//选择地区
    	changeCity(target){
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==3){
    			this.currentCity.text = this.keepcurrentCity2.text
	    		this.currentCity.id = this.keepcurrentCity2.id
	    		this.currentCity.level = this.keepcurrentCity2.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==2){
    			this.currentCity.text = this.keepcurrentCity1.text
	    		this.currentCity.id = this.keepcurrentCity1.id
	    		this.currentCity.level = this.keepcurrentCity1.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute('data-level')==1){
    			this.keepcurrentCity1.text = target.textContent;
	    		this.keepcurrentCity1.id = target.getAttribute('data-id');
	    		this.keepcurrentCity1.level = target.getAttribute('data-level');
			}
    		if(target.getAttribute('data-level')==2){
    			this.keepcurrentCity2.text = target.textContent;
	    		this.keepcurrentCity2.id = target.getAttribute('data-id');
	    		this.keepcurrentCity2.level = target.getAttribute('data-level');
			}
    		console.log(target);
    		this.currentCity.text = target.textContent;
    		this.currentCity.id = target.getAttribute('data-id');
    		this.currentCity.level = target.getAttribute('data-level');
			
			if(target.getAttribute('data-level')==3){
				this.sortBy = "";
//				this.queryTender();
			}else if(target.getAttribute('data-level')==2 && target.getAttribute('data-id')!='QY201606011002'){
				this.sortBy = "";
			}
    	},
    	chooseType(typeSrc){


    		if(this.sortBy != typeSrc){
    			this.sortBy = typeSrc;
    		}else{
    			this.sortBy = '';//关闭遮罩，隐藏选择框

    			if(this.currentCity.text!=''||this.currentType.text!=''){
    				console.log('init new data');
    				this.pageNo = 1;//将pageNo归1
    				this.queryTender();
    			}

    		}
    		

    	},
    	toPage(url){
    		console.log(this.$router.push(url));
    	},
    	//详情页
    	detail(url){
    		console.log(this.$router.push(url));
    	},
    	closeMask(){
			this.maskState = false;
		},
		//修改语言
		changeLang(){
			this.$i18n.locale = "en"
			setStore('lang','en')
		},
		getUser(){

			// console.log(this.$store.getters.getUser);


			this.menuList.scrollTo(0,0,300)

			// console.log(this.$store.commit('getUser'));
		}
    },
    watch:{
    	tenderList(){
    		if(this.menuList){
	    		setTimeout(()=>{
	    			this.menuList.refresh();
	    		},100)
    		}
    	},

    	sortBy(val,old){
			if(val == ""){
				console.log("sortBysortBysortBysortBy")
//				console.log("close to search")
				this.queryTender();
			}
    		// console.log("val++"+val);
    		// console.log("old++"+old);
    	},


    	currentCity:{
    		handler(val,old){
    			if(this.sortBy == '' && val.text != old.text){
    				console.log("load new data with city");
    			}
    		},
    		deep:true
    		
    	},
    	currentType:{
    		handler(val,old){
    			if(this.sortBy == '' && val.text != old.text){
    				console.log("load new data with type");
    			}
    		},
    		deep:true
    		
    	},
    	// currentType:{
    	// 	handler((val,old)=>{

    	// 		if(this.sortBy == '' && val.text != old.text){
    	// 			console.log("load new data");

    	// 		}

    	// 	}),
    	// 	deep:true
    	// }
    }
}


</script>

<style lang='less'>


@import '../../assets/css/variable';


/*banner过渡动画*/
.fade-enter-active,.fade-leave-active {
    transition: all 10s;
}
.fade-enter,.fade-leave-active {
    /*transform: translate3d(2rem, 0, 0);*/
    opacity: 0;
    transform:translateX(-100%);
}


/*二级页面过渡动画*/
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .2s;
}
.router-slid-enter, .router-slid-leave-active {
    /*transform: translate3d(2rem, 0, 0);*/
    /*transform: translateX(100%);*/
    opacity: 0;
}
/*筛选框动画*/

.showlist-enter-active, .showlist-leave-active {
	transition: all .3s;
	/*transform: translateY(0);*/
}
.showlist-enter, .showlist-leave-active {
	opacity: 0;
	/*transform: translateY(0%);*/
}

/*遮罩动画*/
.showmask-enter-active, .showmask-leave-active {
	transition: opacity .3s
}

.showmask-enter, .showmask-leave-active {
	opacity: 0
}

/*
.fade-right-enter-active,.fade-right-leavel-active{
	transition: all .3s;
}

.fade-right-enter-active,{
	transform: rotateY(-100%);
	opacity:0;
}

.fade-right-enter-active,.fade-right-leavel{
	transform: rotateY(0);
	opacity: 1;
}


.fade-right-leavel-active{
	transform: rotateY(100%);
	opacity:0;
}
*/

.orderBox{

	/*height:100%;*/
/*	padding-top:4rem;
	padding-bottom:2rem;
*/
  position: absolute;
  top:4rem;
  bottom:2rem;
  left:0;
  right:0;
  overflow: hidden;

	box-sizing: border-box;


}


/*.footer{
	display: none;
}*/

.sale_content{


    display: flex;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;

    flex-direction: column;

	/*padding-top:4rem;*/
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;


/*    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
    overflow:hidden;*/

	/*padding-top:40px*/

	/*position:absolute;*/


}


.more{
	text-align:center;
	padding-top:.2rem;
	padding-bottom:.2rem;

	display: flex;
	justify-content:center;
	align-items: center;
	font-size:.7rem;
	img{
		margin:0 .2rem;
	}

}

.publish_btn{
    right:.6rem;
    bottom:3rem;
    position: fixed;
    z-index:9;

    a{
      display: block;
      color:#002107;
      background:rgba(000,255,191,.5);
      width:2.2rem;
      height:2.2rem;
      text-align: center;
      line-height:2.2rem;
      border-radius:100%;
      font-size:.7rem;

    }
}



/*//初始化轮播样式*/


.swiper-box {
	width: 100%;
	margin: 0 auto;
	height:8rem;
	overflow: hidden;

	img{
		/*height:100%;*/
		width:100%;
	}
}
.swiper-item {
height: 100%;
text-align: center;
font-size: 1.2rem ;
background: #fff;
/* Center slide text vertically */
}

.swiper-pagination{
  bottom:0px !important;
	span{
		width:.3rem;
		height:.3rem;
	}
}


.back-mask{
	position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);

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


.header-top{
  background: #46C95E;
  height:4rem;

}

.search-box{
  /*padding:.2rem 0;*/
  height:2rem;
  line-height:2rem;


  .form-control{
    line-height:1rem;
    border-radius:1rem;
    box-sizing: border-box;
    position: relative;
    padding:.3rem 20%;
    background-color:#fff;
    width:100%;
    font-size:.7rem;



  }
  .form-btn{
    color:#fff;
    font-size:1px*@font-default-size;
    background: none;
    margin-left:.1rem;

  }

  .form-group{
   /* display: flex;
    justify-content: center;*/


	p{
		width:65%;
		margin:0 auto;
		position: relative;







	}

    i{
      content:'';
      position: absolute;
      width:1rem;
      height:1rem;
	
      background: url('../../assets/imgs/xhjy/icon_search.png') no-repeat center center;
      background-size:auto 1rem;
      left:.55rem;

      top:.67rem;
     


      display: flex;

		justify-content: center;
		align-items: center;


    }
  }
}

.search-list{
  display: flex;
  padding-top:.1rem;
  height:2rem;

  .sort-title{
  	text-align: center;
  	overflow: hidden;
  	white-space: nowrap;
  }
  .sort-title.activity{
  	span{
  		color:#fffb44;
  		overflow: hidden;
  		text-overflow: ellipsis;
  		white-space: nowrap;
  		max-width:4em;
  		/*width:2em;*/
  	}
  }
  li{
    flex:1;
    line-height:1.6rem;
    color:#fff;
    /*position: relative;*/

	.sort-title{
		position: relative;

		display: flex;
		justify-content: center;
		align-items: center;


		span{
			color:#fff;
			font-size:.7rem;
			overflow: hidden;
	  		text-overflow: ellipsis;
	  		white-space: nowrap;
	  		max-width:5em;
		}

	    img{
	      height:1rem;
	      margin-right:.3rem;
	      vertical-align: middle;
	    }
	}

    .sort-title:after{
      content:'';
      width:1px;
      background: #fff;
      height:1.3rem;
      position: absolute;
      right:0;
      top:0;
      bottom:0;
      margin:auto;

    }

  }








}






.fixed{
  right:10px;
  bottom:60px;
  position: fixed;
  z-index:99;
  a{
    display: block;
    color:#fff;
    background:#FECF4B;
    width:60px;
    height:60px;
    text-align: center;
    line-height:60px;
    border-radius:100%;

  }
}


.font-orange-money{
	color: orange;
}




</style>
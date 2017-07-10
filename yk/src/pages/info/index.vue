<template>

<div class="info_page">
	<!-- <header-top></header-top> -->


<!-- 	<div class="info_content" id='wrapper_content' ref='wrapper_content'>
	
	<ul>
		<li @click='refresh'>refresh()</li>
		<li v-for='item in 10' :class="{'hot':item==50}">{{item +"==="+ new Date().toLocaleString()}}</li>
		<li>
			<router-link to='info/infoDetail'>href</router-link>
                <router-link  :to="{path: '/shop', query: {geohash, id: orderDetail.restaurant_id}}">再来一单</router-link>
		</li>
	</ul>

</div> -->


	<header-top title='资讯行情'></header-top>

	<div class="fixed-top-div"></div>

	<ul class="news_tab">
		<li @click=" active = 1" :class="{on:active == 1}" >行业新闻</li>
		<li @click=" active = 2" :class="{on:active == 2}" >分析评论</li>
		<li @click=" active = 3" :class="{on:active == 3}" >会展中心</li>
	</ul>

    <div class="content index" id="wrapper" ref='wrapper_content'>
        <div class="list" ref='wrapper_content2' >
            <ul v-show =" active == 1 ">
				<li v-for="(item,index) in newsList1 " @click='toPage("/info/infoDetail?nId="+item.n_id+"&type=1")'>
                    <div class="info">
                        <p>{{ item.n_title }}</p>
                        <p><span>{{ item.n_date.substring(0,10) }}</span></p>
                    </div>
                    <div class="img">
                        <!-- <img v-bind:src=" item.n_image_url.split(',')[0] " alt=""/> -->
                        <drawimg :src=" item.n_image_url.split(',')[0] " :id=" '1saleOrder+'+index "></drawimg>
                    </div>
                </li>       
            </ul>

            <ul v-show=" active ==2 ">
				<li v-for="(item,index) in newsList2 " @click='toPage("/info/infoDetail?nId="+item.n_id+"&type=2")'>
                    <div class="info">
                        <p>{{ item.n_title }}</p>
                        <p><span>{{ item.n_date.substring(0,10) }}</span></p>
                    </div>
                    <div class="img">
                        <!-- <img v-bind:src=" item.n_image_url.split(',')[0] " alt=""/> -->
                        <drawimg :src=" item.n_image_url.split(',')[0] " :id=" '2saleOrder+'+index "></drawimg>
                    </div>
                </li>       
            </ul>

            <ul v-show=" active==3 ">
				<li v-for="(item,index) in newsList3 " @click='toPage("/info/exhibitionInfo?nId="+item.n_id+"&type=3")'>
                    <div class="info">
                        <p>{{ item.n_title }}</p>
                        <p><span>{{ item.n_date.substring(0,10) }}</span></p>
                    </div>
                    <div class="img">
                        <!-- <img v-bind:src=" item.n_image_url.split(',')[0] " alt=""/> -->
                        <drawimg :src=" item.n_image_url.split(',')[0] " :id=" '3saleOrder+'+index "></drawimg>
                    </div>
                </li>       
            </ul>
            
            <div v-if='hasMore' class='more'>
				<img src="../../assets/imgs/load.gif" alt="">
			</div>	
			<div v-else class='more'>
				<span>没有了...</span>
			</div>
        </div>
    </div>
	




	<transition name='route-slide'>
		<router-view :newsList1="newsList1" :newsList2="newsList2" :newsList3="newsList3"></router-view>
	</transition>
	
	

</div>

</template>
<script>


import BScroll from 'better-scroll'

import headerTop from '@/components/header/header'
import drawimg from '@/components/common/drawimg'
// import nativeShare from 'nativeShare'

import {loadMore} from '@/config/util'

	export default{
		data(){
			return{
				count:100,
				scroll:{},
				pageNo:1,

				pageByactive1:1,
				pageByactive2:1,
				pageByactive3:1,

				newsList:[],

				newsList1:[],
				newsList2:[],
				newsList3:[],

				preventRepeat:false,
				hasMore:true,//是否有更多

				scroller:null,

				active:1,

				share:null,

			}
		},
		components:{
			headerTop,
			drawimg,
		},
		mounted (){



        // this.share = new nativeShare()
        // var shareData = {
        //     title: 'NativeShare',
        //     desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
        //     // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
        //     link: 'https://github.com/fa-ge/NativeShare',
        //     icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
        // }
        // this.share.setShareData(shareData)



        // setTimeout(()=>{
        // 	this.share.call();
        // },3000)







			this.$nextTick(()=>{

				this.queryNews();

				this.queryNews1();
				this.queryNews2();
				this.queryNews3();

			})
			
		},

		methods:{


			refresh(){
				setTimeout(()=>{
					this.scroller.refresh();
				},100)
			},
			load(){

				if(this.preventRepeat){
					return
				}
				this.pageNo ++;
				this.preventRepeat = true;

				// console.log("page+"+this.pageNo);

				this.$http.post('/newsList1',{pageNo:this.pageNo}).then((res)=>{
					if(res.data.code==0){

						// console.log(res.data.response);
						this.newsList = this.newsList.concat(res.data.response);


						if(res.data.response.length<10){
							this.hasMore = false;
						}else{
							this.preventRepeat = false;
						}
						//
						this.refresh();

					}
				})

			},

			load1(){

				if(this.preventRepeat){
					return
				}

				this.pageByactive1 ++;
				this.preventRepeat = true;

				// console.log("page+"+this.pageNo);

				this.$http.post('/newsList1',{pageNo:this.pageByactive1,type:1}).then((res)=>{
					if(res.data.code==0){

						console.log(res);
						// console.log(res.data.response);
						this.newsList1 = this.newsList1.concat(res.data.response);


						// if(res.data.response.length<10){
						// 	// this.hasMore = false;
						// }else{
						// 	// this.preventRepeat = false;
						// }

						if(res.data.response.length<=0){
							layer.msg("没有数据了")
							this.hasMore = false;
						}else{
							this.preventRepeat = false;
						}



						this.refresh();

					}
				})

			},
			load2(){

				if(this.preventRepeat){
					return
				}
				this.pageByactive2 ++;
				this.preventRepeat = true;

				// console.log("page+"+this.pageNo);

				this.$http.post('/newsList1',{pageNo:this.pageByactive2,type:2}).then((res)=>{
					if(res.data.code==0){

						// console.log(res.data.response);
						this.newsList2 = this.newsList2.concat(res.data.response);


						// if(res.data.response.length<10){
						// 	this.hasMore = false;
						// }else{
						// 	this.preventRepeat = false;
						// }
						//
						if(res.data.response.length<=0){
							layer.msg("没有数据了")
							this.hasMore = false
						}else{
							this.preventRepeat = false;
						}
						this.refresh();

					}
				})

			},
			load3(){

				if(this.preventRepeat){
					return
				}
				this.pageByactive3 ++;
				this.preventRepeat = true;

				// console.log("page+"+this.pageNo);

				this.$http.post('/newsList1',{pageNo:this.pageByactive3,type:3}).then((res)=>{
					if(res.data.code==0){

						// console.log(res.data.response);
						this.newsList3 = this.newsList3.concat(res.data.response);


						// if(res.data.response.length<10){
						// 	this.hasMore = false;
						// }else{
						// 	this.preventRepeat = false;
						// }
						//
						if(res.data.response.length<=0){
							layer.msg("没有数据了")
							this.hasMore = false;
						}else{
							
							this.preventRepeat = false;
						}
						this.refresh();

					}
				})

			},
			//
			queryNews(){
				this.$http.post('/newsList1',{pageNo:this.pageNo}).then((res)=>{
					if(res.data.code==0){
						this.newsList = res.data.response;

						setTimeout(()=>{
							this.scrollList();
						},100)
					}
				})
			},
			queryNews1(){
				this.$http.post('/newsList1',{pageNo:this.pageByactive1,type:1}).then((res)=>{
					if(res.data.code==0){
						this.newsList1 = res.data.response;



						console.log(this.newsList1);
						// setTimeout(()=>{
						// 	this.scrollList();
						// },100)
					}
				})
			},
			queryNews2(){
				this.$http.post('/newsList1',{pageNo:this.pageByactive2,type:2}).then((res)=>{
					if(res.data.code==0){
						this.newsList2 = res.data.response;


						console.log(this.newsList2);
						// setTimeout(()=>{
						// 	this.scrollList();
						// },100)
					}
				})
			},
			queryNews3(){
				this.$http.post('/newsList1',{pageNo:this.pageByactive3,type:3}).then((res)=>{
					if(res.data.code==0){
						this.newsList3 = res.data.response;

						console.log(this.newsList3);



						// setTimeout(()=>{
						// 	this.scrollList();
						// },100)
					}
				})
			},


			toPage(url){
				this.$router.push(url);
			},
			scrollList (){	
				// console.log(this.$refs.wrapper_content);

				// this.scroll = new BScroll(this.$refs.wrapper_content,{
				// 	click:true
				// })



				this.scroller = new BScroll("#wrapper",{
		    		probeType: 3,//1 监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
		            deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
		            bounce: false,//回弹
		            // bounce: true,//回弹
		            // HWCompositing: false,//硬件加速
		            swipeTime: 2000,//2500 swipe 持续时间
		            click: true, //支持点击事件
				})



				this.scroller.on("scrollEnd",(pos)=>{

					if(this.scroller.y <= this.scroller.maxScrollY){
						// console.log('load more');
						// this.load();

						console.log("active=="+this.active)
						if(this.active == 1){
							this.load1();
						}else if(this.active == 2){
							this.load2();
						}else{
							this.load3();
						}
					}
				})

			},

		},
		watch:{
			active(){
				this.scroller.scrollTo(0,0);

				this.refresh();

				// this.refresh();

				// setTimeout(()=>{
				// 	this.refresh();
				// },100)

			},
		}
		
	}




</script>

<style scoped lang='less'>

@import '../../assets/css/variable.less';


.route-slide-enter-active,.route-slide-leave-active{
	transition: all .3s;
}

.route-slide-enter, .route-slide-leave-active {
    /*transform: translate3d(2rem, 0, 0);*/
    transform: translateX(100%);
    opacity: 0;
}
/*.route-slide-leave-active{
	transform: rotateX(100%);
	opacity:0;
}*/


.more{
	height:2rem;
	text-align: center;
	img{
		height:auto;
		width:auto;
	}
}

.info_page{
/*	position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;*/
    background-color: #fff;
    overflow: hidden;
    height:100%;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;

}

.index{
	/*position: fixed;*/
	position: absolute;
	bottom:2.1rem;
	top:4rem;
	overflow: hidden;
	/*height:100%;*/
	/*height:450px;*/
}


.news_tab{

	display: flex;

	/*justify-content: center;*/
	li{

		flex:1;
		text-align: center;
		line-height:2rem;
		font-size:.7rem;
		border-bottom:2px solid #AAAAAA;
		position: relative;

		&:after{
			content:'';
			position: absolute;
			height:1rem;
			width:1px;
			background:#AEAEAE;
			right:0;
			top:0;
			bottom:0;
			margin:auto;
		};


	}
	li:last-child{

		&:after{
			background:none;
		};

	}
	li.on{
		/*color:;*/
		color:#46C95E;
	}
}

.list{
	/*.fixed();*/
}


.index{

  li{
    height:80/@root-font-size;
    border-bottom:1px solid #D5D5D5;
    overflow: hidden;
    font-size:.7rem;

    display: flex;
    justify-content: flex-start;
    padding:10/@root-font-size 12/@root-font-size;

    div.info{
      width:60%;
      margin-right:6%;

      /*display: flex;*/
      /*flex-direction: column-reverse;*/
      /*justify-content: space-between;*/
		
	display: flex;

	flex-direction: column;

	align-content: flex-end; 




    }

    p{
      /*height:3em;*/
	
	overflow: hidden;




      /*display: flex;*/
      /*align-items: flex-end;*/
    }
    p:first-child{

/*    	text-indent: 1em;
    	font-size:.6rem;
    	height:70%;
    	line-height: .9rem;
    	overflow: hidden;*/

    	/*text-indent: 1em;*/
    	height:2.6rem;
    	line-height: .9rem;








    }
	p:last-child{
		margin-top:.4rem;
		font-size:.6rem;
	}


    span{
      color:#969696;
      display: block;
      /*margin-top:.2rem;*/
    }
    div.img{
      overflow: hidden;
      width:35%;
      img{
        height:83/@root-font-size;
        width:100%;
      }

    }
  }
  li:last-child{
    border:none;
  }

}
























/* .info_content{

	padding-bottom:40px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 45px;

}

li{
	text-align:center;
	line-height:30px;

	overflow:hidden;

	white-space: nowrap;
	text-overflow: ellipsis;


}


.hot{
	background: #f00;
}
li:nth-child(odd){
	background: #89CDFC;
	color:#fff;

} */



</style>
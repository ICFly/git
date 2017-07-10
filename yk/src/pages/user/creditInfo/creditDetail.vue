<template>




<div class="accountDetail_page">
	

	<header-top title="信用明细" back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content bzjmx" id='wrapper_box'>

        <!--<div class="sum-count">-->

        <!--</div>-->

        <div class="sum-list">
        <ul>
            <li v-for="item in mxData">
                <p>{{item.text}}</p>
                <p>{{item.i_date}}</p>
                <div class="jfbox" :class="[item.i_source < 10 ? activeClass : errorClass]">
                	{{item.i_integrals}}
                </div>
            </li>
        </ul>

        </div>
    	
    </div>

    <transition>
    	<loading v-show='showLoading'></loading>
    </transition>

<!--showLoading-->



</div>
	

</template>


<script>

import headerTop from '@/components/header/header'	
import loading from '@/components/common/loading'

import bScroll from 'better-scroll'

export default{
	components:{
		headerTop,
		loading,
	},
	data(){
		return{
			accountList:[],
			showLoading:false,
			pageNo:1,//页码
			scroller:null,
			preventRepeat:false,//防止重复请求
			hasMore:true,//是否还有更多
			mxData:[],
			activeClass:"active",
			errorClass:"error"
		}
	},
	mounted(){

		this.$nextTick(()=>{

			this.getInfo()

			setTimeout(()=>{



				this.scroller = new bScroll('#wrapper_box',{
		            momentum: true,//开启惯性移动
		            bounce:false,//回弹效果
		            deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
		            HWCompositing: false,//硬件加速
		            swipeTime: 2000,//2500 swipe 持续时间
		            click: true, //支持点击事件
		        })



				//this.scroller.on('scrolled')
				this.scroller.on('scrollEnd',(pos) => {

					//console.log(this.menuList);

					if(Math.abs(this.scroller.y) >= Math.abs(this.scroller.maxScrollY)){

						if(this.hasMore){
							console.log('more')
							this.loadMore();
							this.scroller.refresh()
						}

					}

				})


			},1000)


		})



	},
	methods:{
		loadMore(){

			if(this.preventRepeat) return;


			this.preventRepeat = true;

			this.pageNo += 1;
			this.showLoading = true,
			this.getInfo();
		},	
		getInfo(){
			this.$http.post("/JfDetailed",{pageNo:this.pageNo,vip:this.$store.getters.getVip}).then((res)=>{
				
//				this.mxData = res.data.response;
				
				let data = res.data.response;
				console.log(data.length)
				for(let i = 0; i < data.length; i++){
					if(data[i].i_source == 1){
						data[i].text = "注册";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 2){
						data[i].text = "登录";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 3){
						data[i].text = "签到";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 4){
						data[i].text = "完善账号信息";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 5){
						data[i].text = "发布现货交易";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 6){
						data[i].text = "发布采购";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 7){
						data[i].text = "发布供应";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 8){
						data[i].text = "交易成功";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 9){
						data[i].text = "推荐";
						data[i].i_integrals = '+'+ data[i].i_integrals;
					}
					if(data[i].i_source == 10){
						data[i].text = "发布虚假供应信息";
						data[i].i_integrals = '-'+ data[i].i_integrals;
					}
					if(data[i].i_source == 11){
						data[i].text = "发布虚假采购信息";
						data[i].i_integrals = '-'+ data[i].i_integrals;
					}
					if(data[i].i_source == 12){
						data[i].text = "发布虚假现货交易信息";
						data[i].i_integrals = '-'+ data[i].i_integrals;
					}
				}
				
				if(res.data.code == 0){
					console.log(data);
					this.mxData = this.mxData.concat(data);
					
					if(data.length<=0){
						this.hasMore = false;
					}
					
					this.preventRepeat = false;
					this.showLoading = false;
					
				}
				
				
				
				
				console.log(this.mxData)
				
				let arr = ["注册","登录","签到","完善账号信息","发布现货交易","发布采购","发布供应","交易成功","推荐","发布虚假供应信息","发布虚假采购信息","发布虚假现货交易信息"]
				
			})
		}
	},
}

</script>

<style lang='less' scoped>
@import '../../../assets/css/variable';	

.accountDetail_page{
	
	.fixed();
	z-index:999;
	
}


.more{
	padding:.5rem;
	text-align: center;
	font-size:.6rem;
}

/*//保证金明细*/
.bzjmx{

	height:100%;



  .sum-count{
    height:50/@root-font-size;
    border-bottom:4px solid #F0F0F0;
    line-height:50/@root-font-size;
    text-align: center;

  }

  .sum-list{

    li{
      height:46/@root-font-size;
      border-bottom:1px solid #C8C8C8;
      padding:0px 16/@root-font-size;
      font-size:.7rem;
      position: relative;
		
		
	  p{
	  	width: 80%;
	  	height: 50%;
	  	line-height:23/@root-font-size ;
	  }	
      div{
        height:100%;
        width: 20%;
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
        line-height: 46/@root-font-size;
      }

	


    }
  }


}




.active{
	color: red;
}
.error{
	color: green;
}




</style>
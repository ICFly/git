<template>
	
<div class="bondDetail_page">
	
<header-top title="保证金明细" back></header-top>
<div class="fixed-top-div"></div>

    <div class="content bzjmx" id='wrapper_box'>
		<div style='padding-bottom:0rem;'>
	        <div class="sum-count">
	            <p>保证金冻结金额：<i class="font-style-red" v-text="userInfo.ensure_money"></i>元</p>
	        </div>

	        <div class="sum-list">
	            <li v-for="item in bondList">
	                <div class="col1">
	                    <span v-if="item.type==7" v-text="item.v_id"></span>
	                    <span v-else v-text="item.d_id"></span>

	                    <span v-if="item.state==1">待处理</span>
	                    <span v-if="item.state==2">交易成功</span>
	                    <span v-if="item.state==3">{{item.type==7?'准入金冻结':'保证金冻结'}}</span>
	                    <span v-if="item.state==4">{{item.type==7?'准入金解冻':'保证金解冻'}}</span>
	                    <span v-if="item.state==5">永久冻结</span>
	                    <span v-if="item.state==6">删除</span>
	                    <span v-if="item.state==7">驳回</span>

	                </div>
	                <div class="col2">
	                    <span class="font-time" v-text="item.date"></span>

	                    <!--<span class="font-Frozen-money" v-text="item.money"></span>-->
	                    <span v-if="item.state==4" class="font-style-red">+{{item.money}}</span>

	                    <!--<span v-if="item.state==1" >{{item.money}}</span>-->

	                    <span v-else class="font-style-green">-{{item.money}}</span>

	                </div>
	            </li>
	        </div>
	        <div class='more' v-if='hasMore'>加载更多...</div>
	        <div class="more" v-else>没有了...</div>
        </div>
    </div>

    <transition>
    	<loading v-show='showLoading'></loading>
    </transition>


</div>


</template>

<script>
	
import headerTop from '@/components/header/header'
import loading from '@/components/common/loading'	


import bScroll from 'better-scroll'

export default{

	data(){
		return{
			userInfo:{},
			bondList:[],
			pageNo:1,
			showLoading:true,//加载更多
			hasMore:true,//还有更多
		}
	},
	components:{
		headerTop,
		loading,
	},
	mounted(){
		this.$nextTick(()=>{

			this.getInfo();
			this.getBondDetail();


			setTimeout(()=>{
				this.scroller = new bScroll('#wrapper_box',{
		            momentum: true,//开启惯性移动
		            bounce:false,//回弹效果
		            deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
		            HWCompositing: false,//硬件加速
		            swipeTime: 2000,//2500 swipe 持续时间
		            click: true, //支持点击事件
		        })

				this.scroller.on('scrollEnd',(pos) => {
					if(Math.abs(this.scroller.y) >= Math.abs(this.scroller.maxScrollY)){
						if(this.hasMore){
							this.loadMore();
						}

					}

				})




			},1000)

		})
	},
	methods:{
		getInfo(){

			this.$http.post('/GetInfoByvip',{vip:this.$store.getters.getVip}).then((res)=>{
				if(res.data.code==0){
					console.log(res);
					this.userInfo = res.data.response.user;
				}
			})

		},
		loadMore(){

			if(this.preventRepeat) return;

			this.preventRepeat = true;
			this.showLoading = true;
			this.pageNo += 1;

			this.getBondDetail();


		},
		getBondDetail(){
			this.$http.post('/queryBzj',{pageNo:this.pageNo,vip:this.$store.getters.getVip}).then((res)=>{
				if(res.data.code==0){
					if(res.data.response.length<20){
						this.hasMore = false;//标记没有更多了。
					}
					this.bondList = this.bondList.concat(res.data.response);

					this.showLoading = false;

					this.preventRepeat = false;
					if(this.scroller){
						setTimeout(()=>{
							this.scroller.refresh();
						},100)
					}
				}
			})
		}
	}

}
</script>

<style lang='less' scoped>
@import '../../../assets/css/variable';


.bondDetail_page{
	.fixed();
}


#wrapper_box{
	height:100%;
}

.more{
	text-align: center;
	padding:.4rem 0;
	font-size:.6rem;
}
/*//保证金明细*/
.bzjmx{

  .sum-count{
    height:50/@root-font-size;
    border-bottom:4px solid #F0F0F0;
    line-height:50/@root-font-size;
    text-align: center;
    font-size:.8rem;

  }

  .sum-list{

    li{

      height:50/@root-font-size;
      border-bottom:1px solid #C8C8C8;
      padding:0 20/@root-font-size;

      font-size:.7rem;



      div{

        height:50%;
        line-height:200%;

        display: flex;



        justify-content: space-between;

      }
      span{
        text-align: center;
      }

      span:last-child{
        width:40%;
      }




    }
  }


}




</style>
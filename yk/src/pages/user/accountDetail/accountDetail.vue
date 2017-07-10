<template>




<div class="accountDetail_page">
	

	<header-top title="账户明细" back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content bzjmx" id='wrapper_box'>

        <!--<div class="sum-count">-->

        <!--</div>-->

        <div class="sum-list" style='padding-bottom:2rem;'>
        <ul>
            <li v-for="item in accountList">
                <div class="col1">

                    <span v-text="item.leftText"></span>



                    <span v-if="item.state==1">待处理</span>
                    <span v-if="item.state==2">交易成功</span>


                    <!--<span v-if="item.state==3">保证金冻结</span>-->
                    <!--<span v-if="item.state==4">保证金解冻</span>-->

                    <span v-if="item.state==3">{{item.type==7?'准入金冻结':'保证金冻结'}}</span>
                    <span v-if="item.state==4">{{item.type==7?'准入金解冻':'保证金解冻'}}</span>




                    <span v-if="item.state==5">永久冻结</span>
                    <span v-if="item.state==6">删除</span>
                    <span v-if="item.state==7">驳回</span>




                </div>


                <div class="col2">
                    <span class="font-time" v-text="item.date"></span>
                    <span v-text="item.rightText" v-bind:class="item.textColor"></span>
                </div>
            </li>
        </ul>

        <div class="more" v-if='hasMore'>加载更多...</div>
		<div class="more" v-else>没有了</div>

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
	components:{
		headerTop,
		loading,
	},
	data(){
		return{
			accountList:[],
			showLoading:true,
			pageNo:1,//页码
			scroller:null,
			preventRepeat:false,//防止重复请求
			hasMore:true,//是否还有更多
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
							this.loadMore();
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
			this.$http.post('/querymoney',{vip:this.$store.getters.getVip,pageNo:this.pageNo}).then((res)=>{

				if(res.data.code==0){
					if(res.data.response.length<20){
						this.hasMore = false;
					}
					this.accountList = this.accountList.concat(res.data.response);
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
	},
	watch:{

		//
		showLoading(){

		},
		// accountList(){
		// 	console.log('++++++++++');
		// 	setTimeout(()=>{
		// 		this.scroller.refresh();
		// 	},1000)
		// },
		// accountList:{
		// 	handle(){
		// 		console.log('++++++++')
		// 	},
		// 	deep:true
		// },
		//
        accountList:function(val,oldval){
            
            for(var i = 0;i<this.accountList.length;i++){
                var item = this.accountList[i];

                var leftText = '';
                var rightText = '';
                var textColor = '';


                if(item.type==1){

                    leftText = '充值';
                    textColor = 'font-style-green';

                    if(item.state==2){
                        rightText = '+'+item.money;
                    }else{
                        rightText = item.money;
                    }


                }else if(item.type==2||item.type==3){

                    textColor = 'font-style-red';

                    if(item.state==2){
                        rightText = '-'+item.money;
                    }else{
                        rightText = item.money;
                    }


                    if(item.type==2){
                        leftText = '国内提现'
                    }else{

                        leftText = '国外提现'
                    }






                }else if(item.type==4){

                    //rightText = item.money;
                    leftText = '保证金';
                    if(item.state==4){
                        textColor = 'font-style-green';
                        rightText = '+'+item.money;
                    }else if(item.state==1){
                        rightText = item.money;
                    }else{
                        textColor = 'font-style-red';
                        rightText = '-'+item.money;
                    }
                }else if(item.type==5){
                    textColor = 'font-style-red';
                    leftText = '服务费金额';
                    if(item.state==2){
                        rightText = '-'+item.money;
                    }else{
                        rightText = item.money;
                    }
                }else if(item.type==7){
                    leftText = '准入金';
                    if(item.state==4){
                        textColor = 'font-style-green';
                        rightText = '+'+item.money;
                    }else{
                        textColor = 'font-style-red';
                        rightText = '-'+item.money;
                    }
                }
                this.$set(this.accountList[i],'leftText',leftText);
                this.$set(this.accountList[i],'rightText',rightText);
                this.$set(this.accountList[i],'textColor',textColor);
            }
        }

	}

}

</script>

<style lang='less' scoped>
@import '../../../assets/css/variable';	

.accountDetail_page{


	.fixed();
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
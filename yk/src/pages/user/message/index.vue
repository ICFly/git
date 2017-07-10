<template>
	
<div class="message_page">
	

	<header-top title='消息中心' back></header-top>
	<div class="fixed-top-div"></div>
	
    <div class="content" id='wrapper_box'>
        <ul @click=" readMsg " style='padding-bottom:2rem;'>
			<li class="tips">{{ tipsText }}</li>
			
			<mt-cell-swipe v-for=" (item,index) in list " :key="index"
			  	:right=
			  	"[
				    {
				      	content: '删除',
				      	style: { background: 'red', color: '#fff',fontSize:'0.6rem',display: 'flex' ,justifyContent: 'center',alignItems: 'center',width:'2.5rem'},
				      	handler: () => deleteMsg(item.pu_id,index)
				    }
			  	]">
  				<li :class=" item.state==0?'read':'' " :data-id=" item.pu_id " :data-index=" index ">
	                <!--<img src="../../../assets/imgs/center/icon_msg_on.png" alt="">-->
	                <div class="msg-icon">
	                    <img v-if=" item.state == 0 " src="../../../assets/imgs/center/icon_msg_on.png" alt="">
	                    <img v-else src="../../../assets/imgs/center/icon_msg_off.png" alt="">
	                </div>
	
	                <div class="msg-info">
	                    <p>
	                    <span class="tit" v-text=" item.pu_title "></span>
	                    <!-- <i>{{item.state}}</i> -->
	                    <span class="time" v-text=" item.date "></span>
	                    </p>
	                    <p class="ellipsis" v-text=" item.pu_detail "></p>
	                </div>
	            </li>
  
  
  
  			</mt-cell-swipe>
            


        </ul>
        <!-- <div class='more'>加载中</div> -->
    </div>

    <!--<transition>
    	<loading v-show='showLoading'></loading>
    </transition>-->



</div>


</template>

<script>
	
import headerTop from '@/components/header/header'

import bScroll from 'better-scroll'
import loading from '@/components/common/loading'


import { CellSwipe } from 'mint-ui';

import 'mint-ui/lib/style.css'

export default{

	components:{
		headerTop,
		loading,
		"mt-cell-swipe":CellSwipe
	},
	data(){
		return{
            pageNo:1,
            list:[],
            loadMoreState:true,
            scroller:null,
            showLoading:true,
            hasMore:true,//是否有更多
            preventRepeat:false,//防止重复加载
            tipsText:'',
		}
	},
	mounted(){

		this.$nextTick(()=>{

			this.queryMessage()



			setTimeout(()=>{

		        this.scroller = new bScroll('#wrapper_box',{
		    		probeType: 3,//1 监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
                    deceleration: 0.003,//0.001 滚动动量减速越大越快，建议不大于0.01
                    bounce: true,//回弹
                    HWCompositing: false,//硬件加速
                    swipeTime: 2000,//2500 swipe 持续时间
                    click: true, //支持点击事件
		        })

		        this.scroller.on('scroll',(position)=>{
		        	if(position.y>=60){
		        		this.tipsText = '释放立即刷新'
		        	}else{
		        		this.tipsText = '下拉刷新'
		        	}
		        })

		        //下拉刷新
		        this.scroller.on('touchend',(position)=>{
		        	// console.log(position.y)
		        	if(position.y>60){
		        		
		        		//重置数据
		        		this.pageNo = 1;
		        		this.showLoading = true;
		        		this.list = [];
		        		this.queryMessage();
		        	}
		        })

		        // this.scroller.on('scrollEnd')

		        this.scroller.on('scrollEnd',(position)=>{
		        	// console.log(position.y);

		        	if(Math.abs(this.scroller.y) == Math.abs(this.scroller.maxScrollY)){
		        		if(this.preventRepeat) return;
		        		this.preventRepeat = true;
		        		this.showLoading = true;

		        		this.pageNo++;
		        		this.queryMessage();
		        	}
		        })



			},1000)
		})

	},

	methods:{
		//标记已读
		readMsg(){

			let e = window.event|| event;

            let target = e.target || e.srcElement;

            while(true){
                if(target.nodeName.toLowerCase() == 'li'){
                    let puid = target.getAttribute("data-id");
                    let ind = target.getAttribute("data-index");
                    let obj = this.list[ind];


                    layer.open({
                    	title:obj.pu_title,
                    	content:obj.pu_detail,
                    	// style:'padding:.3rem;',
                    	btn:'确定'
                    })

                    if(obj['state']==0) return;

                    obj['state'] = 0;

                    this.$http.post('/ReadPush',{vip:this.$store.getters.getVip,puid:puid}).then((res)=>{
                        //表示标记已读成功，标记
                        this.$store.commit("readMsg");

                    }).catch((err)=>{
                    	layer.open({
                    		content:err,
                    		btn:'确定'
                    	})
                    })

               
                    break;
                }
                target = target.parentNode;
            }






		},
		queryMessage(){
			this.$http.post('/queryPush',{vip:this.$store.getters.getVip,pageNo:this.pageNo}).then((res)=>{
				if(res.data.code == 0){
					this.list = this.list.concat(res.data.response);
					console.log(this.list)

					setTimeout(()=>{
						this.showLoading = false;
						this.preventRepeat = false;
						if(this.scroller){
							this.scroller.refresh();
						}
					},1000)
					// this.list = this.data.response;
				}
			})
		},
		deleteMsg(id,ind){
			
			
			console.log(id+"=========="+ind)
			this.$http.post('/DeletePush',{vip:this.$store.getters.getVip,puid:id}).then((res)=>{
		
			console.log(res);
				if(res.data.code==0){
					this.list.splice(ind,1);
					layer.msg("删除")
				}else{
					
				}
			})
		}
	},
	

}

</script>


<style lang='less' scoped>
	
@import '../../../assets//css/variable';





.message_page{
	.fixed();
}



.tips{
	position: absolute;
	top:-2rem;
	height:2rem;
	width:100%;
	display: flex;
	justify-content: center;
	font-size:.6rem;
	color:#333;
}



.content{
	height:100%;
  li{
    /*height:45/@root-font-size;*/
    display: flex;
    color:#0ba218;
    width: 100%;
    padding:.3rem 0;
    div{
      justify-content: flex-start;
    }
  }

  li.read{
  	width: 100%;
    color:#808080;
    border-bottom: 1px solid #EAEAEA; 
    span{
    	color:#808080 !important;
    }
  }


  div.msg-icon{
    width:16%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
      height:16/@root-font-size;
    }
  }

  div.msg-info{

    /*//line-height:25/@root-font-size;*/
    font-size:.6rem;
    /*padding:12px 5px;*/
    width:84%;

    line-height:1rem;
    p:first-child{
      display: flex;
      /*height:20/@root-font-size;*/
      overflow: hidden;
      justify-content: space-between;
      padding-right:.3rem;

      span:first-child{
      	font-weight: bold;
      	color:#327915;
      }

    }

    p:last-child{
    	overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
      /*height:20px;*/

    }


  }

}


</style>
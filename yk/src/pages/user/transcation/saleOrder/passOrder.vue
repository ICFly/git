<template>
<div class="buyOrder_page">
	<header-top title='审核通过' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content my-order">
        <ul class="order-state">
            <li v-bind:class="{on:active==1}" @click="active=1">议价中</li>
            <li v-bind:class="{on:active==2}" @click="active=2">交易中</li>
            <li v-bind:class="{on:active==3}" @click="active=3">已成交</li>
            <li v-bind:class="{on:active==4}" @click="active=4">已结束</li>
        </ul>

        <div class="order-list" ref="orderList2" id="passOrder_bs">

            <!--出价中-->
            <ul class="order-state-1" v-if='active==1 '>
                <li v-for="(item,index) in orderList1" @click='toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+item.t_id)'>
                    <div class="order-tit">
                        <span class="tit" v-text="item.t_id"></span>
                        <span v-if="item.t_price > 0" style="color: orange;">还价中</span>
                        <span v-else class="font-style-orange-circle" style="border: none;">出价中</span>

                    </div>
                    <div class="order-info">
                        <div class="order-flex">

                            <div class="order-img">
                                <!--<img src="../../images/center/order_pic.png" alt="">-->
                                <drawimg :src="splitImg(item.p_file)" :id=" 'passOrder_'+index "></drawimg>
                                	
                                <!--<img :src="splitImg(item.p_file)" alt="">-->
                            </div>

                            <div class="order-param">
                                <h3>{{item.t_title}}</h3>
                                <p><span>数量：</span>{{item.t_quality+''+item.dw_name}}</p>
                                <p><span>地区：</span>{{item.dz_name}}</p>
                                <p><span>上线时间：</span>{{item.pass_time.substring(0,10)}}</p>
                                <p v-if="item.t_price>0"><span >当前还价：<i style="color: orange;">{{item.cj_price}}</i>{{item.bz_name}}/{{item.dw_name}}</span></p>
                                <p v-else><span >当前出价：<i style="color: orange;">{{item.cj_price}}</i>{{item.bz_name}}/{{item.dw_name}}</span></p>
                                <!--<p><span>成交价格：</span><i class="font-red-money">{{item.t_price}}</i>{{item.bz_name}}/{{item.t_quality}}</p>-->
                            </div>

                        </div>
                        <div class="order-btn">
                        	<a @click.stop v-if="item.t_price > 0" class="bd-orange-money font-style-orange-circle f_right"> 结束交易 </a>
                        	<a @click.stop v-else class="bd-orange-money font-style-orange-circle f_right">结束交易 </a>
                            <a @click.stop="toPage('/user/transcationList/saleOrder/passOrder/updatePrice?id='+item.t_id)" v-if="item.t_price > 0" class="bd-orange-money font-style-orange-circle f_right" >修改价格</a>
							<a @click.stop="toPage('/user/transcationList/saleOrder/passOrder/lookPrice?id='+item.t_id)" v-if="item.t_price > 0" class="bd-orange-money font-style-orange-circle f_right">查看还价</a>
	                        <a @click.stop="toPage('/user/transcationList/saleOrder/passOrder/managePrice?id='+item.t_id)" v-else class="bd-orange-money font-style-orange-circle f_right">出价管理</a>
                        </div>
                    </div>
                </li>
                <li class='tip' v-if='orderList1.length <= 0'>没有了...</li>
            </ul>
            <!--交易中-->
            <ul class="order-state-2" v-if="active==2" ref='orderList22'>
                <li v-for="(item,index) in orderList2" @click='toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+item.t_id)'>
                    <div class="order-tit">
                        <span class="tit" v-text="item.t_id"></span>
                        <!--<span class="order-state-suc">交易中</span>-->
                        <!--<span>成交价格：<i class="order-state-suc" v-text="item.final_price"></i><i v-text="item.bz_name"></i>/<i v-text="item.dw_name"></i></span>-->
                    </div>
                    <div class="order-info">
                        <div class="order-flex">
                            <div class="order-img">
                                <!--<img src="../../images/center/order_pic.png" alt="">-->
                                <drawimg :src="splitImg(item.p_file)" :id=" 'passOrder2_'+index "></drawimg>
                            </div>
                            <div class="order-param">
                                <h3>
                                    <i v-text="item.t_title"></i>
                                    <span v-if="item.t_price == '' ">出价成功</span>
                                    <span v-else>还价成功</span>
                                </h3>
                                <p><span>数量：</span><i v-text="item.t_quality"></i><i v-text="item.dw_name"></i> </p>
                                <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                <p><span>上线时间：</span><i v-text="item.pass_time.substring(0,10)"></i></p>
                                <p v-show='false'><span>成交价格：<i class="order-state-suc" v-text="item.final_price"></i><i v-text="item.bz_name"></i>/<i v-text="item.dw_name"></i></span></p>
                                <!--<p><span>成交价格：</span><i class="font-red-money">{{item.t_price}}</i>{{item.bz_name}}/{{item.t_quality}}</p>-->
                            </div>
                        </div>

                        <div class="order-btn" @click.stop="">

                            <a v-if=" item.tbBail == '' " @click.stop="submitBond(item.t_id)" class="order-btn-bond border-style-green ">
                                <span>提交保证金</span>
                                <span>
                                    <i v-text="item.endDate_days"></i>:<i v-text=" item.endDate_hours"></i>:<i v-text=" item.endDate_minutes "></i>:<i v-text=" item.endDate_seconds "></i>
                                </span>
                            </a>

                            <a v-else-if="item.tbBail.length > 0 && item.zbBail.length == 0 " class="font-style-orange-circle">等待对方提交保证金</a>
                            <a v-if=" item.tbBail.length > 0 && item.zbBail.length>0&&item.t_surestate == 1 " class="order-btn-ok">待对方确认</a>
                            <a v-if=" item.tbBail.length > 0 && item.zbBail.length>0&&item.t_surestate == 0||item.t_surestate == -1||item.t_surestate == '' " class="order-btn-ok">待对方确认</a>


                        </div>
                    </div>
                </li>
            </ul>
            <!--已成交-->
            <ul class="order-state-3" v-if="active==3">
                <li v-for="(item,index) in orderList3" @click='toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+item.t_id)'>
                    <div class="order-tit">
                        <span class="tit"><i v-text="item.t_id"></i></span>
                        <span>成交价格：<i class="order-state-suc" v-text="item.final_price"></i><i v-text="item.bz_name"></i>/<i v-text="item.dw_name"></i></span>
                    </div>
                    <div class="order-info">

                        <div class="order-flex">
                            <div class="order-img">
                                <!--<img src="../../images/center/order_pic.png" alt="">-->
                                <!--<img v-bind:src="splitImg(item.p_file)" alt="">-->
                                <drawimg :src="splitImg(item.p_file)" :id=" 'passOrder3_'+index "></drawimg>
                                
                            </div>
                            <div class="order-param">
                                <h3 v-text="item.t_title"></h3>
                                <p><span>数量：</span><i v-text="item.t_quality"></i>/<i v-text="item.dw_name"></i> </p>
                                <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                <p><span>上线时间：</span><i v-text="item.pass_time.substring(0,10)"></i></p>
                            </div>
                        </div>

                        <div class="order-btn" style="justify-content:flex-end;">
                            <a @click.stop="deleteOrder(item.t_id,index)" class="order-btn-del mg5">删除</a>
                            <a class="order-btn-endtime">已成交</a>
                        </div>
                    </div>
                </li>
            </ul>
            <!--已结束-->
            <ul class="order-state-4" v-if="active==4">
                <li v-for="(item,index) in orderList4" @click='toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+item.t_id)'>
                    <div class="order-tit">
                        <span class="tit" v-text="item.t_id"></span>
                        <span>已结束</span>
                    </div>
                    <div class="order-info">

                        <div class="order-flex">
                            <div class="order-img">
                                <!--<img src="../../images/center/order_pic.png" alt="">-->
                                <drawimg class="img4" :src="splitImg(item.p_file)" :id=" 'passOrder4_'+index "></drawimg>
                                
                                <!--<img class="img4" v-bind:src="splitImg(item.p_file)" alt="">-->
                            </div>
                            <div class="order-param">
                                <h3 v-text="item.t_title"></h3>
                                <p><span>数量：</span><i v-text="item.t_quality"></i><i v-text="item.dw_name"></i></p>
                                <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                <p><span>上线时间：</span><i v-text="item.pass_time.substring(0,10)"></i></p>
                            </div>
                        </div>
                        <div class="order-btn" style="justify-content:flex-end;">
                            <a @click.stop="deleteOrder2(item.t_id,index)" class="order-btn-del mg5">删除</a>
                            <a class="order-btn-endtime">已结束</a>
                        </div>

                    </div>
                </li>
            </ul>
        </div>

    </div>	


    <transition>
    	
    	<router-view></router-view>

    </transition>




</div>




</template>



<script>
	

import headerTop from '@/components/header/header'

import {loadMore} from '@/config/util'

import bScroll from 'better-scroll'

import drawimg from '@/components/common/drawimg'

import axios from 'axios'

export default{

	components:{
		headerTop,
		drawimg
	},
	data(){

		return{
			active:1,//当前选项卡
			pageNo:1,//页码
			orderList1:[],
			orderList2:[],
			orderList3:[],
			orderList4:[],

			type1PageNo:1,
			type2PageNo:1,
			type3PageNo:1,
			type4PageNo:1,
			
			bscroll_list:null,
		}

	},
	mounted(){
		this.$nextTick(()=>{
			//查询订单信息
			// this.queryOrderInfo();
			this.queryOrderInfoByType1();
			this.queryOrderInfoByType2();
			this.queryOrderInfoByType3();
			this.queryOrderInfoByType4();
			
			setTimeout(()=>{
				this.bscroll_list = new bScroll("#passOrder_bs",{
					click:true,
					bounce:false,
				})
			},1000)

		})
	},
	watch:{
		active(){
			
			if(this.bscroll_list){
				setTimeout(()=>{
					this.bscroll_list.refresh();
				},100)
			}
			
			//loadMore(this.$refs.orderList2,this.load2());
		}
	},
	methods:{

        //提交保证金
        submitBond(id){
            let bond  = 0;
            let vm = this;
            //查询该投标需要提交多少保证金。
            this.$http.post("/queryBZJBytId",{tId:id}).then((res)=>{
                console.log(res);
                if(res.data.code == 0){
                    bond = res.data.response;//查询到金额
                    layer.open({
                        content:`您将提交保证金${bond},交易完成后退还,是否确认提交?
                        `,
                        btn:['确定','取消'],
                        style:"width:80%",
                        yes:function(index){
                            layer.close(index);
                            vm.submitBondOfBuy(id);
                        }
                    })
                }else{
                    layer.msg("数据异常");
                    return;
                }
            })
        },

        //提交交易保证金 
        /*
        * @param vip 用户ID
        * @param tId 标ID
        * @param type 4表示买方提交保证金，3表示卖方提交保证金
        */
        submitBondOfBuy(id){
            this.$http.post("/submitTraBail",{vip:this.$store.getters.getVip,tId:id,type:3}).then((res)=>{
                if(res.data.code == 0){
                    layer.msg("保证金提交成功");
                }else{
                    layer.msg(res.data.message);
                }
            })
        },

		load2(){
			this.type2PageNo++;
			this.queryOrderInfoByType2();
		},
		queryOrderInfoByType1(){
			this.$http.post('/ZBGL',{vip:this.$store.getters.getVip,type:1,pageNo:this.type1PageNo}).then((res)=>{

				if(res.data.code == 0){
					this.orderList1 = this.orderList1.concat(res.data.response);
				}
			})
		},
		queryOrderInfoByType2(){
			this.$http.post('/ZBGL',{vip:this.$store.getters.getVip,type:6,pageNo:this.type2PageNo}).then((res)=>{
				 console.log(res);
				if(res.data.code == 0){
					this.orderList2 = this.orderList2.concat(res.data.response);
                    for(let i = 0;i<this.orderList2.length;i++){
                        let obj = this.orderList2[i];
                        this.formatTime(obj.dealTime,obj);
                    }
				}
			})
		},
		queryOrderInfoByType3(){
			this.$http.post('/ZBGL',{vip:this.$store.getters.getVip,type:4,pageNo:this.type3PageNo}).then((res)=>{
				// console.log(res);

                console.log(res);
				if(res.data.code == 0){
					this.orderList3 = this.orderList3.concat(res.data.response);

                    console.log(this.orderList3)
				}
			})
		},
		queryOrderInfoByType4(){

			this.$http.post('/ZBGL',{vip:this.$store.getters.getVip,type:5,pageNo:this.type4PageNo}).then((res)=>{
				// console.log(res);
				if(res.data.code == 0){
					this.orderList4 = this.orderList4.concat(res.data.response);
				}
			})
		},

		// queryOrderInfo(){

		// 	// console.log(this.$store);

		// 	this.$http.post('/TBGL',{vip:this.$store.getters.getVip,type:1,pageNo:1}).then((res)=>{
		// 		// console.log(res);
		// 		if(res.data.code == 0){
		// 			this.orderList1 = res.data.response;
		// 		}
		// 	})

		// 	this.$http.post('/TBGL',{vip:this.$store.getters.getVip,type:2,pageNo:1}).then((res)=>{
		// 		// console.log(res);
		// 		if(res.data.code == 0){
		// 			this.orderList2 = res.data.response;

		// 			console.log(this.orderList2);


		// 			for(let i = 0;i < this.orderList2.length;i++){

  //                       if(this.orderList2[i].tbBail.length == ''){
  //                           this.formatTime(this.orderList2[i].dealTime,this.orderList2[i]);


  //                       }
  //                   }
		// 		}





		// 	})

		// 	this.$http.post('/TBGL',{vip:this.$store.getters.getVip,type:3,pageNo:1}).then((res)=>{
		// 		// console.log(res);
		// 		if(res.data.code == 0){
		// 			this.orderList4 = res.data.response;
		// 		}
		// 	})

		// 	this.$http.post('/TBGL',{vip:this.$store.getters.getVip,type:4,pageNo:1}).then((res)=>{
		// 		// console.log(res);
		// 		if(res.data.code == 0){
		// 			this.orderList3 = res.data.response;
		// 		}
		// 	})
		// },


        //删除订单
        deleteOrder:function(id,ind){
            var vm = this;
            layer.open({
            	// title:'确定删除吗',
            	content:"确定删除吗",
            	btn:['确定','取消'],
            	yes:function(){
            		vm.$http.post('/deleteRecord',{uId:vm.$store.getters.getVip,vId:id}).then((res)=>{
            			if(res.data.code==0){
            				vm.orderList3.splice(ind,1);//从显示数据中删除元素
            				layer.open({
            					content:'删除成功。',
            					skin:'msg',
            					time:1.2
            				})
            			}else{

            				layer.open({
            					content:"删除失败!",
            					skin:'msg',
            					time:2
            				})

            			}
            		})
            		layer.closeAll();
            	},
            	no:function(){
            		layer.closeAll();
            	}

            })
           
        },

		//删除订单
		deleteOrder2(id,ind){

            var vm = this;
            layer.open({
            	// title:'确定删除吗',
            	content:"确定删除吗",
            	btn:['确定','取消'],
            	yes:function(){
            		vm.$http.post('/deleteRecord',{uId:vm.$store.getters.getVip,vId:id}).then((res)=>{
            			if(res.data.code==0){
            				vm.orderList4.splice(ind,1);//从显示数据中删除元素
            				layer.open({
            					content:'删除成功。',
            					skin:'msg',
            					time:1.2
            				})
            			}else{
            				layer.open({
            					content:"删除失败!",
            					skin:'msg',
            					time:2
            				})
            			}
            		})
            		layer.closeAll();
            	},
            	no:function(){
            		layer.closeAll();
            	}
            })
		},
		//拆分图片
		splitImg(src){
			console.log(src.split(',')[0])
			return src.split(',')[0];
		},
		toPage(url){
			this.$router.push(url);
		},
        formatTime(passtime,obj){
            var vm = this;
            //格式化时间
            var newDate = new Date(passtime.replace(/-/g,'/'));
            var timeOf = newDate.getTime() - new Date().getTime();
            if(timeOf<=0){
                return;
            }
            function time(){
                var timer = setInterval(function(){
                    var date3 = newDate.getTime() - new Date().getTime();
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

                    vm.$set(obj,"endDate_days",days);
                    vm.$set(obj,"endDate_hours",hours);
                    vm.$set(obj,"endDate_minutes",minutes);
                    vm.$set(obj,"endDate_seconds",seconds);
                    if(date3 <= 0){
                        clearInterval(timer);
                    }
                },1000);
            }
            time();
        },
	}

}


</script>


<style lang='less'>

@import '../../../../assets/css/variable';

.buyOrder_page{
	.fixed();
	z-index:9999;
}

/*.my-order .order-list .order-state-suc*/

/*===我的订单====*/

.tip{
	text-align: center;
	font-size:.6rem;
	margin:.5rem 0;
}
.font-style-orange-circle{
	color:orange;
	border:1px solid orange;
}
.my-order{



.order-state{
	position: relative;
	z-index: 999;
  display: flex;
  background: #fff;
  li{
    flex:1;
    text-align: center;
    line-height:35/@root-font-size;
    border-bottom:2px solid #AAAAAA;
    position: relative;
    font-size:.7rem;

    &:after{
      content:'';
      width:1px;
      height:20px;
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
    transition: all .3s;
  }

}





  .order-list{


    .order-state-suc{
      color:#ff8a00;
    }

    li{
      background: #fff;
      /*margin-top:10/@root-font-size;*/
      overflow: hidden;
      padding:0 10/@root-font-size;

    }

    .order-tit{
      line-height:30/@root-font-size;
      border-bottom:1px solid #F0F0F0;
      display: flex;
      justify-content: space-between;
      font-size:.6rem;
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
      width:40%;
      overflow: hidden;
      img{
        height:60/@root-font-size;
        width:100%;
      }
/*      .img4{
        height: 100/@root-font-size;
      }*/
    }
    h3{
      color:#333;
      margin-bottom:3px;
      overflow: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size:.7rem;

      span{
        float:right;
        color:#ff8a00;
        font-size:1px*@font-middle-size;
        font-weight: normal;
      }
    }
    .order-param{
      color:#888888;
      width:60%;
      font-size:.6rem;
      line-height:.94rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      p{
        /*margin-bottom:5px;*/
      }
      span{
        display: inline-block;
        
      }
  }


    .order-btn{

      display: flex;
      justify-content: space-between;

      border-top:1px solid #F0F0F0;
      padding:5/@root-font-size 0;

      a{

       	
        width:60/@root-font-size;
        box-sizing: border-box;
        margin:0 .3rem;

        height:100%;
       

        border:1px solid #fff;
        font-size:.6rem;
        text-align: center;

        border-radius:4px;
        border:1px solid orange;
        padding:.3rem;


      }

      a.order-btn-bond{
        color:#808080;
        line-height:normal;
        border-color:#808080;
      }

      a.order-btn-linkman{
        color:#FF8A00;
        border-color:#FF8A00;
      }
      a.order-btn-orange{
        color:#FF8A00;
        border-color:#FF8A00;
      }
      a.order-btn-red{
        color:red;
        border-color:red;
      }

      a.order-btn-ok{
        color:#7ADC4D;
        border-color:#7ADC4D;
      }

      a.order-btn-del{
        color:#FF8901;
        border-color:#FF8901;
      }

      a.order-btn-endtime{
        color:#808080;
        border-color:#808080;
      }

      a.order-btn-endbuy,a.order-btn-updatemoney,a.order-btn-lookmoney{
        color:#FF8901;
        border-color:#FF8901;
      }


    }

  }
}

#passOrder_bs{
	position:absolute;
	left: 0;
	top: 4.3rem;
	right: 0;
	bottom: 0;
}


</style>
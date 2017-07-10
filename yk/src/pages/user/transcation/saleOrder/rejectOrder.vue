<template>
	

<div class="auditOrder_page">
	<header-top title='未通过' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content my-order">
        <div class="order-list">

            <!--审核中-->
            <ul class="order-state-1" v-if="active==1">
                <li v-for="(item,index) in orderList">
                    <div class="order-tit">
                        <span class="tit" v-text="item.t_id"></span>
                        <span class="order-state-suc">未通过</span>
                    </div>
                    <div class="order-info">
                        <div class="order-flex">
                            <div class="order-img">
                                <!--<img src="../../images/center/order_pic.png" alt="">-->
                                <img v-bind:src="splitImg(item.p_file)" alt="">
                            </div>
                            <div class="order-param">
                                <h3>{{item.t_title}}</h3>
                                <p><span>数量：</span>{{item.t_quality+''+item.dw_name}}</p>
                                <p><span>地区：</span>{{item.dz_name}}</p>
                                <p><span>上线时间：</span>{{item.release_time.substring(0,10)}}</p>
                            </div>

                        </div>
                        <div class="order-btn">

                            <a @click.stop="deleteOrder(item.t_id,index)" class="order-btn-del">删除</a>
                            <a @click.stop="showReason(index)" class="order-btn-del">查看原因</a>
                            <a @click.stop="updateOrder(item.t_id)" class="order-btn-del">修改</a>

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

export default{
	components:{
		headerTop
	},
	data(){
		return{
			active:1,
            orderList:[],//审核中
            pageNo:1,
		}
	},
	mounted(){

		this.$nextTick(()=>{
			this.queryOrderInfo();
		})

	},
	methods:{
		updateOrder(id){
            this.$router.push({path:"/user/transcationList/saleOrder/rejectOrder/updateOrder",query:{id:id}})
		},

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
            				vm.orderList.splice(ind,1);//从显示数据中删除元素
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



		showReason(ind){
			let vm = this
			layer.open({
				content:vm.orderList[ind].t_reason,
				btn:'确定'
			})
		},

		splitImg(src){
			return src.split(',')[0]
		},
		queryOrderInfo(){

			this.$http.post('/ZBGL',{vip:this.$store.getters.getVip,pageNo:this.pageNo,type:3}).then((res)=>{
				if(res.data.code == 0){
					this.orderList = res.data.response;
				}
			})

		}
	}
}

</script>


<style lang='less' scoped>

@import '../../../../assets/css/variable';	

.auditOrder_page{
	.fixed();
	z-index:999;
}


.order-btn{
	border-top: 1px solid #F0F0F0;
    padding: 0.3125rem 0;
}

.my-order .order-list .order-btn a{
	width: 3.75rem;
    box-sizing: border-box;
    margin: 0 .3rem;
    height: 100%;
    font-size: .6rem;
    text-align: center;
    border-radius: 4px;
    border: 1px solid orange;
    padding: .3rem;
    color: orange;
}

</style>
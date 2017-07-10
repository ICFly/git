<template>
	

<div class="auditOrder_page">
	<header-top title='审核中' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content my-order">
        <div class="order-list">

            <!--审核中-->
            <ul class="order-state-1" v-if="active==1">
                <li v-for="(item,index) in orderList" @click='toPage("/user/transcationList/saleOrder/auditOrder/orderDetail?id="+item.t_id)'>
                    <div class="order-tit">
                        <span class="tit" v-text="item.t_id"></span>
                        <span class="order-state-suc">审核中</span>
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
                        <div class="order-btn" v-if="false">
                            <a @click="toPage('/xhjy/wycj.html')" v-if="item.t_price > 0" class="order-btn-ok f_right">继续还价</a>
                            <a @click="toPage('/xhjy/wycj.html?id='+item.t_id)" v-else class="order-btn-ok f_right">我要出价</a>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    </div>


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
		// this.$nextTick((){

		// 	this.queryOrderInfo();
		// })
	},
	methods:{
		splitImg(src){
			return src.split(',')[0]
		},
		toPage(url){
			this.$router.push(url);
		},
		queryOrderInfo(){

			this.$http.post('/ZBGL',{vip:this.$store.getters.getVip,pageNo:this.pageNo,type:2}).then((res)=>{
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


</style>
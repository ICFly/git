<template>
	
<div class="vipService_page">

<header-top></header-top>
<div class="fixed-top-div"></div>

<div class="img">
	<img width="100%" src="../../../assets/imgs/center/vip-service.jpg" alt="">
</div>	

</div>

</template>

<script>
import headerTop from '@/components/header/header'	
export default{
	components:{
		headerTop
	},
	props:{
		userInfo:{
			tyep:Object,
		}
	},
	mounted(){
		this.$nextTick(()=>{
			if(!this.userInfo.vipState){
	        	this.$router.go(-1);
	      	}
		})
	}
}

</script>

<style lang='less' scoped>
@import '../../../assets/css/variable';

.vipService_page{
	.fixed();
}	
.img{
	padding:.2rem;
}
</style>
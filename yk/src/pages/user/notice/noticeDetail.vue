<template>
	
<div class="noticeDetail_page">
	<header-top></header-top>
	<div class="fixed-top-div"></div>


    <div class="content">
        <div class="notice-info" v-html="notice.n_content">
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
			notice:{}
		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.queryInfo();
		})
	},
	methods:{
		queryInfo(){

			console.log(this.$route.query);

			
			this.$http.post('/NoticeDetail',this.$route.query).then((res)=>{


				console.log(res);

				if(res.data.code == 0){
					this.notice = res.data.response;
				}
			})
		}
	}
}

</script>
<style lang='less' scoped>
@import '../../../assets/css/variable';
.noticeDetail_page{
	.fixed();
}	

</style>
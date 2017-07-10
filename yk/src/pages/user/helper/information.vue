<template>
	<div class="infomation_page">
	<header-top title='详细信息' back></header-top>
	<div class="fixed-top-div"></div>

		<section>
			<h3>{{helper.title}}</h3>
			<section class='content'>
				{{helper.content}}

			</section>
		</section>
		
	</div>
</template>
<script>
import headerTop from '@/components/header/header'

	export default{
		components:{
			headerTop
		},
		props:{
			helper:{
				type:Object,
				default:{
					title:"this is title",
					content:"this is content"
				}
			}
		}

	}
</script>

<style lang='less' scoped>
@import '../../../assets/css/variable.less';


.infomation_page{
	.fixed();
}



h3{
	text-align: center;
	font-size:.8rem;
	margin:1rem 0;
}

.content{
	font-size:.7rem;
	text-indent: 2em;
	padding:0 .5rem;
	line-height:1.1rem;
	padding-bottom:2rem;
}


</style>
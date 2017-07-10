<template>
	<div class='footer'>
		<ul>
			
<!-- 
			<li>
				<router-link to='/sale' class='rounter-link-active'>现货交易</router-link>
			</li>
			<li>
				<router-link to='/supply'>采购供应</router-link>
			</li>
			<li>
				<router-link to='/info'>行情资讯</router-link>
			</li>
			<li>
				<router-link to='/user'>个人中心</router-link>
			</li> -->

			<li @click='toUrl("/sale")'>
				<p class="footer_icon1"  :class=" {'active':$route.path.indexOf('sale')!== -1 } "></p>
				<span>{{$t("footTitle[0]")}}</span>
			</li>

			<li @click='toUrl("/supply")'>
				<p class='footer_icon2' :class=" {'active':$route.path.indexOf('supply')!== -1||$route.path.indexOf('purchase')!== -1 } "></p>
				<span>{{$t("footTitle[1]")}}</span>
			</li>

			<li @click='toUrl("/info")'>
				<p class='footer_icon3' :class=" {'active':$route.path.indexOf('info')!== -1 } "></p>
				<span>{{$t("footTitle[2]")}}</span>
			</li>
			<li @click='toUrl("/user")'>
				<!-- <p v-if=" $route.path.indexOf('user') !== -1 "><img src="../../assets/imgs/icon_footer4.png"/></p>
				<p v-else><img src="../../assets/imgs/icon_footer44.png"/></p> -->
				<p class='footer_icon4' :class=" {'active':$route.path.indexOf('user')!== -1 } "></p>
				<span>{{$t("footTitle[3]")}}</span>
			</li>
		

		</ul>
	</div>
</template>

<script>



export default{

	// data:{
	// 	return (){
	// 		text:''
	// 	}
	// },
	data(){
		return{
			lang:navigator.language

		}
	},

	computed:{

		// count(){
		// 	// return this.$store.state.count;
		// 	// console.log(this.$store.store.state.count);
		// 	return this.$store.store.state.count
			
		// },
		
	},
	methods:{


		toUrl(url){

			this.$router.push(url);
		
		},
		
	}

}

</script>

<style scoped lang='less'>
@import '../../assets/css/variable.less';
/*@import '../../assets/css/mixin.scss';*/
	


/*.icon_style{
	width: 0.8rem;
    height: 0.8rem;
    margin-bottom: .2rem;
    margin-top: .3rem;
    fill: #ccc;
}	*/



.footer_icon1{
	background: url('../../assets/imgs/icon_footer1.png') no-repeat center center;
}
.footer_icon1.active{
	background: url('../../assets/imgs/icon_footer11.png') no-repeat center center;
}
.footer_icon2{
	background: url('../../assets/imgs/icon_footer2.png') no-repeat center center;
}
.footer_icon2.active{
	background: url('../../assets/imgs/icon_footer22.png') no-repeat center center;
}
.footer_icon3{
	background: url('../../assets/imgs/icon_footer3.png') no-repeat center center;
}
.footer_icon3.active{
	background: url('../../assets/imgs/icon_footer33.png') no-repeat center center;
}
.footer_icon4{
	background: url('../../assets/imgs/icon_footer4.png') no-repeat center center;
}
.footer_icon4.active{
	background: url('../../assets/imgs/icon_footer44.png') no-repeat center center;
}


/*.footer_icon[*].active+span{
	color:#7ADB4C;
}*/






.footer{
	position:fixed;
	z-index:9;
	left:0;
	bottom:0;
	width:100%;
	height:2rem;
	overflow: hidden;
	background: #F9F9F9;
	border-top: 1px solid #e3e3e3;

}

.footer ul{
	/*display:flex;*/
	display: flex;
}


.footer li{
	flex:1;
	/*line-height:40px;*/
	/*text-align: center;*/
	color:#fff;
	/*height:2rem;*/
	display: flex;
	align-content: center;

	flex-direction: column;

	text-align: center;
	/*padding:.1rem 0;*/




	span{
		color:#888888;
		font-size:.5rem;
	}

	p{
		height:1.1rem;
		background-size: 1.1rem !important;
		margin:.1rem 0;

	}

	span{
		/*height:1.2rem;*/
		/*margin:.2rem 0 1px 0;*/

		background-size:auto 1rem !important;
		align-items: center;
		justify-content: center;
	}

    
    /*text-align: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;*/

    /*flex-direction: column;*/

    /*align-items: center;*/



	p.active+span{
		color:#7ADB4C;
	}

}

</style>
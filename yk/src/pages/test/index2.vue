<template>
	
<div id='box' class="swiper-container">
	
<div class="swiper-wrapper">
	<ul class="swiper-slide slide1"></ul>
	<ul class="swiper-slide slide2"></ul>
	<ul class="swiper-slide slide3">
		<li>
			<div>
				<form action="">
					<div class="form-group">
						<label for="name">name:</label>
						<input type="text" id="name">
					</div>
				</form>
			</div>
		</li>
		<li>On production use files (JS and CSS) only from dist/ folder, there will be the most stable versions, build/ folder is only for development purpose</li>
		<li>On production use files (JS and CSS) only from dist/ folder, there will be the most stable versions, build/ folder is only for development purpose</li>
		<li>On production use files (JS and CSS) only from dist/ folder, there will be the most stable versions, build/ folder is only for development purpose</li>
		<li>On production use files (JS and CSS) only from dist/ folder, there will be the most stable versions, build/ folder is only for development purpose</li>
		<li>On production use files (JS and CSS) only from dist/ folder, there will be the most stable versions, build/ folder is only for development purpose</li>
	</ul>
</div>


</div>
	

</template>

<script>
	
import swiper from 'swiper'

// console.log(swiper);

export default{
	data(){
		return{
			scroller:null
		}
	},
	mounted(){


		this.$nextTick(()=>{
			console.log(1212);


			this.scroller = new swiper(".swiper-container",{
				// autoplay: 5000,
				direction:'vertical',
				initialSlide :3,
			})

		})
	}



}


</script>

<style lang='less'>
	
#box{
	/*font-size:.6rem;*/
	padding:.5rem;

	position: absolute;
	top:0;
	/*bottom:2rem;*/
	bottom:0;
	left:0;
	right:0;
	overflow: hidden;


	li{
		font-size:.6rem;
		margin:.5rem 0;
		line-height: 1rem;
		text-indent: 2em;
	}

	.form-group{
		margin:.5rem 0;
		border:1px solid #ddd;
		border-radius: .5rem;

		display: flex;
		justify-content: flex-start;
		align-items: center;

		label{
			text-align: center;
		}
		input{
			height:2rem;
			padding:.5rem .2rem;
		}
	}


	.slide1{
		background: #69D975;
	}
	.slide2{
		background: #C739F5;
	}
	.slide3{
		background: #408EF3;
		overflow-y: scroll;

		overflow-scrolling:touch;
	}

}

</style>
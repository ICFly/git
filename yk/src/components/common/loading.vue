<template>
	<div class="loading">
		<img src="../../assets/imgs/load.gif">
	</div>
</template>

<script>
	
export default{


	mounted(){

		//开启遮罩，禁止滑动
		let vm = this;
		// document.addEventListener('touchmove',vm.handler,false)
		// window.addEventListener("touchstart", func, {passive: true} );
	},
	methods:{
		handler(){
			event.preventDefault();
		}
	},
	// 每次进入组件触发
	activated(){
		// console.log('activated')
	},
	// 退出组件触发
	deactivated(){
		//退出时解除 滑动事件
		let vm = this;
		document.removeEventListener('touchmove',vm.handler,false)

	}


}

</script>
<style>
	
.loading{
	position: fixed;

	top:0;
	bottom:0;
	left:0;
	right:0;
	background: rgba(255,255,255,.3);
	z-index:9999;

	display:flex;
	align-items: center;
	justify-content: center;
}

</style>














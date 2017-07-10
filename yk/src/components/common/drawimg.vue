<template>
	
<div>
	<canvas :id="id" width="100px" height="90px"></canvas>
</div>

</template>
<script>
export default{
	data(){
		return{
			newSrc:"",
		}
	},
	props:{
		src:{
			type:String,
		},
		id:{
			type:String,
		}
	},
	mounted(){
		this.$nextTick(()=>{
			// console.log(this.src);

			let img = new Image();

			img.src = this.src;

			img.onload = ()=>{
				var c = document.getElementById(this.id);
				if(c){
					var ctx = c.getContext("2d");
					// var img=document.getElementById("tulip");
					ctx.drawImage(img,0,0,img.width,img.height,0,0,100,90);
				}
			}

		})
	}



}
</script>

<style>
	
canvas{
	background: #ddd;
}

</style>
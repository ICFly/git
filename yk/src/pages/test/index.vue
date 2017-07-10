<template>
	

<div class="box">
	<form action="">
		<div class="form-group">
			<label for="">用户名1：</label>
			<input type="text">
		</div>
		
		<div class="form-btn">
			<button>提交</button>
		</div>

	</form>
</div>

</template>

<style lang='less'>
	
.box{
	font-size:.6rem;
	/*padding:.5rem;*/
	position: absolute;
	top:0;
	bottom:0;
	z-index:99999;
	left:0;
	right:0;
	background: #fff;
	overflow: hidden;

	overflow-scrolling:touch;
	
}

.form-group{
	/*height:1.5rem;*/
	padding:0 .5rem;
	border:1px solid #ddd;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-radius:1rem;
	margin:1px 0;
	/*margin:.5rem 0;*/
	

	label{
		width:25%;
	}
	input{
		height:2.2rem;
		padding:.3rem 0;
		width:75%;
	}


}



</style>


<template>
	
<div>
	

<!-- 选择单位框 -->
	<!--  -->
  <div class="layui-m-layer" index="1" style="z-index:9998"  v-if=" showSelectBox ">
    <div class="layui-m-layershade"></div>
  </div>


  <div class="selectBox" id='selectBox' v-if=" showSelectBox ">

<!--     <div class="selectBox_cell" v-show=" showSelectBoxId == 1 ">
      <h3>选择包装类型</h3>
      <ul>
        <li v-for="(item,index) in unitList.Packs" @click=" selectPack(item) " v-text="item.p_type"></li>
      </ul>
    </div> -->

    <slot></slot>

  </div>
<!-- +++++++++++++ -->

	

</div>

</template>
<script>


// import unit from '@/data/unit'


export default{
	data(){
		return{
			//showSelectBox:false,
			// unitList:[],
			// showSelectBox:false,
		}
	},
	props:{
		// showSelectBoxId{
		// 	type:Number,
		// },
		showSelectBox:{
			type:Boolean,
			default:false,
		}
	},
	mounted(){
		// this.unitList = unit;
	},
	methods:{

		// selectPack(item){
		// 	this.$emit("selectPack",item)
		// },
		// selectCurrency(item){
		// 	this.$emit("selectCurrency",item)
		// },
		// selectUnit(item){
		// 	this.$emit("selectUnit",item)
		// },
		// selectTradeType(item){
		// 	this.$emit("selectTradeType",item)
		// },
		// selectEndTime(item){
		// 	this.$emit("selectEndTime",item)
		// },
		// selectGetTime(item){
		// 	this.$emit("selectGetTime",item);
		// },



	}
}

</script>


<style scoped lang='less'>
	
/*@import '../../assets/variable';*/


.layui-m-layer{
	position:fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
}

.selectBox{

  z-index:9999;
  position: fixed;
  width:50%;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
  text-align:center;
  display:flex;
  align-items:center;
  span{
  	display: block;
  	margin-left: -22%;
  	width: 144%;
  	font-size: .6rem;
    -webkit-transform: scale(0.8) !important;
  }

  h3{
    font-size:.7rem;
    padding:.5rem 0;
  }
  .selectBox_cell{
    width:100%;
    background: #fff;
    padding:0 10%;
    max-height:70%;
    overflow: scroll;
  }
  

  li{

    line-height: 2.1rem;
    font-size:.6rem;
    color:#444444;
    border-bottom:1px solid #37C6BD;
  }

  li:last-child{
    border:none;
  }

}


	
	

</style>
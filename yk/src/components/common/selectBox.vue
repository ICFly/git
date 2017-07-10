<template>
	
<div>
	

<!-- 选择单位框 -->

  <div class="layui-m-layer" index="1" style="z-index:9999" @click=" showSelectBox = false " v-if=" showSelectBox ">
    <div class="layui-m-layershade"></div>
  </div>


  <div class="selectBox" id='selectBox' v-if=" showSelectBox ">

    <div class="selectBox_cell" v-show=" showSelectBoxId == 1 ">
      <h3>选择包装类型</h3>
      <ul>
        <li v-for="(item,index) in unitList.Packs" @click=" selectPack(item) " v-text="item.p_type"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 2 ">
      <h3>交易币种</h3>
      <ul>
        <li v-for="(item,index) in unitList.Currencys" @click="selectCurrency(item)" v-text="item.c_name"></li>
      </ul>
    </div>


    <div class="selectBox_cell" v-show=" showSelectBoxId == 3 ">
      <h3>单位</h3>
      <ul>
        <li v-for="(item,index) in unitList.Units" @click="selectUnit(item)" v-text="item.u_name"></li>
      </ul>
    </div>


    <div class="selectBox_cell" v-show=" showSelectBoxId == 4 ">
      <h3>包装方式</h3>
      <ul>
        <li v-for="(item,index) in unitList.Trades" @click="selectTradeType(item)" v-text="item.t_type"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 5 ">
      <h3>期限(天)</h3>
      <ul>
        <li v-for="item in 30" @click="selectEndTime(item)" v-text="item"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 6 ">
      <h3>期限</h3>
      <ul>

        <li v-for="item in 30" @click="selectGetTime(item)" v-text="item"></li>
        <li @click="selectGetTime('60')">90</li>
        <li @click="selectGetTime('90')">90</li>
        <li @click="selectGetTime('120')">90</li>
        <li @click="selectGetTime('150')">90</li>
        <li @click="selectGetTime('180')">90</li>
        
      </ul>
    </div>

  </div>

<!-- +++++++++++++ -->

	

</div>

</template>
<script>


import unit from '@/data/unit'


export default{
	data(){
		return{
			unitList:[],
			// showSelectBox:false,
		}
	},
	props:{
		showSelectBoxId{
			type:Number,
		},
		showSelectBox{
			type:Boolean,
			default:false,
		}
	},
	mounted(){
		this.unitList = unit;
	},
	methods:{

		selectPack(item){
			this.$emit("selectPack",item)
		},
		selectCurrency(item){
			this.$emit("selectCurrency",item)
		},
		selectUnit(item){
			this.$emit("selectUnit",item)
		},
		selectTradeType(item){
			this.$emit("selectTradeType",item)
		},
		selectEndTime(item){
			this.$emit("selectEndTime",item)
		},
		selectGetTime(item){
			this.$emit("selectGetTime",item);
		}



	}
}

</script>


<style scoped lang='less'>
	
@import '../../assets/variable';

.selectBox{

  z-index:99999;
  position: fixed;
  width:40%;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
  text-align:center;
  display:flex;
  align-items:center;

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

    line-height: 1.8rem;
    font-size:.6rem;
    color:#444444;
    border-bottom:1px solid #37C6BD;
  }

  li:last-child{
    border:none;
  }

}


	
	

</style>
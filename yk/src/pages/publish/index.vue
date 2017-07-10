<template>
	
<div class="publish_page">
	

	
	<header-top title='信息发布' back></header-top>
	<div class="fixed-top-div"></div>




    <div class="list">
        <ul>

           	<li @click="toPage('/publish/createTender')">发布现货交易</li>
           	<li @click="toPage2('/publish/createPurchase')">发布采购</li>
           	<li @click="toPage2('/publish/createSupply')">发布供应</li>

        </ul>
    </div>

	<div id="swiper">
	<transition>
		<router-view></router-view>
	</transition>
	</div>







<!-- 选择单位框 -->


<!-- 
  <div class="layui-m-layer" index="1" style="z-index:9999" @click=" closeMask " v-if=" showSelectBox ">
    <div class="layui-m-layershade"></div>
  </div>


  <div class="selectBox" id='selectBox' v-if=" showSelectBox ">

    <div class="selectBox_cell" v-show=" showSelectBoxId == 1 ">
      <h3>选择包装类型</h3>
      <ul>
        <li v-for="(item,index) in unitList.Packs" @click="pack=item" v-text="item.p_type"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 2 ">
      <h3>交易币种</h3>
      <ul>
        <li v-for="(item,index) in unitList.Currencys" @click="currency = item" v-text="item.c_name"></li>
      </ul>
    </div>


    <div class="selectBox_cell" v-show=" showSelectBoxId == 3 ">
      <h3>单位</h3>
      <ul>
        <li v-for="(item,index) in unitList.Units" @click="unit=item" v-text="item.u_name"></li>
      </ul>
    </div>


    <div class="selectBox_cell" v-show=" showSelectBoxId == 4 ">
      <h3>包装方式</h3>
      <ul>
        <li v-for="(item,index) in unitList.Trades" @click="tradeType=item" v-text="item.t_type"></li>
      </ul>
    </div>

    <div class="selectBox_cell" v-show=" showSelectBoxId == 5 ">
      <h3>期限</h3>
      <ul>

        <li v-for="item in 30" @click="getTime = item" v-text="item"></li>
        <li @click="getTime = 60">60</li>
        <li @click="getTime = 90">90</li>
        <li @click="getTime = 120">120</li>
        <li @click="getTime = 150">150</li>
        <li @click="getTime = 180">180</li>
        
      </ul>
    </div>

  </div>

 -->



<!-- +++++++++++++ -->
















</div>

</template>
<script>
	
import {checkLogin,checkLogin2,checkAndToAuthen} from '@/tool/tool'

import headerTop from '@/components/header/header'

export default{
	components:{
		headerTop
	},
	methods:{
		//同时验证登录和实名认证
		toPage(url){
			if(!checkLogin2(true)) return;
			if(!checkAndToAuthen(this)) return;
			this.$router.push(url)
		},
		//只检查登录
		toPage2(url){
			if(!checkLogin2(true)) return;
			this.$router.push(url)
		}
	}

	}
</script>

<style lang='less'>
@import '../../assets/css/variable.less';	

.layui-m-layer0 .layui-m-layerchild{

	/*height:80%;*/
	/*height:300px;*/
	overflow:hidden;
}

/* 显示规则 */
.layui-m-layercont{
	overflow-y:scroll;
	/*text-align:left;*/
	padding:2rem 1rem;
	max-height:16rem;
	/*height:100%;*/
}


#swiper{
	position: absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
}

input[type=radio],input[type=checkbox]{
	opacity:0 !important;
	display:none !important;

}

.publish_page{

	.fixed();
	/*background:#f5f5f5;*/
/*	width:100%;
	height:100%;*/
}

.list{

	position: relative;
	z-index:9;
	li{
		line-height:1.8rem;
		border-bottom:1px solid #ccc;
		font-size:.8rem;
		padding:.3rem 1rem;
		color:#555;
		position: relative;


		&:after{

			content:'';
			width:.6rem;
			height:.6rem;
			border-top:2px solid #ccc;
			border-right:2px solid #ccc;
			right:1rem;
			top:0;
			bottom:0;
			margin:auto;
			position:absolute;
			transform:rotate(45deg);



		}
	}
}





</style>
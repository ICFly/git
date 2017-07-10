<template>
	
<div class="city_page">
	


	<header-top title="选择分类"></header-top>
	<div class="fixed-top-div"></div>

	<div class='search_group' v-show="false">
	<!-- <label for="">名称</label> -->
	<input type="text" v-model:value="queryWords" placeholder="请输入查找分类名称">
</div>


<div class="product_list">
	<section id="list1">
		<ul class="hot">
			<li v-for='(item,index) in productType1' 
			:class="{on:currentProductType1 == item.p_id,search:item.p_name.indexOf(queryWords)>=0&&queryWords}"
			@click="currentProductType1 = item.p_id" :data-id="item.p_id" :data-level="item.p_level">
				<span class="category_name">{{item.p_name}}</span>
			</li>
		</ul>
	</section>	

	<section id='list2'>
		<ul class="hot">
			<li v-for='(item,index) in selectProductByType1' 
			:class="{on:currentProductType2 == item.p_id,search:item.p_name.indexOf(queryWords)>=0&&queryWords}"
			@click="currentProductType2 = item.p_id" :data-id="item.p_id" :data-level="item.p_level">{{item.p_name}}</li>
		</ul>
	</section>	
	
	<section id='list3'>
		<ul class="hot">
			<li v-for='(item,index) in selectProductByType2' 
			:class="{on:currentProductType1 == item.p_id,search:item.p_name.indexOf(queryWords)>=0&&queryWords}"
			@click="selectProductType"
			:data-id="item.p_id" :data-level="item.p_level">{{item.p_name}}</li>
		</ul>
	</section>
	
	

</div>

<div style='background:rgba(0,0,0,.3);height:100%'></div>

</div>


</template>

<script>
	
import productList from '@/data/type'
import headerTop from '@/components/header/header'
import bScroll from 'better-scroll'
// console.log(city);

export default{

	components:{
		headerTop
	},
	created(){
		// console.log(city);
	},
	mounted(){
		this.$nextTick(()=>{

			this.initList();
			this.scroll();
			//console.log(this.filterList);
		})
	},
	methods:{
		scroll(){
			this.scroller1 = new bScroll('#list1',{
				click:true,
			})
			this.scroller2 = new bScroll('#list2',{
				click:true,
			})
			this.scroller3 = new bScroll('#list3',{
				click:true,
			})
		},
		refresh(){
			setTimeout(()=>{
				this.scroller1.refresh();
				this.scroller2.refresh();
				this.scroller3.refresh();
			},100)
		},
		selectProductType(){
			let e = event || window.event;
			let target = event.target || e.scrElement;
			// console.log(target);
			// return target;
			this.$emit('selectProductType',target)
		},

		initList(){
			// console.log(productList);
			productList.filter((val)=>{
				if(val.p_level==1){
					this.productType1.push(val)
				}else if(val.p_level==2){
					this.productType2.push(val)
				}else{
					this.productType3.push(val)
				}
			})
		}
	},
	watch:{
		currentProductType1(val,old){
			//console.log(val);
			this.refresh();
		},
		currentProductType2(val,old){
			//console.log(val);
			this.refresh();
		},
		queryWords(val,old){
			//console.log(val);
			this.refresh();
		}
	},
	computed:{
		selectProductByType1(){
			return this.productType2.filter((val)=>{
				if(this.currentProductType1 == val.p_super){
					return val;
				}
			})
		},
		selectProductByType2(){

			return this.productType3.filter((val)=>{
				if(this.currentProductType2 == val.p_super){
					return val;
				}
			})
		},


	},
	data(){
		return{
			queryWords:"",

			productType1:[],
			productType2:[],
			productType3:[],

			currentProductType1:'',
			currentProductType2:'',
			currentProductType3:'',
			scroller1:null,
			scroller2:null,
			scroller3:null,
		}
	}


}


</script>

<style lang='less' scoped>

@import '../../assets/css/variable';
.city_page{
	.fixed();
	z-index:999;
	overflow: hidden;

	background: #f5f5f5;
}



.search_group{

    width: 90%;
    margin:.5rem auto;
    text-align: center;


	input{

	    border: 1px solid #e4e4e4;
	    padding: .3rem 0.3rem;
	    font-size: 0.6rem;
	    color: #333;
	    width:90%;
	    border-radius:.5rem;


	}

}


.product_list{

	display: flex;
	overflow: hidden;
	height:50%;


	section{
		flex:1;
		overflow:hidden;

		ul{
			overflow:hidden;
			/*overflow: scroll;*/
			-webkit-overflow-scrolling : touch;
			/*overflow-scroling:touch;
			-webkit-overflow-scrolling: touch;*/

			/*height:100%;*/
		}
		
	}

	section:first-child{
		background: #F1F1F1;
	}
	section:last-child{
		background: #F1F1F1;
	}

	li{

	    font-size: 0.6rem;
	    color: #666;
	    line-height: 1.5rem;
	    padding:0 .3rem;
	    overflow: hidden;
	    /*text-align: center;*/

	    /*display: flex;*/
	    /*justify-content: space-between;*/

	    text-align: center;
	    text-overflow: ellipsis;
    	white-space: nowrap;
	    span{
	    	/*justify-content: flex-start;*/
	    	/*justify-content: space-around;*/
	    }
	}

	.category_count{
/*		text-align: right;
		background: #ccc;
		color:#fff;*/
/*		background-color: #ccc;
	    font-size: 0.5rem;
	    color: #fff;
	    
	    border-radius: 0.8rem;*/
	  
	   
	}

	li.on{
		background: #d5d7da;
	}
	li.search{
		color:#f00;
	}
}








.city_list{


	.title{
	    color: #666;
	    font-weight: 400;
	    text-indent: 0.45rem;
	    border-top: 1px solid #e4e4e4;
	    border-bottom: 1px solid #e4e4e4;
	    font: 0.55rem/1.45rem "Helvetica Neue";
	}

	.hot{


		li{

			float: left;
		    text-align: center;
		    color: #3190e8;
		    border-bottom: 0.025rem solid #e4e4e4;
		    border-right: 0.025rem solid #e4e4e4;
		    width: 25%;
		    height: 1.75rem;
		    font: 0.6rem/1.75rem "Microsoft YaHei";
		    overflow: hidden;

		}
	}
}



</style>
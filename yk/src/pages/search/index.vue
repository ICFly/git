<template>
	



<div class="search_page">
	

	<header-top title="搜索" back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content">

	    <div class="header-top">
	        <div class="search-box2">
	            <div class="form-group">
	                <p class="p_r">
	                    <input type="text" v-model:value="searchWords" placeholder="请输入产品相关信息" class="form-control"/>
	                    <i class="icon icon-search"></i>
	                    <span class="form-btn" @click="search">搜索</span>
	                </p>

	            </div>
	            <div @click="clearHistory" class="clean">清除历史记录</div>
	        </div>
	    </div>

	    <div class="history_words" @click="searchByHistory">
	    	<label v-for="(item,index) in historyList">{{historyList[historyList.length - index-1]}}</label>
	    </div>
	    
    </div>

</div>

</template>



<script>
	
import {getStore,setStore} from '@/config/util'	
import headerTop from '@/components/header/header'	


export default{

	components:{
		headerTop
	},
	data(){
		return{
			searchWords:"",
			historyList:[],//历史记录
		}
	},
	mounted(){

		this.$nextTick(()=>{

			this.getHistoryList();
			//test
			let arr = [1,23,'dhel','hello'];
			arr.forEach((val,ind)=>{
				console.log(ind+"==="+val);
			})

		})
	},

	methods:{
		//清除历史记录
		clearHistory(){

			//清空记录
			window.localStorage.setItem("historyList","");
			this.getHistoryList();
		},

		//读取历史记录
		getHistoryList(){
			if(getStore('historyList')){
				 this.historyList = JSON.parse(getStore('historyList'));
			}else{
				this.historyList =  [];
			}
		},

		searchByHistory(){
			let e = event.target;

			if(e.nodeName.toLowerCase() != "label") return;
			this.$router.push({path:'/searchListBy',query:{key:e.textContent}})

		},
		//搜索
		search(){

			if(!this.searchWords) return;
			//如果已经录入当前关键字，则不继续录入，否者录入
			if(this.historyList.indexOf(this.searchWords) < 0){

				this.historyList.push(this.searchWords);
				let val = JSON.stringify(this.historyList);
				setStore("historyList",val)

			}


			this.$router.push({path:'/searchListBy',query:{key:this.searchWords}})

		}
	}


}



</script>


<style lang='less' scoped>
	

@import '../../assets/css/variable';



.search_page{
	.fixed();

	background: #f5f5f5;
}

.header-top{
	height:auto;
	background: none;
}

.p_r{
	position: relative;
	display: flex;
	justify-content: center;
	width:80%;
}

.clean{
	text-align: center;
	font-size:.6rem;
	padding:.3rem;
	color:#0E61A3;
	border-bottom:1px solid #ddd;
}
.search-box2{
/*padding:12px 0;*/

.form-control{

  padding:.3rem 0;
  width:100%;
  border-radius:.8rem;
  box-sizing: border-box;
  position: relative;
  font-size:.6rem;

  padding-left:1.8rem;
  background-color:#fff;
  display: flex;
  align-items: center;
  border:1px solid #CECDCC;

}


.form-btn{
line-height: 25/@root-font-size;
  color:#fff;
  font-size:.7rem;
  color:#2D78C3;
  background: none;
  width:2rem;
  margin-left:6/@root-font-size;

}

.form-group{
	margin-top:1px;
  display: flex;
  justify-content: center;

  /*background: #a9e2c0;*/
  background: #f1f1f1;
  padding:1.5rem 0;
  border-bottom:1px solid #DFDFDF;

  i{
    content:'';
    position: absolute;
    width:1rem;
    height:1rem;
    background: url('../../assets/imgs/xhjy/icon_search.png') no-repeat center center;
    background-size:auto 15/@root-font-size;
    left:4%;
    top:0;
    bottom:0;
    margin:auto;
  }
}

}


.history_words{

	padding:1rem .2rem;
	font-size:.6rem;

	text-align: center;


	label{


		padding:.12rem .4rem;
		background: #46C95E;
		color:#fff;
		border-radius:.5rem;
		margin:.3rem .3rem;

		display: inline-block;


	}
}





</style>
<template>
<section v-show=' sortBy == "type" ' class='sort_menu_type'>

	<section>
		<!-- <header>一类</header> -->
		<ul @click='changeType("type1")'>
			<!-- <li class="category-activity">电子电器</li><li >金属</li><li >设备</li><li >机械</li><li >塑料</li><li >废纸</li><li >其他综合</li> -->
			<!--<li data-level='' data-id=''>全部</li>--> 
			<li :class='{"category-activity":item.p_id == currentTypeId1}' :data-level='item.p_level' :data-id='item.p_id' v-for="item in typeList['type1'] ">{{item.p_name}}</li>
		</ul>

	</section>
	<section>
		<!-- <header>二类</header> -->
		<ul @click='changeType("type2")'>
			 <li data-level='2' data-id='all'>全部</li> 
			<li :class='{"category-activity":item.p_id == currentTypeId2}' :data-level='item.p_level' :data-id='item.p_id' v-for=" item in typeList['type2'] ">{{item.p_name}}</li>
		</ul>
	</section>
	<section>
		<!-- <header>三类</header> -->
		<ul @click='changeType("type3")' v-if=" typeList['type3']!='' ">
			<li data-level='3' data-id='all'>全部</li> 
			<li :class='{"category-activity":item.p_id == currentTypeId3}' :data-level='item.p_level' :data-id='item.p_id' v-for=" item in typeList['type3'] ">{{item.p_name}}</li>
		</ul>
		<ul v-else>
			<li style='color:#ff5e55;'>...</li>
		</ul>
	</section>
</section>
</template>



<script>



import types from '@/data/type.json'

export default{
	props:{
		sortBy:'',
	},
	data(){
		return{
			typeList:{type1:[],type2:[],type3:[]},
			currentTypeId1:0,
			currentTypeId2:0,
			currentTypeId3:0,
			// currentCityId:0,
		}
	},
	created(){
		this.initData();
	},
	methods:{
		//加载数据
		initData(){

			types.filter((val)=>{
				// console.log(val);
				if(val['p_level']==1){
					this.typeList.type1.push(val);
				}else if(val['p_level']==2){
					this.typeList.type2.push(val);
				}else{
					this.typeList.type3.push(val);
				}
			})

		},
		changeType(obj){
			let e = event||window.event;
			var target = e.target||e.srcElement;

			if(obj=="type1"){
				this.typeList['type2'] = [];
				this.typeList['type3'] = [];
				types.filter((val)=>{
					if(val['p_super']==target.getAttribute("data-id")){
						this.typeList['type2'].push(val);
					}
				})

				//选择当前选项
				this.currentTypeId1 = target.getAttribute("data-id");
				


			}else if(obj=="type2" /*&& target.textContent =="中国"*/){

				this.typeList['type3'] = [];
				types.filter((val)=>{
					if(val['p_super']==target.getAttribute("data-id")){
						this.typeList['type3'].push(val);
					}
				})
				this.currentTypeId2 = target.getAttribute("data-id");
			}else{
				this.currentTypeId3 = target.getAttribute("data-id");
			}
			this.$emit('changeType',target)

		}
	}





}
	
</script>


<style lang='less' scoped>
@import '../../assets/css/variable';	


.search-box{
  /*padding:.2rem 0;*/
  height:2rem;
  line-height:2rem;


  .form-control{
    line-height:1rem;
    border-radius:1rem;
    box-sizing: border-box;
    position: relative;
    padding:.3rem 20%;
    background-color:#fff;
    width:100%;
    font-size:.7rem;



  }
  .form-btn{
    color:#fff;
    font-size:1px*@font-default-size;
    background: none;
    margin-left:.1rem;

  }

  .form-group{

	p{
		width:65%;
		margin:0 auto;
		position: relative;
	}

    i{
      content:'';
      position: absolute;
      width:1rem;
      height:1rem;
	
      background: url('../../assets/imgs/xhjy/icon_search.png') no-repeat center center;
      background-size:auto 1rem;
      left:.55rem;

      top:.67rem;
     


      display: flex;

		justify-content: center;
		align-items: center;


    }
  }
}

.search-list{
  display: flex;
  padding-top:.1rem;
  height:2rem;

  .sort-title{
  	text-align: center;
  	overflow: hidden;
  	white-space: nowrap;
  }
  .sort-title.activity{
  	span{
  		color:#fffb44;
  		overflow: hidden;
  		text-overflow: ellipsis;
  		white-space: nowrap;
  		max-width:4em;
  		/*width:2em;*/
  	}
  }
  li{
    flex:1;
    line-height:1.6rem;
    color:#fff;
    /*position: relative;*/

	.sort-title{
		position: relative;

		display: flex;
		justify-content: center;
		align-items: center;


		span{
			color:#fff;
			font-size:.7rem;
			overflow: hidden;
	  		text-overflow: ellipsis;
	  		white-space: nowrap;
	  		max-width:5em;
		}

	    img{
	      height:1rem;
	      margin-right:.3rem;
	      vertical-align: middle;
	    }
	}

    .sort-title:after{
      content:'';
      width:1px;
      background: #fff;
      height:1.3rem;
      position: absolute;
      right:0;
      top:0;
      bottom:0;
      margin:auto;

    }

  }
  .sort-title:last-child{
    &:after{
      content:none;
    }
  }



.sort_menu_type{


	position:absolute;
	/*border-top:1px solid #fff;*/

	width:100%;

	height:13rem;
	background: #F1F1F1;

	display: flex;
	overflow: hidden;
	left:0;


	section{
		flex:1;
		text-align: center;

		border-right:1px solid #fff;
		font-size:.8rem;

	    flex: 1;
	    /*padding-left: 0.5rem;*/
	    /*height: 16rem;*/
	    overflow-y: auto;

		 -webkit-overflow-scrolling: touch;
		 overflow-scrolling:touch;


	}

	header{
		color:#595959;
	}

/*	section:last-child{
		border:none;
		background: #fff;
	}*/
	/*section:nth-child(2){
	}
*/
	ul{
		 
	}

	li{

/*	  
	    height: 1.8rem;
	    line-height: 1.8rem;
	    color:#333;*/

	    font-size: 0.7rem;
	    color: #666;
	    line-height: 1.8rem;



	    overflow: hidden;
	    text-overflow: ellipsis;
		white-space: nowrap;



	}

	li.category-activity{
		background: #FFFFFF;
	}

}





}





</style>
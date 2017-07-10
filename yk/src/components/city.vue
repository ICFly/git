<template>
	


<section v-show=' sortBy == "area" ' class='sort_menu_type'>

		<section>
			<!-- <header>州</header> -->
			<ul @click='changeCity("city1")'>
			
			<li :class="{'category-activity':currentCityId1 == item.a_id}" :data-level='item.a_level' v-for="item in cityList['city1']" :data-id='item.a_id'>{{item.a_name}}</li>

			</ul>
		</section>

		<section>
			<!-- <header>国</header> -->
			<ul @click='changeCity("city2")'>
				<li data-level='2' data-id='all'>全部</li> 
				<li :class="{'category-activity':currentCityId2 == item.a_id}" :data-level='item.a_level' v-for="item in cityList['city2']" :data-id='item.a_id'>{{item.a_name}}</li>
			</ul>
		</section>

		<section>

			<!-- <header>省</header> -->
			<ul @click='changeCity' v-if=" cityList['city3']!='' ">
				<li data-level='3' data-id='all'>全部</li> 
				<li :class="{'category-activity':currentCityId3 == item.a_id}" v-for="item in cityList['city3']" :data-level='item.a_level' :data-id='item.a_id'>{{item.a_name}}</li>
			</ul>

			<ul v-else>
				<li style='color:#ff5e55;'>...</li>
			</ul>
		</section>
</section>
		                		




</template>


<script>
	
import city from '@/data/city.json'
	export default{

		props:{
			sortBy:"",
		},
		data(){
			return{
				cityList:{city1:[],city2:[],city3:[]},
				currentCityId1:0,
				currentCityId2:0,
				currentCityId3:0,
				// currentCityId,
				// currentCityId,
			}
		},
		created(){
			this.initData();
		},
		methods:{
			initData(){

				city.filter((val)=>{
					// console.log(val);
					if(val['a_level']==1){
						this.cityList.city1.push(val);
					}else if(val['a_level']==2){
						this.cityList.city2.push(val);
					}else{
						this.cityList.city3.push(val);
					}
				})
			},
			changeCity(obj){
				let event = event||window.event;
				let target = event.target||event.srcElement;

				if(obj=="city1"){
					//清空
					this.cityList['city2'] = [];
					this.cityList['city3'] = [];
					city.filter((val)=>{
						if(val['a_super']==target.getAttribute("data-id")){
							this.cityList['city2'].push(val);
						}
					})


					//选择当前选项
					this.currentCityId1 = target.getAttribute("data-id");
					


				}else if(obj=="city2" /*&& target.textContent =="中国"*/){

					this.cityList['city3'] = [];
					city.filter((val)=>{
						if(val['a_super']==target.getAttribute("data-id")){
							this.cityList['city3'].push(val);
						}
					})

					this.currentCityId2 = target.getAttribute("data-id");

				}else{

					this.currentCityId3 = target.getAttribute("data-id");
				}





				this.$emit("changeCity",target);
			}
		}

	}
</script>


<style lang='less' scoped>
@import '../assets/css/variable';	





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
   /* display: flex;
    justify-content: center;*/


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
	
      background: url('../assets/imgs/xhjy/icon_search.png') no-repeat center center;
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
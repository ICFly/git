<template>

<div class='supply-page'>
	<div class="cggy-index">

        <div class="header-top fixed-top">

            <ul class="tab-ul">
                <router-link to='/supply' class='on' tag='li'>供应</router-link>
                <router-link to='/purchase' tag='li'>采购</router-link>
            </ul>
            <ul class="search-list">
                <li>
                    <div class='sort-title' :class='{"activity":sortBy == "type" }' @click=' chooseType("type") '>
                      <img src="../../assets/imgs/xhjy/cg1.png" alt="">
                      <span>{{currentType.text ||'类别'}}</span>
                    </div>
                    <transition name='showlist'>
                      <!-- 类别选择组件 -->
                      <types :sortBy='sortBy' @changeType='changeType'></types>
                    </transition>
                </li>
                <li>
                    <div class='sort-title' :class='{"activity":sortBy == "area" }' @click=' chooseType("area") '>
                      <img src="../../assets/imgs/xhjy/cg2.png" alt="">
                      <span>{{currentCity.text ||'地区'}}</span>
                    </div>
                    <transition name=' showlist '>
                      <!-- 地区选择组件 -->
                      <city :sortBy='sortBy' @changeCity='changeCity'></city>
                    </transition>
                </li>
                <li >
                    <div class="sort-title" @click="toPage('/search')">
                      <img src="../../assets/imgs/xhjy/cg3.png" alt="">
                      <span>搜索</span>
                    </div>
                </li>
            </ul>
        </div>
        <div style='height:4rem;'></div>

        <transition name='showmask'>
          <div class="back-mask" v-show=' sortBy '></div>
        </transition>

        <div id="wrapper">
            <div id="scroller" class="product-list" ref='list_wrapper'>
                <ul class="order-state-4">
                    <li v-for="(item,index) in supplyList " @click='toPage("/supply/orderInfo?id="+item.s_id)'>
                        <div class="order-info">
                            <div class="order-flex">
                                <div class="order-img">
                                    <!--<img src="../../images/center/order_pic.png" alt="">-->
                                    <!-- <img :src=" getImg(item.p_file) " alt=""> -->
                                    <drawimg :src=" item.p_file.split(',')[0] " :id=" 'supply_'+index "></drawimg>
                                </div>
                                <div class="order-param">
                                    <h3 v-text="item.s_title"></h3>
                                    <p><span>数量：</span>{{item.s_quality}}{{item.dw_name}}</p>
                                    <p><span>地区：</span>{{item.dz_name}}</p>
                                    <p><span>发布时间：</span>{{ formatTime(item.pass_time) }}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-if='hasMore' class='more'>
                      <img src="../../assets/imgs/load.gif" alt="">
                      <span>加载中...</span>
                    </li>
                    <li v-else class="more" style='padding:1rem 0;'>
                      <span>没有了...</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
  <transition name='router-slide'>
    <router-view></router-view>
  </transition>

</div>
	

</template>



<script>


import {loadMore} from '@/config/util'
// console.log(getImg('1212121'))
import drawimg from '@/components/common/drawimg'

import types from '@/components/common/type'
import city from '@/components/city'

export default{
  data(){
    return{
      supplyList:[],//供应数据列表
      sortBy:'',
      currentCity:{
        id:"",
        text:'',
        level:""
      },
      currentType:{
        id:"",
        text:"",
        level:""
      },
        keepcurrentCity1:{text:"",id:"",level:""},
        keepcurrentCity2:{text:"",id:"",level:""},
        keepcurrentType1:{text:"",id:"",level:""},
        keepcurrentType2:{text:"",id:"",level:""},
      preventRepeat:false,//防止重复请求数据
      pageNo:1,//默认页码
      hasMore:true,//是否有更多

    }
  },
	components:{
    types,city,
    drawimg,
	},
	mounted(){

    this.$nextTick(()=>{
      this.querySupply();

      // console.log(this.$refs.list_wrapper);
      //加载更多
      // loadMore(this.$refs.list_wrapper,this.load);
    })
	},
  computed:{

    // getImg(src){
    //   console.log(src);
    //   return 'dd.jpg'
    // }

  },
  methods:{
    //格式化时间
    formatTime(time){
      if(!time){
        return ''
      }
      return time.substring(0,10);
    },
    //获取图片
    getImg(src){
      if(!src){
          return 'default.jpg'
      }
      return src.split(',')[0]
    },
    
    
    changeType(target){
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==3){
    			this.currentType.text = this.keepcurrentType2.text
	    		this.currentType.id = this.keepcurrentType2.id
	    		this.currentType.level = this.keepcurrentType2.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==2){
    			this.currentType.text = this.keepcurrentType1.text
	    		this.currentType.id = this.keepcurrentType1.id
	    		this.currentType.level = this.keepcurrentType1.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute('data-level')==1){
    			this.keepcurrentType1.text = target.textContent;
	    		this.keepcurrentType1.id = target.getAttribute('data-id');
	    		this.keepcurrentType1.level = target.getAttribute('data-level');
			}
    		if(target.getAttribute('data-level')==2){
    			this.keepcurrentType2.text = target.textContent;
	    		this.keepcurrentType2.id = target.getAttribute('data-id');
	    		this.keepcurrentType2.level = target.getAttribute('data-level');
			}

    		console.log(target);
    		this.currentType.text = target.textContent;
    		this.currentType.id = target.getAttribute("data-id");
    		this.currentType.level = target.getAttribute("data-level");

			if(target.getAttribute('data-level')==3){
				this.sortBy = "";
			}
    	},
    	//选择地区
    	changeCity(target){
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==3){
    			this.currentCity.text = this.keepcurrentCity2.text
	    		this.currentCity.id = this.keepcurrentCity2.id
	    		this.currentCity.level = this.keepcurrentCity2.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute("data-id") == "all" && target.getAttribute('data-level')==2){
    			this.currentCity.text = this.keepcurrentCity1.text
	    		this.currentCity.id = this.keepcurrentCity1.id
	    		this.currentCity.level = this.keepcurrentCity1.level
    			this.sortBy = "";
    			return;
    		}
    		if(target.getAttribute('data-level')==1){
    			this.keepcurrentCity1.text = target.textContent;
	    		this.keepcurrentCity1.id = target.getAttribute('data-id');
	    		this.keepcurrentCity1.level = target.getAttribute('data-level');
			}
    		if(target.getAttribute('data-level')==2){
    			this.keepcurrentCity2.text = target.textContent;
	    		this.keepcurrentCity2.id = target.getAttribute('data-id');
	    		this.keepcurrentCity2.level = target.getAttribute('data-level');
			}
    		console.log(target);
    		this.currentCity.text = target.textContent;
    		this.currentCity.id = target.getAttribute('data-id');
    		this.currentCity.level = target.getAttribute('data-level');
			
			if(target.getAttribute('data-level')==3){
				this.sortBy = "";
//				this.queryTender();
			}else if(target.getAttribute('data-level')==2 && target.getAttribute('data-id')!='QY201606011002'){
				this.sortBy = "";
			}
    	},
    
    chooseType(typeSrc){
      if(this.sortBy != typeSrc){
        this.sortBy = typeSrc;
      }else{
        this.sortBy = '';

        if(this.currentCity.text!=''||this.currentType.text!=''){
          console.log('init new data');
          this.pageNo = 1;//将pageNo归1
          this.querySupply();
        }


      }
    },

    load(){
      //是否正在执行加载。
      if(this.preventRepeat){
        return
      }
      this.preventRepeat = true;
      this.pageNo ++;
      
      this.$http.post('/querySupply',{
        pageNo:this.pageNo,
        type:this.currentType.id,
        area:this.currentCity.id,
        areaLevel:this.currentCity.level,
        typeLevel:this.currentType.level
      }).then((res)=>{

        if(!res.data.response.length) return;

        this.supplyList = this.supplyList.concat(res.data.response);

        if(!res.data.response.length || res.data.response.length<10){
          //没有更多了
          this.hasMore = false;
          //标记状态，不在加载
          this.preventRepeat = true;
        }else{
          this.preventRepeat = false;
        }
      },(err)=>{
        console.log(err);
      })

    },

    querySupply(){

      this.$http.post('/querySupply',{
        pageNo:this.pageNo,
        type:this.currentType.id,
        area:this.currentCity.id,
        areaLevel:this.currentCity.level,
        typeLevel:this.currentType.level
      }).then((res)=>{

        this.supplyList = res.data.response;

        //回到顶部
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        if(!res.data.response.length || res.data.response.length<10){
          this.hasMore = false;
        }else{
          this.hasMore = true;
          //开放查询更多入口
          this.preventRepeat = false;
        }

      },(err)=>{
        console.log(err);
      })

    },

   



    //跳转页面
    toPage(url){
      this.$router.push(url);
    }
  },
  watch:{
  	sortBy(val,old){
//		console.log(this.sortBy)
		if(val == ""){
//				console.log("close to search")
			this.querySupply();
		}
		console.log(123)
		// console.log("val++"+val);
		// console.log("old++"+old);
	}
  }
}
</script>

<style lang='less' scoped>

@import '../../assets/css/variable.less';

.router-slide-enter-active,.router-slide-leave-active{
  transition: all .3s;
}


.router-slide-enter,.router-slide-leave-active{
  /*transform: rotateY(180deg);*/
  transform: translateX(100%);
  opacity:0;
}

/*筛选框动画*/

.showlist-enter-active, .showlist-leave-active {
  transition: all .3s;
  transform: translateY(0);
}
.showlist-enter, .showlist-leave-active {
  opacity: 0;
  transform: translateY(0%);
}

/*遮罩动画*/
.showmask-enter-active, .showmask-leave-active {
  transition: opacity .3s
}
.showmask-enter, .showmask-leave-active {
  opacity: 0
}



/* .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    transform: translateX(100%);
    opacity: 0;
}

 */






/*//采购供应-index*/


.cggy-index{

  .header-top{
    background: #46C95E;
    height:4rem;
  }

  .tab-ul{
    display: flex;
    justify-content: center;
	padding:0.2rem 0;
	height:2rem;
	overflow: hidden;
    li{
      color:#fff;
      text-align: center;
      width:26%;
      line-height:26/@root-font-size;
      border:1px solid #fff;
      font-size:.8rem;
    }
    li.on{
      background: #fff;
      color:#7ADB4D;
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


  }

  header{
    color:#595959;
  }

/*  section:last-child{
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







  .product-list{
    /*padding-bottom:10px;*/

    li{
      background: #fff;
      overflow: hidden;

      padding:.1rem .5rem;


      border-top:1px solid #D5D5D5;
    }


    .order-flex{
      display: flex;
      padding:5/@root-font-size 0;
      div{
        justify-content: flex-start;
      }
    }
    .order-img{
      margin-right:16/@root-font-size;
      overflow: hidden;
      width:35%;
      overflow: hidden;
      img{
        height:68/@root-font-size;
        width:100%;
      }
    }
    .order-param{
     
      color:#888888;
      line-height:1rem;
      width:65%;
      overflow: hidden;
      

      h3{
        margin-bottom:.1rem;
        font-size:.7rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right:.2rem;
      }
      p{
        margin-bottom:.1rem;
        font-size:.6rem;
        span{
          font-size:.6rem;
        }
      }
    }
    h3{
      color:#000;
    }

  }

  .fixed{
    right:10px;
    bottom:60px;
    position: fixed;
    a{
      display: block;
      color:#fff;
      background:#FECF4B;
      width:60px;
      height:60px;
      text-align: center;
      line-height:60px;
      border-radius:100%;

    }
  }
}

</style>
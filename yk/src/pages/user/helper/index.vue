<template>
	
<div class="helper_page">
	
	<header-top title='帮助中心' back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content help">

        <div class="list pd10">
            <h3><img src="../../../assets/imgs/center/icon-account.png"/>账户问题 </h3>
            <ul v-for=" (item,index) in list ">
                <li @click="toDetails(item)" v-if="item.type==1" v-text="item.title"></li>
            </ul>
        </div>
        <div class="list pd10">
            <h3><img src="../../../assets/imgs/center/icon-order.png"/>订单问题 </h3>
            <ul v-for=" (item,index) in list ">
                <li @click="toDetails(item)" v-if="item.type==2" v-text="item.title"></li>
            </ul>
        </div>
        <div class="list pd10">
            <h3><img src="../../../assets/imgs/center/icon-bill.png"/>账单问题 </h3>
            <ul v-for=" (item,index) in list ">
                <li @click="toDetails(item)" v-if="item.type==3" v-text="item.title"></li>
            </ul>
        </div>
        <div class="list pd10">
            <h3><img src="../../../assets/imgs/center/icon-other.png"/>其他问题 </h3>
            <ul v-for=" (item,index) in list ">
                <li @click="toDetails(item)" v-if="item.type==4" v-text="item.title"></li>
            </ul>
        </div>


    </div>	



    <transition name='slid' mode='out-in'>
      <keep-alive>
        <router-view :helper="helper"></router-view>
      </keep-alive>
    </transition>

</div>
</template>

<script>
	
import headerTop from '@/components/header/header'

export default{
	components:{
		headerTop
	},
  data(){
    return{
      time:0,
      list:[],
      helper:{}
    }
  },
  mounted(){

    // this.time = new Date().getTime();

    this.init();
  },
  methods:{
    toDetails(item){

      this.helper = item;
      this.$router.push("/user/helper/information");

    },
    init(){
      this.$http.post('/queryHelPcenter',{pageNo:1}).then((res)=>{

        if(res.data.code==0){
          this.list = res.data.response;
        }

      })
    }
  }
}

</script>


<style lang='less' scoped>
@import '../../../assets/css/variable.less';


.slid-enter,.slid-leave-active{
  transition: all .3s;

}

.slid-enter,.slid-leave-active{
  opacity:0;

  transform:translateX(100%);
}




.helper_page{
  .fixed();
}
/*//帮助中心*/

.help{

  .pd10{
    padding:0 10/@root-font-size;
  }


  .list{
    border-bottom:5/@root-font-size solid #F0F0F0;
  }

  h3{
    line-height:32/@root-font-size;
    font-size:.8rem;
    color:#79da4b;
    img{
      height:20/@root-font-size;
      vertical-align: middle;
      margin-right:12/@root-font-size;
      padding-left:12px;
    }
  }

  li{
    border-bottom:1px solid #D5D5D5;
    line-height:36/@root-font-size;
    font-size:.7rem;
    padding-left:12px;
    position: relative;

    &:after{
      content:'';

      position: absolute;
      top:0;
      bottom:0;
      right:.5rem;
      margin:auto;

      width: .4rem;
      height: .4rem;
      border-top: 2px solid #808080;
      border-right: 2px solid #808080;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

  }
  .help_content{
    font-size:.7rem;
    padding-bottom:.5rem;
  }



}	


</style>
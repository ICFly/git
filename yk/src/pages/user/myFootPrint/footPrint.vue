<template>
    
    <div class="favorite_page">
        
        <header-top title='我的足迹' back></header-top>
        <div class="fixed-top-div"></div>

    <div class="content my-foot">

        <ul class="order-state">
            <li v-bind:class="{on:active==1}" @click="active=1">现货交易</li>
            <li v-bind:class="{on:active==2}" @click="active=2">供应</li>
            <li v-bind:class="{on:active==3}" @click="active=3">采购</li>
        </ul>

        <div class="foot-list" id="wrapper">

            <div id="scroller">
                <!--现货交易-->
                <ul class="order-state-4" v-if="active==1">
                    <li v-for="item in favoriteList.TenderVo" v-if="item" @click="toPage('/user/myFootPrint/tenderInfo?id='+item.t_id)">
                        <div class="order-tit">
                            <span class="tit" v-text="item.t_id"></span>
                            <span class="font-time" v-text="item.pass_time.substring(0,10)"></span>
                        </div>
                        <div class="order-info">
                            <div class="order-flex">
                                <div class="order-img">
                               		<drawimg :src="item.p_file.split(',')[0]" :id=" 'footPrint1_'+index "></drawimg>
                                    <!--<img v-bind:src="item.p_file.split(',')[0]" alt="">-->
                                </div>
                                <div class="order-param">
                                    <h3 v-text="item.t_title"></h3>
                                    <p><span>数量：</span><i v-text="item.t_quality"></i><i v-text="item.dw_name"></i></p>
                                    <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                    <!--<p><span>上线时间：</span>2017-2-20</p>-->
                                    <!--<p><span>成交价格：</span><i class="font-red-money">1000</i>韩元/吨</p>-->
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <li v-if="favoriteList.TenderVo.length <= 0" class="data_status">没有了...</li> -->
                </ul>
                <!--供应-->
                <ul class="order-state-4" v-if="active==2">
                    <li v-for="item in favoriteList.SupplyVo" @click="toPage('/user/myFootPrint/supplyInfo?id='+item.s_id)">
                        <div class="order-tit">
                            <span class="tit" v-text="item.s_id"></span>
                            <span class="font-time" v-text="item.pass_time.substring(0,10)"></span>
                        </div>
                        <div class="order-info">
                            <div class="order-flex">
                                <div class="order-img">
                               		<drawimg :src="item.p_file.split(',')[0]" :id=" 'footPrint2_'+index "></drawimg>
                                    <!--<img v-bind:src="item.p_file.split(',')[0]" alt="">-->
                                </div>
                                <div class="order-param">
                                    <h3 v-text="item.s_title"></h3>
                                    <p><span>数量：</span><i v-text="item.s_quality"></i><i v-text="item.dw_name"></i></p>
                                    <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                    <!--<p><span>上线时间：</span>2017-2-20</p>-->
                                    <!--<p><span>成交价格：</span><i class="font-red-money">1000</i>韩元/吨</p>-->
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <li v-if="favoriteList.SupplyVo.length <= 0" class="data_status">没有了...</li> -->
                </ul>
                <!--采购-->
                <ul class="order-state-4" v-if="active==3">
                    <li v-for="item in favoriteList.PurchaseVo" @click="toPage('/user/myFootPrint/purchaseInfo?id='+item.pur_id)">
                        <div class="order-tit">
                            <span class="tit" v-text="item.pur_id"></span>
                            <span class="font-time" v-text="item.pass_time.substring(0,10)"></span>
                        </div>
                        <div class="order-info">
                            <div class="order-flex">
                                <div class="order-img">
                                    <!--<img src="../../images/center/order_pic.png" alt="">-->
                                    <!--<img v-bind:src="item.p_file.split(',')[0]" alt="">-->
                               		<drawimg :src="item.p_file.split(',')[0]" :id=" 'footPrint3_'+index "></drawimg>
                                </div>
                                <div class="order-param">
                                    <h3 v-text="item.pur_title"></h3>
                                    <p><span>数量：</span><i v-text="item.pur_quality"></i><i v-text="item.dw_name"></i></p>
                                    <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                    <!--<p><span>上线时间：</span>2017-2-20</p>-->
                                    <!--<p><span>成交价格：</span><i class="font-red-money">1000</i>韩元/吨</p>-->
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <li v-if="favoriteList.PurchaseVo.length <= 0" class="data_status">没有了...</li> -->
                </ul>


            </div>



        </div>

    </div>



    <transition name='slider' mode='out-in'>
        <router-view></router-view>
    </transition>


    </div>
</template>

<script>
    

import headerTop from '@/components/header/header'

import drawimg from '@/components/common/drawimg'

export default{
    data(){
        return{
            favoriteList:[],
            active:1,
        }
    },
    components:{
        headerTop,
        drawimg
    },
    mounted(){
        this.queryFootprint();
    },
    methods:{

        toPage(url){
            this.$router.push(url);
        },
        //查询收藏
        queryFootprint(){

            this.$http.post('/queryFootprint',{vip:this.$store.getters.getVip,pageNo:1}).then((res)=>{
                if(res.data.code == 0){
                    this.favoriteList = res.data.response;
                    console.log(res.data.response);
                }
            })
        }
    }
}

</script>

<style lang='less' scoped>
    
@import '../../../assets/css/variable';



.slider-enter-active,.slider-leave-active{
    transition: all .3s
}

.slider-enter,.slider-leave-active{
    opacity:0;
}


.favorite_page{
    .fixed();
}


.data-status{
    text-align: center;
    padding:.3rem 0;
}
/*//我的足迹*/




.order-state{
  display: flex;
  background: #fff;
  li{
    flex:1;
    text-align: center;
    line-height:30/@root-font-size;
    border-bottom:2px solid #AAAAAA;
    position: relative;
    font-size:.8rem;

    &:after{
      content:'';
      width:1px;
      height:1.1rem;
      background: #AAAAAA;

      position: absolute;

      right:-1px;
      top:0;
      bottom:0;
      margin:auto;

    }

  }

  li.on{
    color:#7adc4d;
    border-color:#7adc4d;
  }




}



.my-foot{
  .order-state-suc{
    color:#ff8a00;
  }

  li{
    /*//height:195/@root-font-size;*/
    background: #fff;
    overflow: hidden;
    padding:0 15/@root-font-size;
    font-size:.7rem;
    /*//overflow: hidden;*/

  }

  .order-tit{
    line-height:22/@root-font-size;
    border-bottom:1px solid #F0F0F0;
    font-size:.6rem;
    display: flex;
    justify-content: space-between;
  }

  .order-flex{
    display: flex;
    padding:5/@root-font-size 0;
    div{
      justify-content: flex-start;
    }
  }

  .order-img{
    margin-right:20/@root-font-size;
    overflow: hidden;
    width:35%;
    img{
      height:70/@root-font-size;
      width:100%;
    }
  }
  h3{
    color:#333;
    margin-bottom:3px;
  }
  .order-param{
    line-height:1.2rem;
    color:#888888;
    width:60%;
    font-size:.6rem;
    overflow: hidden;

    span{
      display: inline-block;
/*      //width:40%;
      //text-align: right;*/
    }
  }

}


</style>
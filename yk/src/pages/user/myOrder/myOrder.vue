<template>
	
<div class="puchaseOrder_page">
	
<header-top title='我的订单' back><span @click='filter'>筛选</span></header-top>
<!-- <header-top title='我的订单' back><img src="../../../assets/imgs/center/icon_msg.png"/></header-top> -->


<div class="fixed-top-div"></div>


    <div class="content my-order">
        <ul class="order-state">

            <li @click=' active = 1' :class="{'on':active == 1}">采购</li>
            <li @click=' active = 2' :class="{'on':active == 2}">供应</li>

        </ul>

        <div class="order-list">



            <!--采购-->
            <ul class="order-state-1" v-if="active==1">
                <li v-for="(item,index) in purchaseList"  @click="info('/cggy/purchase_info.html?id='+item.pur_id)">
                    <div class="order-tit">
                        <span class="tit" v-text="item.pur_id"></span>

                        <span class="font-style-red" v-if=" item.pur_state==0 ">审核中</span>
                        <span class="font-style-red" v-if=" item.pur_state==1 ">审核通过</span>
                        <span class="font-style-red" v-if=" item.pur_state==2 ">审核不通过</span>
                        <span class="font-style-red" v-if=" item.pur_state==3 ">已过期</span>
                        <span class="font-style-red" v-if=" item.pur_state==4 ">以下架</span>

                    </div>
                    <div class="order-info">
                        <div class="order-flex">
                            <div class="order-img">
                                <img class="img4" v-bind:src="splitImg(item.p_file)" alt="">
                            </div>
                            <div class="order-param">
                                <h3>{{item.pur_title}}</h3>
                                <p><span>数量：</span>{{item.pur_quality}}</p>
                                <p><span>地区：</span>{{item.dz_name}}</p>
                                <p><span>时间：</span>{{item.release_time.substring(0,10)}}</p>
                            </div>
                        </div>
                        <div class="order-btn" v-if=" item.pur_state==2 " style="justify-content: flex-end;">
                            <a @click.stop=" deletePurchase(item.pur_id,index) "  class="order-btn-endbuy f_left">删除</a>&nbsp;
                            <a @click.stop=" updatePurchase(item.pur_id) "  class="order-btn-endbuy f_right">修改</a>&nbsp;
                        </div>

                        <div class="order-btn" v-if=" item.s_state==1 " style="justify-content: flex-end">
                            <a @click.stop=" downOfPurchase(item.s_id) " class="order-btn-linkman f_">下架</a>
                        </div>

                    </div>
                </li>
            </ul>
            <!--供应-->
            <ul class="order-state-2" v-if="active==2">
                <li v-for="(item,index) in supplyList" @click="info('/cggy/supply_info.html?id='+item.s_id)">
                    <div class="order-tit">
                        <span class="tit" v-text="item.s_id"></span>

                        <span class="font-style-red" v-if=" item.s_state==0 ">审核中</span>
                        <span class="font-style-red" v-if=" item.s_state==1 ">审核通过</span>
                        <span class="font-style-red" v-if=" item.s_state==2 ">审核不通过</span>
                        <span class="font-style-red" v-if=" item.s_state==3 ">已过期</span>
                        <span class="font-style-red" v-if=" item.s_state==4 ">以下架</span>
                    </div>
                    <div class="order-info">
                        <div class="order-flex">
                            <div class="order-img">
                                <!--<img src="../../images/center/order_pic.png" alt="">-->
                                <img class="img4" v-bind:src="splitImg(item.p_file)" alt="">
                            </div>
                            <div class="order-param">
                                <h3><i v-text="item.s_title"></i></h3>
                                <p><span>数量：</span><i v-text="item.s_quality"></i> </p>
                                <p><span>地区：</span><i v-text="item.dz_name"></i></p>
                                <p><span>时间：</span><i v-text="item.release_time.substring(0,10)"></i></p>
                            </div>
                        </div>
                        <div class="order-btn" v-if=" item.s_state==2 " style="justify-content: flex-end">
                            <a @click.stop=" updateSupply(item.s_id) " class="order-btn-linkman">修改</a>&nbsp;
                        </div>

                        <div class="order-btn" v-if=" item.s_state==3 " style="justify-content: flex-end">
                            <a @click.stop=" deleteSupply(item.s_id,index) " class="order-btn-linkman">删除</a>&nbsp;
                        </div>

                        <div class="order-btn" v-if=" item.s_state==1 " style="justify-content: flex-end">
                            <a @click.stop=" downOfSupply(item.s_id) " class="order-btn-linkman">下架</a>&nbsp;
                        </div>

                    </div>
                </li>
            </ul>


            <ul id='filter' v-show='showFilter'>
              <li @click="queryByState(null)">全部</li>
              <li @click="queryByState(0)">审核中</li>
              <li @click="queryByState(1)">审核通过</li>
              <li @click="queryByState(2)">审核不通过</li>
              <li @click="queryByState(3)">已过期</li>
              <li @click="queryByState(4)">已下架</li>
            </ul>
            <div id='mask' v-show='showFilter'></div>


              
        </div>

    </div>



</div>

</template>
<script>
	
import headerTop from '@/components/header/header'


export default{
	components:{
		headerTop,
	},
  data(){
    return{

      active:1,
      supplyList:[],//采购
      purchaseList:[],//供应
      pageNo:1,
      showFilter:false

    }
  },
  computed:{


  },
  methods:{

    //修改采购
    updatePurchase(id){

      this.$router.push({path:"/publish/updatePurchase",query:{id:id}})
    },
    //修改供应
    updateSupply(id){

      this.$router.push({path:"/publish/updateSupply",query:{id:id}})

    },
    //删除供应
    deleteSupply(id,ind){

      var vm = this;
      layer.open({
        // title:'确定删除吗',
        content:"确定删除吗",
        btn:['确定','取消'],
        yes:function(){
          vm.$http.post('/deleteRecord',{uId:vm.$store.getters.getVip,vId:id}).then((res)=>{
            if(res.data.code==0){
              vm.supplyList.splice(ind,1);//从显示数据中删除元素
              layer.open({
                content:'删除成功。',
                skin:'msg',
                time:1.2
              })
            }else{

              layer.open({
                content:"删除失败!",
                skin:'msg',
                time:2
              })

            }
          })
          layer.closeAll();
        },
        no:function(){
          layer.closeAll();
        }

      })

    },
    //删除供应
    deletePurchase(){
      var vm = this;
      layer.open({
        // title:'确定删除吗',
        content:"确定删除吗",
        btn:['确定','取消'],
        yes:function(){
          vm.$http.post('/deleteRecord',{uId:vm.$store.getters.getVip,vId:id}).then((res)=>{
            if(res.data.code==0){
              vm.purchaseList.splice(ind,1);//从显示数据中删除元素
              layer.open({
                content:'删除成功。',
                skin:'msg',
                time:1.2
              })
            }else{

              layer.open({
                content:"删除失败!",
                skin:'msg',
                time:2
              })

            }
          })
          layer.closeAll();
        },
        no:function(){
          layer.closeAll();
        }

      })
    },
    //根据状态查询订单
    queryByState(state){

      let options;
      //包含过滤条件
      if(state){
        options = {vip:this.$store.getters.getVip,pageNo:this.pageNo,type:state}
      }else{
        options = {vip:this.$store.getters.getVip,pageNo:this.pageNo}
      }

      this.$http.post('/OrderByVip',options).then((res)=>{
        if(res.data.code == 0){

          this.purchaseList = res.data.response.pvs
          this.supplyList = res.data.response.svs


          //关闭条件选择
          this.showFilter = false;

        }
      })

    },
    //显示过滤条件
    filter(){
      this.showFilter = !this.showFilter;
    },
    splitImg(src){
      return src.split(',')[0];
    },
    queryOrderInfo(){
      this.$http.post('/OrderByVip',{pageNo:this.pageNo,vip:this.$store.getters.getVip}).then((res)=>{
        if(res.data.code == 0){

          this.purchaseList = res.data.response.pvs;
          this.supplyList = res.data.response.svs
        }
      })
    },
    toPage(url){

      this.$router.replace(url);
      // console.log(url);

    }
  },
	mounted(){

    this.$nextTick(()=>{
      this.queryOrderInfo();
    })

    // setInterval(()=>{
    //   console.log(this.switchView);
    // },1000)

    // console.log(this.$);

	},

  watch:{
    $route(to,from){

      // console.log(to);
      // console.log(from);

    }
  }
}

</script>

<style lang='less' scoped>
	
@import '../../../assets/css/variable';


#filter{

  position: fixed;
  top:2.49rem;
  right:.1rem;
  width:4rem;
  height:6rem;
  /*height:6rem;*/
  font-size:.6rem;
  z-index:9999;
  line-height:1rem;

  border-top-left-radius: .5rem;
  border-radius: .5rem;


  li{
    padding:.2rem !important;
    text-align: center;
  }






  &:after{
    content:'';
/*    width:1rem;
    height:1rem;*/
    /*background: #f00;*/

    border-width: .4rem;
    border-style: solid;

    border-color: transparent transparent #fff transparent;

    right:0;
    top:-0.8rem;
    position: absolute;



  }

}
#mask{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#000;
    opacity:.5;
    z-index:99;
}

.switchView-enter,.switchView-leave-active{
  transition: all .2s;
}

.switchView-enter,.switchView-leave-active{
  opacity:0;
}

.puchaseOrder_page{
	position: fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	background: #fff;
	z-index:99;
	overflow-y: auto;
}


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
/*//我的订单*/
.my-order{

  .order-list{
    .order-state-suc{
      color:#ff8a00;
    }

    li{
      
      background: #fff;
      /*margin-top:5/@root-font-size;*/
      overflow: hidden;
      padding:0 10/@root-font-size;
    }

    .order-tit{
      line-height:30/@root-font-size;
      border-bottom:1px solid #F0F0F0;
      display: flex;
      justify-content: space-between;
      font-size:.6rem;
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
      width:35%;
      overflow: hidden;
      img{
        height:80/@root-font-size;
        width:100%;
      }
      /*.img4{
        height: 100/@root-font-size;
      }*/
    }
    h3{
      color:#333;
      margin-bottom:.4rem;
      overflow: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;

      span{
        float:right;
        color:#ff8a00;
        font-size:.6rem;
        font-weight: normal;
      }
    }
    .order-param{
      color:#888888;
      width:60%;
      font-size:.6rem;
      line-height:1rem;

      p{
        margin-bottom:.2rem;
      }
      span{
        display: inline-block;
      }
  }


    .order-btn{

      display: flex;
      justify-content: space-between;
      align-items: center;

      border-top:1px solid #F0F0F0;
      padding:5/@root-font-size 0;

      a{
        width:45/@root-font-size;
        box-sizing: border-box;
        padding:.3rem 0;
        
        border:1px solid #fff;
        font-size:.6rem;
        text-align: center;
        border-radius:4px;

      }

      a.order-btn-bond{
        color:#808080;
        line-height:normal;
        border-color:#808080;
      }

      a.order-btn-linkman{
        color:#FF8A00;
        border-color:#FF8A00;
      }
      a.order-btn-orange{
        color:#FF8A00;
        border-color:#FF8A00;
      }
      a.order-btn-red{
        color:red;
        border-color:#f00;
      }
      a.order-btn-ok{
        color:#7ADC4D;
        border-color:#7ADC4D;
      }
      a.order-btn-del{
        color:#FF8901;
        border-color:#FF8901;
      }
      a.order-btn-endtime{
        color:#808080;
        border-color:#808080;
      }


      a.order-btn-endbuy,a.order-btn-updatemoney,a.order-btn-lookmoney{
        color:#FF8901;
        border-color:#FF8901;
      }


    }

  }
}







</style>



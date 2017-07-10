<template>
<div class="list_page">
	
	<header-top title='修改价格' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content update_price">

        <div class="info">
            <div>
                <span>交易单号：</span><b v-text="orderInfo.t_id"></b>
            </div>
            <div>
                <span>交易名称：</span><b v-text="orderInfo.t_title"></b>
            </div>
            <div>
                <span>交易数量：</span><b v-text="orderInfo.t_quality + orderInfo.dw_name "></b>
            </div>
            <div>
                <span>出价计价单位：</span><b v-text="orderInfo.dw_name"></b>
            </div>
            <div>
                <span>交易地区：</span><b v-text="orderInfo.dz_name"></b>
            </div>
            <div>
                <span>结束时间</span><b v-text="endDate"></b>
            </div>
            <div>
                <span>当前价格：</span><b v-text="orderInfo.t_price+orderInfo.bz_name+'/'+orderInfo.dw_name  "></b>
            </div>
        </div>
        <div class="form-box">
            <div class="text">
                <label for="price">修改价格：</label>
                <input class="text" type="number" ref="price" id="price" placeholder="新价格"/>
            </div>
            <div>
                <input class="btn" type="submit" value="确定" @click.prevent="updatePrice"/>
            </div>
        </div>

    </div>

<!-- 
  <transition name='slide' mode='out-in'>
    <router-view></router-view>
  </transition> -->

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

      orderInfo:{},
      endDate:'',


    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.queryInfo();
    })
  },
  methods:{


    //修改价格
    updatePrice:function(){

        var vm  = this;
        var newPrice = vm.$refs.price.value;

        if(newPrice.trim()==""){
            layer.msg("请输入修改价格");
            return;
        }
        if(parseInt(newPrice) >= parseInt(vm.orderInfo.t_price)){
            layer.msg("修改价格不得高于或等于当前价格");
            return;
        }

        vm.$http.post("/updateTprice",{t_id:vm.orderInfo.t_id,t_price:newPrice}).then(function(res){
            console.log(res.data);

            if(res.data.code==0){
                layer.msg("修改成功",{time:1},()=>{
                    location.reload();
                })
            }else{
                layer.msg(res.data.message);
            }

        }).catch(function(res){
            console.log(res.date);
        })



    },
    //查询信息
    queryInfo:function(){

        this.$http.post('/queryTenderByid',this.$route.query).then((res)=>{
            console.log(res.data);
            if(res.data.code==0){
                this.orderInfo = res.data.response;
                this.formatDate(this.orderInfo.pass_time,this.orderInfo.t_date)
            }
        }).catch(function(res){
            console.log(res);
        });
    },

    //计算剩余时间
    formatDate:function(dated,day){
        var vm = this;
        var dated = dated.replace(/-/g,'/');
        var date = new Date(dated);
        date.setDate(date.getDate()+parseInt(day));
        var date3 = date.getTime() - new Date().getTime();
        var days=Math.floor(date3/(24*3600*1000));
        //计算出小时数
        var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));
        //计算相差秒数
        var leave3=leave2%(60*1000);     //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3/1000);
        vm.endDate = days+"天"+hours+"时"+minutes+"分";

        console.log(vm.endDate);
    }


  }
}

</script>

<style lang='less' scoped>
@import '../../../../assets/css/variable.less';

/*//我卖的货-修改价格*/
.update_price{



  .info{
    background: #fff;
    font-size:1px*@font-middle-size;
    padding:15/@root-font-size;
    line-height:26/@root-font-size;
  }

  span{
    width:8em;
    display: inline-block;
  }
  b{
    font-weight:normal;
  }

  .form-box{

    padding:10/@root-font-size 15/@root-font-size;


    .text{

      display: flex;
      justify-content: space-between;
      line-height:35/@root-font-size;

      font-size:.7rem;

      label{
        width:30%;
      }

    }

    #price{
      background: #fff;
      border-radius:6px;
      height:20/@root-font-size;
      border:1px solid #dddddd;
      padding:15/@root-font-size 2/@root-font-size;
      width:70%;
      box-sizing: border-box;
      padding-left:.5rem;

    }
    
    .btn{
      background: #389E3A;
      line-height:35/@root-font-size;
      width:100%;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      margin:20/@root-font-size auto;
      color:#fff;
      display: block;
    }

  }

}


</style>
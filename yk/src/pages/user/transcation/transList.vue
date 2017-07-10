<template>
<div class="list_page">
	
	<header-top title='现货交易管理' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content xhjy-manage">
        <div class="list pd10">
            <ul>
                <router-link tag='li' to='/user/transcationList/buyOrder'>我买的货</router-link>
                <router-link tag='li' to='/user/transcationList/saleOrder'>我卖的货</router-link>
            </ul>
        </div>
    </div>


  <transition name='slide'>
    <router-view></router-view>
  </transition>

</div>	
</template>

<script>
	
import headerTop from '@/components/header/header'
export default{
	components:{
		headerTop
	}
}

</script>

<style lang='less'>
@import '../../../assets/css/variable.less';



.slide-enter-active,.slide-leave-active{
  transition: all .3s;
}
.slide-enter-active,.slide-leave-active{
  opacity: 0;
}


/*//现货交易管理*/


.list_page{
	position:fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	z-index:999;
	background: #fff;
  overflow: hidden;
}
.xhjy-manage{

  .pd10{
    padding:0 10/@root-font-size;
  }
  .list{
  }
  li{
    border-bottom:1px solid #D5D5D5;
    line-height:35/@root-font-size;
    padding:5/@root-font-size;
    padding-left:.8rem;
    font-size:.8rem;

    position: relative;

    &:after{
      content:'';
      position: absolute;
      top:0;
      bottom:0;
      right:8px;
      margin:auto;

      width: .4rem;
      height: .4rem;
      border-top: 2px solid #999999;
      border-right: 2px solid #999999;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);

    }
  }

}










/*===我的订单====*/


.border-style-green{
  border:1px solid #49CB5F;
  color:#49CB5F;
}

/*a.order-btn-bond{
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
  border-color:red;
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
}*/























.tip{
  text-align: center;
  font-size:.6rem;
  margin:.5rem 0;
}


.font-style-orange-circle{
  color:orange;
  border:1px solid orange;
}


.my-order{



.order-state{
  display: flex;
  background: #fff;
  li{
    flex:1;
    text-align: center;
    line-height:35/@root-font-size;
    border-bottom:2px solid #AAAAAA;
    position: relative;
    font-size:.7rem;

    &:after{
      content:'';
      width:1px;
      height:20px;
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
    transition: all .3s;
  }
}

  .order-list{
    .order-state-suc{
      color:#ff8a00;
      margin:0 .1rem;
    }
    li{
      background: #fff;
      /*margin-top:10/@root-font-size;*/
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
      width:40%;
      overflow: hidden;
      img{
        height:60/@root-font-size;
        width:100%;
      }
/*      .img4{
        height: 100/@root-font-size;
      }*/
    }
    h3{
      color:#333;
      margin-bottom:3px;
      overflow: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size:.7rem;

      span{
        float:right;
        color:#ff8a00;
        font-size:1px*@font-middle-size;
        font-weight: normal;
      }
    }
    .order-param{
      color:#888888;
      width:60%;
      font-size:.6rem;
      line-height:.94rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      p{
        /*margin-bottom:5px;*/
      }
      span{
        display: inline-block;
        
      }
  }


    .order-btn{
      display: flex;
      justify-content: space-between;
      a{
        width:80/@root-font-size;
        box-sizing: border-box;
        margin:0 .1rem;
        height:100%;
        font-size:.6rem;
        text-align: center;
        border-radius:4px;
        padding:.2rem .1rem;
        margin:.1rem 0;
      }
    }
    .order-btn-bond{
      display: flex;
      flex-direction: column;

    }

  }
}












</style>
<template>
<div class="list_page">
	
	<header-top title='现货交易管理' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content xhjy-manage">
        <div class="list pd10">
            <ul>
                <router-link tag='li' to='/user/transcationList/saleOrder/passOrder'>审核通过</router-link>
                <router-link tag='li' to='/user/transcationList/saleOrder/auditOrder'>审核中</router-link>
                <router-link tag='li' to='/user/transcationList/saleOrder/rejectOrder'>未通过</router-link>
            </ul>
        </div>
    </div>


  <transition name='slide' mode='out-in'>
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

<style lang='less' scoped>
@import '../../../../assets/css/variable.less';



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


</style>
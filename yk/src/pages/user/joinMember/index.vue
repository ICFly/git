<template>


<div class="joinMember_page">
	
<header-top title='开通会员' back></header-top>
<div class="fixed-top-div"></div>

    <div class="content">
        <div class="form-box">
            <form action="" class="layui-form">

                <!-- 如果是会员 -->
                <div v-if="vipState==1" class="form-group">
                    <span>会员类型：</span>
                    <span :class="{on:vipType==1}" class="icon-radio"></span>
                    <span>金牌会员</span>

                    <span :class="{on:vipType==2}" class="icon-radio"></span>
                    <span>钻石会员</span>

                </div>
                <!-- 未开通会员 -->
                <div v-else class="form-group">
                    <span>会员类型：</span>
                    <span class="icon-radio" @click="memberType = 1" v-bind:class="{on:memberType==1}"></span>
                    <span>金牌会员</span>
                    <span class="icon-radio" @click="memberType = 2" v-bind:class="{on:memberType==2}"></span>
                    <span>钻石会员</span>
                </div>


                <div class="form-group">
                    <span>开通时长：</span>
                    <span class="icon-radio" :class="{on:time==1}" @click='time=1' ></span>
                    <span>1年</span>
                    <span class="icon-radio" :class="{on:time==2}" @click='time=2'></span>
                    <span>2年</span>

                </div>
                <div class="form-group">
                    <span>支付方式：</span>
                    <span>再商网余额支付</span>
                </div>
                <div class="form-group">
                    <span>应付金额：</span>
                    <span>{{payMoney}}</span>
                </div>
                <div class="form-group">
                    <span>支付密码：</span>
                    <span><input type="password" v-model:value='payPwd'  placeholder="请输入支付密码"/> </span>
                </div>

                <div class="btn-group">
                    <input type="submit" @click.prevent="joinMember" :value=" userInfo.vipState==1?'续费':'确定' " class="btn-control"/>
                    <p class="vip" >
                      <router-link to="/user/joinMember/vipService" tag='span'>会员特权</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <transition>
      <router-view :userInfo=" userInfo "></router-view>
    </transition>
</div>	

</template>

<script>
	
import headerTop from '@/components/header/header'

export default{

	components:{
		headerTop
	},

  props:{
    userInfo:{
      type:Object
    }
  },

  computed:{

    payMoney(){
      if(this.memberType==1){
        return 3288 * this.time;
      }else{
        return 6288 * this.time;
      }
    }

  },
  data(){
    return{
      memberType:1,
      time:1,
      payPwd:'',
      vipState:0,
      vipType:0,
    }
  },
  methods:{

    //加入会员
    joinMember(){

      if(this.payPwd.length <= 0){
        layer.msg("请输入支付密码")
        return;
      }
      if(this.payPwd.length < 6){
        layer.msg("支付密码格式不正确")
        return;
      }
      //判断是续费还是充值会员
      if(this.vipState==1){
          //续费会员
          this.$http.post('/renewal',{usrId:this.$store.getters.getVip,v_type:this.memberType,v_time:this.time*365,v_money:this.payMoney,payPwd:this.payPwd}).then((res)=>{
              let vm = this;
              if(res.data.code==0){
                layer.msg("续费成功",{time:1.2},()=>{
                  vm.$router.go(-1);
                });
              }else{
                layer.msg(res.data.message)
              }
          })
      }else{
          //充值会员
          this.$http.post('/becomeVip',{usrId:this.$store.getters.getVip,v_type:this.memberType,v_time:this.time*365,payPwd:this.payPwd}).then((res)=>{
              //console.log(res.data);
              let vm = this;
              //vipState表示是否是会员状态
              //v_type表示1金牌，2钻石
              if(res.data.code==0){
                let vm = this;
                layer.msg("开通会员成功！",{time:1.5},()=>{
                  vm.$router.go(-1);
                })  
              }else{
                layer.msg(res.data.message)
              }
          })
      }

    }
    
  },
  mounted(){


    this.$nextTick(()=>{




      //如果获取不到会员状态，则返回上一级
      if(this.userInfo.v_type && this.userInfo.vipState === undefined){
        this.$router.go(-1);
      }
      //判断会员状态
      if(this.userInfo.vipState == 1){ //=1表示是会员
          this.vipState = 1;
          this.vipType = this.userInfo.v_type;//获取会员类型
          if(1){
          }
          this.memberType = this.userInfo.v_type;
      }


    })
  }

}

</script>



<style lang='less' scoped> 
@import '../../../assets/css/variable.less';


.joinMember_page{
	.fixed();
}


.content{

  span{
    justify-content: flex-start;
    font-size:.7rem;
  }


  .icon-radio{

    display: inline-block;

    position: relative;
    /*//margin:0 2px;*/
    border:.1rem solid #808080;
    height:1rem;
    width:1rem;
    border-radius:50%;
    /*top:18px;*/
    margin:0 .2rem;

  }


  .icon-radio.on{
    border-color:#79DA4B;
    &:after{
      content:'';
      position: absolute;
      width:.5rem;
      height:.5rem;
      background: #79DA4B;
      top:0;
      bottom:0;
      left:0;
      right:0;
      margin:auto;
      border-radius:50%;

    }

  }


  .form-group{
    line-height:46/@root-font-size;
    border-bottom:1px solid #D5D5D5;
    padding:0 1rem;
    overflow: hidden;
    display: flex;
    align-items: center;

    input{
      font-size:.7rem;
    }

  }

	.btn-group{
		/*padding-top:2rem;*/
		padding:1rem .7rem .2rem .7rem;
	}
  .btn-control{

    display: block;
    background: #389E3A;
    width:100%;
    border-radius:.2rem;
    margin-bottom:.1rem;
    color:#fff;
    height:35/@root-font-size;
    font-size:.8rem;
  }

  .vip{
    text-align: center;
    color:#f00;
  }


}


</style>
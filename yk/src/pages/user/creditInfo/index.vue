<template>


<div class='creditInfo_page'>


<header-top title='信用查询' back></header-top>

<div class="fixed-top-div"></div>

    <div class="content">
        <div class="vip-level">
            <p><img :src="userInfo.photo"/> </p>
            <p>{{userInfo.line_credit}}</p>
            <a class="vip-record" @click="toCreditDetail">信用明细</a>
        </div>
        <div class="vip-list">
            <ul>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv1.png"/>
                    <span> < 1000</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv2.png"/>
                    <span>1010-2500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv3.png"/>
                    <span>2510-4500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv4.png"/>
                    <span>4510-6500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv5.png"/>
                    <span>6510-8500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv6.png"/>
                    <span>8510-16500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv7.png"/>
                    <span>16510-32500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv8.png"/>
                    <span>32510-64500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv9.png"/>
                    <span>64510-127500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv10.png"/>
                    <span>127510-255500</span>
                </li>
                <li>
                    <img src="../../../assets/imgs/center/vip_lv11.png"/>
                    <span>255510-511500</span>
                </li>
            </ul>
        </div>
    </div>
    
    <router-view>
    	
    </router-view>

</div>


</template>

<script>
	
import headerTop from '@/components/header/header'
export default{
	props:{
		userInfo:{
			type:Object,
		}
	},
	components:{
		headerTop
	},
	data(){
		return{
			pageNo:1
		}
	},
	mounted(){
		this.$http.post("/JfDetailed",{pageNo:this.pageNo,vip:this.$store.getters.getVip}).then((res)=>{
			console.log(res);
			
			let arr = ["注册","登录","签到","完善账号信息","发布现货交易","发布采购","发布供应","交易成功","推荐","发布虚假供应信息","发布虚假采购信息","发布虚假现货交易信息"]
		})
	},
	methods:{
		toCreditDetail(){
			this.$router.push({path: './creditInfo/creditDetail'});
		}
	}

}

</script>

<style lang='less' scoped>

@import '../../../assets/css/variable.less';

.creditInfo_page{
	.fixed();
	/*.fixed();*/
	/*.fixed();*/
}	



.content{

  .vip-level{
    height:110/@root-font-size;
    background: #fff;
    text-align: center;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-top:5px;

    p{
      padding-top:5/@root-font-size;
    }

    img{
      height:55/@root-font-size;
    }

    .vip-record{

      position: absolute;
      right:8px;
      bottom:8px;

      width:80/@root-font-size;
      height:29/@root-font-size;
      line-height:29/@root-font-size;
      text-align: center;
      border:1px solid #F5BE00;
      color:#F5BE00;
      border-radius:3px;
      font-size:.8rem;


    }

  }


  .vip-list{
    margin:15/@root-font-size;
    border-radius:3px;
    background: #fff;
    padding:5/@root-font-size;


    li{

      line-height:25/@root-font-size;
      margin-bottom:10/@root-font-size;
      font-size:.8rem;

      height:25/@root-font-size;

      display: flex;
      align-items: center;


      /*justify-content: center;*/

      /*//text-align: center;*/

    }

    img{
      height:100%;
      margin-right:25/@root-font-size;

    }

   



  }


}






</style>
<template>

	<div >
	<!-- <header-top title='个人中心'></header-top> -->
		<div class="page-user">

		    <div class="header">
		        <h3>个人中心</h3>
		        <span class="msg" @click="toPage('/user/message')">

		        	<img src="../../assets/imgs/center/icon_msg.png"/> 
		        	<b v-show='msgCount > 0 '>{{ $store.getters.getMsg > 99?'99+':msgCount}}</b>
		        </span>
		    </div>
		   	<!-- <div class="fixed-top-div"></div> -->
			<div class="user-header">
	            <div class="header-info1">
	                <div class="header-vip column column1">
	                    <!-- <img @click="toPage('/user/login.html')" src="../../assets/imgs/center/vip_lv3.png"/> -->
	                    <img :src=" userInfo.photo " alt="">
	                    <!--<img v-bind:src=" '../../images/center/vip_lv'+userInfo.vip_member+'.png' " alt=""/>-->
	                    <!--<span>{{'../../images/center/vip_lv'+userInfo.vip_member+'.png'}}</span>-->
	                </div>
	                <div class="column column2">
	                    <div>{{userInfo.vip}}</div>
	                    <!--<div>普通会员</div>-->
	                    <div v-if="userInfo.vipState==''">普通会员</div>
	                    <div v-else-if="userInfo.vipState==1">{{userInfo.v_type ==1 ? "金牌会员":"钻石会员"}}</div>
	                    
	                    <!--<div v-if="userInfo.v_type == 2">{{userInfo.v_type == 2 && userInfo.vipState==1? "钻石会员":"普通会员"}}</div>-->
	                </div>
	                <!--<div class="column column3">-->
	                    <!--&lt;!&ndash;<span class="btn" @click="sign" v-text=" signInfo.msg||'签到' "></span>&ndash;&gt;-->
	                <!--</div>-->
	            </div>
	            <div class="header-info2">
	                <div>
	                    <section @click="toPage('/user/myFavorite')">
	                        <h3 >{{ myFavorite }}</h3>
	                        <p>我的收藏</p>
	                    </section>
	                </div>
	                <!--<span></span>-->
	                <div>
	                    <section @click="toPage('/user/myFootPrint')" >
	                        <h3 >{{ myFooterPrint }}</h3>
	                        <p>我的足迹</p>
	                    </section>
	                </div>
	            </div>
	            <div>
	            </div>
        	</div>





			<div class="content-list">
				<ul>
		                <li @click="toPage('/user/balance')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list1.png"/> </div>
		                    <div class="col2">余额查询</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click="toPage('/user/transcationList')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list2.png"/> </div>
		                    <div class="col2">现货交易管理</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click="toPage('/user/myOrder')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list3.png"/> </div>
		                    <div class="col2">我的订单</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <!-- <li @click="toPage('/user/personalAuthen')"> -->
		                <!-- <li @click="toPage('/user/companyAuthen')"> -->
		                <li @click=" toAuthen ">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list4.png"/> </div>
		                    <div class="col2">实名认证</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click=" toPage('/user/joinMember')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list5.png"/> </div>
		                    <div class="col2">开通会员
		                    	<span v-if='memberExpiryTime' class='expiryTime'>(会员剩余：{{memberExpiryTime}}天)</span>
		                    	<span v-else class='expiryTime'>(未开通)</span>
		                    </div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click="toPage('/publish')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list6.png"/> </div>
		                    <div class="col2">信息发布</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click="toPage('/user/notice')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list7.png"/> </div>
		                    <div class="col2">公告</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click="toPage('/user/creditInfo')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list8.png"/> </div>
		                    <div class="col2">信用查询</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click="toPage('/user/feedback')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list9.png"/> </div>
		                    <div class="col2">投诉建议</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li @click="toPage('/user/helper')">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list11.png"/> </div>
		                    <div class="col2">帮助中心</div>
		                    <div class="col3"><i></i></div>
		                </li>
<!-- 		                <li @click="toAuthen">
		                    <div class="col1"><img src="../../assets/imgs/center/icon_list10.png"/> </div>
		                    <div class="col2">设置</div>
		                    <div class="col3"><i></i></div>
		                </li> -->
		                <li @click="logout">
		                	<div class="col1"><img src="../../assets/imgs/center/icon_list10.png"/> </div>
		                    <div class="col2">退出登录</div>
		                    <div class="col3"><i></i></div>
		                </li>
		                <li v-show=" false ">
		                	<div @click="openApp('https://www.taobao.com/')">app</div>
		                	<!-- <a href="https://item.taobao.com/item.htm?id=539608081526">app</a> -->
		                </li>
	

		            </ul>
			</div>

			
		</div>



		<transition name='router-slid'>
			<!-- <keep-alive> -->
				<router-view :userInfo='userInfo'></router-view>
			<!-- </keep-alive> -->
		</transition>




		<div>

			<select-box :showSelectBox=" showSelectBox ">
				

			    <div class="selectBox_cell">
			      <h3>选择认证方式</h3>
			      <p class="selectBox_cell_p">注：只能进行一种认证方式</p>
			      <ul>
			        <!-- <li v-for="(item,index) in unitList.Packs" @click=" selectPack(item) " v-text="item.p_type"></li> -->
			        <li @click="showSelectBox = false;toPage('/user/personalAuthen')">个人认证</li>
			        <li @click="showSelectBox = false;toPage('/user/companyAuthen')">企业认证</li>
			        <li @click="showSelectBox = false ">取消</li>
			      </ul>
			    </div>


			</select-box>

		</div>

	</div>
</template>

<script>


// import * as types from './store/types'
import * as types from '@/store/types'

import {checkLogin,checkAuthen,checkAuthen2} from '@/tool/tool'
import {getCookie} from '@/config/util'

import selectBox from '@/components/common/selectBox2'


export default{
	data(){
		return{
			userInfo:{},
			myFavorite:0,//收藏
			myFooterPrint:0,//足迹
			msgCount:0,//未读消息条数
			memberExpiryTime:0,

			showSelectBox:false,//选择框状态(hide,show);
		}
	},

	components:{

		selectBox
		
	},
	computed:{
		// console.log('load user info');
	},
	activated(){
		this.$nextTick(()=>{
			//查询用户信息。

		})
	},
	mounted (){
		this.$nextTick(()=>{
			//查询用户信息
			this.getInfo();
		})
	},
	watch:{
		$route(to,from){
			//更新用户信息
			if(to.path.length < from.path.length){
				this.getInfo();
			}
			//根据参数判断是否开启实名认证选择窗口
			if(to.query.toAuthen){
				//替换掉url中的参数。
				this.$router.replace(to.path);
				this.toAuthen();
				//显示之后，清除标记
				// to.query = {};
				// this.$store.query = {};
				// console.log(to.query);
				// console.log(typeof to.query);

				// to.query.toAuthen = "";
			}





		}
	},
	methods:{
		openApp(url){


		    var ua = navigator.userAgent.toLowerCase();
		    var tb = url.replace("http://", "").replace("https://", "");


		    if( ua.match(/iphone os 9/i) == "iphone os 9" ) {
		        window.location = "taobao://" + tb;
		        window.setTimeout(function() {window.location = url;},4000);
		    }else{
		        var ifr = document.createElement('iframe');
		        ifr.src = 'taobao://' + tb;//淘宝
		        // ifr.src = 'imeituan://' + tb;//美团
		        ifr.style.display = 'none';
		        document.body.appendChild(ifr);

		        // alert(url);
		        window.location = url;
		    }

 
// //只在有优惠券的时候执行
// openApp('https://item.taobao.com/item.htm?id=539608081526');






		},



		//去实名认证
		toAuthen(){

			//personAuthenState
			// alert(getCookie("personalAuthenState"));
			// alert(getCookie("companyAuthenState"));
			//如果已经实名认证了，则直接进入相应认证页面，查看认证信息
			if(getCookie("personalAuthenState")||getCookie("personAuthenState")){ //如果有值，表示进行过相应的认证
				this.$router.push('/user/personalAuthen');
			}else if(getCookie("companyAuthenState")||getCookie("companyAuthenState")){ //如果有值，表示进行过相应的认证
				this.$router.push('/user/companyAuthen');
			}else{
				this.showSelectBox = true;
			}
		},

		//注销
		logout(){
			//清除cookie
			this.$store.commit(types.LOGOUT)
			// this.$router.push('/login');
			let vm = this;
			layer.open({
				content:"退出成功",
				skin:"footer",
				time:1.2,
				shadeClose:false,
				shade: 'background-color: rgba(0,0,0,.6)',
				end:function(){
					location.reload();
				}
			})
		},

		//读取个人信息
		getInfo(){
			// alert(this.$store.commit('getInfo','vip'));
			// alert(this.$store.getters.getVip);
			this.$http.post('/GetInfoByvip',{vip:this.$store.getters.getVip}).then((res)=>{
				// console.log(res.data);
				if(res.data.code == 0){
					// console.log(res.data.response);


					// console.log(res.data.response);

					this.userInfo = res.data.response.user;
					this.myFavorite = res.data.response.sctj;
					this.myFooterPrint = res.data.response.zjtj;

					this.msgCount = res.data.response.MessAge;
					this.$store.commit("setMsgCount",res.data.response.MessAge);

					// console.log(this.$store.getters.getMsg);

					this.msgCount = this.$store.getters.getMsg;

					//判断是否为会员，并显示剩余时长

                    if(this.userInfo.vipState!=1) return;


                    //会员开通时间
                    var dataStr = this.userInfo.v_kdate.substring(0,10);
                    
                    console.log(dataStr)
                    
                    //当前时间
                    
                    var nowDate = new Date();
	                var pdate = nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+(nowDate.getDate());
						
                    //已经开通时长
                    
                    var newDate = this.DateDiff(dataStr,pdate)
					
                    //开通时长
                    var dayCount = this.userInfo.v_time;
                    
                    //剩余时长
                    this.memberExpiryTime = dayCount - newDate + 1;
                    
                    //把日期字符串转换成日期格式
//                  var isdate = new Date(dataStr.replace(/-/g,"/"));
//                  console.log(isdate)
                    //日期加1天
//                  isdate = new Date((isdate/1000+(86400*dayCount))*1000);
                    //把日期格式转换成字符串
//                  var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());
                    //当前时间
//                  var nowDate = new Date().toLocaleString().replace(/\//g,'-');
                    //截取时间
//                  var startTime = new Date(Date.parse(pdate.replace(/-/g,"/"))).getTime();          
                    
                    //日期加1天
//                  isdate = new Date((isdate/1000+(86400*dayCount))*1000);
                    
                    //把日期格式转换成字符串
//                  var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());

                    //当前时间
//                  var nowDate = new Date().toLocaleString().replace(/\//g,'-');

                    //截取时间
//                  var startTime = new Date(Date.parse(pdate.replace(/-/g,"/"))).getTime();
                    
//                  var endTime = new Date(Date.parse(nowDate.replace(/-/g,"/"))).getTime();
//                  var endTime = new Date().getTime();

                    //计算时间差
//                  var count = (startTime - endTime)/(1000*60*60*24);

//                  this.memberExpiryTime = Math.floor(count);
					// console.log(res.data.response);
					// this.userInfo = res.data.response;
				}
			})
		},
		//跳转页面
		toPage(url){

			let vm = this;
			// 如果是访问开通会员页，判断是否通过实名认证
			if(url.indexOf("joinMember") >= 0 && !checkAuthen2()){
				layer.open({
				    content: '请完成实名认证',
				  	btn: ['确定','取消'],
				  	style:"width:75%",
				  	yes:function(index){
				  		layer.close(index);
				  		vm.toAuthen();
				  	}
				});
			}else{
				this.$router.push(url);
				
			}



		},
		DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式  
	       	var  aDate,  oDate1,  oDate2,  iDays;  
	       	aDate  =  sDate1.split("-")  
	       	oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2006格式  
	       	aDate  =  sDate2.split("-");  
	       	oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);  
	       	iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数  
	       	return  iDays  
	   },
		setUp(){

		},
	}
}
</script>

<style lang='less' scoped>
/*.router-slid-enter-active, .router-slid-leave-active {
	transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}*/
@import '../../assets/css/variable';



/*//transcation management
//Transaction management*/
/* 二级页面过渡动画 */
.router-slid-enter,.router-slid-leave-active{
	transition: all .3;

}

.router-slid-enter,.router-slid-leave-active{
	opacity:0;

	transform:translateX(100%);
}




.expiryTime{
	font-size:.6rem;
	padding:0 .3rem;
	color:#858585;
}


.page-user{
	/*padding-top:40px;*/
	background: #F0F0F0;
}





.header{
  line-height:35/@root-font-size;
  background: #46C95E;
  /*position: relative;*/
  text-align: center;
  color:#fff;

  .left-back{

    position: absolute;
    top: 0;
    right: 20/@root-font-size;

  }


  h3{
    color:#fff;
    font-size:.9rem;
    font-weight:normal;
  }


  .msg{
	  position: absolute;
	  right:12/@root-font-size;
	  top:0;
	  top:0;
	  margin:auto;

	  img{
	    height:1.3rem;
	    vertical-align: middle;
	  }


	  b{
  	    position: absolute;
	    right: -0.47rem;
	    top: 0.2rem;
	    font-size: .5rem;
	    line-height: normal;
	    border-radius: 100%;
	    background: #DD5044;
	    color: #fff;
	    font-weight: normal;
	    min-width: 1rem;
	    min-height: 1rem;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    padding:.1rem;

	  }







	}

}





 .user-header{


    background: #fff;
	font-size:.7rem;
    margin:10/@root-font-size 0 6/@root-font-size 0;

    overflow: hidden;



  .header-info1{
    display: flex;
    border-bottom:1px solid #DEDFE0;

    line-height:70/@root-font-size;
    text-align: center;




  }

  .header-vip{
    width:100/@root-font-size;
    text-align: center;
    img{
      width:50/@root-font-size;
      vertical-align: middle;
    }
  }

  .column{
    flex:1;
  }

  .column2{

    line-height:normal;
    font-size:.8rem;

	display: flex;
	flex-direction: column;   
   	div{
   		flex:1;
   		align-items: center;
		/*justify-content: center;*/
		align-items:center;
		display: flex;
   	}

  }

  .btn{
    display: inline-block;
    text-align: center;
    line-height:32/@root-font-size;
    border-radius:3px;
    color:#919191;
    background: #D5D5D5;
    width:60/@root-font-size;
    height:32/@root-font-size;
    margin:0 auto;
  }

  .btn.active{
    color: #fff;
    background: #7ADC4D;
  }


  .header-info2{
    display: flex;
    text-align: center;
    padding:.2rem;
    position: relative;


    h3{
      font-weight:normal;
    }
    div{
      flex:1;

    }

    &:after{
      content:'';
      width:1px;
      position: absolute;
      height:1rem;
      background: #DEDFE0;

      top:0;
      bottom:0;
      left:0;
      right:0;
      margin:auto;

    }

  }

 }










.content-list{
  background: #fff;
  font-size:13/@root-font-size;

  ul{
    padding-left:10/@root-font-size;
  }

  li{
    display: flex;
    height:36/@root-font-size;
    line-height:36/@root-font-size;
    border-bottom:1px solid #DEDFE0;

    div{
      justify-content: flex-start;
    }

    div.col1{
      padding-left:5px;
      width:12%;
      text-align: left;

      display:flex;
      /*justify-content: center;*/
      align-items: center;

      /*display: flex;*/
      img{
        width:18/@root-font-size;

      }
    }
    div.col2{
      width:80%;
    }
    div.col3{
      width:8%;
      i{
        display: inline-block;
        width: .5rem;
        height: .5rem;
        border-top: .1rem solid #9B9B9B;
        border-right: .1rem solid #9B9B9B;
        transform: rotate(45deg);
      }
    }




  }
  li:last-child{
    border:none;
  }

}
.selectBox_cell_p{
	font-size: .6rem;
	margin-left: -22%;
  	width: 144%;
  	font-size: .6rem;
    -webkit-transform: scale(0.8) !important;
}

</style>
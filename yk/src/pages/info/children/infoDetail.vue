<template>
<div class='infoDetail_page'>
	
	<header-top title='详情' back></header-top>
	<div class="fixed-top-div"></div>

	    <div class="content hqzx">
        <div class="info">
            <h3 id="title" v-text="news.n_title"></h3>
            <p class="time"><span v-text=" news.n_date?news.n_date.substring(0,10):'' "></span></p>
            <section v-html='news.n_detail'>
            <!-- {{news.n_detail}} -->
            </section>
            <!--<p class="more"><a href="#">阅读全文</a><i></i></p>-->
        </div>
        <div class="share">
<!-- 
            <div id="nativeShare"></div> -->
            <ul v-show=" true ">
                <li @click="call('qqFriend')"><img src="../../../assets/imgs/hqzx/share1.png"/> </li>
                <li @click="call('qZone')"><img src="../../../assets/imgs/hqzx/share2.png"/> </li>
                <li @click="call('wechatTimeline')"><img src="../../../assets/imgs/hqzx/share3.png"/> </li>
                <li @click="call('weibo')"><img src="../../../assets/imgs/hqzx/share4.png"/> </li>
                <li @click="call('wechatFriend')"><img src="../../../assets/imgs/hqzx/share5.png"/> </li>
            </ul>
            <!-- 分享配置 -->
            <!-- <a style="position:fixed;right:0;bottom:0">回到顶部</a> -->
        </div>

        <div class="about">
            <p class="tit">推荐阅读</p>
            <div class="list">
              <ul>

       					<!--<li>
      					  <div class="text">
      					    <p>测试公告循环功能</p>
      					    <p>
      					      <span>2017-02-25</span></p>
      					  </div>
      					  <div class="img">
      					    <img src="http://recycle.market/upload/20170225135450214.jpg" alt=""></div>
      					</li> 
                -->
                  <li v-for="item in newsList.slice(0,3) " @click='queryInfo(item.n_id)'>
                      <div class="text">
                          <p>{{ item.n_resume }}</p>
                          <p><span>{{ item.n_date.substring(0,10) }}</span></p>
                      </div>
                      <div class="img">
                          <img v-bind:src=" item.n_image_url.split(',')[0] " alt=""/>
                      </div>
                  </li>   




              </ul>
            </div>
        </div>

        <div class="link-box">
            <ul>
                <li class="this">触摸板</li>
                <!--<li>电脑版</li>-->
                <li><a href="http://www.zaishang.wang/downLoadApp/">APP下载</a></li>
                <li>投诉建议</li>
            </ul>
            <div class="adv">再商网-全球最大的废料交易平台</div>
            <div class="tel">
                <p>服务电话：<span>0755-2300 2300</span></p>
                <p>客服QQ：<span>2315540268</span></p>
            </div>
            <div class="copy">粤ICP备15034937号-5</div>

        </div>

        <div id="top" >
            <img src="../../../assets/imgs/icon-top.png" alt=""/>
            <span>顶部</span>
        </div>

    </div>
</div>
</template>




<script>
import Bscroll from 'better-scroll'	
import headerTop from '@/components/header/header'

import nativeShare from '@/plugins/nativeShare'

// import nativeShare2 from '@/plugins/nativeShare2'

import share from 'nativeShare'


// console.log(nativeShare2);

// import shareCss from '@/plugins/nativeShare'


// //console.log(share);


export default{

	data(){
		return{
			list:[],
			news:{},
			keepList:[],
			newsList:[],

      share:null,
		}
	},
	props:{
	    newsList1:{
	      type:Array,
	    },
	    newsList2:{
	      type:Array,
	    },
			
	},
	components:{
		headerTop
	},
	//最先执行
	created(){

	},

	mounted() {

		// //console.log(this.$route.query);
		this.$nextTick(()=>{
			
      //设置分享内容
      this.share = new share()
      var shareData = {
          title: this.news.n_title,
          desc: this.news.n_title,
          // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
          link: location.href,
          icon: 'http://www.zaishangwang.com/imgs/zswLog.png',
      }
      this.share.setShareData(shareData)
			
			if(this.$route.query.type ==1){
				this.keepList = this.newsList1;
				
			}else{
				this.keepList = this.newsList2;
			}
			for(let i = 0; i < this.keepList.length; i++){
				if(this.$route.query.nId != this.keepList[i].n_id){
					this.newsList.push(this.keepList[i])
				}

			}
			// //console.log(this.newsList.length)
			this.loadInfo();
		})


		

	},
	methods:{


    call(command){

      try {
          this.share.call(command)
      } catch (err) {
          // 如果不支持，你可以在这里做降级处理
          alert(err.message)
      }
    },



    queryInfo(id){

      // layer.load();
      // layer.open({type:2,content:"<img src='logo.png' />"})

      this.$http.post('/newsInfo ',{nId:id}).then((res)=>{
        if(res.data.code==0){
          this.news = res.data.response;


          // document.documentElement.scrollTop = document.body.scrollTop =0;
          // layer.closeAll();
        }
      })

    },
    //查询信息
		loadInfo(){

			this.$http.post('/newsInfo1',this.$route.query).then((res)=>{
				if(res.data.code==0){
					// //console.log(res.data);


					this.news = res.data.response;

          // //console.log(this.news)
				}
			})

		},

		// async initDate(){
		// 	// //console.log("加载信息");
		// 	this.$http.post('api/posts').then(function(res){
		// 		//console.log(res);
		// 	},function(err){
		// 		//console.log(err)
		// 	})

		// 	this.$nextTick(()=>{
		// 		//console.log(this.$refs.infoDetail_wrapper);
		// 		this.scroll = new Bscroll(this.$refs.infoDetail_wrapper,{
		// 			click:true
		// 		})
		// 	})

		// },

		refresh (){
			this.scroll.refresh();
			// //console.log('refresh');
		}
	}
}

</script>

<style lang='less'>
@import '../../../assets/css/variable.less';  
@import '../../../plugins/nativeShare.css';  




#top{


	display:none;
  position: fixed;
  z-index:99999;
  background: #FFFFFF;

  bottom:10px;
  right:10px;
  border:1px solid #DDE2E6;
  width:36/@root-font-size;
  height:36/@root-font-size;





  /*//line-height:45/@root-font-size;*/
  border-radius:50%;
  text-align: center;
  img{
    height:12/@root-font-size;
  }
  span{
    display: block;
    font-size:.5rem;
    color:#ACACAC;
  }


}


.infoDetail_page{
	background: #fff;
	position:fixed;
	z-index:999;
	left:0;
	right:0;
	bottom:0;
	top:0;
	overflow-y: auto;
}


.hqzx{

  font-size:.6rem !important;

  .info{
    padding:10/@root-font-size 15/@root-font-size;
  }

  h3{
    color:#000;
    /*padding:5/@root-font-size 10/@root-font-size;*/
    font-weight:bold;
    overflow: hidden;
    /*//padding:0 30/@root-font-size;*/

    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;

    white-space: pre-wrap;
  }

  .time{
    color:#4c4c4c;
    font-size:.7rem !important;
    padding:3/@root-font-size 0;
  }

  section{
    line-height:22/@root-font-size;
    overflow: hidden;
   	font-size:.7rem !important;
    
    img{
    	width:100% !important;
    }
    span{
    	font-size:.7rem !important;
    }

  }

  .more{
    text-align: center;
    height:2em;
    line-height:2em;
    position: relative;

    a{
      color:#277de2;
    }
    i{
      top:8px;
      position: absolute;
      margin-left:6px;
      width: 10px;
      height: 10px;
      border-top: 2px solid #277de2;
      border-right: 2px solid #277de2;
      -webkit-transform: rotate(145deg);
      transform: rotate(135deg);

    }
  }


  .share{

    padding:15/@root-font-size 0;
    border-bottom:5/@root-font-size solid #F0F0F0;

    ul{
      display: flex;

      justify-content: center;
    }

    li{
      margin:0 5/@root-font-size;
      img{
        height:43/@root-font-size;
      }
    }

  }


  .about{


    padding:20/@root-font-size 15/@root-font-size;
    ul{
      border:1px solid #D5D5D5;
    }
    li{
      height:95/@root-font-size;
      border-bottom:1px solid #D5D5D5;
      overflow: hidden;

      display: flex;
      justify-content: space-around;
      padding:12/@root-font-size;

      div.text{
        width:60%;
        padding-right:5/@root-font-size;
        font-size:.6rem;

        display: flex;
        flex-direction:column;
        align-content: space-between;



      }

      p{
        flex:1;

        height:3em;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;

        line-height:1rem;
        /*//white-space: nowrap;*/
      }
      p:last-child{
        display: flex;

        flex-direction: column-reverse;

      }

      span{
        color:#969696;
        display: block;
        margin-top:6px;
      }

      div.img{
        overflow: hidden;
        width:35%;
        img{
          height:83/@root-font-size;
          width:100%;
        }
      }

    }
    li:last-child{
      border:none;
    }

    p.tit{
      color:#000;
      font-weight:bold;
      padding:5/@root-font-size 0;
    }
  }


  .link-box{

    background: #F2F3F7;
    color:#757f89;
    padding:10/@root-font-size 0;
    ul{
      display: flex;
      justify-content: center;

      li{
        margin:0 15/@root-font-size;
        padding:2/@root-font-size 4/@root-font-size;
        font-size:.6rem;
        /*//padding:6/@root-font-size 8/@root-font-size;*/
      }
      li.this{
        border-radius:5px;
        background: #22AD38;
        color:#fff;
      }
    }

    .adv{
      text-align: center;
      padding:10/@root-font-size 0;
      font-size:.8rem;
    }

    .tel{
      display: flex;
      justify-content: space-around;
      font-size:.5rem;
      span{
        color:#22AD38;
      }
    }

    .copy{
      text-align: center;
      padding:12/@root-font-size;
      font-size:.7rem;
    }

  }

}













/* h3{
	text-align: center;
	padding:20px;
	background: #89CDFC;
	color:#fff;
	border:1px solid #000;
}


.infoDetail_page{
	background: #fff;
	position:fixed;
	z-index:999;
	left:0;
	right:0;
	bottom:0;
	top:0;
}
.wrapper_list{
	position:fixed;
	z-index:99;
	left:0;
	right:0;
	bottom:0;
	top:40px;

	background:#ddd;
	overflow-y: scroll;

}
.wrapper{
	position:fixed;
	top:40px;
	bottom:0;
	left:0;
	right:0;
}

ul{
	position: relative;
    z-index: 10;
    background: #fff;
}

li:last-child{
	background: #f00;
}
li{
text-align:center;
	line-height:36px;


    line-height: 38px;
    font-size: 18px;
    padding-left: 20px;
    border-bottom: 1px solid #e5e5e5;

}

li:nth-child(odd){
	background: #3A97FF;
}
 */

/*
#wrapper_list{
	position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
}*/
</style>

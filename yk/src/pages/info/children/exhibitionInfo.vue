<template>
<div class='infoDetail_page'>
	
	<header-top title='详情' back></header-top>
	<div class="fixed-top-div"></div>

	    <div class="content hqzx">
        <div class="info">
            <p class="news_thumb"><img :src=" news.n_image_url " alt=""></p>
            <h3 id="title" v-text="news.n_title"></h3>
            <p class="time"><span v-text=" news.n_date?news.n_date.substring(0,10):'' "></span></p>

            <ul class="list2">
              <li>
                <span><img src="../../../assets/imgs/ex_time.png" alt=""></span>
                <span>展会时间：</span>
                <span>{{ news.start_date +"至"+ news.end_date }}</span>
              </li>
              <li>
                <span><img src="../../../assets/imgs/ex_address.png" alt=""></span>
                <span>展会地点：</span>
                <span>{{news.e_place}}</span>
              </li>
              <li>
                <span><img src="../../../assets/imgs/ex_position.png" alt=""></span>
                <span>详细地址：</span>
                <span>{{news.e_address}}</span>
              </li>
              <li>
                <span><img src="../../../assets/imgs/ex_industry.png" alt=""></span>
                <span>所属行业：</span>
                <span>{{news.e_industry}}</span>
              </li>
              <li>
                <span><img src="../../../assets/imgs/ex_desc.png" alt=""></span>
                <span>会展简介：</span>
                <span></span>
              </li>
            </ul>
            <section v-html='news.n_detail'>
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

       					
                <li v-for="item in newsList.slice(0,3) " @click='queryInfo(item.n_id)'>
                    <div class="text">
                        <p>{{ item.n_resume }}</p>
                        <p><span>{{ item.n_date.substring(0,10) }}</span></p>
                    </div>
                    <div class="img">
                        <img v-bind:src=" item.n_image_url.split(',')[0] " alt=""/>
                    </div>
                </li>   

					<!--<li>
  					  <div class="text">
  					    <p>测试公告循环功能</p>
  					    <p>
  					      <span>2017-02-25</span></p>
  					  </div>
  					  <div class="img">
  					    <img src="http://recycle.market/upload/20170225135450214.jpg" alt=""></div>
  					</li> -->


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

import nativeShare from 'nativeShare'


// console.log(share);


export default{

	data(){
		return{
			news:{},
			newsList:[],
      nShare:null,
		}
	},
	props:{
	    newsList3:{
	      type:Array,
	    },
	},
	components:{
		headerTop
	},
	//最先执行
	created(){
		// console.log(this.$refs.infoDetail_wrapper);
		// console.log("created");
	},
	// computed(){
	// 	console.log(this.$refs.infoDetail_wrapper);
	// 	console.log("computed");
	// },
	mounted() {

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



//			console.log(this.$route.query.nId);
			
			for(let i = 0; i < this.newsList3.length; i++){
				if(this.$route.query.nId != this.newsList3[i].n_id){
					this.newsList.push(this.newsList3[i])
				}

			}
			console.log(this.newsList.length)
			
			this.loadInfo();
		})

	},
	methods:{

    //调用分享
    call(command){

      try {
          this.share.call(command)
      } catch (err) {
          // 如果不支持，你可以在这里做降级处理
          alert(err.message)
      }
    },

    queryInfo(id){

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
					// console.log(res.data);


					this.news = res.data.response;

//        			console.log(this.news)
				}
			})

		},


		refresh (){
			this.scroll.refresh();
			// console.log('refresh');
		}
	}
}

</script>

<style lang='less'>
@import '../../../assets/css/variable.less';	




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
/*  span{
    display: block;
    font-size:.5rem;
    color:#ACACAC;
  }*/


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

.list2{

  li{
    display: flex;
    align-items: center;
    margin:.2rem 0;
    justify-content: flex-start;

    span{
      /*margin-right:.4rem;*/
      /*text-align: center;*/
      overflow: hidden;
      overflow: hidden;
    }
    span:first-child{
      width:12%;
      text-align: center;
    }
    span:nth-child(2){
      width:25%;
      text-align: center;
    }
    span:last-child{
      width:63%;
    }
  }
  img{
    height:1rem;
  }
}

.news_thumb{
  max-height:10rem;
  overflow: hidden;
  img{
    width:100%;
  }
}

.hqzx{

  .info{
    padding:10/@root-font-size 15/@root-font-size;
    font-size:.6rem;
  }



  h3{
    color:#000;
    padding:5/@root-font-size .5rem;
    font-weight:bold;
    overflow: hidden;

    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: pre-wrap;

    font-size:.7rem;
  }

  .time{
    color:#4c4c4c;
    font-size:.7rem;
    padding:3/@root-font-size .5rem;
  }

  section{
    line-height:22/@root-font-size;
    overflow: hidden;
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




</style>

<template>

<div class="notice_page">
	
	<header-top title='公告' back></header-top>
	<div class="fixed-top-div"></div>

    <div class="content">
    
        <ul>
            <li @click="toPage('/user/notice/noticeDetail?n_id='+item.n_id)" v-for="item in noticeList" v-bind:id="item.n_id">
                <div class="novice-list">
                    <span class="col1"><img src="../../../assets/imgs/center/icon_voice.png"/> </span>
                    <span class="col2" v-text="item.n_title"></span><span class="col3" v-text="item.n_date.substring(0,10)"></span>
                </div>
            </li>

        </ul>

    </div>


    <transition>
      <router-view></router-view>
    </transition>

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
      noticeList:[],
      pageNo:1,
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.queryInfo();
    })
  },
  methods:{
    toPage(url){
      this.$router.push(url);
    },
    queryInfo(){
      this.$http.post('/NoticeList',{pageNo:this.pageNo}).then((res)=>{
        if(res.data.code==0){
          this.noticeList = this.noticeList.concat(res.data.response);
        }
      })
    }
  }
}

</script>

<style lang='less' scoped>
@import '../../../assets/css/variable.less';



.notice_page{
	.fixed();
}
.content{

  li{
    border-bottom:1px solid #EAEAEA;
    color:#79DA4B;

    line-height:40/@root-font-size;
    height:40/@root-font-size;;
    overflow:hidden;

  }

  li.read{
    color:#808080;
  }


  div.novice-list{
   /*//line-height:25/@root-font-size;*/
/*    font-size:1px*@font-middle-size;*/
    padding:0px 5px;
    display: flex;




    img{
      height:12/@root-font-size;
    }

    span.col1{
      width:10%;
      text-align: center;
    }

    span.col2{
      width:62%;
      font-size:.7rem;
      overflow:hidden;
    }

    span.col3{
      width:30%;
      color:#808080;
      font-size:.5rem;
      text-align:right;
    }
  }


  .notice-info{
    padding:20px;
    color:#808080;

    font-size:1px*@font-middle-size;
  }

}

</style>
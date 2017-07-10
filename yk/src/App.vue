<template>
  <div>
    <transition name='router-fade' mode='out-in'>
    
      <keep-alive>
        <router-view></router-view>
      </keep-alive>


    </transition>
    <div class="fixed-bottom-div"></div>
    <footer-guide></footer-guide>
  </div>


</template>

<script>

//弹窗组件
import layer from './plugins/layer/layer'

//扩展一个常用的提示层。
layer.msg = function(content, options, end){ //最常用提示层
  return layer.open({
    content:content,
    // time:1.2,
    time:options?options.time:1.2,
    className:"layui-layer-msg",
    style:"height:inherit;width:auto;min-width:100px;background-color:#000;filter:alpha(opacity=60);background-color:rgba(0,0,0,.6);color:#fff;border:none;font-size:.6rem;",
    shade:false,
    end:end,
  })
}

//扩展一个load加载层。
layer.load = ()=>{
let loadSrc = require("./assets/imgs/load.gif")
  return layer.open({
    type:1,
    shadeClose:false,
    shade: 'background-color: rgba(0,0,0,0.01)',
    content:"<img src='"+loadSrc+"' />",
    style:"background:none",
    
  })
}

layer.load2 = ()=>{

  let loadSrc = require("./assets/imgs/load.gif")
    return layer.open({
      type:2,
      content:"<img src='"+loadSrc+"' />",
      //style:"background:none;.layui-m-layercont i{display:none}.layui-m-layercont p{margin-top:0}",
    })
}


layer.login = (obj)=>{
  return layer.open({
    content:"请先登录",
    style:"width:76%",
    // time:1.6,
    btn:['确定','取消'],
    yes:function(index){
      obj.$router.push('/login');
      layer.close(index);
    },
    no:function(index){
      layer.close(index);
    }
  })
}







import footerGuide from '@/components/footer/footer'

export default {
  name: 'app',
  components:{
    footerGuide
  },
  computed (){
    
  },
  mounted (){
    // this.loadList();
  },
  methods:{
    login(){
      console.log('login');
    },
    loadList (){
      this.$http.get('/api/posts').then(function(data){
        console.log(data.data);
      },function(err){
        console.log(err)
      })
    }
  },
}
</script>

<style lang='less'>
@import './plugins/css/layer.css';
@import './assets/reset.less';

@import './assets/css/variable';


/*@import 'social-share.js/dist/css/share.min.css';*/
/*@import './assets/css/common.less';*/


.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .1s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}

.layui-layer-msg .layui-m-layercont{
  padding:.7rem .5rem;
  line-height:1rem;
}


/* 通用样式(显示密码) */
.icon-eye.open{
  /*background: url('../../assets/imgs/icon-eye-open.png') no-repeat center center;*/
  background: url('./assets/imgs/icon-eye-open.png') no-repeat center center !important;
  background-size: 20/@root-font-size 14/@root-font-size !important;
}


/* 上传图片预览层 */
.vue-dropzone .dz-preview .dz-details{
  background-color: inherit !important;
} 

</style>

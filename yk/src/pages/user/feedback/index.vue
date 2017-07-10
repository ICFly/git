<template>
<div class="feedback_page">
	
	<header-top title='投诉建议' back></header-top>
	<div class="fixed-top-div"></div>


    <div class="content feedback">

        <form action="" class="layui-form">
            <div class="form-box">


                <div class="form-group">
<!--                     <input type="text" name='title' v-validate="required|email" v-model='question.title' lay-verify="title"  placeholder="标题"/>

                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span> -->

                    <!-- <input v-validate data-rules="required|email" name="email" type="text" placeholder="Email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span> -->
                    <p class="control has-icon has-icon-right">
                        <input type="text" name='title' v-validate="'required'" v-model='question.title' placeholder="标题"/>
                        <span v-show="errors.has('title')" class="tips">{{ errors.first('title') }}</span>
                    </p>
                </div>
                <div class="form-group">
                    <input type="text" name='contacts' v-validate=" 'required' " v-model='question.contacts' placeholder="联系人"/>
                    <span v-show="errors.has('contacts')" class="tips">{{ errors.first('contacts') }}</span>
                </div>
                <div class="form-group">
                    <input type="text" name='lxfs' v-validate=" 'required' " v-model='question.lxfs' placeholder="联系方式"/>
                    <span v-show="errors.has('lxfs')" class="tips">{{ errors.first('lxfs') }}</span>
                </div>
                <div class="form-group">
                    <textarea placeholder="请留下你的宝贵意见或建议！" v-validate=" 'required' " v-model='question.content' name='content'></textarea>
                    <span v-show="errors.has('content')" class="tips">{{ errors.first('content') }}</span>
                </div>
                <div class="form-group">
                    <input type="submit" @click="checkSuggest" @click.prevent='submit' class="btn-control btn-submit" value="提交"/>
                </div>


            </div>
        </form>

    </div>


</div>
</template>


<script>
	
import {mapFields} from 'vee-validate'

import headerTop from '@/components/header/header'

export default{

	components:{
		headerTop
	},
  data(){
    return{
      question:{
        title:'',
        contacts:'',
        lxfs:'',
        content:''
      }
    }
  },
  methods:{
    submit(){


        // request.body = Url.params(request.body);
        //request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
     	// console.log(this.fields.content.dirty);

      console.log(this.errors.count());
      console.log(this.errors.any());




      this.$http.post('/SubmitComplaint',this.question).then((res)=>{
        console.log(res);
      },(err)=>{
        console.log(err)
      })


      // this.$http.post('/',{}).then((res)=>{

      // },(err)=>{
      //   console.log(err);

      // }).catct((err)=>{
      //   console.log(err);
      // })

      // console.log(this.question);
    },
    //检查input
    checkSuggest(){
    	if(!this.question.title){
    		layer.msg("请输入标题");
    		return;
    	}
    	if(this.question.contacts == ""){
    		layer.msg("请输入联系人");
    		return;
    	}
    	if(this.question.lxfs == ""){
    		layer.msg("请输入联系方式");
    		return;
    	}
    	if(this.question.content == ""){
    		layer.msg("请留下你的宝贵意见或建议！");
    		return;
    	}
    }

  },
  computed:{


  },
  // computed(){

  //   mapFields({
  //     title:"标题"
  //   })


  //   // console.log(this.question);
  // },
 
}

</script>

<style lang='less' scoped>
@import '../../../assets/css/variable.less';	

.feedback_page{
	.fixed();
	/*background:#fff;*/
  background: #F0F0F0;
}	



/*//投诉建议*/

.feedback{


  padding:20/@root-font-size 10/@root-font-size;

  .form-box{

    .form-group{
      margin-bottom:.7rem;
    }


    .tips{
      font-size:.6rem;
      color:#f00;
      padding-left:.2rem;
    }

    input[type=text]{
      border:1px solid #C1C1C1;
      line-height:12/@root-font-size;
      width:100%;
      padding:10/@root-font-size 6/@root-font-size;
      border-radius:.3rem;
      font-size:.6rem;

    }
    textarea{
      font-size:.6rem;
      outline: none;
      height:160/@root-font-size;
      border:1px solid #C1C1C1;
      width:100%;
      resize: none;
      border-radius:.3rem;
      padding:6/@root-font-size;
      /*text-indent: 1em;*/

    }

    .btn-submit{
      width:100%;
      background: #389E3A;
      color:#fff;
      height:36/@root-font-size;
      border-radius:.3rem;
    }



  }
}





</style>
<template>
    
<div class='areaCode_page'>
    <div class="content">
        <div class="search"><input type="search" ref='search' v-model:value="searchQuery" placeholder="搜索"/></div>
        <div id="wrapper" ref='wrapper_box'>
            <div id="scroller">
                <ul class="area">
                    <li v-for="item in filteredList">
                        <div v-bind:id="item[0]" v-if="item.length==1"><i v-text="item[0]"></i></div>
                        <div v-else @click="show(item)"><i v-text="item[1]"></i>+<i v-text="item[2]"></i></div>
                    </li>
                </ul>
            </div>
        </div>
        <ul class="abs">
            <li v-for="item in list" v-if="item.length==1" @click="local(item[0])" v-text="item[0]"></li>
        </ul>
    </div>
</div>

</template>

<script>
 
import area from '../../data/area'
import bScroll from 'better-scroll'

 export default{
    data(){
        return{
            list:[],
            searchQuery:'',
            scroller:{}
        }
    },

    mounted:function(){

        this.$nextTick(function(){

            this.load();

            // setTimeout(()=>{
            //     this.scroller = new bScroll(this.$refs.wrapper_box,{
            //         click:true
            //     })
            // },2000)

        })

    },
    computed:{

        filteredList () {
            var self = this;
            return self.list.filter(function (user) {
                if(user.length>1){
                    return user[1].indexOf(self.searchQuery) !== -1;
                }else{
                    return user[0].indexOf(self.searchQuery) !== -1;
                }
            });
        }
    },
    methods:{

        show(item){
        	this.$emit('chooseArea',item);
        },
        local(val){
            document.getElementById(val).style.color = "#f00";
            var y = document.getElementById(val).offsetTop;

            document.getElementById(val).style.background = "#F0F0F0";

            this.scroller.scrollTo(0,-y,500)

        },
        load(){
            let arr = area;
            for(var i = 0;i<arr.length;i++){
                this.list.push(arr[i].split('-'));
            }


        }

    },
    watch:{
        list(val,old){
            setTimeout(()=>{
                this.scroller = new bScroll(this.$refs.wrapper_box,{
                    click:true
                })
            },2000)
        }
    }


 }   

</script>

<style lang='less' scoped>
    
@import '../../assets/css/variable';


.areaCode_page{
    .fixed();
}

.search{
    /*padding:0px 5px;*/
    /*height:36px;*/
    background: #C9C9CE;
/*    height:2rem;*/
    padding:.2rem;
}
.search input{
    width:100%;
    border:none;
    border-radius: 5px;
    padding:6px 8px;
    font-size:.7rem;

    box-sizing: border-box;
}
.area{
    padding:10px 10px 0 10px;
}
.area li{

    line-height:1.5rem;
    width:90%;
    font-size:.7rem;
    border-bottom:1px solid #D4D4D4;

    /*text-align: center;*/
}

.abs{
    position: absolute;
    top:0;
    bottom:0;
    margin:auto;
    right:.5rem;
    height:80%;
    z-index:999;

}
.abs li{

    font-size:.5rem;
    padding-bottom:40%;
    width:20px;
    text-align: center;

}
.abs li:hover{
    color:#f00;
}

.abs a:hover{
    color:red;
}


#wrapper {
    position:absolute; z-index:1;
    top:2rem;
    bottom:0px;
    left:0;
    width:100%;
    background:#fff;
    overflow:auto;


}

#scroller {
    position:relative;
    /*  -webkit-touch-callout:none;*/
    -webkit-tap-highlight-color:rgba(0,0,0,0);

    float:left;
    width:100%;
    padding:0;
}
</style>
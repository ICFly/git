webpackJsonp([46],{202:function(t,e,n){n(438);var o=n(14)(n(520),n(386),null,null);t.exports=o.exports},210:function(t,e,n){n(213);var o=n(14)(n(214),n(212),"data-v-ff7bd530",null);t.exports=o.exports},211:function(t,e,n){e=t.exports=n(155)(!0),e.push([t.i,"#header_top[data-v-ff7bd530]{line-height:2rem;text-align:center;background:#46c95e;font-size:18px;color:#fff;width:100%;position:fixed;z-index:999}h3[data-v-ff7bd530]{font-size:.9rem;color:#fff}.icon[data-v-ff7bd530]{position:absolute;right:.2rem;top:0;bottom:0;font-size:.7rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.icon img[data-v-ff7bd530]{height:60%}.back[data-v-ff7bd530]{position:absolute;left:0;top:0;bottom:0;width:2rem}.back i[data-v-ff7bd530]{position:absolute;top:0;bottom:0;margin:auto;width:.5rem;height:.5rem;border-top:.1rem solid #fff;border-left:.1rem solid #fff;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}","",{version:3,sources:["H:/vue-router/vue-demo/src/components/header/header.vue"],names:[],mappings:"AACA,6BACE,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,eAAgB,AAChB,WAAY,AACZ,WAAY,AACZ,eAAgB,AAChB,WAAa,CACd,AACD,oBAEE,gBAAiB,AAEjB,UAAY,CACb,AACD,uBACE,kBAAmB,AACnB,YAAa,AACb,MAAO,AACP,SAAU,AAEV,gBAAiB,AACjB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CACjC,AACD,2BACI,UAAY,CACf,AACD,uBACE,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,SAAU,AACV,UAAY,CACb,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,YAAa,AACb,YAAc,AACd,aAAe,AACf,4BAA8B,AAC9B,6BAA+B,AAC/B,iCAAkC,AAC1B,wBAA0B,CACnC",file:"header.vue",sourcesContent:["\n#header_top[data-v-ff7bd530] {\n  line-height: 2rem;\n  text-align: center;\n  background: #46C95E;\n  font-size: 18px;\n  color: #fff;\n  width: 100%;\n  position: fixed;\n  z-index: 999;\n}\nh3[data-v-ff7bd530] {\n  /*line-height:40px;*/\n  font-size: .9rem;\n  /*font-weight:normal;*/\n  color: #fff;\n}\n.icon[data-v-ff7bd530] {\n  position: absolute;\n  right: .2rem;\n  top: 0;\n  bottom: 0;\n  /*width:2rem;*/\n  font-size: .7rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.icon img[data-v-ff7bd530] {\n    height: 60%;\n}\n.back[data-v-ff7bd530] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 2rem;\n}\n.back i[data-v-ff7bd530] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  width: 0.5rem;\n  height: 0.5rem;\n  border-top: 0.1rem solid #fff;\n  border-left: 0.1rem solid #fff;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n"],sourceRoot:""}])},212:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"header_top"}},[n("h3",[t._v(t._s(t.title||"标题"))]),t._v(" "),n("div",{staticClass:"icon"},[t._t("default")],2),t._v(" "),t.back?n("span",{staticClass:"back",on:{click:t.backPage}},[n("i")]):t._e()])},staticRenderFns:[]}},213:function(t,e,n){var o=n(211);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(156)("7e2ad049",o,!0)},214:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},props:{title:"",back:{type:Boolean,dafult:!0}},methods:{backPage:function(){this.$router.go(-1)}}}},293:function(t,e,n){e=t.exports=n(155)(!0),e.push([t.i,"input{outline:none;appearance:button;-moz-appearance:button;-webkit-appearance:button}.fixed-top{top:0;left:0;width:100%;position:fixed;z-index:99}.fixed-top-div{height:2rem}.fixed-bottom-div{height:2.1rem}.font-style-red{color:red}.font-style-orange{color:orange}.font-style-blue{color:blue}.font-style-green{color:green}.more{text-align:center;padding-top:.2rem;padding-bottom:.2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:.7rem}.more img{margin:0 .2rem}.buyOrder_page{position:fixed;top:0;bottom:0;left:0;right:0;background:#fff;overflow-y:auto;z-index:99;z-index:9999}","",{version:3,sources:["H:/vue-router/vue-demo/src/pages/user/transcation/buyOrder/index.vue"],names:[],mappings:"AACA,MACE,aAAc,AACd,kBAAmB,AACnB,uBAAwB,AAExB,yBAA2B,CAE5B,AACD,WACE,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,eAAgB,AAChB,UAAY,CACb,AACD,eACE,WAAa,CACd,AACD,kBACE,aAAe,CAChB,AAED,gBACE,SAAW,CACZ,AACD,mBACE,YAAc,CACf,AACD,iBACE,UAAY,CACb,AACD,kBACE,WAAa,CACd,AACD,MACE,kBAAmB,AACnB,kBAAmB,AACnB,qBAAsB,AACtB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,eAAiB,CAClB,AACD,UACE,cAAgB,CACjB,AACD,eACE,eAAgB,AAChB,MAAO,AACP,SAAU,AACV,OAAQ,AACR,QAAS,AACT,gBAAiB,AACjB,gBAAiB,AACjB,WAAY,AACZ,YAAc,CACf",file:"index.vue",sourcesContent:["\ninput {\n  outline: none;\n  appearance: button;\n  -moz-appearance: button;\n  /* Firefox */\n  -webkit-appearance: button;\n  /* Safari 和 Chrome */\n}\n.fixed-top {\n  top: 0;\n  left: 0;\n  width: 100%;\n  position: fixed;\n  z-index: 99;\n}\n.fixed-top-div {\n  height: 2rem;\n}\n.fixed-bottom-div {\n  height: 2.1rem;\n}\n/* 定义通用字体颜色 */\n.font-style-red {\n  color: red;\n}\n.font-style-orange {\n  color: orange;\n}\n.font-style-blue {\n  color: blue;\n}\n.font-style-green {\n  color: green;\n}\n.more {\n  text-align: center;\n  padding-top: .2rem;\n  padding-bottom: .2rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: .7rem;\n}\n.more img {\n  margin: 0 .2rem;\n}\n.buyOrder_page {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  overflow-y: auto;\n  z-index: 99;\n  z-index: 9999;\n}\n/*.my-order .order-list .order-state-suc*/\n"],sourceRoot:""}])},386:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"buyOrder_page"},[n("header-top",{attrs:{title:"我买的货",back:""}}),t._v(" "),n("div",{staticClass:"fixed-top-div"}),t._v(" "),n("div",{staticClass:"content my-order"},[n("ul",{staticClass:"order-state"},[n("li",{class:{on:1==t.active},on:{click:function(e){t.active=1}}},[t._v("议价中")]),t._v(" "),n("li",{class:{on:2==t.active},on:{click:function(e){t.active=2}}},[t._v("交易中")]),t._v(" "),n("li",{class:{on:3==t.active},on:{click:function(e){t.active=3}}},[t._v("已成交")]),t._v(" "),n("li",{class:{on:4==t.active},on:{click:function(e){t.active=4}}},[t._v("已结束")])]),t._v(" "),n("div",{ref:"orderList2",staticClass:"order-list"},[1==t.active?n("ul",{staticClass:"order-state-1"},[t._l(t.orderList1,function(e,o){return n("li",{on:{click:function(n){t.toPage("/user/transcationList/buyOrder/orderDetail?id="+e.t_id)}}},[n("div",{staticClass:"order-tit"},[n("span",{staticClass:"tit",domProps:{textContent:t._s(e.t_id)}}),t._v(" "),e.cj_price<0?n("span",[t._v("出价中")]):n("span",{staticClass:"font-style-orange-circle"},[t._v("议价中")])]),t._v(" "),n("div",{staticClass:"order-info"},[n("div",{staticClass:"order-flex"},[n("div",{staticClass:"order-img"},[n("img",{attrs:{src:t.splitImg(e.p_file),alt:""}})]),t._v(" "),n("div",{staticClass:"order-param"},[n("h3",[t._v(t._s(e.t_title))]),t._v(" "),n("p",[n("span",[t._v("数量：")]),t._v(t._s(e.t_quality+""+e.dw_name))]),t._v(" "),n("p",[n("span",[t._v("地区：")]),t._v(t._s(e.dz_name))]),t._v(" "),n("p",[n("span",[t._v("上线时间：")]),t._v(t._s(e.pass_time.substring(0,10)))]),t._v(" "),n("p",[e.cj_price>0?n("span",[t._v("当前出价："),n("i",{staticClass:"font-style-orange-circle"},[t._v(t._s(e.cj_price))]),t._v(t._s(e.bz_name)+"/"+t._s(e.dw_name))]):t._e()])])]),t._v(" "),n("div",{staticClass:"order-btn",staticStyle:{"justify-content":"flex-end"}},[(e.t_price,n("a",{staticClass:"bd-orange-money font-style-orange-circle f_right",on:{click:function(n){t.toPage("/xhjy/wycj.html?id="+e.t_id)}}},[t._v("继续出价")]))])])])}),t._v(" "),t.orderList1.length<=0?n("li",{staticClass:"tip"},[t._v("没有了...")]):t._e()],2):t._e(),t._v(" "),2==t.active?n("ul",{ref:"orderList22",staticClass:"order-state-2"},t._l(t.orderList2,function(e,o){return n("li",{on:{click:function(n){t.toPage("/user/transcationList/buyOrder/orderDetail?id="+e.t_id)}}},[n("div",{staticClass:"order-tit"},[n("span",{staticClass:"tit",domProps:{textContent:t._s(e.t_id)}})]),t._v(" "),n("div",{staticClass:"order-info"},[n("div",{staticClass:"order-flex"},[n("div",{staticClass:"order-img"},[n("img",{attrs:{src:t.splitImg(e.p_file),alt:""}})]),t._v(" "),n("div",{staticClass:"order-param"},[n("h3",[n("i",{domProps:{textContent:t._s(e.t_title)}}),t._v(" "),""==e.t_price?n("span",[t._v("出价成功")]):n("span",[t._v("还价成功")])]),t._v(" "),n("p",[n("span",[t._v("数量：")]),n("i",{domProps:{textContent:t._s(e.t_quality)}}),n("i",{domProps:{textContent:t._s(e.dw_name)}})]),t._v(" "),n("p",[n("span",[t._v("地区：")]),n("i",{domProps:{textContent:t._s(e.dz_name)}})]),t._v(" "),n("p",[n("span",[t._v("上线时间：")]),n("i",{domProps:{textContent:t._s(e.pass_time.substring(0,10))}})]),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[n("span",[t._v("成交价格："),n("i",{staticClass:"order-state-suc",domProps:{textContent:t._s(e.final_price)}}),n("i",{domProps:{textContent:t._s(e.bz_name)}}),t._v("/"),n("i",{domProps:{textContent:t._s(e.dw_name)}})])])])]),t._v(" "),n("div",{staticClass:"order-btn"},[""==e.tbBail?n("a",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"order-btn-bond"},[t._v("\r\n                                提交保证金\r\n                                "),n("span",{staticStyle:{"font-size":"10px"}},[n("i",{domProps:{textContent:t._s(e.endDate_days+"天")}}),t._v(" "),n("i",{domProps:{textContent:t._s(e.endDate_hours+"时")}}),t._v(" "),n("i",{domProps:{textContent:t._s(e.endDate_minutes+"分")}}),t._v(" "),n("i",{domProps:{textContent:t._s(e.endDate_seconds+"秒")}})])]):e.tbBail.length>0&&0==e.zbBail.length?n("a",{staticClass:"font-style-orange-circle"},[t._v("等待对方提交保证金")]):t._e(),t._v(" "),e.tbBail.length>0&&e.zbBail.length>0&&1==e.t_surestate?n("a",{staticClass:"order-btn-ok"},[t._v("待对方确认")]):t._e(),t._v(" "),e.tbBail.length>0&&e.zbBail.length>0&&0==e.t_surestate||-1==e.t_surestate||""==e.t_surestate?n("a",{staticClass:"order-btn-ok"},[t._v("待对方确认")]):t._e()])])])})):t._e(),t._v(" "),3==t.active?n("ul",{staticClass:"order-state-3"},t._l(t.orderList4,function(e,o){return n("li",{on:{click:function(n){t.toPage("/user/transcationList/buyOrder/orderDetail?id="+e.t_id)}}},[n("div",{staticClass:"order-tit"},[n("span",{staticClass:"tit"},[n("i",{domProps:{textContent:t._s(e.t_id)}})]),t._v(" "),n("span",[t._v("成交价格："),n("i",{staticClass:"order-state-suc",domProps:{textContent:t._s(e.final_price)}}),n("i",{domProps:{textContent:t._s(e.bz_name)}}),t._v("/"),n("i",{domProps:{textContent:t._s(e.dw_name)}})])]),t._v(" "),n("div",{staticClass:"order-info"},[n("div",{staticClass:"order-flex"},[n("div",{staticClass:"order-img"},[n("img",{attrs:{src:t.splitImg(e.p_file),alt:""}})]),t._v(" "),n("div",{staticClass:"order-param"},[n("h3",{domProps:{textContent:t._s(e.t_title)}}),t._v(" "),n("p",[n("span",[t._v("数量：")]),n("i",{domProps:{textContent:t._s(e.t_quality)}}),t._v("/"),n("i",{domProps:{textContent:t._s(e.dw_name)}})]),t._v(" "),n("p",[n("span",[t._v("地区：")]),n("i",{domProps:{textContent:t._s(e.dz_name)}})]),t._v(" "),n("p",[n("span",[t._v("上线时间：")]),n("i",{domProps:{textContent:t._s(e.pass_time.substring(0,10))}})])])]),t._v(" "),n("div",{staticClass:"order-btn",staticStyle:{"justify-content":"flex-end"}},[n("a",{staticClass:"order-btn-del mg5",on:{click:function(n){n.stopPropagation(),t.deleteOrder(e.t_id,o)}}},[t._v("删除")]),t._v(" "),n("a",{staticClass:"order-btn-endtime"},[t._v("已成交")])])])])})):t._e(),t._v(" "),4==t.active?n("ul",{staticClass:"order-state-4"},t._l(t.orderList3,function(e,o){return n("li",{on:{click:function(n){t.toPage("/user/transcationList/buyOrder/orderDetail?id="+e.t_id)}}},[n("div",{staticClass:"order-tit"},[n("span",{staticClass:"tit",domProps:{textContent:t._s(e.t_id)}}),t._v(" "),n("span",[t._v("已结束")])]),t._v(" "),n("div",{staticClass:"order-info"},[n("div",{staticClass:"order-flex"},[n("div",{staticClass:"order-img"},[n("img",{staticClass:"img4",attrs:{src:t.splitImg(e.p_file),alt:""}})]),t._v(" "),n("div",{staticClass:"order-param"},[n("h3",{domProps:{textContent:t._s(e.t_title)}}),t._v(" "),n("p",[n("span",[t._v("数量：")]),n("i",{domProps:{textContent:t._s(e.t_quality)}}),n("i",{domProps:{textContent:t._s(e.dw_name)}})]),t._v(" "),n("p",[n("span",[t._v("地区：")]),n("i",{domProps:{textContent:t._s(e.dz_name)}})]),t._v(" "),n("p",[n("span",[t._v("上线时间：")]),n("i",{domProps:{textContent:t._s(e.pass_time.substring(0,10))}})])])]),t._v(" "),n("div",{staticClass:"order-btn",staticStyle:{"justify-content":"flex-end"}},[n("a",{staticClass:"order-btn-del mg5",on:{click:function(n){n.stopPropagation(),t.deleteOrder2(e.t_id,o)}}},[t._v("删除")]),t._v(" "),n("a",{staticClass:"order-btn-endtime"},[t._v("已结束")])])])])})):t._e()])]),t._v(" "),n("transition",[n("router-view")],1)],1)},staticRenderFns:[]}},438:function(t,e,n){var o=n(293);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(156)("abac0494",o,!0)},520:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(210),s=n.n(o),i=(n(23),n(38));n.n(i);e.default={components:{headerTop:s.a},data:function(){return{active:2,pageNo:1,orderList1:[],orderList2:[],orderList3:[],orderList4:[],type1PageNo:1,type2PageNo:1,type3PageNo:1,type4PageNo:1}},mounted:function(){var t=this;this.$nextTick(function(){t.queryOrderInfoByType1(),t.queryOrderInfoByType2(),t.queryOrderInfoByType3(),t.queryOrderInfoByType4()})},watch:{active:function(){}},methods:{load2:function(){console.log("++++++++++++++++++++++++"),this.type2PageNo++,this.queryOrderInfoByType2()},queryOrderInfoByType1:function(){var t=this;this.$http.post("/TBGL",{vip:this.$store.getters.getVip,type:1,pageNo:this.type1PageNo}).then(function(e){0==e.data.code&&(t.orderList1=t.orderList1.concat(e.data.response))})},queryOrderInfoByType2:function(){var t=this;this.$http.post("/TBGL",{vip:this.$store.getters.getVip,type:2,pageNo:this.type2PageNo}).then(function(e){0==e.data.code&&(t.orderList2=t.orderList2.concat(e.data.response))})},queryOrderInfoByType3:function(){var t=this;this.$http.post("/TBGL",{vip:this.$store.getters.getVip,type:3,pageNo:this.type3PageNo}).then(function(e){0==e.data.code&&(t.orderList3=t.orderList3.concat(e.data.response))})},queryOrderInfoByType4:function(){var t=this;this.$http.post("/TBGL",{vip:this.$store.getters.getVip,type:4,pageNo:this.type4PageNo}).then(function(e){0==e.data.code&&(t.orderList4=t.orderList4.concat(e.data.response))})},deleteOrder:function(t,e){var n=this;layer.open({content:"确定删除吗",btn:["确定","取消"],yes:function(){n.$http.post("/deleteRecord",{uId:n.$store.getters.getVip,vId:t}).then(function(t){0==t.data.code?(n.orderList3.splice(e,1),layer.open({content:"删除成功。",skin:"msg",time:1.2})):layer.open({content:"删除失败!",skin:"msg",time:2})}),layer.closeAll()},no:function(){layer.closeAll()}})},deleteOrder2:function(t,e){var n=this;layer.open({content:"确定删除吗",btn:["确定","取消"],yes:function(){n.$http.post("/deleteRecord",{uId:n.$store.getters.getVip,vId:t}).then(function(t){0==t.data.code?(n.orderList4.splice(e,1),layer.open({content:"删除成功。",skin:"msg",time:1.2})):layer.open({content:"删除失败!",skin:"msg",time:2})}),layer.closeAll()},no:function(){layer.closeAll()}})},splitImg:function(t){return t.split(",")[0]},toPage:function(t){this.$router.push(t)},formatTime:function(t,e){console.log(t);var n=this,o=new Date(t.replace(/-/g,"/"));o.getTime()-(new Date).getTime()<=0||function(){console.log("time============");var t=setInterval(function(){var s=o.getTime()-(new Date).getTime(),i=Math.floor(s/864e5),r=s%864e5,a=Math.floor(r/36e5),d=r%36e5,A=Math.floor(d/6e4),c=d%6e4,l=Math.round(c/1e3);n.$set(e,"endDate_days",i),n.$set(e,"endDate_hours",a),n.$set(e,"endDate_minutes",A),n.$set(e,"endDate_seconds",l),s<=0&&clearInterval(t)},1e3)}()}}}}});
//# sourceMappingURL=46.5180d58f70bac499b2d1.js.map
webpackJsonp([44],{205:function(e,t,r){r(448);var o=r(14)(r(523),r(398),null,null);e.exports=o.exports},210:function(e,t,r){r(213);var o=r(14)(r(214),r(212),"data-v-ff7bd530",null);e.exports=o.exports},211:function(e,t,r){t=e.exports=r(155)(!0),t.push([e.i,"#header_top[data-v-ff7bd530]{line-height:2rem;text-align:center;background:#46c95e;font-size:18px;color:#fff;width:100%;position:fixed;z-index:999}h3[data-v-ff7bd530]{font-size:.9rem;color:#fff}.icon[data-v-ff7bd530]{position:absolute;right:.2rem;top:0;bottom:0;font-size:.7rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.icon img[data-v-ff7bd530]{height:60%}.back[data-v-ff7bd530]{position:absolute;left:0;top:0;bottom:0;width:2rem}.back i[data-v-ff7bd530]{position:absolute;top:0;bottom:0;margin:auto;width:.5rem;height:.5rem;border-top:.1rem solid #fff;border-left:.1rem solid #fff;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}","",{version:3,sources:["H:/vue-router/vue-demo/src/components/header/header.vue"],names:[],mappings:"AACA,6BACE,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,eAAgB,AAChB,WAAY,AACZ,WAAY,AACZ,eAAgB,AAChB,WAAa,CACd,AACD,oBAEE,gBAAiB,AAEjB,UAAY,CACb,AACD,uBACE,kBAAmB,AACnB,YAAa,AACb,MAAO,AACP,SAAU,AAEV,gBAAiB,AACjB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CACjC,AACD,2BACI,UAAY,CACf,AACD,uBACE,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,SAAU,AACV,UAAY,CACb,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,YAAa,AACb,YAAc,AACd,aAAe,AACf,4BAA8B,AAC9B,6BAA+B,AAC/B,iCAAkC,AAC1B,wBAA0B,CACnC",file:"header.vue",sourcesContent:["\n#header_top[data-v-ff7bd530] {\n  line-height: 2rem;\n  text-align: center;\n  background: #46C95E;\n  font-size: 18px;\n  color: #fff;\n  width: 100%;\n  position: fixed;\n  z-index: 999;\n}\nh3[data-v-ff7bd530] {\n  /*line-height:40px;*/\n  font-size: .9rem;\n  /*font-weight:normal;*/\n  color: #fff;\n}\n.icon[data-v-ff7bd530] {\n  position: absolute;\n  right: .2rem;\n  top: 0;\n  bottom: 0;\n  /*width:2rem;*/\n  font-size: .7rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.icon img[data-v-ff7bd530] {\n    height: 60%;\n}\n.back[data-v-ff7bd530] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 2rem;\n}\n.back i[data-v-ff7bd530] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  width: 0.5rem;\n  height: 0.5rem;\n  border-top: 0.1rem solid #fff;\n  border-left: 0.1rem solid #fff;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n"],sourceRoot:""}])},212:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"header_top"}},[r("h3",[e._v(e._s(e.title||"标题"))]),e._v(" "),r("div",{staticClass:"icon"},[e._t("default")],2),e._v(" "),e.back?r("span",{staticClass:"back",on:{click:e.backPage}},[r("i")]):e._e()])},staticRenderFns:[]}},213:function(e,t,r){var o=r(211);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r(156)("7e2ad049",o,!0)},214:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},props:{title:"",back:{type:Boolean,dafult:!0}},methods:{backPage:function(){this.$router.go(-1)}}}},303:function(e,t,r){t=e.exports=r(155)(!0),t.push([e.i,'input{outline:none;appearance:button;-moz-appearance:button;-webkit-appearance:button}.fixed-top{top:0;left:0;width:100%;position:fixed;z-index:99}.fixed-top-div{height:2rem}.fixed-bottom-div{height:2.1rem}.font-style-red{color:red}.font-style-orange{color:orange}.font-style-blue{color:blue}.font-style-green{color:green}.more{text-align:center;padding-top:.2rem;padding-bottom:.2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:.7rem}.more img{margin:0 .2rem}.buyOrder_page{position:fixed;top:0;bottom:0;left:0;right:0;background:#fff;overflow-y:auto;z-index:99;z-index:9999}.tip{text-align:center;font-size:.6rem;margin:.5rem 0}.font-style-orange-circle{color:orange;border:1px solid orange}.my-order .order-state{display:-webkit-box;display:-ms-flexbox;display:flex;background:#fff}.my-order .order-state li{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center;line-height:2.1875rem;border-bottom:2px solid #aaa;position:relative;font-size:.7rem}.my-order .order-state li:after{content:"";width:1px;height:20px;background:#aaa;position:absolute;right:-1px;top:0;bottom:0;margin:auto}.my-order .order-state li.on{color:#7adc4d;border-color:#7adc4d;transition:all .3s}.my-order .order-list .order-state-suc{color:#ff8a00}.my-order .order-list li{background:#fff;overflow:hidden;padding:0 .625rem}.my-order .order-list .order-tit{line-height:1.875rem;border-bottom:1px solid #f0f0f0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:.6rem}.my-order .order-list .order-flex{display:-webkit-box;display:-ms-flexbox;display:flex;padding:.3125rem 0}.my-order .order-list .order-flex div{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.my-order .order-list .order-img{margin-right:1.25rem;width:40%;overflow:hidden}.my-order .order-list .order-img img{height:3.75rem;width:100%}.my-order .order-list h3{color:#333;margin-bottom:3px;overflow:hidden;-ms-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;font-size:.7rem}.my-order .order-list h3 span{float:right;color:#ff8a00;font-size:14px;font-weight:400}.my-order .order-list .order-param{color:#888;width:60%;font-size:.6rem;line-height:.94rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.my-order .order-list .order-param span{display:inline-block}.my-order .order-list .order-btn{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;border-top:1px solid #f0f0f0;padding:.3125rem 0}.my-order .order-list .order-btn a{width:3.75rem;box-sizing:border-box;margin:0 .3rem;height:100%;border:1px solid #fff;font-size:.6rem;text-align:center;border-radius:4px;border:1px solid orange;padding:.3rem}.my-order .order-list .order-btn a.order-btn-bond{color:gray;line-height:normal;border-color:gray}.my-order .order-list .order-btn a.order-btn-linkman,.my-order .order-list .order-btn a.order-btn-orange{color:#ff8a00;border-color:#ff8a00}.my-order .order-list .order-btn a.order-btn-red{color:red;border-color:red}.my-order .order-list .order-btn a.order-btn-ok{color:#7adc4d;border-color:#7adc4d}.my-order .order-list .order-btn a.order-btn-del{color:#ff8901;border-color:#ff8901}.my-order .order-list .order-btn a.order-btn-endtime{color:gray;border-color:gray}.my-order .order-list .order-btn a.order-btn-endbuy,.my-order .order-list .order-btn a.order-btn-lookmoney,.my-order .order-list .order-btn a.order-btn-updatemoney{color:#ff8901;border-color:#ff8901}',"",{version:3,sources:["H:/vue-router/vue-demo/src/pages/user/transcation/saleOrder/passOrder.vue"],names:[],mappings:"AACA,MACE,aAAc,AACd,kBAAmB,AACnB,uBAAwB,AAExB,yBAA2B,CAE5B,AACD,WACE,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,eAAgB,AAChB,UAAY,CACb,AACD,eACE,WAAa,CACd,AACD,kBACE,aAAe,CAChB,AAED,gBACE,SAAW,CACZ,AACD,mBACE,YAAc,CACf,AACD,iBACE,UAAY,CACb,AACD,kBACE,WAAa,CACd,AACD,MACE,kBAAmB,AACnB,kBAAmB,AACnB,qBAAsB,AACtB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,eAAiB,CAClB,AACD,UACE,cAAgB,CACjB,AACD,eACE,eAAgB,AAChB,MAAO,AACP,SAAU,AACV,OAAQ,AACR,QAAS,AACT,gBAAiB,AACjB,gBAAiB,AACjB,WAAY,AACZ,YAAc,CACf,AAGD,KACE,kBAAmB,AACnB,gBAAiB,AACjB,cAAgB,CACjB,AACD,0BACE,aAAc,AACd,uBAAyB,CAC1B,AACD,uBACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,eAAiB,CAClB,AACD,0BACE,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,kBAAmB,AACnB,sBAAuB,AACvB,6BAAiC,AACjC,kBAAmB,AACnB,eAAiB,CAClB,AACD,gCACE,WAAY,AACZ,UAAW,AACX,YAAa,AACb,gBAAoB,AACpB,kBAAmB,AACnB,WAAY,AACZ,MAAO,AACP,SAAU,AACV,WAAa,CACd,AACD,6BACE,cAAe,AACf,qBAAsB,AACtB,kBAAoB,CACrB,AACD,uCACE,aAAe,CAChB,AACD,yBACE,gBAAiB,AAEjB,gBAAiB,AACjB,iBAAoB,CACrB,AACD,iCACE,qBAAsB,AACtB,gCAAiC,AACjC,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,8BAA+B,AACvC,eAAiB,CAClB,AACD,kCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,kBAAqB,CACtB,AACD,sCACE,uBAAwB,AACpB,oBAAqB,AACjB,0BAA4B,CACrC,AACD,iCACE,qBAAsB,AACtB,UAAW,AACX,eAAiB,CAIlB,AACD,qCACE,eAAgB,AAChB,UAAY,CACb,AACD,yBACE,WAAY,AACZ,kBAAmB,AACnB,gBAAiB,AACjB,2BAA4B,AAC5B,uBAAwB,AACxB,mBAAoB,AACpB,eAAiB,CAClB,AACD,8BACE,YAAa,AACb,cAAe,AACf,eAAgB,AAChB,eAAoB,CACrB,AACD,mCACE,WAAe,AACf,UAAW,AACX,gBAAiB,AACjB,mBAAoB,AACpB,gBAAiB,AACjB,mBAAoB,AACpB,sBAAwB,CACzB,AAID,wCACE,oBAAsB,CACvB,AACD,iCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,8BAA+B,AACvC,6BAA8B,AAC9B,kBAAqB,CACtB,AACD,mCACE,cAAe,AACf,sBAAuB,AACvB,eAAgB,AAChB,YAAa,AACb,sBAAuB,AACvB,gBAAiB,AACjB,kBAAmB,AACnB,kBAAmB,AACnB,wBAAyB,AACzB,aAAe,CAChB,AACD,kDACE,WAAe,AACf,mBAAoB,AACpB,iBAAsB,CACvB,AAKD,yGACE,cAAe,AACf,oBAAsB,CACvB,AACD,iDACE,UAAW,AACX,gBAAkB,CACnB,AACD,gDACE,cAAe,AACf,oBAAsB,CACvB,AACD,iDACE,cAAe,AACf,oBAAsB,CACvB,AACD,qDACE,WAAe,AACf,iBAAsB,CACvB,AACD,oKAGE,cAAe,AACf,oBAAsB,CACvB",file:"passOrder.vue",sourcesContent:["\ninput {\n  outline: none;\n  appearance: button;\n  -moz-appearance: button;\n  /* Firefox */\n  -webkit-appearance: button;\n  /* Safari 和 Chrome */\n}\n.fixed-top {\n  top: 0;\n  left: 0;\n  width: 100%;\n  position: fixed;\n  z-index: 99;\n}\n.fixed-top-div {\n  height: 2rem;\n}\n.fixed-bottom-div {\n  height: 2.1rem;\n}\n/* 定义通用字体颜色 */\n.font-style-red {\n  color: red;\n}\n.font-style-orange {\n  color: orange;\n}\n.font-style-blue {\n  color: blue;\n}\n.font-style-green {\n  color: green;\n}\n.more {\n  text-align: center;\n  padding-top: .2rem;\n  padding-bottom: .2rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: .7rem;\n}\n.more img {\n  margin: 0 .2rem;\n}\n.buyOrder_page {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  overflow-y: auto;\n  z-index: 99;\n  z-index: 9999;\n}\n/*.my-order .order-list .order-state-suc*/\n/*===我的订单====*/\n.tip {\n  text-align: center;\n  font-size: .6rem;\n  margin: .5rem 0;\n}\n.font-style-orange-circle {\n  color: orange;\n  border: 1px solid orange;\n}\n.my-order .order-state {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background: #fff;\n}\n.my-order .order-state li {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: center;\n  line-height: 2.1875rem;\n  border-bottom: 2px solid #AAAAAA;\n  position: relative;\n  font-size: .7rem;\n}\n.my-order .order-state li:after {\n  content: '';\n  width: 1px;\n  height: 20px;\n  background: #AAAAAA;\n  position: absolute;\n  right: -1px;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n}\n.my-order .order-state li.on {\n  color: #7adc4d;\n  border-color: #7adc4d;\n  transition: all .3s;\n}\n.my-order .order-list .order-state-suc {\n  color: #ff8a00;\n}\n.my-order .order-list li {\n  background: #fff;\n  /*margin-top:10/@root-font-size;*/\n  overflow: hidden;\n  padding: 0 0.625rem;\n}\n.my-order .order-list .order-tit {\n  line-height: 1.875rem;\n  border-bottom: 1px solid #F0F0F0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: .6rem;\n}\n.my-order .order-list .order-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0.3125rem 0;\n}\n.my-order .order-list .order-flex div {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.my-order .order-list .order-img {\n  margin-right: 1.25rem;\n  width: 40%;\n  overflow: hidden;\n  /*      .img4{\n        height: 100/@root-font-size;\n      }*/\n}\n.my-order .order-list .order-img img {\n  height: 3.75rem;\n  width: 100%;\n}\n.my-order .order-list h3 {\n  color: #333;\n  margin-bottom: 3px;\n  overflow: hidden;\n  -ms-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: .7rem;\n}\n.my-order .order-list h3 span {\n  float: right;\n  color: #ff8a00;\n  font-size: 14px;\n  font-weight: normal;\n}\n.my-order .order-list .order-param {\n  color: #888888;\n  width: 60%;\n  font-size: .6rem;\n  line-height: .94rem;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.my-order .order-list .order-param p {\n  /*margin-bottom:5px;*/\n}\n.my-order .order-list .order-param span {\n  display: inline-block;\n}\n.my-order .order-list .order-btn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  border-top: 1px solid #F0F0F0;\n  padding: 0.3125rem 0;\n}\n.my-order .order-list .order-btn a {\n  width: 3.75rem;\n  box-sizing: border-box;\n  margin: 0 .3rem;\n  height: 100%;\n  border: 1px solid #fff;\n  font-size: .6rem;\n  text-align: center;\n  border-radius: 4px;\n  border: 1px solid orange;\n  padding: .3rem;\n}\n.my-order .order-list .order-btn a.order-btn-bond {\n  color: #808080;\n  line-height: normal;\n  border-color: #808080;\n}\n.my-order .order-list .order-btn a.order-btn-linkman {\n  color: #FF8A00;\n  border-color: #FF8A00;\n}\n.my-order .order-list .order-btn a.order-btn-orange {\n  color: #FF8A00;\n  border-color: #FF8A00;\n}\n.my-order .order-list .order-btn a.order-btn-red {\n  color: red;\n  border-color: red;\n}\n.my-order .order-list .order-btn a.order-btn-ok {\n  color: #7ADC4D;\n  border-color: #7ADC4D;\n}\n.my-order .order-list .order-btn a.order-btn-del {\n  color: #FF8901;\n  border-color: #FF8901;\n}\n.my-order .order-list .order-btn a.order-btn-endtime {\n  color: #808080;\n  border-color: #808080;\n}\n.my-order .order-list .order-btn a.order-btn-endbuy,\n.my-order .order-list .order-btn a.order-btn-updatemoney,\n.my-order .order-list .order-btn a.order-btn-lookmoney {\n  color: #FF8901;\n  border-color: #FF8901;\n}\n"],sourceRoot:""}])},398:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"buyOrder_page"},[r("header-top",{attrs:{title:"审核通过",back:""}}),e._v(" "),r("div",{staticClass:"fixed-top-div"}),e._v(" "),r("div",{staticClass:"content my-order"},[r("ul",{staticClass:"order-state"},[r("li",{class:{on:1==e.active},on:{click:function(t){e.active=1}}},[e._v("议价中")]),e._v(" "),r("li",{class:{on:2==e.active},on:{click:function(t){e.active=2}}},[e._v("交易中")]),e._v(" "),r("li",{class:{on:3==e.active},on:{click:function(t){e.active=3}}},[e._v("已成交")]),e._v(" "),r("li",{class:{on:4==e.active},on:{click:function(t){e.active=4}}},[e._v("已结束")])]),e._v(" "),r("div",{ref:"orderList2",staticClass:"order-list"},[1==e.active?r("ul",{staticClass:"order-state-1"},[e._l(e.orderList1,function(t,o){return r("li",{on:{click:function(r){e.toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+t.t_id)}}},[r("div",{staticClass:"order-tit"},[r("span",{staticClass:"tit",domProps:{textContent:e._s(t.t_id)}}),e._v(" "),t.cj_price<0?r("span",[e._v("出价中")]):r("span",{staticClass:"font-style-orange-circle"},[e._v("议价中")])]),e._v(" "),r("div",{staticClass:"order-info"},[r("div",{staticClass:"order-flex"},[r("div",{staticClass:"order-img"},[r("img",{attrs:{src:e.splitImg(t.p_file),alt:""}})]),e._v(" "),r("div",{staticClass:"order-param"},[r("h3",[e._v(e._s(t.t_title))]),e._v(" "),r("p",[r("span",[e._v("数量：")]),e._v(e._s(t.t_quality+""+t.dw_name))]),e._v(" "),r("p",[r("span",[e._v("地区：")]),e._v(e._s(t.dz_name))]),e._v(" "),r("p",[r("span",[e._v("上线时间：")]),e._v(e._s(t.pass_time.substring(0,10)))]),e._v(" "),r("p",[t.cj_price>0?r("span",[e._v("当前出价："),r("i",{staticClass:"font-style-orange-circle"},[e._v(e._s(t.cj_price))]),e._v(e._s(t.bz_name)+"/"+e._s(t.dw_name))]):e._e()])])]),e._v(" "),r("div",{staticClass:"order-btn",staticStyle:{"justify-content":"flex-end"}},[(t.t_price,r("a",{staticClass:"bd-orange-money font-style-orange-circle f_right",on:{click:function(r){e.toPage("/xhjy/wycj.html?id="+t.t_id)}}},[e._v("继续出价")]))])])])}),e._v(" "),e.orderList1.length<=0?r("li",{staticClass:"tip"},[e._v("没有了...")]):e._e()],2):e._e(),e._v(" "),2==e.active?r("ul",{ref:"orderList22",staticClass:"order-state-2"},e._l(e.orderList2,function(t,o){return r("li",{on:{click:function(r){e.toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+t.t_id)}}},[r("div",{staticClass:"order-tit"},[r("span",{staticClass:"tit",domProps:{textContent:e._s(t.t_id)}})]),e._v(" "),r("div",{staticClass:"order-info"},[r("div",{staticClass:"order-flex"},[r("div",{staticClass:"order-img"},[r("img",{attrs:{src:e.splitImg(t.p_file),alt:""}})]),e._v(" "),r("div",{staticClass:"order-param"},[r("h3",[r("i",{domProps:{textContent:e._s(t.t_title)}}),e._v(" "),""==t.t_price?r("span",[e._v("出价成功")]):r("span",[e._v("还价成功")])]),e._v(" "),r("p",[r("span",[e._v("数量：")]),r("i",{domProps:{textContent:e._s(t.t_quality)}}),r("i",{domProps:{textContent:e._s(t.dw_name)}})]),e._v(" "),r("p",[r("span",[e._v("地区：")]),r("i",{domProps:{textContent:e._s(t.dz_name)}})]),e._v(" "),r("p",[r("span",[e._v("上线时间：")]),r("i",{domProps:{textContent:e._s(t.pass_time.substring(0,10))}})]),e._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[r("span",[e._v("成交价格："),r("i",{staticClass:"order-state-suc",domProps:{textContent:e._s(t.final_price)}}),r("i",{domProps:{textContent:e._s(t.bz_name)}}),e._v("/"),r("i",{domProps:{textContent:e._s(t.dw_name)}})])])])]),e._v(" "),r("div",{staticClass:"order-btn"},[""==t.tbBail?r("a",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"order-btn-bond"},[e._v("\r\n                                提交保证金\r\n                                "),r("span",{staticStyle:{"font-size":"10px"}},[r("i",{domProps:{textContent:e._s(t.endDate_days+"天")}}),e._v(" "),r("i",{domProps:{textContent:e._s(t.endDate_hours+"时")}}),e._v(" "),r("i",{domProps:{textContent:e._s(t.endDate_minutes+"分")}}),e._v(" "),r("i",{domProps:{textContent:e._s(t.endDate_seconds+"秒")}})])]):t.tbBail.length>0&&0==t.zbBail.length?r("a",{staticClass:"font-style-orange-circle"},[e._v("等待对方提交保证金")]):e._e(),e._v(" "),t.tbBail.length>0&&t.zbBail.length>0&&1==t.t_surestate?r("a",{staticClass:"order-btn-ok"},[e._v("待对方确认")]):e._e(),e._v(" "),t.tbBail.length>0&&t.zbBail.length>0&&0==t.t_surestate||-1==t.t_surestate||""==t.t_surestate?r("a",{staticClass:"order-btn-ok"},[e._v("待对方确认")]):e._e()])])])})):e._e(),e._v(" "),3==e.active?r("ul",{staticClass:"order-state-3"},e._l(e.orderList3,function(t,o){return r("li",{on:{click:function(r){e.toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+t.t_id)}}},[r("div",{staticClass:"order-tit"},[r("span",{staticClass:"tit"},[r("i",{domProps:{textContent:e._s(t.t_id)}})]),e._v(" "),r("span",[e._v("成交价格："),r("i",{staticClass:"order-state-suc",domProps:{textContent:e._s(t.final_price)}}),r("i",{domProps:{textContent:e._s(t.bz_name)}}),e._v("/"),r("i",{domProps:{textContent:e._s(t.dw_name)}})])]),e._v(" "),r("div",{staticClass:"order-info"},[r("div",{staticClass:"order-flex"},[r("div",{staticClass:"order-img"},[r("img",{attrs:{src:e.splitImg(t.p_file),alt:""}})]),e._v(" "),r("div",{staticClass:"order-param"},[r("h3",{domProps:{textContent:e._s(t.t_title)}}),e._v(" "),r("p",[r("span",[e._v("数量：")]),r("i",{domProps:{textContent:e._s(t.t_quality)}}),e._v("/"),r("i",{domProps:{textContent:e._s(t.dw_name)}})]),e._v(" "),r("p",[r("span",[e._v("地区：")]),r("i",{domProps:{textContent:e._s(t.dz_name)}})]),e._v(" "),r("p",[r("span",[e._v("上线时间：")]),r("i",{domProps:{textContent:e._s(t.pass_time.substring(0,10))}})])])]),e._v(" "),r("div",{staticClass:"order-btn",staticStyle:{"justify-content":"flex-end"}},[r("a",{staticClass:"order-btn-del mg5",on:{click:function(r){r.stopPropagation(),e.deleteOrder(t.t_id,o)}}},[e._v("删除")]),e._v(" "),r("a",{staticClass:"order-btn-endtime"},[e._v("已成交")])])])])})):e._e(),e._v(" "),4==e.active?r("ul",{staticClass:"order-state-4"},e._l(e.orderList4,function(t,o){return r("li",{on:{click:function(r){e.toPage("/user/transcationList/saleOrder/passOrder/orderDetail?id="+t.t_id)}}},[r("div",{staticClass:"order-tit"},[r("span",{staticClass:"tit",domProps:{textContent:e._s(t.t_id)}}),e._v(" "),r("span",[e._v("已结束")])]),e._v(" "),r("div",{staticClass:"order-info"},[r("div",{staticClass:"order-flex"},[r("div",{staticClass:"order-img"},[r("img",{staticClass:"img4",attrs:{src:e.splitImg(t.p_file),alt:""}})]),e._v(" "),r("div",{staticClass:"order-param"},[r("h3",{domProps:{textContent:e._s(t.t_title)}}),e._v(" "),r("p",[r("span",[e._v("数量：")]),r("i",{domProps:{textContent:e._s(t.t_quality)}}),r("i",{domProps:{textContent:e._s(t.dw_name)}})]),e._v(" "),r("p",[r("span",[e._v("地区：")]),r("i",{domProps:{textContent:e._s(t.dz_name)}})]),e._v(" "),r("p",[r("span",[e._v("上线时间：")]),r("i",{domProps:{textContent:e._s(t.pass_time.substring(0,10))}})])])]),e._v(" "),r("div",{staticClass:"order-btn",staticStyle:{"justify-content":"flex-end"}},[r("a",{staticClass:"order-btn-del mg5",on:{click:function(r){r.stopPropagation(),e.deleteOrder2(t.t_id,o)}}},[e._v("删除")]),e._v(" "),r("a",{staticClass:"order-btn-endtime"},[e._v("已结束")])])])])})):e._e()])]),e._v(" "),r("transition",[r("router-view")],1)],1)},staticRenderFns:[]}},448:function(e,t,r){var o=r(303);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r(156)("ee2c1f5a",o,!0)},523:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(210),n=r.n(o),i=(r(23),r(38));r.n(i);t.default={components:{headerTop:n.a},data:function(){return{active:2,pageNo:1,orderList1:[],orderList2:[],orderList3:[],orderList4:[],type1PageNo:1,type2PageNo:1,type3PageNo:1,type4PageNo:1}},mounted:function(){var e=this;this.$nextTick(function(){e.queryOrderInfoByType1(),e.queryOrderInfoByType2(),e.queryOrderInfoByType3(),e.queryOrderInfoByType4()})},watch:{active:function(){}},methods:{load2:function(){console.log("++++++++++++++++++++++++"),this.type2PageNo++,this.queryOrderInfoByType2()},queryOrderInfoByType1:function(){var e=this;this.$http.post("/ZBGL",{vip:this.$store.getters.getVip,type:1,pageNo:this.type1PageNo}).then(function(t){0==t.data.code&&(e.orderList1=e.orderList1.concat(t.data.response))})},queryOrderInfoByType2:function(){var e=this;this.$http.post("/ZBGL",{vip:this.$store.getters.getVip,type:6,pageNo:this.type2PageNo}).then(function(t){0==t.data.code&&(e.orderList2=e.orderList2.concat(t.data.response))})},queryOrderInfoByType3:function(){var e=this;this.$http.post("/ZBGL",{vip:this.$store.getters.getVip,type:4,pageNo:this.type3PageNo}).then(function(t){0==t.data.code&&(e.orderList3=e.orderList3.concat(t.data.response))})},queryOrderInfoByType4:function(){var e=this;this.$http.post("/ZBGL",{vip:this.$store.getters.getVip,type:5,pageNo:this.type4PageNo}).then(function(t){0==t.data.code&&(e.orderList4=e.orderList4.concat(t.data.response))})},deleteOrder:function(e,t){var r=this;layer.open({content:"确定删除吗",btn:["确定","取消"],yes:function(){r.$http.post("/deleteRecord",{uId:r.$store.getters.getVip,vId:e}).then(function(e){0==e.data.code?(r.orderList3.splice(t,1),layer.open({content:"删除成功。",skin:"msg",time:1.2})):layer.open({content:"删除失败!",skin:"msg",time:2})}),layer.closeAll()},no:function(){layer.closeAll()}})},deleteOrder2:function(e,t){var r=this;layer.open({content:"确定删除吗",btn:["确定","取消"],yes:function(){r.$http.post("/deleteRecord",{uId:r.$store.getters.getVip,vId:e}).then(function(e){0==e.data.code?(r.orderList4.splice(t,1),layer.open({content:"删除成功。",skin:"msg",time:1.2})):layer.open({content:"删除失败!",skin:"msg",time:2})}),layer.closeAll()},no:function(){layer.closeAll()}})},splitImg:function(e){return e.split(",")[0]},toPage:function(e){this.$router.push(e)},formatTime:function(e,t){console.log(e);var r=this,o=new Date(e.replace(/-/g,"/"));o.getTime()-(new Date).getTime()<=0||function(){var e=setInterval(function(){var n=o.getTime()-(new Date).getTime(),i=Math.floor(n/864e5),A=n%864e5,s=Math.floor(A/36e5),a=A%36e5,d=Math.floor(a/6e4),l=a%6e4,c=Math.round(l/1e3);r.$set(t,"endDate_days",i),r.$set(t,"endDate_hours",s),r.$set(t,"endDate_minutes",d),r.$set(t,"endDate_seconds",c),n<=0&&clearInterval(e)},1e3)}()}}}}});
//# sourceMappingURL=44.85cb54b4a8b16258e646.js.map
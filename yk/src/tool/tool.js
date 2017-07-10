import {getCookie} from '@/config/util'
import {apiUploadUrl} from '@/config/apiUrl'

export const uploadUrl = apiUploadUrl;

export const setCookie = (name,value) => {
    var Days = 1;
    var exp = new Date();
    //b保存cookie一段时间
   //exp.setTime(exp.getTime() + Days*24*60*60*1000);
    //exp.setTime(exp.getTime());
    //document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();

    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    exp.setTime(exp.getTime());
    //默认过期时间为本次回话结束
    document.cookie = name + "="+ escape (value);
}


//验证是否登录
export const checkLogin = (tips)=>{
	if(getCookie('vip')){
		return true
	}else{
		if(tips){
			layer.msg("请先登录！");
		}
		return false;
	}
}

//验证是否登录，并附带跳转链接
export const checkLogin2 = (obj)=>{
	if(getCookie('vip')){
		return true
	}else{
		layer.login(obj);
		return false;
	}
}



//验证实名认证状态
export const checkAuthen = (tips)=>{
	if(getCookie('personalAuthen')==1||getCookie('companyAuthen')==1){
		return true;
	}else{
		layer.msg("请先完成实名认证！")
		return false;
	}

}
//正确验证方法，并根据参数tips来决定是否显示提示信息。
export const checkAuthen2 = (tips)=>{
	if(getCookie('personAuthenState')==2 || getCookie('companyAuthenState')==2){
		return true;
	}else{
		if(tips){
			layer.msg("请先完成实名认证！")
		}
		return false;
	}
}

//检查实名认证并附带跳转链接
export const checkAndToAuthen = (obj)=>{
	if(getCookie('personAuthenState')==2 || getCookie('companyAuthenState')==2){
		return true;
	}else{
		layer.open({
			content:"请先完成实名认证！",
			// time:1.5,
			style:"width:75%",
			btn:['确定','取消'],
			yes:function(index){
				layer.close(index);
				obj.$router.push({path:'/user',query:{toAuthen:"toAuthen"}})
			}
		})
		return false;
	}
}


//判断会员状态
export const checkMember = (obj)=>{
	// v_type 表示是会员，=1表示金牌，=2表示钻石
  // vipState 表示会员状态，=1表示正常状态。
	if(getCookie("v_type") && getCookie("vipState") == 1){
		return true;
	}else{
    layer.open({
      content:"查看该信息需要开通会员，是否查看？",
      btn:['是','否'],
      style:"width:80%",
      yes:function(ind){
        layer.close(ind);
        obj.$router.push({path:'/user/joinMember'})
      }
    })
		return false;
	}
}

//判断登录和实名认证
export const checkLoginAndAuthen = ()=>{
	if(getCookie('personalAuthen')!=1||getCookie('companyAuthen')!=1){
		//检查实名认证
		return false;
	}
	if(!getCookie('vip')){
		//登录
		return false;
	}
	return true;
}





// vm.$http.post(common.apiUrl+'/RecordTrack',{sId:common.getUrlParam('id'),vId:common.getCookie('vip'),type:"TB"}).then(function(res){

// 	}).catch(function(res){

//     console.log(res);
// })


//添加足迹
/*
 obj = 引用对象
 id = 订单ID
 source = TB、CG、GY (投标，采购，供应)
*/
export const addFootPrint = (obj,id,source)=>{
	obj.$http.post("/RecordTrack",{sId:id,vId:obj.$store.getters.getVip,type:source}).then((res)=>{
		if(res.data.code==0){
			return true
		}else{
			return false;
		}
	})
}
/*
添加收藏
*/
export const addFavorite = (obj,id,source)=>{
	obj.$http.post("/addShoucang",{id:id,vip:obj.$store.getters.getVip,type:source}).then((res)=>{
		if(res.data.code==0){
			layer.msg("收藏成功!")
			obj.favoriteState = true;
		}else{
			layer.msg(res.data.message)
		}
	})
}


// 现货交易规则
export const showRule1 = ()=>{

  layer.open({
    content:`

      <div id="" class="layui-layer-content" style="height: 412px;"><p class="MsoNormal">
        <br>
      </p>
      <p class="MsoNormal" align="center" style="text-align:center;">
        <span style="font-size:16px;line-height:1.5;">
        </span></p><p style="text-align:left;">
          </p><div style="text-align:center;">
            <span style="font-size:16px;"><strong></strong></span><span style="font-size:16px;"><strong>序 言</strong></span>
          </div>
          <p>
            <span style="font-size:16px;">再商网是我公司根据中华人民共和国相关法律规定成立的一个信息发布平台，是给买卖双方前期一次意向洽谈的机会，最终是否实际成交 还需由买卖双方决定。</span>
          </p>
          <p>
            <span style="font-size:16px;">再商网现货交易，是一种市场交易、搜寻商业对象的行为。如约定当面交易的，卖家应将最详细的信息披露在再商网上，买家按照卖家所显示的货物信息进行估计，尔后网上报价，经卖家选择合适的买家进行网上成交，然后双方自行约定交(验)货时间、地点、运输方式等等条款，如卖家在交易时间内没有选择买家的，货物将会结束交易，如想继续交易，需重新发布现货交易信息，如未按约定成交的，将受到再商网的相关处罚。</span>
          </p>
          <p>
            <span style="font-size:16px;"><br>
      </span>
          </p>
          <p style="text-align:center;">
            <strong><span style="font-size:16px;">总 则</span></strong>
          </p>
          <p>
            <span style="font-size:16px;">1、为了规范现货交易活动，保护国家利益、社会公共利益和现货交易活动当事人的合法权益，本《再商网现货交易细则》是根据《中华人民共和国合同法》和《互联网信息服务管理办法》等相关法律、法规制订。</span>
          </p>
          <p>
            <span style="font-size:16px;">2、本次现货交易活动应严格遵循“公开、公平、公正、诚实守信”的原则;应严格按照法律有关规定进行，所有交易行动均具备法律效力。</span>
          </p>
          <p>
            <span style="font-size:16px;">3、参加本次现货交易活动的当事人和成交人必须遵守本须知的各项条款，并对自己的行为承担法律责任。</span>
          </p>
          <p>
            <span style="font-size:16px;">4、凡具备完全民事行为能力的公民、法人和其他组织均可参加交易。</span>
          </p>
          <p>
            <span style="font-size:16px;">5、参与现货交易的买卖双方应认真仔细阅读、了解本细则的全部内容。</span>
          </p>
          <p>
            <span style="font-size:16px;">6.现货交易是指在一定范围内公开需要交易的货物基本条件和要求等相关信息，并邀请众多买家参与议价或立即成交，之后按照规定程序，从中选择合适者作为交易的整个过程。</span>
          </p>
          <p>
            <span style="font-size:16px;">本次现货交易为双方自愿进行，请交易买卖双方谨慎交易，再商网(以下简称本站)只负责提供信息资源，交易过程中任何纠纷与本站无关，本站所有现货交易信息均经过初步审核后上架，如现货交易信息存在不实，请与本站客服人员联系并投诉，本站核实情况后将对此做出相应惩罚。</span>
          </p>
          <p>
            <span style="font-size:16px;"><br>
      </span>
          </p>
          <p style="text-align:center;">
            <strong><span style="font-size:16px;">二、准入金</span></strong>
          </p>
          <p>
            <span style="font-size:16px;">7、用户在发布现货信息或议价现货交易项目前应提交相应的交易准入金。在现货交易中，只需提交一次准入金;</span>
          </p>
          <p>
            <span style="font-size:16px;">(1)交易准入金为现货交易的组成部分之一，凡中华人民共和国境内的用户(以实名认证所认证地区为标准)交易准入金为人民币2000元。境外和国外用户(以实名认证所认证地区为标准)交易准入金为人民币4000元。</span>
          </p>
          <p>
            <span style="font-size:16px;">(2)用户应在交易发布前或规定时间内将准入金交纳到本站专设的准入金帐户。</span>
          </p>
          <p>
            <span style="font-size:16px;">(3)用户缴纳的准入金，再商网系统会自动锁定。缴纳准入金后，您可不限次数发布现货交易项目信息和议价现货交易项目。</span>
          </p>
          <p>
            <span style="font-size:16px;">(4)当交易中您所发布货或议价的项目未在规定时间内将保证金交纳到我司专设的保证金帐户中时，再商网将会冻结您的准入金用于交易另外一方的赔付。</span>
          </p>
          <p>
            <span style="font-size:16px;">(5)当准入金被冻结时，处于交易中状态下的项目将正常进行，议价中状态下的项目将隐藏。</span>
          </p>
          <p>
            <span style="font-size:16px;">(6)准入金与货物价值无关，准入金是做为制约双方诚信交易的保障。</span>
          </p>
          <p>
            <span style="font-size:16px;">(7)当您的账户中无正在进行的现货交易项目时，您可申请退回准入金，待审核批准后到再商网账户中进行提现。</span>
          </p>
          <p>
            <span style="font-size:16px;"><br>
      </span>
          </p>
          <p style="text-align:center;">
            <strong><span style="font-size:16px;">三、现货交易卖家</span></strong>
          </p>
          <p>
            <span style="font-size:16px;">8、交易卖家应符合下列要求：</span>
          </p>
          <p>
            <span style="font-size:16px;">8.1、交易卖家应为再商网实名认证成功的会员;</span>
          </p>
          <p>
            <span style="font-size:16px;">8.2、交易卖家应具备完全民事行为能力的公民或合法企业。</span>
          </p>
          <p>
            <span style="font-size:16px;">9、交易卖家具有编制发布交易信息的语言能力，可以自行办理交易事宜。任何单位和个人不得强制其委托代理机构办理交易事宜。</span>
          </p>
          <p>
            <span style="font-size:16px;">10、交易卖家在现货交易过程中，选定买家后，需提交相应的保证金。一个现货交易项目，卖家只需提交一次保证金;</span>
          </p>
          <p>
            <span style="font-size:16px;">(1)交易保证金为交易信息的组成部分之一，凡中华人民共和国区域内交易的(含交易货物、运输等等均在国内的)交易保证金为1000元。境外交易(含交易货物或运输等任一一项在境外的)的交易保证金为2000元。</span>
          </p>
          <p>
            <span style="font-size:16px;">(2)交易卖家应在交易开始前或规定时间内将保证金交纳到我司专设的保证金帐户。</span>
          </p>
          <p>
            <span style="font-size:16px;">(3)交易卖家缴纳的保证金，再商网系统会自动锁定。交易成交的，锁定的保证金将自动转入再商网指定账户中冻结。</span>
          </p>
          <p>
            <span style="font-size:16px;">(4)保证金与货物价值无关，保证金是做为双方诚信交易的保障。</span>
          </p>
          <p>
            <span style="font-size:16px;">(5)一个现货交易项目逾时未交纳保证金时，将扣除卖家所交的准入金。</span>
          </p>
          <p>
            <span style="font-size:16px;">(6)当交易结束后，保证金将退回保证金到再商网账户余额中。</span>
          </p>
          <p>
            <span style="font-size:16px;">11、如交易成功后，交易卖家逾期未在约定时间内签约、验货和交货，逾期不办理的，交易卖家应赔偿交易买家由此产生的费用，并承担本次交易的货物可能发生的损毁、灭失等风险和后果。再商网将会冻结您的保证金，直至双方线下协调和解后再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">12、如在交易过程中经举报和本站核查后发现有恶意发布现货交易信息或恶意结束行为的交易卖家，本站将会冻结其项目保证金，并根据情节严重性做出相应的处罚。</span>
          </p>
          <p>
            <span style="font-size:16px;">13、交易卖家不得以不合理的条件限制或者排斥交易买家，不得对交易买家实行差别或歧视待遇。</span>
          </p>
          <p>
            <span style="font-size:16px;">14、交易卖家应当根据交易项目的特点和需要编制交易信息。交易信息应当包括对交易买家资格审查标准、交易报价要求等所有实质性要求和条件的主要条款。</span>
          </p>
          <p>
            <span style="font-size:16px;">15、如交易过程中，当买家进行现场验货，卖家货物(包括不仅限于)与现货交易项目信息实拍图存在出入、货物数量不正确等情况，而导致交易不能成功时，经买家投诉，经再商网查实后，将会冻结卖家的保证金，直至双方线下协调和解后再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">16、如交易过程中，通过买家验货后，卖家所交付的货物(包括不仅限于)与买家验货时不符，或与现货交易项目实拍图存在出入、货物数量不正确等情况，而导致最终货物交付不成功时，经买家投诉，再商网核实后，将冻结您的保证金，直至双方线下协调和解后再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">17、如交易过程中，当买家验货后，由于卖家的原因不以平台成交时的价格进行交易而导致最终交易不能成功时，经买家投诉，再商网核实后，将会冻结您的保证金，直至双方线下协调和解后再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">18、如交易过程中，由于卖家所填写的相关信息严重有误而导致买家不能进行下一步交易时，经买家投诉，再商网核实后，将会冻结您的保证金，直至双方线下协调和解后再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;"><br>
      </span>
          </p>
          <p style="text-align:center;">
            <strong><span style="font-size:16px;">四、现货交易买家</span></strong>
          </p>
          <p>
            <span style="font-size:16px;">19、交易买家应符合下列要求：</span>
          </p>
          <p>
            <span style="font-size:16px;">20.1、买家应为再商网实名认证成功的会员;</span>
          </p>
          <p>
            <span style="font-size:16px;">20.2、买家应具备完全民事行为能力的公民或合法企业;</span>
          </p>
          <p>
            <span style="font-size:16px;">20.3、再商网现金账户余额必须大于或等于本次交易需提交的保证金。</span>
          </p>
          <p>
            <span style="font-size:16px;">21、交易应按下列流程进行议价：</span>
          </p>
          <p>
            <span style="font-size:16px;">21.1、买家应仔细阅读货物介绍，了解货物相关信息如交易方式、交易币种、货物所在地、数量、质量、包装和运输等内容;</span>
          </p>
          <p>
            <span style="font-size:16px;">21.2、当买家被卖家选择为交易买家后，应提交相应的保证金。一个现货交易项目只需提交一次保证金;</span>
          </p>
          <p>
            <span style="font-size:16px;">(1)交易保证金为现货交易的组成部分之一，凡中华人民共和国区域内交易的(含交易货物、运输等等均在国内的)交易保证金为人民币1000元。境外交易(交易货物或运输等任一一项在境外的)的交易保证金为人民币2000元。</span>
          </p>
          <p>
            <span style="font-size:16px;">(2)交易买家应在交易结束前或规定时间内将保证金交纳到本站专设的保证金帐户。</span>
          </p>
          <p>
            <span style="font-size:16px;">(3)交易买家提交保证金后无法中止交易或撤回交易，请各位会员谨慎交易。</span>
          </p>
          <p>
            <span style="font-size:16px;">(4)保证金与货物价值无关，保证金是做为双方诚信交易的保障。</span>
          </p>
          <p>
            <span style="font-size:16px;">(5)一个现货交易项目逾时未交纳保证金时，将扣除卖家所交的准入金。</span>
          </p>
          <p>
            <span style="font-size:16px;">(6)当交易结束后，保证金将退回保证金到再商网账户余额中。</span>
          </p>
          <p>
            <span style="font-size:16px;">21.3、交易买家应按照规定出价：对本次标的物进行评估出价，一个交易项目可出价三次，三次价格都会进入交易卖家的选择，出价金额无限制。</span>
          </p>
          <p>
            <span style="font-size:16px;">(1)由于交易卖家只能看到所有交易买家的出价及地区，故价格和地区是成交交易的决定性因素，请交易买家出价前重点关注。(2)交易前请仔细查看交易卖家提供的货物图片及信息，如图片及信息中有详细说明，交易后因此原因而投诉的，交易卖家出示证明后再商网将不予追究。</span>
          </p>
          <p>
            <span style="font-size:16px;">(3)交易前请仔细查看交易订单中交易卖家要求的提货时间、交易币种、货物所在地及交易方式等等事宜，避免交易中因没按照交易卖家要求而造成交易买家的损失，交易卖家将有权在本站提供有效凭证对您进行举报，再商网核实后将会冻结您的保证金，直至双方线下协调和解再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">22、如在交易过程中，买家未在卖家规定时间内验货或者提货时，再商网将会冻结您的保证金，直至双方线下协调和解后再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">23、如在交易过程中，在验货收货时，由于买家的原因未按平台成交时的价格进行交易而导致最终交易不能成功时，再商网将会冻结您的保证金，直至双方线下协调和解再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">24、如在交易过程中，由于买家所填写的相关信息严重错误而导致卖家不能进行下一步交易时，再商网将会冻结您的保证金，直至双方线下协调和解再解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;"><br>
      </span>
          </p>
          <p style="text-align:center;">
            <strong><span style="font-size:16px;">五、议价中、交易中</span></strong>
          </p>
          <p>
            <span style="font-size:16px;">25、议价应当在现货交易发布确定的期限内公开进行。</span>
          </p>
          <p>
            <span style="font-size:16px;">26、在确定成交人前，交易卖家不得与交易买家就交易价格、交易方案等实质性内容进行谈判。</span>
          </p>
          <p>
            <span style="font-size:16px;">27、交易中本网站将会根据双方注册时填写的账户信息，将联系信息推送到双方系统信息中，如联系信息有变更请及时修改和通报。如因未及时修改和向本网站通报而造成违约或损失，则本网站不负任何责任。</span>
          </p>
          <p>
            <span style="font-size:16px;">28、进入交易中，后双方可进行线下沟通，签署相应的合同，明确相应的权利义务和交易事宜;完成所有关于现货交易的交易手续。</span>
          </p>
          <p>
            <span style="font-size:16px;">29、双方在线下交易完成后 10 日内无投诉无纠纷的情况下即可在个人中心确认本次交易完成，系统将会解冻双方保证金。</span>
          </p>
          <p>
            <span style="font-size:16px;">30、交易中双方所有交易及交流信息请做好存档(如：银行转账信息QQ聊天记录等等信息)，以防交易过程中产生的纠纷和投诉。</span>
          </p>
          <p>
            <span style="font-size:16px;">31、本站给各位会员提供这个货品交易平台，将收取买家一定的服务费：中国国内(不含港澳台)成交的，每单收取的手续费为0元：港澳台地区及国外成交的，每单手续费为100元。</span>
          </p>
          <p>
            <span style="font-size:16px;">32、交易买家逾期未在卖家规定的时间内签约、验货和提货，交易卖家可以重新发布交易信息。重新发布信息后，逾期的交易买家不得参加交易。再商网可以直接从其预交的保证金中扣除相应的手续费。</span>
          </p>
          <p>
            <span style="font-size:16px;">33、交易买家应及时组织验货，交付标的物，逾期不办理的，交易买家应赔偿交易卖家由此产生的费用，并承担本标的物可能发生的损毁、灭失等风险和后果。</span>
          </p>
          <p>
            <span style="font-size:16px;">34、参加交易的人应当遵守现货交易细则的规定，不得阻挠其他交易买家进行交易，不得操纵、垄断交易价格，严禁交易买家恶意串价格，上述行为一经发现，本站将取消其出价资格，并追究相关的法律责任。</span>
          </p>
          <p>
            <span style="font-size:16px;">35、如在交易过程中存在上述行为或者违法行为，则一经一方投诉或者提出仲裁、诉讼，则本站将冻结保证金，不予返还。</span>
          </p>
          <p>
            <span style="font-size:16px;">36、如一经司法部门认定在交易过程中存在上述行为或者违法行为，则此次现货交易活动全部无效，保证金不予退还。</span>
          </p>
          <p>
            <span style="font-size:16px;">37、如现货交易信息存在瑕疵导致双方产生重大误解、分歧，双方应及时沟通，补正不足，明确真实意思表示。对于相关补正的内容，应视为双方承诺的内容。</span>
          </p>
          <p>
            <span style="font-size:16px;">38、根据交易卖家要求的提(交)货时间，如交易买家已确认，系统会通知您，请及时确认交货。如超过提(交)货时间，再商网有30天双方确认时间，通知后未确认并且未投诉系统将自动确认完成交易并退回双方保证金。</span>
          </p>
          <p>
            <span style="font-size:16px;">39、如交易卖家已确认，但跟交易买家合作时出现问题，可提供有效凭证投诉对方，再商网将根据有关司法部门的立案文书或立案通知书冻结双方保证金，直至双方的案件处理完毕而解冻。</span>
          </p>
          <p>
            <span style="font-size:16px;">40、再商网只提供信息交流平台，不参与双方实际线下交易，如交易中存在欺骗和严重欺诈行为可报案经确认存在刑事案件和经济纠纷后，本站将永久冻结保证金。</span>
          </p>
          <p>
            <span style="font-size:16px;">41、凡发现交易中有违规或违法行为的，均可向本站如实举报。如本站确实发现现货交易双方存在违法行为的，将向有关司法机关举报，并终止双方的现货交易事宜。</span>
          </p>
          <p>
            <span style="font-size:16px;">42、本规则其他未尽事宜，可以向本站咨询，再商网有最终解释权。</span>
          </p>
          <p>
            <span style="font-size:16px;">43、凡因交易的行为而投诉本站或涉及本站参加诉讼的，则应由本站主办公司所在地人民法院裁决。</span>
          </p>
      <span style="font-size:16px;"></span>
        <p></p>

      <p></p>
      <p class="MsoNormal">
        <span style="font-size:16px;line-height:1.5;"></span>
      </p></div>
    `,
    btn:"确定",
    // style:"overflow-y:scroll;text-align:left;"
  })

}

// 现货交易规则
export const showRule2 = ()=>{
  layer.open({
  	content:`
		<div id="" class="layui-layer-content" style="height: 412px;"><p class="p" align="center" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;text-align:center;">
			采购供应信息发布规则
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 采购供应信息规则适用于在再商网平台上发布采购供应信息的所有用户，用户需遵守信息发布规则规范有序地发布供求信息。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			一、供应(采购)信息组成要素及定义
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 1货物类目，根据货物的用途、功能、材质等特性所设置的行业性分类。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 2货物属性，货物现状属性，如数量、单价、交易方式、包装等。</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 发布人信息，联系人的真实姓名、联系电话、联系地址等信息等</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 3货物主图，能够正确描述货物整体情况的实拍图。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 4货物详情图，能够正确描述货物详细细节的实拍图。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp;&nbsp;5详情描述，对货物的其它属性描述或者其它有效信息备注。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			二、供应(采购)信息组成要素发布规则
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 货物类目，根据产品选择类目，类目必须与标题中的产品、信息的详细说明保持匹配。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 1货物属性 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; (1)货物属性描述必须与货物相匹配且真实有效。</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (2)标题中严禁出现电话号码、E-mail等任何联系方式;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp;&nbsp;(3)标题中的产品名称必须与详细描述及图片中的产品保持一致。</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 2货物主图和货物详情图</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (1)图片必须清晰完整，且产品图片必须与信息内容所介绍的产品保持一致;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (2)图片信息必须属于合法可展示的图片内容，严禁发布侵权、色情等违法图片;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (3)图片尽量为实物图片，可以适当提供具有说明性的图片包装，严禁上传任何类型的证书图片。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 3详细描述
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (1)详情描述中严禁出现电话号码、E-mail、公司名称等任何有关发布人的信息联系方式;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (2)详情描述中的内容与标题及图片中的货物主体保持一致。
		</p></div>
  	`,
    btn:"确定",
    // style:"overflow-y:scroll,text-align:left;width:80%;height:50%;"
  })
}
// 现货交易规则
export const showRule3 = ()=>{
  layer.open({
  	content:`
		<div id="" class="layui-layer-content" style="height: 412px;"><p class="p" align="center" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;text-align:center;">
			采购供应信息发布规则
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 采购供应信息规则适用于在再商网平台上发布采购供应信息的所有用户，用户需遵守信息发布规则规范有序地发布供求信息。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			一、供应(采购)信息组成要素及定义
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 1货物类目，根据货物的用途、功能、材质等特性所设置的行业性分类。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 2货物属性，货物现状属性，如数量、单价、交易方式、包装等。</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 发布人信息，联系人的真实姓名、联系电话、联系地址等信息等</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 3货物主图，能够正确描述货物整体情况的实拍图。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 4货物详情图，能够正确描述货物详细细节的实拍图。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp;&nbsp;5详情描述，对货物的其它属性描述或者其它有效信息备注。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			二、供应(采购)信息组成要素发布规则
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 货物类目，根据产品选择类目，类目必须与标题中的产品、信息的详细说明保持匹配。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 1货物属性 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; (1)货物属性描述必须与货物相匹配且真实有效。</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (2)标题中严禁出现电话号码、E-mail等任何联系方式;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp;&nbsp;(3)标题中的产品名称必须与详细描述及图片中的产品保持一致。</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			<span style="line-height:1.5;">&nbsp; 2货物主图和货物详情图</span>
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (1)图片必须清晰完整，且产品图片必须与信息内容所介绍的产品保持一致;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (2)图片信息必须属于合法可展示的图片内容，严禁发布侵权、色情等违法图片;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (3)图片尽量为实物图片，可以适当提供具有说明性的图片包装，严禁上传任何类型的证书图片。
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; 3详细描述
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (1)详情描述中严禁出现电话号码、E-mail、公司名称等任何有关发布人的信息联系方式;
		</p>
		<p class="p" style="color:#555555;font-family:Helvetica, Georgia, Arial, sans-serif, 宋体;font-size:13px;">
			&nbsp; (2)详情描述中的内容与标题及图片中的货物主体保持一致。
		</p></div>
  	`,
    btn:"确定",
    // style:"overflow-y:scroll;text-align:left;"
  })
}



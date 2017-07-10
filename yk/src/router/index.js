import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


import {getCookie} from '@/config/util'



//顶级路由
import App from '../App'

const test = r => require.ensure([], () => r(require('@/pages/test/index')), 'test')
const test2 = r => require.ensure([], () => r(require('@/pages/test/index2')), 'test2')

/*user components 个人中心*/
const user = r => require.ensure([], () => r(require('@/pages/user/index')), 'user')
/*supply components*/
const supply = r => require.ensure([], () => r(require('@/pages/supply/index')), 'supply')
// import supplyInfo from '@/pages/supply/children/orderInfo'
const purchase = r => require.ensure([], () => r(require('@/pages/purchase/index')), 'purchase')
/*info components*/
const info = r => require.ensure([], () => r(require('@/pages/info/index')), 'info')
/*sale components*/
const sale = r => require.ensure([], () => r(require('@/pages/sale/index')), 'sale')

const balance = r => require.ensure([],() => r(require('@/pages/user/queryBalance/balance')), 'balance')
const recharge = r => require.ensure([],() => r(require('@/pages/user/recharge/recharge')), 'recharge')
const withdraw = r => require.ensure([],() => r(require('@/pages/user/withdraw/withdraw')), 'withdraw')


const uploadVoucher = r => require.ensure([],() => r(require('@/pages/user/recharge/children/uploadVoucher')), 'uploadVoucher')
const withdrawByCard = r => require.ensure([],() => r(require('@/pages/user/withdraw/children/withdrawByCard')), 'withdrawByCard')
const withdrawToWechart = r => require.ensure([],() => r(require('@/pages/user/withdraw/children/withdrawToWechart')), 'withdrawToWechart')

const transcationList = r => require.ensure([],() => r(require('@/pages/user/transcation/transList')), 'transcationList')
const buyOrder = r => require.ensure([],() => r(require('@/pages/user/transcation/buyOrder')), 'buyOrder')
const saleOrder = r => require.ensure([],() => r(require('@/pages/user/transcation/saleOrder')), 'saleOrder')
const passOrder = r => require.ensure([],() => r(require('@/pages/user/transcation/saleOrder/passOrder')), 'passOrder')
const auditOrder = r => require.ensure([],() => r(require('@/pages/user/transcation/saleOrder/auditOrder')), 'auditOrder')
const rejectOrder = r => require.ensure([],() => r(require('@/pages/user/transcation/saleOrder/rejectOrder')), 'rejectOrder')
const updatePrice = r => require.ensure([],() => r(require('@/pages/user/transcation/saleOrder/updatePrice')), 'updatePrice')
const lookPrice = r => require.ensure([],() => r(require('@/pages/user/transcation/saleOrder/lookPrice')), 'lookPrice')
const managePrice = r => require.ensure([],() => r(require('@/pages/user/transcation/saleOrder/managePrice')), 'managePrice')



const myOrder = r => require.ensure([],() => r(require('@/pages/user/myOrder/myOrder')), 'myOrder')
const purchaseOrder = r => require.ensure([],() => r(require('@/pages/user/myOrder/purchaseOrder')), 'purchaseOrder')
const supplyOrder = r => require.ensure([],() => r(require('@/pages/user/myOrder/supplyOrder')), 'supplyOrder')
const personalAuthen = r => require.ensure([],() => r(require('@/pages/user/authen/personalAuthen')), 'personalAuthen')
const companyAuthen = r => require.ensure([],() => r(require('@/pages/user/authen/companyAuthen')), 'companyAuthen')
const joinMember = r => require.ensure([],() => r(require('@/pages/user/joinMember/index')), 'joinMember')
const vipService = r => require.ensure([],() => r(require('@/pages/user/joinMember/vipService')), 'vipService')
const notice = r => require.ensure([],() => r(require('@/pages/user/notice/index')), 'notice')
const noticeDetail = r => require.ensure([],() => r(require('@/pages/user/notice/noticeDetail')), 'noticeDetail')

const creditInfo = r => require.ensure([],() => r(require('@/pages/user/creditInfo/index')), 'creditInfo')
const creditDetail = r => require.ensure([],() => r(require('@/pages/user/creditInfo/creditDetail')), 'creditDetail')

const feedback = r => require.ensure([],() => r(require('@/pages/user/feedback/index')), 'feedback')
const helper = r => require.ensure([],() => r(require('@/pages/user/helper/index')), 'helper')
const helperInfo = r => require.ensure([],() => r(require('@/pages/user/helper/information')), 'helperInfo')
const myFavorite = r => require.ensure([],() => r(require('@/pages/user/myFavorite/favorite')), 'myFavorite')
const myFootPrint = r => require.ensure([],() => r(require('@/pages/user/myFootPrint/footPrint')), 'myFootPrint')
const accountDetail = r => require.ensure([],() => r(require('@/pages/user/accountDetail/accountDetail')), 'accountDetail')
const bondDetail = r => require.ensure([],() => r(require('@/pages/user/bondDetail/bondDetail')), 'bondDetail')
const message = r => require.ensure([],() => r(require('@/pages/user/message')), 'message')
const login = r => require.ensure([],() => r(require('@/pages/account/login')), 'login')
const register = r => require.ensure([],() => r(require('@/pages/account/register')), 'register')
const found = r => require.ensure([],() => r(require('@/pages/account/found')), 'found')
const supplyInfo = r => require.ensure([],() => r(require('@/pages/supply/children/orderInfo')), 'supplyInfo')
const purchaseInfo = r => require.ensure([],() => r(require('@/pages/purchase/children/orderInfo')), 'purchaseInfo')
const submitMargin = r => require.ensure([],() => r(require('@/pages/sale/children/submitMargin')), 'submitMargin')
const toBid = r => require.ensure([],() => r(require('@/pages/sale/children/toBid')), 'toBid')
const publish = r => require.ensure([],() => r(require('@/pages/publish/index')), 'publish')


const createTender = r => require.ensure([],() => r(require('@/pages/publish/children/createTender')), 'createTender')
const createPurchase = r => require.ensure([],() => r(require('@/pages/publish/children/createPurchase')), 'createPurchase')
const createSupply = r => require.ensure([],() => r(require('@/pages/publish/children/createSupply')), 'createSupply')

const updateTender = r => require.ensure([],() => r(require('@/pages/publish/children/updateTender')), 'updateTender')
const updateSupply = r => require.ensure([],() => r(require('@/pages/publish/children/updateSupply')), 'updateSupply')
const updatePurchase = r => require.ensure([],() => r(require('@/pages/publish/children/updatePurchase')), 'updatePurchase')



const search = r => require.ensure([],() => r(require('@/pages/search')), 'search')
const searchListBy = r => require.ensure([],() => r(require('@/pages/search/searchList')), 'searchListBy')



const infoDetail = r => require.ensure([],() => r(require('@/pages/info/children/infoDetail')), 'infoDetail')
const exhibitionInfo = r => require.ensure([],() => r(require('@/pages/info/children/exhibitionInfo')), 'exhibitionInfo')


const saleDetail = r => require.ensure([],() => r(require('@/pages/sale/children/saleDetail')), 'saleDetail')


let router =  new Router({
	routes:[
		{
			path:'/',
			redirect:'/sale',
			component:App,
			children:[
				{
					path:'/test',
					component:test,
				},
				{
					path:'/test2',
					component:test2,
				},
				{
					path:'/login',
					component:login,
				},
				{
					path:'/found',
					component:found,
				},
				{
					path:'/register',
					component:register,
					// children:[
					// 	{
					// 		path:'areaCode',
					// 		component:areaCode
					// 	}
					// ]
				},
				{
					path:'/search',
					component:search,
					// children:[

					// 	{
					// 		path:'searchListBy',
					// 		component:searchListBy
					// 	}
					// ]
				},

				{
					path:'searchListBy',
					component:searchListBy,
					children:[
						{
							path:'tenderInfo',
							component:saleDetail
						},
						{
							path:'supplyInfo',
							component:supplyInfo
						},
						{
							path:'purchaseInfo',
							component:purchaseInfo
						},
					]



				},

				// {
				// 	path:'/areaCode',
				// 	component:areaCode,
				// },
				{
					path:'/sale',
					name:'sale',
					component:sale,
					children:[
						{
							path:'saleDetail',
							component:saleDetail,
							children:[
								
								{
									path:'submitMargin',
									component:submitMargin
								},
								{
									path:'toBid',
									component:toBid
								},

							]
						},
						// {
						// 	path:'submitMargin',
						// 	component:submitMargin
						// },
						// {
						// 	path:'toBid',
						// 	component:toBid
						// },
						
					]
				},
				{
					path:'/user',
					name:'user',
					component:user,
					meta:{

						checkLogin:true,//需要验证登录
					},
					children:[
						{
							path:'message',
							component:message
						},
						{
							path:'balance',
							name:'balance',
							component:balance,
							children:[
								{
									path:'recharge',
									component:recharge,
								},
								{
									path:'uploadVoucher',
									component:uploadVoucher
								},
								{
									path:'withdraw',
									component:withdraw
								},
								{
									path:'withdrawByCard',
									component:withdrawByCard
								},
								{
									path:'withdrawToWechart',
									component:withdrawToWechart
								},
								{
									path:'submitMargin',
									component:submitMargin,
								},

								// {
								// 	path:'withdrawByCard',
								// 	component:withdrawByCard,
								// }






								// {
								// 	path:'withdraw',
								// 	component:withdraw,
								// 	children:[
								// 		{
								// 			path:'uploadVoucher',
								// 			component:'uploadVoucher'
								// 		}
								// 	]
								// }

							]
						},
						{
							path:'transcationList',
							component:transcationList,
							children:[

								{
									path:'buyOrder',
									component:buyOrder,
									children:[
										{
											path:'orderDetail',
											component:saleDetail
										},
										{
											path:'orderTobid',
											component:toBid
										},
									]
								},
								{
									path:'saleOrder',
									component:saleOrder,
									children:[
										// {
										// 	path:'orderDetail',
										// 	component:saleDetail
										// },

										//通过订单
										{
											path:'passOrder',
											component:passOrder,
											children:[
												{
													path:'orderDetail',
													component:saleDetail
												},
												{
													path:'updatePrice',
													component:updatePrice
												},
												{
													path:'lookPrice',
													component:lookPrice
												},
												{
													path:'managePrice',
													component:managePrice
												},
											]
										},
										//审核中
										{
											path:'auditOrder',
											component:auditOrder,
											children:[
												{
													path:'orderDetail',
													component:saleDetail
												}
											]
										},
										//驳回订单
										{
											path:'rejectOrder',
											component:rejectOrder,
											children:[
												{
													path:'orderDetail',
													component:saleDetail
												},

												{
													path:'updateOrder',
													component:updateTender,
												},





											]
										},



									]
								},


							]
						},
						{
							path:'myOrder',
							component:myOrder,
							// redirect:'/user/myOrder/purchaseOrder',
							children:[
								{
									path:'purchaseOrder',
									component:purchaseOrder
								},
								{
									path:'supplyOrder',
									component:supplyOrder

								},
							]
						},
						{
							path:'personalAuthen',
							component:personalAuthen
						},
						{
							path:'companyAuthen',
							component:companyAuthen
						},
						{
							path:'joinMember',
							component:joinMember,
							children:[
								{
									path:'vipService',
									component:vipService
								}
							],
							// meta:{
							// 	requireAuth:true,//验证实名
							// }
						},
						{
							path:'notice',
							component:notice,
							children:[
								{
									path:'noticeDetail',
									component:noticeDetail
								}
							]
						},
						{
							path:'creditInfo',
							component:creditInfo,
							children:[
								{
									path:'creditDetail',
									component:creditDetail,
								}
							]
						},
						{
							path:'feedback',
							component:feedback
						},
						{
							path:'helper',
							component:helper,
							children:[
								{
									path:'information',
									component:helperInfo
								},
							]
						},
						{
							path:'myFavorite',
							component:myFavorite,
							children:[
								{
									path:'tenderInfo',
									component:saleDetail
								},
								{
									path:'supplyInfo',
									component:supplyInfo
								},
								{
									path:'purchaseInfo',
									component:purchaseInfo
								},
							]
						},
						{
							path:'myFootPrint',
							component:myFootPrint,
							children:[
								{
									path:'tenderInfo',
									component:saleDetail
								},
								{
									path:'supplyInfo',
									component:supplyInfo
								},
								{
									path:'purchaseInfo',
									component:purchaseInfo
								},
							]
						},
						{
							path:'accountDetail',
							component:accountDetail
						},
						{
							path:'bondDetail',
							component:bondDetail
						},


					]
				},
				{
					path:'/supply',
					name:'supply',
					component:supply,
					children:[
						{
							path:'orderInfo',
							component:supplyInfo
						},
						
					]
				},
				{
					path:'/purchase',
					name:'purchase',
					component:purchase,
					children:[
						{
							path:'orderInfo',
							component:purchaseInfo
						}
					]
				},
				{
					path:'/info',
					name:'info',
					component:info,
					children:[
						{
							path:'infoDetail',
							component:infoDetail
						},
						{
							path:'exhibitionInfo',
							component:exhibitionInfo
						},
						
					]
				},
				{
					path:'/publish',
					name:'publish',
					component:publish,
					children:[
						{
							path:'createTender',
							component:createTender
						},
						{
							path:'createPurchase',
							component:createPurchase
						},
						{
							path:'createSupply',
							component:createSupply
						},
						{
							path:'updateSupply',
							component:updateSupply
						},
						{
							path:'updateTender',
							component:updateTender
						},
						{
							path:'updatePurchase',
							component:updatePurchase
						},
					],
					meta:{
						requireAuth:true,//需要实名认证
					}
				},


			]
		},

	
	],
	//保留位置信息
	// scrollBehavior (to, from, savedPosition) {

	// 	if (to.hash) {
	// 	    return {
	// 	      selector: to.hash
	// 	    }
	// 	}

	// 	// return {x:0,y:100}
	// 	// console.log(to);
	// 	// console.log(from);
	// 	// console.log(savedPosition);
	//     // return 期望滚动到哪个的位置
	// }
})



//拦截页面
router.beforeEach((to,from,next)=>{
	//验证登录，
	if(to.meta.checkLogin||to.path.indexOf('/user')>=0){
		if(getCookie('vip')){//判断是否登录
			next()
		}else{

			layer.msg("请先登录",{time:.8},()=>{
				next({
					path:'/login',
					query:{redirect:to.fullPath}
				})
			})
		}
		return;

	}


	if(to.meta.requireAuth){

		//验证实名信息
		// if(getCookie('personalAuthen')==1||getCookie('companyAuthen')==1){
		// 	next();
		// }else{
		// 	layer.msg("请先完成实名认证");
		// }
		// return;

	}


	next();
	// else{

		// next();

	// }

})

// router.scrollBehavior((to,from,savePosition)=>{

// 	console.log(savePosition);
// 	return{x:0,y:0}
// 	// return {x:0,y:100}
// })

export default router




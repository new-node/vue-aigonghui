import home from 'components/home'
import homepage from 'components/homepage'
import activity from 'components/activity'
import integral from 'components/integral'
import mine from 'components/mine'

const integral_orderdetail = resolve => require(['components/integral_orderdetail'], resolve)
const guide = resolve => require(['components/guide'], resolve)
const heartthings_chat = resolve => require(['components/heartthings_chat'], resolve)
const heartask_things = resolve => require(['components/heartask_things'], resolve)
const unionInfo = resolve => require(['components/unionInfo'], resolve)
const signin = resolve => require(['components/signin'], resolve)
const login = resolve => require(['components/login'], resolve)
const login_find_password = resolve => require(['components/login_find_password'], resolve)
const square = resolve => require(['components/square'], resolve)
const scorerules = resolve => require(['components/scorerules'], resolve)
const integral_order = resolve => require(['components/integral_order'], resolve)
const integral_make = resolve => require(['components/integral_make'], resolve)
const integra_sureorderl = resolve => require(['components/integra_sureorderl'], resolve)
const mine_ghlist = resolve => require(['components/mine_ghlist'], resolve)
const goodsdetail = resolve => require(['components/goodsdetail'], resolve)
const mine_approve = resolve => require(['components/mine_approve'], resolve)
const mine_info_member = resolve => require(['components/mine_info_member'], resolve)
const mine_information = resolve => require(['components/mine_information'], resolve)
const mine_address = resolve => require(['components/mine_address'], resolve)
const mine_address_updata = resolve => require(['components/mine_address_updata'], resolve)
const mine_subname = resolve => require(['components/mine_subname'], resolve)
const mine_bindphone = resolve => require(['components/mine_bindphone'], resolve)
const mine_resetpassword = resolve => require(['components/mine_resetpassword'], resolve)
const mine_security = resolve => require(['components/mine_security'], resolve)
const mine_setting_universal = resolve => require(['components/mine_setting_universal'], resolve)
const details = resolve => require(['components/details'], resolve)
const mine_setting = resolve => require(['components/mine_setting'], resolve)
const mine_aboutus = resolve => require(['components/mine_aboutus'], resolve)
const mine_activity = resolve => require(['components/mine_activity'], resolve)
const mine_authcode = resolve => require(['components/mine_authcode'], resolve)
const mine_collect = resolve => require(['components/mine_collect'], resolve)
const mine_advice = resolve => require(['components/mine_advice'], resolve)
const mine_sex = resolve => require(['components/mine_sex'], resolve)
const message = resolve => require(['components/message'], resolve)
const heartask = resolve => require(['components/heartask'], resolve)
const past_advisory = resolve => require(['components/past_advisory'], resolve)
const join = resolve => require(['components/join'], resolve)
const unionform = resolve => require(['components/unionform'], resolve)
const hearttest_info = resolve => require(['components/hearttest_info'], resolve)
const hearttest_begin = resolve => require(['components/hearttest_begin'], resolve)
const hearttest_result = resolve => require(['components/hearttest_result'], resolve)
const askonline = resolve => require(['components/askonline'], resolve)
const askteacher_details = resolve => require(['components/askteacher_details'], resolve)
const askteacher_details2 = resolve => require(['components/askteacher_details2'], resolve)
const wantask = resolve => require(['components/wantask'], resolve)
const notice = resolve => require(['components/notice'], resolve)
const activityDetails = resolve => require(['components/activityDetails'], resolve)
const worker_life = resolve => require(['components/worker_life'], resolve)
const worker_say = resolve => require(['components/worker_say'], resolve)
const workerc = resolve => require(['components/workerc'], resolve)
const workersay_main = resolve => require(['components/workersay_main'], resolve)
const searchpage = resolve => require(['components/searchpage'], resolve)
const unionnews = resolve => require(['components/unionnews'], resolve)
const unionnotice = resolve => require(['components/unionnotice'], resolve)
const unionspecial = resolve => require(['components/unionspecial'], resolve)
const unionstyle = resolve => require(['components/unionstyle'], resolve)
const forum = resolve => require(['components/forum'], resolve)
const forumdetail = resolve => require(['components/forumdetail'], resolve)
const blank = resolve => require(['components/blank'], resolve)
const mall = resolve => require(['components/mall'], resolve)
const cache = resolve => require(['components/cache'], resolve)
const mine_ques = resolve => require(['components/mine_ques'], resolve)
const mine_questype = resolve => require(['components/mine_questype'], resolve)
const explain= resolve => require(['components/explain'], resolve)
const volunteer= resolve => require(['components/volunteer'], resolve);//志愿服务
const volunteer_glory= resolve => require(['components/volunteer_glory'], resolve);//志愿荣耀
const volunteer_activity= resolve => require(['components/volunteer_activity'], resolve);//志愿活动
const volunteer_wish= resolve => require(['components/volunteer_wish'], resolve);//微心愿
const volunteer_wish_add= resolve => require(['components/volunteer_wish_add'], resolve);//发表心愿
const mine_volunteer_wish= resolve => require(['components/mine_volunteer_wish'], resolve);//我的心愿
const volunteer_wish_complete= resolve => require(['components/volunteer_wish_complete'], resolve);//获助感言
const volunteer_wish_detail= resolve => require(['components/volunteer_wish_detail'], resolve);//心愿详情
const volunteer_activity_detail= resolve => require(['components/volunteer_activity_detail'], resolve);//志愿活动详情
const mine_volunteer_collection=resolve => require(['components/mine_volunteer_collection'], resolve);//志愿服务收藏
const difficult_apply=resolve => require(['components/difficult_apply'], resolve);//帮扶申请
const family_member=resolve => require(['components/family_member'], resolve);//帮扶申请2家庭成员
const difficult_situation=resolve => require(['components/difficult_situation'], resolve);//困难情况
const difficult_progress=resolve => require(['components/difficult_progress'], resolve);//困难申请进度列表
const difficult_detail=resolve => require(['components/difficult_detail'], resolve);//困难申请进度查询
const invite_friends=resolve => require(['components/invite_friends'], resolve);//邀请好友
const mine_comments_type=resolve => require(['components/mine_comments_type'], resolve);//我的点评类型
const mine_comments_list=resolve => require(['components/mine_comments_list'], resolve);//我的点评列表
const notFoundPage=resolve => require(['components/notFoundPage'], resolve);//404

let routers = [{
		path: '/',
		component: home,
		meta: {
			requiresAuth: true,
			title: '首页'
		},
		children: [{
			path: '/',
			component: homepage,
			name: 'homepage',
			meta: {
				title: "首页",
				backShow: false
			}
		}, {
			path: 'activity',
			component: activity,
			name: 'activity',
			meta: {
				title: "",
				backShow: false
			}
		}, {
			path: 'integral',
			component: integral,
			name: 'integral',
			meta: {
				title: "积分",
				backShow: false
			}
		}, {
			path: 'mine',
			component: mine,
			name: 'mine',
			meta: {
				title: "我的",
				backShow: false
			}
		}, {
			path: '/activity_history',
			name: 'activity_history',
			component: activity,
			meta: {
				title: "往期回顾",
				showHome:false
			}
	    },{
			path: '/activityDetails/:id/:isHistory',
			component: activityDetails,
			name: 'activityDetails',
			meta: {
				title: "活动详情",
				showHome:false
			}
		},{
			path: '/activityLink/:url',
			component: blank,
			name: 'activityLink',
			meta: {
				title: "",
				showHome:false
			}
		}]
	},{
		path: '/mine_questype',
		name: 'mine_questype',
		component: mine_questype,
		meta: {
			title: "我的问题",
		}
	},{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			title: "登录",
			backUrl:""
		}

	}, {
		path: '/login_find_password',
		name: 'login_find_password',
		component: login_find_password,
		meta: {
			title: "修改密码",
		}
	},{
		path: '/mine_bindphone',
		name: 'mine_bindphone',
		component: mine_bindphone,
		meta: {
			title: "绑定手机",
		}
	},{
		path: '/mine_resetpassword',
		name: 'mine_resetpassword',
		component: mine_resetpassword,
		meta: {
			title: "重置密码",
		}
	},{
		path: '/mine_security',
		name: 'mine_security',
		component: mine_security,
		meta: {
			title: "账户与安全",
		}
	}, {
		path: '/mine_setting_universal',
		name: 'mine_setting_universal',
		component: mine_setting_universal,
		meta: {
			title: "通用",
		}
	}, {
		path: '/mine_setting',
		name: 'mine_setting',
		component: mine_setting,
		meta: {
			title: "设置",
		}
	},{
		path: '/mine_information',
		name: 'mine_information',
		component: mine_information,
		meta: {
			title: "个人信息",
		}
	}, {
		path: '/mine_address',
		name: 'mine_address',
		component: mine_address,
		meta: {
			title: "收货地址",
		}
	}, {
		path: '/mine_address_updata',
		name: 'mine_address_updata',
		component: mine_address_updata,
		meta: {
			title: "新增收货地址",
		}
	}, {
		path: '/mine_subname',
		name: 'mine_subname',
		component: mine_subname,
		meta: {
			title: "更改用户名",
		}
	}, {
		path: '/mine_collect',
		name: 'mine_collect',
		component: mine_collect,
		meta: {
			title: "我的收藏",
		}
	}, {
		path: '/mine_info_member',
		name: 'mine_info_member',
		component: mine_info_member,
		meta: {
			title: "会员认证",
		}
	}, {
		path: '/mine_aboutus',
		name: 'mine_aboutus',
		component: mine_aboutus,
		meta: {
			title: "关于我们",
		}
	}, {
		path: '/mine_activity',
		name: 'mine_activity',
		component: mine_activity,
		meta: {
			title: "我的兑换券",
		}
	}, {
		path: '/mine_authcode',
		name: 'mine_authcode',
		component: mine_authcode,
		meta: {
			title: "二维码",
		}
	}, {
		path: '/integra_sureorderl/:goodsid',
		name: 'integra_sureorderl',
		component: integra_sureorderl,
		meta: {
			title: "确认订单",
		}
	},
	{
		path: '/mine_ques',
		name: 'mine_ques',
		component: mine_ques,
		meta: {
			title: "订单详情",
		}
	}, 
	{
		path: '/mine_approve',
		name: 'mine_approve',
		component: mine_approve,
		meta: {
			title: "我的审批",
		}
	}, {
		path: '/mine_ghlist',
		component: mine_ghlist,
		name: 'mine_ghlist',
		meta: {
			title: "选择工会",
		}
	}, {
		path: '/mine_sex',
		name: 'mine_sex',
		component: mine_sex,
		meta: {
			title: "我的性别",
		}
	},

	{
		path: '/mine_advice',
		name: 'mine_advice',
		component: mine_advice,
		meta: {
			title: "我的建议",
		}
	}, {
		path: '/square/:id',
		component: square,
		name: 'square',
		meta: {
			title: "工会矩阵",
		}

	}, {
		path: '/message',
		component: message,
		name: 'message',
		meta: {
			title: "消息通知",
		}
	}, {
		path: '/guide',
		components: {
			guide: guide
		},
		name: 'guide',
		meta: {
			title: "",
			headershow: false
		}
	},  {
		path: '/join/:id/:unionId',
		component: join,
		name: 'join',
		meta: {
			title: "我要入会",
		}
	},{
		path: '/hearttest_info',
		component: hearttest_info,
		name: 'hearttest_info',
		meta: {
			title: "测试介绍",
		}
	}, {
		path: '/hearttest_begin',
		component: hearttest_begin,
		name: 'hearttest_begin',
		meta: {
			title: "测试详情",
		}
	}, {
		path: '/hearttest_result',
		component: hearttest_result,
		name: 'hearttest_result',
		meta: {
			title: "测试结果",
		}
	}, {
		path: '/notice',
		component: notice,
		name: 'notice',
		meta: {
			title: "系统通知",
		}
	}, {
		path: '/heartask_things',
		component: heartask_things,
		name: 'heartask_things',
		meta: {
			title: "心事",
		}
 
	},
	{
		path: '/worker_life/:id',
		component: worker_life,
		name: 'worker_life',
		meta: {
			title: "惠工生活",
		}
	}, {
		path: '/workerc/:id',
		component: workerc,
		name: 'workerc',
		meta: {
			title: "职工社区",
		}
	},

	{
		path: '/searchpage/:sicId',
		component: searchpage,
		name: 'searchpage',
		meta: {
			headershow: false,
		}
	}, {
		path: '/blank/:url',
		component: blank,
		name: 'blank',
		meta: {
           title:""
		}
	}, {
		path: '/mall/:url',
		component: mall,
		name: 'mall',
		meta: {
            title:"惠购"
		}
	}, {
		path: '/cache',
		component: cache,
		name: 'cache',
		meta: {
			title: " ",
		},
		children: [{
			path: '/unionstylelist/:sicId',
			component: unionspecial,
			name: 'unionstylelist',
			meta: {
				title: "",
				search: true,

			}
		}, {
			path: '/worker_say/:id',
			component: worker_say,
			name: 'worker_say',
			meta: {
				title: "我有话说",
			}
		}, {
			path: '/forum/:sicId',
			component: forum,
			name: 'forum',
			meta: {
				title: "我的需求",
			}
		}, {
			path: '/forumdetail/:contentId',
			component: forumdetail,
			name: 'forumdetail',
			meta: {
				title: "",
				showShare:true
			}
		}, {
			path: '/details/:detailId',
			component: details,
			name: 'details',
			meta: {
				title: "",
				showShare:true
			}
		}, {
			path: '/fatie/:sicId',
			component: workersay_main,
			name: 'fatie',
			meta: {
				title: "",
			}
		}, {
			path: '/workersay_main/:qasmId',
			component: workersay_main,
			name: 'workersay_main',
			meta: {
				title: "",
			}
		},{
			path: '/explain',
			component: explain,
			name: 'explain',
			meta: {
				title: "发帖说明",
			}
		}, {
			path: '/signin',
			name: 'signin',
			component: signin,
			meta: {
				title: "签到",
			}
		},{
			path: '/integral_order',
			name: 'integral_order',
			component: integral_order,
			meta: {
				title: "我的订单",
			}
		},{
			path: '/integral_orderdetail/:buyRecordId',
			name: 'integral_orderdetail',
			component: integral_orderdetail,
			meta: {
				title: "订单详情",
			}
		}, {
			path: '/goodsdetail/:goodsid/:buyshow',
			name: 'goodsdetail',
			component: goodsdetail,
			meta: {
				title: "商品详情",
			}
		},  {
			path: '/integral_make',
			name: 'integral_make',
			component: integral_make,
			meta: {
				title: "我的积分",
			}
		},{
			path: '/scorerules',
			name: 'scorerules',
			component: scorerules,
			meta: {
				title: "积分规则",
			}
		},{
			path: '/unionInfo/:id/:unionId',
			name: 'unionInfo',
			component: unionInfo,
			meta: {
				title: "工会资讯",
				search: true
			},
			children: [{
				path: 'unionnews/:sicId',
				component: unionnews,
				name: 'unionnews',
				meta: {
					title: "工会资讯",
					search: true
				}
			}, {
				path: 'unionstyle/:sicId',
				component: unionstyle,
				name: 'unionstyle',
				meta: {
					title: "工会资讯",
					search: true
				}
			}, {
				path: 'unionspecial/:sicId',
				component: unionspecial,
				name: 'unionspecial',
				meta: {
					title: "工会资讯",
					search: true,
					rest: true
				}
			},{
				path: 'unionnotice/:sicId',
				component: unionnotice,
				name: 'unionnotice',
				meta: {
					title: "工会资讯",
					search: true
				}
			}]
		}, {
			path: '/unionform/:id',
			component: unionform,
			name: 'unionform',
			meta: {
				title: "",
				//login:true
			},
			children: [{
				path: 'formnews/:sicId/:unionId',
				component: unionspecial,
				name: 'formnews',
				meta: {
					title: "工会资讯",
					//search: true
				}
			}]
		},{
			path: '/unionactivity',
			name: 'unionactivity',
			component: volunteer_activity,
			meta: {
				title: "志愿活动",
			}
		},	{
			path: '/volunteer_activity_detail/:id',
			name: 'volunteer_activity_detail',
			component: volunteer_activity_detail,
			meta: {
				title: "活动详情",
				showShare:true
			}
	   }, {
			path: '/volunteerStyle/:sicId',
			component: unionspecial,
			name: 'volunteerStyle',
			meta: {
				title: "志愿风采",
				from: "volunteer"
			}
		}, {
			path: '/unionforum/:sicId',
			component: forum,
			name: 'unionforum',
			meta: {
				title: "职工需求",
				rest: true
			}
		}, {
			path: '/wish/:wish_type/:sicId',
			component: volunteer_wish,
			name: 'wish',
			meta: {
				title: "微心愿"				
			}
		}, {
			path: '/wish_detail/:id',
			component: volunteer_wish_detail,
			name: 'wish_detail',
			meta: {
				title: "",
				showShare:true
			}
		}, {
			path: '/heartask/:id',
			component: heartask,
			name: 'heartask',
			meta: {
				title: "心理咨询",
				//			search: true,
			}
		}, {
			path: '/barrister/:smId/:qasmId',
			component: askonline,
			name: 'barrister',
			meta: {
				title: "在线咨询",
			}
		},  {
			path: '/psychological/:smId/:qasmId',
			component: askonline,
			name: 'psychological',
			meta: {
				title: "在线咨询",
			}
		}, {
			path: '/askteacher_details/:aduserId/:qasmId',
			component: askteacher_details,
			name: 'askteacher_details',
			meta: {
				title: "咨询师介绍",
				aduserId: ''
			}
		}, {
			path: '/askteacher_details2/:aduserId/:smId/:qasmId',
			component: askteacher_details2,
			name: 'askteacher_details2',
			meta: {
				title: "咨询师介绍",
				aduserId: ''
			}
		},{
			path: '/heartthings_chat/:sqId',
			component: heartthings_chat,
			name: 'heartthings_chat',
			meta: {
				title: "",
			}
		},  {
			path: '/past_advisory/:aduserId/:smId',
			component: past_advisory,
			name: 'past_advisory',
			meta: {
				title: "往期咨询",
				aduserId: '',
			}
		},{
			path: '/wantask/:aduserId/:qasmId',
			component: wantask,
			name: 'wantask',
			meta: {
				title: "咨询TA",
			}
		},{
			path: '/news_apply/:sicId',
			component: unionspecial,
			name: 'news_apply',
			meta: {
				title: "困难帮扶",

			}
		}
	]

	},  {
		path: '/volunteer/:id',
		name: 'volunteer',
		component: volunteer,
		meta: {
			title: "志愿服务",
		}
	}, {
		path: '/mine_volunteer_activity',
		name: 'mine_volunteer_activity',
		component: volunteer_activity,
		meta: {
			title: "我报名的活动",
		}
	}, {
		path: '/volunteerglory',
		name: 'volunteerglory',
		component: volunteer_glory,
		meta: {
			title: "志愿荣耀",
		}
	}, {
		path: '/mine_volunteer_collection/:id',
		name: 'mine_volunteer_collection',
		component: mine_volunteer_collection,
		meta: {
			title: "我的收藏",
		},
		children: [{
				path: 'unionactivity/:sicId',
				component: volunteer_activity,
				name: 'unionactivity1',
				meta: {
					title: "",
				}
			}, {
				path: 'volunteer_wish/:sicId',
				component: volunteer_wish,
				name: 'wish1',
				meta: {
					title: "",
					wish_type:'mine_collection_wish'
					//rest: true
				}
			},{
				path: 'volunteerStyle/:sicId',
				component: mine_collect,
				name: 'volunteerStyle1',
				meta: {
					title: "",
					from: "volunteer",
	
				}
		}]
	}, {
		path: '/wish_add',
		name: 'wish_add',
		component: volunteer_wish_add,
		meta: {
			title: "发表心愿",
			login:true
		}
	}, {
		path: '/wish_complete',
		name: 'wish_complete',
		component: volunteer_wish_complete,
		meta: {
			title: "获助感言",
			login:true
		}
	}, {
			path: '/mine_wish',
			name: 'mine_wish',
			component: mine_volunteer_wish,
			meta: {
				title: "我的心愿",
			},
			children: [{
				path: 'mine_publish_wish/:wish_type',
				component: volunteer_wish,
				name: 'mine_publish_wish',
				meta: {
					title: "我发布的心愿",
				}
			}, {
				path: 'mine_receive_wish/:wish_type',
				component: volunteer_wish,
				name: 'mine_receive_wish',
				meta: {
					title: "我领取的心愿",
				}
			}, {
				path: 'mine_wish_detail/:id',
				component: volunteer_wish_detail,
				name: 'mine_wish_detail',
				meta: {
					title: ""
				}
			}]
		},{
		path: '/difficult_apply',
		name: 'difficult_apply',
		component: difficult_apply,
		meta: {
			title: "帮扶申请"
		}
	},{
		path: '/family_member',
		name: 'family_member',
		component: family_member,
		meta: {
			title: "家庭成员"
		}
	}
	,{
		path: '/difficult_situation',
		name: 'difficult_situation',
		component: difficult_situation,
		meta: {
			title: "困难情况"
		}
	},{
		path: '/difficult_progress',
		name: 'difficult_progress',
		component: difficult_progress,
		meta: {
			title: "我的申请"
		}
	},{
		path: '/difficult_detail',
		name: 'difficult_detail',
		component: difficult_detail,
		meta: {
			title: "申请进度查询"
		}
	},{
		path: '/invite_friends',
		name: 'invite_friends',
		component: invite_friends,
		meta: {
			title: "邀请好友使用爱工惠"
		}
	},{
		path: '/mine_comments_type',
		name: 'mine_comments_type',
		component: mine_comments_type,
		meta: {
			title: "我的点评"
		}
	},{
		path: '/mine_comments_list/:commentType',
		name: 'mine_comments_list',
		component: mine_comments_list,
		meta: {
			title: "我的点评"
		}
	},{
		path: '*',
		redirect:'/notFoundPage',
		//component: notFoundPage,
		name: 'notFoundPage',
		meta: {
			title: "",
			backShow: true
		}
	}
]

export default routers;
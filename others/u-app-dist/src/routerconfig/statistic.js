var temps={
	unionInfo:{
		"1480051090185181":{eventId:'unionInfo_1480051090185181',eventName:'工会资讯'},
		"1480965307251101":{eventId:'unionInfo_1480965307251101',eventName:'就业服务'},
		"1483000413441101":{eventId:'unionInfo_1483000413441101',eventName:'职工讲堂'},
	},
	unionnews:{
		"1480150418085663":{eventId:'unionnews_1480150418085663',eventName:'工会资讯'},
	},
	unionspecial:{
		"1480156684748768":{eventId:'unionspecial_1480156684748768',eventName:'职工风采'},
		"1483001543145101":{eventId:'unionspecial_1483001543145101',eventName:'时事教育'},
	},
	unionstylelist:{
		"1480965536230101":{eventId:'unionstylelist_1480965536230101',eventName:'政策法规'},
		"1480965736164101":{eventId:'unionstylelist_1480965736164101',eventName:'普法课堂'},
		"1480965946200101":{eventId:'unionstylelist_1480965946200101',eventName:'以案释法'},
		"1480966095231101":{eventId:'unionstylelist_1480966095231101',eventName:'心理知识'},
		"1480966139044101":{eventId:'unionstylelist_1480966139044101',eventName:'热门心事'},
		"1480966321432101":{eventId:'unionstylelist_1480966321432101',eventName:'情感交流巷'},
		"1480966395519101":{eventId:'unionstylelist_1480966395519101',eventName:'新鲜生活帮'},
		"1480966452055101":{eventId:'unionstylelist_1480966452055101',eventName:'养生大讲堂'},
		"1480966508410101":{eventId:'unionstylelist_1480966508410101',eventName:'行业故事会'},
	},
	heartask:{
		"1480965326273101":{eventId:'heartask_1480965326273101',eventName:'法律援助'},
		"1480965364253101":{eventId:'heartask_1480965364253101',eventName:'心理咨询'},
	},
	askteacher_details2:{
		"1480965326273101":{eventId:'askteacher_details2_1480965326273101',eventName:'法律咨询师介绍'},
		"1480965364253101":{eventId:'askteacher_details2_1480965364253101',eventName:'心理咨询师介绍'},
	},
	wantask:{
		"11":{eventId:'wantask_11',eventName:'提交心理咨询'},
		"22":{eventId:'wantask_22',eventName:'提交法律咨询'},
	},
	past_advisory:{
		"1480965326273101":{eventId:'past_advisory_1480965326273101',eventName:'往期法律咨询'},
		"1480965364253101":{eventId:'past_advisory_1480965364253101',eventName:'往期心理咨询'},
	},
};
var statisticConfig={
	homepage:{eventId:'homepage',eventName:'首页'},
	activity:{eventId:'activity',eventName:'优惠券'},
	mine:{eventId:'mine',eventName:'我的'},
	mall:{eventId:'mall',eventName:'惠购'},
	details:{eventId:'details',eventName:'咨询详情'},
	unionInfo:{isTemplate:true,paramId:'id',events:temps.unionInfo},
	unionnews:{isTemplate:true,paramId:'sicId',events:temps.unionnews},
	unionspecial:{isTemplate:true,paramId:'sicId',events:temps.unionspecial},
	unionstylelist:{isTemplate:true,paramId:'sicId',events:temps.unionstylelist},
	heartask:{isTemplate:true,paramId:'id',events:temps.heartask},
	askteacher_details2:{isTemplate:true,paramId:'smId',events:temps.askteacher_details2},
	wantask:{isTemplate:true, paramId:'qasmId', events:temps.wantask},
	past_advisory:{isTemplate:true,paramId:'smId',events:temps.past_advisory},
	
	//activityLink:{eventId:'activityLink',eventName:'外链活动'},
	activity_history:{eventId:'activity_history',eventName:'往期优惠券'},
	//职工风采
	unionnotice:{eventId:'unionnotice',eventName:'通知公告'},
	unionstyle:{eventId:'unionstyle',eventName:'资讯专题'},
	//搜索
	//2.帮扶救助栏目
	//就业服务
	news_apply:{eventId:'news_apply',eventName:'困难帮扶'},
	difficult_apply:{eventId:'difficult_apply',eventName:'帮扶申请'},
	difficult_progress:{eventId:'difficult_progress',eventName:'我的申请'},
	//大病保障
	//3.法律援助栏目
	barrister:{eventId:'barrister',eventName:'在线咨询（法律）'},
	//4.心理咨询栏目
	psychological:{eventId:'psychological',eventName:'在线咨询（心理）'},
	heartthings_chat:{eventId:'heartthings_chat',eventName:'咨询问答详情'},
	//5.志愿活动栏目
	volunteer:{eventId:'volunteer',eventName:'志愿服务'},
	unionactivity:{eventId:'unionactivity',eventName:'志愿活动'},
	volunteer_activity_detail:{eventId:'volunteer_activity_detail',eventName:'志愿活动详情'},
	wish:{eventId:'wish',eventName:'微心愿'},
	wish_add:{eventId:'wish_add',eventName:'发表心愿'},
	mine_publish_wish:{eventId:'mine_publish_wish',eventName:'我发布的心愿'},
	volunteerglory:{eventId:'volunteerglory',eventName:'爱心榜'},
	volunteerStyle:{eventId:'volunteerStyle',eventName:'志愿风采'},
	//6.我有话说栏目
	worker_say:{eventId:'worker_say',eventName:'我有话说'},
	workersay_main:{eventId:'workersay_main',eventName:'我要发表'},
	//7.转会入会栏目
	join:{eventId:'join',eventName:'转会入会'},
	mine_approve:{eventId:'mine_approve',eventName:'我的审批'},
	//8.职工讲堂栏目
	//9.工会矩阵栏目
	square:{eventId:'square',eventName:'工会矩阵'},
	//10.惠工生活栏目
	worker_life:{eventId:'worker_life',eventName:'惠工生活'},
	
	//11.我的
	signin:{eventId:'signin',eventName:'签到'},
	mine_collect:{eventId:'mine_collect',eventName:'我的收藏'},
	mine_activity:{eventId:'mine_activity',eventName:'我的兑换券'},
	mine_questype:{eventId:'mine_questype',eventName:'我的问题'},
	mine_comments_type:{eventId:'mine_comments_type',eventName:'我的点评'},
	mine_info_member:{eventId:'mine_info_member',eventName:'我的会员卡'},
	invite_friends:{eventId:'invite_friends',eventName:'邀请好友'},
	mine_advice:{eventId:'mine_advice',eventName:'我的建议'}
}

export default statisticConfig;


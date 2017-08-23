<template>
	<div>
		<!--<div style="width: 100%;height:15px;background-color: #fd7b27;margin-top: -1px;margin-bottom: -5px;"></div>-->
		<mt-cell is-link class="mine-info" @click.native="goto({name:'mine_information'},'userid')" style=" margin-top: -1px;background-color: #fd7b27;">
			<div slot="title">
				<img style="float: left; margin-top: 13px; border-radius: 50%;" :src="headimg" @error="$event.target.src=defaulthead" width="75" height="75">
				<div style="height: 30px;background-color: #fd7b27;">&nbsp;</div>
				<div style="margin-left:90px;" >
					<p style=" margin-bottom: 5px;margin-top: 0px;">
						<span style="color: white; font-size: 18px; ">
			 			{{userid?nickname:'请登录'}}
			 			<!--<mt-badge size="normal">VIP</mt-badge>-->
			 			<img  v-show="bindstate=='已认证'" style="margin-bottom: 5px;" width="45" src="./imgs/VIP2.png" />
			 			<!--<img v-show="bindstate!='已认证'" style="margin-bottom: 5px;" width="45" src="./imgs/noVIP1.png" />-->
			 		</span>
					</p>
					<p style="color: white; margin-top: 8px;font-size: 14px; " >
						<span v-show="bindstate!='已认证'">请认证会员卡</span>
						<span v-show="bindstate=='已认证'">欢迎使用爱工惠</span>
					</p>
				</div>
			</div>
		</mt-cell>
		<div style="width: 100%;height:28px;background-color: #fd7b27;margin-top: -1px;"></div>
		<div style=" width: 100%;  margin: 15px auto 0;">
			<mt-cell @click.native="goto({name:'mine_collect'})" is-link class="unline">
				<div slot="title">
					<img src="./imgs/collect.png" style="float: left; margin-right: 7px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 8px;">&nbsp;</div>
						<span style="">
			 			&nbsp;我的收藏
			 		</span>
					</div>
				</div>
			</mt-cell>
			<mt-cell @click.native="goto({name:'mine_activity'})" is-link  class="min_ac">
				<div slot="title">
					<img src="./imgs/activity.png" style="float: left; margin-right: 7px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 8px;">&nbsp;</div>
						<span style="">
			 			&nbsp;我的兑换券
			 		</span>
					</div>
				</div>
			</mt-cell>
			<!--<mt-cell @click.native="goto({name:'mine_shopping_orders'})" is-link >
				<div slot="title">
					<img src="./imgs/activity.png" style="float: left; margin-right: 7px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 8px;">&nbsp;</div>
						<span style="">
			 			&nbsp;我的订单
			 		</span>
					</div>
				</div>
			</mt-cell>-->
			<!--<mt-cell title="我的入会审批" @click.native="goto({name:'mine_approve'})"  is-link>
			<div slot="title"><img  src="./imgs/nav.png" width="30" height="30">&nbsp;&nbsp;我的入会审批</div>
		</mt-cell>-->
		</div>
		<!--<div style=" width: 100%;" >
			<mt-cell @click.native="goto({name:'forum',params:{sicId:'local',title:'我发布的帖子'}})"   is-link>
				<div slot="title">
					<img src="./imgs/minecard.png" style="float: left; margin-right: 7px;margin-top: -2px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 7px;">&nbsp;</div>
						<span style="">
			 			&nbsp;我的帖子
			 		</span>
					</div>
				</div>
			</mt-cell>
		</div>-->
		<div style=" width: 100%;">
			<mt-cell @click.native="goto({name:'mine_questype',params:{sicId:'local',title:'我的问题'}})"   is-link>
				<div slot="title">
					<img src="./imgs/mq.png" style="float: left; margin-right: 7px;margin-top: -2px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 7px;">&nbsp;</div>
						<span style="">
			 			&nbsp;我的问题
			 		</span>
					</div>
				</div>
			</mt-cell>
		</div>
		<div style=" width: 100%;">
			<mt-cell @click.native="goto({name:'mine_comments_type',params:{title:'我的点评'}})"   is-link>
				<div slot="title">
					<img src="./imgs/mine_comment.png" style="float: left; margin-right: 7px;margin-top: -2px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 7px;">&nbsp;</div>
						<span style="">
			 			&nbsp;我的点评
			 		</span>
					</div>
				</div>
			</mt-cell>
		</div>
		<div style=" width: 100%;">
			<mt-cell @click.native="goto({name:'signin'})"   is-link>
				<div slot="title">
					<img src="./imgs/jifenstore.png" style="float: left; margin-right: 7px;margin-top: -2px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 7px;">&nbsp;</div>
						<span style="">
			 				&nbsp;积分商城
			 			</span>
					</div>
				</div>
			</mt-cell>
		</div>

		<div style=" width: 100%; ">
			<mt-cell @click.native="goto({name:'mine_info_member'})" title="工会会员卡" is-link>
				<div slot="title">
					<img src="./imgs/vip.png" style="float: left; margin-right: 7px;margin-top: -2px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 7px;">&nbsp;</div>
						<span style="">
			 			&nbsp;工会会员卡
			 		</span>
					</div>
				</div>
				<span style="font-size: 12px;">{{bindstate}}</span>
			</mt-cell>
		</div>
		<div style=" width: 100%;  margin: 15px auto 0;">
			<mt-cell @click.native="$router.push({name:'invite_friends'})"   is-link class="unline">
				<div slot="title">
					<img src="./imgs/mine_share.png" style="float: left; margin-right: 7px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 8px;">&nbsp;</div>
						<span style="">
				 			&nbsp;邀请好友使用爱工惠
				 		</span>
					</div>
				</div>
			</mt-cell>
		</div>
		
		<div style=" width: 100%;  margin: 15px auto 0;">
			<mt-cell @click.native="goto({name:'mine_advice'})"   is-link class="unline">
				<div slot="title">
					<img src="./imgs/advice.png" style="float: left; margin-right: 7px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 8px;">&nbsp;</div>
						<span style="">
				 			&nbsp;意见反馈
				 		</span>
					</div>
				</div>
			</mt-cell>
		</div>
		<div style=" width: 100%;  margin: 15px auto 0;">
			<mt-cell @click.native="goto({name:'mine_setting'})"  is-link class="unline">
				<div slot="title">
					<img src="./imgs/setting.png" style="float: left; margin-right: 7px;" width="30" height="30">
					<div style="float: left;">
						<div style="height: 8px;">&nbsp;</div>
						<span>
			 			&nbsp;设置
			 		</span>
					</div>
				</div>
			</mt-cell>
		</div>
		<!--<on-touch @longTap='ces(123)'>
			<div style=" width: 100%;  margin: 5% auto 0;"   >
				<mt-cell @click.native="goto({name:'mine_advice'})"  title="意见反馈" is-link>
				<img slot="icon" src="./imgs/nav.png" width="24" height="24">
				</mt-cell>
			</div>
		</on-touch>-->
	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		data() {

				return {
					userid: localStorage.userId || '', //用户id
					username: localStorage.userName || '', //用户名
					nickname:'',
					headimg: localStorage.headurl|| '',
					defaulthead:defaulthead,
					state:"",
				}
			},
			computed: {
				bindstate() {
					if(this.state === 0) {
						return '已认证';
					} 
//					else if(this.state == 1) {
//						return '失败';
//					} else if(this.state == 2) {
//						return '正在审核';
//					}
					else if(this.state == 11) {
						return '认证失败被占用';
					}
					else if(this.state == 12) {
						return '未认证';
					} else return ''
				}
			},
			created() {
				//	mine_info_member.vue
				if(localStorage.userId) {
					this.getuserinfo()
				}

			},
			
			methods: {
				getuserinfo() {
					let self = this;
					this.ajax({
						url: '/sysUserInfo/userStateSelect',
						data: {
							userId: localStorage.userId || '',
						},
						type: 'get'
					}, function(data) {
						if(data.result) {
							self.state= data.obj.userState;
							localStorage.bindstate = data.obj.userState;
							localStorage.userPhone = data.obj.userPhone
							localStorage.userName = data.obj.userRealname
							self.username= data.obj.userRealname
							self.nickname=data.obj.userName
							localStorage.nickName = data.obj.userName
							if(self.state == 12) {
								if(!localStorage.bindcard) {
									self.$messagebox.confirm('你还没有认证会员卡号，是否现在去认证?', '提示', ).then(action => {
										self.$router.push({
											name: 'mine_info_member'
										});
									});
									localStorage.bindcard = 'flag'
			
								}
			
							} else {
								//		alert(this.bindstate+"认证状态")
							}
						} else {
//							self.$toast({
//								message: data.description,
//								position: 'bottom',
//							});
						}

					})
				},
				goto(page) {
					console.log(page.name)
					if(this.userid || page.name == 'signin') {
						this.$router.push(page);
					} else{
						this.$router.push({
							name: 'login',
							title:'登录',
						});
					}
				},
				ces(e, a) {
					console.log(e)
					console.log(a)
				}
			},
	}
</script>

<style>
	.Grid {
		display: flex;
	}
	
	.Grid-cell {
		flex: 1;
		/**/
		text-align: center;
	}
	
	.Gridimg {
		margin: 0 auto;
	}
	
	.description {
		font-size: 15px;
		line-height: 15px;
		display: block;
		width: 100%;
		height: 15px;
		margin-top: 8px;
		text-overflow: ellipsis;
		color: #333;
		margin-bottom: 10%;
	}
	.min_ac .mint-cell-wrapper{background-origin: padding-box;}
	.unline .mint-cell-wrapper{background-image: none;}
	.mine-info .mint-cell-allow-right::after{
		border:solid 2px  #FFFFFF; 
	    border-bottom-width: 0;
	    border-left-width: 0;
	    content: " ";
	    top: 50%;
	    right: 20px;
	    position: absolute;
	    width: 5px;
	    height: 5px;
	    -webkit-transform: translateY(-50%) rotate(45deg);
	    transform: translateY(-50%) rotate(45deg);}
	</style>
<style>
	#invite_friends li{float: left; list-style: none; width: 33.33%; text-align: center;}
	#invite_friends li img{width: 50px;}
	#invite_friends li p{margin: 0; padding: 0;}
</style>
<template>
	<div id="invite_friends">
		<ul style="padding:20px 0; margin: 0; overflow: auto;">
			<li>
				<img src="./imgs/wechat.png" @click='share("weixin","WXSceneSession")' />
				<p>微信好友</p>
			</li>
			<li>
				<img src="./imgs/wechat_moment.png" @click='share("weixin","WXSceneTimeline")' />
				<p>朋友圈</p>
			</li>
			<li>
				<img src="./imgs/qq .png" @click='share("qq")' />
				<p>qq好友</p>
			</li>
		</ul>
		<div style="text-align: center; margin-top: 20px;">
			<img style="width: 180px;" src="./imgs/APP.jpg" />
			<p>扫码安装爱工惠APP</p>
		</div>
		<div style="text-align: center; margin-top: 10px;">
			<img style="width: 180px;" src="./imgs/weichat.jpg" />
			<p>扫码关注爱工惠公众号</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			}
		},			
		methods: {
			share(id, type) {
				var self = this;
				let shareObj = this.$store.state.shares				
				if(this.$store.state.shares == '') {
					this.$toast("获取分享服务失败")
					return 
				} else {
					var obj={
						href:"http://www.zb12351.com/dl/index.html",
						title:"爱工惠",
						content:"您身边的职工之家",
						thumbs:["http://121.42.245.96:8082/image/repository/DataStore/fenxiang/aigonghui.png"],
						pictures:["http://121.42.245.96:8082/image/repository/DataStore/fenxiang/aigonghui.png"],
						contentType:0,
						detailId:0
 
					}
					this.$store.commit('updateShareDetail', obj)
					//this.$store.commit('updatePopupVisible', true)
				}
				
				if(shareObj[id]) {
					var msg = this.$store.state.shareDetail;
					console.log(JSON.stringify(msg))
					msg.extra = {
						scene: type || ''
					};
					if(shareObj[id].authenticated) {
						console.log("已经授权")
						self.shareMessage(msg, shareObj[id]);
					} else {
						console.log("未授权")
						shareObj[id].authorize(function() {
							self.shareMessage(msg, shareObj[id]);
							console.log("授权成功")
						}, function(e) {
							console.log("认证授权失败：" + e.code + " - " + e.message);
						});
					}
				} else {
					this.$toast("获取分享服务失败")
				}
			},
			shareMessage(msg, s) {
				var self = this;
				s.send(msg, function() {
					console.log(JSON.stringify(s))
					self.$toast("分享到" + s.description + "成功！ ");
					self.addShareRecord(msg)
				}, function(e) {
					self.log("分享失败：" + e.code + " - " + e.message);
				});
			},
			addShareRecord(msg){//添加分享记录
				if(!localStorage.userId){
					return 
				}
				this.ajax({
					url: '/appTrace/shareNews',
					data: {
						createUser: localStorage.userId,
						detailId: msg.detailId,
						type:msg.contentType
					},
					type: 'post'
				}, function(data) {
					//console.log(data.result)
				})
			},
		},

	}
</script>
<style >
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	} 
	.wish-item{
		background-color: #fff; 
		padding:2px 10px 0px; 
	    background-size: 120% 1px;
	    background-origin: content-box;
	    background-repeat: no-repeat;
	    background-position: bottom left; 
	    margin-bottom: 15px;
	}
	.wish_border .mint-cell-wrapper {
		background-image: linear-gradient(180deg, #fff, #fff 0%, transparent 50%);
	}
 .wish_border .mint-cell-text{
 	color:#FD9252 ;
 	}
 .wish-btn{color: #FFFFFF;float: right; background-color: #FD9252; line-height: 45px;  padding: 0 20px;  font-size: 16px;}
</style>
<template>
	<div :style="hhh" id="wish_detail ">
		<div v-show="detailObj.audit=='1' && isShow" style=" position: fixed;top:13px;z-index: 22;right: 10px; color: #f7f7f7;">
			<img width="24" @click='share()' src="./imgs/share_top.png" />
		</div>
		<div  class="wish-item">
			<div style="text-align: left; overflow: auto; margin-top: 10px;">
				<div style="float: left; margin-right: 5px;">
					<img :src="detailObj.photoUrl" @error="$event.target.src=defaulthead"  style="height: 40px; width:40px;margin-right: 7px; border-radius: 50%;">
				</div>
				<div style="float:left;font-size:13px"> 
					<h4 style=" color: #222; margin: 0;padding: 0;font-weight: normal; margin-bottom: 8px;">{{detailObj.userName}}</h4>
					<span style="color: #8c8c8c;">{{detailObj.createTime | formatDate}}</span>
				</div>
				<div style="float: right; color: #FD9252;">+{{detailObj.loves}}爱心值</div>
			</div>
			<div style="clear: both;"></div>
			<div  style="margin-top: 10px;text-align: left;padding-bottom: 12px;">
				<p style="font-size: 17px; margin: 5px 0 0; color: #222; ">{{detailObj.title}}</p>
				<p style="overflow: hidden;line-height: 20px; margin: 3px 0; font-size: 15px; word-wrap:break-word; color: #444; " v-html="detailObj.content"></p>
				
			</div>
		</div>	
		<div v-show="detailObj.status!=='0'" style="margin-bottom: 15px;">
			<mt-cell title="领取人" class="wish_border bornone" style="min-height: 32px;"></mt-cell>
			<mt-cell>
				<div  slot='title'>
					<div  style="text-align: left; overflow: auto; margin-top: 10px; padding: 5px 0px 15px 0;">
						<div style="float: left; margin-right: 5px;">
							<img :src="receiveObj.photourl || ''" @error="$event.target.src=defaulthead"  style="height: 40px; width:40px;margin-right: 7px; border-radius: 50%;">
						</div>
						<div style="float:left;font-size:13px"> 
							<h4 style=" color: #222; margin: 0;padding: 0;font-weight: normal; margin-bottom: 8px;">{{receiveObj.username}}</h4>
							<span style="color: #8c8c8c;">参加活动{{receiveObj.attendCount}}次</span>
						</div>
						<div style="float: right; color: #8c8c8c; font-size: 14px;">{{receiveObj.loveCount}}爱心值</div>
					</div>
				</div>
			</mt-cell>			
		</div>
		<div v-show="detailObj.status==='2'"  style="margin-bottom: 50px;">
			<mt-cell title="获助感言" class="wish_border bornone" style="min-height: 32px;"></mt-cell>
			<mt-cell>
				<div  slot='title'>
					<div  style="text-align: left; overflow: auto; margin-top: 10px; padding: 5px 0px 15px 0; line-height: 1.5em;">
						{{helpObj}}
					</div>
				</div>
			</mt-cell>			
		</div>
		<div  style=" height: 45px;width: 100%; background-color: #f2f2f2;position: fixed;bottom: 0px;">
			<span v-show="currentUserId && currentUserId==detailObj.userId && detailObj.audit=='2'" class="wish-btn">心愿审核中</span>
			<span v-show="currentUserId && currentUserId==detailObj.userId && detailObj.audit=='0'" class="wish-btn">审核未通过</span>
			<span v-show="currentUserId && currentUserId==detailObj.userId && detailObj.audit=='1' && detailObj.status==='0'" class="wish-btn" @click="deleteWish">删除心愿</span>			
			<span v-show="currentUserId!=detailObj.userId && detailObj.audit=='1' && detailObj.status=='0'" class="wish-btn" @click="receiveWish">我要领取心愿</span>
			<span v-show="currentUserId!=receiveObj.userId && currentUserId!=detailObj.userId && detailObj.audit=='1' && detailObj.status=='1'" class="wish-btn">已领取</span>
			<span v-show="currentUserId==receiveObj.userId && detailObj.audit=='1' && detailObj.status=='1'" class="wish-btn" style="line-height: 45px;"><img style="width: 28px; vertical-align: middle;" src="./imgs/phoneicon.png" /><span>{{detailObj.userPhone}}</span> </span>
			<span v-show="currentUserId==detailObj.userId && detailObj.audit=='1' && detailObj.status=='1'" class="wish-btn" @click="confirmComplete">确认完成心愿</span>
			<span v-show="detailObj.status=='2' && detailObj.thanks!=''" class="wish-btn">已完成</span>
			<span v-show="currentUserId==detailObj.userId && detailObj.status=='2' && detailObj.thanks==''" @click="toThanks" class="wish-btn">感谢一下</span>
			<span style="position: relative;margin-left: 20px;margin-top: 10px;  display: inline-block;">
			 	<img width="25" @click='wishAgree' :src="detailObj.agreeFlag?zanafter:zanbefore"  /><!--:src="detailsObj.agreeFlag==false?zanbefore:zanafter"-->
			 	<mt-badge v-show="detailObj.agreeCount && detailObj.agreeCount!==0" size="small" type="error" style="position: absolute; top:-10px; left: 17px;">{{detailObj.agreeCount || 0}}</mt-badge>
			 </span>
			 <img width="24" style="margin-left: 25px; margin-top:10px;" @click='addFavorite' :src="detailObj.favoriteFlag?scafter:sc" /> 
		</div>
	</div>
</template>

<script type="text/javascript">
import defaulthead from './imgs/defaulthead.png'
import zanafter from './imgs/zanafter.png'
import zanbefore from './imgs/zanbefore.png'
import sc from './imgs/sc.png'
import scafter from './imgs/scafter.png'
import errornews from './imgs/errornews.png'
	export default {
		name: "wishDetail",
		data() {
			return {
				zanbefore:zanbefore,//点赞之前图标
				zanafter:zanafter,//点赞之后图标
				detailObj:'',//心愿详情
				isAnonymous:false,//评论是否匿名
				agreeflag: false,//是否点赞
				sc: sc, //收藏之前图标
				scafter: scafter,//收藏之后图标
				isShow:window.plus,
				errornews:errornews,
				remarkTitle:"评论",
				defaulthead:defaulthead,//默认头像
				receiveObj:"",//领取信息
				helpObj:"暂无获助感言",//获助感言
				hhh:{
					'height': (document.documentElement.clientHeight - 46) + 'px',
					'-webkit-overflow-scrolling' :'touch',
				},
				currentUserId:localStorage.userId || ''//当前登录用户id
			}
		},
		watch:{
			'$route'(val, oldVal){
				if(this.$route.name=='wish_detail' || this.$route.name=='mine_wish_detail'){
					this.getdetail()//获取心愿详情信息
				}
			}
		},
		created(){
			this.getdetail()//获取心愿详情信息
			
			//
		},
		methods: {			
			share() {//分享
				if(this.$store.state.shares == '') {
					this.$toast("获取分享服务失败")
				} else {
					var obj={
						href:this.mui.shearRoot+this.$route.path,
						title:this.detailObj.title,
						content:this.detailObj.content,
						/*thumbs:[this.detailObj.poster],
						pictures:[this.detailObj.poster]*/
						contentType:3,
						detailId:this.$route.params.id
					}
					this.$store.commit('updateShareDetail',obj)
					this.$store.commit('updatePopupVisible', true)
				}
			},
			getdetail(){//心愿详情
				var self=this;
				this.ajax({
					url:'/voluNeeds/detail', 
					data:{needsId:this.$route.params.id,userId:localStorage.userId||''},
					type:'GET'
				},function(data){
					if(data.result){
						self.detailObj=data.obj.voluNeeds
						document.title=data.obj.voluNeeds.title;
						if(self.detailObj.status!=='0'){//领取人信息
							self.receiveObj=data.obj.receiveInfo
						}
						if(self.detailObj.status==='2'){
							if(self.detailObj && self.detailObj.thanks!==''){
								self.helpObj=self.detailObj.thanks
							}else{
								self.helpObj="暂无获助感言"
							}
						}
						//console.log(JSON.stringify(self.detailObj));
					}
				})
			},
			receiveWish(){//心愿领取
				let self=this;
				if(!localStorage.userId){
					this.tologin()					 
				}else{
					const self=this		
					self.$messagebox.confirm('确认要领取？', '确认', ).then(action => {
						this.ajax({
							url:'/voluNeeds/updateReceive', 
							data:{userId:localStorage.userId,receiveUser:localStorage.userId,needsId: this.detailObj.needsId},
							type:"POST"
							},function(data){
								if(data.result){
									sessionStorage.detailOpt="receive"
									self.getdetail()
								}
								self.$toast(data.description)
						})
					});	
				}
			},
			wishAgree(){//心愿点赞
				if(this.isShow){//通过app点赞
					if(!localStorage.userId){
						this.tologin()					 
					}else{
						if(this.detailObj.agreeFlag){
							this.$toast('您已经点过赞了')
							return
						}
						this.updateWishAgreeCount()
					}
				}else{//网页点赞
					this.updateWishAgreeCount()
				}
			},
			updateWishAgreeCount(){//更新点赞数量
				const self=this
				 this.ajax({
					url:'/voluNeedsUserCalc/add', 
					data:{
						needsId:this.$route.params.id,
						userId:localStorage.userId || ''
					},
					type:"post"
				},function(data){
					if(data.result){
						//self.detailObj.agree+=1
						self.detailObj.agreeCount=self.detailObj.agreeCount+1;
						self.detailObj.agreeFlag=true
					}else{
						self.$toast(data.description)
					}
					
				})
			},
			addFavorite() {//收藏
				if(this.isShow){//app收藏
					let self = this;
					if(!localStorage.userId) {
						this.tologin()
						return
					}
					if(self.detailObj.favoriteFlag == true) {
							self.$toast('你已经收藏了！')
							return;
					}
					let obj = {
						needsId: this.$route.params.id,
						userId: localStorage.userId,
					}
					this.ajax({
						url: '/voluNeedsFavorite/add',
						data: obj,
						type: 'post'
					}, function(data) {
						self.$toast(data.description)
						if(data.result){
						   self.detailObj.favoriteFlag = true
						}
					})
				}else{//网页收藏
					this.$messagebox.alert("请下载爱工惠app进行收藏").then(action => {
					});
				}
			},
			deleteWish(obj){//删除心愿
				let self = this;
				this.$messagebox.confirm('你确定要删除?', '确认', ).then(action => {
					this.ajax({
						url: '/voluNeeds/delete',
						data: {
							needsId: this.detailObj.needsId
						},
						type: 'post'
					}, (data) => {
						self.$toast({
							message: data.description,
							position: 'bottom',
						})
						if(data.result) {
							sessionStorage.detailOpt="delete"
							self.$router.back()
						} 
					})
				});
			},
			confirmComplete(){//确认完成				
				let self = this;
				this.$messagebox.confirm('你确定心愿已完成?', '确认', ).then(action => {
					this.ajax({
						url: '/voluNeeds/updateFinish',
						data: {
							needsId: this.detailObj.needsId,
							title:this.detailObj.title
						},
						type: 'post'
					}, (data) => {
						if(data.result) {
							sessionStorage.detailOpt="complete"
							self.$messagebox.confirm('恭喜你心愿已达成，是否去感谢一下？', '提示', ).then(action => {
								self.$router.push({name:'wish_complete',params:{id:self.detailObj.needsId}})
							},function(){		
						    	self.$router.back()
							})
						} 
					})
				});
			},
			toThanks(){
				this.$router.push({name:'wish_complete',params:{id:this.detailObj.needsId}})
			}
		}
	}
</script>
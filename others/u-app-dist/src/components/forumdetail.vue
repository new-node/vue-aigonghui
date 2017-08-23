<style type="text/css" scoped="scoped">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	.nav_ten td {
		height: 90px;
	}
	
	.nav_ten img {
		width: 50px;
	}
	p{
		font-size: 14px;
	}
	.mint-checklist-label {
		display: block;
	}
	
	.mint-check-input {
		display: none;
	}
	
	.mint-check-input:checked+ .mint-check-core {
		background-color: #fd7b27;
		border-color: #FFFFFF;
	}
	
	.mint-check-input:checked+ .mint-check-core::after {
		background-color: #fff;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	
	.mint-check-input[disabled]+ .mint-check-core {
		background-color: #d9d9d9;
		border-color: #ccc;
	}
	
	.mint-check-core {
		display: inline-block;
		background-color: #fff;
		border-radius: 100%;
		border: 1px solid #ccc;
		position: relative;
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	
	.mint-check-core::after {
		content: " ";
		border-radius: 100%;
		top: 4.5px;
		left: 4.5px;
		position: absolute;
		width: 8px;
		height: 8px;
		-webkit-transition: -webkit-transform .2s;
		transition: -webkit-transform .2s;
		transition: transform .2s;
		transition: transform .2s, -webkit-transform .2s;
		-webkit-transform: scale(0);
		transform: scale(0);
	}
</style>
<template>
	<div>
		<div v-show="isShow" style=" position: fixed;top:13px;z-index: 22;right: 10px; color: #f7f7f7;">
			<img width="24" @click='share()' src="./imgs/share_top.png" />
		</div>
		<div style="background-color: #fff; padding:2px 10px 5px; margin-bottom: 15px;" v-if="question!=''">
			<div>
				<div style="float: left; margin-right: 5px;padding-top: 7px; margin-top: 4px;">
					<img :src="question.faceImageUrl||''" style="height: 40px; margin-right: 7px; width: 40px; border-radius: 50%;" @error="$event.target.src=defaulthead">
				</div>
				<div style="line-height: 10px;font-size:13px;padding: 2px; ">
					<p  style="margin-bottom: 8px; color: #222;">{{question.isAnonymous?'匿名用户':question.userName}}</p>
					<span style="color: #8c8c8c;">{{question.createTime}}</span>
				</div>
			</div>
			<div class="" style="margin-top: 10px; margin-bottom: 10px;">
				<p style="font-size: 17px; margin: 5px 0 0; color: #222;">{{question.contentTitle}}</p>
				<p  style="overflow: hidden; margin: 3px 0; font-size: 15px; color: #444; word-wrap:break-word;" v-text='question.contentText'> </p>
				  	<div style="text-align: center;">
					  	<img  :src="pic" v-for="pic in question.photoList" style="width: 80%;" @error="$event.target.src=defaulthead">
				  	</div>				
				<p style="color: #A3A3A3; margin: 10px 0 3px;font-size: 13px; overflow: hidden;">
					<!--<span>{{question.viewCount}}次阅读  </span>&nbsp;
					<span>{{question.remarkCount||0}}回复  </span>&nbsp;-->
					<span style="float: right;">
						<span style="margin-left: 15px;"><img src="./imgs/liulan.png" width="17" style="vertical-align: bottom;"/>&nbsp;&nbsp;{{question.viewCount||0}}</span>
						<span style="margin-left: 15px;" @click="replay()"><img src="./imgs/pinglun11.png" width="17" style="margin-top: 4px; vertical-align: bottom;"/>{{question.remarkCount||0}}</span>
						<span style="margin-left: 15px;" @click="zan">
							<img :src="question.agreeFlag==false?zanbefore:zanafter" width="17" style="vertical-align: bottom;"/>&nbsp;&nbsp;{{question.agreeCount}}&nbsp;&nbsp;&nbsp;&nbsp;
						</span>
						
					</span>
				</p>
			</div>
		</div>

		<div style="background-color: #FFFFFF; margin-bottom: 15px;" >
			<mt-cell  title="评论" class="bornone" style="min-height: 20px; color: #999999;  margin-top: 10px; padding: 10px 0;  font-size: 14px;">
				<img slot="icon" src="./imgs/assistor.png" width="10" height="18" style="margin-right: 10px;margin-left: -10px;">
			</mt-cell>
			<div style="padding:2px 10px 5px;">
				<!--<p style="  margin-top: 15px; color: #8c8c8c; margin-bottom:0 ;">回复</p>-->
					<div v-if="answer.length==0" style="text-align: center; background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
					background-size: 120% 1px;
					background-origin: content-box;
					background-repeat: no-repeat;">
						<p style="padding-top: 20px; margin: 0;">暂无评论</p>
					</div>	
				<div style="margin-bottom: 10px; padding-bottom: 10px; background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
					background-size: 120% 1px;
					background-origin: content-box;
					background-repeat: no-repeat;" v-if="answer!=null&&answer.length!=0" v-for='itme in answer'>
					<div style="float: left; margin-right: 5px;padding-top: 7px">
						<img :src="itme.faceImageUrl||''" style="height: 40px; margin-top: 5px; border-radius: 50%; " @error="$event.target.src=defaulthead">
					</div>
					<div style="line-height: 10px;font-size:12px;padding: 2px">
						<span style="float: right;color: #A3A3A3; margin-top: 10px;" @click="replay(itme.remarkId)"><img src="./imgs/pinglun11.png" width="20" style="vertical-align: bottom;"/></span>
						<p style="margin-bottom: 8px; margin-top: 17px;" v-if="itme.toRemarkId!=null">{{itme.userName||'匿名用户'}} 回复：{{itme.toUserName||'匿名用户'}}</p>
						<p style="margin-bottom: 8px; font-size: 13px; color: #222;" v-if="itme.toRemarkId==null">{{itme.userName||'匿名用户'}}</p>					
						<span style="font-size: 12px;color: #8c8c8c;">{{itme.createTime}}</span>
					</div>				
					<p style="overflow: hidden; margin: 11px 0 3px; font-size: 15px; color: #666; word-wrap:break-word; " v-html='itme.remarkContent '> </p>
					<!--<span style="float: right;color: #A3A3A3;" @click="replay(itme.remarkId)"><img src="./imgs/pinglun11.png" width="20" style="vertical-align: bottom;"/></p></span>-->
				</div>
            </div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom" style='width: 100%;padding: 10px;'>
			<textarea style="width: 100%; height: 150px; " placeholder="回复 ：" v-model='remarkContent' id="textfocus"></textarea>
			<div style="margin-top: 8px;">
				<mt-button type="default" size="small" style="float: left;" @click.native="popupVisible=false">取消</mt-button>
				<mt-button type="primary" size="small" style="float: right;background-color: #FD7B27;" @click.native="send">发送</mt-button>
			</div>
		</mt-popup>
		<div v-show="isShow" style=" height: 45px;width: 100%; background-color: #f2f2f2;position: fixed;bottom: 0px;">
			<input type="text" placeholder="添加评论..." style="width: 40%;height: 30px; border: 1px solid #ddd; outline: none; margin-top: 7.5px; border-radius: 15px; padding-left: 20px; background-color: #fff; margin-left: 12px; font-size: 12px;padding-bottom: 3px;" @click="replay()" readonly="readonly" />
			
			<!--<img width="24" @click='share()' style="margin-right: 20px; margin-top: 10px;float: right;" src="./imgs/share.png" />-->
			<img width="24" style="margin-right: 25px; margin-top:10px; float: right;" @click='addFavorite' :src="question.favoriteFlag?scafter:sc" /> 
			 <span style="position: relative;margin-right: 20px;margin-top: 10px; float: right; display: inline-block;">
			 	<img width="25" @click='zan' :src="question.agreeFlag?zanafter:zanbefore"  />
			 	<mt-badge v-show="question.agreeCount!==0" size="small" type="error" style="position: absolute; top:-10px; left: 17px;">{{question.agreeCount || 0}}</mt-badge>
			 </span>
		</div>
	</div>
</template>

<script>
import errorpng from './imgs/defaultyhq.png'
import defaulthead from './imgs/defaulthead.png'
import sc from './imgs/sc.png'
import scafter from './imgs/scafter.png'
import zanbefore from './imgs/zanbefore.png'
import zanafter from './imgs/zanafter.png'

	export default {
		name: 'forumdetail',
		data() {
			return {
				selected: '',
				answer:[],
				question:'',
				popupVisible:false,
				remarkContent:'',
				toRemarkId:'',
				defaulthead:defaulthead,
				errorpng:errorpng,
				agreeflag:false,
				zanbefore: zanbefore,
				zanafter: zanafter,
				isShow:window.plus,
				sc: sc, //收藏之前图标
				scafter: scafter,//收藏之后图标
			};
		},
		created(){
			this.pageinit();
		},
		watch:{
			$route(){
				if(this.$route.name=='forumdetail'){
					this.answer=[];
					this.question='';
					this.pageinit();
				}
			},
			popupVisible (){
				if(this.popupVisible){					
					 setTimeout(function(){
						document.getElementById("textfocus").focus()
					 },0)
				}
			}
		},
		methods:{
			pageinit(){
				var self=this
				this.ajax({url:'/bbsContent/detail',data:{contentId:this.$route.params.contentId, userId:localStorage.userId || ''}},function(data){
					if(data.result){
						self.question=data.obj
						document.title=data.obj.contentTitle;
					}else{
						self.$toast(data.description)
					}
				})
				this.bbsContentRemark()
			},
			bbsContentRemark(){
				var self=this
				this.ajax({url:'/bbsContentRemark/pages',data:{contentId:this.$route.params.contentId}},function(data){
					if(data.result){
						self.answer=data.obj
					}
				})
			},
			share() {//分享
				if(this.$store.state.shares == '') {
					this.$toast("获取分享服务失败")
				} else {
					var obj={
						href:this.mui.shearRoot+this.$route.path,
						title:this.question.contentTitle,
						content:this.question.contentShort,
						thumbs:this.question.photoList,
						pictures:this.question.photoList
					}
					this.$store.commit('updateShareDetail',obj)
					this.$store.commit('updatePopupVisible', true)
				}
			},
			
			send(){
				
				var contentStr=this.filterContent(self.remarkContent);
				
				if(contentStr == '') {
					this.$toast('评论内容不能为空')
					return
				}else if(/[\s\S]{500,}/.test(this.remarkContent)) {
					this.$toast('内容长度不能超过500')
					return
				}
				
				let self=this;
				
				
				let obj={
					contentId:self.$route.params.contentId,
					remarkContent:contentStr,
					toRemarkId:self.toRemarkId,
					createId:localStorage.userId
				}
				console.log(JSON.stringify(obj))
				this.ajax({url:'/bbsContentRemark/add',data:obj,type:'post'},function(data){
					if(data.result){
						self.popupVisible=false
						self.remarkContent=''
						self.bbsContentRemark()
					} 
						self.$toast(data.description)
				})
			},
			replay(id){
				if(!localStorage.userId){
					this.tologin("")
				}else{
					this.popupVisible=true
					this.toRemarkId=id||''
				}
			},
			zan(){
				let self=this
				if(!localStorage.userId){
					this.tologin("")
				}else{
					this.ajax({url:'/bbsContentCalculated/setCount',data:{userId:localStorage.userId,agreeCount:1,contentId:this.$route.params.contentId},type:'post'},function(data){
					self.$toast(data.description)
					
					if(data.result){
						self.question.agreeFlag=true
						self.question.agreeCount=data.obj
//						self.agreeflag=false
						} 
						
					})
				}
				
//				if(this.agreeflag==false){
//					this.$toast('你已经点过赞了！')
//					return ;
//				}
				
			},
			addFavorite() {//收藏
				let self = this;
				if(!localStorage.userId) {
					this.tologin()
					return
				}
				if(self.question.favoriteFlag == true) {
						self.$toast('你已经收藏了！')
						return;
				}
				let obj = {
					infoClassId: self.question.classId,
					infoDetailId: self.question.contentId,
					/*infoTitle: this.question.detailTitle,
					infoPictureUrl: this.detailObj.poster,*/
					userId: localStorage.userId,
					collType:"1"
				}
				this.ajax({
					url: '/sysUserFavorite/add',
					data: obj,
					type: 'post'
				}, function(data) {
					self.$toast(data.description)
					if(data.result){
					   self.question.favoriteFlag = true
					}
				})
			}
		}
	};
</script>
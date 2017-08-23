<template>
	<div id="details" :style="hhh" style="position: relative;">
		<div v-show="isShow" style=" position: fixed; top:13px;right: 10px; color: #f7f7f7;z-index: 22;">
			<img width="24" @click='share()' src="./imgs/share_top.png" />
		</div>
		<!--分享出去的页面的轮播图-->
		<!--<div v-show="!isShow" style="width: 100%;height: 50px;background: #4c4c4c;color: white;filter:alpha(opacity=80);-moz-opacity:0.8;opacity:0.8;">
			<mt-swipe :auto="4000">
				<mt-swipe-item>
					爱工惠
					<a href="test://abc">test</a>
				</mt-swipe-item>
			</mt-swipe>
		</div>-->
		
		<div style="padding: 10px 10px 0;background-color: white;-webkit-overflow-scrolling :touch;">
			<div style="padding-bottom: 6px; border-bottom: 1px solid #d9d9d9;">
				<h3 style="font-weight:bold; font-size: 20px; margin-top: 10px; margin-bottom: 10px; line-height: 28px;">{{detailsObj.detailTitle}}</h3>
				<p style="display: inline-block;position: relative;font-size: 0.65rem; color: #666666; overflow: auto; zoom: 1;line-height: 26px;margin-bottom: 0;height: 34px;width: 100%;">
					<span style="display: inline-block;position: absolute;top:0;left: 0;">{{detailsObj.createTime}}</span>&nbsp;<!--{{detailsObj.creator}}-->
					<span style="display: inline-block;max-width: 35%;overflow: hidden;white-space: nowrap;margin-left: 66px; text-overflow:ellipsis; -o-text-overflow:ellipsis; ">来源:{{detailsObj.originName}}</span>
					<img src='./imgs/fromicon.png' style="width: 2.6rem;vertical-align:top;margin-top: 0;" />
					<span style="float: right;margin-right:0px ;line-height: 25px;">阅读量：{{detailsObj.viewCount}}</span>
				</p>
			</div>
			<div @click.prevent="getLink" style="margin-top: 8px;  font-size: 16px; width: 100%; word-wrap:break-word;overflow-x: hidden; line-height: 1.5em" v-html="detailsObj.detailText" class="art_details"> </div>
			<mt-cell :title="remarkCount" class="bornone" style="min-height: auto; color: #999999; margin-bottom: 15px; font-size: 14px; background-color: transparent;" >
					<img slot="icon" src="./imgs/assistor.png" width="10" height="18" style="margin-right: 10px;margin-left: -10px;">
			</mt-cell>	
			
			<div class="page-infinite-wrapper" ref="wrapper"  style="padding-bottom: 30px;height: auto;">
				<div id="mainPart" class="page-infinite-list" v-infinite-scroll="loadMoreRemarks" infinite-scroll-disabled="loading" infinite-scroll-distance="20" infinite-scroll-immediate-check='false' style="margin-bottom: 15px; margin-top: 10px;  background-color: white;padding-bottom: 40px;">
					<div v-if="remark.length==0" style="text-align: center;background: white;padding: 10px;border-top:1px solid #DDDDDD ;margin-top: 8px; ">
						暂无评论
		       		</div>
					<div v-if='remark.length!=0' style="margin-bottom: 5px;">					
						<div v-for="item in remark" style="padding: 5px 5px;  margin-bottom: 5px; border-top:1px solid #DDDDDD;position: relative;">
							<div style="float: left; margin-right: 5px;">
								<img :src="item.photoUrl||''" @error="$event.target.src=defaulthead"  style="height: 40px; width:40px;margin-top: 3px; border-radius: 50%;">
							</div>
							<div  @click='remarkAgree(item)' style="position: absolute;margin-right: 20px; top: 0;right: 0;margin-top: 10px; vertical-align:text-top;z-index: 1;" >
								<img width="20" :src="item.agreeFlag?zanafter:zanbefore" style="vertical-align:top;" />
								<span style="color: #999999;">{{item.agreeCount || 0}}</span>
							</div>	
							<div style="padding: 2px;margin-top: 1px;color: #222;position: relative;">
								<span>{{item.isAnonymous?'匿名用户':item.userRealname||item.userName||''}}</span>
								<span class="jing" v-if="item.bestFlag=='1'">
									<img src="./imgs/goodremark.png" />
								</span>
							</div>
							
							<div style="padding:2px  2px 4px;color: #8c8c8c;">{{item.createTime}}</div>
							<!--<span>
								<img width="25" @click='remarkAgree(item)' style="margin-right: 20px; float: right; "  :src="item.agreeFlag==false?zanbefore:zanafter" />
								<span>{{item.agreeCount}}</span>
							</span>-->
							<div class="clearfix">
								<p style="overflow: hidden; margin: 3px 0; font-size: 14px; word-wrap:break-word;" v-html="item.remarkContent">
								</p>
							</div>
						</div>
					</div>
					<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 140px;margin: 0 auto;text-align: center;padding-top: 5px;padding-left: 12px;">
		        		<mt-spinner type="fading-circle"></mt-spinner>
		        		<span style="position: absolute;display:block;top: 10px;left: 50px;font-size: 14px;color: #999999;width:60%;text-align: left;">加载中...</span>
		      		</p>
		      		<p v-show="allLoaded && remark.length>0" class="page-infinite-loading" style="position: relative;width: 140px;margin: 0 auto;text-align: center;padding-top: 5px;">
		        		<span style="position: absolute;display:block;top: 7px;left: 0px;font-size: 14px;color: #999999;width:100%;">没有更多数据了</span>
		      		</p>
		  		</div>
			</div>	
			<mt-popup v-show="popupVisible" position="bottom" style='width: 100%;padding: 10px;bottom: 45px;z-index: 200;'>
				<textarea style="width: 100%; height: 150px; " placeholder="回复 ：" v-model='remarkContent' id="textfocus"></textarea>
				<div style="margin-top: 8px;">
					<div style="margin-bottom: 8px;">
						<label class="mint-checklist-label" slot="title" style="">
					        <span class="mint-check">
					          <input class="mint-check-input" type="checkbox"  name="check" v-model='isAnonymous'>
					          <span class="mint-check-core"></span>
					        </span>
					        <span class="mint-check-label">匿名评论</span>
						</label>
					</div>
					<mt-button type="default" size="small" style="float: left;" @click.native="popupVisible=false;remarkContent=''">取消</mt-button>
					<mt-button type="primary" size="small" style="float: right;background-color: #FD7B27;" @click.native="send">发送</mt-button>
				</div>
			</mt-popup>
		</div>
		<div style=" height: 45px;width: 100%; background-color: #f2f2f2;position: fixed;bottom: 0px;z-index: 1001;">
			<input type="text" placeholder="添加评论..." style="width: 40%;height: 30px; border: 1px solid #ddd; outline: none; margin-top: 7.5px; border-radius: 15px; padding-left: 20px; background-color: #fff; margin-left: 12px; font-size: 12px;padding-bottom: 3px;" @click="pinglun" readonly="readonly" />
			<img width="24" style="margin-right: 25px; margin-top:10px; float: right;" :src="detailsObj.favoriteFlag==false?sc:scafter" @click='addFavorite' />
			<!--<img width="25" @click='agree' style="margin-right: 20px;margin-top: 10px; float: right; "  :src="detailsObj.agreeFlag==false?zanbefore:zanafter" />-->
		    <span style="position: relative;margin-right: 30px;margin-top: 10px; float: right; display: inline-block;">
			 	<img width="25" @click='agree' :src="detailsObj.agreeFlag==false?zanbefore:zanafter"  /><!--:src="detailsObj.agreeFlag==false?zanbefore:zanafter"-->
			 	<mt-badge v-show="detailsObj.agreeCount!==0" size="small" type="error" style="position: absolute; top:-10px; left: 17px;">{{detailsObj.agreeCount || 0}}</mt-badge>
			</span>
		</div>
	</div>
</template>

<script>
	
	import defaulthead from './imgs/defaulthead.png'
	import zanbefore from './imgs/zanbefore.png'
	import zanafter from './imgs/zanafter.png'
	import sc from './imgs/sc.png'
	import scafter from './imgs/scafter.png'

	export default {
		name: 'details',
		data() {
			return {
				detailId:this.$route.params.detailId,
				
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				
				defaulthead: defaulthead,
				selected: '',
				detailsObj: '',
				remark: [],
				isAnonymous: '',
				remarkContent: '',
				popupVisible: false,
				agreeflag: false,
				zanbefore: zanbefore,
				zanafter: zanafter,
				sc: sc,
				scafter: scafter,
				collType:'0',
				isShow:window.plus,
				remarkCount:"评论 0",
				hhh:{
					'-webkit-overflow-scrolling' :'touch',
					'height':''
				}
			}
		},
		created() {
			if(this.$route.meta.from==="volunteer"){
				this.collType='1';
			}
			/*var str="\u80fd\u628a\u8fd9\u516b\u6761\u505a\u597d\u7684\u771f\u975e\u5e38\u4eba\ud83d\ude04 哈哈"
			var s=eval("'" + str + "'");
			console.log(s)*/
			this.getdetailsObj();
			this.getRemarks(0);
			this.setHeight()
			
		},
		watch: {
			popupVisible() {
				if(this.popupVisible) {
					setTimeout(function() {
						document.getElementById("textfocus").focus()
					}, 0)
				}
			},
			$route(){
				if(this.$route.name=='details'){
					this.detailId = this.$route.params.detailId;
					this.detailsObj=''
					
					this.count=10;
					this.loading=false
					this.allLoaded=false
					this.wrapperHeight=0
					
					this.remark=[]
					this.getdetailsObj();
					this.getRemarks(0);
					this.setHeight();
					this.remarkCount="评论 0"
				}
			}
		},
		beforeRouteLeave (to, from, next) {
	    	if(this.popupVisible){
				this.popupVisible=false;
	    	}
	    	next();
	  	},
	  	mounted() {
    		//this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
//    		for (let i = 1; i <= 20; i++) {
//      		this.list.push(i);
//    		}
			//给安卓和ios分别加不同样式
//			var u = navigator.userAgent;
//			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//			if(isiOS){
//				var mainpart = document.getElementById('mainPart')
//				mainpart.style['padding-bottom'] = '80px';
//			}else{
//				//var allSelect = document.getElementById('#mainPart')
//			}
    	},
		methods: {
			setHeight(){
				var self=this;
				setTimeout(function(){
					self.hhh["height"]=(document.documentElement.clientHeight - 46) + 'px'
				},1000)
			},
			getLink(e){		
				if (e.target.tagName.toUpperCase() === 'A') {
                   if(!window.plus) {
						window.location.href = e.target.href
					} else {
						this.$router.push({
							name: 'blank',
							params: {
								url: e.target.href,
								title:''
							}
						})
					}
               }
				return false
			},
			getdetailsObj() {
			  // console.log(window.localStorage)
//			   for(item in window.localStorage) {
//			      if(window.localStorage.hasOwnProperty(item)) {
//			           size += window.localStorage.getItem(item).length;
//			       }
//			   }
			   //console.log('当前localStorage剩余容量为' + (size / 1024).toFixed(2) + 'KB');
				var self = this;
				let data = {}
				if(localStorage.userId) {
					data = {
						userId: localStorage.userId,
						detailId: self.detailId
					}
				} else {
					data = {
						detailId: self.detailId
					}
				}
				this.ajax({url:'/sysInfoDetail/detailInfo',data:data},function(data){
					if(data.result){
						
						self.detailsObj=data.obj;
						//self.remark=data.obj.remark;
						document.title=data.obj.detailTitle;
					    self.remarkCount="评论 "+data.obj.remarkCount;
					}else{
						self.$toast(data.description)
					}
				})
			},
			getRemarks(sum){//加载资讯评论
				var self=this;
				this.ajax({
					url:'/sysRemark/pages', 
					data:{
						detailId:self.detailId,
						userId:localStorage.userId || '',
						start:sum
					},
					type:"get"
				},function(data){
					if(data.result){
						self.remark = self.remark.concat(data.obj);
						self.count = data.obj.length;
					}else{
						//self.remark=[]
						self.count=0
						//self.$toast(data.description)
					}
				})
			},
			loadMoreRemarks() {//加载更多活动评论
				console.log('我被触发了')
				this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.remark.length!=0){
							this.getRemarks(this.remark.length)
						}
					}
					this.loading = false;
				 },2000)
			},
			share() {
				if(this.$store.state.shares == '') {
					this.$toast("获取分享服务失败")
				} else {
					var obj={
						href:this.mui.shearRoot+this.$route.path,
						title:this.detailsObj.detailTitle,
						content:this.detailsObj.detailShort,
						thumbs:[this.detailsObj.iconUrl],
						pictures:[this.detailsObj.iconUrl],
						contentType:1,
						detailId:this.$route.params.detailId
					}
					this.$store.commit('updateShareDetail', obj)
					this.$store.commit('updatePopupVisible', true)
				}
			},
			agree() {
				let self = this				
				//if(self.isShow){//手机app点赞
					if(localStorage.userId) {
						if(self.detailsObj.agreeFlag == true) {
							self.$toast('你已经点赞了！')
							return;
						}
						this.updateDetailAgreeCount()
					} else {
						this.tologin()
					}
				//}else{//分享到网页app点赞
					//this.updateDetailAgreeCount()
				//}	
			},
			updateDetailAgreeCount(){
				
				let self = this
				this.ajax({
						url: '/sysInfoCalc/saveCalc',
						data: {
							userId: localStorage.userId || '',
							detailId: self.detailId,
							
						},
						type: 'get'
				}, function(data) {
						self.$toast(data.description)
						if(data.result) {
							//						self.agreeflag=false
							self.detailsObj.agreeFlag = true
							self.detailsObj.agreeCount = data.obj
							//						self.detailsObj.agreeCount+=1;
						} else {
							
						}
					})
			},
			remarkAgree(remarkItem) {//评论点赞
				let self = this
				//if(self.isShow){//手机app点赞
					if(localStorage.userId) {
						if(remarkItem.agreeFlag == true) {
							self.$toast('你已经点赞了！')
							return;
						}
						self.updateRemakAgreeCount(remarkItem);
					} else {
						this.tologin()
					}
				//}else{
					//self.updateRemakAgreeCount(remarkItem);
				//}
			},
			updateRemakAgreeCount(remarkItem){
				let self = this
				this.ajax({
						url: '/sysRemark/remarkAgree',
						data: {
							userId: localStorage.userId || '',
							remarkId:remarkItem.remarkId
						},
						type: 'get'
					}, function(data) {
						self.$toast(data.description)
						if(data.result) {
							remarkItem.agreeFlag = true
							remarkItem.agreeCount=remarkItem.agreeCount+1;
						} else {

						}
					})
			},
			pinglun() {
				if(this.isShow){//手机app评论
					if(!localStorage.userId) {
						this.tologin()
					} else {
						this.popupVisible = true
					}
				}else{//分享到网页
					/*this.$messagebox.alert("请下载爱工惠app进行评论").then(action => {
					});*/
					this.popupVisible = true
				}
			},
			
			send() {
				var contentStr=this.filterContent(this.remarkContent);
				
				if(contentStr == '') {
					this.$toast('评论内容不能为空')
					return
				}else if(/[\s\S]{500,}/.test(contentStr)) {
					this.$toast('内容长度不能超过500')
					return
				}
				this.popupVisible = false
				
				let obj = {
					detailId: this.detailsObj.detailId,
					remarkContent: contentStr,
					isAnonymous: this.isAnonymous,
					createId: localStorage.userId || ''
				}
				let self = this;
				this.ajax({
					url: '/sysRemark/add',
					data: obj,
					type: 'post'
				}, function(data) {
					if(data.result) {
						self.getdetailsObj();
						self.remark=[]
						self.getRemarks(0);
					}
					self.remarkContent='';
					self.isAnonymous=false
					self.$toast(data.description)
				})
			},
			addFavorite() {
				if(this.isShow){//手机app收藏
					let self = this;
					if(!localStorage.userId) {
						this.tologin()
						return
					}
					if(self.detailsObj.favoriteFlag == true) {
							self.$toast('你已经收藏了！')
							return;
					}
					let obj = {
						infoClassId: this.detailsObj.sicId,
						infoDetailId: this.detailsObj.detailId,
						infoTitle: this.detailsObj.detailTitle,
						infoPictureUrl: this.detailsObj.iconUrl,
						userId: localStorage.userId,
						collType:this.collType
					}
					this.ajax({
						url: '/sysUserFavorite/add',
						data: obj,
						type: 'post'
					}, function(data) {
						self.$toast(data.description)
						self.detailsObj.favoriteFlag = true
					})
				}else{//分享到网页收藏
					this.$messagebox.alert("请下载爱工惠app进行收藏").then(action => {
					});					
				}
			}
				
		}
	};
</script>
<style type="text/css">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
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
	
	.art_details img {
		width: 100% !important;
	}
	.mint-popup .mint-popup-bottom{
		z-index: 1000;
	}
	.mint-indicator{
		z-index: 3000;
	}
	.mint-toast{
		z-index: 3500;
	}
	.mainPart{
	}
	#details .mint-swipe .mint-swipe-indicators{
		position: absolute;
		text-align: center !important;
		bottom: 2px;
    	z-index: 999;
    	padding-right: 8px;
	}
	#details .mint-swipe-indicator {
	    width: 6px;
	    height: 6px;
	    display: inline-block;
	    border-radius: 100%;
	    background: white;
	    opacity: 0.6;
	    margin: 0 3px;
	   }
	   #details .mint-swipe .mint-swipe-indicators .is-active{
	   		opacity: 1;
	   		background: #f95857;
	   }
	   #details .jing{
	   		position: absolute;
			width: 55px;
			height: 20px;
			margin-left: 10px;
	   }
	   #details .jing img{
	   		width: 100%;
	   		height: 100%;
	   }
</style>
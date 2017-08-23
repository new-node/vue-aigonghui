<template>
	<div id="b" style="margin-top: 60px  10px;position: relative;">
		<img v-show="selected=='yx' && $route.name!='activity_history' && offLine == false" @click='goToHistory' style="display: block;position: fixed;right: 0;top: 46px; width: 80px; z-index: 3000;" src="./imgs/lookback.png"/>
		<div v-if="$route.name=='activity'" style=" width: 60%;text-align: center; position: fixed;top:13px;z-index: 22;left: 20%;right: 20%; color: #f7f7f7;">
			<a class="button-tab-left" id='yx' :style="selected=='yx'?style:''" @click="current('yx')">兑换券</a>
			<a class="button-tab-right" style="" id='hd' :style="selected=='hd'?style:''" @click="current('hd')">活&nbsp;&nbsp;&nbsp;动</a>
		</div>
		<!--<div v-if="selected=='wq'"  style="width: 60%;text-align: center; position: fixed;top:5px;z-index: 22;left: 20%;right: 20%; color: #f7f7f7;height: 16px;line-height: 16px;">
			<h1 style="font-size: 16px; font-weight:normal;">往期活动</h1>
		</div>-->
		<!--底部自动加载列表1-->
		<div v-show="$route.name=='activity' && selected=='yx'" class="page-infinite-wrapper" ref="wrapper1" :style="{ height: wrapperHeight1 + 'px' }" style="">
			<div class="page-infinite-list" v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading1" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="">
				<div v-if="activityList.length==0&&selected=='yx' && offLine == false" style="text-align: center;background: white;padding: 10px;">
					暂无数据
				</div>
				<div class="" style="height: 0.1px;">
					
				</div>
				<div  class="mui-card" v-for="obj in activityList" v-show="$route.name=='activity' && selected=='yx'" style="margin: 20px 15px 15px;" @click="goto({name:'activityDetails',params:{title:obj.detailTitle,id:obj.activitiesDetailId,isHistory:false}})">
					<div class="mui-card-header mui-card-media" >
						<img :src="obj.poster||''" @error="$event.target.src=errorBanner" width="100%" />
					</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
		
							<div style="float: left; width: 68%;">
								<p style="margin:5px 5px 1px; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
									{{obj.detailTitle}}
								</p>
								<p style="color: #8c8c8c;margin:0px 0 0px 5px; font-size: 0.7rem; ">
									领取截止时间：{{obj.endTime| formatDate}}
								</p>
								<p style="font-size: 12px; color: #8c8c8c;"><span style="color: #FD7B27;">{{obj.used}}</span><span>{{obj.modelCode=='LuckDraw'?'人已报名':'张已领取'}}</span></p>
							</div>
							<mt-button size="small" style="float: right; background: rgb(253, 123, 39);color: white; margin-top: 16px; box-shadow: none; margin-right: 5px;" >查看详情</mt-button>
						</div>
					</div>
				</div>
				<p v-show="loading1==true && allLoaded1==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 52px;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded1" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 75px;padding-top: 5px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
		<!--底部自动加载列表2-->
		<div v-show="$route.name=='activity_history'" class="page-infinite-wrapper" ref="wrapper2" :style="{ height: wrapperHeight2 + 'px' }" style="padding-bottom: 100px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore2" infinite-scroll-disabled="loading2" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="">
				<div v-if="historyList.length==0 && offLine == false" style="text-align: center;background: white;padding: 10px;">
					暂无数据
				</div>
				<div class="" style="height: 0.1px;">
					
				</div>
				<div  class="mui-card" v-for="item in historyList" v-show="$route.name=='activity_history'" style="margin: 20px 15px 0px;" @click="goto({name:'activityDetails',params:{title:item.detailTitle,id:item.activitiesDetailId,isHistory:true}})">
					<div class="mui-card-header mui-card-media">
						<img :src="item.poster||''" width="100%"  @error="$event.target.src=errorBanner" />
					</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
		
							<div style="float: left; width: 68%;">
								<p style="margin:5px 5px 1px; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
									{{item.detailTitle}}
								</p>
								<p style="color: #8c8c8c;margin:0px 0 0px 5px; font-size: 12px; ">
									领取截止时间：{{item.endTime| formatDate}}
								</p>
								<p style="font-size: 12px; color: #8c8c8c;"><span style="color: #FD7B27;">{{item.used}}</span>张已领取</p>
							</div>
							<mt-button size="small" style="float: right; background: rgb(253, 123, 39);color: white; margin-top: 16px; box-shadow: none; margin-right: 5px;" >查看详情</mt-button>
						</div>
					</div>
				</div>
				<p v-show="loading2==true && allLoaded2==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 22px;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded2" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 35px;padding-top: 5px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
		<!--底部自动加载列表3-->
		<div v-show="$route.name=='activity' && selected=='hd'" class="page-infinite-wrapper" ref="wrapper3" :style="{ height: wrapperHeight3 + 'px' }" style="">
			<div class="page-infinite-list" v-infinite-scroll="loadMore3" infinite-scroll-disabled="loading3" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="">
				<div v-if="huodongList.length==0 && selected=='hd' && offLine == false" style="text-align: center;background: white;padding: 10px;">
					暂无数据
				</div>
				<div class="" style="height: 0.1px;">
					
				</div>
				<div  class="mui-card" v-for="item in huodongList" v-show="$route.name=='activity' && selected=='hd'" style="margin: 20px 15px 0px;" @click="linkOut(item)">
					<div class="mui-card-header mui-card-media">
						<img :src="item.poster||''" width="100%"  @error="$event.target.src=errorBanner" />
					</div>
				</div>
				<p v-show="loading3==true && allLoaded3==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 52px;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded3" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 75px;padding-top: 5px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
		<div id="miss" v-if="offLine == true || offLine == 'true'">
			<div class="missPage">
				<img src="./imgs/missPage.png" />
			</div>
			<div class="missText">
				<h3>呀，页面出错啦！</h3>
			</div>
			<div class="missText retry" @click="back()">
				<h3>请检查网络</h3>
			</div>
		</div>
	</div>
</template>

<script>
	import errorBanner from './imgs/errorBanner.png'
	export default {
		name: 'demo2',
		data() {
			return {
				offLine:false,
				
				selected: 'yx',
				activityList: [],//当前优惠券集合
				huodongList:[],//活动集合
				errorBanner: errorBanner,
				style: {
					color: '#fd7b27',
					background: '#FFFFFF'
				},
				historyList:[],//往期优惠券
				isShow:window.plus,
				//底部自动加载更多
				count1:10,//最新一页评论数
				count2:10,
				count3:10,
			    loading1:false,//评论是否加载更多
			    loading2:false,
			    loading3:false,
	    		allLoaded1: false,
	    		allLoaded2: false,
	    		allLoaded3: false,
	   			wrapperHeight1: 0,
	   			wrapperHeight2: 0,
	   			wrapperHeight3: 0,
			};
		},
		watch: {
			$route(val,oldVal){
				if(oldVal.name=="activityDetails"){
					return
				}
				if(this.$route.name=='activity'){
					if(sessionStorage.hd && sessionStorage.hd=="true"){
						this.selected="hd";
						//获取活动信息huodongList
						this.gethuodongList(0);
						
						this.count3=10;
						this.loading3=false
						this.allLoaded3=false
						this.wrapperHeight3=0
					}else{
					    this.getactivityList(0);
					    
					    this.count1=10;
						this.loading1=false
						this.allLoaded1=false
						this.wrapperHeight1=0
					}
				}
				else if(this.$route.name=='activity_history'){
					this.activityList=[]
					this.huodongList=[]
					this.historyList=[]
					this.getHistory(0);
					
					this.count2=10;
					this.loading2=false
					this.allLoaded2=false
					this.wrapperHeight2=0
				}
			}
		},
		created() {
			if(this.$route.name=='activity'){
				if(sessionStorage.hd && sessionStorage.hd=="true"){
					this.selected="hd";
					//获取活动信息huodongList
					this.gethuodongList(0);
				}else{
				    this.getactivityList(0);
				}
			}
			else if(this.$route.name=='activity_history'){
				this.activityList=[]
				this.huodongList=[]
				this.getHistory(0);
			}	
		},
		mounted() {
	    	this.wrapperHeight1 = document.documentElement.clientHeight - this.$refs.wrapper1.getBoundingClientRect().top;
	    	this.wrapperHeight2 = document.documentElement.clientHeight - this.$refs.wrapper2.getBoundingClientRect().top;
	    	this.wrapperHeight3 = document.documentElement.clientHeight - this.$refs.wrapper3.getBoundingClientRect().top;
	    },
		methods: {
			goto(page) {
				this.$router.push(page)
			},
			getactivityList(sum){//获取优惠券活动数据
				var self=this;
				this.ajax({
					url:'/activities/getEffective', 
					data:{start:sum}
				},function(data){
					if(data.result){
						//self.activityList=data.obj.list
						self.activityList=self.activityList.concat(data.obj.list)
					}
					self.count1=data.obj&&data.obj.list.length||0
				})
			},
		 	getHistory(sum){//获取往期优惠券
		 		var self=this;
				this.ajax({
					url:'/activities/getHistory',
					data:{start:sum}
				},function(data){
					if(data.result){
						//self.historyList=data.obj.list
						self.historyList=self.historyList.concat(data.obj.list)
					}
					self.count2=data.obj&&data.obj.list.length||0
				})
		 	},
		 	gethuodongList(sum){//获取活动接口
		 		var self=this;
				this.ajax({
					url:'/activities/getActivityLink',
					data:{start:sum}
				},function(data){
					if(data.result){
						self.huodongList=self.huodongList.concat(data.obj.list)
					}
					self.count3=data.obj && data.obj.list.length||0
				})
		 	},
			current(value){
				window.scrollTo(0,0)
				this.selected=value
				
				if(value=='yx' && this.activityList.length==0){
					this.getactivityList(0);
				}else if(this.huodongList.length==0&&value=='hd'){
					//获取活动信息
					this.gethuodongList(0)
					sessionStorage.hd=true
				}else{
					this.getHistory(0)
				}
			},
			loadMore1(){
				this.loading1 = true;
				setTimeout(()=>{
					if(this.count1<10){
						this.allLoaded1=true;
					}else{
						if(this.activityList.length!=0){
							this.getactivityList(this.activityList.length)
						}
					}
					this.loading1 = false;
				},2000)
			},
			loadMore2(){
				this.loading2 = true;
				setTimeout(()=>{
					if(this.count2<10){
						this.allLoaded2=true;
					}else{
						if(this.historyList.length!=0){
							this.getHistory(this.historyList.length)
						}
					}
					this.loading2 = false;
				},2000)
			},
			loadMore3(){
				this.loading3 = true;
				setTimeout(()=>{
					if(this.count3<10){
						this.allLoaded3=true;
					}else{
						if(this.huodongList.length!=0){
							this.gethuodongList(this.huodongList.length)
						}
					}
					this.loading3 = false;
				},2000)
			},
			goToHistory(){//跳转到往期优惠券
				this.$router.push({
							name: 'activity_history',
							params: {
								title: '往期优惠券'
							}
						})
			},
			linkOut(obj){//外链
				if(!window.plus) {
					window.location.href = obj.url
				} else {
					//分享内容
					var shareObj={
						href:obj.bqUrl,
						title:obj.detailTitle,
						content:obj.template,
						thumbs:[obj.bqPhotoUrl],
						pictures:[obj.bqPhotoUrl],
						contentType:10,
						detailId:obj.bannerId
 
					}						
					sessionStorage.shareInfo=JSON.stringify(shareObj)
					this.$router.push({
						name: 'activityLink',
						params: {
							url: obj.url,
							title:obj.detailTitle,
							share:true
						}
					})
				}
			}
		},
		beforeRouteLeave (to, from, next) {
			if(to.name!='blank' && to.name!='activityDetails')
			sessionStorage.removeItem("hd"); 
			next();
		}
	};
</script>
<style type="text/css">
	.button-tab-left {
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #f7f7f7;
		padding: 4px 5px 3px 5px;
		margin: -3px;
		font-size: 12px;
	}
	
	.button-tab-right {
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		border: 1px solid #f7f7f7;
		padding: 4px 5px 3px 5px;
		margin: -3px;
		font-size: 12px;
	}
	
	.mui-card {
		font-size: 14px;
		position: relative;
		overflow: hidden;
		margin: 15px 0;
		border-radius: 2px;
		background-color: #fff;
		background-clip: padding-box;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .3)
	}
	
	.mui-card-media {
		vertical-align: bottom;
		color: #fff;
		background-position: center;
		background-size: cover
	}
	
	.mui-card-header.mui-card-media {
		display: block;
		padding: 0px
	}
	
	.mui-card-content {
		font-size: 14px;
		position: relative
	}
	
	.mui-card-content-inner {
		position: relative;
		padding: 0px 5px
	}
	
	.mui-card-content-inner div p {
		margin: 5px;
	}
	#miss{
		position: absolute;
		left: 0;
		width: 100%;
		top: 10px;
		margin: 0 auto;
	}
	.missPage{
		width: 210px;
		height: 210px;
		margin: 0 auto;
		margin-top: 100px;
	}
	.missPage img{
		width: 100%;
		height: 100%;
	}
	.missText{
		text-align: center;
	}
	.missText h3{
		color: #999;
		font-weight: normal;
		
	}
	.retry{
		width: 150px;
		margin:0 auto;
		border: 1px solid #FD7B27;
		border-radius: 5px;
		margin-top: 10px;
	}
	.retry h3{
		margin: 5px;
		padding: 0;
		color: #FD6F27;
	}
</style>
<template>
	<div class="mine_activity">
		<div>
			<mt-navbar v-model="selected" style="height: 40px; color: #666;">
				<mt-tab-item id="wy">未使用</mt-tab-item>
				<mt-tab-item id="yy">已使用</mt-tab-item>
			</mt-navbar>
		</div>
		<!--<div  style="overflow-y: hidden;margin-top: 5px;"  >-->
			<div v-show="selected=='wy'" class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 20px;">
				<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 30px;">
					<div v-if="wList.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
						暂无数据
					</div>
					<div v-for="(obj, index) in wList ">
						<div class="mui-card" style="margin-bottom: 0;">
							<div class="mui-card-content">
								<div class="clearfix" style="margin: 15px 0px;">
									<span style="float:left;margin-left: 10px;">使用有效期：{{obj.unionActivitiesDetail.activityEndTime| formatDate}}</span>
									<span style="float:right; color: green;margin-right: 10px;">未使用</span>
								</div>
							</div>
						</div>
						<div class="mui-card" style="margin-top: 0;">
							<div class="clearfix" style="width: 100%; padding-right: 15px; background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-repeat: no-repeat;background-origin: content-box;position: relative;">
	    						<div style="width: 37%;overflow: hidden;">
								<img :src="obj.unionActivitiesDetail.poster||''" @error="$event.target.src=errornews" style="float: left;height: 70px;margin: 10px 0 0 10px; ">
								</div>
								<div style="position: absolute;right: 10px ;top:10px; width: 57%;z-index:2;">
									<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;line-height: 35px; margin: 3px 0; font-size: 15px;height: 35px;">
										{{obj.unionActivitiesDetail.detailTitle}}
									</p>
									<p style="font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px; color: #8c8c8c;margin: 0;">
										领取时间：{{obj.receiveTime| formatDate}}
									</p>
								</div>
							</div>
							<div class="mui-card-content">
								<div class="clearfix" style="margin-right: 10px; background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-repeat: no-repeat;background-origin: content-box; margin-top: 10px;">
									<mt-button style="float:right;margin: 10px 0;background: #fd7b27; " @click.native="goto(obj)" type="primary" size="small">查看二维码</mt-button>
								</div>
							</div>
						</div>
					</div>
					<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
		        		<mt-spinner type="fading-circle"></mt-spinner>
		        		<span style="position: absolute;top: 5px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
		      		</p>
		      		<p v-show="allLoaded && selected=='wy'" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
		        		<span style="position: absolute;top: 5px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
		      		</p>
				</div>
			</div>
			
			<div v-show="selected=='yy'" class="page-infinite-wrapper" ref="wrapper1" :style="{ height: wrapperHeight1 + 'px' }" style="padding-bottom: 20px;">
				<div class="page-infinite-list" v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading1" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 30px;">
					<div v-if="yList.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
						暂无数据
					</div>
					<div v-for="(obj, index) in yList ">
						<div class="mui-card" style="margin-bottom: 0;">
							<div class="mui-card-content">
								<div class="clearfix" style="margin: 15px 0px;">
									<span style="float:left;margin-left: 10px;">使用有效期：{{obj.unionActivitiesDetail.activityEndTime| formatDate}}</span>
									<span style="float:right; color: green;margin-right: 10px;">已使用</span>
								</div>
							</div>
						</div>
						<div class="mui-card" style="margin-top: 0;">
							<div class="clearfix" style="width: 100%; padding-right: 15px; background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-repeat: no-repeat;background-origin: content-box;position: relative;">
	    						<div style="width: 37%;overflow: hidden;">
								<img :src="obj.unionActivitiesDetail.poster||''" @error="$event.target.src=errornews" style="float: left;height: 70px;margin: 10px 0 0 10px; ">
								</div>
								<div style="position: absolute;right: 10px ;top:10px; width: 57%;z-index: 2;">
									<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;line-height: 35px; margin: 3px 0; font-size: 15px;height: 35px;">
										{{obj.unionActivitiesDetail.detailTitle}}
									</p>
									<p style="font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px; margin: 0; color: #8c8c8c;">
										领取时间：{{obj.receiveTime| formatDate}}
									</p>
								</div>
								<!--<img :src="obj.unionActivitiesDetail.poster||''" style="float: left; width: 37%;margin: 10px 0 0 10px;" class="image">
	
								<div style="float: right; width: 57%; margin-top: 10px;">
									<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;line-height: 35px; margin: 3px 0; font-size: 15px;height: 35px;">
										{{obj.unionActivitiesDetail.detailTitle}}
									</p>
									<p style="font-size:12px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px; margin-bottom: 5px; color: #8c8c8c;">
										领取时间：{{obj.receiveTime}}
									</p>
								</div>-->
							</div>
							<div class="mui-card-content">
								<div class="clearfix" style="margin-right: 10px; background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-repeat: no-repeat;background-origin: content-box; margin-top: 10px;">
									<!--<mt-button style="float:right;margin: 10px 0;background: #fd7b27; " @click.native="goto({name:'mine_authcode'})" type="primary" size="small">查看验证码</mt-button>-->
								</div>
							</div>
						</div>
					</div>
					<p v-show="loading1==true && allLoaded1==false && yList.length!=0" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
		        		<mt-spinner type="fading-circle"></mt-spinner>
		        		<span style="position: absolute;top: 5px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
		      		</p>
		      		<p v-show="allLoaded1 && yList.length!=0" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
		        		<span style="position: absolute;top: 5px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
		      		</p>
				</div>
			</div>
		
	</div>
</template>

<script>
	import errornews from './imgs/errornews.png'
	export default {
		data() {
				return {
					selected: 'wy',
					wList:[],
					yList:[],
					//底部自动加载更多
					count:10,//最新一页评论数
				    loading:false,//评论是否加载更多
	        		allLoaded: false,
	       			wrapperHeight: 0,
				   //底部自动加载更多
					count1:10,//最新一页评论数
				    loading1:false,//评论是否加载更多
	        		allLoaded1: false,
	       			wrapperHeight1: 0,
				    errornews:errornews,
				}
			},
			created(){				
				this.getUnuse(0)
			},
			mounted() {
		    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		    	this.wrapperHeight1 = document.documentElement.clientHeight - this.$refs.wrapper1.getBoundingClientRect().top;
		    },
			watch:{				
				selected(){
					if(this.selected=='yy'&&this.yList.length==0){
						this.getUsedList(0)
					}
					if(this.selected=='wy'&&this.wList.length==0){
						this.getUnuse(0)
					}
				}
			},
			methods: {
				getUnuse(num){//获取未使用的券码集合
					const self=this;
					this.ajax({
						url:'/activityUser/available', 
						data:{userId:localStorage.userId,start:num},
						type:'get'
					},function(data){
						 if(data.result){
						 	//self.wList=data.obj
						 	self.wList = self.wList.concat(data.obj)
						 	self.count=data.obj.length;
						 }else{
						 	self.count=0
						 	//self.$toast(data.description)
						 }
					})
				},
				getUsedList(num){//获取已使用券码集合
					const self=this;
					 this.ajax({
						url:'/activityUser/used', 
						data:{userId:localStorage.userId,start:num},
						type:'get'
					},function(data){
						 if(data.result){
						 	//self.yList=data.obj
						 	self.yList = self.yList.concat(data.obj)
						 	self.count1=data.obj.length;
						 }else{
						 	self.count1=0
						 	//self.$toast(data.description)
						 }
					})
				},
				loadMore() {//加载更多未使用
					this.loading = true;
					setTimeout(()=>{
						if(this.count<10){
							this.allLoaded=true;
						}else{
							if(this.wList.length!=0){
								this.getUnuse(this.wList.length)
							}
						}
						this.loading = false;
					 },2000)
				},
				loadMore1() {//加载更多已使用的
					this.loading1 = true;
					setTimeout(()=>{
						if(this.count1<10){
							this.allLoaded1=true;
						}else{
							if(this.yList.length!=0){
								this.getUsedList(this.yList.length)
							}
						}
						this.loading1 = false;
					 },2000)
				},
				goto(obj) {
					sessionStorage.qrcode=obj.qrcode;
					sessionStorage.couponCode=obj.couponCode;
					sessionStorage.detailTitle=obj.unionActivitiesDetail.detailTitle
					this.$router.push({name:'mine_authcode',params:{detailTitle:obj.unionActivitiesDetail.detailTitle}});
				},
			},
	}
</script>

<style scoped >
	.mine_activity{
		/*background:red;*/
	}
	
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #FD7B27;
    color: #FD7B27;
    margin-bottom: -3px;
	}
	.mui-card{
		box-shadow: 0 0px 0px rgba(0, 0, 0, .0);
		
	}
</style>
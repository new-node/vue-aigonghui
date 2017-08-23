<style type="text/css" >
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
 
	.items{
		background-color: #fff; 
		padding:2px 10px 0px; 
		background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-origin: content-box;
	    background-repeat: no-repeat;
	    background-position: bottom left; 
	}
	.btn-fiexed{
	right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    padding: 10px;
    font-size: 14px;
	text-align: center;
	background: transparent;
}
ul.wish-tab{margin: 0; padding: 0; overflow: auto; list-style: none;}
ul.wish-tab li{width: 33.3333%; float: left; position: relative;}
.wish-type-content{position: absolute; color: #ffffff; top: 0px; left: 0px;  bottom:0px; right:0px; margin:auto;width: 100%; height: 35px; text-align: center;}
.wish-iten-btn{font-size: 14px; border: 1px solid #c8c8c8; padding: 2px 5px; border-radius: 2px; margin-right: 10px;}
.wish .mint-cell-value{	font-size: 14px !important;	}
.type-select .wish-type-select{width: 5px; height: 5px; background: #FFFFFF; -moz-border-radius: 50px; -webkit-border-radius: 50px; border-radius: 50px;margin: 3px auto 0;}
.wish-complete{color:#c8c8c8;}
</style>
<template>
	<div id="volunteer_wish ">
		<div v-show="$route.params.wish_type==='list'" style="padding: 15px 5px;">
			<ul class="wish-tab">
				<li :class="currentSelect==='wish_begin'?'type-select':''" @click="currentSelect='wish_begin'">
					<div style="margin: 0 5px;  overflow: hidden;" >
						<img src="./imgs/wish_begin.png" style="width: 100%; display: block;" />						
					</div>
					<div class="wish-type-content">
						<p style="margin: 0;">未领取</p><p style="margin: 0;">{{countObj.unused || 0}}</p>
					    <div><div class="wish-type-select"></div></div>						
					</div>
				</li>
				<li :class="currentSelect==='wish_ing'?'type-select':''" @click="currentSelect='wish_ing'">
					<div style="margin: 0 5px;  overflow: hidden;" >
						<img src="./imgs/wish_ing.png" style="width: 100%; display: block;" />	
					</div>
					<div class="wish-type-content">
						<p style="margin: 0;">进行中</p><p style="margin: 0;">{{countObj.doing || 0}}</p>
						<div><div class="wish-type-select"></div></div>	
					</div>
				</li>
				<li :class="currentSelect==='wish_end'?'type-select':''" @click="currentSelect='wish_end'">
					<div style="margin: 0 5px;  overflow: hidden;" >
						<img src="./imgs/wish_end.png" style="width: 100%; display: block;" />						
					</div>
					<div class="wish-type-content">
						<p style="margin: 0;">已完成</p><p style="margin: 0;">{{countObj.finish || 0}}</p>		
						<div><div class="wish-type-select"></div></div>	
					</div>
				</li>
			</ul>
		</div>
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" >
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 90px;background: white;">
				<on-touch @longTap='deletecollectitem(obj)'	v-for="(obj,index) in list">
					<div  class="items"  @click="toDetail(obj,index)">
						<div v-show="$route.params.wish_type!=='mine_publish_wish'" style="text-align: left; overflow: auto; margin-top: 10px;">
							<div style="float: left; margin-right: 5px;">
								<img :src="obj.photoUrl" @error="$event.target.src=defaulthead"  style="height: 40px; width:40px;margin-right: 7px; border-radius: 50%;">
							</div>
							<div style="float:left;font-size:13px"> 
								<h4 style=" color: #222; margin: 0;padding: 0;font-weight: normal; margin-bottom: 8px;">{{obj.userName}}</h4>
								<span style="color: #8c8c8c;">{{obj.createTime | formatDate}}</span>
							</div>
							<div style="float: right; color: #FD9252;">+{{obj.loves}}爱心值</div>
						</div>
						<div style="clear: both;"></div>
						<div  style="margin-top: 10px;text-align: left;padding-bottom: 12px;">
							<p style="font-size: 17px; margin: 5px 0 0; color: #222; ">{{obj.title}}</p>
							<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;line-height: 20px; margin: 3px 0; font-size: 15px; word-wrap:break-word; color: #444; " v-html="obj.content"></p>
						</div>
					</div>
					<mt-cell v-show="$route.params.wish_type==='mine_publish_wish'" class="wish bornone" style="min-height: 38px; margin-bottom: 15px;" :value="obj.createTime | formatDate">
						<div slot='title'>
							<span v-show="obj.audit=='2'" class="wish-iten-btn">审核中</span>
							<span v-show="obj.audit=='0'" class="wish-iten-btn">审核未通过</span>
							<span v-show="obj.audit=='1' && obj.status==='0'" class="wish-iten-btn" @click="deleteWish(obj,index)">删除</span>
							<span v-show="obj.audit=='1' && obj.status=='1'" class="wish-iten-btn" @click="confirmComplete(obj,index)">确认完成心愿</span>
							<span v-show="obj.audit=='1' && obj.status=='2'" class="wish-iten-btn">已完成</span>
							<span v-show="obj.audit=='1' && obj.status=='2' && obj.thanks==''" class="wish-iten-btn" @click="toThanks(obj,index)">感谢一下</span>
						</div>
					</mt-cell>
					<mt-cell v-show="$route.params.wish_type==='mine_receive_wish'" class="wish bornone" style="min-height: 38px; margin-bottom: 15px;">
						<div slot='title'>
							<div style="color: #FD9252; font-size: 12px; display: table-cell; vertical-align: middle; height: 24px;">
								<img :src="obj.status=='2'?wishend:washing" style="width: 15px; margin-right: 10px;" />
								<span :class="{'wish-complete':obj.status=='2'}">{{obj.status=='2'?'已完成':'正在进行中'}}</span>
							</div>
						</div>
					</mt-cell>
				</on-touch>	
				<div v-if="list.length==0" style="text-align: center;background: white;padding: 10px 0;">
					暂无数据
				</div>
				<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
		<div v-show="$route.name=='wish'"  class="btn-fiexed">
			<!--<mt-button size="large" @click.native="jumpto({name:'wish_add'})" style=" background: #fd7b27;" type="primary">我有心愿</mt-button>-->
			<img src="./imgs/wish.png" @click="jumpto({name:'wish_add'})" style="width: 60px;" />
		</div>
	</div>
</template>

<script>

import zanbefore from './imgs/zanbefore.png'

import defaulthead from './imgs/defaulthead.png'
import wishing from './imgs/wishing.png'
import wishend from './imgs/wishend.png'
	export default {
		name: 'forum',
		data() {
			return {
				currentSelect:"wish_begin",
				countObj:'',//心愿数量
				wishType:'',//心愿的类型 0：未领取，1：进行中，2：已完成
				list: [],
				listBegin:[],//未领取的
				listIng:[],//进行中的
				listEnd:[],//已完成的
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				defaulthead:defaulthead,
				zanbefore: zanbefore,
				url:'',		
				currentUserId:localStorage.userId || '',//当前登录用户id
				wishing:wishing,//正在进行中
				wishend:wishend//完成
			}

		},
		created() {		
            this.pageInit()
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
		watch:{
			'$route'(val, oldVal){
				//console.log(sessionStorage.detailOpt)
				if(oldVal.params.wish_type && val.params.wish_type){
					
					this.loading=false
					this.count=10
					//底部自动加载更多
        			this.allLoaded=false
       				this.wrapperHeight=0
					
					this.wishType=''
					this.list=[]
					this.pageInit()
				}else if((oldVal.name=='wish_detail' || oldVal.name=='mine_wish_detail') && sessionStorage.detailOpt && sessionStorage.detailIndex){
					var detailIndex=sessionStorage.detailIndex
					var detailOpt=sessionStorage.detailOpt;
					this.updateList(detailIndex,detailOpt)
					sessionStorage.removeItem("detailOpt")
					sessionStorage.removeItem("detailIndex")
				}
				
			},
			currentSelect(val, oldVal){
				console.log(val+'...'+oldVal)
				this.selectChange()
			},
		},
		beforeRouteLeave (to, from, next) {
		    if(to.name!=='wish_detail'){
		    	sessionStorage.removeItem("currentSelect")
		    }
   			next()
		},
		methods: {
			jumpto(web) {
				this.$router.push(web)
			},
			pageInit(){//页面初始化
				console.log(this.$route.meta.wish_type)
				if(this.$route.params.wish_type==='list'){//全部心愿列表
					this.url="/voluNeeds/pages"
					this.getWishCount()//加载心愿数量
					this.currentSelect="wish_begin"
					if(sessionStorage.currentSelect){
						this.currentSelect=sessionStorage.currentSelect
					}
					this.selectChange()
				}else{
					if(this.$route.params.wish_type==='mine_publish_wish'){//我发布的
						this.url="/voluNeeds/pages"
					}else if(this.$route.params.wish_type==='mine_receive_wish'){//我领取的
						this.url="/voluNeeds/pages"
					}else if(this.$route.meta.wish_type==='mine_collection_wish'){//我收藏的
						this.url="/voluNeeds/favoriteList"
					}
					this.getList(0)
				}
			},
			getWishCount(){//获取心愿数量
				var self=this;
				this.ajax({
					url: '/voluNeeds/count',
					type: 'get'
				}, (data) => {
					if(data.result) {
						self.countObj=data.obj
					} 
				})
			},
			getList(sum) {
				var self = this
				var userId=this.$route.params.wish_type=='mine_publish_wish' || this.$route.meta.wish_type=='mine_collection_wish'?(localStorage.userId || ''):'';//发布用户id
				var receiveUser=this.$route.params.wish_type=='mine_receive_wish'?(localStorage.userId || ''):'';//领取用户id
				console.log(userId)
				this.ajax({
					url: self.url,
					data: {
						start: sum,
						userId: userId,
						receiveUser:receiveUser,
						status:self.wishType
					},
					type:"get"
				}, function(data) {
					if(data.result) {
						if(self.$route.params.wish_type==='list'){
							if(self.currentSelect==='wish_begin'){//未领取
								self.listBegin=self.listBegin.concat(data.obj)
								self.list=self.listBegin;
							}else if(self.currentSelect==='wish_ing'){//进行中
								self.listIng=self.listIng.concat(data.obj)
								self.list=self.listIng;
							}else if(self.currentSelect==='wish_end'){//已完成
								self.listEnd=self.listEnd.concat(data.obj)
								self.list=self.listEnd;
							}
						}else{
						    self.list = self.list.concat(data.obj)
						}
					}
					self.count = data.obj && data.obj.length || 0;
				})

			},
			selectChange(){//未领取、进行中、已完成切换
				var self=this;
				if(self.currentSelect==='wish_begin'){//未领取									
					self.wishType="0";
					self.getList(0)
//					if(self.listBegin.length==0){
//						self.getList(0)
//					}
					self.list=self.listBegin;	
				}else if(self.currentSelect==='wish_ing'){//进行中					
					self.wishType="1";
					self.getList(0)
//					if(self.listIng.length==0){
//						self.getList(0)
//					}
					self.list=self.listIng;
				}else if(self.currentSelect==='wish_end'){//已完成					
					self.wishType="2";
					self.getList(0)
//					if(self.listEnd.length==0){
//						self.getList(0)
//					}
					self.list=self.listEnd;
				}
				sessionStorage.currentSelect=self.currentSelect
				self.count=self.list.length%10;
				self.loading=self.count<10 && self.list.length>0?true:false;
			},
		    loadMore() {
				this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.list.length!=0){
							console.log("list总长度"+this.list.length)
							this.getList(this.list.length)
						}
					}
					this.loading = false;
				 },2000)
			}, 
			toDetail(obj,index){//跳转详情
				var detailName=""
				if(this.$route.params.wish_type==='list' || this.$route.meta.wish_type==='mine_collection_wish'){//我发布的
					detailName="wish_detail"
				}
				else if(this.$route.params.wish_type==='mine_publish_wish'){//我发布的
					detailName="mine_wish_detail"
				}else if(this.$route.params.wish_type==='mine_receive_wish'){//我领取的
					detailName="mine_wish_detail"
				}else if(this.$route.meta.wish_type==='mine_collection_wish'){//我收藏的
					this.url="/voluNeeds/favoriteList"
				}
				sessionStorage.detailIndex=index
				this.jumpto({name:detailName,params:{title:obj.title,id:obj.needsId}})
			},
			deleteWish(obj,index){//删除心愿
				let self = this;
				this.$messagebox.confirm('你确定要删除?', '确认', ).then(action => {
					this.ajax({
						url: '/voluNeeds/delete',
						data: {
							needsId: obj.needsId
						},
						type: 'post'
					}, (data) => {
						self.$toast({
							message: data.description,
							position: 'bottom',
						})
						if(data.result) {
							/*this.list.$remove(obj)*/
							this.updateList(index,"delete")
						} 
					})
				});
			},
			confirmComplete(obj,index){//确认完成
				let self = this;
				this.$messagebox.confirm('你确定心愿已完成?', '确认', ).then(action => {
					this.ajax({
						url: '/voluNeeds/updateFinish',
						data: {
							needsId: obj.needsId,
							title:obj.title,
						},
						type: 'post'
					}, (data) => {
						if(data.result) {
							self.$messagebox.confirm('恭喜你心愿已达成，是否去感谢一下？', '提示', ).then(action => {
								self.$router.push({name:'wish_complete',params:{id:obj.needsId}})
							},function(){		
						    	this.updateList(index,"complete")
							})
						} 
					})
				});
			},
			toThanks(obj){
				this.$router.push({name:'wish_complete',params:{id:obj.needsId}})
			},
		    deletecollectitem(obj) {//删除收藏			
				if(this.$route.name==='wish1'){//我收藏的职工需求
					let self = this;
					this.$messagebox.confirm('你确定要取消这个收藏?', '提示', ).then(action => {
						this.ajax({
							url: '/voluNeedsFavorite/delete',
							data: {
								favoriteId: obj.favoriteId
							},
							type: 'post'
						}, (data) => {
							self.$toast({
								message: data.description,
								position: 'bottom',
							})
							if(data.result) {
								this.list.$remove(obj)
							} 
						})
					});
				}
			},
		    updateList(index,optType){//删除、领取、确认完成、感谢一下后更新列表
		    	var self=this;
		    	if(optType=="delete"){//删除
		    	    this.list.splice(index,1)
			    	if(self.$route.params.wish_type==='list'){
						if(self.currentSelect==='wish_begin'){//未领取
							self.listBegin.splice(index,1)
							self.countObj.unused=self.countObj.unused-1
						}else if(self.currentSelect==='wish_ing'){//进行中
							self.listIng.splice(index,1)
						}else if(self.currentSelect==='wish_end'){//已完成
							self.listEnd.splice(index,1)
						}
					}
		        }else if(optType=="receive"){//领取
		        	this.list[index].status='1'
		        	if(self.$route.params.wish_type==='list' && self.currentSelect==='wish_begin'){
		        		if(self.listIng.length>0){		        			
		        	    	self.listIng.splice(0,0,self.listBegin[index])
		        		}
		        		self.listBegin.splice(index,1)
		        		//this.list.splice(index,1)
		        		self.countObj.unused=self.countObj.unused-1
		        		self.countObj.doing=self.countObj.doing+1
		        	}
		        }else if(optType=="complete"){//确认完成
		        	this.list[index].status='2'
		        	if(self.$route.params.wish_type==='list' && self.currentSelect==='wish_ing'){
			        	self.countObj.doing=self.countObj.doing-1
			        	self.countObj.finish=self.countObj.finish+1
			        	if(self.listEnd.length>0){		        			
		        	    	self.listEnd.splice(0,0,self.listIng[index])
		        		}
		        		self.listIng.splice(index,1)
		        		//this.list.splice(index,1)
		        	}
		        }else if(optType=="thanks"){//感谢一下
		        	this.list[index].status='2'
		        	this.list[index].thanks='thanks'
		        	if(self.$route.params.wish_type==='list' && self.currentSelect==='wish_ing'){
			        	self.countObj.doing=self.countObj.doing-1
			        	self.countObj.finish=self.countObj.finish+1
			        	if(self.listEnd.length>0){		        			
		        	    	self.listEnd.splice(0,0,self.listIng[index])
		        		}
		        		self.listIng.splice(index,1)
		        		//this.list.splice(index,1)
		        	}
		        }
		    }
		}

	};
</script>
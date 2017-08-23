<style type="text/css"  >
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
    background-color: white;
}
</style>
<template>
	<div>
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 50px;">
				<on-touch @longTap='deletecollectitem(obj)'	v-for="obj in list">
					<div  class="items" @click="jumpto({name:'forumdetail',params:{title:obj.contentTitle,contentId:obj.contentId}})">
						<div style="text-align: left; margin-top: -4px;">
							<div style="float: left; margin-right: 5px;">
								<img :src="obj.faceImageUrl||''" @error="$event.target.src=defaulthead"  style="height: 40px; width:40px;margin-right: 7px; border-radius: 50%; margin-top: 3px;">
							</div>
							<div style="line-height: 10px;font-size:13px"> 
								<p v-show="$route.name=='forum'" style="float: right; border: 1px solid #fd7b27; padding: 5px 10px; color: #fd7b27; border-radius: 3px;">{{obj.auditName}}</p>
								<p style="margin-bottom: 10px;"><span style="margin-top: 8px; display: inline-block; color: #222;">{{obj.isAnonymous?'匿名用户':obj.userName}}</span></p>
								<span style="color: #8c8c8c;">{{obj.createTime}}</span>
							</div>
						</div>
						<div  style="margin-top: 10px;text-align: left;padding-bottom: 12px;">
							<p style="font-size: 17px; margin: 5px 0 0; color: #222;">{{obj.contentTitle}}</p>
							<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;line-height: 20px; margin: 3px 0; font-size: 15px; word-wrap:break-word; color: #444; ">{{obj.contentShort}}</p>
							<p style="color: #A3A3A3; margin: 5px 15px 3px;font-size: 12px; overflow: hidden;">
								<!--<span>{{obj.viewCount||0}}次阅读</span>
								<span>&nbsp;&nbsp;{{obj.remarkCount||0}}个回复</span>-->
								<span style="float: right;">
									<span style="margin-right: 15px; line-height: 17px;"><img src="./imgs/liulan.png" width="17" style="vertical-align: bottom;"/>&nbsp;&nbsp;{{obj.viewCount||0}}</span>
									<span style="margin-right: 15px; line-height: 17px;"><img src="./imgs/shoucang.png" width="17" style="vertical-align: bottom;"/>&nbsp;&nbsp;{{obj.remarkCount||0}}</span>
									<span style="margin-right: 15px; line-height: 17px;"><img :src="zanbefore" width="17" style="vertical-align: bottom;"/>&nbsp;&nbsp;{{obj.agreeCount||0}}</span>
								</span>
							</p>
						</div>
					</div>
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
		<div v-show="$route.name=='unionforum'"  class="btn-fiexed">
			<mt-button size="large" @click.native="jumpto({name:'forum',title:'我的需求'})" style=" background: #fd7b27;" type="primary">我的需求</mt-button>
		</div>
	</div>
</template>

<script>

import zanbefore from './imgs/zanbefore.png'

import defaulthead from './imgs/defaulthead.png'
	export default {
		name: 'forum',
		data() {
			return {
				list: [],
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				defaulthead:defaulthead,
				zanbefore: zanbefore,
				url:'/bbsContent/pages',
				classId:this.$route.params.sicId
			}

		},
		beforeRouteEnter (to, from, next) {
		    if(to.name==="unionforum1" || to.name==="forum"){
			    	if(!localStorage.userId){
	              next({name: 'login',title:'登录'})
			    			return 
			    	}
		    }
		    next();
		},
		created() {
			if(this.$route.name==='unionforum1'){//我的收藏职工需求
				this.url="/bbsContent/getCollBBSContent"
			}else if(this.$route.name==='unionforum'){//全部职工需求
				this.url="/bbsContent/pages"
			}else if(this.$route.name==='forum'){//我发布的职工需求
				this.url="/bbsContent/myBbsContents"
			}
			this.getList(0)

		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
		watch:{
			'$route'(val,oldVal){
				if(oldVal.name==='forumdetail'){return}
				if(this.$route.name==='unionforum1'){//我的收藏职工需求
					this.url="/bbsContent/getCollBBSContent"
					this.list=[]
					this.getList(0)
					this.count = 10
					this.loading=false//评论是否加载更多
        			this.allLoaded=false
       				this.wrapperHeight=0
				}else if(this.$route.name==='unionforum'){//全部职工需求
					this.url="/bbsContent/pages"
					this.list=[]
					this.getList(0)
					this.count = 10
					this.loading=false//评论是否加载更多
        			this.allLoaded=false
       				this.wrapperHeight=0
				}else if(this.$route.name==='forum'){//我发布的职工需求
					this.url="/bbsContent/myBbsContents"
					this.list=[]
					this.getList(0)
					this.count = 10
					this.loading=false//评论是否加载更多
        			this.allLoaded=false
       				this.wrapperHeight=0
				}
			}
		},
		methods: {
			jumpto(web) {
				this.$router.push(web)
			},
			/*getLocalList() {
				var self = this
				this.ajax({
					url: '/bbsContent/myBbsContents',
					data: {
						userId: localStorage.userId
					},
					type:'get'
				}, function(data) {
					if(data.result) {
						self.list = data.obj
						
					}else{
						self.$toast({
							message: data.description,
							position: 'bottom',
						});
					}

				})
			},*/
			getList(sum) {
				var self = this
				this.ajax({
					url: self.url,
					data: {
						classId: this.classId,
						start: sum,
						userId: localStorage.userId || ''
					},
					type:"get"
				}, function(data) {
					if(data.result) {
						self.list = self.list.concat(data.obj)
					}
					self.count = data.obj && data.obj.length || 0;
				})

			},
			loadMore() {
				this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.list.length!=0){
							this.getList(this.list.length)
						}
					}
					this.loading = false;
				 },2000)
			},
		    deletecollectitem(obj) {//删除收藏			
				if(this.$route.name==='unionforum1'){//我收藏的职工需求
					let self = this;
					this.$messagebox.confirm('你确定要取消这个收藏?', '提示', ).then(action => {
						this.ajax({
							url: '/sysUserFavorite/delete',
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
			}
		}

	};
</script>
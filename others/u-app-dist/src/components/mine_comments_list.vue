<style>
	#mine_comments_list .mint-cell-text1{overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%; display: inline-block;}
</style>
<template>
	<div id='mine_comments_list'>
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 80px;">
				<div v-if="commentList.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
					暂无数据
				</div>
				<div v-for="(obj, index) in commentList " style="background-color: #FFFFFF; margin-bottom: 10px;">
					<mt-cell  style='border-bottom: 1px solid #f3f5f7;' @click.native="goto(obj)" is-link class="unline">
				        <div slot="title">			        	
				        <img slot="icon" :src="newsicon" @error="$event.target.src=defaulthead" width="24" height="24" style="margin-right: 20px; float: left;"/>
				        	<span style=" margin: 0; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;line-height: 20px; color: #222;">{{obj.detailTitle}}</span>
				        </div>
					</mt-cell>
					<div style="padding: 5px 30px 10px;">
						<div v-html="obj.remarkContent"></div>
						<div style="text-align: right; margin-top: 10px; color: #999999;">
							<span>{{obj.createTime}}</span>
							<img style="width: 15px; margin-left: 10px;" src="./imgs/zanbefore.png" />
							<span>{{obj.agreeCount}}</span>
						</div>
					</div>
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
	</div>
</template>
<script>
	import newsicon from './imgs/newsicon.png'
	import voluicon from './imgs/volunteericon.png'
	import defaulthead from './imgs/defaulthead.png'
	export default {
		data() {
			return {
				commentList:[],//评论集合
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				//type:{news:{detail:'details'},volunteer_activity:{detail:'volunteer_activity_detail'},activity:{detail:'activityDetails'}},
				currentType:'',
				newsicon:newsicon,
				voluicon:voluicon,
				defaulthead:defaulthead
			}
		},
			created(){
				this.getComments(0);
			},
			mounted() {
		    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		    },
			methods: {
				goto(obj) {
					if(this.currentType=="news"){//新闻资讯
						this.$router.push({name:'details',params:{detailId:obj.id}})
						
					}else if(this.currentType=="volunteer_activity"){//志愿活动详情
						this.$router.push({name:'volunteer_activity_detail',params:{id:obj.id}})
						
					}
//					else if(this.currentType=="activity"){//优惠活动详情
//						this.$router.push({name:'activityDetails',params:{id:1,isHistory:false}})						
//					}
				}, 
				getComments(num){
					this.currentType=this.$route.params.commentType;
					const self=this;
					this.ajax({
						url:'/sysRemark/meRemark', 
						data:{type:this.currentType,start:num,userId:localStorage.userId},
						type:'get'
					},function(data){
						 if(data.result){
						 	self.commentList = self.commentList.concat(data.obj)
						 	self.count=data.obj.length;
						 }else{
						 	self.count=0
						 	//self.$toast(data.description)
						 }
					})
				},
				
				loadMore() {
					this.loading = true;
					setTimeout(()=>{
						if(this.count<10){
							this.allLoaded=true;
						}else{
							if(this.commentList.length!=0){
								this.getComments(this.commentList.length)
							}
						}
						this.loading = false;
					 },2000)
				},
				
//				loadMoreUnuse() {//加载更多
//					setTimeout(()=>{
//						if(this.count < 10) {
//							this.loading = true;
//						} else {
//							this.getComments(this.commentList.length)
//						}
//						this.$refs.mine_comments.onBottomLoaded();
//					},1000)
//				},
			},

	}
</script>
<template>
	<div style="background-color: rgb(247, 247, 247);" >
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 20px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 40px;">
				<!--v-touch:press='remove.bind(this,{id:"123"})'-->
				<div style="padding: 0px 5px;margin: 0px 0px 5% 0px; background-color: #fff;" class="clearfix">
					<!--<mt-cell title="资讯">
		
						<img slot="icon" src="./imgs/news2.png" height="20px">
					</mt-cell>-->
					<div style="width: 90%;margin-left:5%;"></div>
		
					<div v-if="collectList.length==0" style="text-align: center; padding: 20px;">
						您还没有任何收藏。
					</div>
					<on-touch @longTap='deletecollectitem(obj)'  v-for="(obj,index) in collectList">
						<mt-cell    is-link   @click.native="goto({name:'details',params: { detailId: obj.detailId,title:obj.detailTitle }})">
				    		<div slot='title' >
				    		 	<table style="width: 100%;">
				    		 		<tr >
				    		 			<td width="60px">
						 				 	<img  :src="obj.iconUrl" style="width: 100px;height: 65px;" @error="$event.target.src=errorpng"> 
				    		 			</td>
				    		 			<td >
					    		 			<div style="margin-left: 3px;">
					    		 				<p style=" margin-top: 10px;margin-bottom:10px; font-size: 15px; color: #222; line-height: 20px; height: 40px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;" >
					    		 					{{obj.detailTitle}}
					    		 				</p>
					    		 				<!--<p style="font-size: 13px;margin-top: 8px;margin-bottom:0px;color: #666;">
					    		 					{{obj.detailShort}}
					    		 				</p>-->
						    		 			<p style="font-size: 12px;color: #8c8c8c;">
						    		 				<!--{{obj.createTime| formatDate}}
						    		 				<span style="float: right;">阅读量:{{obj.viewCount||0}}</span>-->
						    		 				<span style="float: right;">
														<span style="margin-right: 5px; line-height: 17px;"><img src="./imgs/shoucang.png" width="17" style="vertical-align: bottom;"/>&nbsp;{{obj.remarkCount||0}}</span>
														<span style="margin-right: 5px; line-height: 17px;"><img src="./imgs/zanbefore.png" width="17" style="vertical-align: bottom;"/>&nbsp;{{obj.agreeCount||0}}</span>
													</span>
						    		 				<span>{{obj.createTime| formatDate}}</span>
						    		 			</p>
					    		 			</div>
				    		 			</td>
				    		 		</tr>
				    		 	</table>
				    		</div>
						</mt-cell>
		    		</on-touch>
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
import errorpng from './imgs/errornews.png'
	export default {
		data() {
				return {
					collectList: [],
					//底部自动加载更多
					count:10,//最新一页评论数
				    loading:false,//评论是否加载更多
	        		allLoaded: false,
	       			wrapperHeight: 0,
					infoClassId:'',
					collType:'0',
					errorpng:errorpng
				}
		    },
		    beforeRouteEnter (to, from, next) {
			    if(!localStorage.userId){
	                next({name: 'login',title:'登录'})
			    	return 
			    }
			    next()
			},
			mounted() {
				//console.log(this.$route.name)
				if(this.$route.name==='volunteerStyle1'){
					this.infoClassId=this.$route.params.sicId;
					this.collType='1';
				};
				this.getcollectList(0);
				this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			},
			computed: {
				loginState: function() {}
			},
			methods: {
				loginthird: function(type) {

				},
				remove(parms) {
					alert(parms.id)
				},
				getcollectList(param) {
					let self = this;
					this.ajax({
						url: '/sysInfoDetail/getCollNewsContent',
						data: {
							userId: localStorage.userId,
							start: param,
							collType:self.collType,
							infoClassId:self.infoClassId
						},
						type: 'get'
					}, function(data) {
						if(data.result) {
							self.collectList = self.collectList.concat(data.obj)
							self.count = data.obj.length;
						} else {
							self.count = 0
//							self.$toast({
//								message: data.description,
//								position: 'bottom',
//							})
						}
					})
				},
				loadMore() {
					this.loading = true;
					setTimeout(()=>{
						if(this.count<10){
							this.allLoaded=true;
						}else{
							if(this.collectList.length!=0){
								this.getcollectList(this.collectList.length)
							}
						}
						this.loading = false;
					 },2000)
				},
				goto(page) {
					this.$router.push(page);
				},
				deletecollectitem(obj) {
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
								this.collectList.$remove(obj)
							} 
						})
					});
				},
			}
	}
</script>

<style scoped lang="less">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
</style>
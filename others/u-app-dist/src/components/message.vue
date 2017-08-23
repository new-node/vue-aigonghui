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
</style>
<template>
	<div>
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 40px;">
				<div v-show="msgobj.length==0" style="text-align: center; padding: 20px;">
					暂无内容
				</div>
				<div style="">
					<div style="background-color: #fff; color: #666; padding-left: 10px; margin-bottom: 15px;" v-for ="item in msgobj"  @click="jumpto({name:'notice',params:{title:'系统通知',msgid:item.noticeId}})">
						<div style="float: left;">
							<img src="./imgs/sysmessage.png" style="margin: 5px auto;margin-top:9px;  width: 40px; height:40px;">
							<!--<span style=" position: absolute; width: 18px; height: 18px; border-radius: 50%; background-color: red;color: #fff; text-align: center; top: 8px; left: 45px; font-size: 12px;line-height: 18px;">11</span>-->
						</div>
						<div class="clearfix" style="margin-left: 10px; line-height: 5px; display: inline-block; width: 75%;">
							<p><span style="font-size: 12px; color: #222;font-weight: bold;">系统公告</span><span style="float: right;font-size: 12px;">{{item.createTime| formatDate}}</span><p>
							<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;line-height: 20px;  font-size: 15px; color: #222;margin-bottom: 5px;">
								{{item.noticeTitle}}
							</p>
							<p style="margin:0; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;line-height: 20px;  font-size: 13px; color: #999;">
								{{item.shortContent}}
							</p>
						</div>
					</div>
				</div>
		 		<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded && msgobj.length>0" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'message',
		components: {},
		data(){
			return {
				msgobj:[],
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
			}
		},
		created() {
			this.getmsgobj(0)
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
		methods: {
			getmsgobj(start){
				this.ajax({
					url: '/notice/getSysNoticeS',
					data: {
						start:start,
					},
				}, (data) => {
					this.count = data.obj.length||0;
					if(data.result) {
						this.msgobj=this.msgobj.concat(data.obj)		
					} else {
						this.$toast({
							message: data.description,
							position: 'bottom',
						});
					}
				})
			},
			jumpto(web) {
				this.$router.push(web)
			},
			loadMore() {
				this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.msgobj.length!=0){
							this.getmsgobj(this.msgobj.length)
						}
					}
					this.loading = false;
				},2000)
			}
		}
	}
</script>
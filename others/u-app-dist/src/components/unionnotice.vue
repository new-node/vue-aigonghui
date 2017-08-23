<template>
	<div>
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 40px;">
		  		<div v-if="noticeList.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px;">
					暂无数据
				</div>
				<mt-cell v-for="obj in noticeList"   is-link  @click.native="jumpto(obj)" id="tongzhi">
			    	<div slot='title' >
			    		 <table  width="100%">
			    		 	<tr>
			    		 		<td>
			    		 			<div style="margin-left: 3px;">
			    		 				<p style=" margin-top: 13px;margin-bottom:0px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; line-height: 18px; font-size: 15px; color: #222; height: 38px;">{{obj.detailTitle}}</p>
			    		 				<!--<p style="font-size: 13px;margin-top: 8px;margin-bottom:0px;color: #666;">
			    		 					{{obj.detailShort}}
			    		 				</p>-->
				    		 			<p style="font-size: 12px;margin-top: 8px;color: #666;">
				    		 				{{obj.createTime}}
				    		 				<span style="float: right;">阅读量:{{obj.viewCount}}</span>
				    		 			</p>
			    		 			</div>
			    		 			
			    		 		</td>
			    		 	</tr>
			    		 </table>
			    	</div>
				</mt-cell>
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
<script type="text/javascript">
export default{
	name:'unionnotice',
	data(){
		return{
			noticeList:[],
			//底部自动加载更多
			count:10,//最新一页评论数
		    loading:false,//评论是否加载更多
    		allLoaded: false,
   			wrapperHeight: 0,
			sicId:this.$route.params.sicId
		}
	},
	created(){
		this.getnoticeList(0)
	},
	mounted() {
    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	methods:{
		jumpto(obj) {
			 this.$router.push({name:'details',params:{detailId:obj.detailId,title:obj.detailTitle}})
		},
		loadMore() {
			this.loading = true;
			setTimeout(()=>{
				if(this.count<10){
					this.allLoaded=true;
				}else{
					if(this.noticeList.length!=0){
						this.getnoticeList(this.noticeList.length)
					}
				}
				this.loading = false;
			 },2000)
		},
		getnoticeList(sum){
			var self=this;
			this.ajax({url:'/sysInfoDetail/detailList',data:{sicId:this.sicId,start:sum}},function(data){
				if(data.result){
//					if(self.noticeList.length==0){
//						self.noticeList=data.obj
//					}else{
						self.noticeList=self.noticeList.concat(data.obj)	
						self.count=data.obj && data.obj.length || 0;
//					}
				}
			})
		}
	}
}	
</script>
<style type="text/css">
	#tongzhi{background: url(./imgs/huinotice.png) no-repeat; background-size: 100% 100%;top:0px; margin: 15px;}
</style>
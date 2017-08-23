<template>
	<div>
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 40px;">
				<div v-if="styleList.length==0" style="text-align: center;background: white;padding: 10px;">
					暂无数据
				</div>
				<mt-cell v-for="obj in styleList"  style="margin-top: 15px; height: 90px;"   is-link  @click.native="jumpto(obj)" id="zhuanti">
			    	<div slot='title' >
			    		 <table  width="100%">
			    		 	<tr >
			    		 		<td >
			    		 			<div style="margin-left: 3px;">
			    		 				<p style=" margin-top: 17px;margin-bottom:0px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; line-height: 18px; height: 35px; color: #222;">{{obj.sicName}}</p>
			    		 				<!--<p style="font-size: 13px;margin-top: 8px;margin-bottom:0px;color: #666;">
			    		 					{{obj.detailShort}}
			    		 				</p>-->
				    		 			<!--<p style="font-size: 13px;margin-top: 3px;color: #666;">-->
				    		 				<span style="float: right;color: #8c8c8c;padding-bottom: 3px;font-size: 12px; margin-top: 15px;">{{obj.createTime| formatDate}}</span>
				    		 			<!--</p>-->
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
	name:'unionstyle',
	data(){
		return{
			styleList:[],
			//底部自动加载更多
			count:10,//最新一页评论数
		    loading:false,//评论是否加载更多
    		allLoaded: false,
   			wrapperHeight: 0,
			sicId:this.$route.params.sicId
		}
	},
	created(){
		this.getstyleList(0)
	},
	mounted() {
    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	methods:{
		jumpto(obj) {
			if(obj.extendUrl){
				if(!window.plus) {
					window.location.href = obj.extendUrl
				} else {
					this.$router.push({name:'blank',params:{url:obj.extendUrl,title:obj.sicName}})
				}
		 
			}else{
				
			 this.$router.push({name:'unionstylelist',params:{sicId:obj.sicId,title:obj.sicName}})
			}
		},
		loadMore() {
			 this.loading = true;
			setTimeout(()=>{
				if(this.count<10){
					this.allLoaded=true;
				}else{
					if(this.styleList.length!=0){
						this.getstyleList(this.styleList.length)
					}
				}
				this.loading = false;
			 },2000)
		},
		getstyleList(sum){
			var self=this;
			this.ajax({url:'/sysInfoClass/subClassList',data:{sicId:this.sicId,start:sum}},function(data){
				if(data.result){
					self.styleList=self.styleList.concat(data.obj)
					self.count=data.obj.length;
				}else{
					self.count=0;
				}
				
			})
		}
	}
}	
</script>
<style type="text/css">
	#zhuanti{background: url(./imgs/zhuanti.png) no-repeat; background-size: 100% 100%; margin: 15px;top:0px}
	#zhuanti .mint-cell-wrapper{background-image:none ;}
</style>
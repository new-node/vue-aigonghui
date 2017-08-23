<template>
	<div id="unionnews">
		<!--底部自动加载列表-->
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 40px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="500" infinite-scroll-immediate-check='false'>
				<mt-swipe :auto="5000" style="height: 150px;" v-if='bannerList.length>0'  >
		     		<mt-swipe-item v-for="obj in bannerList" @click.native="bannergo(obj)" :showIndicators='bannerList.length>1'>
						<img :src="obj.bqPhotoUrl" width="100%" height="100%"  @error="$event.target.src=errorBanner" style="position: relative;"/>
						<div v-if='obj.template'  style="position: absolute; bottom: 0;   z-index:  11; width: 100%;background-color: rgba(0,0,0,.4); padding:8px ;  color: #fff;">
							<p style="width: 90%; margin: 0 0 15px;-webkit-line-clamp: 1;font-size: 14px; " class="ellip">{{obj.template}}</p>
						</div>
						 
		     		</mt-swipe-item>
				</mt-swipe>
				<div v-if="newsList.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
					暂无数据
				</div>
			  
			    <mt-cell  v-for="obj in newsList"   is-link @click.native="jumpto(obj)" >
			    	<div slot='title' >
			    		 <table style="width:100%">
			    		 	<tr >
			    		 		<td width="60px">
					 				 <!--<img  :src="obj.iconUrl||''" style="width: 100px;height: 65px;" @error="$event.target.src=errornews"> -->
					 				 	<img  :src="obj.iconUrl||''" style="width: 100px;height: 65px;"  @error="$event.target.src=errornews"/> 
			    		 		</td>
			    		 		<td >
			    		 			<div style="position: relative;margin-left: 3px;">
			    		 				<p style=" margin-top: 13px;margin-bottom:10px; font-size: 15px; color: #222; line-height: 20px; height: 40px; -webkit-box-orient: vertical;" class="ellip">{{obj.detailTitle}}</p>
			    		 				<!--<p style="font-size: 13px;margin-top: 8px;margin-bottom:0px;color: #666;">
			    		 					{{obj.detailShort}}
			    		 				</p>-->
				    		 			<p style="display: block;position: relative;right: -3px;font-size: 12px;color: #8c8c8c;width: 105%;overflow: auto;">
				    		 				{{obj.createTime}}
				    		 				<span style="float: right;width:4.2rem ; text-align: left;white-space: nowrap;overflow: hidden;">阅读量:{{obj.viewCount}}</span>
				    		 			</p>
			    		 			</div>
			    		 			
			    		 		</td>
			    		 	</tr>
			    		 </table>
			    	</div>
				</mt-cell>
				<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;padding-bottom: 10px;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 10px;padding-top: 5px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>	
		</div>
	</div>
</template>
<script type="text/javascript">
import errornews from './imgs/errornews.png'
import errorBanner from './imgs/errorBanner.png'
export default{
	name:'unionnews',
	data(){
		return{
			errornews:errornews,
			errorBanner:errorBanner,
			bannerList:[],
			newsList:[],
			//底部自动加载更多
			count:10,//最新一页评论数
		    loading:false,//评论是否加载更多
    		allLoaded: false,
   			wrapperHeight: 0,
   			
			sicId:this.$route.params.sicId
		}
	},
	created(){
		var self=this
		this.ajax({url:'/bannerSet/getByPageNum',data:{pageNum:3,unionId:this.$route.params.unionId}},function(data){
			if(data.result){
				self.bannerList=data.obj
			}
		})
		this.getnewsList(0)
	},
	mounted() {
    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	watch:{
		'$route'(val,oldVal){			
			if(val.name===oldVal.name){//this.$route.meta.rest===true&&this.$route.name==='unionspecial'
				this.count=10;
				this.loading=false
				this.allLoaded=false
				this.wrapperHeight=0
				
				 this.newsList=[];
				 this.sicId=this.$route.params.sicId;
				 this.getnewsList(0)
		} else{
				 this.count=10;
				 this.loading=false;
			}
		}
	},
	mounted() {
    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	methods:{
		bannergo(obj){
			if(obj.bqType==='inner'){
				if(obj.route && obj.route.params && obj.route.params.id && obj.route.params.id!=''){
			    	this.$router.push(obj.route)
				}else{
					return
				}
			}else if(obj.bqType==='outer'){
				if(!obj.bqUrl || obj.bqUrl===''){
					return 
				}
				if(!window.plus){
					window.location.href=obj.bqUrl
				}else{
					this.$router.push({name:'blank',params:{url:obj.bqUrl,title:obj.template}})
				}
				
			}else{
				this.log(obj)
			}
		},
		jumpto(obj) {
			 this.$router.push({name:'details',params:{detailId:obj.detailId,title:obj.detailTitle}})
		},
//		handleBottomChange(status) {
//	        this.bottomStatus = status;
//	    },
		loadMore() {
			this.loading = true;
			setTimeout(()=>{
				if(this.count<10){
					this.allLoaded=true;
				}else{
					if(this.newsList.length!=0){
						this.getnewsList(this.newsList.length)
					}
				}
				this.loading = false;
			},2000)
		},
		getnewsList(sum){
			var self=this;
			this.ajax({url:'/sysInfoDetail/detailList',data:{sicId:self.sicId,start:sum}},function(data){
				if(data.result){
					if(self.newsList.length==0){
						self.newsList=data.obj
					}else{
						self.newsList=self.newsList.concat(data.obj)						
					}
					self.count=data.obj.length;
					//console.log(JSON.stringify(self.newsList))
				}else{
					self.count=0
				}
			})
		}
	}
}
</script>
<style type="text/css">
	.ellip {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
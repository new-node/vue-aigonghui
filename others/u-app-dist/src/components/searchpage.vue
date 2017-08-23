<template>
	<div style="overflow: hidden;">
		<header id="head" class="mint-header  is-fixed" style="background: rgb(253, 123, 39);height: 46px;z-index: 20;">
			<div class="mint-header-button is-left">
				<a>
					<button class="mint-button mint-button--default mint-button--normal" @click="back">
	    				<span class="mint-button-icon">
	    					<i class="mintui mintui-back"></i>
	    				</span> 
	    				<label class="mint-button-text">返回</label>
	    			</button>
				</a>
			</div>
			<div class="mint-searchbar" style="background: transparent;width: 85%;  ">
				<div class="mint-searchbar-inner"style="height: 30px; ">
					<i class="mintui mintui-search"></i> 
					<input type="search" placeholder="搜索" class="mint-searchbar-core"   v-model="searchText" style="width: 100%;">
				</div>
				<button class="gong_btn" @click="search()">搜索</button>
			</div>
		</header>
		<div v-show="noneShow && !loading &&!allLoaded" style="text-align: center;background: white;padding: 10px;margin-top: 15px">
			没有搜索到相关内容
		</div>
		<div :style="style">
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 25px;">
				<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="margin-top: 8px;padding-bottom: 30px;">
				<!--<div  v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="0" style="margin-top: 8px;">-->
					<mt-cell v-for="obj in list"     is-link  @click.native="jumpto(obj)" >
				    	<div slot='title' >
				    		 <table  width="100%">
				    		 	<tr>
				    		 		<td width="60px">
						 				 <img  :src="obj.iconUrl" @error="$event.target.src=errornews" style="width: 100px;height: 65px;" > 
				    		 		</td>
				    		 		<td >
				    		 			<div style="margin-left: 3px;">
				    		 				<p style="height:40px; margin-bottom:0px;line-height: 20px;" class="ellip">{{obj.detailTitle}}</p>
				    		 				<!--<p style="font-size: 13px;margin-top: 8px;margin-bottom:0px;color: #666;">
				    		 					{{obj.detailShort}}
				    		 				</p>-->
					    		 			<p style="font-size: 13px;margin-top: 8px;color: #666;">
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
	</div>
</template>
<script type="text/javascript">
var timer=null;
import errornews from './imgs/errornews.png'
	export default {
		name: 'searchpage',
		data(){
			return{
				errornews:errornews,
				 list:[],
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				searchText:'',
				noneShow:false,
				sicId:this.$route.params.sicId,
				style:{
					overflow:'scroll',
					'-webkit-overflow-scrolling' :'touch',
					height:(document.documentElement.clientHeight - 46) + 'px'
				}
			}
		},
		created(){
			this.searchText=this.$route.meta.searchText||'';
			if(this.searchText!=''){
				this.getList(0)
			}
			
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
		methods: {
			search(){
				if(this.searchText==''){
					return
				}
				this.list=[]
			 	this.getList(0)
			},
			back() {
				this.searchText=''
				this.$route.meta.searchText=''
				this.$router.back()
			},
			jumpto(obj) {
				this.$route.meta.searchText=this.searchText;
			 	this.$router.push({name:'details',params:{detailId:obj.detailId,title:obj.detailTitle}})
			},
			loadMore() {
				if(this.searchText==''){
					return
				}
				 /*setTimeout(()=>{
				 	this.$refs.news.bottomStatus ='loading'
				 	this.$refs.news.bottomReached =true
				 	this.$refs.news.direction='up'
				 	this.$refs.news.handleTouchEnd()
				 },1000)*/
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
//			loadMore() {
//				if(this.searchText==''){
//					return
//				}
//				if(this.count<10){
//					this.loading=true;
//				}else{
//					this.getList(this.list.length)
//				}
//			},
			getList(sum){
				var self=this;
				this.ajax({url:'/sysInfoDetail/detailList',data:{sicId:this.sicId,start:sum,detailTitle:this.searchText}},function(data){
					if(data.result){
//						if(self.list.length==0){
//							self.list=data.obj
//						}else{
							self.list=self.list.concat(data.obj)
							self.count=data.obj.length;
//						}
						self.noneShow=false;
					}else{
						self.noneShow=true;
						self.count=0;
					}
				})
			}
		},
//		watch:{
//			searchText(a){
//				let self=this;
//				if(!this.searchText){
//					self.list=[]
//					return
//				}
//				if(!timer){
//					timer=setTimeout(function(){
//						self.list=[]
//					 	self.getList(0)
//						timer=null
//					},800)
//				}
//			}
//		}
	}
</script>
<style type="text/css">
	.gong_btn{
		background-color: #FD7B27;
		 border: none; 
		 font-size:14px; 
		 color: #fff;
		 margin-right: -10px;
    	margin-left: 5px;
    	}
  
</style>
<style type="text/css" scoped="scoped">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	.nav_ten td {
		height:80px;
		width: 100px;
	}
	
	.nav_ten img {
		width: 40px;
	}
	.mint-cell-wrapper{background-image: none;}
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
   flex-wrap:wrap; 
  flex-direction: row;
  background: #FFFFFF;
  align-items:flex-start;
  /*justify-content:flex-start;*/
  /*padding:5px ;*/
  /*align-content: flex-start*/
}
.item {
	flex: 1;
	text-align: center;
 	/*margin-top: 12px;*/
 	padding: 5px;
 	min-width: 50%;
 	max-width: 50%;
 	color: #666;
 	border: solid 3px #EEEEEE;
}
</style>
<template>
	<div >
		<div >
			<div v-if="list.length==0" style="text-align: center;background: white;padding: 10px;">
				暂无数据
			</div>
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 40px;">
					<div v-show="list.length!=0" style="overflow: auto;margin-top: 12px; height: 100%;-webkit-overflow-scrolling:touch;" id="sss">
						<div v-for="obj in list" style="background-color: #fff; padding:2px 10px 5px; background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
				    background-size: 120% 1px;
				    background-repeat: no-repeat;" @click="goto({name:'heartthings_chat',params:{title:obj.sqShort,sqId:obj.sqId,qasmId:$route.params.id}})">
							<div>
								<div style="float: left; margin-right: 5px;padding-top: 8px">
									<img :src="obj.photoUrl||''" style="height: 40px; width: 40px; margin-right: 7px; border-radius: 50%;" @error="$event.target.src=defaulthead">
								</div>
								<div style="line-height: 10px;padding: 2px">
									<p style="font-size: 13px; color: #222; margin-bottom: 10px;">{{obj.isAnonymous?obj.tmpName||'匿名用户':obj.userRealname||obj.userName||'用户'}}</p>
									<span style="font-size: 12px; color: #8c8c8c; ">{{obj.createTime| formatDate}}<span style="color: #A3A3A3; font-size: 12px; float: right;">{{obj.viewCount}}次阅读</span></span>
								</div>
							</div>
							<div class="clearfix" >
								<p style="font-size: 17px; margin: 7px 0 0; color: #222;">{{obj.sqShort}}</p>
								<div style="overflow: hidden; margin: 3px 0; font-size: 15px;color: #444; word-wrap:break-word;" v-html='obj.sqContext'> </div>
								<p >
									
								</p>
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
	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	import errorpng from './imgs/errorpng.png'
	export default {
		name: 'heartask',
		data() {
			return {
				selected: '',
				style: {
					'padding-top': '15px',
					'overflow-y': 'hidden',
					'height': (document.documentElement.clientHeight - 140) + 'px'
				},
				nav: [],
				list: [],
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				errorpng: errorpng,
				defaulthead: defaulthead
			};
		},
		watch: {
			$route(val,oldVal){
				if(oldVal.name=='askteacher_details2' && val.name=='past_advisory'){
					this.list=[];
					this.getList(0)
					//底部自动加载更多
					this.count=10//最新一页评论数
				    this.loading=false//评论是否加载更多
	        		this.allLoaded=false
	       			this.wrapperHeight=0
				}
			}
		},
		created(){
			this.getList(0)
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
		methods: {
			goto(obj){
				this.$router.push(obj)
			},
			jumpto(obj) {
				if(obj.internalUrl){
					this.goto({name:obj.internalUrl,params:{title:obj.sicName,sicId:obj.sicId,qasmId:obj.qasmId}})
				}else{
					if(!window.plus) {
						window.location.href = obj.extendUrl
					} else {
						this.$router.push({name:'blank',params:{url:obj.extendUrl,title:obj.sicName}})
					}
				}
			},
			getList(sum) {
				var self = this
				this.ajax({
					url: '/sysQuestion/getQuestList',
					data: {
						smId: this.$route.params.smId,
						toUserId: this.$route.params.aduserId,
						start: sum
					}
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
			}
		}

	};
</script>
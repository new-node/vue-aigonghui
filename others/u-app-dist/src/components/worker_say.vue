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
	.item-new{
		background-color: #fff; 
		padding:2px 0 5px; 
		background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-origin: content-box;
	    background-repeat: no-repeat;
	    background-position: bottom left; 
	}
	.workersay{
		background: #ffffff;
	}
	.workersay .ask{
		padding: 5px 10px;
	}
	.workersay .answer{
		background-color: #f4f5f7;width:100% ;position: relative;padding: 5px 10px;
	}
	.workersay .triggle{
		width: 25px;
		height: 10px;
		position: absolute;
		left: 15px;
		top: -10px;
		background-image: url(./imgs/littletip.png);
		background-size: 100% 100%;
		background-repeat:no-repeat ;
	}
	.workersay .myanswer{
		height: auto;
		
		overflow: hidden; 
		/*margin: 3px 0; */
		font-size: 15px; 
		word-wrap:break-word; 
		color:#555;
		margin: 8px 0px 5px 0px;
	}
	
	/*.slide1-enter-active {
		transition: all 3s ease;
	}
	.slide1-leave-active {
		transition: all 8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide1-enter, .slide1-leave-active {
		opacity: 0;
	}
	
	.slide2-enter-active {
		transition: all 3s ease;
	}
	.slide2-leave-active {
		transition: all 8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide2-enter, .slide2-leave-active {
		opacity: 0;
	}*/
	
	
</style>
<template>
	<div class="workersay">
		<!--底部自动加载列表-->
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 25px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="80" infinite-scroll-immediate-check='false'>
				<div v-if="list.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
					暂无数据
				</div>
		
				<div v-for="(obj, index) in list" class="item-new">
					<!--jumpto({name:'heartthings_chat',params:{title:obj.sqShort,sqId:obj.sqId}})-->
					<!--提问板块-->	
					<div class="ask">
						<div style="text-align: left; margin-top: -8px;">
							<div style="float: left; margin-right: 5px;padding-top: 13px">
								<img :src="obj.photoUrl||''" style="height: 40px; width: 40px; margin-right: 7px; border-radius: 50%;" @error="$event.target.src=defaulthead">
							</div>
							<div style="line-height: 10px;font-size:13px;padding: 2px  ">
								<p style="margin-bottom: 10px;margin-top: 15px;"><span style="margin-top: 5px; display: inline-block;">{{obj.isAnonymous?obj.tmpName||'匿名用户':obj.userRealname||obj.userName||'用户'}}</span></p>
								<span style="color: #8c8c8c;">{{obj.createTime}}</span>
								<!--.substring(0,16)-->
							</div>
						</div>
						<div class="clearfix" style="margin-top: 10px;text-align: left; margin-bottom: 10px;">
							<p style="font-size: 17px; margin: 5px 0 0;">{{obj.sqShort}}</p>
							<p style="overflow: hidden; margin: 3px 0; font-size: 15px; word-wrap:break-word;" v-html="obj.sqContext"></p>
						</div>
					</div>
					<!--回复版块-->
					<div class="answer" v-show="obj.answerContent">
						<div class="triggle">
							<!--<img  src="./imgs/littletip.png"/>-->
						</div>
						<div>
							<div style="text-align: left; margin-top: -8px;">
								<div style="float: left; margin-right: 5px;padding-top: 13px">
									<img src="./imgs/head_active.png" @error="$event.target.src=head_active" style="height: 40px; width: 40px; margin-right: 7px; border-radius: 50%;">
								</div>
								<div style="line-height: 10px;font-size:13px;padding: 2px  ">
									<p style="margin-bottom: 10px;margin-top: 15px;"><span style="display: inline-block;color: #444;">{{obj.answerUserRealname}}</span></p>
									<span style="color: #8c8c8c;">{{obj.answerCreateTime}}</span>
								</div>
							</div>
							
							<div class="clearfix" transition="slide" style="position: relative;margin-top: 8px;text-align: left; margin-bottom: 8px;">
								<transition name="slide1">
									<p class="myanswer" style="display: block;" ref="myanswershort" v-html="obj.answerContent?(obj.answerContent.length>80?(obj.answerContent.substring(0,80)+'...'):obj.answerContent.substring(0,80)):''">
									</p>
								</transition>
								<transition name="slide2">
									<p class="myanswer" style="display: none;" ref="myanswertotal" v-html="obj.answerContent">
									</p>
								</transition>
								<p v-show="obj.answerContent && obj.answerContent.length>80"  ref="open" @click="show_all(index)" style="position: absolute;right: 15px;bottom: -7px;color:#999999;font-size: 12px;display: none;margin: 0;padding: 0;">
									展开
									<img src="./imgs/arrowb.png" />
								</p>
								<p  ref="hide" @click="hide_all(index)" style="position: absolute;right: 15px;bottom: -7px;color:#999999;font-size: 12px;display: none;margin: 0;padding: 0;">
									收起
									<img src="./imgs/arrowt.png" />
								</p>
							</div>
							
						</div>	
					</div>
					<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
				</div>
				<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 15px;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-bottom: 20px;padding-top: 5px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	import head_active from './imgs/head_active.png'
	export default {
		name: 'heartask',
		data() {
			return {
				selected: '',
				list: [],
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
	    		allLoaded: false,
	   			wrapperHeight: 0,
	   			
				defaulthead: defaulthead,
				head_active:head_active,
				qasmId: this.$route.params.id,
				showtext:false,
			}
		},
		created() {
			this.getList(0);
		},
		updated(){
			
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
		methods: {
			show_all(index){
				for (var i=0;i<this.list.length;i++) {
					if(this.$refs.myanswershort[index].style.display='none'){
						this.$refs.myanswertotal[index].style.display='block';
					}
				}
				this.$refs.open[index].style.display='none';//让展开按钮隐藏
				this.$refs.hide[index].style.display='block';//让收起按钮显示
			},
			hide_all(index){
				for (var i=0;i<this.list.length;i++) {
					if(this.$refs.myanswershort[index].style.display='block'){
						this.$refs.myanswertotal[index].style.display='none';
					}
				}
				this.$refs.open[index].style.display='block';//让展开按钮隐藏
				this.$refs.hide[index].style.display='none';//让收起按钮显示
			},
			jumpto(web) {
				this.$router.push(web)
			},
			getList(sum) {
				var self = this
				this.ajax({
					url: '/sysQuestion/questionAnswerList',
					data: {
						qasmId: this.qasmId,
						sqUserId: localStorage.userId || '',
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
				console.log('我被触发了')
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
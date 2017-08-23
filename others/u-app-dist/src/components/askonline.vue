<style type="text/css">
	.candoo span {
		display: inline-block;
		/*width: 70px;*/
		height: 25px;
		border: 1px solid #d7d7d7;
		text-align: center;
		padding: 4px;
		line-height: 18px;
		margin-top: 5px;
		font-size: 13px;
		border-radius: 3px;
		color: #666;
	}
	.ellip{
		overflow: hidden;
		text-overflow: ellipsis;display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
<template>
	<div >
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 40px;">
				<div v-if="personList.length==0" style="text-align: center;background: white;padding: 10px;">
					暂无可咨询人员
				</div>
				<div class="mint_line" style=" padding:0 10px 0px;height: auto; background-color: #fff;text-align: left;" v-for="(obj,index) in personList" @click="jumpto({name:'askteacher_details2',params:{aduserId:obj.aduserId}})">
					<div style="padding: 20px 10px 5px 5px; height: 100%;">
						<img :src="obj.photoUrl||''" @error="$event.target.src=defaulthead" style="width: 25%; height: auto; display: inline-block; vertical-align: top;" />
						<table style="display: inline-block; width: 70%; height: 100%;" >
							<!--<tr>
								<td style="font-size: 17px;color: #222;" class="ellip">
									{{obj.orgName}}
								</td>
							</tr>-->
							<tr>
								<!--<td style="font-size: 15px; color: #666;"></td>-->
								<div style="font-size: 17px; color: #4c4c4c; padding-top: -10px;">{{obj.sysAduserInfo.aduserRealname}}</div>
								<div style="padding-top: 10px; padding-bottom: 10px; font-size: 16px; height: 38px; color: #4e4e4e;">{{obj.orgName}}</div>
								<div style="font-size: 12px;color: #A3A3A3; margin-top:16px;padding-bottom: 10px;"><span style="font-size: 1.05em;">在线时间：{{obj.onlineWeekBegin}}到{{obj.onlineWeekEnd}} {{obj.onlineTimeBegin}}-{{obj.onlineTimeEnd}}</span></div>
							</tr>
						</table>
						
					</div>
					<!--<div style="display: inline-block; padding-left:73px;" class="candoo">
						<span v-for="item in obj.skills" style="margin-right: 5px;">{{item}}</span>
					</div>-->
				</div>
				<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 5px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	        		<span style="position: absolute;top: 5px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
	</div>
</template>

<script>
import defaulthead from './imgs/defaulthead.png'
	export default {
		name: 'askonline',
		data() {
			return {
				selected: '',
				personList: [],
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				defaulthead:defaulthead,
			}
		},
		created() {
			this.getpersonList(0)
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
		methods: {
			jumpto(web) {
				web.params.smId=this.$route.params.smId,
				web.params.qasmId=this.$route.params.qasmId,
				this.$router.push(web)
			},
			getpersonList(sum) {
				var self = this;
				this.ajax({
					url: '/sysAduserAttr/pages',
					data: {
						userTypeCode: this.$route.name,
						start: sum
					},type:'get'
				}, function(data) {
					if(data.result) {
//						if(self.personList.length == 0) {
//							self.personList = data.obj
//						} else {
							self.personList = self.personList.concat(data.obj)
//						}
						self.count = data.obj.length;
					} else {
						self.count = 0
						self.$toast(data.description)
					}
				})
			},
			loadMore() {
				this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.personList.length!=0){
							this.getpersonList(this.personList.length)
						}
					}
					this.loading = false;
				 },2000)
			},
		}
	};
</script>
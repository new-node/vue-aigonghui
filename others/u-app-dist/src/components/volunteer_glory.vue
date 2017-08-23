<template>
  <div id="volunteer_glory">
	    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
				<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 50px;">
		     	<div v-if="gloryList.length==0" style="text-align: center;background: white;padding: 10px 0;">
					     暂无数据
				  </div>
					<mt-cell class="xxxlist" v-for="(obj,index) in gloryList" >
			    	 <div slot='title' style="overflow: auto;">
			    	 	<div style="overflow: auto; padding: 10px 0;">
			    	 		<div style="float: right; margin-top: 20px;">	    	 			
			    	 			<span style="margin-right: 0px; color:#999999; width: 60px; display: inline-block;"><img src="./imgs/love_value.png" style="width:20px; height: 23px; "  />&nbsp;{{obj.loveCount || 0}}</span>
			    	 			<span @click="gloryAgree(obj)" style="color:#999999; width: 60px; display: inline-block;"><img :src="obj.isagree?zanafter:zanbefor" style="width:20px; height: 23px; " />&nbsp;{{obj.agreeCount || 0}}</span>
			    	 		</div>
			    	 		
				    	 	 <div style="float: left; margin-top: 10px;">
				    	 	 	 <img v-show="index==0" src="./imgs/no1.png" style="width: 20px;" />
				    	 	 	 <img v-show="index==1" src="./imgs/no2.png" style="width: 20px;" />
				    	 	 	 <img v-show="index==2" src="./imgs/no3.png" style="width: 20px;" />
				    	 	 	 <span v-show="index>2" style="width: 20px; display: inline-block; text-align: center;">{{index+1}}</span>
				    	 	 	 <img  :src="obj.photourl || ''" style="width: 40px;height: 40px; border-radius: 50%;" @error="$event.target.src=defaulthead"> 
				    	 	 </div>
				    	 	 <div style="margin-left: 10px; float: left; margin-top: 10px;">
				    	 	 	  <p style="margin: 0;"><span>{{obj.username}}</span></p>
				    	 	 	  <p style="font-size: 14px; color: #999999; margin: 0; margin-top: 10px;">参加活动{{obj.attendCount || 0}}次</p>
				    	 	 	</div>
			    	 	 </div>
			    	 </div>
			    	</mt-cell>
			    	
						<!--<ul>
							<li v-for="(obj,index) in gloryList">22222</li>
						</ul>-->
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
	import defaulthead from './imgs/defaulthead.png'
	import zanbefor from './imgs/zanbefore.png'
	import zanafter from './imgs/zanafter.png'
	import sexMale from './imgs/sex_male.png'
	import sexFamale from './imgs/sex_famale.png'
export default{
	name:'volunteer_glory',
	data(){
		return{
			gloryList:[],
		//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
			sexMale:sexMale,
			sexFamale:sexFamale,
			zanbefor:zanbefor,
			zanafter:zanafter,
			defaulthead:defaulthead
		}
	},
	created(){
		this.getGloryList(0)
	},
	mounted() {
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	},
	methods:{
		loadMore() {
			
			this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.gloryList.length!=0){
							this.getGloryList(this.gloryList.length)
						}
					}
					this.loading = false;
				 },2000)
			
			/*setTimeout(()=>{
			 	this.$refs.glory.bottomStatus ='loading'
			 	this.$refs.glory.bottomReached =true
			 	this.$refs.glory.direction='up'
			 	this.$refs.glory.handleTouchEnd()
			 },1000)*/
		},
		getGloryList(sum){
			var self=this;
				this.ajax({url:'/volusum/getlist',data:{customerId:localStorage.userId || '',start: sum},type:"GET"},(data) => {
					if(data.result){
						self.gloryList=self.gloryList.concat(data.obj)	
					}
					self.count=data.obj && data.obj.length || 0;
			})
		},
		gloryAgree(obj){//点赞
				if(!localStorage.userId){
					this.tologin()
					 
				}else{
					if(obj.isagree){
						this.$toast('您已经点过赞了')
						return
					}					
					const self=this
					 this.ajax({
						url:'/volucalc/saveCalc', 
						data:{SumId:obj.sumId,userId:localStorage.userId},
						type:'post'
					},function(data){
						if(data.result){
							obj.agreeCount=obj.agreeCount+1;
							obj.isagree=true
						}else{
							self.$toast(data.description)
						}
						
					})
				}
			}
	}
}	
</script>
<style>
	.xxxlist .mint-cell-wrapper{
		width: 100%;
		margin: 0;
		padding-right: 0;
		padding-left: 10px;
	}
</style>
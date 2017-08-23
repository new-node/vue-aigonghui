<template>
	<div>
		<div style="text-align: center;">
			<table style="width: 100%;max-height: 100px; text-align: center;" class="qiandaobg">
				<tr style="height:140px;">
					<td style="width: 20%;">
					</td>
					<td style="width: 30%;padding-bottom: 20px;">
						<div>
							<img src="./imgs/dollar.png" style="width: 165px;height:120px;margin-left: 0;margin-top: -40px;" />
							<div style="width: 100%;color: #FD7B27;text-align: center;margin: 0 auto;margin-top: -70px;font-size: 16px;font-weight: 500;">{{score}}</div>
						</div>
					</td>
					<td style="width: 20%;">
						<div style="float:right">
							<p><span style="margin-right: 15px;">&nbsp;</span></p>
							<p><span>&nbsp;</span></p>
						</div>
					</td>
				</tr>
			</table>
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
				<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style=" margin-top: 10px;  background-color: white;padding-bottom: 40px;">
					<div v-if="list.length==0" style="text-align: center;background: white;padding: 10px;border-top:1px solid #DDDDDD ;margin-top: 8px; ">
						暂无记录
			       	</div>
					<div class="jifenlist" v-for="obj in list">
						<p style="padding:10px 20px 5px 20px;font-size: 14px;color: #444;">
							<span style="display: inline-block;width: 75%;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">{{obj.ruleName}}</span>
							<span style="float: right;">{{obj.inOutFlag==1?'+'+obj.currentIntegral:obj.currentIntegral}}积分</span>
						</p>
						<p style="font-size: 12px;color: #777;padding: 5px 20px 10px 20px;">{{obj.createTime}}</p>
						<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
						<div class="wall"></div>
						<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
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
			<!--<el-card 
				@click.native="goto({name:'signin'})" title="签到"  style="width: 90%;margin: 0 auto 20px;" :body-style="{ padding: '10px' }" class="zhuanjifen">
				<div class="" style="width: 50%; margin: 20px 5px;">
					<img src="./imgs/zhuanfont.png" style="width: 100%;" />
				</div>
			</el-card>
			<el-card @click.native="goto({name:'mine_info_member'})" title="工会会员卡" style="width: 90%;margin: 0 auto 20px;" :body-style="{ padding: '10px' }" class="zhuanjifen2">
				<div class="" style="width: 50%; margin: 20px 0 20px 47%;">
					<img src="./imgs/zhuanfont2.png" style="width: 100%;" />
				</div>
			</el-card>-->
			<!--<div  class="mui-card zhuanjifen"   style="margin: 20px;  "  @click="goto({name:'signin'})">
				<div class="mui-card-header mui-card-media "  style="width: 50%; margin: 20px 5px;">
					<img src="./imgs/zhuanfont.png" style="width: 100%;" />
				</div>
			</div>
			<div  class="mui-card zhuanjifen2"   style="margin: 20px  "  @click="goto({name:'mine_info_member'})">
				<div class="mui-card-header mui-card-media "  style="width: 50%; margin: 20px 0 20px 47%;">
					<img src="./imgs/zhuanfont2.png" style="width: 100%;" />
				</div>
			</div>-->
			
		</div>
	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		data() {
			return {
				headimg: localStorage.headurl|| '',
				defaulthead:defaulthead,
				score:'',
				list:[],
				
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
			}
		},
		beforeRouteEnter (to, from, next) {
		    if(!localStorage.userId){
                next({name: 'login',title:'登录'})
		    	return 
		    }
		    next()
		},
		created(){
			this.getdata(0);
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
	    watch:{
			$route(val,oldVal){
				if(this.$route.name=='integral_make'){
					this.score=''
					this.list=[]
					
					//底部自动加载更多
					this.count=10//最新一页评论数
				    this.loading=false//评论是否加载更多
	        		this.allLoaded = false
	       			this.wrapperHeight = 0
	       			this.getdata(0)
	       			
				}
			}
		},
		methods: {
			getdata(sum){
				console.log(localStorage.userId)
				let self=this;
				this.ajax({
					url:'/edouIntegralRecord/getIntegralsCurrRecord',
					type:'get',
					data:{
						userId:localStorage.userId,
						start:sum,
					},
				},function(data){
					//self.count = data.obj.length||0;
					if(data.result){
						self.score=data.obj[0].total
						self.list=self.list.concat(data.obj[0].integralRecordList)
						self.count=data.obj[0].integralRecordList.length;
						//console.log(self.list)
						//self.goodsList=self.goodsList.concat(data.obj)		
					}else{
						self.count=0
//						self.$toast({
//							message: data.description,
//							position: 'bottom',
//						});
					}
				})
			},
			loadMore() {//加载更多
				this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.list.length!=0){
							this.getdata(this.list.length)
						}
					}
					this.loading = false;
				 },2000)
			},
			goto(page) {
				if(localStorage.userId) {
					if(page.name == 'mine_info_member') {
						if(localStorage.bindstate == 0 || localStorage.bindstate == 2) {
							if(localStorage.bindstate == 0){
								this.$toast({
								message: "你已经认证会员卡",
								position: 'bottom',
								});
							}
							else if(localStorage.bindstate == 2){
								this.$toast({
								message: "会员卡正在审核中",
								position: 'bottom',
								});
							}
							return;
						}else{
							this.$router.push(page);
						}
					}else{
						this.$router.push(page);
					}
				}else{
					this.tologin("")
				}
			},
		},

	}
</script>

<style scoped lang="less">
	.text {
		font-size: 14px;
	}
	
	.zhuanjifen {
		background: url(./imgs/jifenbg.png) no-repeat;
		background-size: 100% 100%;
	}
	.zhuanjifen2 {
		background: url(./imgs/jifenbg2.png) no-repeat;
		background-size: 100% 100%;
	}
	.jifenlist{
		background: white;
		text-align: left;
	}
	
	.jifenlist p{
		margin: 0;
		padding: 0;
	}
	.jifenlist .wall{
		height: 10px;
		width: 100%;
		background: #f5f5f5;
	}
	/*.mui-card {
		font-size: 14px;
		position: relative;
		overflow: hidden;
		margin: 15px 0;
		border-radius: 2px;
		background-color: #fff;
		background-clip: padding-box;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .3)
	}
	
	.mui-card-media {
		vertical-align: bottom;
		color: #fff;
		background-position: center;
		background-size: cover
	}
	
	.mui-card-header.mui-card-media {
		display: block;
		padding: 0px
	}
	
	.mui-card-content {
		font-size: 14px;
		position: relative
	}
	
	.mui-card-content-inner {
		position: relative;
		padding: 0px 5px
	}
	
	.mui-card-content-inner div p {
		margin: 5px;
	}*/
	.qiandaobg {
		background: url(./imgs/qiandaobg2.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.qiandaobtn {
		
		text-align: center;
	}
</style>
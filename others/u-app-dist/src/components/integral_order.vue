/<template>
	<div style="margin-top: 64px;">
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 25px;">
				<div v-if="orderlist.length==0" style="text-align: center;background: white;padding: 10px;">
					暂无订单
				</div>
				<div @click="goto({name:'integral_orderdetail',params: { buyRecordId: item.buyRecordId }})"   v-for="(item, index) in orderlist " class="card_one">
					<div  class="mui-card"  style="margin: 20px 15px 0px;" >
						<div class="clearfix" style="width: 100%;">
							<img :src="item.photoUrl" @error="$event.target.src=errorpng"  style="width: 40%;min-height: 70px;margin:8px 5px 8px 8px; background-color: transparent; float: left;" />
							<div style="float: left;width: 55%; position: relative;">
							<p style="margin-left: 10px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical; ">{{item.edouIntegralGoods.indsName}}</p>
							<p style="margin-left: 10px;"><span>积分：{{item.realPayInt}}</span><!--<span style="margin-left: 30px;"> X1</span>--></p>
							<img v-show="item.buyStatus==1"  style="width: 28%; background-color: transparent; position: absolute; top: 30px; right: 10px;" src="./imgs/finish.png"/>
							</div>
						</div>
					</div>
				</div>
				<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin:0 auto;text-align: center;padding-top: 5px;z-index: 10000;">
		    		<mt-spinner type="fading-circle"></mt-spinner>
		    		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
		  		</p>
		  		<p v-show="allLoaded" class="page-infinite-loading" style="position:relative;width: 100px;margin:0 auto;text-align: center;padding-top: 5px;z-index: 10000;">
		    		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
		  		</p>
			</div>
		</div>
	</div>
</template>

<script>
//@error="$event.target.src=errorpng" 
	import errorpng0 from './imgs/defaultjfgoods.png'
//	import {Card} from 'element-ui'
	export default {
		data() {
				return {
					orderlist:[],
					errorpng:errorpng0,
					
					count:10,//
				    loading:false,//是否加载更多
	        		allLoaded: false,
	       			wrapperHeight: 0,
				}
			},
			watch:{
				$route(val,oldVal){
					console.log(val.name+"..."+oldVal.name)
					if(oldVal.name=="signin"){
						this.orderlist=[]
						this.count=10//
					    this.loading=false//是否加载更多
		        		this.allLoaded=false
		       			this.wrapperHeight=0
		       			if(!localStorage.userId){
							this.tologin("")
						}else{
							this.getlist(0);
						}
					}else{
						return
					}
				}
			},
			beforeRouteEnter (to, from, next) {
			    if(!localStorage.userId){
	                next({name: 'login',title:'登录'})
			    	return 
			    }
			    next()
			},
			mounted() {
				if(!localStorage.userId){
					this.tologin("")
				}else{
						this.getlist(0);
				}
			},
			methods: {
				getlist(sum){
					let self=this;
					this.ajax({
						url:'/edouIntegralBuyRecord/getUsersInteGoods',
						data:{
							userId:localStorage.userId,
							start:sum
						},
						type:'get'
						},(data)=>{
							if(data.result){
								//self.orderlist=data.obj;
								self.orderlist=self.orderlist.concat(data.obj)	
								self.count = data.obj.length;
							}else{
								self.count = 0
							}
						})
				},
				loadMore() {
					this.loading = true;
					setTimeout(()=>{
						if(this.count<10){
							this.allLoaded=true;
						}else{
							if(this.orderlist.length!=0){
								this.getlist(this.orderlist.length)
							}
						}
						this.loading = false;
					 },2000)
				},
				goto(page) {
					this.$router.push(page);
				},
			},
	}
</script>

<style scoped  >
	.time {
		font-size: 13px;
		color: #999;
	}
	
	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}
	
	.button {
		padding: 0;
		float: right;
	}
	
	.image {
		width: 100%;
		display: block;
	}
	
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	.card_one:first-child{margin-top: 10px;}
</style>














<!--<div class="mui-card-header mui-card-media">
					<img :src="item.poster||''" width="100%"  @error="$event.target.src=errorBanner" />
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
	
						<div style="float: left; width: 68%;">
							<p style="margin:5px 5px 1px; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
								{{item.detailTitle}}
							</p>
							<p style="color: #8c8c8c;margin:0px 5px 0px 5px; font-size: 12px; ">
								截至日期：{{item}}
	
							</p>
							<p style="font-size: 12px; color: #8c8c8c;"><span style="color: #FD7B27;">{{obj.used}}</span>人已领取</p>
						</div>
						<mt-button size="small" style="float: right; background-color: #c9c9c9;color: white; margin-top: 16px; box-shadow: none; margin-right: 5px;" @click="goto({name:'activityDetails',params:{title:itme.detailTitle,id:itme.activitiesDetailId,isHistory:true}})">查看详情</mt-button>
					</div>
				</div>-->
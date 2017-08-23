<style scoped="scoped">
	.luck .mint-cell-value {
		padding-right: 40%;
		padding-top: 3px;
	}
	.mint-cell-wrapper{background-image: none;}
	.nav_ten td{padding-top: 12px;}
	/* .mint-swipe-indicator.is-active{opacity: 1;}*/
    /*.mint-swipe-indicators{bottom: 8px;
     z-index: 2;}*/
</style>
<template>
	<div>
		<mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="loading"  @bottom-status-change="handleBottomChange" ref="integral" :auto-fill='false'>
		<mt-swipe :auto="4000" style="height: 150px;">
			<mt-swipe-item v-for="obj in bannerList" @click.native="bannergo(obj)" :showIndicators='bannerList.length>1'>
				<img :src="obj.bqPhotoUrl||''" width="100%" height="100%" @error="$event.target.src=errorBanner" />
					<div v-if='obj.template'  style="position: absolute; bottom: 0;   z-index:  1; width: 100%;background-color: rgba(0,0,0,.4); padding:8px ;  color: #fff;">
						<p style="width: 90%; margin: 0 0 15px;-webkit-line-clamp: 1;font-size: 14px;" class="ellip">{{obj.template}}</p>
					</div>
			</mt-swipe-item>
		</mt-swipe>
		<!--
            	描述：nav
            -->
		<table class="nav_ten">
			<tr>

				<td @click="goto({name:'integral_make'})">
					<img src="./imgs/getjifen.png" />
					<p style="font-size: 13px;">赚积分</p>

				</td>
				<!--scoremine-->
				<td @click="goto({name:'signin'})">
					<img src="./imgs/checkjifen.png" />
					<p style="font-size: 13px;">查积分</p>
				</td>
				<td @click="goto({name:'scorerules'})">
					<img src="./imgs/jifenrules.png" />
					<p style="font-size: 13px;">积分规则</p>
				</td>
				<td @click="goto({name:'integral_order'})">
					<img src="./imgs/dingdan.png" />
					<p style="font-size: 13px;">我的订单</p>
				</td>
			</tr>
		</table>
		<!--<self></self>-->
		<!--<abc></abc>-->
		<div style="margin: 15px 0; background-color: #fff;" class="clearfix">
			<mt-cell title="积分好礼" style="font-size: 13px;color: #666;">
				<img slot="icon" src="./imgs/jifen.png" width="30" height="30" style="margin-bottom: 6px;margin-right: 10px;"/>
			</mt-cell>

				<mt-cell class="fuli">
					<div class="luckly clearfix" slot='title'  >
						<dl  @click="goto({name:'goodsdetail',params: { goodsid: obj.indsId,buyshow:true}})"  v-for="(obj,index) in goodsList" style="width: 49%; margin-bottom: 0px;">
							<dt><img  :src="obj.picUrl||''"  @error="$event.target.src=errorjifen"/></dt>
							<dd>{{obj.indsName}}</dd>
							<dd style="font-size: 12px; color: #666;">所需积分：<span style="color: #FD7B27;">{{obj.integralPrice}}</span></dd>
						</dl>
					</div>
				</mt-cell>
			
		</div>
			<div v-if="loading" style="text-align: center; padding: 10px;margin-top: 8px">
				没有更多数据了
			</div>
		</mt-loadmore>	
	</div>
</template>

<script>
	import errorjifen from './imgs/errorjifen.png'
	import errorBanner from './imgs/errorBanner.png'
	export default {
		name: 'integral',
		data() {
			return {
				count: 10,
				loading: false,
				topStatus: '',
				
				bannerList: [],
				goodsList:[],
				errorBanner: errorBanner,
				bottomStatus: '',
				errorjifen: errorjifen
			};
		},
		created() {
			var self = this
			this.ajax({
				url: '/bannerSet/getByPageNum',
				data: {
					pageNum: 2
				}
			}, function(data) {
				if(data.result) {
					self.bannerList = data.obj
				}
			})
		},
		mounted() {
				this.getgoodsList(0)
		},
		methods: {
			goto(page) {
				this.$router.push(page);
			},
			bannergo(obj) {
				if(obj.bqType==='inner'){
					this.$router.push(obj.route)
				}else if(obj.bqType==='outer'){
					if(!window.plus){
						window.location.href=obj.bqUrl
					}else{
						 this.$router.push({name:'blank',params:{url:obj.bqUrl}})
					}
				}else{
					this.log(obj)
				}
			},
			getgoodsList(start){
				let self=this;
				this.ajax({
					url:'/edouIntegralGoods/pages',
					data:{
						start:start
					},
					type:'get'
				},function(data){
					
					self.count = data.obj.length||0;
					if(data.result){
//						if(data.obj.length==0){
//							
//						}else{
//							
//						}
						self.goodsList=self.goodsList.concat(data.obj)		
						
					}else{
						self.$toast({
							message: data.description,
							position: 'bottom',
						});
					}
				})
			},
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
			loadMore() {
//				setTimeout(()=>{
//				 	this.$refs.integral.bottomStatus ='loading'
//				 	this.$refs.integral.bottomReached =true
//				 	this.$refs.integral.direction='up'
//				 	this.$refs.integral.handleTouchEnd()
//				 },1000)
				setTimeout(()=>{
					if(this.count<10){
						this.loading=true;
					}else{
						this.getgoodsList(this.goodsList.length)
					}
					this.$refs.integral.onBottomLoaded();
				},1000)
			}
		},
	};
</script>

<style lang="css" scoped>
.luckly dl:nth-of-type(odd){margin-right: 5px;}
</style>
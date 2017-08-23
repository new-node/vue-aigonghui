<template>
	<div :style="style" style="">
		<div style="height: 100%;margin-bottom: 45px;background: white;">
			<mt-swipe :auto="4000" style="height: 150px;">
					<!--<img v-show="goodsdetals.picUrlList.length==0" :src="errorpng" width="100%" height="100%"  />-->
				<mt-swipe-item v-for="pic in goodsdetals.picUrlList" v-show="goodsdetals.picUrlList.length!=0">
					<img :src="pic" width="100%" height="100%" @error="$event.target.src=errorpng" />
				</mt-swipe-item>
			</mt-swipe>
			<div style="color: #888888;background: #FFFFFF;padding: 12px 13px;  ">
				<span style="font-size: 15px; color: #222;" class="ellip">{{goodsdetals.indsTitle}}</span>
				<div class=" clearfix" style="font-size: 13px;margin-top: 5px;">
					<span v-if="goodsdetals.goodsPrice!=0">市场价：￥{{goodsdetals.goodsPrice}} &nbsp;&nbsp;</span>
					<span>兑换积分：{{goodsdetals.integralPrice}}</span>
					<span style="float: right;">剩余数量：{{goodsdetals.totalNum||'0'}}{{goodsdetals.indsUom}}</span>
					<!--{{goodsdetals.totalNum}}-->
				</div>
			</div>

			<div style="background: #FFFFFF; margin-top: 15px ">
				<div class="gray"></div>
				<span style="color: #888888;padding: 12px 13px 0; display: inline-block;"> 商品描述(参数)：</span>

				<div style="padding: 10px 0px; font-size: 14px; color: #222; background-repeat: repeat-x;padding: 12px 13px;" class="clearfix mint_line">
					<p>商品名称：{{goodsdetals.indsName}}</p>
					<p>商品品牌：{{goodsdetals.brand}}</p>
					<p>商品描述：{{goodsdetals.indsDescription}}</p>
				</div>
			</div>
			<div class="gray" style="margin-top: 15px"></div>
			<div v-show="goodsdetals.goodsDetail" style="color: #888888;background: #FFFFFF;padding: 12px 13px 12px;  ">
				图文详情
			</div>
			<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
			<div style="overflow: hidden;  font-size: 14px; padding: 10px;padding-top: 0; color: #666; background: #FFFFFF 
    background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
    background-size: 120% 1px;
    background-origin: content-box;
    background-repeat: repeat-x;margin-bottom: 15%; word-wrap:break-word;" v-html="goodsdetals.goodsDetail" class="art_details">

			</div>
		</div>
		<ul class="mui-table-view" style="text-align: center; position: fixed; bottom: 0px; width:100%;" >
			<!--v-if="$route.params.buyshow===true"-->
			<li class="mui-table-view-cell" style="margin: 0 auto;font-size: 16px; padding-bottom:0px;padding-top:0px;">
				<!--<span>市场价：￥{{goodsdetals.goodsPrice}}</span>-->
				<span style="float: left; line-height: 52px;color: #222;">兑换积分：{{goodsdetals.integralPrice}}</span>
				<mt-button :disabled="goodsdetals.totalNum==0" style="margin: 10px 10px;  float: right;color: white;" :class="goodsdetals.totalNum==0 ? 'historyClass' : 'normalClass' " @click.native="goto({name:'integra_sureorderl',params: { goodsid: goodsid }})" size="small">我要兑换</mt-button>
			</li>
		</ul>
	</div>
</template>

<script>
	import errorpng from './imgs/errorpng.png'
	export default {
		data() {
				return {
					style: {
						'height': (document.documentElement.clientHeight - 100) + 'px'
					},
					goodsdetals: '',
					param: {},
					errorpng: errorpng,
					goodsid: this.$route.params.goodsid
				}
			},
			mounted() {
				this.getgoodsdetals();
			},
			watch:{
				$route(){
					if(this.$route.name=='goodsdetail'){
						this.goodsid = this.$route.params.goodsid;
						this.getgoodsdetals();
					}
				}
			},
			methods: {
				goto(page) {
					if(!localStorage.userId){
					this.tologin("")
					return
				}
					this.$router.push(page);
				},
				getgoodsdetals() {
					let self = this;
					this.ajax({
						url: '/edouIntegralGoods/detail',
						data: {
							indsId: this.goodsid,
						},
						type: 'get'
					}, (data) => {
						if(data.result) {
							self.goodsdetals = data.obj;
							sessionStorage.goodsdetals = JSON.stringify(data.obj);
						} else {
							self.$toast({
								message: data.description,
								position: 'bottom',
							});
						}
					})
				},
			},
	}
</script>

<style>
	.mui-table-view {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style: none;
		background-color: #fff;
	}
	
	.mui-table-view-cell {
		position: relative;
		overflow: hidden;
		padding: 11px 15px;
	}
	
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.ellip {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.art_details img {
		width: 100% !important;
		height: 100% !important;
	}
	.normalClass{
		margin: 10px 10px;  float: right;  background: rgb(253, 123, 39);color: white;
	}
	.historyClass{
		margin: 10px 10px;  float: right;  background: #808080;color: white;
	}
	.gray{
		width: 100%;
		height: 12px;
		background: #F7F7F7;
	}
</style>
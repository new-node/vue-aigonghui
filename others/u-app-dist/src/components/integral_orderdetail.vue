<template>
	<div class="intergrald">
		<mt-cell title="  订单状态:" style="margin-bottom: 15px;">
			<span v-show="buyRecordobj.buyStatus==0" style="font-size: 12px;">{{buyRecordobj.indsType=='exchange'?'未使用':'已下单'}}</span>
			<span v-show="buyRecordobj.buyStatus==1" style="font-size: 12px;">{{buyRecordobj.indsType=='exchange'?'已使用':'已发货'}}</span>
			<span v-show="buyRecordobj.buyStatus==2" style="font-size: 12px;">确认收货</span>
		</mt-cell>

		<!--<el-card v-if="buyRecordobj" :body-style="{ padding: '0px' }" style="margin:10px 15px 15px 15px;overflow: hidden;" @click.native="goto({name:'mine_authcode'})">
			<div class="clearfix" style="width: 100%;">
					<p style="margin: 0px 10px 10px;">
						<span style="float: left;">收货人:{{buyRecordobj.contractUser}}</span>
						<span style="float: right;margin-right: 10%;">{{buyRecordobj.tel}}</span>
					</p>
					<div style="margin: 20px;">&nbsp;</div>
					<p style="margin: 10px 10px 10px;">
						<span style="float: left;">收货地址：{{buyRecordobj.detailAdress}}</span>
					</p>
					<div style="margin: 20px;">&nbsp;</div>
					<p style="margin: 10px 10px 10px;">
						<span style="float: left;">{{buyRecordobj.createTime}}</span>
					</p>
					<div style="margin: 20px;">&nbsp;</div>
			</div>
		</el-card>
		-->
		<!--<el-card v-if="buyRecordobj" :body-style="{ padding: '0px' }" style="margin:0 15px 15px 15px;overflow: hidden;" @click.native="goto({name:'mine_authcode'})">
			<div class="clearfix" style="width: 100%;">
				<img :src="buyRecordobj.edouIntegralGoods.picUrl" style="float: left; width: 20%;margin: 10px ;" class="image">

				<div style="float: right; width: 70%;">
					<p style="">{{buyRecordobj.edouIntegralGoods.indsName}}</p>
					<div style="height: 20%;">&nbsp;</div>
					<span style="float: right;margin-right: 10%;">X1{{buyRecordobj.edouIntegralGoods.indsUom}}</span>
					<span style="float: left;">积分：{{buyRecordobj.edouIntegralGoods.integralPrice}}</span>
				</div>
			</div>
		</el-card>-->
		<!--
		<div  v-if="buyRecordobj" class="mui-card"  style="margin: 20px 15px 0px;" >
			<div class="clearfix" style="width: 100%;">
				<img :src="buyRecordobj.edouIntegralGoods.picUrl"   style="width: 40%;margin:8px 5px 8px 8px; background-color: transparent; float: left;" />
					<div style="float: left;width: 55%; position: relative;">
					<p style="margin-left: 10px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical; ">{{buyRecordobj.edouIntegralGoods.indsName}}</p>
					<p style="margin-left: 10px;"><span>积分：{{buyRecordobj.edouIntegralGoods.integralPrice}}</span><span style="margin-left: 30px;"> X1{{buyRecordobj.edouIntegralGoods.indsUom}}</span></p>
					</div>
				
			</div>
		</div>
		-->
		<mt-cell  v-show="buyRecordobj.indsType!='exchange'" :title="buyRecordobj.detailAdress" is-link>
			<div  slot="title">
				<div style="width: 100%;">

					<p style="margin:10px 0px ;" class="clearfix">
						<span style="float: left; font-size: 14px;">收货人:&nbsp;&nbsp;
								<span  style="color: #666; font-size: 12px;">{{buyRecordobj.contractUser}}</span>
						</span>
						<span style="float: right;margin-right: 10%; color: #666;font-size: 12px;">{{buyRecordobj.tel}}</span>
					</p>
					<!--<div style="margin: 20px 10px 0;">&nbsp;</div>-->
					<p style="margin: 10px 0px 10px; line-height: 20px;" class="clearfix">
						<span style="float: left; font-size: 14px;">
								收货地址:&nbsp;&nbsp;
								<span style="color: #666; font-size: 12px;">{{buyRecordobj.detailAdress}}</span>
						</span>
						<!--{{buyRecordobj.createTime}}-->
					</p>
				</div>
			</div>
		</mt-cell>
		<div v-if="buyRecordobj" style="color: #888888;background: #FFFFFF;padding: 12px 13px;margin-top:15px; " @click="goto({name:'goodsdetail',params:{goodsid:buyRecordobj.indsId,buyshow:false}})">
			<div>
				<table width="100%">
					<tr>
						<td width="60px">
							<!-- -->
							<img slot="icon" width="100" height="65" :src="buyRecordobj.edouIntegralGoods.picUrl" @error="$event.target.src=errorpng">
						</td>
						<td>
							<div style="margin-left: 5px;">
								<p style=" margin-top: 8px;margin-bottom:0px; font-size: 16px;  color: #222;">
									{{buyRecordobj.edouIntegralGoods.indsName}}
								<p style="font-size: 14px;margin-top: 8px;color: #8c8c8c;">
									<span>积分：{{buyRecordobj.edouIntegralGoods.integralPrice}}</span>
									<!--X1{{buyRecordobj.edouIntegralGoods.indsUom}}-->
								</p>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div  v-show="buyRecordobj.indsType=='exchange'" style="width: 100%;background: white;">
			<img :src="buyRecordobj.qrcode" @error="$event.target.src=errorpng"  style="display: block;width: 60%;margin: 0 auto;"/>
			<div style="text-align: center;padding-bottom: 30px;">
				<span>券码</span><br>
				{{buyRecordobj.couponCode}}
			</div>
		</div>
	</div>
</template>

<script>
	import errorpng from './imgs/errorpng.png'
	export default {
		data() {
				return {
					buyRecordId: this.$route.params.buyRecordId,
					buyRecordobj: '',
					saoma:false,
					errorpng: errorpng,
				}
			},
			mounted() {
				this.getdetals()
			},
			watch:{
				$route(){
					if(this.$route.name=='integral_orderdetail'){
						this.buyRecordId = this.$route.params.buyRecordId
						this.getdetals()
					}
				}
			},
			computed: {},
			methods: {
				goto(page) {
					this.$router.push(page);
				},
				getdetals() {
					let self = this;
					this.ajax({
						url: '/edouIntegralBuyRecord/getByBuyRecordId',
						data: {
							buyRecordId: this.buyRecordId,
						},
						type: 'get'
					}, (data) => {
						if(data.result) {
							self.buyRecordobj = data.obj;
							if(data.obj.qrcode){
								self.saoma=true;
							}
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

<style lang="less">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	.mint-cell-text {
		font-size: 14px;
	}
	.intergrald{
		
	}
	.intergrald #unionInfo>div:nth-child(2){
		background: red;
	}
	
</style>
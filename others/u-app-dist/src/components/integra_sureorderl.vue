<style>
	.luck .mint-cell-value {
		padding-right: 40%;
		padding-top: 3px;
	}
</style>
<template>
	<div>
		<mt-cell v-if="goodsobj.indsType=='integral'" :title="addrList!=''?(addrList.provinceName+addrList.cityName+addrList.areaName):'你还没有默认收货地址,请去添加'"  @click.native="goto({name:'mine_address'})" :label="addrList!=''?(addrList.detailAdress||''):''"  is-link>
			<div style="height: 40%;" slot="title">
				<div class="clearfix" style="width: 100%;">
					<div v-show="addrList!=''">
						<p v-show="addrList!=''" style="margin: 0px 10px 10px;">
							<span style="float: left;">收货人:&nbsp;&nbsp;<span  style="color: #666;">{{addrList.contractUser}}</span></span>
							<span style="float: right;margin-right: 10%; color: #666;">{{addrList.tel}}</span>
						</p>
						<div style="margin: 20px;">&nbsp;</div>
						<p style="margin: 10px 10px 10px;">
							<span style="float: left;">
								收货地址:&nbsp;&nbsp;<span style="color: #666;">{{addrList!=''?(addrList.provinceName+addrList.cityName+addrList.areaName):'你还没有默认收货地址,请去设置'}}</span>
							</span>
						</p>
					</div>
					<div v-show="addrList==''">
						<p style="margin: 10px 10px 10px;">
							<span style="float: left;color: #666;">
								你还没有默认收货地址,请去设置
							</span>
						</p>
					</div>
					
					<div style="margin: 20px;">&nbsp;</div>
				</div>
			</div>
			
		</mt-cell>
			
			
		<div style="color: #888888;background: #FFFFFF;padding: 12px 13px;margin-top:15px; ">
			<div  @click="back">
				<table width="100%">
						<tr>
							<td width="60px">
								<!-- -->
								<img slot="icon" width="100" height="65" :src="goodsobj.picUrlList&&goodsobj.picUrlList[0]"   @error="$event.target.src=errorpng">
							</td>
							<td>
								<div style="margin-left: 5px;">
									<p style=" margin-top: 8px;margin-bottom:0px; font-size: 16px;  color: #222;">
										{{goodsobj.indsName}}
									<p style="font-size: 14px;margin-top: 8px;color: #8c8c8c;">
										
										<span>积分：{{goodsobj.integralPrice}}</span>
									</p>
								</div>

							</td>
						</tr>
					</table>
			 
			</div>		 
		</div>
		 
		<mt-button  size="large" @click.native="sure()" style=" background: #fd7b27;width: 80%; position: fixed;bottom: 20px;left: 10%;z-index: 3;" type="primary">确认订单</mt-button>
	</div>
</template>

<script>
import errorpng from './imgs/errornews.png'
	export default {
		name: 'demo3',
		data() {
			return {
				 
				addrList:'',
				nber:'',
				goodsid:this.$route.params.goodsid,
				goodsobj:'',
				errorpng:errorpng,
			};
		},
		created(){
			const self=this;
	 
//			if(localStorage.defaultaddress){
//				this.flag=true
//				this.addrList=JSON.parse(localStorage.defaultaddress)||''
//			}else{
				this.ajax({
					url:'/sysUserAdress/getIsDefaultAdressByUserId',
					data:{
						userid:localStorage.userId,
					},
					type:'post'
					},(data)=>{
						
						if(data.result){
							this.addrList=data.obj
						}else{
							 
							
						}
					})
//			}
		},
		mounted() {
			console.log(sessionStorage.goodsdetals)
			this.goodsobj=JSON.parse(sessionStorage.goodsdetals)||''
		},
		methods: {
			goto(page) {
				this.$router.push(page);
			},
			back(){
				history.back()
			},
			sure(){
				let self=this;
				if(this.goodsobj.indsType=='integral'){
					if(this.addrList==''){
						self.$toast({
							message: "先去选个默认地址吧",
							position: 'bottom',
						});
						return ;
					}
				}
					
				this.ajax({
					url:'/edouIntegralBuyRecord/exchangeGoods',
					data:{
						userId:localStorage.userId,
						indsId:this.goodsid||'',
						adressId:self.addrList.adressId||'',
						description:'',
					},
					type:'get'
					},(data)=>{
						self.$toast({
							message: data.description,
							position: 'bottom',
						});
						if(data.result){
							self.$router.back()
						}else{
							
						}
					})
			}
		},

	};
</script>

<style lang="css" >
.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
</style>
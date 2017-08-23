<template>
	<div style="">
		<!--<div style="text-align: center;">
			<div id="ca" style="margin:  0 auto;">
			</div>
		</div>-->
		<table style="width: 100%;max-height: 100px; text-align: center; margin-top: 0;" class="qiandaobg">
			<tr style="height:140px;">
				<td style="width: 20%;">
					<div style="float:left;font-size: 13px; display: none;" @click="goto({name:'integral'})">
						<p><span style="margin-left: 15px;">当前积分:111</span></p>
						<p><span style="margin-left: 15px;">前往积分商城</span></p>
					</div>
				</td>
				<td style="width: 30%;">
					<div @click="signin()" style=" font-size: 12px; position: relative;  width: 140px; height: 140px; margin: 0 auto; " class="qiandaobtn">
						<span v-show="signinState==false" style="position: absolute;right: 9%;top: 38.6%;  width: 80%; font-size: 22px;color: #666;">签到</span>
						<div v-show="signinState==true">
							<span style="position: absolute;right: 29%;top: 28%;font-weight: bold;font-size: 20px; color: #FD7B27;">已签到</span>
							<hr style="position: absolute;right: 20%;top: 45%;  width: 60%;  height:1px;border:none;border-top:1px solid #FD7B27;" />
							<div class="" style="margin:0 auto;position: absolute;right: 32%;top: 58%;">
								<span style="color: #FD7B27; font-size: 14px; ">连续{{signobj.currentSerialCount}}天</span>
							</div>
						</div>
					</div>
				</td>
				<td style="width: 20%;">
					<div style="float:right">
						<p><span style="margin-right: 15px;">&nbsp;</span></p>
						<p><span>&nbsp;</span></p>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<!--<span style="float: left;">累计签到次数：{{signobj.totalSignCount}} 最高连续签到次数：{{signobj.serialSignCount}}</span>-->
					<span style="float: right; margin:0 10px 10px 0;"><span style="color: #fff;">累计获得</span><strong style="font-size: 20px; color: #ffed26;">{{signobj.total||'0'}}</strong><span style="color: #fff;">积分</span></span>
				</td>
			</tr>
		</table>

		<!--<mt-cell @click.native="goto({name:'integral'})" title="积分礼遇" is-link style="color: #666;">
			<span>更多</span>
			<img slot="icon" src="./imgs/jifen.png" width="24" height="24" style="margin-right: 7px;margin-bottom: 4px;">
		</mt-cell>-->

		<!--		
		<el-row :gutter="0" style=" " >
		  <el-col :span="10" v-for="(o, index) in 4 " :offset="(index%2) != 0 ? 2 : 1">
		    <el-card :body-style="{ padding: '0px' }">
		      <img src="./imgs/defaultyhq.png" class="image" style="width: 100%;">
		      <div style="padding: 14px;">
		        <span>好吃的汉堡</span>
		        <div class=" clearfix" style="margin-top: 5px;">
		        	<span>金币:30</span>
		        </div>
		      </div>
		    </el-card>
		    <div style="margin-bottom: 20px;"></div>
		  </el-col>
		</el-row>
		-->

		<!--<mt-cell class="fuli" :gutter="0">
			<div class="luckly clearfix" slot='title' :span="10" v-for="(o, index) in 2 " :offset="(index%2) != 0 ? 2 : 1">
				<dl :body-style="{ padding: '0px' }">
					<dt><img src="./imgs/defaultyhq.png"  @error="$event.target.src=defaultyhq"/></dt>
					<dd>全城欧乐堡梦幻世界（4A）</dd>
					<dd style="font-size: 12px; color: #8c8c8c;">所需积分：300</dd>
				</dl>
				<dl>
					<dt><img src="./imgs/defaultyhq.png"  @error="$event.target.src=defaultyhq"/></dt>
					<dd>全城欧乐堡梦幻世界（4A）</dd>
					<dd style="font-size: 12px; color: #8c8c8c;">所需积分：300</dd>
				</dl>
			</div>
		</mt-cell>-->
		<!--<mt-cell class="fuli">
			<div class="luckly clearfix" slot='title'  >
				<dl  @click="goto({name:'goodsdetail',params: { goodsid: obj.indsId }})"  v-for="(obj,index) in goodsList" style="width: 49%; margin-bottom: 0;">
					<dt><img  :src="obj.picUrl||''"  @error="$event.target.src=errorjifen"/></dt>
					<dd>{{obj.indsName}}</dd>
					<dd style="font-size: 12px; color: #666;">所需积分：{{obj.totalNum}}</dd>
				</dl>
			</div>
		</mt-cell>-->
		<table class="nav_ten">
			<tr>
				<td @click="goto({name:'integral_make'})">
					<img src="./imgs/getjifen.png" style="width: 50%;"  />
					<p style="font-size: 13px;">我的积分</p>
				</td>
				<!--scoremine-->
				<!--<td @click="goto({name:'signin'})">
					<img src="./imgs/checkjifen.png" />
					<p style="font-size: 13px;">查积分</p>
				</td>-->
				<td @click="goto({name:'scorerules'})">
					<img src="./imgs/jifenrules.png" style="width: 50%;" />
					<p style="font-size: 13px;">积分规则</p>
				</td>
				<td @click="goto({name:'integral_order'})">
					<img src="./imgs/dingdan.png" style="width: 50%;" />
					<p style="font-size: 13px;">我的订单</p>
				</td>
			</tr>
		</table>
		<div style="margin: 15px 0; background-color: #fff;" class="clearfix">
			<mt-cell title="积分好礼" style="font-size: 13px;color: #666;">
				<img slot="icon" src="./imgs/jifen.png" width="30" height="30" style="margin-bottom: 6px;margin-right: 10px;"/>
			</mt-cell>
			<div class="luckly clearfix"  style="margin-bottom: 25px;">
				<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="">
					<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check='false' style="padding-bottom: 25px;">
						<div style="padding: 0px 5px;margin: 0px 0px 0 0px; background-color: #fff;" class="clearfix">
							<dl  @click="goto({name:'goodsdetail',params: { goodsid: obj.indsId,buyshow:true,indstype:obj.indsType}})"  v-for="(obj,index) in goodsList" style="width: 49%; margin-bottom: 0px;">
								<dt><img  :src="obj.picUrl||''"  @error="$event.target.src=errorjifen"/></dt>
								<dd class="jifenTitle" style="height: 48px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px;font-size: 14px;font-weight: normal;color: #666666;">
									{{obj.indsName}}
								</dd>
								<dd style="font-size: 12px; color: #666;">所需积分：<span style="color: #FD7B27;">{{obj.integralPrice}}</span></dd>
							</dl>
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
		</div>
	</div>
</template>

<script>
	//import calendar from './template/calendar'
import errorjifen from './imgs/errorjifen.png'
	export default {
		data() {
				return {
					signinState: false,

					signobj: '',
					signobj1: '',
					goodsList:[],
					errorjifen:errorjifen,
					
					count:10,//
				    loading:false,//是否加载更多
	        		allLoaded: false,
	       			wrapperHeight: 0,
	       			userId:localStorage.userId,
				}
			},
			created(){
				this.getgoodsList(0)
				
				if(!localStorage.userId){
					this.tologin("")
				}else{
					this.getdata()
				}
			},
			mounted() {
				this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
				//self.ajax(util.getdate("yyyy-MM-dd"));
			},
			watch:{
				$route(val,oldVal){
					console.log(val.name+"..."+oldVal.name)
					if(oldVal.name=="integral_make" || oldVal.name=="scorerules" || oldVal.name=="integral_order" || oldVal.name=="goodsdetail"){
						return
					}
					if(this.$route.name=='signin'){
						this.signinState = false

						this.signobj = ''
						this.signobj1 = ''
						this.goodsList = []
						this.errorjifen = errorjifen
						
						this.count = 10
					    this.loading = false
		        		this.allLoaded = false
		       			this.wrapperHeight = 0
		       			this.userId = localStorage.userId
		       			this.getgoodsList(0)
				
						if(!localStorage.userId){
							this.tologin("")
						}else{
							this.getdata()
						}
						this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
					}
				}
			},
			methods: {
				
				getgoodsList(param){
					let self=this;
					this.ajax({
						url:'/edouIntegralGoods/pages',
						data:{
							start:param,
						},
						type:'get'
					},function(data){
						
						//self.count = data.obj.length||0;
						if(data.result){
							console.log(data)
							self.goodsList=self.goodsList.concat(data.obj)	
							self.count = data.obj.length;
							console.log(self.count)
						}else{
							self.count=0;
							console.log('222222')
							//self.allLoaded=true;
						}
					})
				},
				signinajax() {
					let self = this;
					this.ajax({
						url: '/edouUserIntegral/ruleHandle',
						data: {
							userId: self.userId,
						},
						type: 'post'
					}, (data) => {
						
						if(data.result) {
							self.signobj = data.obj;
							self.signinState = true;
						} else {
//							self.$toast({
//								message: data.description,
//								position: 'bottom',
//							});
						}
					})
				},
				loadMore() {
					console.log('loadmore')
					this.loading = true;
					setTimeout(()=>{
						if(this.count<10){
							console.log('没了')
							this.allLoaded=true;
						}else{
							if(this.goodsList.length!=0){
								console.log("list总长度"+this.goodsList.length)
								this.getgoodsList(this.goodsList.length)
							}
						}
						this.loading = false;
					 },2000)
				},
				getdata() {
					let self = this;
					this.ajax({
						url: '/edouUserIntegral/getIntegralsCurrSta',
						data: {
							userId: self.userId,
						},
						type: 'get'
					}, (data) => {
						if(data.result) {
							self.signobj = data.obj;
							self.signinState = data.obj.currSignStatus;
						} else {
							self.$toast({
								message: data.description,
								position: 'bottom',
							});
						}
					})
				},
				goto(page) {
					this.$router.push(page);
				},
				signin() {
					if(this.signinState) {
						return;
					} else {
						if(localStorage.userId){
							this.signinajax()
							
						}else{
							this.tologin("")
							return ;
						}
							//						this.signinState=true;
					}
				},
			},

	}
</script>

<style scoped>
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
	
	.qiandaobg {
		background: url(./imgs/qiandaobg.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.qiandaobtn {
		background: url(./imgs/qiandaobtn.png) no-repeat;
		background-size: 100% 100%;
	}
	.luckly dl:nth-of-type(odd){margin-right: 5px;}
	.luckly dl dt{
		width: 100%;
		height: 83px;
	}
	.luckly dl dt img{
		width: 100%;
		height: 100%;
	}
	.jifenTitle{
		
	}
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
</style>
<style>
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	.nav_ten {
		border-collapse: collapse;
		width: 100%;
		text-align: center;
		background: white;
	}
	
	.nav_ten,
	.nav_ten tr,
	.nav_ten td {
		border: none;
	}
	
	.nav_ten p {
		color: #666;
		font-size: 13px;
		margin: 0px;
	}
	
	.nav_ten td {
		padding: 8px 5px;
	}
	
	.nav_ten td img {
		width: 60%;
	}
	
	.new_one i {
		display: none;
	}
	
	.new_one .mint-cell-title .mint-cell-text {
		font-size: 14px;
	}
	
	.new_one .mint-cell-value.is-link {
		width: 25%;
		margin: 0 0 0 3px;
	}
	
	.luckly img {
		width: 100%;
		/*height: 100%;*/
	}
	
	.luckly dd {
		margin: 0;
		font-size: 15px;
		line-height: 20px;
		padding-top: 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.luckly dl {
		float: left;
		padding: 4px;
		padding-bottom: 0;
		width: 50%;
		margin-top: 8px;
		margin-bottom: 0;
	}
	/*.ssss {
		font-size: 13px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #666;
	}*/
	
	.more .mint-cell-text {
		margin-left: 20px;
		font-size: 13px;
	}
	
	.morenews .mint-cell-wrapper {
		padding-left: 5px;
	}
	
	.more .mint-cell-wrapper {
		background-repeat: repeat-x;
	}
	
	.fuli_border .mint-cell-wrapper {
		background-image: linear-gradient(180deg, #fff, #fff 0%, transparent 50%);
	}
	
	.mint-cell:last-child {
		background-size: 0% 0px;
	}
	
	.worker .mint-cell-title span {
		margin-top: 2px;
		display: inline-block;
	}
	
	.bornone .mint-cell-wrapper {
		background-image: none;
	}
	
	.bornone .mint-cell-text {
		color: #666;
	}
	
	.bornone .mint-cell-value span{
		font-size: 14px;
		
	}
	
	.ssss {
		animation: move 3s ease infinite;
	}
	
	@keyframes move {
		/*  此处从75%开始 */
		/*0%{ transform: translateY(0px);}*/
		75% {
			transform: translateY( 0px);
		}
		100% {
			transform: translateY( -50px);
		}
	}
	
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
	
	.mint_line {
		background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
		background-size: 120% 1px;
		background-origin: content-box;
		background-repeat: no-repeat;
	}
	
	.mint-swipe-indicator.is-active {
		opacity: 1;
	}
	
	.mint-swipe-indicators {
		bottom: 8px;
		width: 100%;
		text-align: right;
		z-index: 999;
		padding-right: 8px;
	}
	
	.ellips {
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap:break-word; 
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		line-height: 20px;
	}
	.homepage .answer{
		background-color: #f4f5f7;
		width:100% ;
		position: relative;
		padding: 0px 10px;
		height: auto;
	}
	.homepage .triggle{
		width: 25px;
		height: 10px;
		position: absolute;
		left: 15px;
		top: -10px;
		background-image: url(./imgs/littletip.png);
		background-size: 100% 100%;
		background-repeat:no-repeat ;
	}
	.homepage .myanswer{
		overflow: hidden; 
		margin: 3px 0; 
		font-size: 15px; 
		word-wrap:break-word; 
		color:#555;
	}
	#miss{
		position: absolute;
		left: 0;
		width: 100%;
		top: 20px;
		margin: 0 auto;
	}
	.missPage{
		width: 210px;
		height: 210px;
		margin: 0 auto;
		margin-top: 100px;
	}
	.missPage img{
		width: 100%;
		height: 100%;
	}
	.missText{
		text-align: center;
	}
	.missText h3{
		color: #999;
		font-weight: normal;
		
	}
	.retry{
		width: 150px;
		margin:0 auto;
		border: 1px solid #FD7B27;
		border-radius: 5px;
		margin-top: 10px;
	}
	.retry h3{
		margin: 5px;
		padding: 0;
		color: #FD6F27;
	}
	
</style>

<template>
	<div class="homepage">
		<mt-loadmore :top-method="loadTop" ref="homepage">
			<mt-swipe :auto="4000" style="height: 150px;" :showIndicators='bannerList.length>1'>
				<mt-swipe-item v-for="obj in bannerList" v-if='obj.bannerPostionY===1' @click.native="bannergo(obj)">
					<img :src="obj.bqPhotoUrl||''" width="100%" height="100%" @error="$event.target.src=errorBanner" />
					<div v-if='obj.template' style="position: absolute; bottom: 0;   z-index:  11; width: 100%;background-color: rgba(0,0,0,.4); padding:8px ;  color: #fff;">
						<p style="width: 90%; margin: 0;-webkit-line-clamp: 1;font-size: 14px;" class="ellip">{{obj.template}}</p>
					</div>
				</mt-swipe-item>
			</mt-swipe>
			<table class="nav_ten">
				<tr>
					<td @click="goto({name:obj.internalUrl,params:{title:obj.functionName,id:obj.params,unionId:73}})" v-for="obj in moduleListL" v-if='obj.postionY===1' style="padding-top:15px ;">
						<img :src="obj.iconUrl" @error="$event.target.src=errorpng" />
						<p>{{obj.functionName}}</p>
					</td>
				</tr>
				<tr style="padding-bottom: 10px;">
					<td @click="goto({name:obj.internalUrl,params:{title:obj.functionName,id:obj.params,unionId:73}})" v-for="obj in moduleListL" v-if='obj.postionY===2' style="padding-bottom:15px ;">
						<img :src="obj.iconUrl" @error="$event.target.src=errorpng" />
						<p>{{obj.functionName}}</p>
					</td>
				</tr>
			</table>
			<div style=" background-color: #fff;margin-top: 15px;margin-bottom: 15px;" class="clearfix " v-show="recommend.first.list.length>0">
				<mt-cell :title="recommend.first.name" class="bornone" value="更多" is-link @click.native="goto({name: recommend.first.url,params:{title:recommend.first.name,id:recommend.first.id,unionId:73}})">
					<img slot="icon" src="./imgs/ghzixun.png" width="24" height="24" style="margin-right: 7px;">
				</mt-cell>
				<mt-cell is-link v-for='obj in recommend.first.list' @click.native="goto({name:'details',params:{detailId:obj.detailId,title:obj.detailTitle}})">
					<div slot='title'>
						<table>
							<tr>
								<td>
									<img slot="icon" :src="obj.iconUrl||''" width="100" height="65" @error="$event.target.src=errornews">
								</td>
								<td style="width: 100%;">
									<div style="margin-left: 3px;">
										<p style=" margin-top: 13px;margin-bottom:10px; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px; color: #222; height: 40px;">
											{{obj.detailTitle}}
										</p>
										<p style="font-size: 12px;margin-top: 8px;color: #8c8c8c;width: ;">
											{{obj.createTime}}
											<span style="display: block;float: right;width: 4.2rem;height:13px;text-align: left;white-space: nowrap;overflow: hidden;">阅读量:{{obj.viewCount}}</span>
										</p>
										<div style="clear: both;height: 0;line-height: 0;"></div>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</mt-cell>
				<!--<mt-cell title="查看更多资讯" @click.native="goto({name: recommend.first.url,params:{title:recommend.first.name,id:recommend.first.id,unionId:73}})" is-link style="text-align: center;color: #666666; font-size: 13px;" class="more morenews"></mt-cell>-->
			</div>
			<div style="background: white;
			    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
			    background-size: 120% 1px;
			    background-repeat: no-repeat;overflow: hidden;height: 50px;position: relative" v-show="recommend.second.list.length>0">
				<img src="./imgs/news2.png" style=" position: absolute;top:15px;left:15px;width: 60px; height: 18px;">
				<div id='demo' style=" left: 76px;top:5px;position: absolute;overflow:hidden;height: 50px;">
					<ul id='demo1' class="mui-table-view">
						<li class="mui-table-view-cell" style="height: 50px; " v-for='obj in recommend.second.list' @click="goto({name:'details',params:{detailId:obj.detailId,title:obj.detailTitle}})">
							<span style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;"> {{obj.detailTitle}}</span>
						</li>
					</ul>
					<ul id='demo2' class="mui-table-view">

					</ul>
				</div>
				<!--<table  style="display: inline-block; left: 70px;position: absolute;width: 100%">
					<tr   style="height: 50px;width: 100%" align="center" class="ssss " @click="goto({name:'details',params:{detailId:carousel.detailId,title:carousel.detailTitle}})">
						<td >
							<span style=" font-size: 14px;">{{carousel.detailTitle}}</span>
						</td>
					</tr>
				</table>-->
			</div>
			<mt-swipe :auto="4000" style="height: 150px;">
				<mt-swipe-item v-for="obj in bannerList" v-if='obj.bannerPostionY===2' @click.native="bannergo(obj)">
					<img :src="obj.bqPhotoUrl||''" width="100%" height="100%" @error="$event.target.src=errorBanner" />
				</mt-swipe-item>
			</mt-swipe>

			<div style="margin: 0; background-color: #fff;" class="clearfix" v-show="recommend.third.list.length>0">
				<mt-cell :title="recommend.third.name" class="fuli_border bornone"  value="更多" is-link @click.native="goto({name:'activity'})"> 
					<img slot="icon" src="./imgs/huifuli.png" width="24" height="24" style="margin-right: 7px;">
				</mt-cell>
				<mt-cell class="fuli">
					<div class="luckly clearfix" slot='title'>
						<dl v-for='obj in recommend.third.list' @click="goto({name:'activityDetails',params:{title:obj.detailTitle,id:obj.activitiesDetailId,isHistory:false}})">
							<dt>
								<div style="width: auto;height: 70px;overflow: hidden;">
									<img :src="obj.poster||''"   @error="$event.target.src=errorjifen" />
								</div>
							</dt>
							<dd style="height: 48px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{obj.detailTitle}}</dd>
							<dd style="font-size: 12px; color: #8c8c8c; height: 38px;">截止日期：{{obj.activityEndTime | formatDate('yyyy-MM-dd')}}</dd>
						</dl>
					</div>
				</mt-cell>
				<!--<mt-cell title="查看更多福利" @click.native="goto({name:'activity'})" is-link style="text-align: center;color:  #666666; font-size: 13px;" class="more"></mt-cell>-->
			</div>
            
            <div style="margin:15px 0 0 0; background-color: #fff;" class="clearfix" v-show="goodsList.length>0">
            	<mt-cell title="惠抢购" class="fuli_border bornone"  value="更多" is-link @click.native="goodsLink('list')">
					<img slot="icon" src="./imgs/huiqianggou.png" width="24" height="24" style="margin-right: 7px;">
				</mt-cell>
				<mt-cell v-for='obj in goodsList' @click.native="goodsLink('detail',obj.Id)">
					<div slot='title' style="padding: 10px 0px;">
						<table>
							<tr>
								<td>
									<div style="width: 120px; height:100px; overflow: hidden;">
										<img slot="icon" :src="obj.Thumb"  style="width: 100%; height: 100%;" @error="$event.target.src=errornews">
									</div>									
								</td>
								<td style="width: 100%;">
									<div style="margin-left: 3px;position: relative;">
										<p style=" margin: 0; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px; color: #222; height: 40px;">
											{{obj.Title}}
										</p>
										<p style=" font-size: 14px; margin: 5px 0; color: #F63F2D; overflow: auto; line-height: 32px;">											
											<mt-button  size="small" style="float: right; width:80px;  box-shadow: none; margin-right: 5px;background-color: #F63F2D;color: white;">
				    		 					立即抢购
				    		 				</mt-button>
											已抢购{{obj.Salesreal}}件
										</p>
										<p style="font-size: 14px;margin: 0; ">
											<span style="color: #F63F2D;">￥{{obj.Marketprice}}</span>
											<span style="text-decoration: line-through; margin-left: 10px; color: #CACACA;">￥{{obj.Productprice}}</span>
										</p>
										<!--<mt-button  size="small" style="position: absolute;right: 6px;top: 46%; width:80px;  box-shadow: none;background-color: #F63F2D;color: white;">
			    		 					立即抢购
			    		 				</mt-button>-->
									</div>

								</td>
							</tr>
						</table>
					</div>
				</mt-cell>
				<!--<mt-cell title="查看更多商品" @click.native="goodsLink('list')" is-link style="text-align: center;color:  #666666; font-size: 13px;" class="more"></mt-cell>-->
            </div>

			<div style="margin: 15px 0; background-color: #fff;" class="clearfix" v-show="recommend.fouth.list.length>0">
				<mt-cell :title="recommend.fouth.name" class="worker bornone" style=""  value="更多" is-link @click.native="goto({name: recommend.fouth.url,params:{title:recommend.fouth.name,id:recommend.fouth.id}})">
					<img slot="icon" src="./imgs/zhigongshequ.png" width="24" height="24" style="margin-right: 7px;">
				</mt-cell>
				<hr style="margin-left: 10px;font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
				
				
				<div v-for="(obj, index) in recommend.fouth.list" style="background-color: #fff;">
					<div style="padding:5px;">
						<div style="float: left; margin: 14px 10px 0 5px">
							<img :src="obj.photoUrl||''" @error="$event.target.src=defaulthead" style="height: 36px;width: 36px; border-radius: 50%;">
						</div>
						<div style="line-height: 4px;">
							<p style="font-size:13px"><span style="margin-top: 10px; display: inline-block;">{{obj.isAnonymous?obj.tmpName||'匿名用户':obj.userRealname||obj.userName}}</span></p>
							<span style="color: #8c8c8c;font-size:12px">{{obj.createTime| formatDate}}</span>
						</div>
					</div>
					<div class="clearfix" style="margin-top: 12px; padding: 0 10px 15px 0;">
						<p style="font-size: 17px; margin: 0;color: #222;padding: 0 15px 0 15px ;">{{obj.sqShort}}</p>
						<p class="ellips" style="margin: 5px 0 -3px; font-size: 15px;color: #666; word-wrap:break-word;padding: 0 15px 0 15px ;" v-html="obj.sqContext"></p>
					</div>
					
					<div class="answer" v-show="obj.answerContent">
						<!--v-show="obj.answerContent"-->
						<div class="triggle"></div>
						<div>
							<div style="float: left; margin: 8px 10px 0 5px">
								<img :src="obj.answerPhotoUrl||''" @error="$event.target.src=head_active" style="height: 36px;width: 36px; border-radius: 50%;">
							</div>
							<div style="line-height: 4px;">
								<p style="font-size:13px"><span style="margin-top: 15px; display: inline-block;">{{obj.answerUserRealname}}</span></p>
								<span style="color: #8c8c8c;font-size:12px">{{obj.answerCreateTime| formatDate}}</span>
							</div>
						</div>
						<div class="clearfix" style="margin-top: 10px;padding: 0 10px 25px 0;position: relative;">
							<p class="ellips myanswer" ref="myanswershort" v-html="obj.answerContent?(obj.answerContent.length>80?(obj.answerContent.substring(0,80)+'...'):obj.answerContent.substring(0,80)):''" style="display:block;width:100%;height: auto;margin: 5px 0 -3px; font-size: 15px;color: #666;">
								<!--v-html="obj.answerContent"-->
							</p>
							<p class="ellips myanswer" ref="myanswertotal" v-html="obj.answerContent" style="display: none;width: 100%;height: auto;margin: 5px 0 -3px; font-size: 15px;color: #666;">
								<!--v-html="obj.answerContent"-->
							</p>
							<p class="opentext" @click="show_all(index)" ref="open"  v-show="obj.answerContent && obj.answerContent.length>80"  style="position: absolute;right: 15px;bottom: -1px;color:#999999;font-size: 12px;display: none;padding-bottom: 0;margin-bottom: 5px;">
								展开
								<img src="./imgs/arrowb.png" />
							</p>
							<p class="opentext" @click="hide_all(index)" ref="hide" style="position: absolute;right: 15px;bottom: -1px;color:#999999;font-size: 12px;display: none;">
								收起
								<img src="./imgs/arrowt.png" />
							</p>
							<!--<p style="color: #8c8c8c; margin: 5px 0 3px;font-size: 12px;"></p>-->
						</div>
					</div>
					<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
				</div>
				<!--<mt-cell title="查看更多热门帖子" @click.native="goto({name: recommend.fouth.url,params:{title:recommend.fouth.name,id:recommend.fouth.id}})" is-link style="text-align: center;color:  #666666; font-size: 13px;" class="more"></mt-cell>-->
			</div>
		</mt-loadmore>
		<div id="miss" v-if="offLine == true || offLine == 'true'">
			<div class="missPage">
				<img src="./imgs/missPage.png" />
			</div>
			<div class="missText">
				<h3>呀，页面出错啦！</h3>
			</div>
			<div class="missText retry" @click.native="retry()">
				<h3>请检查网络</h3>
			</div>
		</div>
	</div>
</template>
<script>
	import errorjifen from './imgs/errorjifen.png'
	import errorBanner from './imgs/errorBanner.png'
	import defaulthead from './imgs/defaulthead.png'
	import head_active from './imgs/head_active.png'
	import errornews from './imgs/errornews.png'
	//	import defaultyhq from './imgs/defaultyhq.png'
	let lun = null;
	export default {
		name: 'homepage',
		data() {
			return {
				offLine:false,	
				
				bannerList: [],
				//				bannerList2: [],
				errornews: errornews,
				errorBanner: errorBanner,
				defaulthead: defaulthead,
				head_active:head_active,
				errorjifen:errorjifen,
				moduleListL: [],
				carousel: '',
				recommend: {
					first: {
						name: '',
						list: []
					},
					second: {
						name: '',
						list: []
					},
					third: {
						name: '',
						list: []
					},
					fouth: {
						name: '',
						list: []
					}
				},
				goodsList:[]
			};
		},

		created() {
			this.pageInit();
			var self = this;
//			console.log('')
//			if(window.plus){
//				console.log('app环境')
//				self.checkNet()
//			}else{
//				console.log('网页环境')
//				document.addEventListener('plusready',function(){
//					self.checkNet()
//				})
//			}
		},
		mounted(){
			
		},
		methods: {
			checkNet(){
				console.log('开始检查网络环境')
				//监听手机网络状态
//				var nt = plus.networkinfo.getCurrentType();
//			    if(nt == 0 || nt == 1){
//			        console.log('无法连接网络')
//			        this.outLine=true
//			        console.log(this.outLine)
//			    }else{
//			        console.log('有网')
//			        this.outLine=false
//			        console.log(this.outLine)
//			    }
//				document.addEventListener("netchange", function(){
//			        switch ( nt ) {
//			            case plus.networkinfo.CONNECTION_ETHERNET:
//			            case plus.networkinfo.CONNECTION_WIFI:
//			            console.log("切换到wifi!")
//			            this.outLine=false
//			            console.log('outLine已转')
//			            break; 
//			            case plus.networkinfo.CONNECTION_CELL2G:
//			            case plus.networkinfo.CONNECTION_CELL3G:
//			            case plus.networkinfo.CONNECTION_CELL4G:
//			            console.log("切换到4G网络!")
//			            this.outLine=false
//			            console.log('outLine已转')
//			            break; 
//			            default:
//			            console.log("无网络!")
//			            this.outLine = true
//			            console.log('outLine已转')
//			            break;
//			        }
//			    }, false );
			},
//			retry(){
//				console.log('111')
//				this.$router.push({
//					name: 'homepage'
//				})
//			},
			show_all(index){
				for (var i=0;i<this.recommend.fouth.list.length;i++) {
					if(this.$refs.myanswershort[index].style.display='none'){
						this.$refs.myanswertotal[index].style.display='block';
					}
				}
				this.$refs.open[index].style.display='none';//让展开按钮隐藏
				this.$refs.hide[index].style.display='block';//让收起按钮显示
			},
			hide_all(index){
				for (var i=0;i<this.recommend.fouth.list.length;i++) {
					if(this.$refs.myanswershort[index].style.display='block'){
						this.$refs.myanswertotal[index].style.display='none';
					}
				}
				this.$refs.open[index].style.display='block';//让展开按钮隐藏
				this.$refs.hide[index].style.display='none';//让收起按钮显示
			},
			pageInit() {
				var self = this;
				this.ajax({
					url: '/bannerSet/getByPageNum',
					type:"GET",
					data: {
						pageNum: 1
					}
				}, function(data) {
					if(data.result) {
						//console.log(data)
						self.bannerList = data.obj
						
					}else{
						//console.log('111')
					}
				})
				this.ajax({
					url: '/sysMainFunction/getAll',
					type:"GET",
				}, function(data) {
					if(data.result) {
						self.moduleListL = data.obj
					}
				})
				this.ajax({
					url: '/sysInfoDetail/promoteList',
					type:"GET",
				}, function(data) {
					if(data.result) {
						self.recommend = data.obj
						self.$nextTick(function() {
							self.lunbo(50)
						})
					}
				})
				this.getGoodsList()//获取商品集合
			},
			getGoodsList(){//获取商品集合
				var self=this;
				this.ajax({
					url: '/shopGoods/getTopTen',
					type:"GET",
				}, function(data) {
					if(data.result) {
						self.goodsList = data.obj
					}
				})
			},
			goto(page) {
				if(page.name) {
					this.$router.push(page)
				} else {
					this.$toast("该版块暂未开通")
				}
			},
			loadTop() {
				if(lun) {
					clearTimeout(lun)
				}
				this.pageInit()
				var self = this

				this.log(this.$refs.homepage)
				setTimeout(() => {
					this.$refs.homepage.topStatus = 'pull'
					this.$refs.homepage.direction = 'down'
					this.$refs.homepage.handleTouchEnd()
				}, 2000)

			},
			lunbo(time) {
				const self = this;
				var demo1 = document.getElementById("demo1")
				var demo2 = document.getElementById("demo2")
				var demo = document.getElementById("demo")
				if(!demo) {
					return
				}
				demo2.innerHTML = demo1.innerHTML
				lun = setTimeout(function() {
					if(demo2.offsetTop - demo.scrollTop <= 0) {
						demo.scrollTop -= demo1.offsetHeight
					} else {
						demo.scrollTop += 1
					}
					if(demo.scrollTop % 50 === 0) {
						self.lunbo(2000)
					} else {
						self.lunbo(10)
					}
				}, time)
			},
			bannergo(obj) {
				if(obj.bqType === 'inner') {
					if(obj.route && obj.route.params && obj.route.params.id && obj.route.params.id!=''){
						this.$router.push(obj.route)
					}else{
						return
					}
				} else if(obj.bqType === 'outer') {
					if(!obj.bqUrl || obj.bqUrl==''){
						return ''
					}
					if(!window.plus) {
						window.location.href = obj.bqUrl
					} else {
						//分享内容
						var shareObj={
							href:obj.bqUrl,
							title:obj.template,
							content:obj.template,
							thumbs:[obj.bqPhotoUrl],
							pictures:[obj.bqPhotoUrl],
							contentType:10,
							detailId:obj.bannerId
	 
						}						
						sessionStorage.shareInfo=JSON.stringify(shareObj)
						this.$router.push({
							name: 'blank',
							params: {
								url: obj.bqUrl,
								title:obj.template,
								share:true
							}
						})
					}
				} else {
					this.log(obj)
				}
			},
			goodsLink(type,id){//商品详情
				var url="";
				if(type==="detail")
				{
					if(!id || id===''){
						return
					}					
					url="http://weixin.zb12351.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods.detail&id="+id
				}
				else if(type="list"){
					url="http://weixin.zb12351.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=goods"
				}
				if(!window.plus) {
						window.location.href = url
					} else {
						this.$router.push({
							name: 'blank',
							params: {
								url: url,
								title:"惠购"
							}
						})
					}
				
			},
			

		}
	};
</script>
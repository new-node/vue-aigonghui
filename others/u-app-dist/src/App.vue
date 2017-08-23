<template>
	<div id="app">
		<router-view name="guide"></router-view>
		<header class="mint-header is-fixed" v-if="$route.meta.headershow!==false" style=" background: rgb(253, 123, 39);height: 46px; z-index: 3;">
			<div class="mint-header-button is-left">
				<a>
					<button class="mint-button mint-button--default mint-button--normal" @click="back" v-show="$route.meta.backShow===undefined">
	    				<span class="mint-button-icon">
	    					<i class="mintui mintui-back"></i>
	    				</span>
	    				<label class="mint-button-text">返回</label>
    				</button>
					<img src="./components/imgs/xx.png" @click="goto({name:'message'})" width="23px" height="23px" v-show="$route.meta.backShow===false">
				</a>
			</div>
			<h1 class="mint-header-title" style="display:block;font-size: 16px;max-width: 70%;">
    			{{$route.meta.title}}
    		</h1>
    		<!--<h1 style="font-size: 16px;font-weight:normal;display:block; width: 60%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;>
    			{{$route.meta.title}}
    		</h1>-->
			<div class="mint-header-button is-right">
				<a v-show="$route.meta.backShow===false" @click="goto({name:'signin'})">
					<img src="./components/imgs/qd.png" width="23px" height="23px">
				</a>
				<a v-show="$route.meta.search&&$route.meta.title!='职工社区'" @click="goto({name:'searchpage',params:{sicId:$route.params.sicId || $route.params.id}})">
					<img src="./components/imgs/search.png" width="23px" height="23px">
				</a>
				<a v-show="$route.name=='worker_say'" @click="goto({name:$route.name=='worker_say'?'workersay_main':'fatie',params:{qasmId:$route.params.qasmId||$route.params.id,title:$route.meta.title}},true)">
					<img src="./components/imgs/say.png" width="23px" height="23px">
				</a>
				<a v-show="$route.name=='join'" @click="goto({name:'mine_approve'})">
					进度查询
				</a>
				<a v-show="$route.name=='login'" @click="goto({name:'login_find_password',params: { title: '注册' }})">
					注册
				</a>
				<a v-show="$route.name=='volunteer'" @click="goto({name:'mine_volunteer_collection',params: {id:$route.params.id, title: '我的收藏' }})">
					<img src="./components/imgs/vol-collection.png" width="23px" height="23px">
				</a>
				<a v-show="$route.name=='unionforum'" @click="goto({name:'fatie',params:{qasmId:$route.params.sicId,title:$route.meta.title}})">
					发布
				</a>
				<a v-show="$route.name=='wish'" @click="goto({name:'mine_publish_wish',params:{wish_type:'mine_publish_wish'}})">
					我的心愿
				</a>
				<a v-show="$route.name=='news_apply'" @click="goto({name:'difficult_progress'})">
					状态查询
				</a>
			</div>
		</header>

		<!--<transition   :name="$route.meta.headershow===false?'':'in-out-translate-fade'">-->
		<!--<keep-alive>-->   <!--&& $route.meta.showShare!=true-->
		<router-view style="margin-top: 46px;"></router-view>
		<!--</keep-alive>-->

		<!--</transition>-->

		<mt-popup v-model="popupVisible" position="bottom" style='width: 100%;'>
			<div class="share">
				<img src="./components/imgs/wechat.png" @click='share("weixin","WXSceneSession")' />
				<img src="./components/imgs/wechat_moment.png" @click='share("weixin","WXSceneTimeline")' />
				<img src="./components/imgs/qq .png" @click='share("qq")' />
				<!--<img src="./components/imgs/sina.png"  @click='share("sinaweibo")'/>-->
			</div>

		</mt-popup>
	</div>
</template>
<script>
var backButtonPress = null;
import statistic from './routerconfig/statistic'
	export default {
		name: 'app',
		data() {
			return {
				inspect:false ,
				statistic:statistic,
			}
		},
		computed: {
			popupVisible: {
				get() {
					return this.$store.state.popupVisible
				},
				set(value) {
					this.$store.commit('updatePopupVisible', value)
				}
			},
			shares() {
				return this.$store.state.shares
			}
		},
		created(){
			this.accountEffective()
		},
		watch: {
			$route(newVal,oldVal){
				var self=this;
				if(newVal.name!='guide'){
					if(window.plus){
						//处理事件统计
				    	self.eventStatistic();
					}
					else{
						document.addEventListener('plusready',function(){
							//处理事件统计
							self.eventStatistic();
						})
					}
				}
			}
		},
		mounted() {
			var self = this;
			function isEmptyObject(obj){
		        for(var key in obj){
		            return false
		        };
		       return true
		    }
			window.JumpPage = function(obj) {
				self.$router.push(obj)
				plus.webview.getWebviewById('blank').close();
			}

			if(window.plus){
				this.pageInt()
			}else{
				document.addEventListener('plusready',function(){
					self.pageInt()
				});
				// 处理从后台恢复
				document.addEventListener('newintent',function(){
				    console.log("addEventListener: newintent");
				    checkArguments();
				},false);
			}
		},
		methods: {
		accountEffective() {
				if(localStorage.userId){
					this.ajax({
					url: '/sysUserInfo/getUserSta',
					data: {
						userId: localStorage.userId
					},
					type: 'get'
				}, (data) => {
					if(data.result) {

					}else{
						localStorage.removeItem('userId');
						localStorage.removeItem('userPhone');

						localStorage.removeItem('bindcard');
						localStorage.removeItem('bindstate');

						localStorage.removeItem('userName');
						localStorage.removeItem('userSex');
						localStorage.removeItem('headurl');

					    localStorage.removeItem('isFormal');
						localStorage.removeItem('canTransfer');
						localStorage.removeItem('isFormaldes');
						localStorage.removeItem('transferdes');
					}

				})
				}

			},
			pageInt(){
				var self = this;
				//设置手机状态栏颜色
				plus.navigator.setStatusBarBackground( "#FD7B27" );
				//设置手机状态栏字体颜色为浅色
				plus.navigator.setStatusBarStyle( "UIStatusBarStyleBlackOpaque" );
				//获取版本号
				plus.runtime.getProperty(plus.runtime.appid, (inf)=> {
					localStorage.appversion="V"+inf.version;
				})
				//监听手机网络状态
//				console.log('1234567')
//				document.addEventListener("netchange", function(){
//			        var nt = plus.networkinfo.getCurrentType();
//			        switch ( nt ) {
//			            case plus.networkinfo.CONNECTION_ETHERNET:
//			            case plus.networkinfo.CONNECTION_WIFI:
//			            console.log("切换到wifi!")
//			            break;
//			            case plus.networkinfo.CONNECTION_CELL2G:
//			            case plus.networkinfo.CONNECTION_CELL3G:
//			            case plus.networkinfo.CONNECTION_CELL4G:
//			            console.log("切换到4G网络!")
//			            break;
//			            default:
//			            console.log("无网络!")
//			            self.outLine = true
//			            break;
//			        }
//			    }, false );

				//监听手机返回键
				plus.key.addEventListener("backbutton",()=> {
					if(self.$route.meta.backShow === undefined) {
						self.back();
					} else {
						if (!backButtonPress) {
							backButtonPress= new Date().getTime();
							plus.nativeUI.toast('再按一次退出应用');
							setTimeout(function() {
								backButtonPress = null;
							}, 2000);
						} else {
							if (new Date().getTime() - backButtonPress < 2000) {
								plus.runtime.quit();
							}
						}
					}

				},false)

				plus.push.addEventListener( "click", function( msg ) {
					var payload=(plus.os.name=='iOS')?msg.payload.payload:JSON.parse(msg.payload);
				      // self.$toast("你有一条未读消息click1---"+payload.name+"---"+payload.params.title)
				      if(plus.os.name=='iOS'){
				       	  localStorage.message="message"
				      }
				      self.$router.push({name:payload.name,params:payload.params})

			    }, false )
			    // 监听在线消息事件
			    plus.push.addEventListener( "receive", function( msg ) {
			    	var payload=(plus.os.name=='iOS')?msg.payload:JSON.parse(msg.payload);
			       /*self.$toast("你有一条未读消息receive1"+payload.name)
			       self.$router.push({name:'message'})*/
			       if ( msg.payload ) {
						if ( typeof(msg.payload)=="string" ) {}
						else {
							plus.nativeUI.confirm( "收到一条新消息，是否立即查看", function(e){
								if(e.index==0){
									self.$router.push({name:payload.name,params:payload.params})
								}
							}, "新消息通知", ["查看","忽略"] );
							/*self.$messagebox.confirm('收到一条新消息，是否立即查看').then(action => {
								 self.$router.push({name:payload.name,params:payload.params})
							});*/
						}
					}
			    }, false )

				//this. eventStatistic()//事件统计

				if(this.inspect){
					return
				}
				this.inspect=true
				plus.share.getServices(function(s) {
					var shares = {};
					for(var i in s) {
						var t = s[i];
						shares[t.id] = t;
					}
					self.$store.commit('updateShares', shares)
				}, function(e) {

				});
				self.update()
				self.getAppIndexStart()
				//判断启动方式。//从分享出去的网页里启动app
				self.checkArguments();


			},
			getAppIndexStart() {
				if(!localStorage.startVersion) {
					localStorage.startVersion = '100'
				}
				var self = this;
				this.ajax({
					url: '/sysIndexStart/getAppIndexStart'
				}, function(data) {
					//console.log(JSON.stringify(data)+'启动页')
					if(data.result) {
						var startVersion = data.obj.startVersion.replace(/\./g, "");
						if((localStorage.startVersion && localStorage.startVersion.replace(/\./g, "") - startVersion < 0) || !localStorage.startVersion) {
							plus.downloader.createDownload(data.obj.pictureUrl, {
								filename: "startImg/"
							}, function(d, status) {
								if(status == 200) {
									localStorage.startVersion = startVersion;
									self.log(d.filename+"-----------")
									plus.navigator.updateSplashscreen({
										image: d.filename,
										autoclose: true,
										autoclose_w2a: true,
										delay: data.obj.showSec,
										delay_w2a: data.obj.showSec
									});
								}else{
									//console.log('下载失败')
								}
							}).start();
						}
					}
				})
			},
			createDownload(path, callback) {
				let self = this;
				var dtask = plus.downloader.createDownload(path, {
					filename: '_www/'
				}, function(d, status) {
					// 下载完成
					if(status == 200) {
						callback && callback(d)
					} else {
						self.log(status)
					}
				});
				//dtask.addEventListener( "statechanged", onStateChanged, false );
				dtask.start();
			},
			back() {
				console.log('back')
				var self = this;
				if(this.popupVisible==true){
					this.popupVisible=false
				}
				if(!window.plus) {
					this.$router.back()
				} else {
					var blankWebview = plus.webview.getWebviewById('blank');
					if(blankWebview === null || blankWebview === undefined) {
						var m=localStorage.message
						if(m=='message'){
							localStorage.removeItem("message")
							self.$router.push({name:"homepage"})
						}else{
							self.$router.back()
						}

					} else if(self.$route.name=='mall'){
							self.$router.replace({name:'homepage'})
							setTimeout(function() {
								blankWebview.close()
							}, 0)
						}else {
						blankWebview.canBack(function(e) {
							if(e.canBack) {
								blankWebview.back()
							} else {
								var m=localStorage.message
								if(m=='message'){
									localStorage.removeItem("message")
									self.$router.push({name:"homepage"})
								}else{
									self.$router.back()
								}
								setTimeout(function() {
									blankWebview.close()
								}, 0)
							}
						})
					}
				}
			},
			goto(page, type) {
				if(type) {
					if(!localStorage.userId) {
						this.tologin("")
						return
					}
				}
				this.$router.push(page)
			},
			share(id, type) {
				var self = this;
				this.popupVisible = false
				let shareObj = this.shares
				if(shareObj[id]) {
					var msg = this.$store.state.shareDetail;
					//console.log(JSON.stringify(msg))
					msg.extra = {
						scene: type || ''
					};
					if(shareObj[id].authenticated) {
						console.log("已经授权")
						self.shareMessage(msg, shareObj[id],type);
					} else {
						console.log("未授权")
						shareObj[id].authorize(function() {
							self.shareMessage(msg, shareObj[id],type);
							console.log("授权成功")
						}, function(e) {
							console.log("认证授权失败：" + e.code + " - " + e.message);
						});
					}
				} else {
					this.$toast("获取分享服务失败")
				}
			},
			shareMessage(msg, s,type) {
				var self = this;
				s.send(msg, function() {
					//console.log(JSON.stringify(s))
					self.$toast("分享到" + s.description + "成功！ ");
					self.addShareRecord(msg,type)
				}, function(e) {
					self.log("分享失败：" + e.code + " - " + e.message);
				});
			},
			addShareRecord(msg,shareType){//添加分享记录
				if(!localStorage.userId){
					console.log("id不对 ");
					return
				}
				console.log("id对了");
				this.ajax({
					url: '/appTrace/shareNews',
					data: {
						createUser: localStorage.userId,
						detailId: msg.detailId,
						type:msg.contentType,
						shareType:shareType
					},
					type: 'post'
				}, function(data) {
					//self.$toast('我走了'+data.result)
				})
			},
		    eventStatistic(){//事件统计
		    	//plus.statistic.eventTrig( "purchase", {"type":"book","quantity":"3"} );
		    	var routeName=this.$route.name;
		    	var statisticObj=this.statistic[routeName];
		    	if(statisticObj){
		    		var eventId=""
		    		if(statisticObj.isTemplate==true){
		    			var id="";
                        id=this.$route.params[statisticObj.paramId]
                        console.log(id)
		    			if(id){
		    				var obj=statisticObj.events[id];
			    			if(obj){
			    				eventId=obj.eventId;
			    			}
		    			}

		    		}else{
		    			eventId=statisticObj.eventId
		    		}
		        	if(plus.os.name=='iOS'){
		             	plus.statistic.eventTrig(eventId, "" );
		             	//console.log(eventId)
		        	}else{//Android
		        		plus.statistic.eventTrig(eventId);
		        		//console.log(eventId)
		        	}
		    	}
		    },
		    checkArguments(){// 判断启动方式//从分享出去的网页里启动app
			    console.log("plus.runtime.launcher: "+plus.runtime.launcher);
			    var args= plus.runtime.arguments;
			    if(args){
			        // 处理args参数，如打开新页面等
			        console.log(args)
			    }
			},
		}

	}
</script>

<style>
	.multloginbutton {
		border-radius: 50%;
		height: 50px;
		width: 50px;
		margin: 20px
	}

	td>p {
		margin-top: 3px;
	}

	.share {
		text-align: center;
		padding: 6x;
	}

	.share img {
		width: 11%;
		margin: 15px;
	}
	.mint-msgbox-message{
		text-align: left;
	}
	.mint-header-button *{
		-webkit-touch-callout:none;
		-webkit-user-select:none;
		-khtml-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
	}

</style>

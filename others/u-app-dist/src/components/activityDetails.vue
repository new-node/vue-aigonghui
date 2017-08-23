<template>
	<div>
		<div v-show="isShow" style=" position: fixed;top:13px;z-index: 22;right: 10px; color: #f7f7f7;">
			<img width="24" @click='share()' src="./imgs/share_top.png" />
		</div>
		<!--:style="style"-->
		<div class="activityDetails">
			<div style="overflow: auto; height: 100%;">
				<!--<div style="height: 140px;">-->
					<img :src="detailObj.poster||''" @error="$event.target.src=errorBanner" width="100%" />
				<!--</div>-->
				<div style="background: #FFFFFF;padding: 8px; margin-top: -3px;">
					<mt-button :disabled="btnShow===true" size="small" :class="[btnShow==true ? historyClass :'' , normalClass]" style="" @click.native="receive" >{{btnShow==true?'领取结束':(detailObj.modelCode=='LuckDraw'?'我要报名':'立即领取')}}</mt-button>
					<p style="margin: 5px; font-size: 15px; color: #222;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; padding-right: 10px;">
						 {{detailObj.detailTitle}}
					</p>
					<p style="color: #8c8c8c;margin:5px; font-size: 12px;">
						{{detailObj.used||0}}<span>{{detailObj.modelCode=='LuckDraw'?'人已报名':'张已领取'}}</span>
					</p>
				</div>
				<div style="color: #888888;background: #FFFFFF;padding: 12px 13px 0;margin-top:15px; ">
					商家信息
				</div>
				<div style="background: #FFFFFF;padding: 12px 13px; font-size: 15px; background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
    background-size: 120% 1px;
    background-origin: content-box;
    background-repeat: repeat-x;" class="clearfix ">
    			<div class="clearfix" style="padding-top:10px ;">
					<div style="float: left; width: 80%;">
						<p style="margin: 0px 0 5px; color: #222;">{{detailObj.unionName}}</p>
						<p style="color: #666666; font-size: 13px; margin: 0;">
							{{detailObj.exchangeAddress}}
						</p>
						<p style="color: #888888; font-size: 13px; margin: 0;margin-top: 4px;">{{detailObj.contactPhone}}</p>
					</div>
					<div style="float: right; margin-top: 5px;">
						<a :href="'tel:'+detailObj.contactPhone">
							<img src="./imgs/phone.png" width="30" height="" style="float: right; margin-right: 10px; " />
						</a>
					</div>
				</div>
				</div>
				<div style="color: #888888;background: #FFFFFF;padding: 12px 13px 0;margin-top:15px; ">
					使用须知
				</div>
				<div style="background: #FFFFFF;padding: 12px 13px ; background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
				    background-size: 120% 1px;
				    background-origin: content-box;
				    background-repeat: repeat-x; ">
				    <div class="" style="padding-top: 10px;">
						<p style=" margin: 0;color: #FD7B27;">
							使用有效期：
						</p>
						<p style="margin: 5px 0;">{{detailObj.activityBiginTime| formatDate}} 至 {{detailObj.activityEndTime| formatDate}}</p>
					</div> 
				</div>
				<div style="color: #888888;background: #FFFFFF;padding: 12px 13px 5px;margin-top:15px;padding-bottom: 12px;">
					图文详情
				</div>
				<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
				<div @click.prevent="getLink" style="background-color: #FFFFFF;padding: 8px 8px 0 8px;" v-html="detailObj.detailContent" class="art_details">
				</div>

				<div style=" font-size: 12px; background-color: #fff; padding-top:10px ;">
					<div style=" border-radius: 50%; width: 56px; height: 40px;margin: 0 auto;padding-right:28px; line-height: 30px; text-align: center;">
						<img width="55" @click="sendagree" style="display: table;vertical-align: middle; margin-right: 10px;"   :src="detailObj.hasAgree?zanafter:zanbefore" />
					</div>
					<p style="font-size: 16px;color: #666666;  height: 40px;padding:0 6.5px;margin: 16px auto 0; text-align: center;">{{detailObj.agree||0}} </p>
				</div>
				
				
				<transition name="fade">
				<div class="mine-popup"  v-show='mypopup' transition="fade">
					<div class="v-modal" style="z-index: 2028;" @click='mypopup=false'  @touchmove.prevent></div>
					<div class="mint-msgbox" style="z-index: 3000;width: 90%;">
						<!--<div class="mint-msgbox-header">
							<div class="mint-msgbox-title">提示</div>
						</div>-->
						<!--<div  @click='mypopup=false' style="position: absolute;right: 1px;top: 1px;z-index: 3005;width: 25px;"><img src="./imgs/delatee.png" style="width: 100%;" /></div>-->
						<div class="mint-msgbox-content">
							<div class="mint-msgbox-message" style="margin: 0 auto;">
								您的生日：
								<span>{{nextMonth}}月</span>&nbsp;
								<select class="cselect"  v-model="selected">
									<option value="0">请选择</option>
									<option v-for="d in days" :value="d">{{d}}号</option>
								</select>
								&nbsp;<span style="color: #f26112;">公历</span>
							</div>
							<div style="font-size: 12px;color: #f26112;margin-top: 5px;">注：请填写真实信息，每人每年只有一次参与机会。</div>
						</div>
						<div class="mint-msgbox-btns">
							<button class="mint-msgbox-btn mint-msgbox-cancel " @click='mypopup=false'>取消</button>
							<button class="mint-msgbox-btn mint-msgbox-confirm" @click='signup()' style="color: #49b1ff;">确定</button>
						</div>
					</div>
				</div>
				</transition>
				<transition name="fade">
				<div class="mine-popup" v-show='mypopup2'  transition="fade">
					<div class="v-modal" style="z-index: 2028;" @click='mypopup2=false'  @touchmove.prevent></div>
					<div class="mint-msgbox" style="z-index: 3000;">
						<!--<div  @click='mypopup2=false' style="position: absolute;right: 1px;top: 1px;z-index: 3005;width: 25px;"><img src="./imgs/delatee.png" style="width: 100%;" /></div>-->
						<div class="mint-msgbox-header">
							<div class="mint-msgbox-title" style="">提示</div>
						</div>
						<div class="mint-msgbox-content">
							<div class="mint-msgbox-message" style="margin: 0 auto;text-align: center;">
								确认要领取？
							</div>
						</div>
						<div class="mint-msgbox-btns">
							<button class="mint-msgbox-btn mint-msgbox-cancel " @click='mypopup2=false'>取消</button>
							<button class="mint-msgbox-btn mint-msgbox-confirm" @click='signup()' style="color: #49b1ff;">确定</button>
						</div>
					</div>
				</div>
				</transition>
				<!--<div style="margin-top: 15px; background-color: #fff;padding: 10px;">

					<div style="padding: 5px 5px;  margin-bottom: 5px;" v-for='obj in detailObj.remarkList'>
						<div style="float: left; margin-right: 5px;">
							<img src="./imgs/defaulthead.png" style="height:40px; width: 40px; " />
						</div>
						<div style="padding: 2px;margin-top: 1px;color: #666666;">{{obj.isAnonymous?'匿名用户':obj.realName}}</div>
						<div style="padding:2px;color: #666666;">{{obj.createTime}}</div>
						<div class="clearfix">
							<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;line-height: 1.5; margin: 8px 0; font-size: 13px;">
								{{obj.remarkContent}}
							</p>
						</div>
						
					</div>
				</div>-->

			</div>
		</div>
		<!--<div style="border-top: 1px solid #ddd; height: 50px;width: 100%; background-color: #f8f8f8;">
			<input type="text" placeholder="添加评论" style="width: 50%;height: 33px; border: 1px solid #ddd; outline: none; margin-top: 9px; border-radius: 15px; padding-left: 20px;  margin-left: 12px;" @click="addremark" readonly="readonly" />
		 
				<img width="24" style="margin:14px 10% 0px 0px; float: right;" @click="share" src="./imgs/share.png" />
		 
			 <img width="24"  style="margin-right: 20px; margin-top: 14px; float: right;"  src="./imgs/pinglun11.png" />  
		</div>
		<mt-popup v-model="popupVisible" position="bottom" style='width: 100%;padding: 10px;'>
			<textarea style="width: 100%; height: 150px; " placeholder="回复 ：" v-model='remarkContent' id="textfocus"></textarea>

			<div style="margin-top: 8px;">
				<div style="margin-bottom: 8px;">
						<label class="mint-checklist-label" slot="title" style="">
					        <span class="mint-check">
					          <input class="mint-check-input" type="checkbox"  name="check" v-model='isAnonymous'>
					          <span class="mint-check-core"></span>
					        </span>
					        <span class="mint-check-label">是否匿名</span>
						</label>
				</div>
				<mt-button type="default" size="small" style="float: left;" @click.native="popupVisible=false">取消</mt-button>
				<mt-button type="primary" size="small" style="float: right;background-color: #FD7B27;" @click.native="remarkActivity">发送</mt-button>
			</div>
		</mt-popup>-->

	</div>
</template>
<script type="text/javascript">
import errorBanner from './imgs/errorBanner.png'
import zanafter from './imgs/zanafter.png'
import zanbefore from './imgs/zanbefore.png'
	export default {
		name: "activityDetails",
		data() {
			return {
				//按钮动态绑定样式
				normalClass:'normalClass',
				historyClass:'historyClass',
				
				zanbefore:zanbefore,
				zanafter:zanafter,
				errorBanner: errorBanner,
				popupVisible: false,
				style: {
					'overflow-y': 'hidden',
					'height': (document.documentElement.clientHeight - 97) + 'px'
				},
				detailObj:'',
				btnShow:this.$route.params.isHistory,
				remarkContent:'',
				isAnonymous:false,
				mypopup:false,
				mypopup2:false,
				isShow:window.plus,
				nextMonth:'',
				selected:'0',
				mydate:'',
				days:[]
			}
		},
		created(){
			var d = new Date();
			var cyear=d.getFullYear(); 
			//获取下一个月的月份
			var allmonths = [2,3,4,5,6,7,8,9,10,11,12,1,2];
			var cmonth = allmonths[d.getMonth()];
			//获取cmonth的最大天数：
			var daycount = new Date(cyear,cmonth,0).getDate();
 	      	//遍历存储每一天
 	      	for(var i=0;i<daycount;i++){
 	      	 	this.days[i] = i+1;
 	      	}
 	      	this.nextMonth = cmonth;
			this.getdetail();
		},
		watch:{
			popupVisible (){
				if(this.popupVisible){
					 setTimeout(function(){
						document.getElementById("textfocus").focus()
					 },0)
				}
			},
			$route(){
				if(this.$route.name=='activityDetails'){
					this.getdetail()
				}			
				this.btnShow=this.$route.params.isHistory
			},
		}, 
		
		methods: {
			share() {
				if(this.$store.state.shares == '') {
					this.$toast("获取分享服务失败")
				} else {
					var obj={
						href:this.mui.shearRoot+this.$route.fullPath,
						title:this.detailObj.detailTitle,
						content:this.detailObj.detailTitle,
						thumbs:[this.detailObj.poster],
						pictures:[this.detailObj.poster],
						contentType:5,
						detailId:this.$route.params.activitiesDetailId 
					}
					this.$store.commit('updateShareDetail', obj)
					this.$store.commit('updatePopupVisible', true)
				}
			},
			getLink(e){		
				if (e.target.tagName.toUpperCase() === 'A') {
                   if(!window.plus) {
						window.location.href = e.target.href
					} else {
						this.$router.push({
							name: 'blank',
							params: {
								url: e.target.href,
								title:''
							}
						})
					}
               }
				return false
			},
			addremark(){
				if(!localStorage.userId){
					this.tologin()
					 
				}else{
					this.popupVisible=true;
				}
			},
			remarkActivity(){
				
				if(this.remarkContent==''){
					this.$toast('评论内容不能为空')
					return
				}
				var self=this;
				 this.ajax({
						url:'/activityUser/remarkActivity', 
						data:{
							activitiesDetailId:this.$route.params.id,
							createId:localStorage.userId,
							remarkContent:this.remarkContent,
							isAnonymous:this.isAnonymous
						},type:'post'
					},function(data){
						if(data.result){
							self.popupVisible=false;
						}
						self.$toast(data.description)
					})
				
			},
//			share() {
//				if(this.$store.state.shares == '') {
//					this.$toast("获取分享服务失败")
//				} else {
//					var obj={
//						href:this.mui.shearRoot+this.$route.path,
//						title:this.detailObj.detailTitle,
//						content:this.detailObj.unionName,
//						thumbs:[this.detailObj.poster],
//						pictures:[this.detailObj.poster]
//					}
//					this.$store.commit('updateShareDetail',obj)
//					this.$store.commit('updatePopupVisible', true)
//				}
//			},
			receive() {
				if(!localStorage.userId){
					this.tologin()
				}else{
					const self=this
					if(self.detailObj.modelCode=='LuckDraw'){
						self.mypopup=true;
					}else{
//						self.$messagebox.confirm(self.detailObj.modelCode=='LuckDraw'?'确认要报名？':'确认要领取？', '提示', ).then(action => {
						self.mypopup2=true;
						//self.signup()
					}
				}
			},
			signup() {
				if(this.mypopup){
					if(this.selected=='0'){
						this.$toast({
							message: "请选择您的生日日期",
							position: 'bottom',
						});
						return
					}else{
						this.mypopup=false;
					}
				}else if(this.mypopup2){
					this.mypopup2=false;
				}
				
				var d = new Date();
				var cyear=d.getFullYear(); 
				var nextmonth=d.getMonth()+2;
				this.mydate = (cyear.toString()+'-'+nextmonth.toString()+'-'+this.selected);
				
				const self=this
				this.ajax({
					url:'/activities/grabVoucher', 
					data:{activitiesDetailId:this.$route.params.id,userId:localStorage.userId,birthday:this.mydate},
					type:'post'
				},function(data){
					self.$toast(data.description);
					if(data.result){
						self.detailObj.used+=1;
					}
				})
			},
//			toJoin() {//报名
//				if(!localStorage.userId){
//					this.tologin()					 
//				}else{
//					const self=this		
//					self.$messagebox.confirm('确认要报名？', '确认', ).then(action => {
//						this.ajax({
//							url:'/voluActivityUserSignRecord/MeWantAttend', 
//							data:{activitiesDetailId:this.$route.params.id,userId:localStorage.userId,globalFlag:self.detailObj.globalFlag,unionId:self.detailObj.unionId || ''},
//							type:"POST"
//							},function(data){
//								if(data.result){
//									self.detailObj.buttonState="已报名";
//									self.detailObj.signCount=self.detailObj.signCount+1;
//								}
//								self.$toast(data.description)
//						})
//					});	
//				}
//			},
			getdetail(){
				var self=this;
				this.ajax({
					url:'/activities/detail', 
					data:{activitiesDetailId:this.$route.params.id,isHistory:this.$route.params.isHistory,userId:localStorage.userId||''}
				},function(data){
					if(data.result){
						self.detailObj=data.obj
					}
				})
			},
			sendagree(){
				if(!localStorage.userId){
					this.tologin()
					 
				}else{
					if(this.detailObj.hasAgree){
						this.$toast('您已经点过赞了')
						return
					}
					
					const self=this
					 this.ajax({
						url:'/activityUser/agreeActivity', 
						data:{activityDetailId:this.$route.params.id,userId:localStorage.userId}
					},function(data){
						if(data.result){
							self.detailObj.agree+=1
							self.detailObj.hasAgree=true
						}else{
							self.$toast(data.description)
						}
					})
				}
			}
		},
        beforeRouteLeave (to, from, next) {
			if(to.name=='activity'){
			   sessionStorage.history=this.$route.params.isHistory;
			}
			next();
		}
	}
</script>
<style type="text/css">
	.mint-checklist-label {
		display: block;
	}
	
	.mint-check-input {
		display: none;
	}
	
	.mint-check-input:checked+ .mint-check-core {
		background-color: #fd7b27;
		border-color: #FFFFFF;
	}
	
	.mint-check-input:checked+ .mint-check-core::after {
		background-color: #fff;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	
	.mint-check-input[disabled]+ .mint-check-core {
		background-color: #d9d9d9;
		border-color: #ccc;
	}
	
	.mint-check-core {
		display: inline-block;
		background-color: #fff;
		border-radius: 100%;
		border: 1px solid #ccc;
		position: relative;
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	
	.mint-check-core::after {
		content: " ";
		border-radius: 100%;
		top: 4.5px;
		left: 4.5px;
		position: absolute;
		width: 8px;
		height: 8px;
		-webkit-transition: -webkit-transform .2s;
		transition: -webkit-transform .2s;
		transition: transform .2s;
		transition: transform .2s, -webkit-transform .2s;
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	.art_details img {
		width: 100% !important;
		height: 100% !important;
	}
	.activityDetails .mint-msgbox{
		position: fixed;
	    top: 50%;
	    left: 50%;
	    -webkit-transform: translate3d(-50%, -50%, 0);
	    transform: translate3d(-50%, -50%, 0);
	    background-color: #fff;
	    width: 85%;
	    border-radius: 3px;
	    font-size: 16px;
	    -webkit-user-select: none;
	    overflow: hidden;
	    -webkit-backface-visibility: hidden;
	    backface-visibility: hidden;
	    -webkit-transition: .2s;
	    transition: .2s;
	    border-radius: 3px;
		/*border: 5px solid #f6d813;*/
	}
	.cselect {
	    border: solid 1px #989897;
	    width: 70px;
	    height: 25px;
	    border-radius: 3px;
	  	color: #5A5A5A;
	    appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    padding-right: 14px;
	    padding-left: 8px;
	    background: url("./imgs/arrowmine.png") no-repeat scroll right center transparent;
	}
	.cselect::-ms-expand { display: none; }
	.fade-enter-active, .fade-leave-active {
  		 transition: opacity .4s
	}
	.fade-enter, .fade-leave-active {
	   opacity: 0
	}
	.normalClass{
		float: right;margin-top: 6px;margin-right: 5px;  background: rgb(253, 123, 39);color: white;
	}
	.historyClass{
		float: right;margin-top: 6px;margin-right: 5px;  background: #808080;color: white;
	}
</style>
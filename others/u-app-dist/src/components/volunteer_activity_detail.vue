<template>
	<div id="volunteer_activity_detail" :style="hhh">
		<div  v-show="isShow" style=" position: fixed;top:13px;z-index: 22;right: 10px; color: #f7f7f7;">
			<img width="24" @click='share()' src="./imgs/share_top.png" />
		</div>
		<div style="overflow: auto; height: 100%;">
			<div style="position: relative; overflow: hidden; height: 150px;">
				<div class="activity-title"><div class="ellip" style="width: 100%;"> {{detailObj.detailTitle}}</div> </div>
				<img :src="detailObj.poster || ''" style="width: 100%; min-height: 150px; display: block;" @error="$event.target.src=errornews"/>
			</div>
			<div style="background: #FFFFFF;padding:20px 8px; ">
				<!--<mt-button :disabled="isBaoMing" size="small" style="float: right;margin-right: 5px;  background: rgb(253, 123, 39);color: white;" @click.native="toJoin">我要报名</mt-button>-->
				<mt-button size="small" @click.native="toJoin" :disabled="detailObj.buttonState!='我要报名'" style="float: right;margin-right: 5px; width:90px;  box-shadow: none; margin-right: 5px;" 
 					:class="{'active-baoming':detailObj.buttonState=='我要报名' || detailObj.buttonState=='已报名','active-baoming-ending':detailObj.buttonState=='报名截止','active-ending':detailObj.buttonState=='已结束'}">
 					{{detailObj.buttonState}}
 				</mt-button>
				<p style="color: #999999; font-size: 14px; margin: 0px; padding: 0px;">
					<!--{{detailObj.used||0}}--> 已有&nbsp;<span style="font-size: 17px; color: #ff2222; font-weight: bold;">{{detailObj.signCount || 0}}</span>&nbsp;人报名参与
				</p>
			</div>
			<div style="color: #999999;background: #FFFFFF;padding: 10px 8px 0 8px;">报名须知</div>
			<div class="activity-item">
				<div style="padding-top: 15px;">
					<p class="activity-item-title">报名日期：</p>
					<p style="margin:0;">{{detailObj.beginTime | formatDate}} 至 {{detailObj.endTime | formatDate}}</p>
				</div>
				<div style="padding-top: 15px;">
					<p class="activity-item-title">活动日期：</p>
					<p style="margin:0;">{{detailObj.activityBiginTime | formatDate}} 至 {{detailObj.activityEndTime | formatDate}}</p>
				</div>
				<div style="padding-top: 15px;">
					<p class="activity-item-title">其他事项：</p>
					<ul style="color: #999999; line-height: 24px; margin: 0;">
						<li>签到地点：{{detailObj.signAddress}}</li>
						<li>活动地点：{{detailObj.activityAddress}}</li>
						<li>活动人数：{{detailObj.peopleCount}}</li>
						<li v-show="detailObj.activityType">活动类型：{{detailObj.activityType}}</li>
						<li>发起单位：{{detailObj.union_name}}</li>
					</ul>
				</div>
		   </div> 
            <div v-show="detailObj.detailContent" style="color: #999999;background: #FFFFFF;padding: 10px 8px 0 8px;">图文详情</div>
            <div v-show="detailObj.detailContent" @click.prevent="getLink" class="activity-item art_details" style="margin-bottom: 0" v-html="detailObj.detailContent"></div>
            <mt-cell :title="remarkTitle" class="bornone" style=" color: #999999; margin-bottom: 2px; font-size: 14px; background-color: white;padding: 2px 0px 0px 8px;" >
					<img slot="icon" src="./imgs/assistor.png" width="10" height="18" style="margin-right: 10px;margin-left: -10px;">
			</mt-cell>	
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
				<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 75px;background-color: white;">
	            	<div v-if="remarks.length==0" style="text-align: center;background: white;padding: 10px;">暂无评论</div>
					<div v-if='remarks.length!=0' style="margin-bottom: 5px;">				
						<div v-for="item in remarks" style="padding: 5px 5px;  margin-bottom: 5px; border-top:1px solid #DDDDDD;">
							<div style="float: left; margin-right: 5px;">
								<img :src="item.photoUrl || ''" @error="$event.target.src=defaulthead"  style="height: 40px; width:40px;margin-top: 3px; border-radius: 50%;">
							</div>
							<div style="margin-right: 20px; float: right;margin-top: 10px; " >
								<img width="20" @click='remarkAgree(item)' :src="item.agreeFlag?zanafter:zanbefore" style="vertical-align: top;" />
								<span style="display: inline-block;color: #999999;margin-top: 4px;">{{item.calcCount || 0}}</span>
							</div>						
							<div style="padding: 2px;margin-top: 1px;color: #222;">{{item.isAnonymous?'匿名用户':item.userName||''}}</div>
							<div style="padding:2px  2px 4px;color: #8c8c8c;">{{item.createTime}}</div>
							<div class="clearfix">
								<p style="overflow: hidden; margin: 3px 10px; font-size: 14px; word-wrap:break-word;" v-html="item.remarkContent"></p>
							</div>
						</div>
			 	    </div>
		            <p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
		        		<mt-spinner type="fading-circle"></mt-spinner>
		        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
		      		</p>
		      		<p v-show="allLoaded && remarks.length>5" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
		        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
		      		</p>
	            </div>
	        </div>
            <mt-popup v-model="popupVisible" position="bottom" style='width: 100%;padding: 10px;bottom: 45px'>
				<textarea style="width: 100%; height: 150px; " placeholder="回复 ：" v-model='remarkContent' id="textfocus"></textarea>	
				<div style="margin-top: 8px;">
					<div style="margin-bottom: 8px;">
						<label class="mint-checklist-label" slot="title" style="">
					        <span class="mint-check">
					          <input class="mint-check-input" type="checkbox"  name="check" v-model='isAnonymous'>
					          <span class="mint-check-core"></span>
					        </span>
					        <span class="mint-check-label">匿名评论</span>
						</label>
					</div>
					<mt-button type="default" size="small" style="float: left;" @click.native="popupVisible=false;remarkContent=''">取消</mt-button>
					<mt-button type="primary" size="small" style="float: right;background-color: #FD7B27;" @click.native="remarkActivity">发送</mt-button>
				</div>
			</mt-popup>
		</div>
		<div  style=" height: 45px;width: 100%; background-color: #f2f2f2;position: fixed;bottom: 0px;">
			<input type="text" placeholder="添加评论..." style="width: 40%;height: 30px; border: 1px solid #ddd; outline: none; margin-top: 7.5px; border-radius: 15px; padding-left: 20px; background-color: #fff; margin-left: 12px; font-size: 12px;padding-bottom: 3px;" @click="pinglun" readonly="readonly" />
			
			<!--<img width="24" @click='share()' style="margin-right: 20px; margin-top: 10px;float: right;" src="./imgs/share.png" />-->
			<img width="24" style="margin-right: 25px; margin-top:10px; float: right;" @click='addFavorite' :src="detailObj.favoriteFlag?scafter:sc" /> <!--:src="detailsObj.favoriteFlag==false?sc:scafter" -->
			 <span style="position: relative;margin-right: 20px;margin-top: 10px; float: right; display: inline-block;">
			 	<img width="25" @click='activityAgree' :src="detailObj.agreeFlag?zanafter:zanbefore"  /><!--:src="detailsObj.agreeFlag==false?zanbefore:zanafter"-->
			 	<mt-badge v-show="detailObj.calaCount!==0" size="small" type="error" style="position: absolute; top:-10px; left: 17px;">{{detailObj.calaCount || 0}}</mt-badge>
			 </span>
		</div>
	</div>
</template>
<script type="text/javascript">
import defaulthead from './imgs/defaulthead.png'
import zanafter from './imgs/zanafter.png'
import zanbefore from './imgs/zanbefore.png'
import sc from './imgs/sc.png'
import scafter from './imgs/scafter.png'
import errornews from './imgs/errornews.png'
	export default {
		name: "activityDetails",
		data() {
			return {
				remarks:[],//评论
				//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
				zanbefore:zanbefore,//点赞之前图标
				zanafter:zanafter,//点赞之后图标
				popupVisible: false,//评论是否弹出
				detailObj:'',//活动详情
				isBaoMing:false,//是否报名
				remarkContent:'',//评论内容
				isAnonymous:false,//评论是否匿名
				agreeflag: false,//是否点赞
				sc: sc, //收藏之前图标
				scafter: scafter,//收藏之后图标
				isShow:window.plus,
				errornews:errornews,
				remarkTitle:"评论",
				defaulthead:defaulthead,
				hhh:{
					'height': (document.documentElement.clientHeight - 46) + 'px',
					'-webkit-overflow-scrolling' :'touch',
				}
			}
		},
		created(){
			this.getdetail()//获取活动详情信息
			this.getRemarks(0);//获取评论信息
		},
		mounted() {
	    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
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
				if(this.$route.name=='volunteer_activity_detail'){
					this.remarks=[]//评论
					//底部自动加载更多
					this.count=10//最新一页评论数
				    this.loading=false//评论是否加载更多
	        		this.allLoaded=false
	       			this.wrapperHeight=0
					
					this.popupVisible=false//评论是否弹出
					this.detailObj=''//活动详情
					this.isBaoMing=false//是否报名
					this.remarkContent=''//评论内容
					this.isAnonymous=false//评论是否匿名
					this.agreeflag=false//是否点赞
					this.getdetail()//获取活动详情信息
					this.getRemarks(0);//获取评论信息
					console.log(this.$route.params.id)
				}
			}
		}, 
		methods: {
			getLink(e){		
				if (e.target.tagName.toUpperCase() === 'A') {
                  console.log(e.target.href)
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
			getRemarks(sum){//获取评论列表
				var self=this;
				 this.ajax({
					url:'/unionActivitiesRemark/activitiyRemarkInfo', 
					data:{
						activitiesDetailId:self.$route.params.id,
						userId:localStorage.userId || '',
						start:sum
					},
					type:"get"
					},function(data){
						if(data.result){
							//console.log(JSON.stringify(data.obj.remark))
							self.remarks=self.remarks.concat(data.obj.remark);
							self.count=data.obj.remark.length;
							self.remarkTitle="评论("+data.obj.remarkCount+")"
						}else{
							self.count=0
						    //self.$toast(data.description)
						}
				   })
			},
			
			loadMore() {
				this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.remarks.length!=0){
							this.getRemarks(this.remarks.length)
						}
					}
					this.loading = false;
				 },2000)
			},
			pinglun(){//点击评论
				if(this.isShow){//手机app评论
					if(!localStorage.userId){
						this.tologin()					 
					}else{
						this.popupVisible=true;
					}
				}else{//网页评论
					this.popupVisible=true;
				}
				//console.log(this.popupVisible);
			},
			remarkActivity(){//评论提交			
				
				var contentStr=this.filterContent(this.remarkContent);
				
				if(contentStr==''){
					this.$toast('评论内容不能为空')
					return
				}
				var self=this;
				
				 this.ajax({
						url:'/unionActivitiesRemark/add', 
						data:{
							activitiesDetailId:this.$route.params.id,
							createId:localStorage.userId || '',
							remarkContent:contentStr,
							isAnonymous:this.isAnonymous
						},
						type:"post"
					},function(data){
						if(data.result){
							self.popupVisible=false;
							self.remarks=[];
							self.remarkContent=""
							self.getRemarks(0);
						}
						self.$toast(data.description)
					})
				
			},
			share() {//分享
				if(this.$store.state.shares == '') {
					this.$toast("获取分享服务失败")
				} else {
					var obj={
						href:this.mui.shearRoot+this.$route.path,
						title:this.detailObj.detailTitle,
						content:this.detailObj.unionName,
						thumbs:[this.detailObj.poster],
						pictures:[this.detailObj.poster],
						contentType:2,
						detailId:this.$route.params.id
					}
					this.$store.commit('updateShareDetail',obj)
					this.$store.commit('updatePopupVisible', true)
				}
			},
			toJoin() {//报名
				if(!localStorage.userId){
					this.tologin()					 
				}else{
					const self=this		
					self.$messagebox.confirm('确认要报名？', '确认', ).then(action => {
						this.ajax({
							url:'/voluActivityUserSignRecord/MeWantAttend', 
							data:{activitiesDetailId:this.$route.params.id,userId:localStorage.userId,globalFlag:self.detailObj.globalFlag,unionId:self.detailObj.unionId || ''},
							type:"POST"
							},function(data){
								if(data.result){
									self.detailObj.buttonState="已报名";
									self.detailObj.signCount=self.detailObj.signCount+1;
								}
								self.$toast(data.description)
						})
					});	
				}
			},
			getdetail(){//活动详情
				var self=this;
				this.ajax({
					url:'/voluActivityDetail/voluActivityDetailInfo', 
					data:{activitiesDetailId:this.$route.params.id,userId:localStorage.userId||''},
					type:'GET'
				},function(data){
					if(data.result){
						self.detailObj=data.obj
						document.title=data.obj.detailTitle;
					}
				})
			},
			activityAgree(){//活动点赞
				if(this.isShow){//app点赞
					if(!localStorage.userId){
						this.tologin()					 
					}else{
						if(this.detailObj.agreeFlag){
							this.$toast('您已经点过赞了')
							return
						}
						this.updateActivityAgreeCount()
					}
				}else{//网页点赞
					this.updateActivityAgreeCount()
				}
			},
			updateActivityAgreeCount(){//更新活动点赞数量
				const self=this
				 this.ajax({
					url:'/voluActivityDetail/activityAgree', 
					data:{
						activityDetailId:this.$route.params.id,
						userId:localStorage.userId || ''
					},
					type:"post"
				},function(data){
					if(data.result){
						//self.detailObj.agree+=1
						self.detailObj.calaCount=self.detailObj.calaCount+1;
						self.detailObj.agreeFlag=true
					}else{
						self.$toast(data.description)
					}
					
				})
			},
			remarkAgree(remarkObj){//活动评论点赞
				if(this.isShow){//app点赞
					if(!localStorage.userId){
						this.tologin()						 
					}else{
						if(remarkObj.agreeFlag){
							this.$toast('您已经对该评论点过赞了')
							return
						}		
						this.updateRemarkAgreeCount(remarkObj);
					}
				}else{
					this.updateRemarkAgreeCount(remarkObj);
				}
			},
			updateRemarkAgreeCount(remarkObj){//更新评论点赞数量
				const self=this
				 this.ajax({
					url:'/unionActivitiesRemark/remarkcalc', 
					data:{
						remarkId:remarkObj.remarkId,
						userId:localStorage.userId  || ''
					},
					type:'post'
				},function(data){
					if(data.result){
						//self.detailObj.agree+=1
						remarkObj.calcCount=remarkObj.calcCount+1
						remarkObj.agreeFlag=true
					}else{
						self.$toast(data.description)
					}
					
				})
			},
			addFavorite() {//收藏
				if(this.isShow){//app点赞
					let self = this;
					if(!localStorage.userId) {
						this.tologin()
						return
					}
					if(self.detailObj.favoriteFlag == true) {
							self.$toast('你已经收藏了！')
							return;
					}
					let obj = {
						infoClassId: self.detailObj.sicId,
						infoDetailId: self.detailObj.activitiesDetailId,
						infoTitle: this.detailObj.detailTitle,
						infoPictureUrl: this.detailObj.poster,
						userId: localStorage.userId,
						collType:"1"
					}
					this.ajax({
						url: '/sysUserFavorite/add',
						data: obj,
						type: 'post'
					}, function(data) {
						self.$toast(data.description)
						if(data.result){
						   self.detailObj.favoriteFlag = true
						}
					})
				}else{
					this.$messagebox.alert("请下载爱工惠app进行收藏").then(action => {
					});
				}
			}
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
	}
	.ellip {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.activity-title{position: absolute; left: 0px; bottom: 0px; padding-left: 10px; font-size: 16px; color: #ffffff; background-color: #000000; opacity: 0.6; height: 38px; line-height: 38px; width: 100%;}
	.activity-item{background: #FFFFFF;padding: 15px 10px ; background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
    background-size: 120% 1px;
    background-origin: content-box;
    background-repeat: repeat-x; }
    .activity-item-title{color: #FD7B27; padding: 0; margin: 0;margin-bottom: 10px;}
    .active-baoming{background-color: #fd7b27;color: white;}/*我要报名*/
	.active-baoming-ending{background-color:#ff9d5d;color: white;}/*报名截止*/
	.active-ending{background-color: #e5e5e5;color: #999999;}/*活动结束*/
</style>
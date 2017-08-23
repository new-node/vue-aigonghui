<template>
  <div id="volunteer_activity">
  	<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 70px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false' style="padding-bottom: 40px;">
	  		<div v-if="activityList.length==0" style="text-align: center;background: white;padding: 10px ">
					暂无志愿活动数据
				</div>
				<on-touch @longTap='deletecollectitem(obj)' v-for="obj in activityList" >
						<mt-cell  @click.native="jumpto({name:'volunteer_activity_detail',params:{title:obj.detailTitle,id:obj.activitiesDetailId}})">
					    	<div slot='title' >
					    		 <table  width="100%">
					    		 	<tr>
					    		 		<td width="100px"> <!--:src="obj.iconUrl||''"-->
					    		 		     <div style="width: 130px; height: 100px;overflow: hidden; ">
					    		 		     	<div style="position: relative; width: 130px; height: 100px; overflow: hidden;">
					    		 		     	<img v-show="obj.buttonState!='已结束'" src="./imgs/activity_going.png" style="position: absolute; left: 5px; top:5px; width: 20px;"/>
					    		 		     	<img v-show="obj.buttonState=='已结束'"  src="./imgs/activity_ending.png" style="position: absolute; left: 5px; top:5px; width: 20px;"/>
							 			     	 <img  :src="obj.poster || ''" style=" width: 245px;" @error="$event.target.src=errornews"> 
							 			     	 </div>
							 				 </div>
					    		 		</td>
					    		 		<td style="line-height: 1.5;">
					    		 			<div style="margin-left: 5px; overflow: auto;" >
					    		 				<div style=" margin-top: 5px; font-size: 15px; color: #222; line-height: 23px; height:23px; margin-bottom: 0;" class="ellip">{{obj.detailTitle}}</div>
						    		 			<div style="font-size: 12px;color: #8c8c8c; margin-top: 5px;">已有{{obj.signCount || 0}}人报名参与</div>
						    		 			<div style="font-size: 12px;color: #8c8c8c; margin-top: 5px;white-space:nowrap;">
						    		 				截止日期：{{obj.endTime| formatDate | formatDate}}
						    		 				<!--<span style="float: right;">阅读量:12</span>-->
					    		 			  </div>
					    		 			  <div style="float: right;">
					    		 			  	<!--<mt-button size="small" :disabled="!(nowDate<obj.baoming && !obj.baomingFlag)" style=" width:90px;  box-shadow: none; margin-right: 5px;" 
						    		 					:class="{'active-baoming':nowDate<obj.baoming,'active-baoming-ending':nowDate>=obj.baoming && nowDate<obj.ending,'active-ending':nowDate>=obj.ending}">
						    		 					<span v-show="nowDate<obj.baoming && obj.baomingFlag">已报名</span>
						    		 					<span v-show="nowDate>=obj.baoming && nowDate<obj.ending">报名截止</span>
						    		 					<span v-show="nowDate>=obj.ending">已结束</span>
						    		 					<span v-show="nowDate<obj.baoming && !obj.baomingFlag">我要报名</span>
						    		 				</mt-button>-->
						    		 				<mt-button size="small" :disabled="obj.buttonState!='我要报名'" style=" width:90px;  box-shadow: none; margin-right: 5px;" 
						    		 					:class="{'active-baoming':obj.buttonState=='我要报名' || obj.buttonState=='已报名','active-baoming-ending':obj.buttonState=='报名截止','active-ending':obj.buttonState=='已结束'}">
						    		 					{{obj.buttonState}}
						    		 				</mt-button>
						    		 				<!--<mt-button v-show="$route.name==='mine_volunteer_activity'" size="small" @click.stop="getCouponCode(obj)" style=" width:90px;  box-shadow: none; margin-right: 5px;background-color: #fd7b27;color: white;">
						    		 					查看券码
						    		 				</mt-button>-->
						    		 			</div>
					    		 			</div>
					    		 		</td>
					    		 	</tr>
					    		 </table>
					    	</div>
						</mt-cell>
				</on-touch>
				<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	    		<mt-spinner type="fading-circle"></mt-spinner>
	    		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	  		</p>
	  		<!--<p v-show="allLoaded" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;">
	    		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	  		</p>-->
			</div>
		</div>
		<div v-show="$route.name=='unionactivity'"  class="btn-fiexed">
			<mt-button size="large" @click.native="goto({name:'mine_volunteer_activity',params:{title:'我报名的活动'}})" style=" background: #fd7b27;" type="primary">我报名的活动</mt-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import errornews from './imgs/errornews.png'
export default{
	name:'volunteer_activity',
	data(){
		return{
			activityList:[],
			//底部自动加载更多
				count:10,//最新一页评论数
			    loading:false,//评论是否加载更多
        		allLoaded: false,
       			wrapperHeight: 0,
			url:'/voluActivityDetail/getAllActivity',
			infoClassId:'',
			errornews:errornews
		}
	},	
	/*beforeRouteEnter (to, from, next) {
	    if(to.name==="unionactivity1" || to.name==="mine_volunteer_activity"){
		    	if(!localStorage.userId){
              next({name: 'login',title:'登录'})
		    			return 
		    	}
	    }
	    next();
	},*/
	created(){
				if(this.$route.name==='unionactivity'){//全部活动
					this.url='/voluActivityDetail/getAllActivity'
				}else if(this.$route.name==='unionactivity1'){//我收藏的活动
				  this.url='/voluActivityDetail/getFavoriteList'
					this.infoClassId=this.$route.params.sicId
				}else if(this.$route.name==='mine_volunteer_activity'){//我报名的活动
					this.url='/voluActivityUserSignRecord/getMeActivity'
				}
				/*this.activityList=[],
				this.count=10,
				this.loading=false,*/
				this.getActivityList(0);
	},
	mounted() {
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	},
//	beforeRouteEnter (to, from, next) {
//		    if(!localStorage.userId){
//              next({name: 'login',title:'登录'})
//		    	return 
//		    }
//		    next()
//		},
	watch:{
			'$route'(val,oldVal){
				if(val.name===oldVal){
						if(this.$route.name==='unionactivity'){//全部活动
							this.url='/voluActivityDetail/getAllActivity'
						}else if(this.$route.name==='mine_volunteer_activity'){//我报名的活动
							this.url='/voluActivityUserSignRecord/getMeActivity'
						}
						this.activityList=[],
						this.count=10
						this.loading=false
						this.getActivityList(0);
						//底部自动加载更多
        		this.allLoaded=false
       			this.wrapperHeight=0
						}
			}
		},
	methods:{
		jumpto(obj) {
        this.$router.push(obj)
		},
		goto(obj) {
			console.log(localStorage.userId)
			if(!localStorage.userId){
					this.tologin()
					 
				}else{
					this.$router.push(obj)
				}
		},
		handleBottomChange(status) {
	    	this.bottomStatus = status;
	  },
		loadMore() {
			this.loading = true;
				setTimeout(()=>{
					if(this.count<10){
						this.allLoaded=true;
					}else{
						if(this.activityList.length!=0){
							this.getActivityList(this.activityList.length)
						}
					}
					this.loading = false;
				 },2000)
		},
		getActivityList(sum){
			var self=this;
			this.ajax({url:self.url,data:{userId:localStorage.userId || '',start:sum,infoClassId:self.infoClassId},type:"GET"},function(data){
				if(data.result){
					self.activityList=self.activityList.concat(data.obj)					
					self.count=data.obj.length;
				}else{
					self.count=0
				}
			})
			/*var activity1={baoming:'2017-01-20',ending:'2017-01-24',	baomingFlag:true}//活动结束
			this.activityList.push(activity1)
			var activity2={baoming:'2017-02-20',ending:'2017-02-24',	baomingFlag:true}//活动进行已报名
			this.activityList.push(activity2)
			var activity3={baoming:'2017-02-20',ending:'2017-02-24',	baomingFlag:false}//活动进行未报名
			this.activityList.push(activity3)
			var activity4={baoming:'2017-02-08',ending:'2017-02-24',	baomingFlag:true}//报名截止
			this.activityList.push(activity4)
			this.activityList.push(activity4)
			this.activityList.push(activity4)
			this.activityList.push(activity4)
			this.activityList.push(activity4)*/
		},
		deletecollectitem(obj) {//删除收藏			
			if(this.$route.name==='unionactivity1'){//我收藏的活动
					let self = this;
					this.$messagebox.confirm('你确定要取消这个收藏?', '提示', ).then(action => {
							this.ajax({
								url: '/sysUserFavorite/delete',
								data: {
									favoriteId: obj.favoriteId
								},
								type: 'post'
							}, (data) => {
								self.$toast({
									message: data.description,
									position: 'bottom',
								})
								if(data.result) {
									this.activityList.$remove(obj)
								} 
							})
						});
			}
		},
		getCouponCode(obj){//查看券码
				sessionStorage.qrcode=obj.qrcode;
				sessionStorage.couponCode=obj.couponCode
				this.$router.push({name:'mine_authcode'});
				//this.$toast("查看券码")
				return false;
		}
	}
}	
</script>
<style type="text/css">
	.ellip {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.btn-fiexed{
	right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    padding: 10px;
    font-size: 14px;
    background-color: white;
}
	.active-baoming{background-color: #fd7b27;color: white;}/*我要报名*/
	.active-baoming-ending{background-color:#ff9d5d;color: white;}/*报名截止*/
	.active-ending{background-color: #e5e5e5;color: #999999;}/*活动结束*/
</style>
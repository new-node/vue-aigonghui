<style type="text/css" scoped="scoped">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	.nav_ten td {
		height:80px;
		width: 100px;
	}
	
	.nav_ten img {
		width: 40px;
	}
	.mint-cell-wrapper{background-image: none;}
.box1{
  width: 100%;
  background: #FFFFFF;
  overflow: auto;
}
.item1{
	float: left;
	text-align: center;
 	min-width: 33.33333%;
 	max-width: 33.33333%;
 	color: #666;
 	border: solid 2px #f7f7f7;
}
.item2 {
	float: left;
	text-align: center;
 	min-width: 50%;
 	max-width: 50%;
 	color: #666;
 	border: solid 2px #f7f7f7;
}
.mint-cell-wrapper{padding:0 10px 0 0;}
.btn-detail{border-radius: 20px;height: 35px;line-height: 35px;	width: 105px;font-size: 14px;  background: rgb(253, 123, 39);color: white; margin-top: 15px; margin-bottom: 15px; box-shadow: none; }
</style>
<template>
	<div id="volunteer">
		<div  class="box1" >
			<div v-for='(obj,index) in nav' class="item2" >
				<div style=" width: 100%;" @click="jumpto(obj)">
					<img :src="obj.iconUrl||''" @error="$event.target.src=errorpng" width="40px" style="margin: 5px;"/>
					<div style="margin-top: 5px; margin-bottom: 5px;">{{obj.sicName}}</div>
				</div>
			</div>
		</div>
		<div>
			<div v-if="list.length==0" style="text-align: center;background: white;padding: 10px;">
				暂无志愿活动数据
			</div>
			<mt-cell v-if="list.length!==0" is-link title="最新活动" class="bornone" style="min-height: 20px; margin-top: 10px; background-color: transparent; color: #999999; font-size: 14px;" value="更多" @click.native="goto({name:'unionactivity'})">
				<img slot="icon" src="./imgs/assistor.png" width="10" height="18" style="margin-right: 10px;margin-left: -10px;">
			</mt-cell>
			<div style="overflow: auto;" class="" v-show="list.length>0">				
				<div class="mui-card" v-for='obj in list' style="margin:10px;" @click="goto({name:'volunteer_activity_detail',params:{id:obj.activitiesDetailId,title:obj.detailTitle}})">					
					<div class="mui-card-header mui-card-media" style="position: relative; height:145px; overflow: hidden;">
						<img :src="obj.signState=='进行中'?activity_going:activity_ending" style="position: absolute; left: 10px; top:10px; width: 30px;"/>
						<img :src="obj.poster || ''" @error="$event.target.src=errorBanner" width="100%" />
					</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner" style="padding: 10px 0; overflow: auto;">
							<!--<div style="font-size: 15px; color: #222222; margin-top: 15px;">{{obj.detailTitle}}	</div>
							<div style="font-size: 12px; margin-top:10px; color: #ff2222">已有{{obj.signCount || 0}}人报名参与</div>
							<mt-button size="small" class="btn-detail">查看详情</mt-button>-->
							<div style="float: left; width: 68%; overflow: auto;">
								<p style="margin:5px 5px 1px; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
									{{obj.detailTitle}}
								</p>
								<p style="color: #8c8c8c;margin:0px 5px 0px 5px; font-size: 12px; ">
									报名截止时间：{{obj.endTime| formatDate}}
								</p>
								<p style="font-size: 12px; color: #8c8c8c;">已有<span style="color: #FD7B27;">{{obj.signCount || 0}}</span>人报名参与</p>
							</div>
							<mt-button size="small" style="float: right; background: rgb(253, 123, 39);color: white; margin-top: 16px; box-shadow: none; margin-right: 5px;" >查看详情</mt-button>
		
					</div>
				</div>
				</div>
			</div>
		</div>
		<div style="margin:0 10px 10px 10px; font-size: 14px;" >
			<mt-button size="large" @click.native="gogoto({name:'mine_volunteer_activity'})" style=" background: #fd7b27;" type="primary">我报名的活动</mt-button>
		</div>
	</div>
</template>
<script type="text/javascript">
    import defaulthead from './imgs/defaulthead.png'
	import errorpng from './imgs/errormainicon.png'
	import errorBanner from './imgs/errorBanner.png'
	import activity_going from './imgs/activity_going.png'
	import activity_ending from './imgs/activity_ending.png'
	export default {
		name: 'volunteer',
		data() {
			return {
				errorBanner: errorBanner,
				selected: '',
				nav: [],
				list:[],
				errorpng: errorpng,
				defaulthead: defaulthead,
				activity_going:activity_going,
				activity_ending:activity_ending
			};
		},
		created() {
			//获取志愿服务的分类
			this.getClassList();
			//获取最新志愿活动
			this.getActivityList();
		},
		methods: {
			//获取志愿服务的分类
			getClassList(){
				var self = this
				this.ajax({
					url: '/sysInfoClass/classList',
					data: {
						smId: this.$route.params.id,
						//unionId: this.$route.params.unionId
					},
					type:"get"
				}, function(data) {
					//console.log(JSON.stringify(data))
					if(data.result) {
						if(data.result) {
						self.nav = data.obj
					    }
					}else {
						self.$toast(data.description)
					}
				})
			},
			//获取最新的志愿活动
			getActivityList(){
				var self=this;
				this.ajax({url:'/voluActivityDetail/newActivity',type:"GET"},(data) => {
					if(data.result){
						self.list=self.list.concat(data.obj)	
					}
				})
			},
			goto(obj){
				this.$router.push(obj)
			},
			gogoto(obj) {
				console.log(localStorage.userId)
				if(!localStorage.userId){
					this.tologin()
				}else{
					this.$router.push(obj)
				}
			},
			
			jumpto(obj) {
				if(obj.internalUrl){
					this.goto({name:obj.internalUrl,params:{title:obj.sicName,wish_type:"list",sicId:obj.sicId,smId:obj.smId,qasmId:obj.qasmId}})
				}else{
					if(!window.plus) {
						window.location.href = obj.extendUrl
					} else {
						this.$router.push({name:'blank',params:{url:obj.extendUrl,title:obj.sicName}})
					}
				}
			}
		}

	};
</script>
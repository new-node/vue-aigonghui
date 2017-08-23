<template>
	<div>
		<div style="margin-bottom: 16%;">
			<div v-for="obj in list" class="a_title">
				<a @click="goto(obj)">
					<div   style="padding-top: 12px;padding-bottom: 4px;" class="get_detail">
						<div slot="title" style="font-size: 15px; color: #999;">
							<div style="padding: 0 15px 6px 15px;">
								<span style="display: block;text-align: left;float: left;color: #666666;">{{obj.masterName}}</span>
								<span style="display: block;text-align: right;float: right;">{{obj.createTime |formatDate}}</span>
								<div style="clear: both;width: 0;height: 0;line-height: 0;"></div>
								<h4  style="margin-top: 15px;color: #666666; font-size: 16px;line-height: 20px;font-weight: normal;">
									会员卡号：{{obj.masterUnionCardNo}}						
								</h4>
							</div>
							<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
							<div style=" width: 100%; height: 35px;line-height: 35px;color: #FD7B27;position: relative;padding: 0 0 0 15px;">
								<img :src="obj.handleStatus=='71'?finished:ing" style="width: 15px; vertical-align:middle;margin-top: -5px;" />
								<span :class="{'hasDone':obj.handleStatus=='71'}" style="margin-left:10px ;">{{obj.handleStatusName}}</span>
							</div>
						</div>
					</div>
				</a>
				<div style="width: 100%;height: 12px;background: #F3F3F3;"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import ing from './imgs/wishing.png'
	import finished from './imgs/wishend.png'
	export default {
		data(){
			return {
				userId:'',
				//difficultId:'',
				list:[],
				ing:ing,
				finished:finished
			}
		},
		beforeRouteEnter (to, from, next) {
		    if(!localStorage.userId){
                next({name: 'login',title:'登录'})
		    	return 
		    }
		    next()
		},
		created() {
			this.getApplyList();
		},
		methods: {
			getApplyList(){//获取申请列表
				const self = this;
				this.ajax({
					url: '/difficultInfo/pages',
					data: {
						userId:localStorage.userId
					},
					type: 'GET'
				}, function(data) {
					if(data.result) {
						self.list = data.obj;
					} else {
						self.$toast({
							message:data.description,
							duration:1000
						})
					}
				})
			},
//			this.$toast({
//			   message: '请输入真实姓名',
//			   position: 'bottom',
//			});
			goto(obj) {
				this.$router.push({name:'difficult_detail',params:{difficultId:obj.difficultId}})
			},
		},
	}
</script>

<style scoped="scoped">
	.hasDone{color:#c8c8c8;}
	h4{
		margin:0;padding: 0;
	}
	.get_detail{
		
	}
</style>
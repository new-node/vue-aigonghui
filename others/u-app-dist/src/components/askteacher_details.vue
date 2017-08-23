<style type="text/css">
	.cando span {
		display: inline-block;
		height: 25px;
		border: 1px solid #fff;
		text-align: center;
		padding: 3px;
		margin-right: 5px;
		line-height: 19px;
		margin-top: 5px;
		border-radius: 3px;
		color: #fff;
	}
	
	.main {
		padding: 20px 10px 10px;
	}
	
	.main p {
		word-wrap: break-word;
		word-break: normal;
		font-size: 15px;
		margin-top: 5px;
		color: #666;
	}
	
	.bbgg {
		background: url(imgs/askbg.png) no-repeat;
		background-size: 100% 100%;
	}
</style>
<template>
	<div style="background: #FFFFFF;">
		<div style="overflow: auto; height: 100%;" v-if="porsenObj!=''">
			<div class="bbgg" style=" padding-top: 20px; padding-bottom: 20px;">
				<img :src="porsenObj.photoUrl||''" @error="$event.target.src=defaulthead" style="width: 80px; height: 80px;border-radius: 50%; display: table-cell; margin: 0 auto; " />
				<p style="text-align: center; font-size: 17px; color: #fff; margin-bottom: 10px;">{{porsenObj.sysAduserInfo.aduserRealname}}</p>

				<div style="display: table; margin: 0 auto; color: #fff; text-align: center;" class="cando">
					<span v-for="itme in porsenObj.skills" style="margin-right: 3px; margin-bottom: 5px;color:#fff">{{itme}}</span>

				</div>

			</div>
			<div class="main">
				<span style=" display: inline-block; width: 7px; height: 17px; background-color: #FD7B27;margin-right: 5px; vertical-align: middle; margin-bottom: 4px;"></span>
				<span style="font-size: 17px; color: #8c8c8c;">介绍:</span>
				<div style="overflow: hidden; margin: 3px 0 15%; font-size: 14px; line-height: 25px; word-wrap:break-word;" v-html='porsenObj.profileRemark'></div>

			</div>

		</div>
		<div style=" position: fixed;bottom: 0px;width: 100%;background: #FFFFFF;text-align: center; ">
			<mt-button type="primary" style="font:16px '微软雅黑';background-color: #fd7b27;width: 90%;margin: 5px;" @click.native="jumpto({name:'wantask',params:{title:'咨询TA',aduserId:porsenObj.aduserId,name:porsenObj.sysAduserInfo.aduserRealname,photoUrl:porsenObj.photoUrl}})">我要咨询</mt-button>

		</div>

	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		name: 'askteacher_details',
		data() {
			return {
				defaulthead: defaulthead,
				selected: '',

				porsenObj: ''
			}
		},
		created() {
			var self = this;
			this.ajax({
				url: '/sysAduserAttr/detail',
				data: {
					aduserId: this.$route.params.aduserId
				}
			}, function(data) {
				if(data.result) {
					self.porsenObj = data.obj;
				} else {
					self.$toast(data.description || '出错了')
				}
			})
		},
		methods: {
			jumpto(web) {
				if(localStorage.userId) {
					this.$router.push(web)
				} else {
					if(!localStorage.userId) {
						this.tologin()
						return
					}
				}
			}
		}
	};
</script>
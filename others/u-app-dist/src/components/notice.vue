<style type="text/css">
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
<template>
	<div>
		<div style="background-color: #fff; background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat; padding-top:10px">

			<div style="color: #666; padding-left: 10px;">

				<!--<div style="float: left;">
					<img src="./imgs/sysmessage.png" style="margin-top: 10px; width: 40px; height: 40px;">
				</div>-->
				<div style=" margin-right: 10px; line-height: 5px; display: inline-block;">
					<div class="clearfix" style="margin-top: 15px;">
						<span style="font-size:17px ; color: #222;">{{msgobjdetail.noticeTitle}}</span>
						<!--<span style="float: right;font-size: 12px; color: #8c8c8c;">2016-11-12</span>-->
					</div>
					<p style="line-height: 23px; margin: 10px 0; font-size: 15px; word-wrap:break-word;" v-html="msgobjdetail.noticeContent">
					</p>
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'message',
		components: {},
		data(){
			return {
				msgobjdetail:'',
			}
		},
		created() {
			this.getmsgobjdetail()
		},
		methods: {
			getmsgobjdetail(){
				this.ajax({
					url: '/notice/getByNoticeId',
					data: {
						noticeId : this.$route.params.msgid,
					},
				}, (data) => {
					if(data.result) {
						this.msgobjdetail=data.obj
					} else {
						this.$toast({
							message: data.description,
							position: 'bottom',
						});

					}
				})
			},
		}
	}
</script>
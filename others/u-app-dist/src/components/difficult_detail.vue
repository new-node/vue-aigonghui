

<template>
	<div id="helpDetail" style="padding-top: 15px;background-color: #F3F5F7;">
		<div v-for="(obj,index) in list" class="detaillist">
			<div class="detailinfo" v-bind:class="{ active: index==list.length-1 }">
				<h3>{{obj.status}}</h3>
				<div class="textzoom">
					<p>{{obj.remark}}</p>
					<h4>{{obj.date}}</h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					list:[],
				}
			},
			created() {
				this.getStatus();
			},
			mounted(){
				
			},
			updated(){
			},
			methods: {
				getStatus(){
					const self = this
					let data={}
					data = {
						difficultId: this.$route.params.difficultId
					}
					this.ajax({
						url: '/difficultInfo/getStatus',
						data: data,
						type: 'GET'
					}, function(data) {
						if(data.result) {
							self.list = data.obj;
						} else {
							self.$toast(data.description);
						}
					});
				},
			},
	}
</script>
<style type="text/css" scoped>
	.detaillist{
		width: 95%;
		margin: 0 auto;
		margin-top: 10px auto 0 auto;
		margin-bottom: 15px;
		height: 75px;
		border-radius: 5px;
		background-color: white;
	}
	 .detailinfo{
		width: 100%;
		height: 100%;
		background-image: url(./imgs/defficult2.png);
		background-repeat: no-repeat;
		background-size:contain;
		line-height: 75px;
		padding-left: 20px;
		
	}
	.active{
		width: 100%;
		height: 100%;
		background-image: url(./imgs/defficult1.png);
		background-repeat: no-repeat;
		background-size:contain;
		line-height: 75px;
		padding-left: 20px;
	}
	
	
	.detailinfo h3{
		display: block;
		width: 16%;
		color: white;
		margin: 0;
		padding: 0;
		
		font-weight: normal;
		float: left;
	}
	.textzoom{
		float: right;
		width: 80%;
		height: 100%;
		line-height: 18px;
		padding: 8px 12px 4px 0;
		margin-left: 5px;
		position: relative;
		overflow: hidden;
	}
	.textzoom p{
		margin: 0;
		color: #666666;
		word-spacing: 8px;
		letter-spacing: 1px;
		padding-left: 0.5em;
	}
	.textzoom h4{
		display: block;
		position: absolute;
		right: 15px;
		bottom: 5px;
		font-size: 13px;
		margin: 0;
		padding:0;
		font-weight: normal;
		color: #ADADAD;
		width: 100%;
		text-align: right;
	}
</style>

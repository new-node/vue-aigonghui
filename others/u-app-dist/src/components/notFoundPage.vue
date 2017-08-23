<template>
	<div id="miss">
		<div class="missPage">
			<img src="./imgs/missPage.png" />
		</div>
		<div class="missText">
			<h3>呀，页面出错啦！</h3>
		</div>
		<div class="missText retry" @click="back()">
			<h3>页面升级中</h3>
		</div>
		
	</div>
</template>
<style lang="less">
	
	
	
</style>
<script>
	import $ from 'jquery'
	import {JSEncrypt} from '../js/jsencrypt.js'
	
	export default {
		data() {
			return {
				phonenumber: '',
				userpassword: '',
				clientId: 'browser', //plus.push.getClientInfo().clientid
				thridname: '',
				thridid: '',
				thridtype: '',
			}
		},
		methods:{
			back(){
				//window.location.reload();//刷新当前页面
				this.$router.back();
			}
		},
	}
</script>
<style>
	.missPage{
		width: 210px;
		height: 210px;
		margin: 0 auto;
		margin-top: 120px;
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
	}
	.retry h3{
		margin: 5px;
		padding: 0;
		color: #FD6F27;
	}
</style>

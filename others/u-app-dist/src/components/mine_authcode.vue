<template>
	<div id="authcode">
		<div class="bg" style="text-align: center;">
			
			<div v-show="canShow">
				<div style="padding-top: 5%;background: transparent;"><h3>{{detailTitle}}</h3></div>
				<img  id="qrcode" :src="qrcode" width="80%" style="display: block;margin:0 auto;margin-top:35px ;"/>
			</div>
			<p class="changenumber" style="">
				<span>兑换券码</span><br />
				<span style="color:#FD863D ;font-size: 16px;letter-spacing:2px;">{{couponCode}}</span>
			</p>
			<!--<p id="url" style="color:#4F4F4F;">www.shuxunit.com</p>
		
		<!--<footer class="" style="z-index: 99; position: fixed;left: 33%; bottom: 10px;width: 33%; text-align: center;background: transparent;"   >
			<p style="font-size:14px ;margin: 0 auto;" @click="phone()">联系我们:</p>
			<p style="font-size:14px ;margin: 0 auto;" @click="phone()">0531-88989759</p>
		</footer>-->
		</div>
	</div>
</template>

<script>
	export default {
		name:"authcode",
		data() {
				return {
					qrcode:sessionStorage.qrcode,
					couponCode:sessionStorage.couponCode,
					detailTitle:'',
					canShow:false,
				}
			},
		created(){
			this.detailTitle=this.$route.params.detailTitle;
		},
		mounted() {
			if(this.qrcode!="undefined" && this.qrcode!=null && this.qrcode!="" && this.qrcode!=undefined){
				this.canShow=true
			}
		},
		computed: {
		 },
		beforeRouteLeave (to, from, next) {
			sessionStorage.removeItem("qrcode"); 
			sessionStorage.removeItem("couponCode"); 
			sessionStorage.removeItem("detailTitle"); 
			next();
		},
		methods: {
			goto(page) {
				this.$router.push(page);
			},
		},
		components: {

		}
	}
</script>
<style>
	#authcode{
		background: #F3F5F7;
		width: 100%;
		height: 100%;
		
	}
	
	#authcode .bg{
		width: 96%;
		height: 100%;
		margin: 0 auto;
		
		background-image:url(./imgs/changebg.png) ;
		background-size:100% 100% ;
		background-position:0 0 ;
		background-repeat:no-repeat ;
		margin-top: 60px;
	}
	#authcode h3{
		display: block;
		margin: 0 auto;
		font-weight: normal;
		max-width:80% ;
		height:43px;
		text-align: center;
		line-height: 55px;
		white-space:nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	#authcode .changenumber{
		color:#4F4F4F;margin: 0 0 100px 0;
	}
	@media only screen and (max-height: 480px) {
	    #authcode .changenumber{
			color:#4F4F4F;margin: 0 0 25px 0;
		}
		#qrcode{
			margin-top: 20px;
		}
		
	}
</style>

 
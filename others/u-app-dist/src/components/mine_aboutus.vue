<template>
	<div >
		<div style="height: 90px;"></div>
		<div style="text-align: center; ">
			<img id="qrcode" src="./imgs/aboutus.png" width="30%" />
			<p id="appVersion"></p>
  版本号：{{appversion}}
			<p style="color:#4F4F4F;">山东天甲网络科技有限公司</p>
			<p id="url"  style="color:#4F4F4F; margin-top: 50%;"> http://www.tjnit.com/</p>


		
		</div>
		<!--<footer class="" style="z-index: 99; position: fixed;left: 33%; bottom: 10px;width: 33%; text-align: center;background: transparent;"   >
			<a href="tel:0531-88989759">
				<p style="font-size:14px ;margin: 0 auto;" @click="phone()">联系我们:</p>
				<p style="font-size:14px ;margin: 0 auto;" @click="phone()">0531-88989759</p>
			</a>
		</footer>-->
	</div>
</template>

<script>
	export default {
		data() {
				return {
					appversion:'1.0.0'
				}
			},
			mounted() {
				let self = this
				if(window.plus){
					plus.runtime.getProperty(plus.runtime.appid, (inf)=> {
						self.appversion="V"+inf.version
					})
				}
			},
			computed: {
			 },
			methods: {
				goto(page) {
					this.$router.push(page);
				},
				phone() {
//				plus.device.dial("0531-88989759", true);
				},
				openweb(href){
					if(!window.plus){
						window.location.href=href
					}else{
						plus.webview.open(href,'blank',{top: '88px',scalable: true},"pop-in");
					}
				}
			},
			components: {

			}
	}
</script>

<style scoped lang="less">
</style>
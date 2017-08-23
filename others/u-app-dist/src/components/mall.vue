<template>
	<div></div>
</template>
<script type="text/javascript">
	var base64 = require('base-64')
	export default {
		name: 'mall',
		created() {
			var hh = {
				top: '46px',
				height: (document.documentElement.clientHeight - 46) + 'px'
			};
			var self = this;
			var d = plus.webview.open(this.$route.params.url, 'blank', hh);
			d.addEventListener("loaded", function(e) {
				var currentUrl = d.getURL();
				console.log(currentUrl)
				if(currentUrl.indexOf('account.login') > 0) {	
					var params = { title: '登录' }
					var backUrl = self.getParam(currentUrl, 'backurl')
					if(backUrl != null) {
						var lbackurl = base64.decode(decodeURIComponent(backUrl))
						console.log(lbackurl)
						params["backUrl"] = lbackurl
					}
					self.$router.push({ name: 'login', params: params })
					setTimeout(function() {
						d.close()
					}, 0)
				}
			}, false);
			
			setTimeout(function(){
				d.setStyle( {height:(document.documentElement.clientHeight - 46) + 'px'} );
				},1000)
		},
		methods: {
			getParam(url, name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = url.substr(url.indexOf('?')).match(reg);
				if(r != null) return unescape(r[2]);//.replace("%",'');
				return null;
			}
		}
	}
</script>
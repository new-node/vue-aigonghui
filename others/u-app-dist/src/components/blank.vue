<template>
	<div>
		<div v-show="$route.params.share" style=" position: fixed;top:13px;z-index: 22;right: 10px; color: #f7f7f7;">
			<img width="24" @click='share()' src="./imgs/share_top.png" />
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'balnk',
		data(){
			return {
				shareInfo:'',
				blankWindow:''
			}
		},
		computed: {
			popupVisible() {
				return this.$store.state.popupVisible
			}
		},
		watch: {
			popupVisible(){
				if(this.popupVisible){
					this.blankWindow.setStyle( {height:(document.documentElement.clientHeight - 46-78) + 'px'} );
				}else{
					this.blankWindow.setStyle( {height:(document.documentElement.clientHeight - 46) + 'px'} );
				}
				
			},
			$route(){
				if(this.$route.name=='activityLink'){
					var self=this;
					var style = {
						top: '46px',
						height: (document.documentElement.clientHeight - 46) + 'px',
						scalable: true
					};
					this.blankWindow=plus.webview.open(this.$route.params.url,'blank',style);
				}
			}
		},
		created(){
			var self=this;
			var style = {
				top: '46px',
				height: (document.documentElement.clientHeight - 46) + 'px',
				//width:'300px',
				scalable: true
			};
			this.blankWindow=plus.webview.open(this.$route.params.url,'blank',style);
			//this.evalJS()
		},
		beforeRouteLeave (to, from, next) {
	    	sessionStorage.removeItem("shareInfo")
	    	next();
	  	},
		methods:{
			evalJS() {
				var meta='<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">'
				//this.blankWindow.evalJS("alert('evalJS: '+location.href);");$("head").prepend(meta);
				var meta1="var oMeta = document.createElement('meta');oMeta.name='viewport'; oMeta.content = 'width=device-width, initial-scale=0.5, user-scalable=no';document.getElementsByTagName('head')[0].appendChild(oMeta);"
				this.blankWindow.evalJS(meta1)
			},
			getShareInfo(){
				if(sessionStorage.shareInfo){
					this.shareInfo=JSON.parse(sessionStorage.shareInfo)
				}
			},
			share() {				
				this.getShareInfo()
				if(this.$store.state.shares == '') {
					this.$toast("获取分享服务失败")
				} else {
					/*var obj={
						href:this.bannerInfo.bqUrl,
						title:this.bannerInfo.template,
						content:this.bannerInfo.template,
						thumbs:[this.bannerInfo.bqPhotoUrl],
						pictures:[this.bannerInfo.bqPhotoUrl],
						contentType:10,
						detailId:this.bannerInfo.bannerId
 
					}*/
					var obj=this.shareInfo;
					this.$store.commit('updateShareDetail', obj)
					this.$store.commit('updatePopupVisible', true)
				}
			},
		}
	}
</script>
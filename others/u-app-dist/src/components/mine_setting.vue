<template>
	<div>
		<mt-cell title="账号与安全" @click.native="goto({name:'mine_security'})" is-link>
		</mt-cell>
		<mt-cell title="通用" @click.native="goto({name:'mine_setting_universal'})" is-link>
		</mt-cell>
		<mt-cell title="关于我们"  @click.native="goto({name:'mine_aboutus'})" is-link>
		</mt-cell>
		<div style="padding: 20px;">
			<mt-button size="large" @click.native="exit()" style="margin-top: 10%; background: #fd7b27;" type="primary">退出账户</mt-button>
		</div>
	</div>
</template>

<script>

	import $ from 'jquery'
	
	export default {
		data() {
				return {
				}
			},
			mounted() {
			},
			computed: {
			 },
			methods: {
				goto(page) {
					this.$router.push(page);
				},
				exit(){
					localStorage.removeItem('userId');
					localStorage.removeItem('userPhone');
					  
					localStorage.removeItem('bindcard');
					localStorage.removeItem('bindstate');
					  
					localStorage.removeItem('userName');
					localStorage.removeItem('userSex');
					localStorage.removeItem('headurl');
					   
				    localStorage.removeItem('isFormal');
					localStorage.removeItem('canTransfer');
					localStorage.removeItem('isFormaldes');
					localStorage.removeItem('transferdes');
					
//					let outURL = 'http://localhost:8000/WeEngine-Laster-Offline-1/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=account.logout';				
//					let outURL = 'http://test.zb12351.com:8000/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=account.logout';
					let outURL = 'http://weixin.zb12351.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=account.logout';
					
					$.ajax({
						url: outURL,
						type: "get",
						dataType: "jsonp",/*加上datatype*/
						success: function(data){
							console.log(data);
						},
						error: function(data){
							console.log(data);
						}
					});  
					   
					   history.back();

					this.$toast({
						message: '成功退出',
						position: 'bottom',
					});
				},
				
			},
			components: {

			}
	}
</script>


<style scoped lang="less">
</style>
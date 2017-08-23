<template>
	<div>
		<div v-show="step==1">
			<mt-field label="" placeholder="请输入当前认证手机号" v-model="compare" type="tel" :attr="{maxlength:11}"></mt-field>
			<mt-cell :title="secphone">
			</mt-cell>
			<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
				<mt-button size="large" @click.native="next()" style="margin-top: 10%; background: #fd7b27;" type="primary">验证</mt-button>
			</div>
		</div>
		<div v-show="step==2">
			<mt-field label="" placeholder="请输入新的手机号" v-model="changenumber" type="tel" :attr="{maxlength:11}">
				<!--<mt-button type="danger"  @click.native="authcode" style="background: #fd7b27;">获取验证码</mt-button>-->
				<mt-button  :disabled="plain" size="small" style="background: #fd7b27;color: white;margin-top: 10px;" @click.native="verifyphonenumber">{{btnText}}</mt-button>
				<!--<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">获取验证码</mt-button>-->
			</mt-field>
			<mt-field label="" placeholder="请输入验证码" v-model="authcode"  type="text" :attr="{maxlength:7}"></mt-field>
			<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
				<mt-button size="large" @click.native="sub()" style="margin-top: 10%; background: #fd7b27;" type="primary">认证</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					step: 1,
					secphone:'',
					compare:'',
					phonenumber: '',//传参电话
					changenumber: '',//改变的电话号码

					plain: false,
					btnText: '获取验证码',
					authcode:'',//用户输入的验证码
					returnauthcode:'',//'813305',记录返回的验证码
					bakphonenumber:'',//'15112345678',备份发送验证码的手机号码
				}
			},
			mounted() {
				this.phonenumber = this.$route.params.phonenumber;
				if(!this.phonenumber){
					this.step=2;
				}else{
					this.secphone=this.phonenumber.substring(0,3)+'****'+this.phonenumber.substring(7,11)
				}
			},
			computed: {},
			methods: {
				bindphoneajax(){
					let self=this;
//					alert(this.$route.params.thridid+"  "+ this.$route.params.thridtype+ "  "+this.$route.params.thridname+ "   "+this.changenumber)
					this.ajax({
							url:'/sysUserInfo/telBind',
							data:{
								type:self.$route.params.thridtype||'',
								id:self.$route.params.thridid||'',
								telphone:self.changenumber||'',
								idName:self.$route.params.thridname||'',
							},
							type:'post'
						},function(data){
//							alert(JSON.stringify(data))
							self.$toast({
								message: data.description,
								position: 'bottom',
								});
							if(data.result){
								localStorage.userId=data.obj.userId
								localStorage.userPhone=data.obj.userPhone
								self.$router.push({name:'homepage'});
							}else{
								
							}
							
						})
				},
				changephoneajax(){
					let self=this;
					this.ajax({
							url:'/sysUserInfo/telphoneUpdate',
							data:{
								userPhone:self.changenumber||'',
								userId:localStorage.userId||'',
							},
							type:'post'
						},function(data){
							self.$toast({
								message: data.description,
								position: 'bottom',
								});
							if(data.result){
								localStorage.userPhone=self.changenumber
								history.back();
//								this.$router.push({name:'homepage'});
							}else{
								
							}
							
						})
				},
				next() {
					if(this.compare==this.phonenumber){
						this.$toast({
						message: '验证成功',
						position: 'bottom',
						});
						this.step = 2;
					}else{
						this.$toast({
						message: '验证失败',
						position: 'bottom',
						});
					}
					
				},
				sub() {
					//验证码和手机对应校验
					//					this.code==;
					if (!/^1[34578]\d{9}$/.test(this.changenumber)) {
						this.$toast({
						  message: '请输入正确的手机号',
						  position: 'bottom',
						});
						return;
					}
					if (this.authcode=='') {
						this.$toast({
						  message: '验证码不能为空',
						  position: 'bottom',
						});
						return;
					}
					
					if (this.bakphonenumber==''||this.returnauthcode=='') {
						this.$toast({
						  message: '请先获取验证码',
						  position: 'bottom',
						});
						return;
					}
					
					
					if(this.bakphonenumber==this.changenumber){
						
					}else{
						this.$toast({
						  message: '手机号不一致',
						  position: 'bottom',
						});
						return;
					}
					if (this.authcode==this.returnauthcode) {
						this.nextflag = true;
					}else{
						this.$toast({
						  message: '验证码错误',
						  position: 'bottom',
						});
						return;
					}
					
					
					
//					if (true) {
//						
//					}else{
//						this.$toast({
//						  message: '验证码错误',
//						  position: 'bottom',
//						});
//						return ;
//					}
					
					if(!this.phonenumber){
						this.bindphoneajax()
						
						
					}else{
						this.changephoneajax()
//						history.back();
//						this.$toast({
//						message: '认证成功',
//						position: 'bottom',
//						});
					}
					
				},
				verifyphonenumber(){
					var self = this;
					var type = 'changeBind';
					//验证手机号是否被占用
					if (!/^1[34578]\d{9}$/.test(this.changenumber)) {
						this.$toast({
						  message: '请输入正确的手机号',
						  position: 'bottom',
						});
						return;
					}
					this.ajax({
						url:'/sysUserInfo/textPhone',
						data:{
							telphone:self.changenumber||'',
							type:type
						},
						type:'get'
						},function(data){
							self.log(data)
							if(data.result){
								//self.$toast("手机号码被占用！")
								self.returnauthcode=data.obj
								if(self.plain) {
									return
								} else {
									self.plain = true
									var count = 100;
									var ss = setInterval(function() {
										self.btnText = (count--) + '秒后可重发'
										if(count == 0) {
											clearInterval(ss);
											self.plain = false;
											self.btnText = '获取验证码'
										}
									}, 1000)
								}
								self.bakphonenumber=self.changenumber
							}else{
								self.$toast({
									message: data.description,
									position: 'bottom',
								});
								//self.getauthcode()
							}
						
					})
				},
//				getauthcode() {
//					//验证手机号是否被占用
//					var self = this;
//					if(this.plain) {
//						return
//					} else {
//						this.plain = true
//						var count = 100;
//						
//						var ss = setInterval(function() {
//							self.btnText = (count--) + '秒后可重发'
//							if(count == 0) {
//								clearInterval(ss);
//								self.plain = false;
//								self.btnText = '获取验证码'
//							}
//						}, 1000)
//					}
//					self.bakphonenumber=self.changenumber
//					this.ajax({
//							url:'/sysUserInfo/getSMScode',
//							data:{
//								phone:self.changenumber,
//							},
//							type:'get'
//						},function(data){
//							self.$toast({
//								message: data.description,
//								position: 'bottom',
//								});
//							if(data.result){
//								self.returnauthcode=data.obj
//							}else{
//								
//							}
//						})
//					
//					
//				}
			},
			components: {

			}
	}

</script>

<style scoped lang="less">
	/*@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}*/
	/*input{
		background-color: rgba(193, 28, 28, 0);
	}*/
	
	.linee {
		color: #444;
		font-size: 12px;
	}
	
	.multloginbutton {
		border-radius: 50%;
		height: 50px;
		width: 50px;
		margin: 20px
	}
	.mint-button--small{font-size: 12px; padding: 0 8px; margin-right: 10px;height: 32px;}
</style>
<style  type="text/css" lang="less">
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
	
	/*.mint-cell-wrapper {
		padding: 0;
	}*/
	
	.line_b {
		background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		background-size: 120% 1px;
		background-repeat: no-repeat;
		background-position: bottom left;
		background-origin: content-box;
		align-items: center;
		box-sizing: border-box;
		display: flex;
		overflow: hidden;
		padding: 0 10px;
		width: 100%;
	}
	.inputgroup1 .mint-button--small{font-size: 12px; padding: 0 8px;}
	
	.inputgroup1 .mint-field .mint-cell-title {
	    width: 30%;
	    -webkit-box-flex: 0;
	    -ms-flex: none;
	    flex: none;
	    flex-grow: 0;
	    flex-shrink: 0;
	    flex-basis: auto;
	}
</style>

<template>
	<div>
		<div v-show="nextflag==false">
			<div style="height: 120px;"></div>
			<div class="inputgroup1" style="width: 94%; margin: 0 auto 0; background-color: #fff; border-radius: 5px;position: relative;">
				<div style="position:absolute;right: 3px;top: 65px;z-index: 9000;">
					<!--获取验证码按钮<label class="mint-button-text">获取验证码</label>-->
					<mt-button :disabled="plain" size="small" style="background: #fd7b27;color: white;margin-top: 5px;" @click.native="verifyphonenumber()">{{btnText}}</mt-button>
				</div>
				<div style="position: absolute;width: 100%;height: 1px;  left: 0;top: 0px;background-color: #F7F7F7;z-index: 3000; "></div>
				<mt-field label="手机号" placeholder="请输入手机号"   type="tel" v-model="phonenumber" :value="phonenumber"  :attr="{maxlength:11}" style="height: 60px;"></mt-field>
				<mt-field label="验证码" placeholder="请输入验证码"   v-model="authcode" :value="authcode" type="text"  :attr="{maxlength:15}" style="height: 60px;"></mt-field>
			</div>
			<!--下一步按钮-->
			<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
				<mt-button size="large" @click.native="verifycode()" style="margin-top: 10%;background: #fd7b27;;" type="primary">{{quicklogin}}</mt-button>
			</div>
		</div>

		<div v-show="nextflag==true">
			<div style="height: 120px;"></div>
			<div style=" width: 80%;  margin: 0 auto 0; background-color: #fff; border-radius: 5px;position: relative;">
				<div style="position: absolute;width: 100%;height: 1px;  left: 0;top: 0px;background-color: #F7F7F7;z-index: 3000; "></div>
				<mt-field label="密码" placeholder="请输入密码"   v-model="userpassword" :value="userpassword" type="password"  :attr="{maxlength:15}" style="height: 60px;"></mt-field>
				<mt-field label="确认密码" placeholder="请再次输入密码"    v-model="twicepassword" :value="twicepassword" type="password"  :attr="{maxlength:15}" style="height: 60px;"></mt-field>
			</div>
			<div style="display: none;">
				<textarea id="pubkeyid">MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDN+Q1ECMsromVJa1qp6odxWXeB
cb6RSPQkNy6vFcav5kkjvI8dZR+SqIl2qeDaOdavG4f5d1wUPaWQqJzASYbozGGk
iKt+uVNmDVGyyEhWkzO989DF2wZjBQ7NAStktD7MXnEC+ALVOHmt/qH84fELqKFp
bj6TAv2VxpqE3mrMgwIDAQAB</textarea>
			</div>

			<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
				<mt-button size="large" @click.native="finish()" style="margin-top: 10%; background: #fd7b27;" type="primary">确认</mt-button>
			</div>
		</div>

	</div>
</template>

<script>
	import $ from 'jquery'
	import {JSEncrypt} from '../js/jsencrypt.js'
	export default {
		data() {
				return {
					phonenumber: '',
					userpassword: '',
					twicepassword: '',
					nextflag: false,

					plain: false,
					btnText: '获取验证码',
					authcode: '', //验证码
					returnauthcode: '', //'813305',记录返回的验证码
					bakphonenumber: '', //'15112345678',备份发送验证码的手机号码
				
					quicklogin:'下一步',
					clientId:'',
//					appversion:3.2.0,
				}
			},
			created(){
				console.log(localStorage.appversion)
			},
			mounted(){
				if(window.plus) {
					this.clientId = plus.push.getClientInfo().clientid;
				}
				if(this.$route.params.title == '快捷登录'){
					
					this.quicklogin="登    录"
				}else{
					
				}
			},
			computed: {
				loginState: function() {
					return this.$store.state.loginState
				}
				
				
			},
			methods: {
				verifycode: function() {

//					this.nextflag = true;
//					return;
					
					if(!/^1[34578]\d{9}$/.test(this.phonenumber)) {
						this.$toast({
							message: '请输入正确的手机号',
							position: 'bottom',
						});
						return;
					}
					if(this.authcode == '') {
						this.$toast({
							message: '验证码不能为空',
							position: 'bottom',
						});
						return;
					}

					if(this.bakphonenumber == '' || this.returnauthcode == '') {
						this.$toast({
							message: '请先获取验证码',
							position: 'bottom',
						});
						return;
					}

					if(this.bakphonenumber == this.phonenumber) {

					} else {
						this.$toast({
							message: '手机号不一致',
							position: 'bottom',
						});
						return;
					}
					//					this.authcode==this.returnauthcode;
					if(this.authcode == this.returnauthcode) {
						
						
						if(this.$route.params.title == '快捷登录'){
							let self = this
							let phoneSys = ''
							if(window.plus) {
								phoneSys = plus.os.name;
							}
							this.ajax({
								url: '/sysUserInfo/userLogin',
								data: {
		
									type: 'quick',
									telphone:this.phonenumber || '',
									passWd: '',
									qqId:  '',
									WechatId:  '',
									clientId: this.clientId, //param.clientId
									phoneSys: phoneSys,
		
								},
								type: 'post'
							}, function(data) {
								if(data.result) {
										
									localStorage.userId = data.obj.userId
									localStorage.userPhone = data.obj.userPhone
		//							localStorage.userName = data.obj.userName
									localStorage.headurl = data.obj.photoUrl
									
									if(data.obj.userSex==2){
										localStorage.userSex='女士'
									}
									if(data.obj.userSex==1){
										localStorage.userSex='先生'
									}
									
									self.$toast({
										message: data.description,
										position: 'bottom',
		
									});
									self.$router.replace({name:'mine',params: { title: '我的' }});
									return;
								} else {
									self.$toast({
										message: data.description,
										position: 'bottom',
									});
									return;
								}
		
							})
						}else{
							this.nextflag = true;
						}
						
					} else {
						this.$toast({
							message: '验证码错误',
							position: 'bottom',
						});
						return;
					}

				},
				finish() {
					let self = this;
					if(!/^[0-9A-Za-z]{6,18}$/.test(this.userpassword)) {
						this.$toast({
							message: '密码长度在6-18之间，只能包含字符、数字和下划线。 ',
							position: 'bottom',
						});
						return;
					}
					if(this.twicepassword == this.userpassword) {

					} else {
						this.$toast({
							message: '两次密码不一样',
							position: 'bottom',
						});
						return;
					}

					if(this.$route.params.title == '注册') {

						this.ajax({
							url: '/sysUserInfo/registerUser',
							data: {
								clientId: self.clientId, //param.clientId
								telphone: self.phonenumber,
								passWd: self.userpassword,
							},
							type: 'post'
						}, function(data) {
							if(data.result) {
								self.$toast({
									message: data.description,
									position: 'bottom',
								});
//							self.$router.replace({name:'login',params: { title: '登录' }});
//							history.back();
							
							localStorage.userId = data.obj.userId
							localStorage.userPhone = data.obj.userPhone
							localStorage.userName = data.obj.userName
//							localStorage.headurl = data.obj.photoUrl

							let encrypt = new JSEncrypt();
							encrypt.setPublicKey($("#pubkeyid").val());
							// 加密
							var encryptPwd = encrypt.encrypt(self.userpassword);
							
//							let outURL = 'http://localhost:8000/WeEngine-Laster-Offline-1/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=account.login';
//							let outURL = 'http://test.zb12351.com:8000/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=account.login';
							let outURL = 'http://weixin.zb12351.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=account.login';
							let outParam = {
								mobile: self.phonenumber || '',
								pwd: encodeURI(encryptPwd).replace(/\+/g, '%2B') || '',
								from: 'app'
							};					
							
							$.ajax({
								url: outURL,
								type: "get",
								data: outParam,
								dataType: "jsonp",/*加上datatype*/
								success: function(data){
								},
								error: function(data){
								}
							});
								

							self.$router.replace({name:'mine',params: { title: '我的' }});

							} else {
								self.$toast({
									message: data.description,
									position: 'bottom',
									//								duration: 2000
								});

							}

						})
					} else {
//						let self = this
						this.ajax({
							url: '/sysUserInfo/passwdUpdate',
							data: {

								userPhone: self.phonenumber,
								newPassWd: self.userpassword, //newPassWd
							},
							type: 'post'
						}, function(data) {
							if(data.result) {
								self.$toast({
									message: data.description,
									position: 'bottom',
								});
//								self.$router.replace({name:'login',params: { title: '登录' }});
								history.back();
							} else {
								self.$toast({
									message: data.description,
									position: 'bottom',
									//								duration: 2000
								});
							}
						})
					}

				},

				verifyphonenumber() {
					var self = this;
					var type=self.$route.params.title == '注册'?'register':'forget';
					//验证手机号是否被占用
					if(!/^1[34578]\d{9}$/.test(this.phonenumber)) {
						this.$toast({
							message: '请输入正确的手机号',
							position: 'bottom',
						});
						return;
					}
					this.ajax({
						url: '/sysUserInfo/textPhone',
						data: {
							telphone: self.phonenumber || '',
							type:type
						},
						type: 'get'
					}, function(data) {
						if(data.result) {
							//self.getauthcode()	
//							if(!/^1[34578]\d{9}$/.test(this.phonenumber)) {
//								this.$toast({
//									message: '请输入正确的手机号',
//									position: 'bottom',
//								});
//								return;
//							}
							self.returnauthcode = data.obj
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
							//					console.log(e.target)
							self.bakphonenumber = self.phonenumber
						} else {
							self.$toast({
								message: data.description,
								position: 'bottom',
							});
						}
					})
				},

				getauthcode() {
					var self = this;
					

				}
			},
	}
</script>



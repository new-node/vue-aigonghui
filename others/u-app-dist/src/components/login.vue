<template>
	<div id="login">
		<div style="height: 120px;"></div>
		<div style=" width: 94%;  margin: 0 auto 0; background-color: #fff;border-radius: 5px;position: relative;">
			<div style="position: absolute;width: 100%;height: 1px;  left: 0;top: 0px;background-color: #F7F7F7;z-index: 3000; "></div>
			<mt-field label="用户名" placeholder="请输入手机号"  v-model="phonenumber" :value="phonenumber"  style="height: 60px;background-image: none;" :attr="{maxlength:11}"></mt-field>
			<mt-field label="密码" placeholder="请输入密码" type="password"  v-model="userpassword" :value="userpassword" style="height: 60px;background-image: none;" :attr="{maxlength:15}"></mt-field>
			<!--<div class="mint-cell-wrapper lin_psd" style="height: 60px;background-image: none;">
				<div class="mint-cell-title">
					<span class="mint-cell-text">密码</span>
				</div>
				<div class="mint-cell-value"><input style="background-color: transparent;" placeholder="请输入密码" v-model="userpassword" :value="userpassword" type="password" class="mint-field-core">
					<div class="mint-field-clear" style="display: none;">
						<i class="mintui mintui-field-error"></i>
					</div>
					<span class="mint-field-state is-default">
						<i class="mintui mintui-field-default"></i>
					</span>
					<div class="mint-field-other"></div>
				</div>
			</div>-->
			<!--<hr style=" height:0px;border:none;border-top:1px solid #E1E1E1; width: 97%; margin-left: 12px;" />-->
			<!--style="background-color: transparent;border-radius: 16px;"-->
			<!--<mt-field label="用户名"  placeholder="请输入用户名">
			</mt-field>
			<mt-field label="密码"   placeholder="请输入密码" type="password"></mt-field>-->
		</div>

		<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
			<mt-button size="large" @click.native="login()" style="margin-top: 10%;background: #fd7b27;" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</mt-button>
			<p style="font-size: 14px; color: #666;">
				<span @click="goto({name:'login_find_password',params: {title: '密码找回'}})" style="float:right;">忘记密码?</span>
				<!--<span @click="goto({name:'login_find_password',params: { title: '快捷登录' }})" style="float:right">快捷登录</span>-->
			</p>
		</div>
		
		<div style="display: none;">
			<textarea id="pubkeyid">MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDN+Q1ECMsromVJa1qp6odxWXeB
cb6RSPQkNy6vFcav5kkjvI8dZR+SqIl2qeDaOdavG4f5d1wUPaWQqJzASYbozGGk
iKt+uVNmDVGyyEhWkzO989DF2wZjBQ7NAStktD7MXnEC+ALVOHmt/qH84fELqKFp
bj6TAv2VxpqE3mrMgwIDAQAB</textarea>
		</div>

		<div style="text-align: center; margin-top: 30%; display: none;">
			<div class="linee1 mui-text-center" style="">
				<hr style="width: 20%; float:left; margin-left: 10%;" /> 第三方账号登录
				<hr style="width: 20%; float:right;margin-right: 10%;" />
			</div>
			<img style="width: 15%; margin: 20px 10px 0px;" @click="loginthird('qq')" src="./imgs/qq .png"></img>
			<img style="width: 15%;margin: 20px 10px 0px;" @click="loginthird('weixin')" src="./imgs/wechat.png"></img>
			<!--<img style="width: 15%;margin: 20px 10px 0px;" @click="loginthird('sinaweibo')" src="./imgs/sina.png"></img>-->
			<!--<mt-button class="multloginbutton" @click.native="loginthird('qq')" size="small" style="background-image: url(./imgs/qq .png);" type="primary">登录</mt-button>
			<mt-button class="multloginbutton" @click.native="loginthird('weixin')" size="small" style="background: #fd7b27;;" type="primary">登录</mt-button>
			<mt-button class="multloginbutton" @click.native="loginthird('sinaweibo')" size="small" style="background-image: url(imgs/qq .png);" type="primary">登录</mt-button>-->
			<!--<mt-button class="multloginbutton" size="small" style="" type="primary">test</mt-button>-->
		</div>
	</div>
</template>
<style lang="less">
	
	
	#login .linee1 {
		color: #444;
		font-size: 12px;
	}
	
	#login .multloginbutton {
		border-radius: 50%;
		height: 50px;
		width: 50px;
		margin: 20px
	}
	/*#login .line_b{background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: bottom left;
    background-origin: content-box;
  
    align-items: center;
    box-sizing: border-box;
   
    display: flex;
   
  
   
    overflow: hidden;
    padding: 0 10px;
    width: 95%;}*/
  /* .mint-cell-wrapper{padding: 0;}*/
   #login .mint-cell-title{width: 30%;}
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
			mounted() {
				if(window.plus) {
					this.clientId = plus.push.getClientInfo().clientid;
				}

			},
			computed: {
				loginState: function() {
					return this.$store.state.loginState
				}
			},
			methods: {
				loginface(param) {
					let self = this;
					let phoneSys = '';
					if(window.plus) {

						phoneSys = plus.os.name;
					}
					this.ajax({
						url: '/sysUserInfo/userLogin',
						data: {

							type: param.type,
							telphone: param.telphone || '',
							passWd: param.passWd || '',
							qqId: param.qqId || '',
							WechatId: param.WechatId || '',
							clientId: self.clientId, //param.clientId
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
							
							//document.activeElement.blur()
							
							 /*var date=new Date();
                             date.setDate(date.getDate()+5);
                             document.cookie='expires='+date;*/
							
							self.$toast({
								message: data.description,
								position: 'bottom',

							});
							var bl=self.$route.params.backUrl;
							if(bl!=null && bl!=undefined && bl!=''){
								let backURL = self.mui.mallUrl+self.$route.params.backUrl
								self.$router.replace({name:'mall',params:{url:backURL}})
							}else{
							    self.$router.back()
							}
							
//							self.$router.push({name:'homepage'});
						} else {
							if(param.type == 'tel') {
								self.$toast({
									message: data.description,
									position: 'bottom',
								});
							} else {
								//									alert(self.thridname+ "  =  "+ self.thridid + "  ==" +self.thridtype)
								self.$router.push({
									name: 'mine_bindphone',
									params: {
										thridname: self.thridname,
										thridid: self.thridid,
										thridtype: self.thridtype
									}
								});
							}

						}

					})
					
					let encrypt = new JSEncrypt();
					encrypt.setPublicKey($("#pubkeyid").val());
					// 加密
					var encryptPwd = encrypt.encrypt(param.passWd);

//					let outURL = 'http://localhost:8000/WeEngine-Laster-Offline-1/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=account.login';
//					let outURL = 'http://test.zb12351.com:8000/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=account.login';
					let outURL = this.mui.mallUrl + 'i=3&c=entry&m=ewei_shopv2&do=mobile&r=account.login';
					let outParam = {
						mobile: param.telphone || '',
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
	
				},
				login() {
					//document.activeElement.blur(); 
					//					this.$router.push({name:'homepage'});
					if(!/^1[34578]\d{9}$/.test(this.phonenumber)) {
						this.$toast({
							message: '请输入正确的手机号',
							position: 'bottom',
						});
						return;
					}
					if(!/^[0-9A-Za-z]{6,18}$/.test(this.userpassword)) {
						this.$toast({
							message: '密码长度在6-18之间，只能包含字符、数字和下划线。 ',
							position: 'bottom',
						});
						return;
					}
					this.loginface({
						type: 'tel',
						telphone: this.phonenumber,
						passWd: this.userpassword,
					});

				},
				loginthird: function(type) {
					let self = this;
					if(!window.plus) {
						this.$toast({
							message: '未获取到移动端权限，无法使用三方登录',
							position: 'bottom',
						});
						return;
					}

					this.mui.authLogin(type, function(e) {
						//						alert(typeof e.target.authResult+"===="+JSON.stringify(e.target.userInfo.nickname))
						self.thridtype = e.target.id
						self.thridid = e.target.authResult.openid
						self.thridname = e.target.userInfo.nickname
						self.loginface({
							type: e.target.id, //e.target.id
							qqId: e.target.authResult.openid,
							WechatId: e.target.authResult.openid,
						})

						//						self.$router.push({name:'mine_bindphone'});
					}, function(e) {
						self.$toast({
							message: e.message,
							position: 'bottom',
						});
					})

				},
				goto(page) {
					this.$router.push(page);
//					this.$router.replace(page);

				},
			},
	}
</script>

<style type="text/css"  scoped>
	.mint-radiolist-label {
		display: block;
	}
	
	.mint-radio-input {
		display: none;
	}
	
	.mint-radio-input:checked+ .mint-radio-core {
		background-color: #fd7b27;
		border-color: #FFFFFF;
	}
	
	.mint-radio-input:checked+ .mint-radio-core::after {
		background-color: #fff;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	
	.mint-radio-input[disabled]+ .mint-radio-core {
		background-color: #d9d9d9;
		border-color: #ccc;
	}
	
	.mint-radio-core {
		display: inline-block;
		background-color: #fff;
		border-radius: 100%;
		border: 1px solid #ccc;
		position: relative;
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	
	.mint-radio-core::after {
		content: " ";
		border-radius: 100%;
		top: 4.5px;
		left: 4.5px;
		position: absolute;
		width: 8px;
		height: 8px;
		-webkit-transition: -webkit-transform .2s;
		transition: -webkit-transform .2s;
		transition: transform .2s;
		transition: transform .2s, -webkit-transform .2s;
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	select {
		
		width: 55%;
		display: inline-block;
		border: none;
		background-color: #fff;
	}
	.direct .mint-cell-allow-right::after{transform: translateY(-50%) rotate(135deg);}
	.mint-cell .mint-cell-wrapper .mint-cell-title{font-size: 15px;width: 105px;}
	.mint-tab-item{color: #666;}
	.mint-cell-text{font-size: 14px;}
	.mint-field-core{font-size: 8px;}
</style> 

<template>
	<div id="difficult_apply">
		<div id="">
			<mt-field label="姓        名" placeholder="请输入您的姓名" v-model="realname" :value="realname" :attr="{maxlength:6,minlength:2}" style="font-size: 14px; padding-left: 5px;"></mt-field>
			<div style="background: #fff;   background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat;  line-height: 45px;height: 48px;" >
				<table width="100%">
					<tr>
						<td style="width: 77px;font-size: 15px; padding-left: 13px;">性 别</td>
						<td style="width: 65px;">
							<label class="mint-radiolist-label" slot="title" style=" padding-left: 0;">
				        <span class="mint-radio">
				          <input class="mint-radio-input" type="radio"  name="radio" v-model="sex" :value="'2'" >
				          <span class="mint-radio-core"></span>
				        </span>
				        <span class="mint-radio-label"  style="color:#A9A9A9">先生</span>
					</label>
						</td>
						<td style="width: 90px;">
							<label class="mint-radiolist-label" slot="title" style="display: inline-block;">
				        <span class="mint-radio">
				          <input class="mint-radio-input" type="radio"  v-model="sex"  name="radio" :value="'1'">
				          <span class="mint-radio-core"></span>
				        </span>
				        <span class="mint-radio-label"   style="color:#A9A9A9">女士</span>
					</label>
						</td>
					</tr>
				</table>
			</div>
			
			<!--<mt-field label="手机号" placeholder="请输入手机号"   type="tel" v-model="phonenumber" :value="phonenumber"  :attr="{maxlength:11}" style="height: 60px;"></mt-field>-->
			
			<mt-field label="身份证号" v-model="idnumber" :value="idnumber" :attr="{maxlength:18,minlength:15}"  placeholder="请输入您的身份证号" style="padding-left: 5px; "></mt-field>
			<mt-field label="手机号码" v-model="telnumber" :value="telnumber" type="tel" placeholder="请输入您的手机号" :attr="{maxlength:11}" style="padding-left: 5px;"></mt-field>
			<mt-field label="会员卡号" v-model="cardnumber" :value="cardnumber" type="tel" placeholder="请输入您的会员卡号" :attr="{minlength:15,maxlength:19}" style="padding-left: 5px;"></mt-field>
			<mt-field label="工作单位" v-model="workplace" :value="workplace" type="text" :attr="{maxlength:20,minlength:2}"  placeholder="请输入工作单位名称" style="padding-left: 5px; z-index: 1000;" ></mt-field>
			<mt-field label="本人月收入" v-model="personalincome" :value="personalincome" type="tel" placeholder="请输入您的月收入（元）" :attr="{maxlength:7}" style="padding-left: 5px;"></mt-field>
			<mt-field label="家庭人口数" v-model="familymember" :value="familymember" type="tel" placeholder="请输入您的家庭人口数" :attr="{maxlength:2}" style="padding-left: 5px;"></mt-field>
			<mt-field label="月人均收入" v-model="familyincome" :value="familyincome" type="tel" placeholder="请输入您的家庭人均月收入（元）" :attr="{maxlength:7}" style="font-size: 14px; padding-left: 5px;"></mt-field>
			<p style="margin-left: 10px; color: #F46960;">*以上均为必填项，请认真填写</p>
			<div style="padding: 0 20px;margin-top: 50px; ">
				<mt-button size="large" @click.native="subinfo" style="margin: 5% 0;  background: #fd7b27;" type="primary">下一步</mt-button><!--:disabled="false"{{ruhuiflag}} -->
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'difficult_apply',
		data() {
			return {//
				ApplyRequirement: {},
				realname:sessionStorage.realname||'',
				sex: sessionStorage.sex||'2',
				idnumber: sessionStorage.idnumber||'',
				telnumber: sessionStorage.telnumber||'',
				cardnumber: sessionStorage.cardnumber||'',
				workplace:sessionStorage.workplace||'',
				personalincome:sessionStorage.personalincome||'',
				familymember:sessionStorage.familymember||'',
				familyincome:sessionStorage.familyincome||'',
			}
		},
		created() {
			//初始化用户信息.
		},
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
		     if( to.name!='family_member'){
		    	sessionStorage.removeItem("realname")
				sessionStorage.removeItem("sex") 
				sessionStorage.removeItem("idnumber")
				sessionStorage.removeItem("telnumber")
				sessionStorage.removeItem("cardnumber")
				sessionStorage.removeItem("workplace") 
				sessionStorage.removeItem("personalincome") 
				sessionStorage.removeItem("familymember")
				sessionStorage.removeItem("familyincome") 
		    }
   			next()
		},
		methods: {
			
			subinfo() {				
				//var workPlace=this.filterContent(this.workplace);
				if(!localStorage.userId){
					this.tologin("")
					return;
				}
				if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.realname)) {
					this.$toast({
					  message: '请输入真实姓名',
					  position: 'bottom',
					});
					return;
				}
				if(this.idnumber==''){
					this.$toast({
						message:'请输入身份证号',
						position:'bottom',
					});
					return;
				}
				if (!/^\d{15}(\d\d[0-9xX])?$/.test(this.idnumber)) {
					this.$toast({
						message: '请输入十八位身份证号',
						position: 'bottom',
						});
					return;
				}
				if(this.telnumber==''){
					this.$toast({
						message:'请输入手机号',
						position:'bottom',
					});
					return;
				}
				//(\+86)?\s*1[34578]\d{9}
				if(!/1[34578]\d{9}$/.test(this.telnumber)){
					this.$toast({
						message:'请输入正确的手机号',
						position:'bottom',
					});
					return;
				}
				if (this.workplace=='') {
					this.$toast({
					  message: '请输入单位名称',
					  position: 'bottom',
					});
					return;
				}
				if (/\s+/.test(this.workplace)) {
					this.$toast({
					  message: '请输入正确单位名称',
					  position: 'bottom',
					});
					return;
				}
				if (this.workplace.length>20) {
					this.$toast({
					  message: '单位名称长度为二十个字符以内',
					  position: 'bottom',
					});
					return;
				}
				if (this.personalincome=='') {
					this.$toast({
					  message: '请输入您的个人月均收入',
					  position: 'bottom',
					});
					return;
				}
				if (!/^[1-9]\d*$/.test(this.personalincome)) {
					this.$toast({
					  message: '个人月均收入请输入数字',
					  position: 'bottom',
					});
					return;
				}
				if (this.familymember=='') {
					this.$toast({
					  message: '请输入家庭成员人数',
					  position: 'bottom',
					});
					return;
				}
				if (!/^[1-9]\d*$/.test(this.familymember)) {
					this.$toast({
					  message: '家庭人口请输入数字',
					  position: 'bottom',
					});
					return;
				}
				if (this.familyincome=='') {
					this.$toast({
					  message: '请输入家庭月均收入',
					  position: 'bottom',
					});
					return;
				}
				if (!/^[1-9]\d*$/.test(this.familyincome)) {
					this.$toast({
					  message: '家庭月均收入请输入数字',
					  position: 'bottom',
					});
					return;
				}
				
				var self = this;
				self.goto({name:'family_member'});
			},
			goto(page) {
				var workPlacee=this.filterContent(this.workplace);
				if(page.name=="family_member"){
			    	sessionStorage.realname=this.realname;
					sessionStorage.sex=this.sex;
					sessionStorage.idnumber=this.idnumber;
					sessionStorage.telnumber=this.telnumber;
					sessionStorage.cardnumber=this.cardnumber;
					sessionStorage.workplace=workPlacee;
					sessionStorage.personalincome=this.personalincome;
					sessionStorage.familymember=this.familymember;
					sessionStorage.familyincome=this.familyincome;
				}
				this.$router.push(page);
			},
		},
	};
</script>

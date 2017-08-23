<template>
	<div class="cmemberCard">
		
		<div v-if="state=='1'" style="position: relative;">
			<mt-field label="姓名" placeholder="请输入会员姓名" v-model='userName' type="text" :attr="{maxlength:10}">
			</mt-field>
			<div style="position: absolute; left: 2px; top: 50px;z-index: 100;">
				<select  v-model="selected"  style="width: 85px;height: 46px;margin-left: 3%;font-size: 16px;">
					<option value ="A">会员卡号</option>
					<option value ="B">身份证号</option>
				</select>
			</div>
			
			<mt-field v-show="selected=='A'" label=" " placeholder="请输入会员卡号" v-model='cardnumber' type="tel" :attr="{maxlength:19,minlength:15}"></mt-field>
			<mt-field v-show="selected=='B'" label=" " placeholder="请输入身份证号" v-model='userIdNo' type="tel" :attr="{maxlength:18,minlength:15}"></mt-field>
			<hr style="font-size:0;border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
			<p style="font-size: 13px;color: #f76202;padding: 10px;">注：请认真填写以上信息</p>
			<div style="padding: 20px;">
				<mt-button size="large" @click.native="subinfo" style="margin-top: 10%;background: #fd7b27;" type="primary">确定</mt-button>
			</div>
		</div>
		
		<on-touch @longTap='release()' v-if="state=='2'" class='touchme'>
			<div class="vipCardInfo">
				<div class="info1">{{userName}}</div>
				<div class="info2" ref="div1">{{cardnumber?(cardnumber.substr(0,4)+' '+cardnumber.substr(4,4)+' '+cardnumber.substr(8,4)+' '+cardnumber.substr(12,4)+' '+cardnumber.substr(16,3)):(userIdNo.substr(0,6)+' '+userIdNo.substr(6,4)+' '+userIdNo.substr(10,4)+' '+userIdNo.substr(14,4)+' '+userIdNo.substr(18,4))}}</div>
				<div class="info3">
					<span style="display: inline-block;margin-bottom: 4px;margin-top: 1px;">{{upUnionName}}</span><br />
					<span v-show="downUnionName">{{downUnionName}}</span>
				</div>
			</div>
		</on-touch>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					cardnumber:sessionStorage.cardnumber||'',
					userName:sessionStorage.userName||'',
					userIdNo:'',
					upUnionName:'',
					downUnionName:'',
					
					bindstate:'',
					state:'1',
					sessionobj:'',
					selected:'A',
					
					infomation:{},
					tipinfo:'',
					unitName:'',
					
				}
			},
			created() {
				
				
			},
			mounted(){
				//console.log(this.selected)
				console.log(localStorage.bindstate)
				//获取初始化信息接口（信息来自转会入会）
				if(localStorage.bindstate == 0 || localStorage.bindstate == 2){
					this.getInfo()
				}
			},
			
			beforeRouteLeave (to, from, next) {
			    // 导航离开该组件的对应路由时调用
			    // 可以访问组件实例 `this`
			     if( to.name=='mine_ghlist'){
			    	
			    }else{
			   			sessionStorage.removeItem("cardnumber")
						sessionStorage.removeItem("userName") 
						sessionStorage.removeItem("idcardnumber")
						sessionStorage.removeItem("addressobj")
			    }
	   			next()
			},
			methods: {
				getInfo(){
					var self=this
					this.bindstate = localStorage.bindstate
					this.ajax({
						url:'/sysUserInfo/userSuccess',
						data:{
							userId:localStorage.userId,
						},
						type:'get'
						},function(data){
							if(data.result){
								if(localStorage.bindstate == 0 || localStorage.bindstate == 2 || data.obj.userState == 0){
									self.infomation= data.obj;
									self.userName=data.obj.userRealname;
									self.cardnumber=data.obj.userCardno;
									self.upUnionName=data.obj.twoUnionName;
									self.downUnionName=data.obj.unionName;
									self.userIdNo=data.obj.userProCno;
									self.state='2'
									console.log('bindstate变了')
								}else{
									self.tipinfo=data.obj.remark;
								}
								//history.back();
							}
						})
				},
				subinfo(){
					if(this.selected=='A'){
						this.subinfo1();
					}else if(this.selected=='B'){
						this.subinfo2();
					}
				},
				subinfo1(){//ajax会员卡绑定接口
					if (this.userName==='') {
						this.$toast({
						  message: '姓名不能为空',
						  position: 'bottom',
						});
						return;
					}
					if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.userName)) {
						this.$toast({
						  message: '请输入真实姓名，2-6个汉字',
						  position: 'bottom',
						});
						return;
					}
					if (this.cardnumber=='') {
						this.$toast({
						  message: '请输入卡号',
						  position: 'bottom',
						});
						return;
					}
					if (!/\d{15,19}/.test(this.cardnumber)) {
						this.$toast({
						  message: '卡号输入有误',
						  position: 'bottom',
						});
						return;
					}
					let self=this;
					this.ajax({
						url:'/sysUserInfo/accreditationFirst',
						data:{
							userId:localStorage.userId,
							cardNo:self.cardnumber||'',
							userName:self.userName||'',
						},
						type:'post'
						},function(data){
							self.$toast({
								message: data.description,
								position: 'bottom',
							});
							if(data.result){
								if(data.obj == 0){
									self.state='2'
									self.getInfo()
									//localStorage.isFormal=true
								}else{
									self.state='1'
								}
							}else{
								
							}
						})
				},
				subinfo2(){//ajax身份证号绑定接口
					if (this.userName==='') {
						this.$toast({
						  message: '姓名不能为空',
						  position: 'bottom',
						});
						return;
					}
					if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.userName)) {
						this.$toast({
						  message: '请输入真实姓名，2-6个汉字',
						  position: 'bottom',
						});
						return;
					}
					if (this.userIdNo=='') {
						this.$toast({
						  message: '请输入身份证号',
						  position: 'bottom',
						});
						return;
					}
					if (!/^\d{15}(\d{2}[0-9xX])?$/.test(this.userIdNo)) {
						this.$toast({
						  message: '身份证号输入有误',
						  position: 'bottom',
						});
						return;
					}
					let self=this;
					this.ajax({
						url:'/sysUserInfo/accreditationIDCard',
						data:{
							userId:localStorage.userId,
							userProCno:self.userIdNo||'',
							userName:self.userName||'',
						},
						type:'post'
						},function(data){
							self.$toast({
								message: data.description,
								position: 'bottom',
							});
							if(data.result){
								if(data.obj == 0){
									self.state='2'
									self.getInfo()
									//localStorage.isFormal=true
								}else{
									self.state='1'
								}
							}else{
								
							}
						})
				},
				goto(page) {
					if(localStorage.bindstate == 0 || localStorage.bindstate == 2){
						return
					}
					if(page.name=="mine_ghlist"){
						sessionStorage.cardnumber=this.cardnumber
						sessionStorage.userName=this.userName
						sessionStorage.idcardnumber=this.idcardnumber
					}
					this.$router.push(page);
				},
				release() {
					this.$messagebox.confirm('您确定要解绑认证号?' ).then(action => {
						//ajax会员卡解绑接口
						let self=this;
						this.ajax({
							url:'/sysUserInfo/cardNoUpdate',
							data:{
								userId:localStorage.userId,
							},
							type:'post'
							},function(data){
								self.$toast({
									message: data.description,
									position: 'bottom',
								});
								if(data.result){
									self.state = '1'
								}else{
									
								}
							})
					});
				}
			},
			components: {
		
			}
	}
</script>

<style scoped lang="less">
/*阻止默认长按选中事件*/
	.cmemberCard *{
		-webkit-touch-callout:none;
		-webkit-user-select:none;
		-khtml-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
	}
	 
	
	label {
		width: 95px;
		display: inline-block;
		margin-left: 10px;
	}
	
	.cmemberCard select {
		height: 48px;
		width: 65%;
		display: inline-block;
		border: none;
		background-color: #fff;
		appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    background: url("./imgs/arrowmine.png") no-repeat scroll right center transparent;
	}
	
	input:disabled{
	    background-color: white;
	    color:#ACA899;
	}
	.cmemberCard .vipCardInfo{
		color: white;
		width: 95%;
		height: 180px;
		margin: 0 auto;
		padding: 17% 10px 12px 20px;
		background: url(./imgs/card.png);
		background-size: 100% 100%;
		letter-spacing:2px;
		margin-top: 30px;
	}
	
	.cmemberCard .vipCardInfo .info1{
		font-size: 14px;
		font-weight: normal;
		margin-bottom: 2px;
	}
	.cmemberCard .vipCardInfo .info2{
		font-size: 16px;
		margin-bottom: 1px;
	}
	.cmemberCard .vipCardInfo .info3{
		width: 95%;
		font-size: 14px;
		font-weight: normal;
		color: white;
		height: 45px;
		/*white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;*/
	}
	@media only screen and (min-device-width:300px){
	    .cmemberCard .vipCardInfo{
			height: 150px;
			padding: 17% 10px 10px 18px;
		}
		.cmemberCard .vipCardInfo .info1{
			font-size: 13px;
		}
		.cmemberCard .vipCardInfo .info2{
			font-size: 18px;
		}
		.cmemberCard .vipCardInfo .info3{
			font-size: 13px;
		}
	}
	@media only screen and (min-device-width:335px){
	    .cmemberCard .vipCardInfo{
			height: 170px;
			padding: 18% 10px 0px 20px;
		}
		.cmemberCard .vipCardInfo .info1{
			margin-bottom: 4px;
		}
	}
	/*@media only screen and (min-device-width:350px){
	    .cmemberCard .vipCardInfo{
			height: 150px;
			padding: 22% 10px 10px 25px;
		}
	}
	@media only screen and (min-device-width:385px){
	    .cmemberCard .vipCardInfo{
			height: 20%;
			padding: 22% 10px 5% 5%;
		}
	}*/
	.cmemberCard .mint-msgbox .mint-msgbox-content .mint-msgbox-message{
		text-align: center !important;
	}
	.cmemberCard .mint-cell-text{
		/*font-size: 15px;*/
	}
</style>
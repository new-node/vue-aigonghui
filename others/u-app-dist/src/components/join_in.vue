<style type="text/css"  scoped>
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
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
	
	.mint-navbar .mint-tab-item.is-selected {
		color: #FD7B27;
		border-bottom: 3px solid #FD7B27;
	}
	
	.Union {
		text-align: center;
		overflow: auto;
		height: 180px;
		/*padding: 10px;*/
		padding: 0;
		margin: 0;
		list-style: none;
	}
	
	.UnionP {
		padding: 8px;
	}
	
	.leble {
		width: 35%;
		/*text-align: right;*/
		display: inline-block;
		/*line-height: 48px;*/
		margin-left: 18px;
	}
	
	select {
		
		
		display: inline-block;
		border: none;
		background-color: #fff;
	}
	.direct .mint-cell-allow-right::after{transform: translateY(-50%) rotate(135deg);}
	.mint-cell .mint-cell-wrapper .mint-cell-title{font-size: 15px;width: 105px;}
	.mint-tab-item{color: #666;}
	.mint-field-core{font-size: 14px;}
</style> 
<template>
	<div id="join_in">
		<div class="clearfix" style="background-color: #fff;padding:0 5px;">
			<mt-cell title="入会帮助" is-link value="" @click.native="joinHelp=!joinHelp" style="color: #A9A9A9;" class="direct">
			</mt-cell>
			<div style="font-size: 12px;" v-show="joinHelp" >
				<p>1、淄博境内，以工资收入为主要生活来源的在职职工，均可申请加入工会组织。</p>
				<p>2、已在本单位入会的职工，无需重复申请入会。</p>
				<p>3、未入会职工，所在单位已建立工会组织的，向本单位工会提出入会申请即可。</p>
			</div>
		</div>
		<mt-field label="  姓 名" placeholder="请输入姓名" v-model="realname" :attr="{maxlength:10,minlength:2}" style="padding-left: 5px;background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;overflow: hidden;"></mt-field>
		<div style="background: #fff;   background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat;  line-height: 45px;height: 48px;" >
			<table width="100%">
				<tr>
					<td style="width: 77px;font-size: 15px; padding-left: 13px;">性 别</td>
					<td style="width: 65px;">
						<label class="mint-radiolist-label" slot="title" style=" padding-left: 0;">
			        <span class="mint-radio">
			          <input class="mint-radio-input" type="radio"  name="radio" v-model="sex" :value="0" >
			          <span class="mint-radio-core"></span>
			        </span>
			        <span class="mint-radio-label"  style="color:#A9A9A9">先生</span>
				</label>
					</td>
					<td style="width: 90px;">
						<label class="mint-radiolist-label" slot="title" style="display: inline-block;">
			        <span class="mint-radio">
			          <input class="mint-radio-input" type="radio"  v-model="sex"  name="radio" :value="1">
			          <span class="mint-radio-core"></span>
			        </span>
			        <span class="mint-radio-label"   style="color:#A9A9A9">女士</span>
				</label>
					</td>
				</tr>
			</table>
		</div>

		<mt-field label="身份证号" v-model="idnumber" type="text" :attr="{maxlength:18,minlength:15}"  placeholder="请输入身份证号" style="padding-left: 5px; font-size: 15px;"></mt-field>
		<mt-field label="手机号" v-model="telnumber" type="tel" placeholder="请输入手机号" :attr="{maxlength:11}" style="padding-left: 5px;"></mt-field>
		<mt-field label="单位名称" v-model="workplace" type="text" :attr="{maxlength:20,minlength:2}"  placeholder="请输入工作单位名称" style="padding-left: 5px; z-index: 1000;" ></mt-field>
		<div class="" style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
			<label class="label" style="font-size: 15px; padding: 0;width: 60px; margin-left: 0;">岗位工种</label>
			<select v-model="memberobj" style="width: 65%;font-size: 14px; color: #a9a9a9; margin-left: 37px;">
				<option value="">请选择</option>
				<option v-for="item in memberlist" :value="item.dictCode"  >{{item.dictName}}</option>
				<!--<template v-for="item in firstlist">
					<option :value="item">{{item.unionName}}</option>
				</template>-->
			</select>
		</div>
		<mt-field label="所入工会" placeholder="请选择" type="text" :value="rhUnionName" :readonly="true" @click.native="goto({name:'mine_ghlist',params:{type:'flag'}})" style="padding-left: 5px;"></mt-field>

		<p style="margin-left: 10px; color: #FD7B27;">请填写真实信息</p>
		<div style="padding: 0 20px; ">
			<mt-button size="large" @click.native="subinfoapprove" :disabled="ruhuiflag=='true'" style="margin: 5% 0;  background: #fd7b27;" type="primary">确认</mt-button><!--:disabled="false"{{ruhuiflag}} -->
		</div>
	</div>
</template>
<script>
	export default {
		name: 'join_in',
		data() {
			return {
				joinHelp: false,

				sessionobj: '',
				realname:sessionStorage.realname||'',
				sex: sessionStorage.sex||'0',
				idnumber: sessionStorage.idnumber||'',
				telnumber: sessionStorage.telnumber||'',
//				area:sessionStorage.area||'',
				workplace:sessionStorage.workplace||'',
//				workname:sessionStorage.workname||'',
				memberobj:sessionStorage.memberobj||'',
				memberType:sessionStorage.memberType||'',
				memberlist:'',
				ruhuiflag:localStorage.isFormal||'',
				zhuanhuiflag:localStorage.canTransfer||'',
				workplacezh:sessionStorage.workplacezh||'',
				
				orgName:'',  //单位名称
				unionId:'', //工会ID
				unionName:'', //工会名称
				
				ruUnionName:'',//入会选中的工会
				zhUnionName:''//转会选中的工会
				
			}
		},
		beforeRouteEnter (to, from, next) {
		    if(!localStorage.userId){
                next({name: 'login',title:'登录'})
		    	return 
		    }
		    next()
		},
		created() {
			if(!localStorage.userId){
					this.tologin("")
					return 
				}
			this.getgwgzlist()
			if(sessionStorage.addressobj){
				this.sessionobj=JSON.parse(sessionStorage.addressobj)
				this.rhUnionName=this.selectedtab==='rh'?this.sessionobj.unionName:'';
				this.zhUnionName=this.selectedtab==='zh'?this.sessionobj.unionName:'';
			}
			if(this.ruhuiflag==='true'||this.ruhuiflag===true){
				this.selectedtab='zh'
			}else{
			}
			
			if(!sessionStorage.addressobj){
				var self = this;
				setTimeout(function(){
				self.ajax({
					url: '/unionTransfer/getTransferRecords',
					data: {
						userId : localStorage.userId,
					},
					type: 'get',
				}, (data) => {
					if(data.result) {
						self.orgName = data.obj.orgName;
						self.unionId = data.obj.unionId;
						self.unionName = data.obj.unionName;
						self.zhUnionName=data.obj.unionName;
						
						self.memberType = data.obj.memberType;
						self.workplacezh = data.obj.orgName;
						self.sessionobj = {unionId:data.obj.unionId, unionName:data.obj.unionName};
					} else {

					}
				})
			},1000)
			}
		},
		mounted() {
			
		},
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
		     if( to.name=='mine_ghlist'){
		    	
		    }else{
		   			sessionStorage.removeItem("addressobj")
					sessionStorage.removeItem("realname")
					sessionStorage.removeItem("sex") 
					sessionStorage.removeItem("idnumber")
					sessionStorage.removeItem("telnumber")
					sessionStorage.removeItem("memberobj")
					sessionStorage.removeItem("memberType")
						
		//			sessionStorage.removeItem("area")
					sessionStorage.removeItem("workplace") 
					sessionStorage.removeItem("workplacezh") 
		//			sessionStorage.removeItem("workname")
					sessionStorage.removeItem("selectedtab") 
		
					
		    }
   			next()
		},
		methods: {
			tishizhuanhui(){
				if(this.zhuanhuiflag=='false'||this.zhuanhuiflag==false){
					this.$toast({
						message: localStorage.transferdes||"您还不是正式会员，不能转会!",
						position: 'bottom',
					});
				}else{
					//非正式会员  可以入会
				}
			},
			tishiruhui(){
				if(this.ruhuiflag=='true'||this.ruhuiflag==true){
					this.$toast({
						message: localStorage.isFormaldes||"您已经是正式会员不用再入会了!",
						position: 'bottom',
					});
				}else{
					//非正式会员  可以入会
				}
			},
			getgwgzlist(){
				this.ajax({
					url: '/dictionaries/getDictsByType',
					data: {
						dictType: 'memberType',
					},
					type: 'get'
				}, (data) => {
					if(data.result) {
						this.memberlist=data.obj
					} else {
						this.$toast({
							message: data.description,
							position: 'bottom',
						});

					}
				})
			},
			subzhuanhuiapprove() {				
				if(!localStorage.userId){
					this.tologin("")
					return;
				}
				var workPlace=this.filterContent(this.workplacezh);
				if (workPlace=='') {
					this.$toast({
					  message: '请输入单位名称',
					  position: 'bottom',
					});
					return;
				}
				if (this.workplacezh.length>20) {
					this.$toast({
					  message: '单位名称长度为二十个字符以内',
					  position: 'bottom',
					});
					return;
				}
				if (!this.memberType || this.memberType=='') {
					this.$toast({
					  message: '请选择岗位工种',
					  position: 'bottom',
					});
					return;
				}
				if (this.sessionobj=='') {
					this.$toast({
					  message: '请选择所入工会',
					  position: 'bottom',
					});
					return;
				}
				
				var self = this;
				this.ajax({
					url: '/unionTransfer/addTransferApplyInfo',
					data: {
						targetUnionName:this.workplacezh,
						workType:self.memberType,
						streetUnionId: this.sessionobj.unionId,
						userId:localStorage.userId,
					},
					type: 'post'
				}, (data) => {
					self.$toast({
							message: data.description,
							position: 'bottom',
						});
					
					if(data.result) {
						localStorage.canTransfer=true
						self.goto({name:'mine_approve'})
						
					} else {

					}
				})
			},
			subinfoapprove() {
				var workPlace=this.filterContent(this.workplace);
				if(!localStorage.userId){
					this.tologin("")
					return;
				}
				if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.realname)) {
					this.$toast({
					  message: '请输入真实姓名，2-10个汉字',
					  position: 'bottom',
					});
					return;
				}
				if (!/^\d{15}(\d{2}[0-9xX])?$/.test(this.idnumber)) {
					this.$toast({
					  message: '请输入正确的身份证号码',
					  position: 'bottom',
					});
					return;
				}
				if (!/^1[34578]\d{9}$/.test(this.telnumber)) {
					this.$toast({
					  message: '请输入正确的电话号码',
					  position: 'bottom',
					});
					return;
				}
				if (workPlace=='') {
					this.$toast({
					  message: '请输入单位名称',
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
				if (!this.memberobj || this.memberobj=='') {
					this.$toast({
					  message: '请选择岗位工种',
					  position: 'bottom',
					});
					return;
				}
				if (this.sessionobj=='') {
					this.$toast({
					  message: '请选择转入工会',
					  position: 'bottom',
					});
					return;
				}
				
				var self = this;
				
				this.ajax({
					url: '/unionApplyInfo/applyinMenber',
					data: {
						applyName: this.realname,
//						applySex: this.sex,
						applyCardno: this.idnumber,
						applyTel: this.telnumber,
						unionId: this.sessionobj.parentid,
						applyOrgName:workPlace,
						userName:localStorage.userName,
//						processStatus: '',
//						applyStatus: '',
//						applyType: 'in',
						userId:localStorage.userId||'',
						workType:this.memberobj,
						description:'',//this.area
						streetUnionId:this.sessionobj.unionId
						//						creator:'',
					},
					type: 'post'
				}, (data) => {
					
//					sessionStorage.removeItem("addressobj")
//					sessionStorage.removeItem("realname")
//					sessionStorage.removeItem("sex") 
//					sessionStorage.removeItem("idnumber")
//					sessionStorage.removeItem("telnumber")
//					sessionStorage.removeItem("memberobj")
//						
////						sessionStorage.removeItem("area")
//					sessionStorage.removeItem("workplace") 
//					sessionStorage.removeItem("workplacezh") 
////						sessionStorage.removeItem("workname")
					self.$toast({
						message: data.description,
						position: 'bottom',
					});
					if(data.result) {
						
						localStorage.isFormal=false
						self.goto({name:'mine_approve'})
					} else {

					}
				})
			},
			goto(page) {
				if(page.name=="mine_ghlist"){
					sessionStorage.realname=this.realname
					sessionStorage.sex=this.sex
					sessionStorage.idnumber=this.idnumber
					sessionStorage.telnumber=this.telnumber
					sessionStorage.memberobj= this.memberobj
					sessionStorage.memberType=this.memberType
//					sessionStorage.area=this.area
					sessionStorage.selectedtab=this.selectedtab
					sessionStorage.workplace=this.workplace
					sessionStorage.workplacezh=this.workplacezh
//					sessionStorage.workname=this.workname
				}
				document.activeElement.blur(); 			
					this.$router.push(page);
			},
		},
	};
</script>
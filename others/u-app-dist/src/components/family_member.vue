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
	.mint-cell .mint-cell-wrapper .mint-cell-title{width: 105px;}
	.mint-tab-item{color: #666;}
	.mint-cell-text{font-size: 14px;}
	.mint-field-core{font-size: 8px;}
	.formgroup{
		margin-bottom: 10px;
	}
</style> 

<template>
	<div id="difficult_apply">
		<div  id="">
			<div v-for="(obj,index) in familyMenberList" class="formgroup">
				<mt-field label="姓        名" placeholder="请输入家庭成员的姓名" v-model="obj.familyMemName" :attr="{maxlength:10,minlength:2}" style="padding-left: 5px;"></mt-field>
		    	<mt-field label="关        系" v-model="obj.relationship" :attr="{maxlength:6,minlength:2}"  placeholder="请输入您和成员的关系" style="padding-left: 5px; "></mt-field>
				<div style="background: #fff;   background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat;  line-height: 45px;height: 48px;" >
				<table width="100%">
					<tr>
						<td style="width: 77px; padding-left: 13px;">性 别</td>
						<td style="width: 65px;">
							<label class="mint-radiolist-label" slot="title" style=" padding-left: 0;">
						        <span class="mint-radio">
						            <input class="mint-radio-input" type="radio"  :name="'radio'+index" v-model="obj.familyMemSex" :value="'2'" >
						            <span class="mint-radio-core"></span>
						        </span>
						        <span class="mint-radio-label"  style="color:#A9A9A9">先生</span>
							</label>
						</td>
						<td style="width: 90px;">
							<label class="mint-radiolist-label" slot="title" style="display: inline-block;">
						        <span class="mint-radio">
						            <input class="mint-radio-input" type="radio"  v-model="obj.familyMemSex"  :name="'radio'+index" :value="'1'">
						            <span class="mint-radio-core"></span>
						        </span>
						        <span class="mint-radio-label"   style="color:#A9A9A9">女士</span>
							</label>
						</td>
					</tr>
				</table>
				</div>
				<mt-field label="身份证号" v-model="obj.familyMemIdCardNo" type="tel" :attr="{maxlength:18,minlength:15}"  placeholder="请输入家庭成员的身份证号" style="padding-left: 5px; "></mt-field>
				<mt-field label="单位或学校" v-model="obj.familyMemOrganization" placeholder="请输入工作单位或学校" :attr="{maxlength:18}" style="padding-left: 5px;"></mt-field>
				<!--<mt-field label="会员卡号" v-model="cardnumber" type="tel" placeholder="请输入您的会员卡号" :attr="{minlength:15,maxlength:19}" style="padding-left: 5px;"></mt-field>
				<mt-field label="工作单位" v-model="workplace" type="text" :attr="{maxlength:20,minlength:2}"  placeholder="请输入工作单位名称" style="padding-left: 5px; z-index: 1000;" ></mt-field>-->
				<mt-field label="成员月收入" v-model="obj.familyMemMonIncome" type="tel" placeholder="请输入成员的收入（元）" :attr="{maxlength:7}" style="padding-left: 5px;"></mt-field>
				<hr style="margin: 0;padding: 0;  border:none;border-bottom:1px solid rgb(221,221,221);height:1px; -webkit-transform: scaleY(0.5);-webkit-transform-origin:0 0;" />
				<a @click="delateFamily(index)" v-if="familyMenberList.length>=2" style="text-align: center; display: block;width: 100%;height:45px ;background: #FFFFFF;  margin: 0 auto;">
					<img style="height: 20px;margin-top: 10px;margin-right: 5px;" src="./imgs/del.png" />
					<span style="color: #656B79;line-height: 45px;display: inline-block; ">删除此条消息</span>
				</a>
			</div>
			<a @click="addFamily" style="text-align: center; display: block;width: 100%;height:45px ;background: #FFFFFF;  margin: 0 auto;">
				<img style="height: 20px;margin-top: 10px;margin-right: 5px;" src="./imgs/addfamily.png" />
				<span style="color: #656B79;line-height: 45px;display: inline-block; ">添加家庭成员信息</span>
			</a>
			<p style="margin-left: 10px; color: #F46960;">*以上均为必填项，请认真填写</p>
			<a @click="skip()">
				<div style="margin-top: 50px;width: 90%;height: 38px;border: 1px solid #FE7A26;margin: 0 auto;border-radius: 5px; text-align: center;line-height: 38px;">
					<h4 style="padding: 0;margin: 0; color:#FE7A26 ;font-weight: normal;word-spacing:8px; letter-spacing: 2px;">跳过此步骤</h4>
				</div>
			</a>
			<div style="padding: 0 20px; ">
				<mt-button size="large" @click.native="subfamilyinfo()" style="margin: 5% 0;  background: #fd7b27;" type="primary">下一步</mt-button><!--:disabled="false"{{ruhuiflag}} -->
			</div>
		</div>
	</div>
</template>
<script>
//delateFamily(index)
	export default {
		name: 'family_member',
		data() {
			return {
				familyMenberList:[],
			}
		},
		beforeRouteEnter (to, from, next) {
		    if(to.meta.login && to.meta.login==true && !localStorage.userId){
                next({name: 'login',title:'登录'})
		    	return 
		    }
		    next()
		},
		mounted() {
			if(sessionStorage.familyMenberList){//第一次进入没有session所以要先判断！
				this.familyMenberList=JSON.parse(sessionStorage.familyMenberList)||''
			}
		},
		created() {
			var familyObj={
				familyMemName:'',
				relationship:'',
				familyMemSex:'2',
				familyMemIdCardNo: '',
				familyMemOrganization:'',
				familyMemMonIncome:'',
			}
			this.familyMenberList.push(familyObj)
		},
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
		     if( to.name!='difficult_situation'){
		    	sessionStorage.removeItem("familyMenberList")
		    }
   			next()
		},
		methods: {
			
			testfamilyinfo(){
				//var workPlace=this.filterContent(this.workplace);
				for(var i=0;i<this.familyMenberList.length;i++ ){
					
					if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.familyMenberList[i].familyMemName)) {
						this.$toast({
						  message: '请输入第'+(i+1)+'位成员真实姓名',
						  position: 'bottom',
						});
						return;
						}
						if(this.familyMenberList[i].relationship==''){
							this.$toast({
								message:'请输入您与第'+(i+1)+'位成员的关系',
								position:'bottom',
							});
							return;
						}
						if (!/^\d{15}(\d{2}[0-9xX])?$/.test(this.familyMenberList[i].familyMemIdCardNo)) {
							this.$toast({
							  message: '请输入第'+(i+1)+'位成员的正确身份证号',
							  position: 'bottom',
							});
							return;
						}
						if (this.familyMenberList[i].familyMemOrganization=='') {
							this.$toast({
							  message: '请输入第'+(i+1)+'位成员的单位名称',
							  position: 'bottom',
							});
							return;
						}
						if (this.familyMenberList[i].familyMemOrganization.length>20) {
							this.$toast({
							  message: '单位名称长度为二十个字符以内',
							  position: 'bottom',
							});
							return;
						}
						if (this.familyMenberList[i].familyMemMonIncome=='') {
							this.$toast({
							  message: '请输入第'+(i+1)+'位成员的月均收入',
							  position: 'bottom',
							});
							return;
						}
					}
				return true;
			},
			//var workPlacee=this.filterContent(this.workplace);
			subfamilyinfo() {
				if(this.testfamilyinfo()){
					var self = this;
					self.goto({name:'difficult_situation'});
				}
			},
			goto(page) {
			    var familymenberList = JSON.stringify(this.familyMenberList); 
			    
				if(page.name=="difficult_situation"){
					//存入 
					for(var i=0;i<this.familyMenberList.length;i++){
						sessionStorage.familyMenberList = familymenberList; 
					}
			    	console.log(sessionStorage.familyMenberList);
				}
				this.$router.push(page);
			},
			addFamily(){
				if(this.testfamilyinfo()){
					var self = this;
					var familyObj={
						familyMemName:'',
						relationship:'',
						familyMemSex: '',
						familyMemIdCardNo: '',
						familyMemOrganization:'',
						familyMemMonIncome:'',
					};
					this.familyMenberList.push(familyObj);
				};
			},
			delateFamily(index){//删除单一表单
						this.familyMenberList.splice(index, 1)
			},
			skip(){
				sessionStorage.removeItem("familyMenberList");
				this.$router.push({name:'difficult_situation'});
			}
		},
	};
</script>

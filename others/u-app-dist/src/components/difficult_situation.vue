<style type="text/css"  scoped>
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
			<mt-field label="" v-model="difcontext" type="textarea" rows="10" :attr="{maxlength:500}"  placeholder="请描述一下您的困难情况~" style="margin-left: 10px;"></mt-field>
			<p style="margin-left: 10px; color: #F46960;">注：以上均为必填项，请认真填写</p>
			<div style="padding: 0 20px; margin-top: 120px;">
				<mt-button size="large" @click.native="subsituation" style="margin: 5% 0; font-family: '微软雅黑'; background: #fd7b27;font-weight: normal;word-spacing:8px; letter-spacing: 2px;font-size: 16px;" type="primary">
					填写完成确认提交
				</mt-button><!--:disabled="false"{{ruhuiflag}} -->
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'difficult_situation',
		data() {
			return {
				difcontext:'',
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
		},
		
		methods: {
			subsituation() {
				var self = this;
				var contentStr=this.filterContent(this.difcontext);
				
				if(contentStr == '') {
					this.$toast('内容不能为空')
					return
				}else if(/^.{500,}$/.test(this.difcontext)) {
					this.$toast('内容长度不能超过500')
					return
				}
				
				this.difcontext=contentStr;
				var familyMenberList=[]
				if(sessionStorage.familyMenberList){
					familyMenberList=JSON.parse(sessionStorage.familyMenberList);
				}
				
				var obj={
					userId:localStorage.userId,
			    	masterName:sessionStorage.realname,
					masterSex:sessionStorage.sex,
					masterIdCardNo:sessionStorage.idnumber,
					masterPhoneNo:sessionStorage.telnumber,
					masterUnionCardNo:sessionStorage.cardnumber,
					masterCompany:sessionStorage.workplace,
					masterMonIncome:sessionStorage.personalincome,
					familyPopulationNum:sessionStorage.familymember,
					familyMonPerHeadIncome:sessionStorage.familyincome,
					familyMenberList:familyMenberList,
					difficultSituation:this.difcontext
				}
				console.log(JSON.stringify(obj));
				this.ajax({
					url: '/difficultInfo/addApply',
					type: 'post',
					dataType:"json",  
    				contentType:"application/json",  
					data: {data: JSON.stringify(obj)}
				}, function(data) {
					self.$toast(data.description)
					if(data.result) {
						self.goto({name:'difficult_progress'})
					}
				})
				
			},
			goto(page) {
				if(page.name=="difficult_progress"){
					
				}
				this.$router.push(page);
			},
		}
	};
</script>
<template>
	<div>
		<mt-field label="" placeholder="请输入用户名" type="text" v-model="nickname" style="color:#666666;" :attr="{maxlength:20}"></mt-field>
		<p style="font-size: 13px;color: #666666;padding: 10px;">请输入二十个字符以内的用户名</p>
		<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
			<mt-button size="large" @click.native="subname()" style="margin-top: 10%; background: #fd7b27;" type="primary">确定</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					nickname:localStorage.nickName
				}
			},
			mounted() {
			},
			computed: {
			 },
			methods: {
				subname(){
					let self=this;
					if(/^[A-Za-z0-9\u4E00-\u9FA5_]{2,21}$/.test(this.nickname)){
						this.ajax({
						url:'/sysUserInfo/update',
						data:{
							userId:localStorage.userId,
							userRealname:this.nickname,
						},
						type:"post"
						},(data)=>{
							self.$toast({
								message: data.description,
								position: 'bottom',
								
								});
							if(data.result){
								localStorage.nickName=self.nickname;
								history.back();
							}else{
							}
						})
					}else if(this.nickname.length==0){
						self.$toast({
								message: "用户名不能为空",
								position: 'bottom',
								
								});
					}
					else if(this.nickname.length==1){
						self.$toast({
								message: "用户名不能小于2个字符",
								position: 'bottom',
								
								});
					}
					else if(this.nickname.length>=21){
						self.$toast({
								message: "用户名不能大于20个字符",
								position: 'bottom',
								
								});
					}else{
						self.$toast({
								message: "用户名不支持特殊符号",
								position: 'bottom',
								
								});
					}
					
				},
			},
			components: {

			}
	}
</script>


<style scoped lang="less">

</style>
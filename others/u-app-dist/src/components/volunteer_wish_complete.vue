<template>
	<div>		
		<div style="text-align: center;">
			<textarea maxlength="300"  v-model='thanksContent' style="width:100%;resize: none; height: 200px; font-size: 15px; border: none; padding: 10px;" rows="7" placeholder="谈一下被帮助的感受吧~"></textarea>
		</div>		
		<div style=" padding: 20px;">
			<mt-button size="large" @click.native="toThanks()" style="; background: #fd7b27;" type="primary" >提交</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				thanksContent:''
			}
		},		 
		methods: {
			toThanks(){//感谢一下
				let self = this;
				this.thanksContent=this.filterContent(this.thanksContent)
				if(this.thanksContent==''){
					this.$toast('请输入感谢内容')
					return
				}else if(this.thanksContent.length>300){
					this.$toast('内容长度不能超过300')
					return
				}
				this.ajax({
					url: '/voluNeeds/updateThanks',
					data: {
						needsId: this.$route.params.id,
						thanks:this.thanksContent
					},
					type: 'post'
				}, (data) => {
					self.$toast({
						message: data.description,
						position: 'bottom',
					})
					if(data.result) {
						sessionStorage.detailOpt="thanks"
						self.$router.back()
					} 
				})
			},
			sub(){
				/*if(this.fedbackContent==''){
					this.$toast('意见不能为空')
					return
				}
				this.ajax({url:'/unionAppFeedback/add',data:{fedbackContent:this.fedbackContent,userId:localStorage.userId}},(data)=>{
					this.$toast({
					  message: data.description,
					  position: 'bottom',
					});
					if(data.result){
						this.$router.back()
					}
				})*/
					
			}
		},
		 
	}
</script>


<style >
</style>
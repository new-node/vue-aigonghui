<template>
	<div>
		
		<div style="text-align: center;">
			<textarea  v-model='fedbackContent' style="width:100%;resize: none; height: 200px; font-size: 15px; border: none; padding: 10px;" rows="7" placeholder="请留下您宝贵的意见,我们将不断完善"></textarea>
		</div>
		
		<div style=" padding: 20px;">
			<mt-button size="large" @click.native="sub()" style="; background: #fd7b27;" type="primary" >提交</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					fedbackContent:''
				}
			},
		 
			methods: {
				goto(page) {
					this.$router.push(page);
				},
				sub(){
					if(this.fedbackContent==''){
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
					})
						
				}
			},
			 
	}
</script>


<style >
</style>
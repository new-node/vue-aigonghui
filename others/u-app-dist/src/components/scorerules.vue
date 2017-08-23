<template>
	<div>
		<mt-cell  style="margin-bottom: 14px;"  v-for=" item in list" >
			<div slot="title" style="margin-top: 10px;">{{item.ruleName}} 
				<div style="font-size: 12px; margin-top: 8px;margin-bottom: 8px; color: #666; word-wrap:break-word;" v-html="item.description">
					<!--<p>1.描述信息1.描述信息1.描述信息1.描述信息1.描述信息1.描述信息1.描述信息1.描述信息</p>-->
				</div>
			</div>
		</mt-cell>
	</div>
</template>
<style scoped lang="less">

</style>
<script>
	export default {
		data() {
				return {
					list:'',
				}
			},
			mounted() {
				this.getruleslist()
//				if(localStorage.userId){
//
//				}else{
//					
//				}
				
				
			},
			watch:{
				$route(val,oldVal){
					if(this.$route.name=='scorerules'){
						this.list=''
						this.getruleslist()
					}
				}
			},
			methods: {
				goto(page) {
					this.$router.push(page);
				},
				getruleslist(param){
					let self=this;
					this.ajax({
						url:'/edouSignRole/getIntegralRules',
						data:{
							userId:localStorage.userId,
						},
						type:'get'
						},(data)=>{
							if(data.result){
								self.list=data.obj;
							}else{
								self.$toast({
									message: data.description,
									position: 'bottom',
									});
							}
						})
				},
			},
			components: {
//				[Cell.name]: Cell,
			}
	}
</script>
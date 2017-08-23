<template>
	<div>
		<div style="background: #fff;padding: 11px; border-top: 1px solid #ddd;">
			<table width="100%">
				<tr>
					<td style="width: 85px;">性 别</td>
					<td style="width: 90px;">
						<label class="mint-radiolist-label" slot="title" style="">
					        <span class="mint-radio">
					          <input class="mint-radio-input" type="radio" v-model="sex" name="radio"  :value="1" >
					          <span class="mint-radio-core" :checked="checked"></span>
					        </span>
					        <span class="mint-radio-label"  >先生</span>
						</label>
					</td>
					<td>
						<label class="mint-radiolist-label" slot="title" style="display: inline-block;">
					        <span class="mint-radio"> 
					          <input class="mint-radio-input" type="radio" v-model="sex" name="radio" :value="2">
					          <span class="mint-radio-core"></span>
					        </span>
					        <span class="mint-radio-label"  >女士</span>
						</label>
					</td>
				</tr>
			</table>
			
			
		</div>
		<div style="margin-top: 15%; margin-left:20px ; margin-right:20px">
				<mt-button size="large" @click.native="sub()" style="margin-top: 10%; background: #fd7b27;" type="primary">修改</mt-button>
			</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					sex:'1',
				}
			},
			  mounted(){
			  	if(localStorage.userSex=='女士'){
					this.sex=2
				}
				if(localStorage.userSex=='先生'){
					this.sex=1
				}
			  },
			methods: {
//				if(this.sex==0){
//					this.$toast({
//					  message: '请选择性别',
//					  position: 'bottom',
//					});
//					return;
//				}else{
					sub() {
						let self=this;
						this.ajax({
							url:'/sysUserInfo/update',
							data:{
								userId:localStorage.userId,
								userSex:this.sex,
							},
							type:'POST'
							},(data)=>{
								self.$toast({
									message: data.description,
									position: 'bottom',
									
									});
								if(data.result){
									if(self.sex==2){
										localStorage.userSex='女士'
									}
									if(self.sex==1){
										localStorage.userSex='先生'
									}
									history.back();
								}else{
								}
							})
					
				}
			},
	}
</script>

<style scoped>
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
</style>
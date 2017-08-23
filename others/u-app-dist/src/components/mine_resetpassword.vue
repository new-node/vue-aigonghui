<template>
	<div>
		<div style=" width:100%; ">
			<mt-field label="当前密码" style="" placeholder="请输入原密码" :attr="{maxlength:15}"></mt-field>
			<mt-field label="新密码" placeholder="请输入新密码" type="password" :attr="{maxlength:15}"></mt-field>
			<mt-field label="确认新密码" placeholder="请输入新密码" type="password" :attr="{maxlength:15}"></mt-field>
			<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
				<mt-button size="large" @click.native="sub()" style="margin-top: 10%;background: #fd7b27;" type="primary">确定</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
				}
			},
			mounted() {
			},
			computed: {
			 },
			methods: {
				sub(){
					history.back();
					this.$toast({
						  message: '密码重置成功',
						  position: 'bottom',
						});
				}
			},
			components: {

			}
	}
</script>


<style scoped lang="less">
	/*@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}*/
	
	/*input{
		background-color: rgba(193, 28, 28, 0);
	}*/
	
	.linee {
		color: #444;
		font-size: 12px;
	}
	
	.multloginbutton {
		border-radius: 50%;
		height: 50px;
		width: 50px;
		margin: 20px
	}
</style>
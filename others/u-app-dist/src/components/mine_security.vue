<template>
	<div>
		<mt-cell title="认证手机" @click.native="goto({name:'mine_bindphone',params: { phonenumber: phonenumber }})" is-link>
			<span style="color: #8c8c8c">{{secphone}}</span>
		</mt-cell>
		
		<mt-cell title="登录密码" @click.native="goto({name:'login_find_password',params: {name:'mine_security',title: '密码修改'}})" is-link>
			<span style="color: #8c8c8c">修改</span>
		</mt-cell>
	</div>
</template>

<script>
	export default {
			data() {
				return {
					phonenumber:localStorage.userPhone||'',
					secphone:'',
				}
			},
			mounted() {
				this.secphone=this.phonenumber.substring(0,3)+'****'+this.phonenumber.substring(7,11)
			},
			computed: {
			},
			methods: {
				goto(page) {
					
					this.$router.push(page);
				},
			},
			components: {

			}
	}
</script>

<style scoped lang="less">

</style>
<style type="text/css" scoped="scoped">
	table {
		margin: 0 auto;
		width: 80%;
	}
	
	td {
		height: 40px;
		padding-left: 30px;
	}
	
	table {
		border: 1px solid #A3A3A3;
		border-collapse: collapse;
	}
</style>
<template>
	<div>

		<div style="text-align: center; height: 150px;padding-top:50px ;">
			<p>你对任何事物都不感兴趣。</p>
			<p style="font-size: 12px; color: #FF0000;">第1题，共30题</p>
		</div>
		<table>
			<tr @click="jumpto({name:'hearttest_result',params:{title:'测试结果'}})">
				<td style="border-bottom: 1px solid #E2E2E2;">1、是</td>
			</tr>
			<tr>
				<td>2、否</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'hearttest_begin',
		data() {
			return {
				selected: ''
			}
		},
		methods: {
			jumpto(web) {
				this.$router.push(web)
			}
		}
	};
</script>
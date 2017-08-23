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
	<div style="padding: 10px;">

		<div>
			<h3 style="font-weight: normal;">你有抑郁症的倾向么？</h3>
			<p style="font-size: 12px; color: #ddd;">
				2016-11-16 2103人测试过
			</p>
		</div>
		<div>
			<img src="./imgs/eight1.png" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"/><span>测试结果</span>
			<p>你的心理基本正常，没有抑郁症状。</p>
			<img src="./imgs/eight1.png" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"/><span>说明</span>
			<p>继续保持！也将这份测试题转发给更多的人，心理健康值得每个人关注。</p>
		</div>
		<mt-button size="large" type="primary" style="font:16px '微软雅黑';background-color: #fd7b27
; margin: 70px 0;" @click.native="jumpto({name:'hearttest_begin',params:{title:'测试详情'}})">重新测试</mt-button>
	</div>
	</div>

	</div>
</template>

<script>
	export default {
		name: 'hearttest_result',
		data() {
			return {
				selected: ''
			}
		}
	};
</script>
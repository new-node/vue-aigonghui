<style type="text/css" scoped="scoped">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
</style>
<template>
	<div style="padding: 10px;">
		<div :style="style">

			<div style="overflow: auto; height: 100%;">

				<div>
					<h3 style="font-weight: normal;">你有抑郁症的倾向么？</h3>
					<p style="font-size: 12px; color: #ddd;">
						2016-11-16 2103人测试过
					</p>
				</div>
				<img src="./imgs/banner1.png" width="100%" />
				<p v-for="n in 10">想要设计好一款APP，必须要求设计师不断吸收一些优秀的APP视觉设计作品的灵感和思路，特别是国外一些非常棒的简洁的电商APP界面。 今天，25学堂帮大家收集了一些非常不错的电商APP界面视觉设计欣赏，大家可以从中学习到一些APP设计和布局的技巧。</p>

				<div>

				</div>
			</div>
		</div>

		<mt-button size="large" type="primary" style="font:16px '微软雅黑';background-color: #fd7b27
;" @click.native="jumpto({name:'hearttest_begin',params:{title:'测试详情'}})">开始测试</mt-button>

	</div>
</template>

<script>
	export default {
		name: 'hearttest_info',
		data() {
			return {
				selected: '',
				style: {

					"padding-bottom": '10px',
					'overflow-y': 'hidden',
					'height': (document.documentElement.clientHeight - 110) + 'px'

				}
			}
		},
		methods: {
			jumpto(web) {
				this.$router.push(web)
			}
		}
	};
</script>
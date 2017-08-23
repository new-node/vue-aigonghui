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
	
	.nav_ten td {
		height: 90px;
	}
	
	.nav_ten img {
		width: 50px;
	}
</style>
<template>
	<div>
		
		<!--
    	描述：内容
    -->
		<div>
			
				<div v-for="n in 10" style="background-color: #fff; padding:2px 10px 5px; margin-bottom: 5px;" @click="jumpto({name:'heartthings_chat',params:{title:'心事'}})">
					<div>
						<div style="float: left; margin-right: 5px;">
							<img src="./index_navimgs/nav8.png" style="height: 30px;">
						</div>
						<div style="line-height: 10px;font-size:12px">
							<p>匿名用户001</p>
							<span>2016-11-12 10:21</span>
						</div>
					</div>
					<div class="clearfix">
						<p style="font-size: 14px; margin: 5px 0 0;">内向性格该怎么改变？</p>
						<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;line-height: 20px; margin: 3px 0; font-size: 12px;">内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？内向性格该怎么改变？</p>
						<p style="color: #A3A3A3; margin: 5px 0 3px;font-size: 12px;">
							<span>234次阅读&nbsp;&nbsp;&nbsp;&nbsp;6个回复</span>
						</p>
					</div>
				</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'heartask_things',
		data() {
			return {
				selected: ''
			};
		},
		methods: {
			jumpto(web) {
				this.$router.push(web)
			}
		}

	};
</script>
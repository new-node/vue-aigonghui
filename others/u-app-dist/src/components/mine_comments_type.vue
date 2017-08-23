<style>
	.unline .mint-cell-wrapper{background-image: none;}
</style>
<template>
	<div>
		<mt-cell style='border-bottom: 1px solid #f3f5f7;' @click.native="goto('news')" title='新闻资讯' is-link class="unline">
	        <img slot="icon" src="./imgs/newsicon.png" width="24" height="24" style="margin-right: 7px;"/>
		</mt-cell>
		<mt-cell style='border-bottom: 1px solid #f3f5f7;' @click.native="goto('volunteer_activity')" title='志愿活动' is-link class="unline">
		    <img slot="icon" src="./imgs/volunteericon.png" width="24" height="24" style="margin-right: 7px;"/>
		</mt-cell>
		<!--<mt-cell style='border-bottom: 1px solid #f3f5f7;' @click.native="goto('activity')" title='优惠活动' is-link class="unline">
		    <img slot="icon" src="./imgs/activityicon.png" width="24" height="24" style="margin-right: 7px;"/>
		</mt-cell>-->
	</div>
</template>
<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		data() {
			return {
				}
			},
			created(){
			},
			methods: {
				goto(type) {
					this.$router.push({name:'mine_comments_list',params:{commentType:type}})
				}, 

			},

	}
</script>
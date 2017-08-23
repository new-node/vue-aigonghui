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
	.item-new{
		background-color: #fff; 
		padding:2px 10px 5px; 
		background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-origin: content-box;
	    background-repeat: no-repeat;
	    
	}
</style>
<template>
	<div  >
	 
		<div v-if="list.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
			暂无数据
		</div>

		<div v-for="obj in list" class="item-new" @click="jumpto({name:'heartthings_chat',params:{title:obj.sqShort,sqId:obj.sqId}})">
			<div style="text-align: left;">
				<div style="float: left; margin-right: 5px;padding-top: 13px">
					<img :src="obj.photoUrl||''" style="height: 40px; margin-right: 7px;" @error="$event.target.src=defaulthead">
				</div>
				<div style="line-height: 10px;font-size:13px;padding: 2px  ">
					<p style="margin-bottom: 10px;margin-top: 15px;"><span style="margin-top: 5px; display: inline-block;">{{obj.isAnonymous?obj.tmpName||'匿名用户':obj.userRealname||obj.userName||'用户'}}</span></p>
					<span style="color: #8c8c8c;">{{obj.createTime| formatDate}}</span><span style="float: right; color: #8c8c8c;">{{obj.viewCount||0}}次阅读</span>
				</div>
			</div>
			<div class="clearfix" style="margin-top: 10px;text-align: left;">
				<p style="font-size: 17px; margin: 5px 0 0;">{{obj.sqShort}}</p>
				<p style="overflow: hidden; margin: 3px 0; font-size: 15px; word-wrap:break-word;" v-html="obj.sqContext"></p>
				<p style="color: #A3A3A3; margin: 5px 0 3px;font-size: 12px;">

				</p>
			</div>
		</div>
		<div v-if="loading" style="text-align: center; padding: 10px;margin-top: 8px">
			没有更多数据了
		</div>
	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		name: 'heartask',
		data() {
			return {
				selected: '',
				list: [],
				defaulthead: defaulthead
			}
		},
		created() {
			if(sessionStorage.minequeslist){
				this.list=JSON.parse(sessionStorage.minequeslist)
			}
		},
		beforeRouteLeave (to, from, next) {
		    if(to.name!='heartthings_chat'){
		    	sessionStorage.removeItem('minequeslist')
		    }
		    next()
		},
		methods: {
			jumpto(web) {
				this.$router.push(web)
			},
		}

	};
</script>
<template>
	<div>
		<!--<div style="height: 50px"></div>-->
		<!--<el-steps style="margin-left: 10%;"  :space="100" direction="vertical"  :active="active" finish-status="success">
		  <el-step >
		  	<div slot='title'>恭喜你成为工会会员</div>
		  	<div slot='description' style="color: #9B9B9B;">2016年11月24日17:09:52</div>
		  	<div slot='icon'>asdasd</div>
		  </el-step>
		  <el-step title="步骤 2"></el-step>
		  <el-step title="步骤 3"></el-step>
		</el-steps>-->
		
		<!--<button @click="active=active+1">黄金会员</button>-->
		
		<div v-show="listobj.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
			暂无数据
		</div>
		<div class="clearfix" style="width: 100%; padding: 2px 20px; background-color: white;" v-for=" item in listobj">
			
			<img  style="width: 29%;margin-top: -10px; background-color: transparent; float: right;" :src="item.applyStatus==0?shenhe:(item.applyStatus==1?tongguo:bohui)"/>
			<p ><span>{{item.applyName}}</span><span style="margin-left:30px ;"> {{item.applyTel}}</span></p>
			<p>{{item.transferUnionName}}-{{item.workType}}</p>
		</div>
	</div>
</template>

<script>
//import 
import tongguo from './imgs/tongguo.png'
import bohui from './imgs/bohui.png'
import shenhe from './imgs/shenhe.png'
	export default {
		data() {
				return {
					shenhe:shenhe,
					bohui:bohui,
					tongguo:tongguo,
					listobj:[],
				}
			},
			mounted() {
				
				this.getstate();
			},
			computed: {
			 },
			methods: {
				goto(page) {
					this.$router.push(page);
				},
				getstate(){
					let self=this;
					this.ajax({
						url:'/unionTransfer/getAduitRecord',
							data:{
								userId:localStorage.userId||'',
							},
							type:'get'
						},function(data){
							if(data.result){
								self.listobj=data.obj;
							}else{
								self.$toast({
								message: data.description,
								position: 'bottom',
								});
							}
							
						})
				}
			},
			components: {
			}
	}
</script>


<style  lang="less">
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
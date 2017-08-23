<template>
	<div>
		<div style=" width: 100%;  margin: 15px auto 0;">
			<div v-if="list.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
				暂无数据
			</div>
			<mt-cell style='border-bottom: 1px solid #f3f5f7;' @click.native="goto(obj)" v-for='obj in list' :title='obj.name' is-link class="unline">
			</mt-cell>
		</div>
	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		data() {

				return {
					 list:[]
				}
			},
			created(){
				var self=this;
				this.ajax({url:'/sysQuestion/getMyQuestion',data:{sqUserId:localStorage.userId}},(data)=>{
					 this.log(data.obj)
					if(data.result){
						this.list=data.obj
					}
				})
			},
			methods: {
				goto(obj) {
					console.log(JSON.stringify(obj.list))
					sessionStorage.minequeslist=JSON.stringify(obj.list)
					this.$router.push({name:'mine_ques',params:{title:obj.name}})
				},
				 

			},

	}
</script>

<style>
	.unline .mint-cell-wrapper{background-image: none;}
	</style>
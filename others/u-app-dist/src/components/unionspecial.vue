<style type="text/css">
	.ellip {
		overflow: hidden;
		text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	#unionspecial{
		position: relative;
		
	}
	#applyBtn{
		position: fixed;
		border-radius: 50;
		width: 60px;
		height: 60px;
		left: 50%;
		margin-left: -30px;
		bottom: 20px;
		z-index: 3000;
	}
</style>
<template>
	<div  id="unionspecial" >
		<div id="applyBtn" v-show="$route.name=='news_apply'" @click="checkRequirement()">
			<img src="./imgs/applyBtn.png" style="width: 100%;height: 100%;"/>
		</div>
		<!--底部自动加载列表-->
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="padding-bottom: 30px;">
			<div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="200" infinite-scroll-immediate-check='false'>
		  		<div v-if="specialList.length==0" style="text-align: center;background: white;padding: 10px ">
					暂无数据
				</div>
				<mt-cell v-for="obj in specialList"     is-link  @click.native="jumpto(obj)">
			    	<div slot='title' >
			    		 <table  width="100%">
			    		 	<tr>
			    		 		<td width="60px">
					 				 <img  :src="obj.iconUrl||''" style="width: 100px;height: 65px;" @error="$event.target.src=errornews"> 
			    		 		</td>
			    		 		<td >
			    		 			<div style="margin-left: 5px;position: relative;padding-bottom: 20px;" >
			    		 				<p style=" margin-top: 15px; font-size: 15px; color: #222; line-height: 23px; height: 48px; margin-bottom: 0; -webkit-box-orient: vertical" class="ellip">{{obj.detailTitle}} </p>
			    		 				<!--<p style="font-size: 13px;margin-top: 8px;margin-bottom:0px;color: #666;">
			    		 					{{obj.detailShort}}
			    		 				</p>-->
			    		 				<div style="position: absolute;right: -20px; bottom: -5px;width:115% ;">
					    		 			<p style="margin: 0; padding: 0;font-size: 12px;color: #8c8c8c; margin: 5px 0 10px 0;">
				    		 					<span style="float: right;text-align: left;width: 4.2rem;white-space: nowrap;overflow: hidden;">阅读量:{{obj.viewCount}}</span>
												<!--<span style="margin-right: 15px; line-height: 17px;"><img src="./imgs/shoucang.png" width="17" style="vertical-align: bottom;"/>&nbsp;{{obj.remarkCount||0}}</span>
												<span style="margin-right: 0px; line-height: 17px"><img src="./imgs/zanbefore.png" width="17" style="vertical-align: bottom;"/>&nbsp;{{obj.agreeCount||0}}</span>-->
					    		 				<span style="margin-left: 5%;">{{obj.createTime| formatDate}}</span>
					    		 			</p>
					    		 		</div>
			    		 			</div>
			    		 		</td>
			    		 	</tr>
			    		 </table>
			    	</div>
				</mt-cell>
				<p v-show="loading==true && allLoaded==false" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;padding-bottom: 30px;">
	        		<mt-spinner type="fading-circle"></mt-spinner>
	        		<span style="position: absolute;top: 7px;left: 40px;font-size: 14px;color: #999999;">加载中...</span>
	      		</p>
	      		<p v-show="allLoaded" class="page-infinite-loading" style="position: relative;width: 100px;margin: 0 auto;text-align: center;padding-top: 5px;padding-bottom: 30px;">
	        		<span style="position: absolute;top: 7px;left: 0px;font-size: 14px;color: #999999;">没有更多数据了</span>
	      		</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import errornews from './imgs/errornews.png'
export default{
	name:'unionspecial',
	data(){
		return{
			specialList:[],
			//底部自动加载更多
			count:10,//最新一页评论数
		    loading:false,//评论是否加载更多
    		allLoaded: false,
   			wrapperHeight: 0,
   			
			errornews:errornews,
			btnshow:false,
			applyInfoList:{},
			sicId:this.$route.params.sicId
		}
	},
	created(){
		//console.log(this.$route.name)
		//this.getspecialList(0)
	},
	watch:{
		'$route'(val,oldVal){
			console.log(val.name+"..."+oldVal.name)
			if(val.name===oldVal.name){//this.$route.meta.rest===true&&this.$route.name==='unionspecial'
				this.count=10;
				this.loading=false
				this.allLoaded=false
				this.wrapperHeight=0
				this.specialList=[];
				this.sicId=this.$route.params.sicId;
				this.getspecialList(0)
			} 
		},
	},
	mounted() {
    	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	beforeRouteEnter (to, from, next) {
		if(from.name=='details'&& from.meta.from!='volunteer'){
			next()		
		}else{
			next(vm => {
			    // 通过 `vm` 访问组件实例
			    vm.count=10;
				vm.loading=false;
				vm.specialList=[];
				vm.allLoaded=false
				vm.sicId=to.params.sicId
				vm.getspecialList(0)
			})
		}
	},
	methods:{
		checkRequirement() {			
			const self = this;
			if(!localStorage.userId) {
				this.tologin("")
				return
			}
			this.ajax({
				url: '/difficultInfo/checkApplyCondition',
				data: {
					userId:localStorage.userId
				},
				type: 'GET'
			}, function(data) {
				if(data.result) {
					self.applyInfoList = data.obj;
					self.goto({name:'difficult_apply'});
					sessionStorage.realname=data.obj.userRealname;
					sessionStorage.sex=data.obj.userSex;
					if(data.obj.userProCno!=null && data.obj.userProCno!=''){
						sessionStorage.idnumber=data.obj.userProCno;
					}
					
					sessionStorage.telnumber=data.obj.userPhone;
					sessionStorage.cardnumber=data.obj.userCardno;
					sessionStorage.workplace=data.obj.orgName;
				} else {
					self.$toast(data.description)
				}
			})
		},
		
		goto(page, type) {
				if(type) {
					if(!localStorage.userId) {
						this.tologin("")
						return
					}
				}
				this.$router.push(page)
			},
		jumpto(obj) {
			 this.$router.push({name:'details',params:{detailId:obj.detailId,title:obj.detailTitle,from:this.$route.meta.from || ''}})
		},
		loadMore() {
			this.loading = true;
			setTimeout(()=>{
				if(this.count<10){
					this.allLoaded=true;
				}else{
					if(this.specialList.length!=0){
						this.getspecialList(this.specialList.length)
					}
				}
				this.loading = false;
			 },2000)
		},
		getspecialList(sum){
			var self=this;
			this.ajax({
				url:'/sysInfoDetail/detailList',
				data:{sicId:this.sicId,start:sum}
			},
			function(data){
				if(data.result){
				self.specialList=self.specialList.concat(data.obj)	
				self.count = data.obj.length;
				}else{
					self.count=0
				}
			})
		}
	}
}	
</script>

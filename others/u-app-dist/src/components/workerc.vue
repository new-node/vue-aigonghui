<style type="text/css" >
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	.box{
  display: -webkit-flex; /* Safari */
  display: flex;
   flex-wrap:wrap; 
  flex-direction: row;
  background: #FFFFFF;
  align-items:flex-start;
  /*justify-content:flex-start;*/
  /*padding:5px ;*/
  /*align-content: flex-start*/
}
.item {
	flex: 1;
	text-align: center;
 	margin-top: 12px;
 	min-width: 90px;
 	max-width: 90px;
 	color: #666;
} 
	.say .mint-cell-title{margin-top: 6px; color: #666;}
</style>
<template>
	<div>
		<!--<table class="nav_ten" id="qqq">
			<tr>									  	
				<td v-for="obj in nav" @click="jumpto(obj)" style="height: 80px;
		width: 200px;">
					<img :src="obj.iconUrl"  style="width: 40px;"/>
					<p style="margin-top: 5px;">{{obj.sicName}}</p>
				</td>
			</tr>
		</table>-->
		<div  class="box" >
			<div v-for='(obj,index) in nav' class="item" >
				<div style=" width: 80px;" @click="jumpto(obj)">
					<img :src="obj.iconUrl||''" @error="$event.target.src=errorpng" width="40px"/>
					<div style="margin: 5px;">{{obj.sicName}}</div>
				</div>
			</div>
		</div>
		<!--:style="style"-->
		<div >
			<div style="overflow: auto; height: 100%; -webkit-overflow-scrolling :touch;" id="sss">

				<div style="padding-bottom: 5px;">
					<div style="margin-top: 10px; ">
						<mt-cell v-if="qObj!=''" :title="qObj.sicName" class="say">
							<img slot="icon" :src="qObj.iconUrl||''" height="25px" style="margin-right: 7px;margin-bottom: 3px;">
						</mt-cell>
							<div v-for="obj in qObj.list" style="background-color: #fff; padding:2px 10px 5px;  background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
    background-size: 120% 1px;
    background-origin: content-box;
    background-repeat: no-repeat;" @click="goto({name:'heartthings_chat',params:{title:obj.sqShort,sqId:obj.sqId}})">
								<div style="padding-top: 5px;">
									<div style="float: left; margin-right: 5px;padding-top: 3px">
										<img :src="obj.photoUrl||''" style="height: 40px;margin: 5px 5px 0px 5px;border-radius: 50%;" @error="$event.target.src=defaulthead" >
									</div>
									<div style="line-height: 10px;font-size:13px;padding: 2px">
										<p style="color: #222; margin-bottom: 10px;">{{obj.isAnonymous?obj.tmpName||'匿名用户':obj.userRealname||obj.userName||'用户'}}</p>
										<span style="color: #8c8c8c;">{{obj.createTime}}</span><span style="float: right; color: #8c8c8c;">{{obj.viewCount||0}}次阅读</span>
									</div>
								</div>
								<div class="clearfix" style="margin-top: 10px;padding-bottom: 2px;">
									<p style="font-size: 17px; margin: 5px 0 0;">{{obj.sqShort}}</p>
									<p style="overflow: hidden; margin: 3px 0; font-size: 15px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical; word-wrap:break-word; line-height: 18px; " v-html="obj.sqContext"></p>
									 
								</div>
							</div>
						</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import defaulthead from './imgs/defaulthead.png'
import errornews from './imgs/errornews.png'
	export default {
		name: 'worker_life',
		data() {
			return {
				errornews:errornews,
				qObj:{
					sicName:'',
					iconUrl:'',
					list:[],
					sicId:''
				},
				selected: '',
				style: {
					'padding-top': '5px',
					'overflow-y': 'hidden',
					'height': (document.documentElement.clientHeight - 140) + 'px'
				},
				nav:[],
				defaulthead:defaulthead
			};
		},
		watch:{
			"nav"(){
				if(this.nav.length===1){
					let obj=this.nav[0];
					this.$router.replace({name:obj.internalUrl,params:{title:obj.sicName,sicId:obj.sicId,id:obj.qasmId,smId:obj.smId}})
					return
				}
				
			}
		},
		created(){
			var self=this;
			this.ajax({url:'/sysMainFunction/getSubModel',data:{smId:this.$route.params.id,modelType:'model_type_static'}},function(data){
		 		if(data.result){
		 			self.nav=data.obj
		 			if(self.nav.length>1){
						self.getqObj()
					}
		 		}else{
		 			self.$toast(data.description)
		 		}
			});
			
		},
		mounted() {
//			var before = 0;;
//			var www = this;
//			document.getElementById("sss").addEventListener('scroll', function(e) {
//				if(e.target.scrollTop > before) {
//					document.getElementById("qqq").style.display = "none";
//					www.style.height = (document.documentElement.clientHeight - 40) + 'px'
//				} else if(e.target.scrollTop < before) {
//					document.getElementById("qqq").style.display = "block";
//					www.style.height = (document.documentElement.clientHeight - 140) + 'px'
//				}
//				before = e.target.scrollTop
//			})
		},
		methods: {
			getqObj(){
				let self=this;
				this.ajax({url:'/sysQuestion/sayList'},function(data){
			 		if(data.result){
			 			self.qObj=data.obj
			 		}else{
			 			self.$toast(data.description)
			 		}
				});
			},
			jumpto(obj) {
				if(obj.internalUrl){
					this.$router.push({name:obj.internalUrl,params:{title:obj.sicName,sicId:obj.sicId,id:obj.qasmId,smId:obj.smId}})
				}else{
					if(!window.plus) {
						window.location.href = obj.extendUrl
					} else {
						this.goto({name:'blank',params:{url:obj.extendUrl,title:obj.sicName}})
					}
				}
			},
			goto(obj){
				this.$router.push(obj)
			},
		}

	};
</script>
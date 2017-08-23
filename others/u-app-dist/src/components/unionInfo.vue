<template>
	<div id="unionInfo" >
		<!--<div style="overflow: auto;position: fixed;top: 46px;z-index: 11; border-bottom: 1px solid #f3f5f7;"  >
			<mt-navbar v-model="selected" v-if='tabList.length!=0' style="height: 45px;overflow-y: auto;" :style='ww'>
				<mt-tab-item :id="obj" style='min-width: 90px;max-width: 180px;'   :class="obj.sicId==selected.sicId?'is-selected':''" v-for="(obj,index) in tabList" >{{obj.sicName}}</mt-tab-item>
			</mt-navbar>
		</div>-->
		<div  class="box2">
			<div v-for='(obj,index) in tabList' class="item2" v-bind:class="{ item3:isClass }" >
				<div style="width: 100%;"  @click="jumpto(obj)">
					<img :src="obj.iconUrl||''" @error="$event.target.src=errorpng" width="40px" style="margin-top: 5px;"/>
					<div style="margin-top: 5px; margin-bottom: 5px;">{{obj.sicName}}</div>
				</div>
			</div>
		</div>
		
		<!--<div v-if="tabList.length==0" style="text-align: center;background: white;padding: 10px;margin-top: 8px">
			暂无数据
		</div>-->
		<div :style="style"  style="margin-top: 8px;">
			<transition   :name="$route.meta.headershow===false?'':'in-out-translate-fade'">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
		</div>
	</div>
	
</template>
<style type="text/css"  >
.box2{
  background: #FFFFFF;
  width: 100%;
  overflow: auto;
}
.item2 {
	float: left;
	text-align: center;
 	/*margin-top: 12px;*/
 	min-width: 50%;
 	max-width: 50%;
 	color: #666;
 	border: solid 2px #f7f7f7;
}
.item3 {
	float: left;
	text-align: center;
 	/*margin-top: 12px;*/
 	min-width: 33.3333%;
 	max-width: 33.3333%;
 	color: #666;
 	border: solid 2px #f7f7f7;
}
.mint-navbar .mint-tab-item{color: #666;}
	.mint-navbar .mint-tab-item.is-selected {
		border-bottom: 3px solid #fd7b27;
		color: #fd7b27;
		margin-bottom: 0px;
	}
	
	/*.mint-navbar {
		width: 600px;
	}*/
	
	.mint-tab-container {
		overflow: hidden;
	}
	
	.swipemessage {
		position: absolute;
		z-index: 33;
		font-size: 14px;
		bottom: 0px;
		color: white;
		height: 45px;
		background: rgba(0, 0, 0, 0.3);
		width: 100%;
		padding: 5px;
		/*padding-bottom: 4px;*/
	}
	
	.swipemessage p {
		margin-top: 0px;
		font-size: 12px;
	}
	
	.swipemessage span {
		/*float: right;*/
		margin-left: 40%;
	}

</style>
<script type="text/javascript">
import errorpng from './imgs/errormainicon.png'
	export default {
		name: 'unionInfo',
		data() {
			return {
				errorpng:errorpng,
//				selected: '',
				style: {
					height: (document.documentElement.clientHeight - 88) + 'px',
				},
				ww: {
					width: (document.documentElement.clientWidth) + 'px',
				},
				//				bannerList:[],
				tabList: [],
				isClass: true
			}
			
		},
//		watch:{
//			selected(){
//				if(this.selected){
//				 	this.jumpto(this.selected)
//				}
//			}
//		},
		created() {
			var self = this
			this.ajax({
				url: '/sysInfoClass/classList',
				data: {
					smId: this.$route.params.id,
					unionId: this.$route.params.unionId
				},
				type:"get"
			}, function(data) {
				if(data.result) {
					self.tabList = data.obj
					self.isClass = self.tabList.length>4?true:(self.tabList.length==3?true:false)
					if(sessionStorage.selected){
//						self.selected=JSON.parse(sessionStorage.selected)

						self.jumpto(JSON.parse(sessionStorage.selected))
					}else{
//						self.selected = data.obj[0]
						self.jumpto(data.obj[0])
					}
				 
//					self.$router.replace({
//						name: self.selected.internalUrl,
//						params: {
//							sicId: self.selected.sicId
//						}
//					})
				} else {
					self.$toast(data.description)
				}
			})

		},
		beforeRouteLeave (to, from, next) {
				if(to.name=='homepage'||to.name=='square' || to.name==='news_apply'){
					sessionStorage.selected=''
					sessionStorage.removeItem('selected')
				}
		    next()
		},
		methods: {
			goto(obj) {
				if(!window.plus) {
					window.location.href = obj.extendUrl
				} else {
					this.$router.push({name:'blank',params:{url:obj.extendUrl,title:obj.sicName}})
				}
			},
			jumpto(obj) {
				if(obj.internalUrl) {
					this.webviewclose()
					//sessionStorage.selected=JSON.stringify(this.selected) 
					sessionStorage.selected=JSON.stringify(obj)
					//console.log(sessionStorage.selected)
					var routObj={
						name: obj.internalUrl,
						params: {
							sicId: obj.sicId,
							title:obj.sicName,
							specialFlag:''
						}
					}
					if(obj.internalUrl==='news_apply'){	//困难帮扶						
						routObj.params.specialFlag='difficult_help';
						routObj.params.search=false;
						this.$router.push(routObj)
					}else{
						this.$router.replace(routObj)
					}
					
					
					
				} else if(obj.extendUrl) {
					this.goto(obj)
				}
			},
			webviewclose() {
				if(window.plus) {
					var blankWebview = plus.webview.getWebviewById('blank');
					if(blankWebview) {
						blankWebview.close()
					}
				}
			}

		}

	}
</script>

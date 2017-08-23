<template>
	<div id="unionform" >
		<div  class="box2">
			<div v-show="obj.type=='6'" v-for='(obj,index) in tabList' class="item2" v-bind:class="{ item3:isClass }" >
				<div style="width: 100%;"  @click="jumpto(obj)">
					<img :src="obj.iconUrl||''" @error="$event.target.src=errorpng" width="40px" style="margin-top: 5px;"/>
					<div style="margin-top: 5px; margin-bottom: 5px;">{{obj.sicName}}</div>
				</div>
			</div>
		</div>
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

</style>
<script type="text/javascript">
import errorpng from './imgs/errormainicon.png'
	export default {
		name: 'unionform',
		data() {
			return {
				errorpng:errorpng,
				style: {
					height: (document.documentElement.clientHeight - 88) + 'px',
				},
				ww: {
					width: (document.documentElement.clientWidth) + 'px',
				},
				tabList: [],
				isClass: true
			}
			
		},
		computed: {
			formClass() {//筛选表单类
				var list=[];
				for(var i = 0; i < this.tabList.length; i++){
				 	if(this.tabList[i].type=='6'){
				 		list.push(this.tabList[i])
				 	}
				}
				return list
			},
		},
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
					self.isClass = self.formClass.length>4?true:(self.formClass.length==3?true:false)
					self.jumpto(data.obj[0])
				} else {
					self.$toast(data.description)
				}
			})

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
				console.log(obj.internalUrl)
				if(obj.internalUrl) {
					this.webviewclose()
					var routObj={
						name: obj.internalUrl,
						params: {
							sicId: obj.sicId,
							title:obj.sicName,
							specialFlag:''
						}
					}
					this.$router.replace(routObj)							
					
				} else if(obj.extendUrl) {
					this.goto(obj)
				}
			},
			join_in(){//我要入会
				isCanJoinOrTransfer(1)
			},
			isCanJoinOrTransfer(type){//是否可以转会或入会  1入会   2转会
				if(localStorage.userId) {
					this.ajax({
						url: '/unionTransfer/isFormalOrNo',
						data: {
							userId: localStorage.userId
						},
						type: 'get'
					}, (data) => {
						if(data.result) {
							if(type==1){//入会
								if(data.obj.in.isFormal){									
							    	this.$router.push("{name:'join_in',params:{title:'我要入会'}}")		
								}else{
									self.$toast(data.obj.in.description)
								}
							}else if(type==2){//转会
								if(data.obj.transfer.canTransfer){									
								    this.$router.push("{name:'transfer_in',params:{title:'我要转会'}}")	
								}else{
									self.$toast(data.obj.transfer.description)
								}
							}
							/*localStorage.isFormal = data.obj.in.isFormal
							//localStorage.canTransfer = data.obj.transfer.canTransfer
							if(localStorage.isFormal){
								localStorage.isFormaldes = data.obj.in.description
							}
							if(localStorage.canTransfer==false||localStorage.canTransfer=='false'){
								localStorage.transferdes = data.obj.transfer.description
							}*/
							
						}
					})
				}else{
					this.tologin()
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

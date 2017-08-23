<style type="text/css"  >
.mint-navbar .mint-tab-item{color: #666;}
	.mint-navbar .mint-tab-item.is-selected {
		border-bottom: 3px solid #fd7b27;
		color: #fd7b27;
		margin-bottom: 0px;
	}
	.mint-tab-container {
		overflow: hidden;
	}
</style>
<template>
	<div id="mine_volunteer_wish" >
		<div v-show="$route.name!=='mine_wish_detail'" style="overflow: auto;position: fixed;top: 46px;z-index: 11; border-bottom: 1px solid #f3f5f7;"  >
			<mt-navbar v-model="selected"  style="height: 45px;overflow-y: auto;" :style='ww'>
				<mt-tab-item id="mine_publish_wish" @click="change('mine_publish_wish')" style='min-width: 90px;max-width: 180px;'   :class="selected==='mine_publish_wish'?'is-selected':''" >我发布的</mt-tab-item>
				<mt-tab-item id="mine_receive_wish" @click="change('mine_receive_wish')" style='min-width: 90px;max-width: 180px;'   :class="selected==='mine_receive_wish'?'is-selected':''" >我领取的</mt-tab-item>
			</mt-navbar>
		</div>
		<div v-show="$route.name!=='mine_wish_detail'" style="margin-top: 92px;"></div>
		<div >
			<transition   :name="$route.meta.headershow===false?'':'in-out-translate-fade'">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
		</div>
	</div>
	
</template>
<script type="text/javascript">
import errorpng from './imgs/errormainicon.png'
	export default {
		name: 'mine_volunteer_wish',
		data() {
			return {
				errorpng:errorpng,
				selected: 'mine_publish_wish',
				style: {
					height: (document.documentElement.clientHeight - 88) + 'px',
				},
				ww: {
					width: (document.documentElement.clientWidth) + 'px',
				},
				isClass: true
			}
			
		},
		beforeRouteEnter (to, from, next) {
		    if(!localStorage.userId){
                next({name: 'login',title:'登录'})
		    	return 
		    }
		    next()
		},
		watch:{
			selected(){
				if(this.selected){
				 	this.jumpto(this.selected)
				}
			}
		},
		created() {		
			/*if(sessionStorage.selected){
				this.selected=sessionStorage.selected
			}else{
				this.selected = "mine_publish_wish"
			}			
			this.jumpto(this.selected)*/
			/*this.mine_volunteer_wish=this.$route.meta.wish_type;
			console.log(this.$route)*/
		},
		beforeRouteLeave (to, from, next) {
			if(to.name=='wish'){
				sessionStorage.selected=''
				sessionStorage.removeItem('selected')
			}
	        next()
		},
		methods: {
			jumpto(obj) {
				//sessionStorage.selected
				this.$router.replace({name:obj,params:{wish_type:obj}})
			},
			change(type){
				this.selected = type
			}
		}

	}
</script>

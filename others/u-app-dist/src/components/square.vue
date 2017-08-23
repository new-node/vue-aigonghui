<style type="text/css">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	.position dl,
	.trade dl,
	.company dl {
		width: 30%;
		float: left;
		margin: 0 5px 10px;
	}
	
	.position dt img,
	.trade dt img,
	.company dt img {
		width: 100%;
	}
	
	.position dd,
	.trade dd,
	.company dd {
		margin: 0 auto;
		width: 50%;
	}
	
	.trade dd {
		width: 62%;
	}
	.mint-navbar .mint-tab-item.is-selected {
	    border-bottom: 3px solid #fd7b27;
	    color: #fd7b27;
	    margin-bottom: 0px;
	}
	.mui-table-view {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style: none;
		background-color: #fff
	}
	.mui-table-view.mui-grid-view {
		font-size: 0;
		display: block;
		width: 100%;
		padding: 0 10px 10px 0;
		white-space: normal
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell {
		font-size: 17px;
		display: inline-block;
		margin-right: -4px;
		padding: 10px 0 0 14px;
		text-align: center;
		vertical-align: middle;
		background: 0 0
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell:after,
.mui-table-view.mui-grid-view .mui-table-view-cell:before {
	height: 0
}

.mui-grid-view.mui-grid-9 {
	margin: 0;
	padding: 0;
	border-top: 1px solid #eee;
	border-left: 1px solid #eee;
	background-color: #fff
}

.mui-grid-view.mui-grid-9:after,
.mui-grid-view.mui-grid-9:before {
	display: table;
	content: ' '
}

.mui-grid-view.mui-grid-9:after {
	clear: both;
	position: static
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
	margin: 0;
	padding: 11px 15px;
	vertical-align: top;
	
}
.mui-grid-view.mui-grid-9 .mui-media {
	color: #797979
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
	font-size: 14px;
	line-height: 15px;
	display: block;
	width: 100%;
	height:25px;
	margin-top: 8px;
	text-overflow: ellipsis;
	color: #666;
}
.mui-col-xs-4 {
	width: 33.33333333%
}
@media (min-width:400px) {
	.mui-col-sm-3 {
		width: 33.33333333%
	}
}
.mint-tab-item{color: #666;}
</style>
<template>
	<div>
		<mt-navbar v-model="selected" style="height: 45px;">
			<mt-tab-item :id="obj.classId" v-for='obj in nav' :class="obj.classId==selected?'is-selected':''">{{obj.className}}</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
	 
		
 		<ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click='goto(itemObj)' v-for='itemObj in list'>
                <img :src="itemObj.iconUrl||''" style="width: 80px;" @error="$event.target.src=errorpng"/>
                <div class="mui-media-body">{{itemObj.unionName}}</div>
            </li>
        </ul> 

	</div>
</template>

<script>
	import errorpng from './imgs/ghjz.png'
	export default {
		name: 'square',
		data() {
			return {
				selected:'',
				nav:[],
				list:[],
				errorpng:errorpng
			};
		},
		created(){
			let self=this;
			this.ajax({url:'/unionMatrixClass/list'},function(data){
		 		if(data.result){
		 			//console.log(data.obj)
		 			self.nav=data.obj
		 			if(sessionStorage.squareId){
		 				self.selected=sessionStorage.squareId
		 			}else{
				 		self.selected=data.obj[0].classId
		 			}
			 		
		 		}
			})
		},
		beforeRouteLeave (to, from, next) {
		    if(to.name=='unionInfo'){
		    	sessionStorage.squareId=this.selected;
		    }else{
		    	sessionStorage.squareId=''
		    }
		    next()
		},
		watch:{
			selected(){
				let self=this;
				this.ajax({url:'/unionMatrixMember/unionList',data:{classId:this.selected}},function(data){
			 		if(data.result){
			 			//console.log(data.obj)
						self.list=data.obj
			 		}else{
			 			//console.log('222')
			 			self.$toast(data.description)
			 		}
				})
			}
		},
		methods: {
			goto(obj) {
				console.log(JSON.stringify(obj))
				this.$router.push({name:'unionInfo',params:{id:this.$route.params.id,title:obj.unionName,unionId:obj.unionId}})
			}
		}

	};
</script>
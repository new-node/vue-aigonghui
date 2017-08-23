<style type="text/css">
	.ellip {				
		overflow : hidden;		
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;    /* 数值代表显示几行 */		
		-webkit-box-orient:vertical;
	}
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}	
	.clearfix {*zoom: 1;}	
	.nav_ten td {height: 80px;width: 200px;}	
	.box{
	  width: 100%;
	  overflow: auto;
	  background: #FFFFFF;
	}		
	
	.item {
	    float: left;	
	   text-align: center;
	 	min-width: 50%;
	 	max-width: 50%;
	 	color: #666;
	 	border: solid 2px #f7f7f7;
	} 	
	.more .mint-cell-title{font-size: 12px; color: #666;text-align: center;}	
	.life_nav .mint-cell-wrapper {
		background-size: 120% 0px;
	}
	.life_nav .mint-cell-text{color: #666;}
	#sss .mint-cell-value.is-link span{ font-size: 14px;}
</style>
<template>
	<div>

		<!--<table class="nav_ten" id="qqq">
			<tr>									  
				<td v-for="obj in nav" @click="jumpto(obj)">
					<img :src="obj.iconUrl" style="width: 40px;"/>
					<p style="margin-top: 5px;">{{obj.sicName}}</p>
				</td>

			</tr>
		</table>-->
		
		<div  class="box" >
			<div v-for='(obj,index) in nav' class="item" >
				<div style=" width: 100%;" @click="jumpto(obj)">
					<img :src="obj.iconUrl||''" @error="$event.target.src=errorpng" width="40px" style="display: inline-block;margin-top: 5px;"/>
					<!--<div style="margin: 5px;line-height: 40px; font-size: 16px; overflow: hidden; display: inline-block;">{{obj.sicName}}</div>-->
					<div style="margin-top: 5px; margin-bottom: 5px;">{{obj.sicName}}</div>
				</div>
			</div>
		</div>
		<!--:style="style"-->
		<div   >
			<div style="overflow: auto; height: 100%;-webkit-overflow-scrolling :touch;" id="sss">

				<div style="padding-bottom: 5px;">

					<div style="margin-top: 8px;" v-for="obj in recommendList">

						<mt-cell :title="obj.sicName" class="life_nav"  value="更多" is-link @click.native="goto({name:'unionstylelist',params:{title:obj.sicName,sicId:obj.sicId}}) " >

							<img slot="icon" :src="obj.iconUrl||''" height="25px" style="margin-right: 7px;" @error="$event.target.src=errornews">
						</mt-cell>
						<div style=" background-color: #fff;" class="clearfix">

							<div style="display: flex;  padding:5px 10px; background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
   
    background-origin: content-box;
    
  
   
    
    display: flex;
   
   
   
    overflow: hidden;
    padding: 0 10px;" v-for='item in obj.list' @click="goto({name:'details',params:{title:item.detailTitle,detailId:item.detailId}})">

								<div style="float: left;  display: inline-block;   padding-top:15px ;">
									<img :src="item.iconUrl||''" style=" width: 100px; height: 65px; " @error="$event.target.src=errornews">
								</div>
								<div style="float: left; margin-left: 15px; line-height: 20px; display: inline-block;padding-top:10px ;padding-bottom: 10px; width: 70%;">
									<p style="margin: 0; font-size: 15px; color: #222; height: 48px; margin-top: 5px; line-height: 23px; -webkit-box-orient:vertical" class="ellip">{{item.detailTitle}}</p>
									<!--<p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px; margin: 0px;font-size: 12px;">
										{{item.detailShort}}
									</p>-->

									<div style="font-size:12px;text-align: center; color: #8c8c8c;">
										<span style="float: left;">{{item.createTime}}</span><span style="float: right;">阅读量：{{item.viewCount}}</span><!--<span style="float: right;">点赞: {{item.agreeCount}}</span>-->
									</div>
								</div>
							</div>
							<!--<mt-cell title="查看更多"  @click.native="goto({name:'unionstylelist',params:{title:obj.sicName,sicId:obj.sicId}}) "is-link class="more"></mt-cell>-->
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import errornews from './imgs/errornews.png'
	export default {
		name: 'worker_life',
		data() {
			return {
				selected: '',
				errornews:errornews,
				style: {

					'overflow-y': 'hidden',
					'height': (document.documentElement.clientHeight - 140) + 'px'
				},
				nav: [],
				recommendList: []
			};
		},
		created() {
			var self = this;
			this.ajax({
				url: '/sysMainFunction/getSubModel',
				data: {
					smId: this.$route.params.id,
					modelType: 'model_type_static'
				}
			}, function(data) {
				if(data.result) {
					self.nav = data.obj
				} else {
					self.$toast(data.description)
				}
			})
			this.ajax({
				url: '/sysInfoDetail/lifeList',
				data: {
					smId: this.$route.params.id
				}
			}, function(data) {
				if(data.result) {
					self.recommendList = data.obj
				} else {
					self.$toast(data.description)
				}
			})

		},
		mounted() {
//			var before = 0;
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
			goto(obj){
				this.$router.push(obj)
			},
			jumpto(obj) {
				if(obj.internalUrl){  
					this.goto({name:obj.internalUrl,params:{title:obj.sicName,sicId:obj.sicId,qasmId:obj.qasmId,smId:obj.smId}})
				}else{
					if(!window.plus) {
						window.location.href = obj.extendUrl
					} else {
						this.$router.push({name:'blank',params:{url:obj.extendUrl,title:obj.sicName}})
					}
				}
			}
		}

	};
</script>
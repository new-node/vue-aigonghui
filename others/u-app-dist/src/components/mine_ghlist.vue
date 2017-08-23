<template>
	<div style="">		
		<div style="background-color: #fff;" :style="style">
			<div style="overflow: auto; height: 100%;">
				<div style="width: 100%; background-color: #fff;">
					<label class="label" style="font-size: 16px;width: 30%;">区县工会：</label>
					<select class="cselect" v-model="tempfirst" style="width:65%; font-size: 15px;color: #8c8c8c;">
						<option value="">请选择</option>
						<template v-for="item in firstlist">
							<option :value="item">{{item.unionName}}</option>
						</template>
					</select>
				</div>

				<mt-field v-show='tempfirst!=""' label="乡镇工会：" disableClear @click.native="firstUnionChange" placeholder="请选择" :value="tempsecond.unionName" :readonly="true" type="text"></mt-field>
				<mt-field v-show='tempsecond!="" && $route.params.type!=="flag"' disableClear label="企业工会：" @click.native="secondUnionChange" placeholder="请选择" :value="tempthird.unionName" :readonly="true" type="text"></mt-field>
				
				<div v-show="unionSearch" style="margin-top: 10px; border-top: 1px solid #D9D9D9;">
					<div style="background-color: #fff;">
						<div class="mint-searchbar" style="background: transparent;width: 95%;  " >
							<div class="mint-searchbar-inner" style="height: 30px; ">
								<i class="mintui mintui-search" style="margin-top: 5px;"></i> 
								<input type="search" placeholder="可搜索您所在的工会" class="mint-searchbar-core"   v-model="searchvalue" style="width: 100%;">
							</div>
							<button class="gong_btn" @click="search()">搜索</button>
						</div>		
					</div>
					<!--<p style="margin-left: 10px; font-size: 12px; color: #666;">当前选中工会:&nbsp; {{gonghuiobj.unionName}}</p>-->
					<p v-show='list.length!=0' style="padding: 6px;background: white;margin-bottom: 0px;font-size: 16px; padding:15px 0px 15px 10px;">请选择所属下级工会:</p>
					<!--<div  v-infinite-scroll="loadMore" infinite-scroll-disabled="loadMoreflag" infinite-scroll-distance="20" infinite-scroll-immediate-check="true" style="z-index: 555;margin-bottom: 80px;">-->
					<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="loading" @bottom-status-change="handleBottomChange"  ref="loadUnion" :auto-fill='false' style="z-index: 555; margin-bottom: 80px;">
						<div v-show="list.length==0" style="text-align: center; padding: 20px;">
						暂无下级内容
					</div>
						<mt-cell @click.native="setobj(item)" v-for='item in list' :title="item.unionName"   style="color: #8c8c8c;"></mt-cell>
										
						<div v-show=" loading && list.length!=0" style="text-align: center; padding: 20px; margin-bottom: 20px;">
							已经没有更多内容了
						</div>
					</mt-loadmore>	
					<!--</div>-->
				</div>
			</div>
		</div>
		<div style=" margin-top: 12px; width: 100%;position: fixed;bottom: 10px; padding-left: 20px; padding-right: 20px; ">
			<mt-button size="large" @click.native="sub" style="background: #fd7b27;" type="primary">确定</mt-button>
		</div>

	</div>
</template>

<script>
 

	let timer = null
	export default {
		data() {
			return {
				firstlist: [],//区县工会集合
				list: [],     //搜索的工会集合
				tempfirst: '',//选择的区县工会
				tempsecond: '',//选择的街道工会
				tempthird: '',//选择的企业工会
				searchvalue: '',//搜索内容
				count: 10,
				loadMoreflag: false,
				loading: false,
				gonghuiobj: '',
				unionId: '',//搜索依据的工会id
				unionSearch:false,//搜索是否展示
				bottomStatus: '',
				style: {
				"padding-bottom": '10px',
				'overflow-y': 'hidden',				
				/*'height': (document.documentElement.clientHeight - 120) + 'px',*/
				'-webkit-overflow-scrolling' :'touch',

			}
			}
		},
		created() {
			//筛选区县工会集合
			this.ajax({
				url: '/unionBase/list',
			}, (data) => {
				if(data.result) {
					this.firstlist = data.obj
				}
			})
			this.setHeight()
		},
		watch: {
			'tempfirst' () {
				this.tempsecond = ''
				this.tempthird = ''
				this.firstUnionChange()
			},
			'tempsecond' () {
				this.tempthird = ''
				this.secondUnionChange()
			},
		},
	    methods: {
	       setHeight(){
	       	var self=this;
				setTimeout(function(){
					self.style["height"]=(document.documentElement.clientHeight - 46) + 'px'
				},1000)
			},	    	
			search(){//搜索查询
				if(this.searchvalue.trim()==''){
					//this.list = [];
					
					return
				}			
				this.loading=false;
				this.list = [];
				this.baselistface()						
			},
			
			setobj(obj) {
				let self = this;
				if(obj.unionCurrentLevel == 3) {
						this.tempsecond = obj;
					if( this.$route.params.type=='flag'){
						this.gonghuiobj=obj
						this.unionSearch=false
						return
					}
				
				} else if(obj.unionCurrentLevel == 4) {
					this.tempthird = obj;
					this.unionSearch=false
				}
				this.list = [];
				this.unionId = obj.unionId;
				if(this.$route.params.type) {
					self.gonghuiobj = obj;
				}
				this.baselistface(function() {
					self.gonghuiobj = obj;
				})
	
			},
			setlist(type) {			 
				if(this.$route.params.type) {
					this.gonghuiobj = this[type]
				}
				 if(this.$route.params.type=='flag'){
					 
					return
				}
				
				this.unionId = this[type].unionId;
				this.list = [];
				this.baselistface();
			},
			baselistface(callback) {					
				let self = this;
				this.ajax({
					url: '/unionBase/list',
					data: {
						start: this.list.length, //this.start,
						unionParentId: this.unionId,
						unionName: this.searchvalue,
					},
					type:'get'
				}, (data) => {
					if(data.result) {
						if(data.obj.length == 0) {
							callback && callback()
						} else {
							if(!self.$route.params.type) {
								self.gonghuiobj = ''
							}
							self.list = self.list.concat(data.obj);
						}
						self.count = data.obj.length;
					}
	
				})
			},
			sub() {
				if(this.$route.params.type == 'flag') {
					if(this.tempthird == ''&&this.tempsecond!='') {
						
					}else{
						this.$toast({
							message: '必须选择为街道级',
							position: 'bottom',
						});
						return ;
					}
				}
				/*if(this.gonghuiobj) {
					this.gonghuiobj.parentid = this.tempfirst.unionId
					sessionStorage.addressobj = JSON.stringify(this.gonghuiobj)
					this.$router.back();
				} else {
					this.$toast({
						message: '未选择最为详细的工会地址',
						position: 'bottom',
					});
				}*/
				
				if(this.tempfirst && this.tempfirst!=''){
					this.gonghuiobj=this.tempfirst;
					if(this.tempsecond && this.tempsecond!=''){
						this.gonghuiobj=this.tempsecond;
					}
					if(this.tempthird && this.tempthird!=''){
						this.gonghuiobj=this.tempthird;
					}
					this.gonghuiobj.parentid = this.tempfirst.unionId
					sessionStorage.addressobj = JSON.stringify(this.gonghuiobj)
					this.$router.back();
				}else{
					this.$toast({message: '请选择工会信息',position: 'bottom'});
				}
				
				
				
	
			},
			handleBottomChange(status) {
	      		this.bottomStatus = status;
	    	},
			loadMore() {
//				setTimeout(()=>{
//				 	this.$refs.loadUnion.bottomStatus ='loading'
//				 	this.$refs.loadUnion.bottomReached =true
//				 	this.$refs.loadUnion.direction='up'
//				 	this.$refs.loadUnion.handleTouchEnd()
//				 },1000)
				/*if(this.count == 10) {
					this.loading = false;
					if(!timer) {
						timer = setTimeout(() => {
							this.baselistface()
							timer = null
						}, 500)
					}
				} else {
					this.loading = true;
				}*/
				setTimeout(()=>{
					if(this.count<10){
						this.loading=true;
					}else{
						if(!timer) {
							timer = setTimeout(() => {
								this.baselistface()
								timer = null
							}, 500)
						}
					}
					this.$refs.loadUnion.onBottomLoaded();
				},1000)
			},
			firstUnionChange(){//区县工会改变
				var self = this;
				if(this.tempfirst && this.tempfirst.unionId) {
					if(this.$route.params.type) {
						this.gonghuiobj = this.tempfirst
					}
					this.unionId = this.tempfirst.unionId
					this.list = [];
					this.unionSearch=true;
					this.searchvalue="";
					this.baselistface(function() {
						self.gonghuiobj = self.tempfirst
					})
				}
			},
			secondUnionChange(){//街道工会改变
				var self = this;
				if(this.tempsecond && this.tempsecond.unionId&&this.$route.params.type!='flag') {
					if(this.$route.params.type) {
						this.gonghuiobj = this.tempsecond
					}
					this.unionId = this.tempsecond.unionId;
					this.list = [];
					this.unionSearch=true;
					this.searchvalue="";
					this.baselistface(function() {
						self.gonghuiobj = self.tempfirst
					})
				}
			}
	}		
}
	
</script>

<style>
	.label {
		width: 20%;
		display: inline-block;
		margin-left: 10px;
	}
	
	select {
		height: 48px;
		width: 75%;
		display: inline-block;
		border: none;
		background-color: #fff;
		padding-left:8px;
	    appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    background: url("./imgs/arrowmine.png") no-repeat scroll right center transparent;
	}
	
	.mint-searchbar {
		background-color: #fff;
		height: 45px;
	}

	.mint-searchbar-inner{background-color: #f2f2f2;height: 30px;}
	.mint-searchbar-core{width: 100%;background-color: #f2f2f2;}
	.mint-searchbar-text{margin-left: 5px;}
	.mint-searchbar-text{font-size: 12px;}
	.mint-searchbar-core{font-size: 12px;line-height: 20px;}
	.mint-searchbar-cancel{color: #FD7B27;}
	.gong_btn{
		background-color: #FD7B27;
		 border: none; 
		 font-size:14px; 
		 color: #fff;
		padding: 5px 8px;
		border-radius: 5px;
    	margin-left: 15px;
    	margin-right: -10px;
    	}

</style>
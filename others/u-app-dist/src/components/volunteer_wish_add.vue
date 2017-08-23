<style type="text/css"  >	
	.leble {width: 35%;display: inline-block;margin-left: 18px;}	
	select {width: 55%;display: inline-block;border: none;background-color: #fff;}
	.direct .mint-cell-allow-right::after{transform: translateY(-50%) rotate(135deg);}
	.mint-cell .mint-cell-wrapper .mint-cell-title{font-size: 15px;}
	.mint-tab-item{color: #666;}
	.mint-field-core{font-size: 14px;}
	.select{width: 100%; background-color: #fff; padding-left: 10px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;}
	.cselect {
		padding-left:8px;
	    appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    background: url("./imgs/arrowmine.png") no-repeat scroll right center transparent;
	}
</style> 
<template>
    <div id="wish_add" >
    	<div style="background-color: white; padding-bottom: 15px;">
	        <mt-field label="主题" v-model="title" :attr="{maxlength:50}" placeholder="请输入您的心愿主题"></mt-field>
	        <div class="select">	
				<label class="label" style="font-size: 15px; padding: 0;width: 60px; margin-left:0; ">爱心值</label>
				<select class="cselect" v-model="integral" style="width: 65%; font-size: 14px; color: #a9a9a9; margin-left: 52px;">
					<option value="" >请选择积分值</option>
					<option v-for="item in integralList" :value="item.value" >{{item.text}}</option>
				</select>
	        </div>        
	        <mt-field label="" v-model="content" placeholder="请描述一下您的心愿吧" type="textarea" :attr="{maxlength:400}" rows="8"></mt-field>
	        <div @click="goTo({name:'explain',params:{explain_type:'wish',title:'微心愿说明'}})" style="display:flex;border-top: 1px solid #d9d9d9; margin-left: 10px;padding-top: 10px;">								
				<img src="./imgs/smicon.png"  width="24px" height="24"/> 
				<span style="margin:2px 10px;">版块说明</span>
			</div>
	    </div>
		<div style="padding: 0 20px; ">
			<mt-button size="large" @click.native="addWish" style="margin: 5% 0;  background: #fd7b27;" type="primary">提交</mt-button>
		</div>
    </div>   
</template>
<script type="text/javascript">
	export default {
		name: 'unionInfo',
		data() {
			return {
				title:"",//标题
				integral:"",//爱心值
				content:'',//内容
				integralList:[]//积分集合
			}			
		},
		beforeRouteEnter (to, from, next) {
		    if(!localStorage.userId){
                next({name: 'login',title:'登录'})
		    	return 
		    }
		    next()
		},
		created() {		
			this.pageInnit()//初始化页面
		},
		methods: {
			pageInnit(){//页面初始化
				if(sessionStorage.wishObj){
					var wishObj=JSON.parse(sessionStorage.wishObj)					
					this.integralList=wishObj.integralList;
					this.title=wishObj.title;
					this.content=wishObj.content;
					this.integral=wishObj.integral;
				}
				if(this.integralList.length==0){
					this.getIntegralList();
				}
			},
			getIntegralList(){//获取下拉积分
				var self=this;
				this.ajax({
					url: '/voluNeeds/integralList',
					type: 'get'
				},
				function(data) {
					if(data.result) {
						self.integralList=data.obj
					}
				})
			},
			addWish(){
				var self=this;
				this.title=this.filterContent(this.title)
				this.content=this.filterContent(this.content)
				if(this.title==''){
					this.$toast('请输入标题')
					return
				}else if(this.title.length>50){
					this.$toast('标题长度不能超过50')
					return
				}else if(this.integral==''){
					this.$toast('请选择积分值')
					return
				} else if(this.content==''){
					this.$toast('请输入内容')
					return
				}else if(this.content.length>400){
					this.$toast('内容长度不能超过400')
					return
				}else{
					var obj={
						title:this.title,//标题
						integral:this.integral,//爱心值
						content:this.content,//内容
						userId:localStorage.userId //当前用户
					}
					this.ajax({
						url: '/voluNeeds/add',
						data: obj,
						type: 'post'
					},
					function(data) {
						if(data.result) {
							self.title='';
							self.integral='';
							self.content='';
							self.$router.back()
						}
						self.$toast(data.description)
					})
				}
			},
			goTo(obj){
				if(obj.name=='explain'){
					var wishObj={
						title:this.title,
						integral:this.integral,
						content:this.content,
						integralList:this.integralList
					}
					sessionStorage.wishObj=JSON.stringify(wishObj)
					this.$router.push(obj)
				}
			},
		},
		beforeRouteLeave (to, from, next) {
		     if(to.name!='explain'){
		    	sessionStorage.removeItem("wishObj")
		    }
   			next()
		},
	}
</script>
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
	
	.mint-radiolist-label {
		display: block;
	}
	
	.mint-radio-input {
		display: none;
	}
	
	.mint-radio-input:checked+ .mint-radio-core {
		background-color: #fd7b27;
		border-color: #FFFFFF;
	}
	
	.mint-radio-input:checked+ .mint-radio-core::after {
		background-color: #fff;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	
	.mint-radio-input[disabled]+ .mint-radio-core {
		background-color: #d9d9d9;
		border-color: #ccc;
	}
	
	.mint-radio-core {
		display: inline-block;
		background-color: #fff;
		border-radius: 100%;
		border: 1px solid #ccc;
		position: relative;
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	.join .mint-radiolist-label:first{
		width: 70px;
		padding: 0;
		margin-left: 40px;
	}
	.mint-radio-core::after {
		content: " ";
		border-radius: 100%;
		top: 4.5px;
		left: 4.5px;
		position: absolute;
		width: 8px;
		height: 8px;
		-webkit-transition: -webkit-transform .2s;
		transition: -webkit-transform .2s;
		transition: transform .2s;
		transition: transform .2s, -webkit-transform .2s;
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		color: #FD7B27;
		border-bottom: 3px solid #FD7B27;
	}
	
	.Union {
		text-align: center;
		overflow: auto;
		height: 180px;
		/*padding: 10px;*/
		padding: 0;
		margin: 0;
		list-style: none;
	}
	
	.UnionP {
		padding: 8px;
	}
	
	.leble {
		/*text-align: right;*/
		display: inline-block;
		/*line-height: 48px;*/
		margin-left: 18px;
	}
	
	.join select {		
		display: inline-block;
		padding: 0;
		margin: 0;
		border: none;
		background-color: #fff;
		font-size: 14px; 
		color: #A9A9A9;
		width: 45%;
	}
	.join .label{
		font-size: 15px; 
		padding: 0;
		width: 34%; 
		margin-left: 0; 
		display:inline-block;
	}
	.join .cselect {
		font-size: 14px;
		padding-left:14px;
	    appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    background: url("./imgs/arrowmine.png") no-repeat scroll right center transparent;
	}
	@media only screen and (max-device-width:325px){
	    .join .label{
	    	width: 35% !important ; 
	    	margin-right: 0px;
	    }
	   	.join select{
	    	padding-left: 8px !important;
	    }
	}
	@media only screen and (max-device-width:399px){
	    .join .label{
	    	width: 35%; 
	    }
	    .join select{
	    	padding-left: 10px !important;
	    }
	}
	@media only screen and (max-device-width:400px){
	    .join .label{
	    	width: 34%; 
	    }
	     .join select{
	    	padding-left: 12px;
	    }
	}
	@media only screen and (min-device-width:400px){
	    .join .label{
	    	width: 33%; 
	    }
	     .join select{
	    	padding-left: 12px !important;
	    }
	}
	@media only screen and (min-device-width:511px){
	    .join .label{
	    	width: 32%; 
	    }
	}
	@media only screen and (min-device-width:700px){
	    .join .label{
	    	width: 31%; 
	    }
	     .join select{
	    	padding-left: 18px !important;
	    }
	}
	.ellip {
		overflow: hidden;
		text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.direct .mint-cell-allow-right::after{transform: translateY(-50%) rotate(135deg);}
	.join .mint-cell .mint-cell-wrapper .mint-cell-title{font-size: 15px;width: 30%;}
	.mint-tab-item{color: #666;}
	.mint-field-core{font-size: 14px;}
	.join .mint-cell-value{margin-left: 30px;}
	.join .mint-cell-title{width: 112px;}
	
</style> 
<template>
	<div class="join">

		<mt-navbar v-model="selectedtab" style="height: 45px;">
			<mt-tab-item id="qy">会员权益</mt-tab-item>
			<mt-tab-item id="rh"  @click.native="tishiruhui">我要入会</mt-tab-item>
			<mt-tab-item id="zh" @click.native="tishizhuanhui">我要转会</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selectedtab"  style='margin-top:15px;'>
			<mt-tab-container-item id="qy" >
				<div v-if="specialList.length==0" style="text-align: center;background: white;padding: 10px ">
					暂无数据
				</div>
			    <mt-cell v-for="obj in specialList"     is-link  @click.native="jumpto(obj)">
			    	<div slot='title'>
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
					    		 				<span style="float: right;">
					    		 					<span style="float: right;text-align: left;width: 4.4rem;">阅读量:{{obj.viewCount}}</span>
													<!--<span style="margin-right: 15px; line-height: 17px;"><img src="./imgs/shoucang.png" width="17" style="vertical-align: bottom;"/>&nbsp;{{obj.remarkCount||0}}</span>
													<span style="margin-right: 0px; line-height: 17px"><img src="./imgs/zanbefore.png" width="17" style="vertical-align: bottom;"/>&nbsp;{{obj.agreeCount||0}}</span>-->
												</span>
					    		 				<span style="margin-left: 5%;">{{obj.createTime| formatDate}}</span>
					    		 			</p>
					    		 		</div>
			    		 			</div>
			    		 		</td>
			    		 	</tr>
			    		 </table>
			    	</div>
				</mt-cell>
			</mt-tab-container-item>
			
			<mt-tab-container-item id="rh">
				<div class="clearfix" style="background-color: #fff;padding:0 5px;">
					<mt-cell title="入会帮助" is-link value="" @click.native="notice1=!notice1" style="color: #A9A9A9;" class="direct">
					</mt-cell>
					<div style="font-size: 12px;" v-show="notice1" >
						<p>1、淄博境内，以工资收入为主要生活来源的在职职工，均可申请加入工会组织。</p>
						<p>2、已在本单位入会的职工，无需重复申请入会。</p>
						<p>3、未入会职工，所在单位已建立工会组织的，向本单位工会提出入会申请即可。</p>
					</div>
				</div>
				<mt-field label="  姓 名" placeholder="请输入姓名" v-model="realname" :attr="{maxlength:10,minlength:2}" style="padding-left: 5px;background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		    background-size: 120% 1px;
		    background-repeat: no-repeat;overflow: hidden;"></mt-field>
				<div style="background: #fff;   background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat;  line-height: 45px;height: 48px;" >
					<table width="100%">
						<tr>
							<td class="" style="width: 68px;font-size: 15px; padding-left: 13px;">性 别</td>
							<td style="width: 40px;">
								<label class="mint-radiolist-label" slot="title" style=" padding-left: 0px;">
							        <span class="mint-radio">
							        	<input class="mint-radio-input" type="radio"  name="radio" v-model="sex" :value="1" >
							        	<span class="mint-radio-core"></span>
							        </span>
							        <span class="mint-radio-label"  style="color:#A9A9A9;font-size: 14px;">先生</span>
								</label>
							</td>
							<td style="width: 60px;">
								<label class="mint-radiolist-label" slot="title" style="display: inline-block;">
							        <span class="mint-radio">
							        	<input class="mint-radio-input" type="radio"  v-model="sex"  name="radio" :value="2">
							        	<span class="mint-radio-core"></span>
							        </span>
							        <span class="mint-radio-label"   style="color:#A9A9A9;font-size: 14px;">女士</span>
								</label>
							</td>
						</tr>
					</table>
				</div>
				<mt-field label="身份证号" v-model="idnumber" type="text" :attr="{maxlength:18,minlength:15}"  placeholder="请输入身份证号" style="padding-left: 5px; font-size: 15px;"></mt-field>
				<mt-field label="手机号" v-model="telnumber" type="tel" placeholder="请输入手机号" :attr="{maxlength:11}" style="padding-left: 5px;"></mt-field>
				<mt-field label="单位名称" v-model="workplace" type="text" :attr="{maxlength:20,minlength:2}"  placeholder="请输入工作单位名称" style="padding-left: 5px;" ></mt-field>
				<div class="ghselect" style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
					<label class="label">岗位工种</label>
					<select class="cselect"  style="margin-left: 0;" v-model="memberobj" >
						<option value="">请选择</option>
						<option v-for="item in memberlist" :value="item.dictCode"  >{{item.dictName}}</option>
						<!--<template v-for="item in firstlist">
							<option :value="item">{{item.unionName}}</option>
						</template>-->
					</select>
				</div>
				<!--<mt-field label="所入工会" placeholder="请选择" type="text" :value="rhUnionName" :readonly="true" @click.native="goto({name:'mine_ghlist',params:{type:'flag'}})" style="padding-left: 5px;"></mt-field>-->
				<div class="" style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
					<label class="label">单位所在区县</label>
					<select class="cselect"  style="margin-left: 0;"  v-model="rhinunion">
						<option :value="unionNone">请选择</option>
						<option v-for="item in unionList" :value="{unionId:item.unionId,unionName:item.unionName}"  >{{item.unionName}}</option>
					</select>
				</div>	

				<p style="margin-left: 10px; color: #f76202;">请填写真实信息</p>
				<div style="padding: 0 20px; ">
					<mt-button size="large" @click.native="subinfoapprove" :disabled="ruhuiflag=='true' || ruhuiflag==true" style="margin: 5% 0;  background: #fd7b27;" type="primary">确认</mt-button><!--:disabled="false"{{ruhuiflag}} -->
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="zh">
				<div class="clearfix" style="background-color: #fff;padding:0 5px;">
					<!--<mt-cell title="转会帮助" is-link value="" @click.native="notice=!notice" style="color: #A9A9A9;">
					</mt-cell>
					<div style="font-size: 12px;" v-show="notice">
						<p>1、淄博境内，以工资收入为主要生活来源的在职职工，均可申请加入工会组织。</p>
						<p>2、已在本单位入会的职工，无需重复申请入会。</p>
						<p>3、未入会职工，所在单位已建立工会组织的，向本单位工会提出入会申请即可。</p>
					</div>-->
				</div>
				<div class="" style="width: 100%; background-color: #fff;background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		    background-size: 120% 1px;
		    background-repeat: no-repeat;overflow: hidden;;">
		    <mt-field label="  姓 名" placeholder="请输入姓名" v-model="zhrealname" :attr="{maxlength:10,minlength:2}" style="padding-left: 5px;background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		    background-size: 120% 1px;
		    background-repeat: no-repeat;overflow: hidden;"></mt-field>
					<div style="background: #fff;   background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat;  line-height: 45px;height: 48px;" >
						<table width="100%">
							<tr>
								<td style="width: 68px;font-size: 15px; padding-left: 13px;">性 别</td>
								<td style="width: 40px;">
									<label class="mint-radiolist-label" slot="title" style=" padding-left: 0;">
						        <span class="mint-radio">
						          <input class="mint-radio-input" type="radio"  name="radio1" v-model="zhsex" :value="1" >
						          <span class="mint-radio-core"></span>
						        </span>
						        <span class="mint-radio-label"  style="color:#A9A9A9;font-size: 14px;">先生</span>
							</label>
								</td>
								<td style="width: 60px;">
									<label class="mint-radiolist-label" slot="title" style="display: inline-block;">
						        <span class="mint-radio">
						          <input class="mint-radio-input" type="radio"  v-model="zhsex"  name="radio1" :value="2">
						          <span class="mint-radio-core"></span>
						        </span>
						        <span class="mint-radio-label"   style="color:#A9A9A9;font-size: 14px;">女士</span>
							</label>
								</td>
							</tr>
						</table>
					</div>
					<mt-field label="身份证号" v-model="zhidnumber" type="text" :attr="{maxlength:18,minlength:15}"  placeholder="请输入身份证号" style="padding-left: 5px; font-size: 15px;"></mt-field>
					<mt-field label="联系方式" v-model="zhtelnumber" type="tel" placeholder="请输入联系方式" :attr="{maxlength:11}" style="padding-left: 5px;"></mt-field>
					<div class="" style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
						<label class="label">岗位工种</label>
						<select  class="cselect" style="margin-left: 0;"   v-model="memberType">
							<option :value="typeNone">请选择</option>
							<option v-for="item in memberlist" :value="item.dictCode">{{item.dictName}}</option>
						</select>
					</div>		
					<!--<div class="ghselect" style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
						<label class="label">岗位工种</label>
						<select class="cselect"  style="margin-left: 0;" v-model="memberobj" >
							<option value="">请选择</option>
							<option v-for="item in memberlist" :value="item.dictCode"  >{{item.dictName}}</option>
						</select>
					</div>-->
					<mt-field label="原所在单位" v-model="zhoutunion" placeholder="请输入原单位名称" style="padding-left: 5px;"></mt-field>
					<div style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
						<label class="label">原单位所属区县</label>
						<select class="cselect" style="margin-left: 0;"   v-model="zhoutcountry">
							<option :value="unionNone">请选择</option>
							<option v-for="item in unionList" :value="{unionId:item.unionId,unionName:item.unionName}"  >{{item.unionName}}</option>
						</select>
				    </div>
					<!--<mt-field label="转入工会" placeholder="请选择" :value="zhUnionName" :readonly="true" @click.native="goto({name:'mine_ghlist',params:{type:true}})" type="text" style="padding-left: 5px; font-size: 15px;"></mt-field>-->
					<!-- <div class="" style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
						<label class="label" style="font-size: 15px; padding: 0;width: 125px; margin-left: 0; display:inline-block;">转入工会</label>
						<select v-model="zhinunion" style=" font-size: 14px; color: #a9a9a9; width: 45%; ">
							<option value="">请选择</option>
							<option v-for="item in unionList" :value="{unionId:item.unionId,unionName:item.unionName}"  >{{item.unionName}}</option>
						</select>
					</div>-->
				    
					<mt-field label="现所在单位" v-model="workplacezh" type="text" :attr="{maxlength:20,minlength:2}" placeholder="请输入工作单位名称" style="padding-left: 5px; font-size: 15px; z-index: 1000;"></mt-field>
					<div class="" style="width: 100%; background-color: #fff; padding-left: 15px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%); background-size: 120% 1px; background-origin: content-box; background-repeat: no-repeat; height: 48px; line-height: 48px;">
						<label class="label">现单位所属区县</label>
						<select  class="cselect" style="margin-left: 0;"  v-model="zhincountry">
							<option :value="unionNone">请选择</option>
							<option v-for="item in unionList" :value="{unionId:item.unionId,unionName:item.unionName}"  >{{item.unionName}}</option>
						</select>
					</div>			
				</div>
				<p style="margin-left: 10px; color: #f76202;">请填写真实信息</p>
				<div style="margin-bottom:50px;padding: 0 20px; ">
					<mt-button size="large" style="margin-top: 10%; background: #fd7b27;"  :disabled="zhuanhuiflag=='false' || zhuanhuiflag==false"  @click="subzhuanhuiapprove" type="primary">确认</mt-button>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>

	</div>
</template>

<script>
	export default {
		name: 'join',
		data() {
			return {
				selectedtab:sessionStorage.selectedtab||'qy',
				notice1: false,
				notice: false,

				sessionobj: '',
				realname:sessionStorage.realname||'',
				sex: sessionStorage.sex||'0',
				idnumber: sessionStorage.idnumber||'',
				telnumber: sessionStorage.telnumber||'',
//				area:sessionStorage.area||'',
				workplace:sessionStorage.workplace||'',
//				workname:sessionStorage.workname||'',
				memberobj:sessionStorage.memberobj||'',
				memberType:sessionStorage.memberType||'',
				memberlist:'',
				ruhuiflag:false,
				zhuanhuiflag:localStorage.canTransfer||'',
				workplacezh:sessionStorage.workplacezh||'',
				
				orgName:'',  //单位名称
				unionId:'', //工会ID
				unionName:'', //工会名称
				
				ruUnionName:'',//入会选中的工会
				zhUnionName:'',//转会选中的工会
				
				rhinunion:{unionId:'',unionName:''},//入会：现单位所在区县
                specialList:[],//权益资讯
                unionList:[],//工会集合
                
                //转会信息
                zhrealname:'',//姓名
				zhsex: '0',//性别
				zhidnumber:'',//身份证号
				zhtelnumber: '',//联系方式
				zhoutunion:'',//转出工会
				typeNone:'',
				unionNone:{unionId:'',unionName:''},
				zhoutcountry:{unionId:'',unionName:''},//原单位所在区县
				zhinunion:{unionId:'',unionName:''},//转入工会
				zhincountry:{unionId:'',unionName:''},//现单位所属区县
				
                
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
			if(!localStorage.userId){
				this.tologin("")
				return 
			}
			this.getgwgzlist()
			this.getapply()
			
			
			if(sessionStorage.addressobj){
				this.sessionobj=JSON.parse(sessionStorage.addressobj)
				this.rhUnionName=this.selectedtab==='rh'?this.sessionobj.unionName:'';
				this.zhUnionName=this.selectedtab==='zh'?this.sessionobj.unionName:'';
			}
			if(!sessionStorage.addressobj){
				var self = this;
				setTimeout(function(){
				self.ajax({
					url: '/unionTransfer/getTransferRecords',
					data: {
						userId : localStorage.userId,
					},
					type: 'get',
				}, (data) => {
					if(data.result) {
						self.zhrealname= data.obj.memberName;//姓名
						self.zhsex=data.obj.memberSex;//性别
						self.zhidnumber=data.obj.memberProCno;//身份证号
						self.zhtelnumber=data.obj.userPhone;//联系方式
						self.zhoutunion=data.obj.unionName;//转出工会
						if(data.obj.memberType!=null){
							self.memberType = data.obj.memberType;//岗位工种
						}
						if(data.obj.oldUnionId!=null){
							self.zhoutcountry.unionId=data.obj.oldUnionId;//原单位所在区县id
						}
						if(data.obj.oldUnionName!=null){
							self.zhoutcountry.unionName=data.obj.oldUnionName;//原单位所在区县名称
						}
					} else {

					}
				})
			},1000)
			}
			this.getNewsList()//权益新闻列表
			this.getunionList();//五区三县工会集合
		},
		mounted() {
			//给安卓和ios分别加不同样式
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS){
				var allSelect = document.getElementsByTagName('select')
				for(var i=0;i<allSelect.length;i++){
					allSelect[i].style.marginLeft='5px'
				}
			}else{
				var allSelect = document.getElementsByTagName('select')
				for(var i=0;i<allSelect.length;i++){
					allSelect[i].style.marginLeft='-4px'
				}
			}
		},
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
		     if( to.name=='mine_ghlist'){
		    	
		    }else{
		   			sessionStorage.removeItem("addressobj")
					sessionStorage.removeItem("realname")
					sessionStorage.removeItem("sex") 
					sessionStorage.removeItem("idnumber")
					sessionStorage.removeItem("telnumber")
					sessionStorage.removeItem("memberobj")
					sessionStorage.removeItem("memberType")
		//			sessionStorage.removeItem("area")
					sessionStorage.removeItem("workplace") 
					sessionStorage.removeItem("workplacezh") 
		//			sessionStorage.removeItem("workname")
					sessionStorage.removeItem("selectedtab") 
		
					
		    }
   			next()
		},
		methods: {
			jumpto(obj){
				this.$router.push({name:'details',params:{detailId:obj.detailId,title:obj.detailTitle}})
			},
			getapply(){//查看状态
				
				if(localStorage.userId) {
					var self = this;
					this.ajax({
						url: '/unionTransfer/isFormalOrNo',
						data: {
							userId: localStorage.userId
						},
						type: 'get'
					}, (data) => {
						if(data.result) {
							localStorage.isFormal = data.obj.in.isFormal
							localStorage.canTransfer = data.obj.transfer.canTransfer
							if(localStorage.isFormal == true || localStorage.isFormal == 'true'){
								self.ruhuiflag = true
								localStorage.isFormaldes = data.obj.in.description
							}
							if(localStorage.canTransfer==false|| localStorage.canTransfer=='false'){
								self.zhuanhuiflag = false
								localStorage.transferdes = data.obj.transfer.description
							}else{
								self.zhuanhuiflag = true
							}
						}
					})
				}
			},
			getNewsList(){
				var self=this
				this.ajax({
					url: '/sysInfoClass/classList',
					data: {
						smId: this.$route.params.id,
						unionId: this.$route.params.unionId
					},
					type:"get"
				}, function(data) {
					if(data.result) {
						if(data.obj.length>0){							
							var classId=data.obj[0].sicId
							self.getspecialList(classId,0)
						}
					}
				})
			},
			getspecialList(sicId,sum){
				var self=this;
				this.ajax({url:'/sysInfoDetail/detailList',data:{sicId:sicId,start:sum}},function(data){
					if(data.result){
						self.specialList=data.obj
					}
				})
			},
			getunionList(){
				var self=this;
				this.ajax({
					url: '/unionBase/reginList',
				}, (data) => {
					if(data.result) {
						//console.log(JSON.stringify(data.obj))
						self.unionList = data.obj
					}
				})
			},
			getUnionNameById(unionId){
				var length=this.unionList.length;
				for(var i=0;i<length;i++){
					if(this.unionList[i].unionId==unionId){
						return this.unionList[i].unionName;
					}
				}
			},
			tishizhuanhui(){
				//this.getapply();
				if(this.zhuanhuiflag=='false'||this.zhuanhuiflag==false){
					this.$toast({
						message: localStorage.transferdes||"您还不是正式会员，不能转会!",
						position: 'bottom',
					});
				}else{
					//非正式会员  可以入会
				}
			},
			tishiruhui(){
				//this.getapply();
				if(this.ruhuiflag=='true'|| this.ruhuiflag==true){
					this.$toast({
						message: localStorage.isFormaldes||"您已经是正式会员不用再入会了!",
						position: 'bottom',
					});
				}else{
					//非正式会员  可以入会
				}
			},
			getgwgzlist(){
				this.ajax({
					url: '/dictionaries/getDictsByType',
					data: {
						dictType: 'memberType',
					},
					type: 'get'
				}, (data) => {
					if(data.result) {
						this.memberlist=data.obj
					} else {
						this.$toast({
							message: data.description,
							position: 'bottom',
						});

					}
				})
			},
			subzhuanhuiapprove() {				
				if(!localStorage.userId){
					this.tologin("")
					return;
				}
				var workPlace=this.filterContent(this.workplacezh);
				if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.zhrealname)) {
					this.$toast({
					  message: '请输入真实姓名，2-10个汉字',
					  position: 'bottom',
					});
					return;
				}
				if (!/^\d{15}(\d{2}[0-9xX])?$/.test(this.zhidnumber)) {
					this.$toast({
					  message: '请输入正确的身份证号码',
					  position: 'bottom',
					});
					return;
				}
				if (!/^1[34578]\d{9}$/.test(this.zhtelnumber)) {
					this.$toast({
					  message: '请输入正确的联系方式',
					  position: 'bottom',
					});
					return;
				}
				if (!this.memberType || this.memberType=='') {
					this.$toast({
					  message: '请选择岗位工种',
					  position: 'bottom',
					});
					return;
				}
				if (this.zhoutunion=='') {
					this.$toast({
					  message: '请填写转出工会',
					  position: 'bottom',
					});
					return;
				}
				if (this.zhoutcountry.unionId=='') {
					this.$toast({
					  message: '请选择原单位所属区县',
					  position: 'bottom',
					});
					return;
				}
				/*if (this.zhinunion.unionId=='') {
					this.$toast({
					  message: '请选择转入工会',
					  position: 'bottom',
					});
					return;
				}*/
				if (this.zhincountry.unionId=='') {
					this.$toast({
					  message: '请选择现单位所属区县',
					  position: 'bottom',
					});
					return;
				}
				if (workPlace=='') {
					this.$toast({
					  message: '请输入单位名称',
					  position: 'bottom',
					});
					return;
				}
				if (this.workplacezh.length>20) {
					this.$toast({
					  message: '单位名称长度为二十个字符以内',
					  position: 'bottom',
					});
					return;
				}
				 
				var self = this;
				this.ajax({
					url: '/unionTransfer/addTransferApplyInfo',
					data: {
						/*targetUnionName:this.workplacezh,
						workType:self.memberType,
						streetUnionId: this.sessionobj.unionId,
						userId:localStorage.userId,*/
						applyName:self.zhrealname,//姓名
						applySex:self.zhsex,//性别
						applyCardno:self.zhidnumber,//身份证号
						applyTel:self.zhtelnumber,//联系方式
						workType:self.memberType,
						outUnionName:self.zhoutunion,//转出工会
						unionId:self.zhoutcountry.unionId,//原单位所在区县
						transferUnionId:self.zhincountry.unionId,//现单位所属区县
						targetUnionName:this.workplacezh,	
						
					},
					type: 'post'
				}, (data) => {
					self.$toast({
							message: data.description,
							position: 'bottom',
						});
					
					if(data.result) {
						localStorage.canTransfer=true
						self.goto({name:'mine_approve'})
						
					} else {

					}
				})
			},
			subinfoapprove() {
				var workPlace=this.filterContent(this.workplace);
				if(!localStorage.userId){
					this.tologin("")
					return;
				}
				if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.realname)) {
					this.$toast({
					  message: '请输入真实姓名，2-10个汉字',
					  position: 'bottom',
					});
					return;
				}
				if (!/^\d{15}(\d{2}[0-9xX])?$/.test(this.idnumber)) {
					this.$toast({
					  message: '请输入正确的身份证号码',
					  position: 'bottom',
					});
					return;
				}
				if (!/^1[34578]\d{9}$/.test(this.telnumber)) {
					this.$toast({
					  message: '请输入正确的电话号码',
					  position: 'bottom',
					});
					return;
				}
				if (workPlace=='') {
					this.$toast({
					  message: '请输入单位名称',
					  position: 'bottom',
					});
					return;
				}
				if (this.workplace.length>20) {
					this.$toast({
					  message: '单位名称长度为二十个字符以内',
					  position: 'bottom',
					});
					return;
				}
				if (!this.memberobj || this.memberobj=='') {
					this.$toast({
					  message: '请选择岗位工种',
					  position: 'bottom',
					});
					return;
				}
				if (this.rhinunion.unionId=='') {
					this.$toast({
					  message: '请选择单位所属区县',
					  position: 'bottom',
					});
					return;
				}
				
				var self = this;
				var data={
						applyName: this.realname,
						applyCardno: this.idnumber,
						applyTel: this.telnumber,
						unionId: this.rhinunion.unionId,
						unionName:this.rhinunion.unionName,
						applyOrgName:workPlace,
						userName:localStorage.userName || '',
						userId:localStorage.userId||'',
						workType:this.memberobj
					}
				//console.log(JSON.stringify(data))
				
				this.ajax({
					url: '/unionApplyInfo/applyinMenber',
					data: {
						applyName: this.realname,
						applySex: this.sex,
						applyCardno: this.idnumber,
						applyTel: this.telnumber,
						unionId: this.rhinunion.unionId,
						applyOrgName:workPlace,
						userName:localStorage.userName ||'',
						userId:localStorage.userId||'',
						workType:this.memberobj,
						description:'',//this.area
						//streetUnionId:this.sessionobj.unionId
					},
					type: 'post'
				}, (data) => {
					
//					sessionStorage.removeItem("addressobj")
//					sessionStorage.removeItem("realname")
//					sessionStorage.removeItem("sex") 
//					sessionStorage.removeItem("idnumber")
//					sessionStorage.removeItem("telnumber")
//					sessionStorage.removeItem("memberobj")
//						
////						sessionStorage.removeItem("area")
//					sessionStorage.removeItem("workplace") 
//					sessionStorage.removeItem("workplacezh") 
////						sessionStorage.removeItem("workname")
					self.$toast({
						message: data.description,
						position: 'bottom',
					});
					if(data.result) {
						
						localStorage.isFormal=false
						self.goto({name:'mine_approve'})
					} else {

					}
				})
			},
			goto(page) {
				if(page.name=="mine_ghlist"){
					sessionStorage.realname=this.realname
					sessionStorage.sex=this.sex
					sessionStorage.idnumber=this.idnumber
					sessionStorage.telnumber=this.telnumber
					sessionStorage.memberobj= this.memberobj
					sessionStorage.memberType=this.memberType
//					sessionStorage.area=this.area
					sessionStorage.selectedtab=this.selectedtab
					sessionStorage.workplace=this.workplace
					sessionStorage.workplacezh=this.workplacezh
//					sessionStorage.workname=this.workname
				}
				document.activeElement.blur(); 			
					this.$router.push(page);
			},
//			getLabourUnion(unionId, callback) {
//				var self = this;
//				this.ajax({
//					url: '/unionBase/list',
//					data: {
//						unionId: unionId
//					}
//				}, function(data) {
//					 
//						//					if(data.result){
//						//					}else{
//						////						self.$toast(data.description)
//						//					}
//					callback && callback(data.obj)
//				})
//			},
		},
	};
</script>
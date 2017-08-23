<style type="text/css" scoped="scoped">
	.clearfix:after {
		content: "\200B";
		display: block;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	label {
		width: 20%;
		display: inline-block;
		margin-left: 10px;
	}
	
	select {
		margin-top: 1px;
		height: 38px;
		width: 75%;
		display: inline-block;
		border: none;
		background-color: #fff;
	}
	
	.mint-checklist-label {
		display: block;
	}
	
	.mint-check-input {
		display: none;
	}
	
	.mint-check-input:checked+ .mint-check-core {
		background-color: #fd7b27;
		border-color: #FFFFFF;
	}
	
	.mint-check-input:checked+ .mint-check-core::after {
		background-color: #fff;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	
	.mint-check-input[disabled]+ .mint-check-core {
		background-color: #d9d9d9;
		border-color: #ccc;
	}
	
	.mint-check-core {
		display: inline-block;
		background-color: #fff;
		border-radius: 100%;
		border: 1px solid #666666;
		position: relative;
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	
	.mint-check-core::after {
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
	
	.mui-table-view-cell {
		position: relative;
		overflow: hidden;
		padding: 11px 15px;
		-webkit-touch-callout: none;
	}
	
	.mui-table-view {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style: none;
		background-color: #fff;
	}
	
	.aas {
		width: 100%;
		background-color: #fff;
		background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		background-size: 120% 1px;
		background-repeat: no-repeat;
		background-origin: content-box;
		display: flex;
		overflow: hidden;
		padding: 0 10px;
		line-height: 48px;
	}
	
	.line_b{
		background-repeat: no-repeat;
		background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		background-size: 120% 1px;
		background-position: top left;
		background-origin: content-box;
		padding: 0 10px;
		align-items: center;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		overflow: hidden;
		width: 100%;
		background-color: #fff;
	}
	.workersaym .cselect {
		padding-left:8px;
	    appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    background: url("./imgs/arrowmine.png") no-repeat scroll right center transparent;
	}
</style>
<template>
	<div class="workersaym">

		<!--
    	描述：内容
    -->

		<mt-tab-container-item>
			<mt-field label="主题：" placeholder="请输入主题" v-model="say.title"></mt-field>
			<!--<mt-field label="发往：" v-show="!fatie" placeholder="请选择工会" :value='addressobj.unionName' readonly @click.native="jumpto({name:'mine_ghlist',params:{type:true}})"></mt-field>-->
			<div class="aas" v-show="!fatie">
				<label style="margin-left: 0;width: 100px;">分类：</label>
				<select class="cselect" v-model='say.questionType' style=" padding-left:12px;font-size: 16px; color: #a9a9a9; margin-top: 5px;width: 40%;">
					<option value="" :selected="say.questionType==''?'selected':''">请选择</option>
					<option :value="obj.dictCode" v-for="obj in questionTypeArr" :selected="say.questionType==obj.dictId?'selected':''">{{obj.dictName}}</option>
				</select>
			</div>
			<!--<mt-field  label="涉及单位：" v-model='say.relatedPlace' v-show="!fatie"></mt-field>-->
				<div class="line_b">
					&nbsp;
				</div>
			<textarea  placeholder="请输入内容" type="textarea" v-model='say.sqContext' maxlength="500" style="width: 100%;height: 150px;border: none;font-size: 16px;padding:1px 8px 8px; word-wrap:break-word;"></textarea>
 
		</mt-tab-container-item>
		<ul class="mui-table-view" v-if='fatie'>
			<li class="mui-table-view-cell">
				<p>上传照片（多最可选择3张）</p>
				<p>
					<span  v-if="piclist.length!=0">
						<div  v-for="pic in piclist" style="position: relative; margin-right: 20px; display: inline-block;">
							<img    :src='pic' style=" width: 60px;height:60px;display: inline-block ;" />
							<mt-badge  size="small" style=" position: absolute;right: -7px;top: -7px; font-size: 15px;padding: 0px 5px;color: black;background: #C7C7CC;" class="" @click.native='del(pic)'>x</mt-badge>
						</div>
					</span>
					<img src="./imgs/imgadd.png" style=" width: 60px;height:60px; display: inline-block" @click="photograph()"  v-show="this.piclist.length<=2" />
				</p>
			</li>
		</ul>
		<div style="background: #fff;padding: 5px; ">
			<table width="100%">
				<tr>
					<td style="width: 90px;">
						<div style="display: flex;">
							<label class="mint-checklist-label" slot="title" style="height: 30px; line-height: 28px; min-width: 80px;;display: inline; margin-left: 0; padding-left: 0;">
							        <span class="mint-check">
							          <input class="mint-check-input" type="checkbox"  name="check"   v-model="say.isAnonymous" >
							          <span class="mint-check-core"></span>
							        </span>
							        <span class="mint-check-label" style="margin :2px 10px;">匿名</span>	
								</label>
								<span @click="jumpto({name:'explain'})" style="height: 30px; line-height: 28px;">								
									<img src="./imgs/smicon.png"  width="24px" height="24" style="margin-top: 3px;"/> 
									
								</span>
							    <span style="height: 30px; line-height: 28px; margin-left: 10px;">版块说明</span>
						</div>
					</td>

				</tr>
			</table>
		</div>
		<div style="margin-bottom:50px; padding: 0 20px;">
			<mt-button size="large" @click.native="send" style="margin-top: 10%; background: #fd7b27;" type="primary">提交</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'worksay_main',
		data() {
			return {
				selected: '',
				addressobj: '',
				say: {
					userId: localStorage.userId,
					title: '',
					sqContext: '',
					qasmId: this.$route.params.qasmId,
					applyUnionId: '',
					questionType: '',
					relatedPlace: '',
					isAnonymous: false,
				},
				piclist: [],
				questionTypeArr: [],
				fatie: '',
				classId: this.$route.params.sicId
			}

		},
		beforeRouteEnter (to, from, next) {
		    if(!localStorage.userId){
	             next({name: 'login',title:'登录'})
	    		return 
	    	}
		    next();
		},
		created() {
			this.pageinit();
			this.fatie=this.$route.name == 'fatie' ? true : false
		},
		watch: {
			'$route'() {
				if(this.$route.name == 'worksay_main') {
					this.pageinit();
				}
				this.fatie=this.$route.name == 'fatie' ? true : false
			}
		},
		methods: {
			del(obj){
				if(obj){
					this.piclist.$remove(obj);
				}
			},
			pageinit() {
				if(sessionStorage.addressobj) {
					this.addressobj = JSON.parse(sessionStorage.addressobj)
				}
				if(sessionStorage.say) {
					this.say = JSON.parse(sessionStorage.say)
				}

				let self = this;
				if(!this.fatie) {
					this.ajax({
						url: '/dictionaries/getDictsByType',
						data: {
							dictType: 'questionType'
						}
					}, function(data) {
						if(data.result) {
							self.questionTypeArr = data.obj
						}
					})
				}
			},
			jumpto(web) {
				sessionStorage.say = JSON.stringify(this.say)
				this.$router.push(web)
			},
			send() {
				
				this.say.applyUnionId = this.addressobj.unionId || ''; ""
				//var contentStr= this.say.sqContext.replace(/<[\/\!]*?[^<>]*?>/gi, "");
				
				//上传之前过滤掉html标签和emoji表情
				var contentStr=this.filterContent(this.say.sqContext);
				var titleStr=this.filterContent(this.say.title);
				console.log(titleStr);
				console.log(contentStr);
				
				if(titleStr == '') {
					this.$toast('请输入标题')
					return
				} else if(/^.{100,}$/.test(this.say.title)) {
					this.$toast('标题长度不能超过100')
					return
				}
//				else if(this.say.applyUnionId == '' && !this.fatie) {
//					this.$toast('请选择工会')
//					return
//				} 
				else if(this.say.questionType == '' && !this.fatie) {
					this.$toast('请选择分类')
					return
				} else if(contentStr == '') {
					this.$toast('请输入内容')
					return
				}else if(/^[\s\S]{500,}$/.test(this.say.sqContext)) {
					this.$toast('内容长度不能超过500')
					return
				}
				
				
				var self = this;
				if(this.fatie) {
					let obj = {
						contentTitle: titleStr,
						contentText: contentStr,
						classId: this.classId,
						isAnonymous: this.say.isAnonymous,
						userId: localStorage.userId
					}
					if(this.piclist.length == 0) {
						this.ajax({
								url: '/bbsContent/add',
								data: obj,
								type: 'post'
							},
							function(data) {
								if(data.result) {
									self.say.title='';
									self.say.sqContext='';
									self.say.isAnonymous=false;
									self.$router.back()
								}
								self.$toast(data.description)
							})
					} else {
						this.upload(obj)
					}

				} else {
					this.ajax({
						url: '/sysQuestion/addSpcial',
						data: this.say,
						type:'post'
					}, function(data) {
						if(data.result) {
							self.say.title='';
							self.say.sqContext='';
							self.say.isAnonymous=false;
							self.$router.back()
						}
						self.$toast(data.description)
					})
				}
			},
			photograph: function() {
				if(!window.plus) {
					this.$toast("暂时不支持非手机客户端上传图片")
					return
				}

				if(this.piclist.length >= 3) {
					this.$toast('最多可选择3张照片')
					return;
				}
				var self = this;
				var bts = [{
					title: "拍照"
				}, {
					title: "从相册选取"
				}];
				plus.nativeUI.actionSheet({
						title: "选择照片",
						cancel: "取消",
						buttons: bts
					},
					function(e) {
						console.log(JSON.stringify(e))
						if(e.index == 1) {//判断选的是哪个按钮
							self.paizhao(function(path) {
								self.piclist.push(path);
							})
						} else if(e.index == 2) {
							var count = 3- self.piclist.length;
							self.album({
								filter: "image",
								multiple: true,
								maximum: count,
								system: false,
							}, function(e) {
								console.log(JSON.stringify(e.files))
								if(self.piclist.length > 0) {
									self.piclist = self.piclist.concat(e.files);
								} else {
									self.piclist = e.files;
								}
							})
						} else {
							return;
						}
					}
				);
			},
			paizhao(callback) {
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					var path = plus.io.convertLocalFileSystemURL(p);
					callback && callback(path);
				}, function(e) {}, {
					filename: '_doc/camera/'
				});
			},
			album(optin, callback) {
				plus.gallery.pick(function(path) {
					callback && callback(path)
				}, function(e) {
					console.log("取消选择图片");
				}, optin);
			},
			upload(obj) {
				let self = this;
				var w = plus.nativeUI.showWaiting('上传中...')
				var task = plus.uploader.createUpload(this.mui.root + '/bbsContent/add', {
						method: "post",
						blocksize: 204800,
						priority: 100
					},
					function(t, status) {
						// 上传完成
						if(status == 200) {
							w && w.close();
							var data = JSON.parse(t.responseText);
							if(data.result) {
								self.$toast(data.description);
									self.say.title='';
									self.say.sqContext='';
									self.say.isAnonymous=false;
									self.piclist=[];
									self.$router.back()
							} else {
								self.$toast(data.description)
							}
							console.error(status + "==" + JSON.stringify(t));
						} else {
							console.error(status + "==" + JSON.stringify(t));
							w && w.close();
						}
					},
					function(e) {
						w && w.close();
						self.$toast('操作失败')
						console.error(JSON.stringify(e))
					});
//					for(let k in obj) {
//						console.log(k+"==="+obj[k])
//						task.addData(k, obj[k]);
//					}
					task.addData('obj',JSON.stringify(obj))
					for(var i = 0; i < this.piclist.length; i++) {
						if(this.piclist[i].indexOf('http') != 0) {
							task.addFile(this.piclist[i], {
								key: ('Img' + i)
							});
						}
					}
				task.start();
			}
		},

	};
</script>
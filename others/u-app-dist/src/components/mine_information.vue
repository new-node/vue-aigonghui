<template>
	<div >
		<mt-cell title="头 像" @click.native="sheetVisible=true" is-link>
			<img :src="locationphoto"  @error="$event.target.src=errorpng"  style=" float:right ;border-radius: 50%;" width="36" height="36" />
		</mt-cell>
		<mt-cell title="用户名" @click.native="goto({name:'mine_subname'})" is-link>
			<span style="color: rgb(143, 143, 143);font-size: 14px;">{{nickname}}</span>
		</mt-cell>
		<!--<mt-cell title="生日" @click.native="birthday()" is-link>
			<span style="color: rgb(143, 143, 143);font-size: 14px;">{{pickertime}}</span>
		</mt-cell>-->
		<mt-cell title="性 别" @click.native="goto({name:'mine_sex'})" is-link>
			<span style="color: rgb(143, 143, 143);font-size: 14px;">{{usersex}}</span>
		</mt-cell>
		<!--<mt-cell title="认证" @click.native="goto({name:'mine_info_member'})" is-link>
			<span style="color: rgb(143, 143, 143);font-size: 14px;">普通会员</span>
		</mt-cell>-->
		<mt-cell title="收货地址" @click.native="goto({name:'mine_address'})" is-link>
			<span style="color: rgb(143, 143, 143);font-size: 14px;">修改/添加</span>
		</mt-cell>
		
		<!--  <mt-datetime-picker
		    ref="picker"
		    type="date"
		    v-model="pickerValue"
		    @confirm="confirm">
		  </mt-datetime-picker>-->
		
			<mt-actionsheet
			  :actions="actions"
			  v-model="sheetVisible">
			</mt-actionsheet>
	</div>
</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		data() {
			
				return {
					errorpng: defaulthead,
					
					pickerValue:'',
					pickertime:'',//请求获取生日
					sheetVisible:false,
					actions:[],
					
					username:localStorage.userName,
					locationphoto:localStorage.headurl||defaulthead,//请求获取头像
					usersex:localStorage.userSex||'',
					nickname:localStorage.nickName
				}
			},
			mounted() {
				let self = this;
				this.actions=[
					{
						method:this.camera,
						name:'拍照'
					},
					{
						method:this.gallery,
						name:'相册中选取'
					}
					]
//				this.geturl()
			},
			computed: {
				
			 },
			methods: {
				geturl(){
				this.ajax({
					url: '/sysUserInfo/detail',
					data: {
						userId: localStorage.userId,
					},
					type: 'post'
				}, (data) => {
					if(data.result) {
						this.locationphoto=data.obj.photoUrl
						localStorage.headurl=data.obj.photoUrl
					} else {
						this.$toast({
							message: data.description,
							position: 'bottom',
						});

					}
				})
			},
				goto(page) {
					this.$router.push(page);
				},
				birthday(){
					this.$refs.picker.open();
				},
				confirm(e){
					this.pickertime=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()
				},
				gallery(){
					console.log("从相册中选择")
						let self=this;
						plus.gallery.pick(function(path) {
							self.locationphoto=path;
							self.uploadfile();
						}, function(e) {
						}, {
							filter: "image"
						});
						},
				camera(){
					let self=this;
					var cmr = plus.camera.getCamera();
					var res = cmr.supportedImageResolutions[0];
					var fmt = cmr.supportedImageFormats[0];
					cmr.captureImage(function(p) {
							var path = plus.io.convertLocalFileSystemURL(p)
							self.locationphoto=path;
							self.uploadfile();
						},
						function(error) {
						}, {
							resolution: res,
							format: fmt
						}
					);
						
				},
				uploadfile:function(){
					let self = this 
					let url='/sysUserInfo/update';
				var w = plus.nativeUI.showWaiting('上传中...')
				console.log(this.mui.root+'/sysUserInfo/update')
				var task = plus.uploader.createUpload(this.mui.root+'/sysUserInfo/update', {
						method: "post",
						blocksize: 204800,
						priority: 100
					},
					function(t, status) {
						// 上传完成
						if(status == 200) {
							console.log(status+"data.result")
							w && w.close();
							var data = JSON.parse(t.responseText);
							if(data.result) {
								console.log(JSON.stringify(data)+"==data")
								console.log(data.obj+"==data.obj")
								localStorage.headurl=data.obj+"?v="+Math.random()*Math.random()
							} else {
								self.log(data.description+"data.description")
//								util.log(data.description);
							}
						} else {
							self.log(status+"===status")
							w && w.close();
						}
					},
					function(e) {
						self.log(JSON.stringify(e))
						w && w.close();
//						alert("操作失败")
//						mui.toast('操作失败')
//						util.error(JSON.stringify(e))
					});
//					alert(localStorage.userId +" photoUrlFile:"+self.locationphoto)
					task.addFile(self.locationphoto,{key:'photoUrlFile'});
					task.addData("userId",localStorage.userId);
					task.addData("clientId",plus.push.getClientInfo().clientid);
					task.start();
			}
			},
			components: {

			}
	}
	
</script>


<style>
/* 
 * mine_information_deliveryaddress_updata  mine_address_updata.vue
 * mine_setting_universal_accountsecurity  mine_security.vue
 * mine_information_change_username.vue  mine_subname.vue
 * mine_information_deliveryaddress   mine_address.vue
 * mine_setting_resetpassword.vue  mine_resetpassword.vue
 * mine_setting_bindphone.vue  mine_bindphone.vue
 * */
</style>
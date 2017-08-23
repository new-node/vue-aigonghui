<template>
	<div>
		<div style=" width:100%;  ">
			<mt-field label="姓 名" placeholder="请输入姓名" type="text" v-model='contractUser' :attr="{maxlength:10,minlength:2}"></mt-field>
			<mt-field label="电 话" placeholder="请输入电话号码" type="tel" v-model='tel' :attr="{maxlength:11}"></mt-field>
			<mt-field label="所在省市" style='margin-top: 10px;position: relative;' :value="scx" placeholder="请选择所在省市" readonly disableClear @click.native="getssx">
				<div style="width: 12px;height: 21px;position: absolute;right: 11px;top: -10px;"><img src="./imgs/pulldown.png" style="width: 100%;height: 100%;" /> </div>
			</mt-field>
			<mt-popup v-model="popupVisible" position="bottom" style='width: 100%;' :closeOnClickModal="false">
				<mt-picker :slots="slots" valueKey='name' ref="picker" @change="onValuesChange" v-show='popupVisible' showToolbar name="请选择居住地">
					<div style="margin-top: 8px;">
						<mt-button type="default" size="small" style="float: left;" @click.native="setaddr(false)">取消</mt-button>
						<mt-button type="primary" size="small" style="float: right;" @click.native="setaddr(true)">确定</mt-button>
					</div>
				</mt-picker>
			</mt-popup>
			<mt-field label="详细地址" placeholder="请输入收货地址" type="text" v-model='detailAdress' :attr="{maxlength:30,minlength:2}"></mt-field>
			<mt-field label="邮政编码" placeholder="六位邮政编码" type="tel" v-model="zipCode" :attr="{minlength:2,maxlength:6}"></mt-field>

			<div class="mint-cell-title" style="margin-top: 5px;background:white;padding: 8px;">
				<!---->
				<label class="mint-radiolist-label">
					<span class="mint-radio">
						<input type="checkbox" class="mint-radio-input"  v-model='isDefault'>
						<span class="mint-radio-core"></span>
					</span>
					<span class="mint-radio-label">设为默认 </span>
				</label>
			</div>
		</div>
		<div style="margin-top: 20%; width: 80%;">
			<mt-button size="large" @click.native="submit()" style="width:100%;display: inline-block;margin-top: 10%; background: #fd7b27;" type="primary">{{btnname}}</mt-button>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
				return {
					contractUser: '',
					tel: '',
					detailAdress: '',
					zipCode: '',
					btnname: "",
					popupVisible: false,
					province: '',
					city: '',
					area: '',
					scx: '',
					isDefault: false,
					adressId: null,
					slots: [{
						flex: 1,
						values: [],
						className: 'slot1',
						textAlign: 'center'
					}, {
						flex: 1,
						values: [],
						className: 'slot2',
						textAlign: 'center'
					}, {
						flex: 1,
						values: [],
						className: 'slot3',
						textAlign: 'center'
					}],
					temppro:'',
					tempcity:'',
					temparea:'',
				}
			},
			watch: {
				'province' () {
					if(this.province) {
						this.getdata(this.province.id, data => this.slots[1].values = data.obj)
					}
				},
				'city' () {
					if(this.city) {
						this.getdata(this.city.id, data => this.slots[2].values = data.obj)
					}

				},
			},
			mounted() {
				if(this.$route.params.addressObj) {
					var obj = this.$route.params.addressObj
					this.contractUser = obj.contractUser
					this.tel = obj.tel
					this.detailAdress = obj.detailAdress
					this.zipCode = obj.zipCode
					this.isDefault = obj.isDefault
					this.scx = obj.provinceName + ' ' + obj.cityName + ' ' + obj.areaName
					this.adressId = obj.adressId
					this.btnname = "修改";

					this.temppro=obj.provinceName
					this.tempcity=obj.cityName
					this.temparea= obj.areaName

				} else {
					this.btnname = "添加";
				}
			},
			methods: {
				getdata(pid, callback) {
					this.ajax({
						url: '/chinaArea/getByPidAndLevel',
						data: {
							pid: pid
						},
						type: 'post'
					}, function(data) {
						if(data.result) {
							callback && callback(data)
						}
					})
				},
				submit() {
					if(this.contractUser == '') {
						this.$toast('姓名不能为空')
						return
					}else if(!/^[A-Za-z0-9\u4E00-\u9FA5_]{2,15}$/.test(this.contractUser)) {
						this.$toast('姓名要2到15位常规字符之间')
						return
					}else if(!/^0?1[3|4|5|8][0-9]\d{8}$/.test(this.tel)) {
						this.$toast('您输入的手机号不正确')
						return
					} else if(this.scx == '') {
						this.$toast('所在省市不能为空')
						return
					} else if(this.detailAdress == '') {
						this.$toast('详细地址不能为空')
						return
					} else if(!/^[a-zA-Z0-9_\u4e00-\u9fa5\" "]{2,30}$/.test(this.detailAdress)) {
						this.$toast('您的地址无效')
						return
					}else if(!/^[0-9][0-9]{5}$/.test(this.zipCode)){
						this.$toast('邮编输入有误')
						return
					}
					let url = '/sysUserAdress/add'
					if(this.btnname == "修改") {
						url = '/sysUserAdress/update'
					}
					let obj = {
						userid: localStorage.userId,
						contractUser: this.contractUser,
						tel: this.tel,
						zipCode: this.zipCode,
						provinceName: this.province.name||this.temppro,
						cityName: this.city.name||this.tempcity,
						areaName: this.area.name||this.temparea,
						detailAdress: this.detailAdress,
						isDefault: this.isDefault,
					}
					if(this.adressId != null) {
						obj.adressId = this.adressId
					}
					if(obj.isDefault) {
						localStorage.defaultaddress = JSON.stringify(obj)
					}
					this.ajax({
						url: url,
						data: obj,
						type: 'post'
					}, (data) => {
						this.$toast({
							message: data.description,
							position: 'bottom',
						});
						if(data.result) {
							history.back()
						}
					})

				},
				onValuesChange(picker, values) {
					this.province = values[0];
					this.city = values[1];
					this.area = values[2];
				},
				getssx() {
					this.popupVisible = true;
					/*console.log(this.slots[0].values)*/
					if(this.slots[0].values.length == 0) {
						this.ajax({
							url: '/chinaArea/getByPidAndLevel',
							data: {
								level: '2'
							},
							type: 'post'
						}, data => this.slots[0].values = data.obj)
					}
				},
				setaddr(type) {
					this.popupVisible = false;
					if(type) {
						this.scx = this.province.name + ' ' + this.city.name + ' ' + this.area.name
					}

				},
			},

	}
</script>

<style>

</style>

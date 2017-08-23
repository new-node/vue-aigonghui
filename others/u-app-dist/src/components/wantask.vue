<style type="text/css">
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
		border: 1px solid #ccc;
		position: relative;
		width: 20px;
		height: 20px;
		vertical-align: middle;
		font-size: 14px;
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
	.mint-cell-wrapper{background-image: none;font-size: 14px;}
	
</style>
<template>
	<div>
		<div style="padding:5px 10px;background-color: #fff;">
			<img :src="$route.params.photoUrl" style="width: 40px; height: 40px;display: inline-block; border-radius: 50%; vertical-align: middle; margin-right: 10px;padding-bottom: 1px;" />
			<p style="display: inline-block;">{{$route.params.name}}为您服务</p>
		</div>
        
		<!--<input type="text" v-model='sqShort' placeholder="请输入标题" style="margin-top: 15px; width: 100%; height: 35px; font-size: 13px;padding:23px 10px 25px; border: none;" />
		
<div class="mint_line" style="background-color: #fff;padding-left: 10px;">
	&nbsp;
</div>
			<textarea class="" v-model='sqContext' style="width: 100%; height: 180px; padding:0 10px; border: none; margin-bottom: -4px;" placeholder="请描述一下您的困惑吧~">
			
		</textarea>-->
		
		<div style="background: #fff;margin-top: 15px; ">
			<mt-field label="" v-model="sqShort" type="text" :attr="{maxlength:50}"  placeholder="请输入标题" style="margin-top: 15px; margin-left: 10px; border-bottom: 1px solid #d9d9d9;"></mt-field>
        	<mt-field label="" v-model="sqContext" type="textarea" rows="6" :attr="{maxlength:500}"  placeholder="请描述一下您的困惑吧~" style="margin-left: 10px;"></mt-field>
			<table width="100%">
				<tr>
					<td style="width: 105px;">
						<label class="mint-checklist-label" slot="title" style="">
					        <span class="mint-check">
					          <input class="mint-check-input" type="checkbox"  name="checkp" v-model='isPublic'    >
					          <span class="mint-check-core"></span>
					        </span>
					        <span class="mint-check-label">内容公开</span>
						</label>
					</td>
					<td>
						<label class="mint-checklist-label" slot="title" style="display: inline-block;">
					        <span class="mint-check">
					          <input class="mint-check-input" type="checkbox"    name="checka"    v-model='isAnonymous' >
					          <span class="mint-check-core"></span>
					        </span>
					        <span class="mint-check-label"  >匿名咨询</span>
						</label>
					</td>
				</tr>
			</table>
		</div>
		<div class="" style="padding: 20px;">
			<mt-button @click.native='send' size="large" type="primary" style="font:16px '微软雅黑';background-color: #fd7b27;">提交</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'wantask',
		data() {
			return {
				sqShort: '',
				sqContext: '',
				isPublic: true,
				isAnonymous: false,
			}
		},
		methods: {
			send() {
				
				var contentStr=this.filterContent(this.sqContext);
				var titleStr=this.filterContent(this.sqShort);
				
				if(titleStr == '') {
					this.$toast('标题不能为空')
					return
				} else if(/^.{50,}$/.test(this.sqShort)) {
					this.$toast('标题长度不能超过50')
					return
				}else if(contentStr == '') {
					this.$toast('内容不能为空')
					return
				}else if(/^.{500,}$/.test(this.sqContext)) {
					this.$toast('内容长度不能超过500')
					return
				}
				
				
				
				var obj = {
					sqShort: titleStr,
					sqContext: contentStr,
					isPublic: this.isPublic,
					isAnonymous: this.isAnonymous,
					qasmId: this.$route.params.qasmId,
					toUserId: this.$route.params.aduserId,
					sqUserId:localStorage.userId
				}
				var self = this;
				this.ajax({
					url: '/sysQuestion/add',
					data: obj,
					type: 'post'
				}, function(data) {
					if(data.result) {
						self.sqShort='',
						self.sqContext='',
						self.isPublic=true,
						self.isAnonymous=false,
						sessionStorage.askObj="true"
						self.$router.back()
					}
					self.$toast(data.description)
				})
			}
		}
	};
</script>
<template>
	<div>
				
		
		
		<mt-cell title="头 像" is-link>
			<img src="./imgs/nav.png" />
		</mt-cell>
		<mt-cell title="用户名" is-link>
			<span style="color: black">哈哈哈哈</span>
		</mt-cell>
		<mt-cell title="生 日" is-link>
			<span style="color: black">保密</span>
		</mt-cell>
		<mt-cell title="性 别" is-link>
			<span style="color: black">保密</span>
		</mt-cell>
		<mt-cell title="收货地址" is-link>
			<span style="color: black">修改/添加</span>
		</mt-cell>

		<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
			<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">退出账户</mt-button>
		</div>

		<div style=" width:100%;  margin: 10% auto 0;">
			<mt-field label="姓 名" style="" placeholder="请输入姓名" type="text" :attr="{minlength:2,maxlength:12}"></mt-field>
			<mt-field label="电 话" placeholder="请输入你的电话" type="password" :attr="{minlength:2,maxlength:15}"></mt-field>
			<mt-field label="地 区" placeholder="省份 城市 县区" type="password" :attr="{maxlength:30}"></mt-field>
			<mt-field label="地 址" placeholder="请输入收货地址" type="password" :attr="{maxlength:40}"></mt-field>
			<mt-field label="邮 编" placeholder="六位邮政编码" type="password" :attr="{maxlength:6}"></mt-field>
		</div>
		<mt-radio
		  title=""
		  :value.sync="value"
		  :options="options">
		</mt-radio>
		
		
		<mt-cell title="小牧" label="山东  济南  高新区  银河大厦 5011"  is-link>
		</mt-cell>
		
		<mt-cell title="小牧" label="山东  济南  高新区  银河大厦 5011">
		 <mt-button type="danger">删除</mt-button>
		</mt-cell>



		<mt-field label="" placeholder="当前用户名" type="password" :attr="{maxlength:20}"></mt-field>
		<p style="font-size: 8px;color: #666666;padding: 10px;">以中文或英文字母开头，限4-16个字符，一个汉字为两个字符</p>
		<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
			<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">确定</mt-button>
		</div>
		
		
		
		<mt-cell title="账号与安全" is-link>
		</mt-cell>
		<mt-cell title="通用" is-link>
		</mt-cell>
		<mt-cell title="关于我们" is-link>
		</mt-cell>
		<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
			<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">退出账户</mt-button>
		</div>
		
		
		<mt-cell title="认证手机" is-link>
			<span style="color: black">135****1234</span>
		</mt-cell>
		
		<mt-cell title="登录密码" is-link>
			<span style="color: black">修改</span>
		</mt-cell>
		
		<mt-field label="" placeholder="请输入当前认证手机号" type="text" :attr="{maxlength:11}"></mt-field>
		<mt-cell title="135****1345" >
		</mt-cell>
		<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
			<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">验证</mt-button>
		</div>
		
		<mt-field label="" placeholder="请输入新的手机号" type="text" :attr="{maxlength:11}">
			<mt-button type="danger" style="background: #fd7b27;">获取验证码</mt-button><!--<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">获取验证码</mt-button>-->
		</mt-field>
		<mt-field label="" placeholder="请输入验证码" type="text" :attr="{maxlength:6}"></mt-field>
		<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
			<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">认证</mt-button>
		</div>
		
		
		<div style=" width:100%;  margin: 10% auto 0;">
			<mt-field label="当前密码" style="" placeholder="请输入姓名" :attr="{maxlength:20}"></mt-field>
			<mt-field label="新密码" placeholder="请输入你的电话" type="password" :attr="{maxlength:11}"></mt-field>
			<mt-field label="确认新密码" placeholder="省份 城市 县区" type="password" :attr="{maxlength:40}"></mt-field>
			<div style="margin-top: 20%; width: 80%;  margin: 0 auto;">
				<mt-button size="large" @click.native="login()" style="margin-top: 10%; border-radius: 16px;background: #fd7b27;" type="primary">确定</mt-button>
			</div>
		</div>
		
		
		<mt-cell title="清楚缓存" is-link>
			<span style="color: black">21M</span>
		</mt-cell>
		<mt-cell title="版本更新" is-link>
			<span style="color: green">这里是元素</span>
		</mt-cell>
		<p >waht a sads asd=={{loginState}}</p>
		<!--<div class="box">asdasdasd
			<div style="width: 40px;height: 80px;"></div>
		</div>-->
	</div>
</template>

<script>
	export default {
		data() {
				return {
					username:'',
					userpassword:'',
					value: '默认文字',
					options : [
					  {
					    label: '设置成默认收货地址',
					    value: '值A'
					  },
					]
				}
			},
			mounted() {
			},
			computed: {
			    loginState: function () {
			      return this.$store.state.loginState
			    }
			 },
			methods: {
				test:function(){
//					store.commit('increment') this.$store.commit('increment')
//					alert(this.$store);
					this.$store.commit({
  type: 'updateLoginState',
  loginState: 10
})
				},
			},
			components: {

			}
	}
</script>


<style scoped lang="less">
	/*@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}*/
	
	/*input{
		background-color: rgba(193, 28, 28, 0);
	}*/
	
	.linee {
		color: #444;
		font-size: 12px;
	}
	
	.multloginbutton {
		border-radius: 50%;
		height: 50px;
		width: 50px;
		margin: 20px
	}
</style>
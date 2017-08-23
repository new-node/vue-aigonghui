import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import mui from './plugins/mui'
import ontouch from './plugins/ontouch'
import Store from './vuex/store'
import routers from './routerconfig/routers'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'babel-polyfill'
Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(mui)
Vue.use(VueRouter);
Vue.use(ontouch);
mui.config.mallUrl='http://weixin.zb12351.com/app/index.php?'
mui.config.islog= process.env.NODE_ENV === 'production'?false:true//是否打印数据
//mui.config.root=process.env.NODE_ENV === 'production'?'http://new.zb12351.com:8080/union-face/iface':'/iface'//ajax请求的根路径
//mui.config.shearRoot='http://new.zb12351.com:8080/uniondist/index.html#'//ajax请求的根路径
//mui.config.updateurl= process.env.NODE_ENV === 'production'?'http://121.42.245.96:8082/image/apk/u-app/version.json':'/image/apk/u-app/version.json'//是否打印数据

//mui.config.root=process.env.NODE_ENV === 'production'?'http://192.168.1.108:8080/iface':'/iface'//ajax请求的根路径

mui.config.root=process.env.NODE_ENV === 'production'?'http://test.zb12351.com/union-face/iface':'/iface'//ajax请求的根路径
mui.config.shearRoot='http://test.zb12351.com/uniondist/index.html#'//ajax请求的根路径
mui.config.updateurl= process.env.NODE_ENV === 'production'?'http://121.42.245.55:8082/image/apk/u-app/version.json':'/image/apk/u-app/version.json'//是否打印数据

//mui.config.islog=true
const store = new Vuex.Store(Store)
const router = new VueRouter({
//	mode: 'history',
	base: __dirname,
	routes: routers,
})
 var vm=new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
	from.meta.scrollY=window.scrollY
 	Object.assign(to.meta, to.params, to.query);
   	next()
})
router.afterEach(route => {
	if(route.meta.scrollY){
		setTimeout(function(){
		   	window.scrollTo(0,route.meta.scrollY)
		},0)
	}else{
	   	window.scrollTo(0,0)
	}
})


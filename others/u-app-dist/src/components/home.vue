<template>
  <div  id="app" >
    		<!--<transition name="in-out-translate-fade"  >-->
    			<keep-alive>
		 	 			<router-view style="margin-bottom:60px;"></router-view>
		 	 		</keep-alive>

		 	 	<!--</transition>-->
	 	 	<mt-tabbar v-show="$route.meta.showHome!==false" v-model="selected"   fixed style="color: #666666;">
        <mt-tab-item    id="homepage"   selected @click.native="goto({name:'homepage'})"  >
          <img slot="icon"   :src="selected==='homepage'?imgObj.zyactive:imgObj.zypng">
            首页
        </mt-tab-item>
        <mt-tab-item id="mall"  @click.native="goto('mall')"  >
          <img slot="icon" :src="selected==='mall'?imgObj.mallActivePng:imgObj.mallPng" >
            惠购
        </mt-tab-item>
        <mt-tab-item id="activity"  @click.native="goto({name:'activity'})"  >
          <img slot="icon" :src="selected==='activity'?imgObj.hdactive:imgObj.hdpng" >
            活动
        </mt-tab-item>
        <!--<mt-tab-item id="integral"  @click.native="goto({name:'integral'})"  >
          <img slot="icon"  :src="selected==='integral'?imgObj.jfactive:imgObj.jfpng">
            积分
        </mt-tab-item>-->
        <mt-tab-item id="mine"  @click.native="goto({name:'mine'})"  >
          <img slot="icon"   :src="selected==='mine'?imgObj.wdactive:imgObj.wdpng">
           我的
        </mt-tab-item>
		</mt-tabbar>
  </div>
</template>

<script>
import zypng from './imgs/zy.png'
import zyactive from './imgs/zyactive.png'
import hdpng from './imgs/hd.png'
import hdactive from './imgs/hdactive.png'
import jfpng from './imgs/jf.png'
import jfactive from './imgs/jfactive.png'
import wdpng from './imgs/wd.png'
import wdactive from './imgs/wdactive.png'
import mallPng from './imgs/mall.png'
import mallActivePng from './imgs/mallActive.png'
export default {
  name: 'home',
  data () {
    return {
      selected:this.$route.name,
      imgObj:{
      	zypng:zypng,
      	zyactive:zyactive,
      	hdpng:hdpng,
      	hdactive:hdactive,
      	jfpng:jfpng,
      	jfactive:jfactive,
      	wdpng:wdpng,
      	wdactive:wdactive,
      	mallPng:mallPng,
      	mallActivePng:mallActivePng
      }
    }
  },
  watch:{
  	$route(){
  		this.selected=this.$route.name
  	}
  },
  created(){
	 	if(!localStorage.firstVisit){
			this.$router.replace({path:'/guide'})
		}
	},

  methods:{
  	goto(page){
  		if(page === 'mall'){

//				let outURL = 'http://localhost:8000/WeEngine-Laster-Offline-1/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile';
//				let outURL = 'http://test.zb12351.com:8000/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile';
				let outURL =this.mui.mallUrl + 'i=3&c=entry&m=ewei_shopv2&do=mobile';

				if(!window.plus) {
	    			window.location.href = outURL;
				} else {
		  			this.$router.push({
								name: 'mall',
								params: {
									url: outURL
								}
						})
				}

  		} else {
  			this.$router.replace(page)
  		}
  	}
  },

}
</script>

<style>
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: transparent;
    color: #fd7b27;
}
 </style>

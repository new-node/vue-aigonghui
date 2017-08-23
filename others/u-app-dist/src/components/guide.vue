<template>
	<div id="">
		
		<mt-swipe :auto="0" :style="style" :continuous='false' class='guid'>
		  <mt-swipe-item>
		  	<img src="./imgs/slid1.png" height="100%" width="100%"/>
		  </mt-swipe-item>
		  <mt-swipe-item>
		  	<img src="./imgs/slid2.png" height="100%" width="100%"/>
		  </mt-swipe-item>
		  <mt-swipe-item>
			<img src="./imgs/slidbtn.png" @click="back" id="but"/>
		  	<img src="./imgs/slid3.png" height="100%" width="100%"/>
		  </mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'guide',
		computed:{
			style(){
				return {height: document.documentElement.clientHeight+'px'}
			}
		},
		methods:{
			back(){
				localStorage.firstVisit=true
				this.$router.replace({name:'homepage'})
			}
		}
	}
</script>
<style type="text/css" >
	 #but{
	 	position: absolute;
	 	bottom: 100px;
	 	width: 40%;
	 	left: 30%;
	 	right: 30%;
	 }
	 .guid.mint-swipe-indicators{
	 	 left: 50%;
	 }
	.guid.mint-swipe-indicator.is-active{
	 	 background-color: #FD7B27;
	 }
	 .guid .mint-swipe-indicators {
	 	text-align: center;
	 }
	 .guid .mint-swipe-indicator.is-active{
	 	background-color: #FD6F27;
	 }
</style>
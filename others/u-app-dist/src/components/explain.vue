<template>
	<div>
		<img :src="$route.params.explain_type=='wish'?wish:bbs" width="100%"/>
	</div>
</template>
<script type="text/javascript">	
import bbs from './imgs/shuoming.png'
import wish from './imgs/wish_description.png'
	export default {
		name:'explain',
		data(){
			return {
				bbs:bbs,
				wish:wish
			}
		}
	}
</script>
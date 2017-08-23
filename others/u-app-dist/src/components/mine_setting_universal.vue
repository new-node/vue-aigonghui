<template>
	<div>
		<mt-cell title="清除缓存" @click.native="cleancache()" is-link>
			<span style="color: #8c8c8c">{{(catchsize/1024/1024).toFixed(1)}}M</span>
		</mt-cell>
		<!--<mt-cell title="版本更新" @click.native="checkupdate" is-link>
			
		</mt-cell>-->
	</div>
</template>

<script>
	//(catchsize/1024/1024).substring(0,(catchsize/1024/1024).indexOf(".")+2)   
	export default {
		data() {
				return {
					catchsize: 0, //字节
				}
			},
			mounted() {
				let self = this;
				if(window.plus){
					
					plus.io.resolveLocalFileSystemURL('_doc/update/', (m) => {
						self.log(m.fullPath)
						var directoryReader = m.createReader();
						directoryReader.readEntries(function(entries) {
							var i;
							for(i = 0; i < entries.length; i++) {
								self.log(entries[i].name)
								entries[i].getMetadata((metadata) => {
									self.catchsize = metadata.size + self.catchsize
								}, (err) => {
									self.log("directoryReader.readEntries error:" + err)
								}, false)
							}
						}, function(e) {
							self.log("Read entries failed: " + e.message)
						})
	
					}, (er) => {
						//						alert(JSON.stringify(er))
						self.log("plus.io.resolveLocalFileSystemURL error == " + er.code + " : " + er.message)
					});
				}
			},
			watch: {},
			computed: {},
			methods: {
				cleancache() {
					let self = this;
					if(window.plus){
						plus.io.resolveLocalFileSystemURL('_doc/update', (m) => {
							m.removeRecursively((er) => {
								self.catchsize =0
								self.$toast({
									message: '缓存清除完成',
									position: 'bottom',
								})
							})
						}, (er) => {
							self.$toast({
								message: '缓存已经清除',
								position: 'bottom',
							})
							self.log("plus.io.resolveLocalFileSystemURL error == " + er.code + " : " + er.message)
						})
					}
	},
	checkupdate() {
		//					_doc/update/
		let self = this
		self.update(function(msg) {
			if(window.plus && msg) {
				plus.nativeUI.toast(msg)
			}
		})

	}

	},
 
	}
</script>

<style scoped lang="less">
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
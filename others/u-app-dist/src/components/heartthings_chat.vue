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
	
	.nav_ten td {
		height: 90px;
	}
	
	.nav_ten img {
		width: 50px;
	}
</style>
<template>
	<div>
		<div style="background-color: #fff; padding:2px 10px 5px; margin-bottom: 15px;" v-if="question!=''">
			<div>
				<div style="float: left; margin-right: 5px;padding-top: 7px;">
					<img :src="question.photoUrl||''" style="height: 40px; width: 40px;  margin-right: 7px; border-radius: 50%;" @error="$event.target.src=defaulthead">
				</div>
				<div style="line-height: 10px;padding: 2px;">
					<p  style="margin-bottom: 10px;font-size:13px; color: #222;">{{question.isAnonymous?question.tmpName||'匿名用户':question.userRealname||question.userName}}</p>
					<span style="color: #8c8c8c; font-size: 12px;">{{question.createTime}}</span>
				</div>
			</div>
			<div class="" style="margin-top: 10px;">
				<p style="font-size: 17px; margin: 5px 0 0; color: #222;">{{question.sqShort}}</p>
				<p style="overflow: hidden; margin: 3px 0; font-size: 15px; color: #444; word-wrap:break-word;" v-html='question.sqContext'> </p>
				<p style="color: #A3A3A3; margin: 5px 0 3px;font-size: 12px;">
					<!--<span>234次阅读&nbsp;&nbsp;&nbsp;&nbsp;6个回复</span>-->
				</p>
			</div>
		</div>
		<div style="background-color: #fff; padding:2px 10px 5px; " >
			<p style="  margin-top: 15px;margin-bottom: 15px; color: #8c8c8c; ">回复</p>
			<div v-if="answer==null" style="text-align: center; background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
			    background-size: 120% 1px;
			    background-origin: content-box;
			    background-repeat: no-repeat;">
				<p style="padding-top: 20px;">暂无回复</p>
			</div>
			<div style="margin-bottom: 10px;background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
			    background-size: 120% 1px;
			    background-origin: content-box;
			    background-repeat: no-repeat;" v-if="answer!=null&&answer!=''">
				<div>
					<div style="float: left; margin-right: 5px;padding-top: 7px;">
						<img :src="answer.photoUrl||''" style="height: 40px; margin-right: 7px; border-radius: 5px;" @error="$event.target.src=head_active">
					</div>
					<div style="line-height: 10px;font-size:12px;padding: 2px">
						<p style="margin-bottom: 8px; font-size: 13px; color: #222;">{{answer.userRealname||answer.userName}}</p>
						<span style="font-size: 12px; color: #8c8c8c;">{{answer.createTime}}</span>
					</div>
					<p style="overflow: hidden; margin: 3px 0; font-size: 15px;color: #444; word-wrap:break-word;" v-html='answer.answerContent '> </p>
				</div>					
			</div>
		</div>
	</div>
</template>

<script>
import defaulthead from './imgs/defaulthead.png'
import head_active from './imgs/head_active.png'
export default {
		name: 'heartthings_chat',
		data() {
			return {
				selected: '',
				answer:'',
				question:'',
				defaulthead:defaulthead,
				head_active:head_active
			};
		},
		watch:{
			$route(){
				if(this.$route.name=='heartthings_chat'){
					this.getobj();
				}
			}
		},
		created(){
			this.getobj()
		},
		methods:{
			getobj(){
				var self=this
				this.ajax({url:'/sysQuestion/detail',data:{sqId:this.$route.params.sqId}},function(data){
					if(data.result){
						self.answer=data.obj.answer
						self.question=data.obj.question
					}else{
						self.$toast(data.description)
					}
				})
			}
		}
	};
</script>
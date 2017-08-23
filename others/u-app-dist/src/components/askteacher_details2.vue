<style type="text/css">
        html,body,.conteiner-fluid{
      /*     height: 100%; */
        }

        p{
          word-wrap:break-word;
        }
        .top_info{
          margin-top: 3.125%;
          margin-left: 3.125%;
          border-bottom: solid 2px #efefef;
          clear: both;
          overflow: hidden;
        }

        .top_info .top_info_img{
          width: 21.792%;
          float: left;
        }

        .top_info_char p{
          /* font-size: 18px; */
          color: #333333;
        }

        .reply_num span{
          color: #999999;
          font-size: 18px;
          /* line-height: 460%; */
        }

        .top_info_char{
          margin-left: 3.624%;
          float: left;
          width: 67%;
        }

        .info_keywords{
          margin-top: 1%;
          /* line-height: 272%; */
          font-size: 20px;
        }

        .info_name{
          font-size: 21px;
        }

       .border_left_div{
         margin-left: 5%;
         border-left: solid 2px #eeeeee;
         height: 68%;
       }

         .null_one{
            height: 29px;
            margin-left: 5%;
            border-left: solid 2px #eeeeee;
         }

        .introduce_title{
          font-size: 24px;
          color: #333;
          font-weight: bold;
        }

        .online_time_title img,
        .goodat_tit img,
        .introduce_title img{
          position: relative;
          background-color: #fff;
          margin-left: -2.9%;
          margin-right: 12px;
          width: 6%;
          vertical-align: middle;
        }

        .introduce_div{
          padding-top: 6.438%;
        }

        .introduce_div p{
          padding-left: 3.75%;
          padding-right: 3.75%;
          color: #666666;
          font-size: 17px;
        }

        .goodat_tit{
          padding-top: 4.96%;
        }

        .goodat_biaoqian{
          margin-top: 1.457%;
          margin-bottom: 1.778%;
          margin-left: -7%;
        }

        .goodat_biaoqian li{
          font-size: 17px;
          color: #666666;
          line-height: 139%;
          border: solid 2px #cccccc;
          border-radius: 25px 25px 25px 25px;
          padding-left: 12px;
          padding-right: 12px;
          margin-left: 1%;
          margin-bottom: 1%;
          display: inline-block;
          vertical-align: middle;
          text-align: center;
/*           padding-top: 1%;
padding-bottom: 1%; */
        }

        .online_time_div p{
          font-size: 17px;
          color: #666666;
          margin-left: 3.75%;
        }

        .bottom_button{
          width: 100%;
          border-top: solid 2px #e2e2e2;
          background-color: #efefef;
          text-align: center;
        }

        .bottom_button button{
          margin-top: 10px;
          color: #fff;
          font-size: 20px;
          outline: none;
          background: -webkit-linear-gradient(left,#f4c236,#fda725);
          background: linear-gradient(left,#f4c236,#fda725);
          border: none;
          width: 45%;
          height: 60px;
          border-radius: 10px;

        }

        .bottom_button .reply_btn{
          background: -webkit-linear-gradient(left,#fda725,#fd6f27);
          background: linear-gradient(left,#fda725,#fd6f27);
          margin-left: 1.875%;
        }

        @media screen and (max-width:510px){
          .info_name{
            font-size: 17px;
          }

          .info_keywords{
            font-size: 15px;
          }

          .reply_num span{
            font-size: 13px;
          }

          .introduce_div p{
            font-size: 14px;
            line-height: 22px;
          }

          .goodat_biaoqian div{
            font-size: 15px;
          }

          .online_time_div p{
            font-size: 14px;
          }

           .bottom_button button{
              font-size: 16px;
            }

            .introduce_title{
              font-size: 17px;
            }

        }

        #value{
          display: none;
        }
</style>
<template>
	<div style="background: #FFFFFF;">
      <div id="top_info" class="top_info" value=null>
        <img :src="porsenObj.photoUrl||''" @error="$event.target.src=defaulthead" class="top_info_img"/>
        <div class="top_info_char">
          <p class="info_name">{{porsenObj.aduserRealname}}</p>
          <p class="info_keywords">{{porsenObj.orgName}}</p>
          <p class="reply_num"><span>{{porsenObj.questionCnt}}人咨询</span>&nbsp;&nbsp;<span>已回复{{porsenObj.answerCnt}}条</span></p>
        </div>
      </div>
      <div class="border_left_div">
        <div class="introduce_div">
          <div class="introduce_title"><img src="./imgs/jianjiebiaoqian.png">简介</div>
          <!--<p>{{porsenObj.profileRemark}}</p>-->
          <p v-html="porsenObj.profileRemark"></p>
        </div>
        <div class="goodat_tit introduce_title"><img src="./imgs/shanchang.png">擅长</div>
        <div class="goodat_biaoqian">
        	<ol>
        		<li v-for="skill in porsenObj.skills">
        			{{skill}}
        		</li>
        	</ol>
        </div>
        <div class="online_time_div">
          <div class="online_time_title introduce_title"><img src="./imgs/zaixianshijian.png">在线时间</div>
          <p>
	          <span>{{porsenObj.onlineWeekBegin}}</span>到<span>{{porsenObj.onlineWeekEnd}}</span>
	          <span>{{porsenObj.onlineTimeBegin}}</span><span>-</span><span>{{porsenObj.onlineTimeEnd}}</span>
          </p>
        </div>
      </div>
     <div id="bottom_button" class="bottom_button">
     	<mt-button type="primary" style="font:16px '微软雅黑';background-color: #fd7b27;margin: 5px;" @click.native="jumpto({name:'wantask',params:{title:'咨询TA',aduserId:porsenObj.aduserId,name:porsenObj.sysAduserInfo.aduserRealname,photoUrl:porsenObj.photoUrl}})">我要咨询</mt-button>
	  	<mt-button type="primary" style="font:16px '微软雅黑';background-color: #fd7b27;margin: 5px;" @click.native="jumpto({name:'past_advisory',params:{title:'咨询TA',aduserId:porsenObj.aduserId}})">往期咨询</mt-button>
     </div>
</div>

</template>

<script>
	import defaulthead from './imgs/defaulthead.png'
	export default {
		name: 'askteacher_details2',
		data() {
			return {
				selected: '',
				porsenObj: '',
				defaulthead:defaulthead
			}
		},
		watch: {
			$route(){
				if(this.$route.name=='askteacher_details2'){
					this.getDetail();
				}
			}
		},
		created() {
			this.getDetail();
		},

		methods: {
			getDetail(){
				var self = this;
				this.ajax({
					url: '/sysAduserAttr/detail',
					data: {
						aduserId: this.$route.params.aduserId
					}
				}, function(data) {
					if(data.result) {
						self.porsenObj = data.obj;
					} else {
						self.$toast(data.description || '出错了')
					}
				})
			},
			jumpto(web) {
				if(localStorage.userId) {
					web.params.smId=this.$route.params.smId;
					web.params.qasmId=this.$route.params.qasmId,
					this.$router.push(web)
				} else {
					if(!localStorage.userId) {
						this.tologin()
						return
					}
				}
			}
		}
	};
</script>

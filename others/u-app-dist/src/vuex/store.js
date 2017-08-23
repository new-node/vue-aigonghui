
const state = {
  popupVisible:false,
  shareDetail:{
  	href:'',
		title:'爱工惠',
		content:"我正在使用爱工慧APP，赶紧跟我一起来体验！",
		thumbs:["http://pic51.nipic.com/file/20141022/19779658_171157758000_2.jpg"],
		pictures:["http://pic51.nipic.com/file/20141022/19779658_171157758000_2.jpg"],
		contentType:0,
		detailId:0
  },
  shares:''//分享服务列表
}
const mutations= {
		updatePopupVisible(state,popupVisible){
   		state.popupVisible=popupVisible
   	},
    updateShareDetail(state,shareDetail){
    	state.shareDetail=shareDetail
    },
    updateShares(state,shares){
    	state.shares=shares
    }
  }

export default {
  state,
  mutations,
}
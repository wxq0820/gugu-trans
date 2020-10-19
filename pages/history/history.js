const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: []
  },
  onLoad: function (options) {
    this.setData({history: wx.getStorageSync('history')})
  },
  onShow: function () {
    
  },
  onTapHistory: function(e){
      console.log(e)
      wx.reLaunch({
        url: `/pages/index/index?query=${e.currentTarget.dataset.query}`
      })
      app.globalData.curLang = e.currentTarget.dataset.lang
  }
})
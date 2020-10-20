const util = require('../../utils/util')
const app = getApp()

Page({

  data: {
    langList: {},
    curLang : {}
  },

  onLoad: function (options) {
    this.setData({curLang: app.globalData.curLang})
  },

  onShow: function () {
    this.setData({langList: app.globalData.langList})
  },

  onTapLang: function(e){
      this.setData({curLang: e.currentTarget.dataset.lang})
      wx.setStorageSync('curLang', e.currentTarget.dataset.lang)
      app.globalData.curLang = e.currentTarget.dataset.lang
      wx.switchTab({
        url: '../index/index'
      })
  }
})
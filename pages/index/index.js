//index.js
//获取应用实例
const app = getApp()
import {translate} from '../../utils/translate'

Page({
  data: {
    curLang: {},
    query: '',
    iconHideState: true,
    result: []
  },
  onLoad: function(options){
    if(options.query){
      this.setData({query: options.query})
    }
  },
  onShow: function(){
    if(this.data.curLang !== app.globalData.curLang){
      this.setData({curLang: app.globalData.curLang})
      this.onConfirm()
    }
  },
  onInput: function(e){
    this.setData({query:e.detail.value})
    if(this.data.query.length > 0){
      this.setData({iconHideState: false})
    }else{
      this.setData({iconHideState: true,result: []})
    }
  },
  onConfirm: function(){
    if(!this.data.query) return
    translate(this.data.query,{from: 'auto',to: this.data.curLang.lang}).then((res) => {
      this.setData({result: res.trans_result})

      let history = wx.getStorageSync('history') || []
      history.unshift({query: this.data.query,result: res.trans_result[0].dst,curLang: this.data.curLang})
      history.length = history.length > 15 ? 15 : history.length
      wx.setStorageSync('history', history)
    })
  },
  onTapClose: function(){
    this.setData({query: '',iconHideState: true,result:[]})
  }
})

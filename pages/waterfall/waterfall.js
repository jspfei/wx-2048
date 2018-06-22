// pages/waterfall/waterfall.js
var timeLine = require('./timeline.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeLine: timeLine.data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }, 
  // methods
  touchEntry(e) {
    wx.navigateTo({
      url: '../entry/entry?index=' + e.currentTarget.dataset.index
    })
  },
  contentLimit(text) {
    return text.substr(50)
  }
})
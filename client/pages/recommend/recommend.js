//index.js
// var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
  },
  toList: function(e) {
    wx.navigateTo({
      url: '../list/list',
    })
  }
})

Page({
  data: {
    num: 1,
    selected: {},
  },
  add: function () {
    this.setData({ num: this.data.num + 1 })
  },
  minus: function () {
    this.setData({ num: Math.max(this.data.num - 1, 0) })
  },
  handleBuy: function () {
    wx.showToast({
      title: '商品购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  handleAdd: function () {
    const pdListStr = wx.getStorageSync('pdList');
    const pdList = pdListStr ? JSON.parse(pdListStr) : [];
    wx.setStorage({
      key: 'pdList',
      data: JSON.stringify([
        ...pdList,
        {
          id: `p100-${Math.random * 1000 + 1}`,
          name: '小米机器人'
        }
      ]),
      success: function () {
        wx.showToast({
          title: '商品添加成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
})
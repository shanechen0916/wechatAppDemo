Page({
  data: {
    pdList: [
      // {
      //   id: "p100",
      //   name: "小米机器人"
      // }
    ],
    selected: {},
  },
  toList: function () {
    wx.navigateTo({
      url: '../list/list',
    })
  },
  onShow: function () {
    wx.getStorage({
      key: 'pdList',
      success: (res) => {
        this.setData({
          pdList: JSON.parse(res.data)
        })
      },
    })
  },
  handleClose: function (e) {
    const index = e.target.dataset.index;
    this.setData({
      pdList: [
        ...this.data.pdList.slice(0, index),
        ...this.data.pdList.slice(index + 1)
      ]
    }, () => {
      wx.setStorage({
        key: 'pdList',
        data: JSON.stringify(this.data.pdList),
        success: function () {
          wx.showToast({
            title: '删除产品成功',
            icon: 'success',
            duration: 2000,
          })
        }
      })
    })
  },
  handleSelect: function (e) {
    const selected = this.data.selected;
    const index = e.currentTarget.dataset.index;
    this.setData({
      selected: Object.assign({}, selected, { [index]: !selected[index] }),
    }, () => {
    });
  },
  handleBuy: function (e) {
    const selected = this.data.selected;
    const indexs = Object.keys(selected).filter(index => selected[index]);
    if (indexs.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    let res = [];
    const incIndexs = indexs.sort((a, b) => a - b);
    let preIndex = 0;
    incIndexs.forEach((index) => {
      res = res.concat(this.data.pdList.slice(preIndex, index));
      preIndex = index + 1;
    });
    this.setData({
      pdList: res,
    }, () => {
      wx.setStorage({
        key: 'pdList',
        data: JSON.stringify(res),
        success: () => {
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          });
        }
      });
    });
  }
})
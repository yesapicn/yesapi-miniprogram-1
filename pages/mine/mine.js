Page({


  openlocation: function () {
    wx.openLocation({
      longitude: Number('116.714479'),
      latitude: Number('23.402643'),
      name: "潮峰茶行",
      address: '浮动村东兴一巷三号'
    })
  },
})
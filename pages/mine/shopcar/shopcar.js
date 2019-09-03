//lists.js

import * as utils from '../../../utils/util.js';
let yesapi = require('../../../utils/yesapi.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    newsList: [],
    orders: [],
    shopcar: [],

    lastid: 0,
    toastHidden: true,
    confirmHidden: true,
    isfrist: 1,
    loadHidden: true,
    moreHidden: 'none',
    msg: '没有更多订单了',
    url: 'url',
    img: '',
  },

  //跳转商品详情页
  showGoodsDetailPage: function (e) {

    let data = e.currentTarget.dataset;

    wx.navigateTo({
      url: "../../goodsDetail/detail?id=" + data.id
    })

  },

  //跳转商品首页
  showGoodsPage: function (e) {

    let data = e.currentTarget.dataset;

    wx.reLaunch({
      url: "../../index/index?id=1"
    })

  },

  loadData: function (lastid) {
    //显示出加载中的提示
    this.setData({
      loadHidden: false
    })

    var limit = 5
    var that = this

    let params = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "yesapi_tea_shopcar", // 可选，根据接口文档，补充更多接口参数
      where: "[[\"user_identify\",\"=\",\"" + getApp().globalData.openid + "\"]]",
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),

      success: (res) => {
        let data = res.data.data.list;
        let shopcar = [];

        for (let i = 0; i < data.length; i++) {

          shopcar.push({
            tea_id: data[i].tea_id,
            good_title: data[i].good_title,
            good_img: data[i].good_img,
            good_price: data[i].good_price
          })
        };
        that.setData({
          shopcar: shopcar,
        })

      },
      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
        typeof cb == "function" && cb(err);
      }
    })

  },

  onLoad: function () {
    var that = this
    this.loadData(0);

  },

  toastChange: function () {
    this.setData({
      toastHidden: true
    })
  },
  modalChange: function () {
    this.setData({
      confirmHidden: true
    })
  }
})

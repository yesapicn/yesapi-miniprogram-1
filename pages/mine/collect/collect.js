//lists.js

import * as utils from '../../../utils/util.js';
let yesapi = require('../../../utils/yesapi.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    tabs: ["全部", "待付款", "待发货", "已发货"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    newsList: [],
    orders: [],
    ordersPay: [],
    ordersWaitToSend: [],
    ordersSend: [],

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

  loadData: function(lastid) {
    //显示出加载中的提示
    this.setData({
      loadHidden: false
    })

    var limit = 5
    var that = this

    let params = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "tea_order", // 可选，根据接口文档，补充更多接口参数
      where: "[[\"order_identify\",\"=\",\"" + getApp().globalData.openid + "\"]]",
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),

      success: (res) => {
        let data = res.data.data.list;
        let orders = [];

        for (let i = 0; i < data.length; i++) {

          orders.push({
            order_num: i + 1,
            order_goods_num: data[i].order_goods_num,
            order_status: data[i].order_status,
            order_time: data[i].order_time,
            order_goods: data[i].order_goods,
            order_location: data[i].order_location,
            order_mobile: data[i].order_mobile,
            order_price: data[i].order_price,
            order_img: data[i].order_img,
            id: data[i].id,
          })
        };
        that.setData({
          orders: orders,
        })

      },
      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
        typeof cb == "function" && cb(err);
      }
    })


    let paramsPay = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "tea_order", // 可选，根据接口文档，补充更多接口参数
      where: "[[\"order_identify\",\"=\",\"" + getApp().globalData.openid + "\"],[\"order_status\",\"=\",\"3\"]]",
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(paramsPay),

      success: (res) => {
        let data = res.data.data.list;
        let ordersPay = [];

        for (let i = 0; i < data.length; i++) {

          ordersPay.push({
            order_num: i + 1,
            order_goods_num: data[i].order_goods_num,
            order_status: data[i].order_status,
            order_time: data[i].order_time,
            order_goods: data[i].order_goods,
            order_location: data[i].order_location,
            order_mobile: data[i].order_mobile,
            order_price: data[i].order_price,
            order_img: data[i].order_img,
            id: data[i].id,
          })
        };
        that.setData({
          ordersPay: ordersPay,
        })

      },
      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
        typeof cb == "function" && cb(err);
      }
    })

    let paramsWaitToSend = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "tea_order", // 可选，根据接口文档，补充更多接口参数
      where: "[[\"order_identify\",\"=\",\"" + getApp().globalData.openid + "\"],[\"order_status\",\"=\",\"1\"]]",
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(paramsWaitToSend),

      success: (res) => {
        let data = res.data.data.list;
        let ordersWaitToSend = [];

        for (let i = 0; i < data.length; i++) {

          ordersWaitToSend.push({
            order_num: i + 1,
            order_goods_num: data[i].order_goods_num,
            order_status: data[i].order_status,
            order_time: data[i].order_time,
            order_goods: data[i].order_goods,
            order_location: data[i].order_location,
            order_mobile: data[i].order_mobile,
            order_price: data[i].order_price,
            order_img: data[i].order_img,
            id: data[i].id,
          })
        };
        that.setData({
          ordersWaitToSend: ordersWaitToSend,
        })

      },
      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
        typeof cb == "function" && cb(err);
      }
    })

    let paramsSend = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "tea_order", // 可选，根据接口文档，补充更多接口参数
      where: "[[\"order_identify\",\"=\",\"" + getApp().globalData.openid + "\"],[\"order_status\",\"=\",\"2\"]]",
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(paramsSend),

      success: (res) => {
        let data = res.data.data.list;
        let ordersSend = [];

        for (let i = 0; i < data.length; i++) {

          ordersSend.push({
            order_num: i + 1,
            order_goods_num: data[i].order_goods_num,
            order_status: data[i].order_status,
            order_time: data[i].order_time,
            order_goods: data[i].order_goods,
            order_location: data[i].order_location,
            order_mobile: data[i].order_mobile,
            order_price: data[i].order_price,
            order_img: data[i].order_img,
            id: data[i].id,
          })
        };
        that.setData({
          ordersSend: ordersSend,
        })

      },
      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
        typeof cb == "function" && cb(err);
      }
    })

  },

  //跳转商品详情页
  showOrderDetailPage: function (e) {

    let data = e.currentTarget.dataset;

    wx.navigateTo({
      url: "../collect/collectDetail/collectDetail?id=" + data.id
    })

  },

  loadMore: function(event) {

    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
      }
    })

    this.setData({
      isfrist: 0
    })
    this.loadData(id = id + 5);
  },
  onLoad: function() {
    var that = this

    this.loadData(0);

  },

  toastChange: function() {
    this.setData({
      toastHidden: false
    })
  },
  modalChange: function() {
    this.setData({
      confirmHidden: false
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})
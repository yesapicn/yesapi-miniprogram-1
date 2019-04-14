import S_request from '../../../../utils/requestService.js';
import * as utils from '../../../../utils/util.js';
import CONFIG from '../../../../config.js';
let okayapi = require('../../../../utils/okayapi.js')

Page({
  data: {
    list: [
      {
        id: 'form',
        name: '订单信息',
        open: true,
        pages: []
      },
      {
        id: 'widget',
        name: '配送信息',
        open: true,
        pages: []
      }
    ],
    status:0,
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  orderDetailInit: function (e) {
    let params = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "tea_order", // 可选，根据接口文档，补充更多接口参数
      where: "[[\"id\",\"=\",\"" + e.id + "\"]]",
    };

    let pages = [], list = this.data.list,status;
    console.log(e)

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.okayapiHost,
      data: okayapi.enryptData(params),
      success: (res) => {
        let data = res.data.data.list;

        list[0].pages[0] = data[0].order_goods;
        list[0].pages[1] = "x" + data[0].order_goods_num;
        list[0].pages[2] = "￥" + data[0].order_price; 
        list[0].pages[3] = "备注:" + data[0].order_remark;


        list[1].pages[0] = data[0].order_number;
        list[1].pages[1] = data[0].order_buyer;
        list[1].pages[2] = data[0].order_location;
        list[1].pages[3] = data[0].order_number;
        list[1].pages[4] = data[0].order_time;

        status = data[0].order_status;

        this.setData({
          list : list,
          status: status,
        });

      },
      fail: (err) => {
        console.log('error', err);
        err.statusCode = CONFIG.CODE.REQUESTERROR;
      }
    })
  },
  onLoad: function (e) {
    this.orderDetailInit(e);
  },
});

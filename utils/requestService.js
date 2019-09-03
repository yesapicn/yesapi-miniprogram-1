import * as utils from './util.js';
import CONFIG from '../config.js';
let util = require('./md5.js')
let app = getApp();
let DOMIAN = CONFIG[CONFIG.WX_ENV];
//index.js
let yesapi = require('./yesapi.js')


const getUserId = () => {
  var userInfo = app.globalData.userInfo ? app.globalData.userInfo : app.getUserInfo();
  var user_id = userInfo ? userInfo.UserId : '';
  console.log('getUserId', user_id)
  return user_id;
};





let S_request = {
  index: {
    getGoodsList: function (page, cb) {

      let params = {
        s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
        model_name: "yesapi_tea",	  // 可选，根据接口文档，补充更多接口参数
        where: "[[\"id\",\">\",\"0\"]]",
        page: page,
        perpage: "5"
      };
      let secondParams = {
        s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
        model_name: "yesapi_tea_swiper",	  // 可选，根据接口文档，补充更多接口参数
        where: "[[\"id\",\">\",\"0\"]]",
        page: 1,
        perpage: "5"
      };

      wx.request({
        header: utils.requestHeader(),
        url: getApp().globalData.yesApiHost,
        data: yesapi.enryptData(params),

        success: (res) => {
          let data = res.data.data.list;

          let goods = [];
          var swiperData = [];
          for (let i = 0; i < data.length; i++) {
            goods.push({
              id: data[i].id,
              goods_img: data[i].tea_titlepage,
              goods_title: data[i].tea_name,
              goods_desc: data[i].tea_desc,
              tea_tag: data[i].tea_tag,
              tea_price: data[i].tea_price,
            })
          };
          wx.request({
            header: utils.requestHeader(),
            url: app.globalData.yesApiHost,
            data: yesapi.enryptData(secondParams),
            success: (res) => {
              let data = res.data.data.list;

              for (let i = 0; i < data.length; i++) {
                if (data[i] != null) {
                  swiperData.push({
                    imgUrl: data[i].swiper_picture,
                  })
                }
              }
              typeof cb == "function" && cb(goods, swiperData);
            },
            fail: (err) => {
              console.log('error', err);
              err.statusCode = CONFIG.CODE.REQUESTERROR;
            }
          });

          goods.statusCode = CONFIG.CODE.REQUESTSUCCESS;

        },
        fail: (err) => {
          err.statusCode = CONFIG.CODE.REQUESTERROR;
          typeof cb == "function" && cb(err);
        }
      })
    }
  },
  detail: {
    getGoods: function (id, cb) {
      let params = {
        s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
        model_name: "yesapi_tea",	  // 可选，根据接口文档，补充更多接口参数
        where: "[[\"id\",\"=\",\"" + id + "\"]]",
      };

      wx.request({
        header: utils.requestHeader(),
        url: app.globalData.yesApiHost,
        data: yesapi.enryptData(params),
        success: (res) => {
          let data = res.data.data.list;
          data.statusCode = CONFIG.CODE.REQUESTSUCCESS;
          // console.log(res, data);

        },
        fail: (err) => {
          console.log('error', err);
          err.statusCode = CONFIG.CODE.REQUESTERROR;
        }
      })
    },
    getMatchGoods: function (id, cb) {
      wx.request({
        header: utils.requestHeader(),
        url: app.globalData.yesApiHost,
        data: {
          goods_id: id,
          user_id: getUserId()
        },
        success: (res) => {
          var data = res.data.data.goods_list;
          typeof cb == "function" && cb(data);
          console.log(res, data)
        },
        fail: (err) => {
          console.log('error', err);
        }
      })
    },
    getSameGoods: function (id, cb) {
      wx.request({
        header: utils.requestHeader(),
        url: app.globalData.yesApiHost,
        data: {
          goods_id: id,
          user_id: getUserId()
        },
        success: (res) => {
          var data = res.data.data.goods_list;
          typeof cb == "function" && cb(data);
          console.log(res, data)
        },
        fail: (err) => {
          console.log('error', err);
          //wx.navigateBack();
        }
      })
    }
  },
  brand: {
    getBrand: function (id, curPage, cb) {
      wx.request({
        header: utils.requestHeader(),
        url: DOMIAN.HOST.API_URL + "/Home/Api/getBrandGoodsList",
        data: {
          brand_id: id,
          curPage: curPage,
          pagenum: 20,
          user_id: getUserId()
        },
        success: (res) => {
          var data = res.data.data;
          typeof cb == "function" && cb(data);
          console.log(res, data)
        },
        fail: (err) => {
          console.log('error', err);
          wx.navigateBack();
        }
      })
    }
  },
  login: function (email, pwd, cb) {
    wx.request({
      header: utils.requestHeader(),
      url: DOMIAN.HOST.API_URL + "/Home/Api/login",
      data: {
        email: email,
        pwd: pwd
      },
      success: (res) => {
        var data = res;
        typeof cb == "function" && cb(data);
        console.log(res, data)
      },
      fail: (err) => {
        console.log('error', err);
        wx.navigateBack();
      }
    })
  },
  colllet: {
    getCollect: function (cb) {
      wx.request({
        header: utils.requestHeader(),
        url: DOMIAN.HOST.API_URL + "/Home/Api/getCollect",
        data: {
          user_id: getUserId()
        },
        success: (res) => {
          var data = res;
          typeof cb == "function" && cb(data);
          console.log(res, data)
        },
        fail: (err) => {
          console.log('error', err);
          //wx.navigateBack();
        }
      })
    },
    createCollect: function (name, cb) {
      wx.request({
        header: utils.requestHeader(),
        url: DOMIAN.HOST.API_URL + "/Home/Api/createCollect",
        data: {
          group_name: name,
          user_id: getUserId()
        },
        success: (res) => {
          var data = res;
          typeof cb == "function" && cb(data);
          console.log(res, data)
        },
        fail: (err) => {
          console.log('error', err);
          //wx.navigateBack();
        }
      })
    },
    makeCollect: function (goods_id, group_id = '', rec_type, attention, cb) {
      wx.request({
        header: utils.requestHeader(),
        url: DOMIAN.HOST.API_URL + "/Home/Api/makeCollect",
        data: {
          goods_id: goods_id,
          rec_type: rec_type,
          group_id: group_id,
          attention: attention,
          version: utils.requestHeader().version,
          user_id: getUserId()
        },
        success: (res) => {
          var data = res;
          typeof cb == "function" && cb(data);
          console.log(res, data)
        },
        fail: (err) => {
          console.log('error', err);
          //wx.navigateBack();
        }
      })
    }
  },
  main: {
    getMoment: function (page, cb) {

      let params = {
        s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
        model_name: "yesapi_tea_moment",	  // 可选，根据接口文档，补充更多接口参数
        where: "[[\"id\",\">\",\"0\"]]",
        page: 1,
        perpage: "5"
      };

      wx.request({
        header: utils.requestHeader(),
        url: getApp().globalData.yesapiHost,
        data: yesapi.enryptData(params),
        success: (res) => {
          let data = res.data.data.list;

          let moments = [];
          for (let i = 0; i < data.length; i++) {
            moments.push({
              id: data[i].id,
              moment_headimg: data[i].moment_headimg,
              moment_content: data[i].moment_content,
              moment_nickname: data[i].moment_nickname,
              moment_place: data[i].moment_place,
              moment_createtime: data[i].moment_createtime,
            })
          }
          console.log(moments)
          typeof cb == "function" && cb(moments);


          moments.statusCode = CONFIG.CODE.REQUESTSUCCESS;
        },


        fail: (err) => {
          err.statusCode = CONFIG.CODE.REQUESTERROR;
          typeof cb == "function" && cb(err);
        }
      })
    }
  },
};
module.exports = S_request;

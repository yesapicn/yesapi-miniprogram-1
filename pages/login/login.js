let app = getApp();
import CONFIG from '../../config.js';
import * as utils from '../../utils/util.js';
let okayapi = require('../../utils/okayapi.js');

Page({
  data: {
    openid: '',
  },
  onLoad: function() {
    var that = this;
    var code = '',
      openid = '';
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({

            success: function(res) {

              //传入用户信息
              app.globalData.userInfo = res.userInfo
              wx.login({
                //获取code
                success: function(res) {
                  code = res.code //返回code

                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9dd79889b1348c3a&secret=c0ff19403b5a206bf0bf537370dc5752&js_code=' + code + '&grant_type=authorization_code',
                    data: {},
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function(res) {
                      openid = res.data.openid //返回openid
                      app.globalData.openid = openid
                      that.setData({
                        openid: openid,
                      });
                    },
                    fail: function(err) {
                      console.log('error', err);
                    }
                  })
                }
              })

              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
  },

  bindGetUserInfo: function(e) {

    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      var code = '',openid='';
      wx.login({
        //获取code
        success: function(res) {
          code = res.code //返回code

          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9dd79889b1348c3a&secret=c0ff19403b5a206bf0bf537370dc5752&js_code=' + code + '&grant_type=authorization_code',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              openid = res.data.openid //返回openid

              app.globalData.openid = openid

              that.setData({
                openid: openid,
              });
              let params = {
                s: "App.Table.CheckCreate", // 必须，待请求的接口服务名称
                model_name: "tea_user",
                check_field: "user_identify",
                //Jason格式传入的写法
                data: "{\"user_nickname\": \"" + e.detail.userInfo.nickName + "\",\"user_identify\": \"" + that.data.openid + "\"}",
              };
              //插入登录的用户的相关信息到数据库
              wx.request({
                header: utils.requestHeader(),
                url: getApp().globalData.okayapiHost,
                data: okayapi.enryptData(params),
                success: function (res) {
                  console.log(that.data.openid)
                },
                fail: function (err) {
                  console.log('error', err);
                }
              });
            },
            fail: function(err) {
              console.log('error', err);
            }
          })
        }
      })
      
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },


})
//index.js
//获取应用实例
import S_request from '../../utils/requestService.js';
import CONFIG from '../../config.js';
import * as utils from '../../utils/util.js';
let yesapi = require('../../utils/yesapi.js')
let app = getApp()
let [curPageNumber, curPageRequsetNumber] = [1, 1];//设置当前页面数量,请求数量

Page({
  data:
  {
    userInfo: {}, // 存放用户信息
    resultData: [], // 存放数据
    momentsData: [],

    imgplace: "../../resource/images/meheadplace.png",
    userStatus: {}, // 存放地理位置
    scrolltop: 20, // 滚动轴TOP
    curPageNumber: 1,
    page: 1, // 页码值
    nomore: false,
    animationData: {},
    animationData1: {}, // 发布按钮下滑动画
    animationData2: {}, // 位置按钮下滑动画

    //页面loading
    loading: {
      hidden: false,
      msg: "加载中...",
      isViewHidden: true
    },

    windowHeight: 0,

    zanimg: '../../resource/images/dianzan.png'
  },
  // 初始方法
  onLoad: function () {
    this.setData({
      systemInfo: app.getSystemInfo()
    })

    this.getMoment()
  },

  getMoment: function () {
    let that = this
    let params = {
      s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
      model_name: "yesapi_tea_moment",	  // 可选，根据接口文档，补充更多接口参数
      where: "[[\"id\",\">\",\"0\"]]",
      order: "[\"id DESC\"]",
      page: that.data.curPageNumber,
      perpage: "5"
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success: (res) => {
        let data = res.data.data.list;

        for (var i = 0; i < data.length; i++) {
          data[i].moment_picture6 = [];
          if (data[i].moment_picture1 != '') {
            data[i].moment_picture6.push(data[i].moment_picture1);
          }
          if (data[i].moment_picture1 != '') {
            data[i].moment_picture6.push(data[i].moment_picture2);
          }
          if (data[i].moment_picture1 != '') {
            data[i].moment_picture6.push(data[i].moment_picture3);
          }
        }
        if (that.data.momentsData == undefined || that.data.momentsData == []){
        that.setData({
          momentsData: data
          })
        }else{
          that.setData({
            momentsData: that.data.momentsData.concat(data)
          })
        }
        if (data == undefined||data.length == 0){
          wx.showToast({
            title: "没有更多票圈啦~点击右上角绿色按钮发圈吧！",
          });
        }
      },

      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
      }
    })

  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    console.log('页面显示')

    let that = this
    let params = {
      s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
      model_name: "yesapi_tea_moment",	  // 可选，根据接口文档，补充更多接口参数
      where: "[[\"id\",\">\",\"0\"]]",
      order: "[\"id DESC\"]",
      page: 1,
      perpage: "5"
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success: (res) => {
        let data = res.data.data.list;

        for (var i = 0; i < data.length; i++) {
          data[i].moment_picture6 = [];
          if (data[i].moment_picture1 != '') {
            data[i].moment_picture6.push(data[i].moment_picture1);
          }
          if (data[i].moment_picture1 != '') {
            data[i].moment_picture6.push(data[i].moment_picture2);
          }
          if (data[i].moment_picture1 != '') {
            data[i].moment_picture6.push(data[i].moment_picture3);
          }
        }
          that.setData({
            momentsData: data
          })
      },

      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
      }
    })
  },

  scrollHandle: function (e) {
    //滚动事件
    // console.log(e.detail.scrollTop)
    var anum = e.detail.scrollTop <= 20 ? 20 : e.detail.scrollTop
    var that = this
    that.donghua(anum)
  },


  donghua: function (topNum) // 发布按钮动画
  {
    var that = this
    // 动画1
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
    })

    var animation1 = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
    })

    animation.opacity(0).translateY(topNum + 5).step()
    animation1.opacity(0).translateY(topNum + 5).step()

    that.setData({
      animationData1: animation.export(),
      animationData2: animation1.export()
    })

    setTimeout(function () {
      animation.opacity(1).step()
      animation1.opacity(1).step()

      that.setData({
        animationData1: animation.export(),
        animationData2: animation1.export()
      })
    }, 0)
  },
  // 上拉加载 (滚动到底部)
  scrollLoading: function () { //滚动加载

    var that = this
    that.setData({
      curPageNumber:that.data.curPageNumber+1
    })
    that.getMoment();


  },

  //前往发布！
  bindAdd: function () {
    var that = this
    // 用户朋友圈输入
    wx.showActionSheet({
      itemList: ['发布'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)

          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '../../pages/upload/upload?userId=' + that.data.userStatus.userId + '&address=' + that.data.userStatus.address + '&name=' + that.data.userStatus.name + '&lat=' + that.data.userStatus.lat + '&lnt=' + that.data.userStatus['lnt']
            })
          }
        }
      }
    })
  },

  // 展示图片
  previewImage: function (e) {
    var model = e.target.dataset.model
    var current = e.target.dataset.src
    console.log(model)
    var urlArry = model
    wx.previewImage({
      current: current,
      urls: urlArry
    })
  },
})






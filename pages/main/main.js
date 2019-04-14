//index.js
//获取应用实例
import S_request from '../../utils/requestService.js';
import CONFIG from '../../config.js';
import * as utils from '../../utils/util.js';
let okayapi = require('../../utils/okayapi.js')
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

    cz_flag: false, // 控制点赞评论按钮
    cz_right: 0, // 点赞评论定位right
    cz_top: 80, // 点赞评论定位top
    dz_id: null, // 点赞评论ID
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

    // 根据不同参数执行不同的操作
    // var that = this
    //调用应用实例的方法获取全局数据
    this.setData({
      // userInfo: app.globalData.userInfo
      systemInfo: app.getSystemInfo()
    })

    this.getMoment()
    // this.bindLoding()
    //that.onloadRequest()


    //var dataTop = {'detail':{'scrollTop':0}}
    // that.scrollHandle(dataTop)

  },

  getMoment: function () {
    let that = this
    let params = {
      s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
      model_name: "tea_moment",	  // 可选，根据接口文档，补充更多接口参数
      where: "[[\"id\",\">\",\"0\"]]",
      order: "[\"id DESC\"]",
      page: that.data.curPageNumber,
      perpage: "5"
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.okayapiHost,
      data: okayapi.enryptData(params),
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
            title: "没有更多票圈啦~",
          });
        }
      },

      fail: (err) => {
        err.statusCode = CONFIG.CODE.REQUESTERROR;
      }
    })

  },


  // onReloadPage: function () {
  //   // 重新加载页面 页面显示
  //   var that = this
  //   that.data.page = 1
  //   that.data.nomore = false
  //   that.onloadRequest()
  // },
  // onChangeMoment: function (e) {
  //   // 详情页动态改动
  //   console.log(e)
  //   var that = this
  //   var changeM = e
  //   var dataList = that.data.resultData
  //   for (var i = 0; i < dataList.length; i++) {
  //     var dataM = dataList[i];
  //     if (dataM.moment_id == changeM.moment_id) {
  //       dataList[i] = changeM
  //     }
  //   }
  //   // 构成新对象并且展示
  //   that.setData({
  //     resultData: dataList
  //   })
  // },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    console.log('页面显示')

    let that = this
    let params = {
      s: "App.Table.FreeQuery",	// 必须，待请求的接口服务名称
      model_name: "tea_moment",	  // 可选，根据接口文档，补充更多接口参数
      where: "[[\"id\",\">\",\"0\"]]",
      order: "[\"id DESC\"]",
      page: 1,
      perpage: "5"
    };

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.okayapiHost,
      data: okayapi.enryptData(params),
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
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
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
  // bindDele: function(event){ //删除动态
  //   var that = this
  //   var del_moment_id = event.target.dataset.deleid
  //   // 弹出提示让用户确认是否删除
  //   wx.showModal({
  //     content: '您确定要删除当前动态吗, 删除后将无法恢复!',
  //     success: function(res)
  //     {
  //       if (res.confirm)
  //       {
  //
  //         wx.showLoading({
  //           title: '删除中...',
  //         })
  //         setTimeout(function () {
  //           wx.hideLoading()
  //         }, 2000)
  //           // 执行REQUEST 删除当前记录
  //           wx.request({
  //             url: app.requestDelMomentUrl,
  //               data: {
  //                 flag:'dele',
  //                 // openid:event.target.dataset.deleuserid,
  //                 user_id: app.globalData.openid,
  //                 moment_id: del_moment_id
  //               },
  //               // header: {
  //               //     'content-type': 'application/x-www-form-urlencoded',
  //               // },
  //               // method:'POST',
  //               success: function(res)
  //               {
  //                 wx.hideLoading()
  //                 // console.log(res.data);
  //                 if(res.data['code'] == 0)
  //                 {
  //                   // this.showMessage('已删除')
  //                   var dataList = that.data.resultData
  //                   for (var i = 0; i < dataList.length; i++) {
  //                     var dataM = dataList[i];
  //                     console.log(dataM.moment_id);
  //                     if (dataM.moment_id == del_moment_id){
  //                         dataList.splice(i, 1);
  //                       }
  //                   }
  //                   // 构成新对象并且展示
  //                   that.setData({
  //                     resultData: dataList
  //                   })
  //                 }
  //               },
  //               fail: function(res)
  //               {
  //                 wx.hideLoading()
  //               },
  //               complete:function(res)
  //               {
  //                 wx.hideLoading()
  //               }
  //         })
  //       }
  //     }
  //   })
  // },
  //跳转朋友圈
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


  // // 详情页
  // detailpage: function (e)
  // {
  //   var that = this
  //   var moment_id = e.currentTarget.dataset.id
  //
  //   wx.navigateTo({
  //     url: '../detailmoment/detailmoment?id=' + moment_id + '&state=0'
  //   })
  // },
  // 展示图片
  previewImage: function (e) {
    var model = e.target.dataset.model
    var current = e.target.dataset.src
    // var count = e.target.dataset.count.split(",")
    console.log(model)
    var urlArry = model
    // console.log(count)
    wx.previewImage({
      current: current,
      urls: urlArry
    })

  },
  // locationWb:function(){ //选择地理位置跳转进入微博友圈
  //
  //   wx.redirectTo({
  //     url: '../../pages/address/address'
  //   })
  //
  // },
  // bindCaoZuo: function(e){  //评论点赞
  //   var that = this
  //   var userId = app.userId
  //   var dz_id = e.currentTarget.dataset.id
  //   // 获取当前节点的偏移TOP值计算当前点赞操作的位置
  //   var offsetTop = Math.floor(e.currentTarget.offsetTop)
  //   // 赋值计算好的TOP值显示按钮
  //   that.setData({
  //     dz_id:dz_id,
  //     cz_top:offsetTop,
  //     cz_flag:true
  //   })
  //
  //   // 动画
  //   var animation = wx.createAnimation({
  //       duration: 200,
  //       timingFunction: 'linear',
  //       delay:0,
  //   })
  //
  //   // 0.3秒后滑动
  //   setTimeout(function(){
  //      animation.right(40).opacity(1).step()
  //       that.setData({
  //         animationData:animation.export()
  //       })
  //   },300)
  //
  //   // 5秒后自动隐藏按钮
  //   var timeout = setTimeout(function(){
  //     animation.right(0).opacity(0).step()
  //       that.setData({
  //         animationData:animation.export()
  //       })
  //   },2000)
  //
  // },

  // onloadRequest: function()
  // {
  //   var that = this
  //   if (that.data.nomore){
  //     return;
  //   }
  //   console.log('用户id')
  //   console.log(app.globalData.openid)
  //
  //   // 执行REQUEST请求相应的数据
  //   wx.request({
  //     url: app.requestUrl,
  //     data: {
  //       flag: 'list',
  //       data: that.data.userStatus,
  //       state: that.data.state,
  //       user_id: app.globalData.openid,
  //       page: that.data.page,
  //       pagesize:'20'
  //     },
  //     // header: {
  //     //     'content-type': 'application/x-www-form-urlencoded',
  //     // },
  //     // method:'POST',
  //     success: function (res) {
  //       // console.log(res.data)
  //       // return;
  //       // 如果没有数据直接返回首页 有数据则展示
  //
  //       if (res.data.code == 0) {
  //         wx.hideToast()
  //         wx.stopPullDownRefresh()
  //         if (that.data.page == 1){
  //           that.setData({
  //             resultData: res.data.data,
  //             mombgimg: res.data.bgimg
  //           })
  //         } else {
  //           var tempdata = that.data.resultData
  //           for (var i = 0; i < res.data.data.length ;i ++){
  //             tempdata.push(res.data.data[i])
  //           }
  //           if (res.data.more == 0){
  //             that.setData({
  //               nomore : true
  //             })
  //           }
  //           that.setData({
  //             resultData: tempdata,
  //             mombgimg: res.data.bgimg
  //           })
  //         }
  //
  //
  //       }
  //     },
  //     fail: function (res) {
  //       console.log(res)
  //     }
  //   })
  //
  // },

  // bindLoding:function(){ // LOADING加载
  //    wx.showToast({
  //     title: '加载中',
  //     icon: 'loading'
  //   })
  // },
  // onPullDownRefresh:function(){ //下拉刷新
  //   var that = this
  //   that.bindLoding()
  //   that.onloadRequest(0)
  //   that.setData({
  //     page:1,
  //     resultData:[]
  //   })

  // },
  // bindDianZan: function () // 处理点赞
  // {
  //   var that = this
  //   that.setData({
  //     zanimg: '/images/yidianzan.png'
  //   })
  // },
  // bindDianZan: function(e) // 处理点赞
  // {
  //     var that = this
  //     var dataM = e.currentTarget.dataset.model
  //   if (dataM == undefined){
  //     return;
  //   }
  //   if (dataM.praise == 0){//未点赞
  //
  //       wx.request({
  //         url: app.requestaddLikeUrl,
  //         data: {
  //           user_id: app.globalData.openid,
  //           user_name: app.globalData.userInfo.nickName,
  //           like:'1',//1 : 点赞 ,0 取消赞
  //           moment_id: dataM.moment_id
  //         },
  //         method:'POST',
  //         header: {
  //             'content-type': 'application/x-www-form-urlencoded'
  //         },
  //
  //         success: function (res) {
  //           wx.hideLoading()
  //           console.log(res.data);
  //           if (res.data['code'] == 0) {
  //             // this.showMessage('已赞')
  //             var dataList = that.data.resultData
  //             for (var i = 0; i < dataList.length; i++) {
  //               var datatempM = dataList[i];
  //               console.log(dataM.moment_id);
  //               if (dataM.moment_id == datatempM.moment_id) {
  //                 datatempM['praise'] = '1';
  //                 var dataLikesArr = datatempM['likes'];
  //                 var likemodel = {};
  //                 likemodel['moment_id'] = dataM.moment_id;
  //                 likemodel['reply_id'] = app.globalData.openid;
  //                 likemodel['reply_name'] = app.globalData.userInfo.nickName;
  //                 dataLikesArr.push(likemodel);
  //                 datatempM['likes'] = dataLikesArr;
  //
  //                 // dataLikesArr[] = res.data['data'];
  //                 // datatempM['likes'] = dataLikesArr;
  //                 dataList[i] = datatempM;
  //               }
  //             }
  //
  //             // 构成新对象并且展示
  //             that.setData({
  //               resultData: dataList
  //             })
  //           }
  //         },
  //         fail: function (res) {
  //           wx.hideLoading()
  //         },
  //         complete: function (res) {
  //           wx.hideLoading()
  //         }
  //       })
  //     }
  //
  // },

  //通过requestService实例对象拿到数据
  // S_request.main.getMoment(curPageNumber, (momentsData) => {
  //   if (momentsData.statusCode == CONFIG.CODE.REQUESTERROR) {

  //     this.setData({

  //       "toast.hidden": false,
  //       "toast.icon": "clear",
  //       "toast.msg": "请求超时",
  //       "loading.hidden": true

  //     });
  //     return;
  //   }


  //   this.setData({
  //     momentsData: momentsData,
  //   } );



  //   curPageNumber += 1;

  //   app.MLoading(this, curPageRequsetNumber);


  // });

})






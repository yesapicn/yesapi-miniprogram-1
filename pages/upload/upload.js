//index.js
import S_request from '../../utils/requestService.js';
import * as utils from '../../utils/util.js';
let yesapi = require('../../utils/yesapi.js')
//获取应用实例
var app = getApp();
var imgArr = []; //这个数组用来临时存储图片数据
Page({

  data: {
    userInfo: {},
    imagesList: [],
    urlsList: [],
    addressData: null,
    userStatus: {},
    addRessName: false,
    content: '',
    contentlength: 0,
    imgStr: null,
    httpImg: [],
    latitude: '',
    chooseImageUrl: [], //绑定到页面的数据
    imgCount: 0, //图片的张数
    imgLenght: 0,
    chooseImagehid: false,
    uploadimgindex: 0, //当前上传第几张
    uploadimgnameArr: [], //上传图片文件名称
    baseImg: ""
  },

  onLoad: function(e) {
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
      userInfo: app.globalData.userInfo
    });

    //获取用户数据
    that.data.userStatus['name'] = e.name;
    that.data.userStatus['address'] = e.address;
    that.data.userStatus['lat'] = e.lat;
    that.data.userStatus['lnt'] = e.lnt;
    that.data.userStatus['userId'] = e.userId;
    // console.log(that.data.userInfo)
    // console.log(imgArr);
    imgArr = [];
  },

  uploader: function() {

    var that = this;
    let imagesList = [];
    let maxSize = 1024 * 1024;
    let maxLength = 1;
    let flag = true;

    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        for (let i = 0; i < res.tempFiles.length; i++) {
          if (res.tempFiles[i].size > maxSize) {
            flag = false;
            wx.showModal({
              content: '图片太大，不允许上传',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
          }
        }

        const tempFilePaths = res.tempFilePaths[0]
        if (res.tempFiles.length > maxLength) {
          res.tempFilePaths = []
          wx.showModal({
            content: '最多能上传' + maxLength + '张图片',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('确定');
              }
            }
          })
        }

        if (that.data.imagesList != [] || that.data.imagesList != null) {
          if ((res.tempFiles.length + that.data.imagesList.length) > maxLength) {
            res.tempFilePaths = []
            wx.showModal({
              content: '最多能上传' + maxLength + '张图片',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {}
              }
            })
          }
        }

        if (flag == true && res.tempFiles.length <= maxLength) {
          if (that.data.imagesList != [] || that.data.imagesList != null) {
            for (var i in that.data.imagesList) {
              res.tempFilePaths.push(that.data.imagesList[i]);
            }
            that.setData({
              imagesList: res.tempFilePaths
            })
          } else {

            that.setData({
              imagesList: res.tempFilePaths
            })
          }
        }

      },

      fail: function(err) {
        console.log(err);
      }
    })
  },
  // 输入内容
  listenercontent: function(e) {
    var tempc = e.detail.value;
    var tempcvalue = e.detail.value.length;
    this.setData({
      contentlength: parseInt(tempcvalue)
    });

    //超过三百字截取前面三百字
    if (tempc.length > 300) {
      tempc = tempc.substring(0, 300)
    }
    this.setData({
      content: tempc,
    })
  },

  // 选择地理位置
  bindAddress: function() {
    var that = this

    // 取消选择地理位置后获取当前人经纬度调用后台接口接收当前地理位置
    wx.chooseLocation({
      success: function(lb) {
        //console.log(lb)
        that.data.addressData = lb
        that.setData({
          addRessName: lb.name
        })
        //console.debug(that.data.addressData)  
      },
      cancel: function(lb) // 取消选择
      {
        //that.data.addressData = that.data.userStatus
      },
      fail: function(lb) {
        console.log(lb)
      }
    })
  },



  previewImage: function(e) // 显示图片大图
  {
    var current = e.target.dataset.index
    console.log(current)
    console.log(imgArr[current])
    if (current != undefined) {
      wx.previewImage({
        current: imgArr[current],
        urls: imgArr
      })
    }
    //   wx.previewImage({
    //     current: e.currentTarget.id, // 当前显示图片的http链接
    //     urls: this.data.files // 需要预览的图片http链接列表
    //   })

  },
  addPicture: function() {

    var that = this;
    if (that.data.imagesList[0] != undefined){
    let paramsZero = {
      s: "App.CDN.UploadImg", // 必须，待请求的接口服务名称
    };
    wx.uploadFile({
      //for test
      url: getApp().globalData.yesApiHost,
      formData: yesapi.enryptData(paramsZero),
      filePath: that.data.imagesList[0],
      name: 'file',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        var data = res.data;
        var url = 'http:' + data.split(',')[3].split(':')[2].split("\"")[0];
        var urlsList = [];
        urlsList.push(url)
        console.log(urlsList);
        that.setData({
          urlsList: urlsList
        })
      },

      fail: function(err) {
        console.log(err);
      },
      complete: function(res) {
        var data = res.data;
        var url = 'http:' + data.split(',')[3].split(':')[2].split("\"")[0];
        var urlsList = [];
        urlsList.push(url)
        // that.setData({
        //   urlsList: urlsList
        // });


      }
      })
    }



  },
  addContent: function() {
    var newDate = new Date();
    var that = this;
    if (that.data.addRessName == undefined || that.data.addRessName == ''){
      var params = {
        s: "App.Table.Create", // 必须，待请求的接口服务名称
        model_name: "tea_moment",
        //Jason格式传入的写法
        data: "{\"moment_nickname\": \"" + that.data.userInfo.nickName +
          "\",\"moment_content\": \"" + that.data.content +
          "\",\"moment_createtime\": \"" + newDate.toLocaleString() +
          "\",\"moment_picture1\": \"" + that.data.urlsList[0] +
          "\",\"moment_picture2\": \"" + that.data.imagesList[1] +
          "\",\"moment_picture3\": \"" + that.data.imagesList[2] +
          "\",\"moment_place\": \"" + that.data.addRessName +
          "\",\"moment_headimg\": \"" + app.globalData.userInfo.avatarUrl +
          "\"}",
      };
    }

else{
      var params = {
        s: "App.Table.Create", // 必须，待请求的接口服务名称
        model_name: "tea_moment",
        //Jason格式传入的写法
        data: "{\"moment_nickname\": \"" + that.data.userInfo.nickName +
          "\",\"moment_content\": \"" + that.data.content +
          "\",\"moment_createtime\": \"" + newDate +
          "\",\"moment_picture1\": \"" + that.data.urlsList[0] +
          "\",\"moment_picture2\": \"" + that.data.imagesList[1] +
          "\",\"moment_picture3\": \"" + that.data.imagesList[2] +
          "\",\"moment_lat\": \"" + that.data.addressData.latitude +
          "\",\"moment_lng\": \"" + that.data.addressData.longitude +
          "\",\"moment_place\": \"" + that.data.addRessName +
          "\",\"moment_headimg\": \"" + app.globalData.userInfo.avatarUrl +
          "\"}",
      };
}

    //用户按了允许授权按钮
    var that = this;
    //插入登录的用户的相关信息到数据库
    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success: function(res) {
        wx.showToast({
          title: "发表成功！",
        });
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  addMoment: function() {

    var that = this
//如果不用上传照片
    if (that.data.imagesList[0] != undefined){
//上传图片七秒钟左右
    this.addPicture()
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 7000
    })
    setTimeout(function() {
      console.log(that)
      that.addContent();
      }, 7100)
      setTimeout(function () {
        wx.navigateBack({

        })
      }, 7200)
    }else{
      that.addContent();
      setTimeout(function () {
        wx.navigateBack({
          
        })
      }, 2200)
    }
  }
})
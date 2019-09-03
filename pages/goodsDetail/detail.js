//detail.js
let app = getApp();
import S_request from '../../utils/requestService.js';
import * as utils from '../../utils/util.js';
let curPageRequsetNumber = 3; //设置当前页面请求数量
let yesapi = require('../../utils/yesapi.js')

Page({
  data: {
    pageSetting: { //页面设置
      swiperHeight: 0 // 轮播图高度
    },
    addressInfo: null, //地址信息,
    loading: { //页面loading
      hidden: true,
      msg: "加载中...",
      isViewHidden: false
    },
    toast: { //页面消息提示
      hidden: true,
      icon: "clear",
      msg: "请求超时"
    },
    collect: {
      data: [],
      actionSheetHidden: true,
      createCollectName: ""
    },

    //轮播台数据
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    swiperData: {}, //轮播台详情
    imgList: {},//照片列表
    goodsData: {}, //商品详情
    goodsNumberInput: 1, //购买数量

    //输入备注内容
    content: '',
    contentlength: 0,
  },
  onLoad: function(e) {
    this.goodsDetailInit(e);
    this.setSwiperHeight();
    // this.getMatchGoods(e);
    // this.getSameGoods(e);
  },
  onShow: function() {

  },
  onReady: function(e) {
    console.log('渲染完成', e);
  },
  //初始化 商品详情
  goodsDetailInit: function(e) {
    let params = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "yesapi_tea", // 可选，根据接口文档，补充更多接口参数
      where: "[[\"id\",\"=\",\"" + e.id + "\"]]",
    };

    let swiperData = [];
    let imgList = [];

    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success: (res) => {
        let data = res.data.data.list;

        //循环拿出所有照片放进数组 没有图片地址或者等于最大位置时停止
        for (let i = 1; data[0]['tea_picture' + i] != "" && data[0]['tea_picture' + i] != null; i++) {
          swiperData.push({
            imgUrl: data[0]['tea_picture' + i],
          })
        }

        for (let i = 1; data[0]['tea_presentation_img' + i] != "" && data[0]['tea_presentation_img' + i] != null; i++) {
          imgList.push({
            imgUrl: data[0]['tea_presentation_img' + i],
          })
        }

        this.setData({
          goodsData: data[0],
          swiperData: swiperData,
          imgList: imgList,
        });

      },
      fail: (err) => {
        console.log('error', err);
        err.statusCode = CONFIG.CODE.REQUESTERROR;
      }
    })
  },
  //初始化 商品详情Swiper高度
  setSwiperHeight: function() {
    var systemInfo = app.getSystemInfo(),
      rpx = (750 / systemInfo.windowWidth);

    //设置swiper 高度
    this.setData({
      "pageSetting.swiperHeight": (systemInfo.windowHeight - (systemInfo.windowHeight * .57)) * rpx
    })
  },

  //选择商品数量
  change_goods_number: function(e) {
    let type = e.currentTarget.dataset.type;

    if (type == "add") {
      this.setData({
        goodsNumberInput: this.data.goodsNumberInput + 1
      })
    } else if (type == "minus" && this.data.goodsNumberInput > 1) {
      this.setData({
        goodsNumberInput: this.data.goodsNumberInput - 1
      });
    }
  },

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

  //加入购物车
  joinCart: function(e) {
    console.log(e.currentTarget.dataset.id);
    let params = {
      s: "App.Table.Create", // 必须，待请求的接口服务名称
      model_name: "yesapi_tea_shopcar",
      //Jason格式传入的写法
      data: "{\"user_identify\": \"" + getApp().globalData.openid +
        "\",\"tea_id\": \"" + e.currentTarget.dataset.id +
        "\",\"car_identify_new\": \"" + getApp().globalData.openid + e.currentTarget.dataset.id +
        "\",\"good_img\": \"" + e.currentTarget.dataset.tea_titlepage +
        "\",\"good_title\": \"" + e.currentTarget.dataset.tea_name +
        "\",\"good_price\": \"" + e.currentTarget.dataset.tea_price +"\"}",
    };
    //用户按了允许授权按钮
    var that = this;
    //插入登录的用户的相关信息到数据库
    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success: function(res) {
        wx.showToast({
          title: "加入购物车成功！",
        });

//两秒后消失
        setTimeout(function() {
          wx.hideLoading()
        }, 2000)
      },
      fail: (err) => {
        console.log(e.detail);
      }
    })
  },

  openCartPage: function () {
    //打开选择属性页面
    this.openPageAnimate();
  },

  //购买发送订单到那里
  details_bot_opts: function(e, id) {
    let goodsnumber = this.data.goodsNumberInput,
      orderPrice = this.data.goodsData.tea_price * goodsnumber;
    // var date = getDate();
    var timestamp = Date.parse(new Date());
    var newDate = new Date();

    //订单地址判定
    if (this.data.addressInfo == null || this.data.addressInfo == {}) {
      wx.showToast({
        title: "地址不能为空哦亲",
      })
    } else {

      let params = {
        s: "App.Table.Create", // 必须，待请求的接口服务名称
        model_name: "yesapi_tea_order",
        //Jason格式传入的写法
        data: "{\"order_buyer\": \"" + this.data.addressInfo.userName +
          "\",\"order_number\": \"" + timestamp / 1000 +
          "\",\"order_time\": \"" + newDate.toLocaleString() +
          "\",\"order_status\": \"" + 1 +
          "\",\"order_location\": \"" + this.data.addressInfo.provinceName + this.data.addressInfo.cityName + this.data.addressInfo.countyName + this.data.addressInfo.detailInfo +
          "\",\"order_price\": \"" + orderPrice +
          "\",\"order_goods\": \"" + this.data.goodsData.tea_name +
          "\",\"order_good_id\": \"" + this.data.goodsData.id +
          "\",\"order_img\": \"" + this.data.goodsData.tea_titlepage +
          "\",\"order_remark\": \"" + this.data.content +
          "\",\"order_mobile\": \"" + this.data.addressInfo.telNumber +
          "\",\"order_identify\": \"" + getApp().globalData.openid +
          "\",\"order_goods_num\": \"" + goodsnumber + "\"}",
      };
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        header: utils.requestHeader(),
        url: getApp().globalData.yesApiHost,
        data: yesapi.enryptData(params),
        success: function(res) {
          wx.showToast({
            title: "下单成功！",
          });
          console.log(res)

          setTimeout(function() {
            wx.hideLoading()
          }, 2000)

          setTimeout(function() {
            wx.navigateTo({
              url: "/pages/mine/collect/collectDetail/collectDetail?id=" + res.data.data.id
            })
          }, 2000);

          let params = {
            s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
            model_name: "yesapi_tea_order", // 可选，根据接口文档，补充更多接口参数
            where: "[[\"order_identify\",\"=\",\"" + getApp().globalData.openid + "\"]]",
          };

          wx.request({
            header: utils.requestHeader(),
            url: getApp().globalData.yesApiHost,
            data: yesapi.enryptData(params),

            success: (res) => {
              console.log(res)
            },
            fail: (err) => {
              err.statusCode = CONFIG.CODE.REQUESTERROR;
              typeof cb == "function" && cb(err);
            }
          })

        },
        fail: (err) => {
          console.log(e.detail);
        }
      })
    };

    //支付函数等发布后才能发布
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: '',
    //   success(res) { },
    //   fail(res) { }
    // })
  },

  chooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          addressInfo: res
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  // 打开内页
  openPageAnimate: function() {
    app.globalPageAnimate('left', (animate) => {
      this.setData({
        animationData: animate.export()
      });
      setTimeout(() => {
        this.setData({
          "loading.isViewHidden": true
        })
      }, animate.option.transition.duration)
    });
  },
  //关闭内页
  closePageAnimate: function() {
    app.globalPageAnimate('right', (animate) => {
      this.setData({
        animationData: animate.export(),
        "loading.isViewHidden": false
      });

    });
  },

  //请求超时提醒
  toastChange: function() {
    this.setData({
      "toast.hidden": true
    });
  }
});

//index.js
//引入需要的文件并实例化
import S_request from '../../utils/requestService.js';
import CONFIG from '../../config.js';
let app = getApp();
let [curPageNumber, curPageRequsetNumber] = [1, 1]; //设置当前页面数量,请求数量

Page({
  //数据
  data: {
    userInfo: {},

    //轮播台数据
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperData: [],

    //列表数据
    goodsData: [],
    collect: {
      data: [],
      actionSheetHidden: true,
      createCollectName: ""
    },

    curPageNumber: 1,

    //页面loading
    loading: {
      hidden: false,
      msg: "加载中...",
      isViewHidden: true
    },

    //页面消息提示
    toast: {
      hidden: true,
      icon: "clear",
      msg: ""
    }
  },

  //加载完成
  onLoad: function() {
    this.setData({
      systemInfo: app.getSystemInfo()
    });

    //通过requestService实例对象拿到数据
    S_request.index.getGoodsList(curPageNumber, (goodsData, swiperData) => {
      if (goodsData.statusCode == CONFIG.CODE.REQUESTERROR) {
        this.setData({

          "toast.hidden": false,
          "toast.icon": "clear",
          "toast.msg": "请求超时",
          "loading.hidden": true

        });
        return;
      }

      this.setData({
        goodsData: goodsData,
        swiperData: swiperData,
      });

      curPageNumber += 1;
      app.MLoading(this, curPageRequsetNumber);

    });

  },

  //跳转商品详情页
  showGoodsDetailPage: function(e) {

    let data = e.currentTarget.dataset;

    wx.navigateTo({
      url: "/pages/goodsDetail/detail?id=" + data.id
    })

  },

  //加载更多商品
  loadMoreGoods: function(e) {
    this.setData({
      curPageNumber: this.data.curPageNumber + 1
    })
    let curPageNumber = this.data.curPageNumber;
    let goodsData = this.data.goodsData;
    S_request.index.getGoodsList(curPageNumber, (res) => {
      console.log(res)
      if (res[0] == undefined) {
        wx.showToast({
          title: "没有更多商品了哦",
        });
      } else {
        if (res[0].id == goodsData[goodsData.length - 1].id) {
          console.log('yes')
          wx.showToast({
            title: "没有更多商品了哦",
          });
        } else {
          console.log(res)
          this.setData({
            goodsData: this.data.goodsData.concat(res),
          });
        }
      }
    })

  },
  //请求超时提醒
  toastChange: function() {
    this.setData({
      "toast.hidden": true
    });
  }
});
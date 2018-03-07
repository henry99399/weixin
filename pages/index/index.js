//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '我的书架',
    userInfo: {},
    shlefData: [],
    ctxPath: 'http://cjszyun.cn',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function(){
    this.vilaUser();
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.vilaUser();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.vilaUser();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.vilaUser();
        }
      })
    }
  },
  vilaUser: function(e){
    if (app.globalData.token){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getBookShelf();
    }
    else{
      setTimeout(()=>{
        this.vilaUser();
      },200)
    }
  },
  getBookShelf: function (e) {
    wx.request({
      url: 'http://cjszyun.cn/v2/api/bookShelf/getList',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token
      },
      header: app.globalData.header,
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          shlefData: res.data.data
        })
      }
    })
  },
  addBook: function (e) {
    wx.scanCode({
      success: (res) => {
        if (res.result.indexOf('?') == -1) {
          wx.showModal({
            title: '提示',
            content: '请扫描长江阅读图书二维码'
          })
          return false;
        }
        let search = res.result.split('?')[1];
        let searchs = search.split('&');
        let param = {
          org_id: null,
          book_id: null,
          device_id: null,
          book_type: null
        }
        for (var key in searchs) {
          if (searchs[key].indexOf('o=') != -1) {
            param['org_id'] = searchs[key].replace('o=', '');
          }
          if (searchs[key].indexOf('b=') != -1) {
            param['book_id'] = searchs[key].replace('b=', '');
          }
          if (searchs[key].indexOf('d=') != -1) {
            param['device_id'] = searchs[key].replace('d=', '');
          }
          if (searchs[key].indexOf('t=') != -1) {
            param['book_type'] = searchs[key].replace('t=', '');
          }
        }
        if (param.org_id && param.book_id) {
          wx.request({
            url: 'http://cjszyun.cn/v3/api/bookShelf/addBook',
            method: 'POST',
            data: {
              token_type: 'ios',
              member_token: app.globalData.token,
              book_id: param.book_id,
              book_type: param.book_type
            },
            header: app.globalData.header,
            success: (add_res) => {
              if (add_res.data.code == 0) {
                this.getBookShelf();
              }
              else {
                wx.showModal({
                  title: '添加失败',
                  content: add_res.data.message
                })
              }
            }
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '请扫描长江阅读图书二维码'
          })
        }
      }
    })
  },
  tosearch: function(){
    wx.switchTab({
      url: '../search/search',
    })
  },
  lookBook: function(e){
    wx.navigateTo({
      url: '../read/read?book_id=' + e.currentTarget.dataset.item.bk_id + '&book_type=' + e.currentTarget.dataset.item.book_type + '&book_name=' + e.currentTarget.dataset.item.bk_name
    })
  }
})

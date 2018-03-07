//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code;
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxae20b5686aa84366',
            secret: '373cac023b16e82ddf162f4d5870637e',
            js_code: this.globalData.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: (data) => {
            this.globalData.openid = data.data.openid;
            //发送数据请求
            this.toLogin(data.data);
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code: null,
    openid: null,
    token: null,
    header:{'content-type': 'application/x-www-form-urlencoded'}
  },
  toLogin: function(data){
    wx.request({
      url: 'http://cjszyun.cn/v2/api/mobile/login',
      method: 'POST',
      data: {
        token_type: 'ios',
        account: data.openid,
        pwd: '123456'
      },
      header: this.globalData.header,
      success: (res) => {
        if (res.data.code != 0) {
          this.toReg(data);
        }
        else{
          this.globalData.token = res.data.data.token;
          this.globalData.baseUserInfo = res.data.data;
        }
      }
    })
  },
  toReg: function(data){
    wx.request({
      url: 'http://cjszyun.cn/v2/api/mobile/registe',
      method: 'POST',
      data: {
        token_type: 'ios',
        account: data.openid,
        pwd: '123456'
      },
      header: this.globalData.header,
      success: (res) => {
        this.toLogin(data);
      }
    })
  }
})
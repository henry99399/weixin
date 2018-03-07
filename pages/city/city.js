//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctxPath: 'http://cjszyun.cn',
    advList: [],
    data20001: [],
    data20002:[],
    data20003:[],
    data20004:[],
    data20005:[],
    data20006:[],
    data20007:[],
    data20008:[]
  },
  advtobook: function(e){
    let param = e.currentTarget.dataset.item.split('|');
    wx.navigateTo({
      url: '../book/book?book_id=' + param[0] + '&book_type=' + param[1]
    })
  },
  tolookbook: function(e){
    console.log(e.currentTarget.dataset.book);
    wx.navigateTo({
      url: '../book/book?book_id=' + e.currentTarget.dataset.book.book_id + '&book_type=' + e.currentTarget.dataset.book.book_type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://cjszyun.cn/v3/adv/getAdv',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        adv_code: '10001'
      },
      header: app.globalData.header,
      success: (res) => {
        this.setData({
          advList: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://cjszyun.cn/v3/api/recommendBooks/getListByCodes',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        recommend_codes: '20001,20002,20003,20004,20005,20006,20007,20008'
      },
      header: app.globalData.header,
      success: (res) => {
        res.data.data.forEach(element => {
          if(element.code == '20001'){
            this.setData({
              'data20001': element.data
            })
          }
          else if (element.code == '20002') {
            this.setData({
              'data20002': element.data
            })
          }
          else if (element.code == '20003') {
            this.setData({
              'data20003': element.data
            })
          }
          else if (element.code == '20004') {
            this.setData({
              'data20004': element.data
            })
          }
          else if (element.code == '20005') {
            this.setData({
              'data20005': element.data
            })
          }
          else if (element.code == '20006') {
            this.setData({
              'data20006': element.data
            })
          }
          else if (element.code == '20007') {
            this.setData({
              'data20007': element.data
            })
          }
          else if (element.code == '20008') {
            this.setData({
              'data20008': element.data
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.book_name,
    })
    wx.request({
      url: options.book_type == 1 ? 'http://cjszyun.cn/v3/bookChapter/list' : 'http://cjszyun.cn/v3/api/book/chapterTree',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        book_id: options.book_id,
        book_type: options.book_type
      },
      header: app.globalData.header,
      success: (res) => {
        this.setData(res.data.data)
        this.setData({
          book_id: options.book_id,
          book_type: options.book_type,
          intoview: options.ch_id
        })
        console.log(this.data)
      }
    });
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
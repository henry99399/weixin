const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_author: null,
    book_cat_name: null,
    book_cover: null,
    book_id: null,
    book_type: null,
    book_url: null,
    is_finish: 1,
    price: null,
    shelf_id: null,
    word_size: 0,
    book_remark: null
  },
  addShelf: function(){
    wx.request({
      url: 'http://cjszyun.cn/v3/api/bookShelf/addBook',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        book_id: this.data.book_id,
        book_type: this.data.book_type
      },
      header: app.globalData.header,
      success: (res) => {
        this.setData({
          shelf_id: res.data.data.shelf_id
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.loadAll(options);
  },
  toloadAll: function(e){
    console.log(e)
    this.loadAll({
      book_id: e.currentTarget.dataset.book.book_id,
      book_type: this.data.book_type
    })
  },
  lookChapter: function(){
    wx.navigateTo({
      url: '../chapter/chapter?book_id=' + this.data.book_id + '&book_type=' + this.data.book_type +'&book_name='+ this.data.book_name,
    })
  },
  loadAll: function(options){
    wx.request({
      url: 'http://cjszyun.cn/v3/book/getBookDetailInfo',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        book_id: options.book_id,
        book_type: options.book_type
      },
      header: app.globalData.header,
      success: (res) => {
        let param = res.data.data;
        if (param.book_type == 2) {
          param.book_cover = 'http://cjszyun.cn' + param.book_cover
        }
        this.setData(param);
        this.setData({
          scrollTop: 0
        })
        wx.request({
          url: 'http://cjszyun.cn/v3/bookChapter/chapterCount',
          method: 'POST',
          data: {
            token_type: 'ios',
            member_token: app.globalData.token,
            book_id: this.data.book_id,
            book_type: this.data.book_type
          },
          header: app.globalData.header,
          success: (res) => {
            this.setData({
              chapterCount: res.data.data
            })
          }
        });
        console.log(this.data)
        if (param.book_type == 1) {
          this.wwList(param);
        }
        else {
          this.cbList(param);
        }
      }
    })
  },
  wwList: function(e){
    wx.request({
      url: 'http://cjszyun.cn/v3/recommend/list',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        book_id: e.book_id,
        limit: 6
      },
      header: app.globalData.header,
      success: (res) => {
       this.setData({
         ctxPath: '',
         tjList: res.data.data
       })
      }
    })
  },
  cbList: function(e){
    wx.request({
      url: 'http://cjszyun.cn/v2/api/mobile/book/listSuggest',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        bookId: e.book_id,
        org_id: 189,
        bookCatId: e.book_cat_id,
        num: 6
      },
      header: app.globalData.header,
      success: (res) => {
        this.setData({
          ctxPath: 'http://cjszyun.cn',
          tjList: res.data.data
        })
      }
    })
  },
  readBook: function (e) {
    console.log(this.data)
    wx.navigateTo({
      url: '../read/read?book_id=' + this.data.book_id + '&book_type=' + this.data.book_type + '&book_name=' + this.data.book_name
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
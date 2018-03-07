const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctxPath: 'http://cjszyun.cn',
    searchKeys: [],
    showFocus: true,
    searchText: '',
    books: [],
    hasMore: true,
    total: 0,
    param: {
      searchText: '',
      pageNum: 1,
      pageSize: 10,
      book_type: 1
    }
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
      url: 'http://cjszyun.cn/v3/searchKey/getSearchkeyList',
      method: 'POST',
      data: {
        token_type: 'ios',
        member_token: app.globalData.token,
        display: 15
      },
      header: app.globalData.header,
      success: (res) => {
        this.setData({
          searchKeys: res.data.data
        })
      }
    })
  },
  toSearch: function (e) {
    this.setData({ searchText: e.currentTarget.dataset.item.name });
    this.setData({
      books: [],
      hasMore: true,
      total: 0,
      param: {
        searchText: e.currentTarget.dataset.item.name,
        pageNum: 1,
        pageSize: 10,
        book_type: 1
      }
    })
    this.loadList();
  },
  onfocus: function (e) {
    this.setData({
      showFocus: true
    });
  },
  tochange: function (e) {
    this.setData({
      searchText: e.detail.value,
      param: {
        searchText: e.detail.value,
        pageNum: this.data.param.pageNum,
        pageSize: 10,
        book_type: 1
      }
    })
  },
  loadList: function (e) {
    this.setData({
      showFocus: false
    });
    wx.request({
      url: 'http://cjszyun.cn/v3/api/search/bookList',
      method: 'POST',
      data: this.data.param,
      header: app.globalData.header,
      success: (res) => {
        this.setData({
          books: this.data.books.concat(res.data.data.rows),
          hasMore: res.data.data.pages > res.data.data.pageNum,
          total: res.data.data.total,
          pages: res.data.data.pages
        })
      }
    })
  },
  scrollLoad: function (e) {
    if (!this.data.pages || this.data.pages > this.data.param.pageNum) {
      this.setData({
        param: {
          searchText: this.data.param.searchText,
          pageNum: this.data.param.pageNum + 1,
          pageSize: 10,
          book_type: 1
        }
      })
      this.loadList();
    }
    else{
      this.setData({
        hasMore: false
      });
    }
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
    this.setData({
      showFocus: true
    })
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
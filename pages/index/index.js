//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      titleActive:true,
      imgUrls: [],
      indicatorDots:true,
      zhuanInfo:[],
      lookPersonActiveShow: true
  },
  //事件处理函数
  changeActive(ev){
    if (!ev.currentTarget.dataset.active) {
      this.setData({ titleActive: !this.data.titleActive })
    }
     
  },
  // 切换看推挤和附近逛
  setActive: function (ev) {
    if (!ev.currentTarget.dataset.active){
      this.setData({ lookPersonActiveShow: !this.data.lookPersonActiveShow })
    }
   // this.setData({ lookPersonActiveShow: !this.data.lookPersonActiveShow })
  },
  //点击第二个轮播图的时候跳转，并且传递参数
  getData(ev){
    //console.log(ev.currentTarget.dataset.item);
    let pages = getCurrentPages();
    let item = ev.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../details/details?path='+pages[0].route+'&title='+item.title+'&img='+item.image+'&content='+item.content
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let that = this;
    wx.request({
      url: 'http://127.0.0.1/getPics.php',
      method:'GET',
      data: 'cpage=2',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
       
        var arr = [];
        for(var i=0;i<30;i++){
            arr[i] = res.data[i];
        }
       
        let list = arr.map(function(item,index){
              return {
                title: item.title.substr(0,15),
                image:item.image,
                content: item.title
              }
        })

        let swiperList = arr.map(function(item){
          return item.image
        })

     
        that.setData({
          imgUrls : swiperList,
          zhuanInfo:list
        })
      }
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

<script>
export default {
  mpType: "app",
  onLaunch(opts) {
    this.globalData.options = opts;
    // this.$request.getOpenid();
    wx.getSetting({
      success (res){
        console.log('res: ', res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      },
      fail(err){
        console.log(err)
      }
    })



    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
        console.log('lsldlsd', latitude, longitude)
      }
    })

    // wx.request({
    //   url: "https://www.meitingpark.com/mobile/user/openid.html", 
    //   data: {
    //   code: "011YSWax0LhJFa1b1yax0uKebx0YSWa6"
    //   },
    //   dataType: 'json',
    //   method:"post",
    //   header: {
    //     "content-type": "application/json" // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data);
    //   }
    // });
    // this.$request.login(userId);
  },
  onShow() {
    if (!wx.createSelectorQuery) {
      // 首页Tabbar组件依赖此API
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，可能影响使用体验，请升级到最新微信版本后重试。"
      });
    }
  },
  onPageNotFound(res) {},
  onError(error) {},
  globalData() {
    return {
      options: {}, // 启动参数
      user: {}, // 用户信息
      mail: {}, // 待发送信件，用于情感援助
      mys: {}, // 感恩节活动主题
      title: "送你一张解忧券",
      imageUrl: "https://cdn.tellers.cn/tell_v2/static/share_default.jpg", // 默认分享分
      replyCount: 1, //当天可回信次数
      taskState: "" //福利社体验状态
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
</style>

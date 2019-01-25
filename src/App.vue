
<script>
export default {
  mpType: "app",
  onLaunch(opts) {
    this.globalData.options = opts;
    this.$request.login();
  },
  onPageNotFound(res) {
    wx.reLaunch({
      url: "/pages/home/index"
    });
  },
  onError: function(msg) {
    console.log("App onError");
    console.log(msg);
  },
  globalData() {
    return {
      options: {}, // 启动参数
      user: {}, // 用户信息
      mail:{}, // 待发送邮件
      mys: {} // 活动主题
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
@import url(./styles/iconfont.css);
</style>

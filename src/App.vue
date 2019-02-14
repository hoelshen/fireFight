
<script>
export default {
  mpType: "app",
  onLaunch(opts) {
    this.globalData.options = opts;
    this.$request.login();
  },
  onShow() {
    if (!wx.createSelectorQuery) {
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，可能影响使用体验，请升级到最新微信版本后重试。"
      });
    }
  },
  onPageNotFound(res) {
    wx.reLaunch({
      url: "/pages/home/index"
    });
  },
  onError: function(msg) {
    console.error(msg);
  },
  globalData() {
    return {
      options: {}, // 启动参数
      user: {}, // 用户信息
      mail: {}, // 待发送邮件
      mys: {} // 活动主题
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
</style>

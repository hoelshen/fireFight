
<script>
export default {
  mpType: "app",
  onLaunch(opts) {
    if (wx.cloud) {
      wx.cloud.init();
    }
    this.globalData.options = opts;
    this.$request.login();
    this.globalData.path = opts.query.scene
      ? this.globalData.path + `scene=${opts.scene}`
      : this.globalData.path;
  },
  onShow() {
    this.$request.get("/image/default").then(res => {
      this.globalData.imageUrl = res.data;
    });
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
  onError(error) {
    //this.$request.sendFrontErrorToCloud(error);
  },
  globalData() {
    return {
      options: {}, // 启动参数
      user: {}, // 用户信息
      mail: {}, // 待发送邮件
      mys: {}, // 活动主题
      title: "送你一张解忧券",
      imageUrl: "https://cdn.tellers.cn/tell_v2/static/share_default.jpg", // 默认分享图
      path: "/pages/share/receive?",
      replyCount: 1
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
</style>

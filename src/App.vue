
<script>
export default {
  mpType: "app",
  onLaunch(opts) {
    this.globalData.options = opts;
    this.$request.login();
  },
  onShow: function(options) {
    wx.setTabBarBadge({
      index: 0,
      text: "2"
    });
  },
  onHide: function() {},
  onError: function(msg) {
    console.log("App onError");
    console.log(msg);
  },
  globalData() {
    return {
      shareTicket: 1,
      options: {},
      user: {},
      sUser: {}
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
@import url(./styles/iconfont.css);
</style>


<script>
export default {
  mpType: "app",
  onLaunch(opts) {
    this.globalData.options = opts;
    this.$request.login();
  },
  onShow: function(options) {
   
  },
  onHide: function() {},
  onError: function(msg) {
    console.log("App onError");
    console.log(msg);
  },
  globalData() {
    return {
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

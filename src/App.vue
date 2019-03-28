
<script>
export default {
  mpType: "app",
  onLaunch(opts) {
    this.globalData.options = opts;
    let userId = wx.getStorageSync('token') //永久保存用户账号
    this.$request.login(userId);
    this.globalData.path = opts.query.scene
      ? this.globalData.path + `scene=${opts.scene}`
      : this.globalData.path;
  },
  onShow() {
    this.$request.get("/image/default").then(res => {
      this.globalData.imageUrl = res.data;
    });


    if (!wx.createSelectorQuery) {
      // 首页Tabbar组件依赖此API
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，可能影响使用体验，请升级到最新微信版本后重试。"
      });
    }
  },
  onPageNotFound(res) {
    // 需要兼容历史版本，避免扫码进入不存在的页面
    const {query, path} = res;

    if(/stronger-mail\/index/.test(path)){
      wx.navigateTo({
        url:`/stronger/pages/mail/index?_id=${query._id}&back=${query.back}`
      })
    } else {
      wx.reLaunch({
        url: "/pages/home/index"
      });
    }
  },
  onError(error) {
    this.$request.sendFrontErrorToCloud(error);
  },
  globalData() {
    return {
      options: {}, // 启动参数
      user: {}, // 用户信息
      mail: {}, // 待发送信件，用于情感援助
      mys: {}, // 感恩节活动主题
      title: "送你一张解忧券",
      imageUrl: "https://cdn.tellers.cn/tell_v2/static/share_default.jpg", // 默认分享分
      path: "/pages/share/receive?", // 默认分享路径
      replyCount: 1, //当天可回信次数
      taskState: "" //福利社体验状态
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
</style>

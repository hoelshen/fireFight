<template>
  <view class="app flex column j-start ">
    <div class="userInfo flex column  center">
      <image
        class="circle a-center"
        src="https://cdn.tellers.cn/tell_v2/static/tell-logo-400x400.png"
        background-size="cover"
      />
    </div>
    <div class="text">
      <p style="">请同意授权</p>
      <p style="color:#A9A9A9">· 以便Tell为你提供更好的服务</p>
    </div>
    <div class="button">
      <button
        open-type="getUserInfo"
        lang="zh_CN"
        @getuserinfo="onGotUserInfo"
      >
        微信授权
      </button>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      wxUser: {},
      userInfo: {}
    };
  },
  methods: {
    onGotUserInfo(e) {
      let { iv, userInfo, encryptedData } = e.detail;
      if (!userInfo) {
        return false;
      }
      wx.showLoading({
        title: "授权中",
        mask: true
      });
      this.$request
        .post("/setPenName", {
          iv,
          userInfo,
          encryptedData
        })
        .then(
          function(authRes) {
            wx.hideLoading();
            this.$router.push({ path: "/pages/setPenName/index" });
          }.bind(this)
        )
        .catch(err => {
          wx.hideLoading();
        });
    },
    checkUserInfoPermission(callback = () => {}) {
      wx.getSetting({
        success: result => {
          if (!result.authSetting["scope.userInfo"]) {
            wx.openSetting({
              success(authSetting) {
                console.log(authSetting);
              }
            });
          }
        },
        fail: () => {},
        complete: () => {}
      });
    }
  },
  onShow() {
    let { user } = getApp().globalData;
    this.userInfo = user;
    console.log("this.userInfo: ", this.userInfo);
  }
};
</script>
<style lang="less" scoped>
.circle {
  width: 216rpx;
  height: 216rpx;
  border-style: none;
}
.userInfo {
  width: 670rpx;
  height: 500rpx;
  margin: 20rpx 40rpx 42rpx 40rpx;
  border-bottom: 1rpx solid #a9a9a9;
}
.button {
  width: 612rpx;
  height: 88rpx;
  margin: auto;
  margin-top: 42rpx;
  & button {
    background-color: #21ac16;
    color: #ffffff;
    border-radius: 4px;
  }
}
.text {
  width: 670rpx;
  margin: 0rpx 40rpx 42rpx 40rpx;
}
</style>

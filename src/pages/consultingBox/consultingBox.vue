<template>
  <view class="app flex column j-between">
    <div class="flex consultingBox column center">
      <div class="conDiv column flex center grow">
        <span class="consultingBox_title">咨询箱</span>

        <span class="consultingBox_detail">
          <p class="text-center">你可以在这里咨询你的烦恼</p>
          <p class="text-center">每次使用 1 张解忧券</p>
        </span>
        <span class="consultingBox_content" @click="onDetail">查看详细说明</span>
      </div>
      <div v-if="!user.unionid">
        <button  class="myStoryButton"  open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
        讲述我的故事
        </button> 
      </div>
      <button v-else class="myStoryButton" @click="onMyStory">讲述我的故事</button>
    </div>

    <div class="foot flex center">
      当前持有 {{tickets}} 张解忧券
      <div class="foot_div" @click="returnWelfare">获取更多</div>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tickets: 0,
      user:{}
    };
  },
  methods: {
    onMyStory() {
      this.$router.push({ path: "/pages/consultingBox/myStory" });
    },
    onDetail() {
      this.$router.push({
        query: { page: "Trouble-Consultaion-Service-Description" },
        path: "/pages/webview/index"
      });
    },
    returnWelfare() {
      this.$router.push({ path: "/pages/welfare/index" });
    },
    onGotUserInfo(e) {
      this.$request.auth(e.detail);
    },
  },
  onShow() {
    const { user } = getApp().globalData;
    this.user = user
    this.tickets = user.ticketCount;
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  }
};
</script>
<style lang="less">
.consultingBox {
  width: 630rpx;
  min-height: 726rpx;
  margin: auto;
  margin-top: 40rpx;
  &_title {
    font-size: 60rpx;
    margin-bottom: 30rpx;
    font-weight: 600;
  }
  &_detail {
    width: 450rpx;
    line-height: 52rpx;
  }
  &_content {
    color: #ffc86d;
    margin-top: 60rpx;
    font-weight: 600;
  }
}

.conDiv {
  margin-top: 206rpx;
}
.myStoryButton {
  margin-top: 60rpx;
  margin-bottom: 60rpx;
  border-radius: 23px;
  font-size: 28rpx;
  border: 1px solid #ffc86d;
  line-height: 92rpx;
  text-align: center;
  padding: 0 74rpx;
  font-weight: 600;
}
.foot {
  margin-bottom: 60rpx;
  color: #a9a9a9;
  &_div {
    color: #ffc86d;
    margin-left: 10rpx;
    font-weight: 600;
  }
}

</style>

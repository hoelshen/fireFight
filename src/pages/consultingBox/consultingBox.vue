<template>
  <view class="app flex column j-between">
    <div class="flex consultingBox column center">
      <span class="consultingBox_title">咨询箱</span>

      <span class="consultingBox_detail">
        烦恼咨询服务每次需使用1张解忧券
        若3日未收到解答则退还解忧券
      </span>
      <span
        class="consultingBox_content"
        @click="onDetail"
      >详细说明</span>
      <div>
        <button
          class="myStoryButton"
          @click="onMyStory"
        >讲述我的故事</button>
      </div>
    </div>

    <div class="foot flex center">
      当前持有{{tickets}}张解忧券
      <div
        class="foot_div"
        @click="returnWelfare"
      >获取更多</div>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tickets: 0
    };
  },
  methods: {
    onMyStory() {
      this.$router.push({ path: "/pages/myStory/index" });
    },
    onDetail() {
      this.$router.push({
        query: { active: "description" },
        path: "/pages/detail/index"
      });
    },
    returnWelfare() {
      this.$router.push({ path: "/pages/welfare/index" });
    }
  },
  onShow() {
    const { user } = getApp().globalData;
    this.tickets = user.ticketCount;
  }
};
</script>
<style lang="less">
.consultingBox {
  width: 630rpx;
  height: 722rpx;
  background-image: "../../static/cdn/consultingBox.png";
  margin: auto;
  margin-top: 103rpx;
  &_title {
    font-size: 60rpx;
    margin-bottom: 30rpx;
  }
  &_detail {
    margin-bottom: 20rpx;
    width: 450rpx;
    height: 80rpx;
  }
  &_content {
    color: #ff4d6b;
    margin-bottom: 30rpx;
  }
}

.myStoryButton {
  margin-top: 16rpx;
  border-radius: 23px;
  width: 316rpx;
  height: 92rpx;
  border: 1px solid #ff4d6b;
}
.foot {
  margin-bottom: 60rpx;
  color: #a9a9a9;
  &_div {
    color: #ff4d6b;
    margin-left: 10rpx;
  }
}
</style>

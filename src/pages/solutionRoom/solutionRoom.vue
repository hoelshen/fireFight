<template>
  <view class="app">
    <session class="solutionRoomName">
      <div class="solutionRoomName-name">
        <span>{{aliasName}}</span>
      </div>
      <div clss="solutionRoomName_question">
        <span>你今天还可以解答{{mails.length}}个咨询</span>
        <button @click="onSolutionLimit">
          <img
            class="solutionRoomName_question-img"
            src="static/imgs/矩形.png"
            alt=""
          >
        </button>

      </div>
    </session>

    <session class="list">
      <div
        class="list_item flex column j-between"
        v-for="(item,index) in mails"
        :key="index"
      >
        <div class="list_item-receiverName">
          <span class="list_item-receiverNameSpan">{{item.aliasName}}</span>
          <span>收</span>
        </div>
        <div class="list_item-content ">
          <span>{{item.content}}</span>
        </div>
        <div class="list_item-sendName flex j-end">
          <span>{{item.creator}}</span>
        </div>
      </div>
    </session>
  </view>

</template>
<script>
export default {
  data() {
    return {
      aliasName: "",
      mails: [],
      mails: {},
      isFocus: true
    };
  },
  methods: {
    async getStory() {
      let res = await this.$request.get("/mail/story");
      this.mails = res.data;
      console.log("list", this.mails);
    },
    onSolutionLimit() {
      this.$router.push({
        query: { active: "solutionLimit", path: "'/pages/detail/index'" }
      });
    }
  },
  onShow() {
    const { user } = getApp().globalData;
    console.log("user: ", user);

    this.aliasName = user.aliasName;

    this.getStory();
  }
};
</script>
<style lang="less" scoped>
.solutionRoomName {
  width: 448rpx;
  height: 80rpx;
  border: 1px solid #ffffff;
  margin: 20rpx 60rpx;
  &_question {
    &-img {
      height: 44rpx;
      width: 44rpx;
    }
  }
}
.list {
  margin-left: 20rpx;
  border: 1px solid #ffffff;
  width: 100%;
  height: auto;
  &_item {
    width: 630rpx;
    height: 280rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    margin-left: 60rpx;
    &-receiverName {
      display: inline-block;
      color: #a9a9a9;
    }
    &-receiverNameSpan {
      margin-right: 10rpx;
      margin-top: 20rpx;
      color: #a9a9a9;
    }
    &-content {
      margin-top: 18rpx;
      font-family: "PingFang SC";
      font-size: 34rpx;
    }
    &-sendName {
      margin-top: 18rpx;
      font-size: 28rpx;
      color: #a9a9a9;
    }
  }
}
</style>

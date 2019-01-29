<template>
  <view class="app">
    <session class="solutionRoomName">
      <div class="solutionRoomName-name">
        <p class="solutionRoomName-day">{{days}}</p>
        <p class="solutionRoomName-aliasName">{{aliasName}}</p>
      </div>
      <div clss="solutionRoomName_question flex j-between">
        <span class="solutionRoomName_question_mail">你今天还可以解答{{mails.length}}个咨询</span>
        <!-- <button @click="onSolutionLimit">
          <div class="iconfont icon-memery"></div>
        </button> -->
      </div>
    </session>

    <session class="list">
      <div
        class="list_item flex column j-between"
        v-for="(item,index) in mails"
        @click="show(index)"
        :key="index"
      >
        <div class="list_item-sendName flex wrap j-between">
          <div class="flex column j-between">
            <div class="list_item-receiverName">
              <span class="list_item-receiverNameSpan">{{item.mail.aliasName}}</span>
              <span>收</span>
            </div>
            <div class="list_item-content ">
              <span>{{item.mail.content}}</span>
            </div>
          </div>
          <div class="flex">
            <img
              class="mail-svg"
              src="/static/svgs/stamp.svg"
              alt=""
            >
          </div>
        </div>

        <div class="list_item-sendName flex j-end">
          <span>{{item.mail.creator}}</span>
        </div>
      </div>
    </session>

    <session class="solutionDetail flex center">
      <div
        class="solutionDetailButton flex center"
        @click="solutionDetail"
      >解答者手册</div>
    </session>
  </view>

</template>
<script>
export default {
  data() {
    const days = this.$day().timeQual();
    return {
      days: days,
      aliasName: "阿司匹林",
      mails: [],
      isFocus: true
    };
  },
  methods: {
    async getStory() {
      let res = await this.$request.get("/mail/story");
      this.mails = res.data.list;
    },
    onSolutionLimit() {
      this.$router.push({
        query: { active: "solutionLimit" },
        path: "/pages/detail/index"
      });
    },
    show(index) {
      const { _id: id } = this.mails[index].mail;
      this.$router.push({
        query: { id: id },
        path: "/pages/solution/solutionReply"
      });
    },
    solutionDetail() {
      this.$router.push({
        query: { page: "Solver-Manual" },
        path: "/pages/webview/index"
      });
    }
  },
  onShow() {
    const { user } = getApp().globalData;
    this.aliasName = user.aliasName;
    this.getStory();
  }
};
</script>
<style lang="less" scoped>
@import url(../../styles/mail.less);
.solutionRoomName {
  width: 390rpx;
  height: 204rpx;
  display: block;
  border: 1px solid #ffffff;
  margin: 20rpx 60rpx;
  &_question {
    &-img {
      height: 44rpx;
      width: 44rpx;
    }
  }
}

.solutionDetailButton {
  margin-top: 16rpx;
  border-radius: 23px;
  width: 316rpx;
  height: 92rpx;
  border: 1px solid #ffc86d;
}
.solutionRoomName-day {
  margin-top: 40rpx;
}
.solutionRoomName-aliasName {
  margin-top: 6rpx;
  font-size: 60rpx;
}
.solutionRoomName_question_mail {
  color: #a9a9a9;
  margin-top: 20rpx;
}
</style>

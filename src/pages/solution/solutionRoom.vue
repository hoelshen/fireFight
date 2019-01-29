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
      <Envelope :isRead="item.isRead" :mail="item.mail" v-for="(item,index) in mails" :key="index">
      </Envelope>
    </session>

    <session class="solutionDetail flex center">
      <div class="solutionDetailButton flex center" @click="solutionDetail">解答者手册</div>
    </session>
  </view>

</template>
<script>
import Envelope from "@/components/Envelope";
export default {
  components: {
    Envelope
  },
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

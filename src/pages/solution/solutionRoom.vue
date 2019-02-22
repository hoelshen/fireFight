<template>
  <scroll-view class="scroll" scroll-y>
    <session class="solutionRoomName">
      <div class="solutionRoomName-name">
        <p class="solutionRoomName-day">{{days}}</p>
        <p class="solutionRoomName-aliasName">{{aliasName}}</p>
      </div>
      <div clss="solutionRoomName_question flex j-between">
        <span class="solutionRoomName_question_mail">你今天还可以解答{{replyCount}}个咨询</span>
      </div>
    </session>

    <session class="list">
      <Envelope station="solution" :isRead="item.isRead" :isReplied="item.isReplied" :mail="item.mail" v-for="(item,index) in mails" :key="index">
      </Envelope>
    </session>

    <session class="solutionDetail flex center">
      <div class="solutionDetailButton flex center" @click="solutionDetail">解答者手册</div>
    </session>
  </scroll-view>
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
      aliasName: "",
      replyCount: 1,
      mails: []
    };
  },
  methods: {
    async getStory() {
      let res = await this.$request.get("/mail/story");
      this.mails = res.data.list;
      this.replyCount = res.data.lastRepliedAt ? 0 : 1;
      getApp().globalData.replyCount = this.replyCount;
    },
    onSolutionLimit() {
      this.$router.push({
        query: { active: "solutionLimit" },
        path: "/pages/manual/index"
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
    if (!user.aliasName) {
      this.$request.getUser().then(res => {
        this.aliasName = res.aliasName;
      });
    } else {
      this.aliasName = user.aliasName;
    }
    this.getStory();
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
<style lang="less" scoped>
.scroll {
  height: 100vh;
}

.solutionRoomName {
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

.solutionDetail {
  padding-bottom: 60rpx;
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
  color: #4D495B;
  font-size: 34rpx;
  font-weight:600;
}
.solutionRoomName-aliasName {
  margin: 24rpx 0;
  font-size: 60rpx;
  font-weight:600;
  color:#4D495B;
}
.solutionRoomName_question_mail {
  color: #a9a9a9;
  margin-top: 20rpx;
}
</style>

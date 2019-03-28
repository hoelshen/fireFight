<template>
  <scroll-view
    class="scroll"
    scroll-y
  >
    <session class="solutionRoomName">
      <p class="day">
        {{ days }}
      </p>
      <div class="flex j-start a-center">
        <div class="aliasName">
          {{ aliasName }}
        </div>
        <form
          report-submit="true"
          @submit="returnBadge"
        > 
          <button
            class="aliasNameBtn"
            form-type="submit"
          >
            <image
              v-if="badgeImgUrl"
              class="badgeIconfont"
              :src="badgeImgUrl"
            />
          </button>
        </form>
      </div>
      <div class="flex j-start a-center">
        <span
          v-if="badgeName === '向日葵徽章'"
          class="canSolver"
        >你今天可以解答全部咨询</span>
        <span
          v-else
          class="canSolver"
        >你今天还可以解答 {{ replyCount }} 个咨询</span>
        <button
          class="canSolverBtn"
          @click="badgeExplain"
        >
          <image
            class="iconfont"
            src="/static/svgs/question.svg"
          />
        </button>
      </div>
    </session>

    <session class="list">
      <Envelope
        v-for="(item,index) in mails"
        :key="index"
        station="solution"
        :is-extra="item.isExtra"
        :is-read="item.isRead"
        :is-replied="item.isReplied"
        :mail="item.mail"
      />
    </session>

    <session class="solutionRoomName">
      <div class="tagTitle">
        明天最想看到的话题
      </div>
      <div class="tag">
        {{ tag.name }}
        <div @click="setName(tag)">
          <img
            class="iconfont"
            src="/static/svgs/setName.svg"
            alt=""
          >
        </div>
      </div>
    </session>

    <session class="solutionDetail flex center">
      <div
        class="solutionDetailButton flex center"
        @click="solutionDetail"
      >
        解答者手册
      </div>
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
    const days = this.$day().greeting();
    return {
      days: days,
      aliasName: "",
      replyCount: 1,
      mails: [],
      badgeImgUrl: "",
      badgeName: "",
      tag: {}
    };
  },
  methods: {
    async getStory() {
      let res = await this.$request.get("/mail/story");
      this.mails = res.data.list;
      this.replyCount = res.data.replyCount;
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
    },
    returnBadge(e){
      this.$request.saveFormid(e.detail.formId);
      this.$router.push({ path: "/pages/badge/badge"});
    },
    badgeExplain(){
      this.$router.push({ path: "/pages/badge/badgeExplain"})
    },
    getBadge() {
      this.$request.get("/badge/mine").then(res => {
        this.badgeImgUrl = res.data.imgUrl;
        this.badgeName = res.data.name;
      });
    },
    setName(tag){
     this.$router.push({
        query: {
            id: tag._id,
            name: tag.name
        },
        path: "/pages/solution/tags"
      });
    },
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
    this.tag = user.tag;
    this.getBadge();
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

.solutionDetail {
  padding-bottom: 60rpx;
}

.solutionRoomName{
  display: block;
  border: 1px solid #ffffff;
  margin: 40rpx 40rpx;
}
.solutionDetailButton {
  margin-top: 16rpx;
  border-radius: 23px;
  width: 316rpx;
  height: 92rpx;
  border: 1px solid #ffc86d;
}
.day {
  color: #4D495B;
  font-size: 32rpx;
  font-weight:600;
}
.aliasName {
  margin: 24rpx 0;
  font-size: 60rpx;
  font-weight:600;
  color:#4D495B;

}
.aliasNameBtn{
    margin:0;
    padding:0;
    line-height:0;
    margin-left: 20rpx;

}
.badgeIconfont{
  width: 60rpx;
  height: 60rpx;
}

.canSolver {
  color: #a9a9a9;
  margin-right: 20rpx;
}
.canSolverBtn{
  padding:0;
  margin:0;
  line-height:0;
}

.tagTitle{
  font-size: 28rpx;
  color: #4D495B;
}
.tag{
  font-size: 24rpx;
  color: #BDBDC0;
}
</style>

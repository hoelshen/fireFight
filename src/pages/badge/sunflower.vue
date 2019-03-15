<template>
  <view class="ticket flex column j-between">
    <div>
      <p class="title">
      Hey,Tellers
      </p>
      <p class="content">
      来看另一枚特殊的徽章：向日葵
      </p>
      <p class="content"> 向日葵代表着一种精神，追寻阳光，并活成阳光的模样。或许无法照耀你，但映入眼帘时，仍能让你感到温暖。我们希望，持有向日葵徽章的也是这样的人。</p>
      <p  class="content">持有向日葵徽章，你每天解答咨询的次数将不再受到限制，便于你帮助到更多需要温暖的人。</p>
      <p  class="content">你需要发自内心喜爱 Tell 这个社区，同时能够真正在「帮助他人」这件事上获取到喜悦和满足。你每天或许要面对更多来自别人的烦恼，因此，你需要一定的乐观精神，并且每天保有一定的时间来解答咨询。</p>
      <p  class="content">同时我们也希望你能够配合 Tell ，对外宣发关于 Tell 相关的活动信息。在 Tell 的用户微信群里，引导新加入的成员，帮助解决群员提出的问题。</p>
      <p  class="content">目前，向日葵徽章采取邀请制和申请制。Tell 团队会在某些情况下直接向优秀的解答者赠予徽章，若不想等待，可在下方主动申请。        
      </p>
      <div class="content">
      <p class="condition">若要申请，首先需满足以下条件:</p>
        <p >
        · 持有碧玉徽章
        </p>
        <p >
        · 最近一周保持活跃
        </p>
        <p >
        · 发自内心喜爱 Tell 社区
        </p>
        <p >
        · 能够真正在帮助他人时得到喜悦和满足
        </p>
      </div>
      <div class="content">
      <p class="condition">向日葵徽章将在下列情形下被回收:</p>
          <p>
          · 连续 7 日未登录 Tell 时
          </p>
          <p >
          · 连续 30 日未获得感谢时
          </p>
          <p >
          · 违反相关使用协定或法律法规 
          </p>
      </div>
      <button class="darkButton" @click="applySunflower()">提交申请</button>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      active: "solution",
      isShowModal: false,
      form:{
        name: "",
        alias: "",
        wechat: "",
        birthday: "",
        howTell: "",
        whyWantL: ""
      }
    };
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  },
  methods: {
    toggle(tab) {
      this.active = tab;
    },
    toReply() {
      this.$router.push({ path: "/pages/solution/solutionRoom" });
    },
    toShare() {
      this.$router.push({ path: "/pages/share/share" });
    },
    applySunflower(){
      this.$router.push({ path: "/pages/badge/applySunflower" });
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.id = query.id;
  }
};
</script>
<style lang="less" scope>
page {
  background-color: #ffffff;
}
.title{
  color: "#4D495B";
  line-height: 52rpx;
  font-size: 32rpx;
  font-weight: 600;
  margin: 60rpx;
}
.condition{
  color: "#4D495B";
  line-height: 52rpx;
  font-size: 32rpx;
  font-weight: 600;
}
.content{
  font-size: 28rpx;
  line-height: 52rpx;
  margin: 60rpx;
}
.darkButton{
  margin-right: 216rpx;
  margin-left: 216rpx;
}
</style>


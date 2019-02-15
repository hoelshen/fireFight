<template>
  <div class="app">
    <div class="prompt flex column center">
      <div class="promptDiv flex column center grow">
        <div class="flex column targer" v-if="active === 'solution'">
          <div>
            您已解答
            <span class="promptSpn">{{targetUser}}</span>的咨询
          </div>
          <span>若被对方感谢，还将获得 1 张邮票</span>
        </div>
        <div class="flex column targer" v-if="active === 'mail'">
          <span>此回信将于 6 小时后</span>
          <div>
            送到
            <span class="promptSpn">{{targetUser}}</span>的信箱
          </div>
        </div>
        <div class="flex column targer" v-if="active === 'story'">
          <span>我们会在每日 22:30 收集咨询箱中的信</span>
        </div>
        <image class="home flex center" src="/static/svgs/focusServer.jpg">
        </image>
        <button class="promptBtn flex column center" open-type="contact">
          <span>关注服务</span>
          <span>被感谢时立即收到通知</span>
          <image class="iconfont" src="/static/svgs/leftArrow.svg" />
        </button>
      </div>
      <button class="darkButton" @click="sure">好的</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      targetUser: "",
      active: ""
    };
  },
  methods: {
    sure() {
      this.$router.reLaunch({
        query: { active: "home" },
        path: "/pages/home/index"
      });
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.targetUser = query.targetUser;
    this.active = query.active;
    const navigationBar = {
      solution: "已解答",
      story: "已提交咨询",
      mail: "已回信",
    };
    wx.setNavigationBarTitle({
      title: navigationBar[this.active]
    });
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
.prompt {
  height: 100vh;
}
.darkButton {
  margin-bottom: 60rpx;
  text-align: center;
  line-height: 92rpx;
  padding: 0 130rpx;
}
.promptDiv{
  position: relative;
}
.targer {
  padding-top: 60rpx;
  font-size: 34rpx;
}
.home{
  margin-top:94rpx;
  width:630rpx;
  height:308rpx;
}
.promptBtn {
  margin-top:112rpx;
  font-weight:600;
  position:absolute;
  background-color:transparent;
  label{
    line-height: 52rpx
  }
}
.promptSpn {
  font-weight: 600;
  line-height: 52rpx;
  margin: 0 10rpx;
}
</style>


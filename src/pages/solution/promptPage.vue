<template>
  <div class="app">
    <div class="prompt flex column center">
      <div class="promptDiv flex column center grow">
        <button class="promptBtn" open-typ="contact">
          <span>关注服务</span>
          <span>被感谢时立即收到通知</span>
        </button>
        <div class="flex column targer">
          您已解答的咨询
          <span calss="promptSpn">{{targetUser}}</span>
          <span>若被对方感谢，还将获得 1 张邮票</span>
        </div>
      </div>
      <button class="addButton" @click="sure">好的</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      targetUser: ""
    };
  },
  methods: {
    sure() {
      this.$router.push("/pages/home/index");
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.targetUser = query.targetUser;
  }
};
</script>
<style lang="less" scoped>
.prompt {
  height: 100vh;
}
.addButton {
  margin-bottom: 60rpx;
  text-align: center;
  line-height: 92rpx;
  padding: 0 130rpx;
}
.target {
  padding-top: 60rpx;
}
.promptBtn {
  font-weight: 600;
  padding: 60rpx 73rpx;
}
.promptSpn {
  font-weight: 600;
  line-height: 52rpx;
}
</style>


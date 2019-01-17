<template>
  <div class="bar box flex a-center j-between">
    <!-- TODO:封装一层Button -->
    <image class="mail" src="/static/svgs/mail_tab.svg" />
    <image class="home" src="/static/svgs/home_tab.svg" />
    <image class="mine" src="/static/svgs/mine_tab.svg" />
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    showBack: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },

  methods: {
    // TODO:点击跳转
  }
};
</script>

<style lang="less">
.bar {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 124rpx;
  width: 100%;
  color: #2a2a2a;
  background: #fff;
  padding: 32rpx 86rpx;
  z-index: 10;
  .mail {
    width: 45rpx;
    height: 30rpx;
  }
  .home{
    width: 48rpx;;
    height: 44rpx;;
  }
  .mine{
    width: 32rpx;;
    height: 40rpx;;
  }
}
</style>

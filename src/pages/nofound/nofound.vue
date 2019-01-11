<template>
  <div class="nofound flex column">

    <div class="tips flex center column">
      <div class="desc">邮差迷路了，正在重新导航...</div>
    </div>
    <div class="btns flex column center box">
      <button class="flex center" :class="isDisable ? 'disable' :''" @tap="toBack">返回首页</button>
      <div class="time">
        <span v-if="isDisable">{{time}}秒</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisable: true,
      time: 10,
      hash: null
    };
  },
  methods: {
    coutDown() {
      if (this.time <= 1) {
        clearInterval(this.hash);
        this.isDisable = false;
      } else {
        this.time = this.time - 1;
      }
    },
    toBack() {
      if (this.isDisable) {
        return false;
      }
      wx.reLaunch({
        url: "/pages/home/index"
      });
    }
  },
  onUnload() {
    this.time = 9;
    this.hash = null;
    this.isDisable = true;
  },
  onShow() {
    this.hash = setInterval(this.coutDown, 1000);
  }
};
</script>

<style scoped lang="less">
.nofound {
  height: 100vh;
  background: #81cbe2;
  color: #fff;
  .tips {
    font-size: 44rpx;
    margin: 200rpx 0;
  }
  .desc{
    margin-bottom: 80rpx;
  }
  img{
    width: 750rpx;
    height: 420rpx;
  }
  .btns {
    .tips {
      color: #5b5b5b;
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }
    button {
      width: 480rpx;
      height: 100rpx;
      color: #fff;
      font-size: 28rpx;
      border-radius: 16rpx;
      &.disable {
        background: #dbdbdb;
      }
    }
  }
}

.time {
  height: 30rpx;
  margin-top: 10rpx;
  font-size: 28rpx;
}
</style>

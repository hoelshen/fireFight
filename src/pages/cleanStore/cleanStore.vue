<template>
  <div class="noFound flex column">
    <div class="flex center column">
      <div class="desc">
        店面清扫中
      </div>
      <div class="time">
        预计于 {{ time }}  完成
      </div>
      <div class="wait">
        稍后再来吧
      </div>
      <img
        src="/static/jpg/cleanStore.png"
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "13:00"
    };
  },
};
</script>

<style scoped lang="less">
.noFound {
  height: 100vh;
  background: #fff;
  color: #4d495b;
  line-height: 52rpx;
  .desc {
    margin-top: 100rpx;
    font-size: 60rpx;
    font-weight: bold;
  }
  img {
    margin-top: 40rpx;
    width: 400rpx;
    height: 400rpx;
  }
}
.wait{
  font-size: 32rpx;
}
.time {
  margin-top: 40rpx;
  font-size: 32rpx;
}
</style>

<template>
  <div class="information-page flex column">
    <div class="information-container">
      <image
        class="icon mrg-b-40"
        src="/static/png/left-arrow.png"
      />
      <div class="warn mrg-b-40">
        确认当前场所是否发生告警事件？
      </div>
      <div class="content mrg-center pdd-40">
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div>设备：宁泰家园设备1号</div>
        </div>
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div>设备：宁泰家园设备1号</div>
        </div>
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div>设备：宁泰家园设备1号</div>
        </div>
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div>设备：宁泰家园设备1号</div>
        </div>
        <div class="confirm tex-center mrg-center">
          确认
        </div>
        <image />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          tab: 'home'
      }
  },
  onLoad(opt) {
  },
  onShow() {
  },

  methods: {
  }
  }
</script>
<style lang="less" scoped>
.information-page {
  height: 100vh;
  .information-container{
      height: 100%;
      background: #1D7FFD;
      padding: 20rpx 25rpx 0;
      color: #fff;
    .icon{
        width: 26rpx;
        height: 36rpx;
    }
    .warn{
        font-weight:bold;
        font-size: 40rpx;
    }
    .content {
        // width:702rpx;
        height:1000rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:10px;
        color: #3E4A59;
        image{
            width: 36rpx;
            height: 36rpx;
        }
        .confirm{
            width: 479rpx;
            height: 80rpx;
            line-height: 80rpx;
            border-radius: 50rpx;
            color: #fff;
            margin-top: 300rpx;
            background:linear-gradient(270deg,#1E99EB 0%,#3055FD 100%);
        }
    }
  }
}
</style>
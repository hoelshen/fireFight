<template>
  <div class="card" @tap="toMail">
    <div class="lock-mask flex center column" v-if="lock">
      <img src="https://cdn.tellers.cn/stronger/icon_lock.svg" alt class="lock">
      <div class="text">
        <div class="line">需分享自己的故事</div>
        <div class="line">并获得至少10次查看</div>
      </div>
    </div>
    <div class="content" :class="lock ? 'lock':''">
      <div class="user flex a-center">
        <img :src="mail.aliasPortrait" alt class="left">
        <div class="right flex j-center column">{{mail.aliasName}}</div>
      </div>

      <div class="summary">{{mail.content}}</div>

      <div class="data">
        <div class="number flex j-end">
          <div class="item flex a-center">
            <img src="https://cdn.tellers.cn/stronger/icon_view.svg" alt class="icon view">
            {{mail.readCount}}
          </div>

          <div class="item flex a-center">
            <img src="https://cdn.tellers.cn/stronger/icon_hungs.svg" alt class="icon hungs">
            {{mail.hugCount}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailCard",
  props: {
    mail: {
      type: Object,
      required: true
    },
    lock: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    toMail() {
      if (this.lock) {
        return false;
      }
      let _id = this.mail._id;
      wx.navigateTo({
        url: `/pages/stronger-mail/index?_id=${_id}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  position: relative;
  margin-bottom: 40rpx;
  padding: 30rpx;
  background: #fff;
  box-shadow: 0 0 20rpx 0 rgba(171, 171, 171, 0.3);

  .content {
    filter: none;
    &.lock {
      -webkit-filter: blur(16rpx);
      filter: blur(16rpx);
    }
  }
  .user {
    font-size: 28rpx;
    margin-bottom: 20rpx;
  }
  .left {
    width: 50rpx;
    height: 50rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
  }
  .right {
    line-height: 1.8;
  }

  .number {
    color: #c0c6cc;
    font-size: 28rpx;
    margin-top: 30rpx;
    .item {
      width: 90rpx;
    }
    .icon {
      margin-right: 12rpx;
      &.view {
        width: 12rpx;
        height: 20rpx;
      }
      &.hungs {
        width: 16rpx;
        height: 20rpx;
      }
    }
  }
  .summary {
    margin-top: 30rpx;
    line-height: 1.8;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}

.lock-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  z-index: 2;
  .lock {
    width: 100rpx;
    height: 100rpx;
  }
  .text {
    margin-top: 40rpx;
    .line {
      color: #353535;
      line-height: 48rpx;
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="list_item flex column j-between" :class="isRead ? 'read' :''" @tap="toMail">
    <div class="list_item-sendName flex wrap j-between">
      <div class="flex column j-between">
        <div class="list_item-receiverName">
          <span class="list_item-receiverNameSpan">{{mail.targetUserName}}</span>
          <span>收</span>
        </div>
        <div class="list_item-content ">
          <span>{{mail.content}}</span>
        </div>
      </div>
      <div class="flex">
        <img class="mail-svg" src="/static/svgs/stamp.svg" alt="">
      </div>
    </div>
    <div class="list_item-sendName flex j-between">
      <span>{{isRead ? '已读' :''}}</span>
      <span>{{mail.aliasName}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Envelope",
  props: {
    mail: {
      type: Object,
      requred: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    dialogId: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    toMail() {
      if (this.dialogId) {
        this.$router.push({
          query: { id: this.dialogId },
          path: "/pages/mail/mailDetail"
        });
      } else {
        this.$router.push({
          query: { id: this.mail._id },
          path: "/pages/solution/solutionReply"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.list_item {
  margin: 40rpx 60rpx;
  padding: 20rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  color: #4d495b;
  &.read {
    color: #bdbdc0;
  }
  &-receiverName {
    display: inline-block;
  }
  &-receiverNameSpan {
    margin-right: 10rpx;
    margin-top: 20rpx;
  }
  &-content {
    margin-top: 18rpx;
    font-size: 34rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    width: 350rpx;
  }
  &-sendName {
    margin-top: 18rpx;
    font-size: 28rpx;
    margin: 20rpx;
  }
}

.mail-svg {
  width: 120rpx;
  height: 120rpx;
}
</style>
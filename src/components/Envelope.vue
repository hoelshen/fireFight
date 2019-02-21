<template>
  <view class="list_item flex column j-between" :class="isRead ? 'read' :''" @tap="toMail">
    <view class="list_item-sendName flex wrap j-between">
      <view class="flex column j-between">
        <view class="list_item-receiverName">
          <span class="list_item-receiverNameSpan">{{mail.targetUserName}}</span>
          <span v-if="!mail.fromSystem">收</span>
        </view>
        <view class="list_item-content ">
          <span>{{mail.fromSystem ? mail.title :mail.content}}</span>
        </view>
      </view>
      <view class="flex">
        <image class="mail-svg" src="/static/svgs/stamp.svg"/>
      </view>
    </view>
    <view class="list_item-sendName flex j-between">
      <view>{{isReplied ? '已回复' : ''}}</view>
      <view>{{mail.aliasName}}</view>
    </view>
  </view>
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
    isReplied: {
      type: Boolean,
      default: false
    },
    station:{
      type: String,
    },
    dialogId: {
      type: String
    }
  },
  data() {
    return {};
  },
  created(){
    console.log(this.mail);
  },
  methods: {
    toMail() {
      if (this.station === 'dialogId') {
        this.$router.push({
          query: { id: this.dialogId },
          path: "/pages/mail/mailDetail"
        });
      } 
      if (this.station === 'solution') {
        this.$router.push({
          query: { id: this.mail._id },
          path: "/pages/solution/solutionReply"
        });
      } 
      if(this.station === 'memory') {
        console.log('memory');
        this.$router.push({
          query:{id: this.mail._id},
          path: "/pages/memory/detail"
        })
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
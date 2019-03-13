<template>
  <view class="list_item flex column j-between" :class="isRead ? 'read' :''" @tap="toMail">
    <view class="list_item_sendName flex wrap j-between">
      <view class="flex column j-between">
        <view class="list_item_receiverName">
          <span class="list_item_receiverNameSpan">{{mail.targetUserName}}</span>
          <span v-if="!mail.fromSystem">收</span>
        </view>
        <view class="list_item_content ">
          <span>{{mail.fromSystem ? mail.title :mail.content}}</span>
        </view>
      </view>
      <view class="flex">
        <image class="mail-svg" src="/static/svgs/stamp.svg"/>
      </view>
    </view>
    <view class="flex j-between list_item_alias" >
      <view v-if="isExtra" :class="isExtra ? 'list_item_extra' : '' ">{{isExtra ? '可额外回复的信' : ''}}</view>
      <view v-else :class="isReplied ? 'list_item_replied' : '' ">{{isReplied ? '已回复' : ''}}</view>
      <view >{{mail.aliasName}}</view>
    </view>
    <view  class="context" v-if="showRefer && remoteReferContent">
      {{remoteReferContent}}
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
    isExtra:{
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
    },
    showRefer:{
      type: Boolean,
      default: false
    },
    referMail:{
      type: Object
    }
  },
  data() {
    return {
      remoteReferContent:""
    };
  },
  created(){
    if (!this.mail.targetMail){
      return true;
    }
    if(this.referMail) return this.remoteReferContent = this.referMail.content;
    let referMailId = this.mail.targetMail;
    this.$request.get(`/mail/detail/${referMailId}`).then((res)=>{
      this.remoteReferContent = res.data.content;
    })
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
  margin: 40rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  color: #4d495b;
  &.read {
    color: #bdbdc0;
  }
  &_receiverName {
    display: inline-block;
  }
  &_receiverNameSpan {
    margin-right: 20rpx;
  }
  &_content {
    margin-top: 40rpx;
    font-size: 32rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    width: 350rpx;
  }
  &_sendName {
    font-size: 28rpx;
    padding: 40rpx
  }
  &_replied{
    border-radius: 4rpx;
    font-size: 24rpx;
    padding: 4rpx 12rpx;
    background-color: #BDBDC0;
    color: #ffffff;
  }
  &_extra{
    border-radius: 4rpx;
    font-size: 24rpx;
    padding: 4rpx 12rpx;
    background-color: #ffc86d;
    color: #ffffff;
  }
  &_alias{
    margin:40rpx 0;
    padding: 0 40rpx
  }
}
.context{
  font-size:28rpx;
  overflow:hidden;
  padding:40rpx 40rpx;
  border-top-color: #BDBDC0;
  border-top-style: solid;
  border-top-width: 2rpx;
  text-overflow:ellipsis;
  white-space:nowrap;
  color: #BDBDC0;
}
.mail-svg {
  width: 120rpx;
  height: 120rpx;
}
</style>
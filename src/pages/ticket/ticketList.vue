<template>
  <view class="ticket flex column j-between">
    <div class="list" style="margin-left:0">
      <div class="ticketList flex j-between" @tap="ticketDetail('ticket')">
        <div class="flex center">
          <image class="iconfont" src="/static/svgs/solutionNum.svg">
          <span class="my_contact_item-text">邮票</span>
        </div>
        <div class="flex center">
          <button class="btnStyle btnWidth flex center" @click="mailTicket">{{stampCount}}</button>
          <image style="margin-left:36rpx" class="iconfont" src="/static/svgs/arrow.svg">
        </div>
      </div>
      <div class="solutionList flex j-between" @tap="ticketDetail('stamp')">
        <div class="flex center">
          <image class="iconfont" src="/static/svgs/mailNum.svg">
          <span class="my_contact_item-text">解忧券</span>
        </div>
        <div class="flex center">
          <button class="btnStyle btnWidth flex center" @click="solutionTicket">{{ticketCount}}</button>
          <image style="margin-left:36rpx" class="iconfont" src="/static/svgs/arrow.svg">
        </div>
      </div>
    </div>

    <div class="ticketDetail">
      <button class="darkButton" @click="ticketDetail">票券明细</button>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: {},
      stampCount: 1,
      ticketCount: 1
    };
  },
  methods: {
    getList() {
      const { user } = getApp().globalData;
      this.stampCount = user.stampCount;
      this.ticketCount = user.ticketCount;
    },
    ticketDetail(tab = "ticket") {
      this.$router.push({ path: "/pages/ticket/ticketDetail" });
    }
  },
  onShow() {
    this.getList();
  }
};
</script>
<style lang="less">
.ticket {
  width: 630rpx;
  min-height: 100vh;
  margin: auto;
  color: #4d495b;
}
.ticketList {
  width: 630rpx;
  height: 132rpx;
}
.solutionList {
  width: 630rpx;
  height: 132rpx;
}
.ticketDetail {
  margin: 60rpx auto;
}
.my_contact_item-text {
  margin-left: 20rpx;
}
.btnStyle {
  background-color: #ffffff;
  border: 1px solid #ffc86d;
  border-radius: 23px;
  font-size: 28rpx;
}
.btnWidth {
  height: 56rpx;
}
.iconfont {
  width: 32rpx;
  height: 32rpx;
}
.addButton {
  font-size: 28rpx;
}
</style>


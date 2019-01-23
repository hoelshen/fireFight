<template>
  <view class="ticket flex column j-between">
    <div class="list">
      <div class="ticketList  flex j-between center">
        <div class="iconfont icon-gift"></div>
        <span class="my_contact_item-text">邮票</span>
        <button
          class="btnStyle btnWidth  flex center"
          @click="mailTicket"
        >{{mailNum}}
        </button>
      </div>
      <div class="solutionList flex j-start center">
        <div class="iconfont icon-gift"></div>
        <span class="my_contact_item-text">解忧券</span>
        <button
          class="btnStyle btnWidth flex center"
          @click="solutionTicket"
        >{{solutionNum}}
        </button>
      </div>
    </div>

    <div class="ticketDetail">
      <button
        class="btnStyle"
        @click="ticketDetail"
      >票券明细</button>
    </div>
  </view>

</template>
<script>
export default {
  data() {
    return {
      list: {},
      mailNum: 12,
      solutionNum: 1
    };
  },
  methods: {
    async getList() {
      let res = await this.$request.get("/ticketList");
      this.mailNum = res.data.mailNum;
      this.solutionNum = res.data.solutionNum;
    },
    mailTicket() {},
    solutionTicket() {}
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
  width: 316rpx;
  height: 92rpx;
  margin: 30rpx auto;
}
.btnStyle {
  background-color: #ffffff;
  border: 1px solid #ff4d6b;
  border-radius: 23px;
}
.btnWidth {
  //   width: 126rpx;
  height: 56rpx;
}
</style>


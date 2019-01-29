<template>
  <view class="ticket flex column j-between">
    <div
      class="list"
      style="margin-left:0"
    >
      <div class="ticketList  flex j-between">
        <div class="flex center">
          <div class="iconfont icon-gift"></div>
          <span class="my_contact_item-text">邮票</span>
        </div>
        <div class="flex center">
          <button
            class="btnStyle btnWidth  flex center"
            @click="mailTicket"
          >{{mailNum}}
          </button>
          <div
            style="margin-left:36rpx"
            class="iconfont icon-gift"
          ></div>
        </div>
      </div>
      <div class="solutionList flex j-between ">
        <div class="flex center">
          <div class="iconfont icon-gift"></div>
          <span class="my_contact_item-text ">解忧券</span>
        </div>
        <div class="flex center">
          <button
            class="btnStyle btnWidth flex center "
            @click="solutionTicket"
          >{{solutionNum}}
          </button>
          <div
            style="margin-left:36rpx"
            class="iconfont icon-gift"
          ></div>
        </div>
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
      const { user } = getApp().globalData;
      console.log("user: ", user);
    },
    mailTicket() {
      this.$router.push({
        query: { active: "mail" },
        path: "/pages/ticket/ticketDetail"
      });
    },
    solutionTicket() {
      this.$router.push({
        query: { active: "solution" },
        path: "/pages/ticket/ticketDetail"
      });
    },
    ticketDetail() {
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
.my_contact_item-text {
  margin-left: 20rpx;
}
.btnStyle {
  background-color: #ffffff;
  border: 1px solid #ffc86d;
  border-radius: 23px;
}
.btnWidth {
  height: 56rpx;
}
</style>


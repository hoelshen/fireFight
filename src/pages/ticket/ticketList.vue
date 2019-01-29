<template>
  <view class="ticket flex column j-between">
    <div
      class="list"
      style="margin-left:0"
    >
      <div class="ticketList  flex j-between">
        <div class="flex center">
          <image
            class="iconfont"
            src="/static/svgs/solutionNum.svg"
          />
          <span class="my_contact_item-text">邮票</span>
        </div>
        <div class="flex center">
          <button
            class="btnStyle btnWidth  flex center"
            @click="mailTicket"
          >{{stampCount}}
          </button>
          <image
            style="margin-left:36rpx"
            class="iconfont"
            src="/static/svgs/arrow.svg"
          />
        </div>
      </div>
      <div class="solutionList flex j-between ">
        <div class="flex center">
          <image
            class="iconfont"
            src="/static/svgs/mailNum.svg"
          />
          <span class="my_contact_item-text ">解忧券</span>
        </div>
        <div class="flex center">
          <button
            class="btnStyle btnWidth flex center "
            @click="solutionTicket"
          >{{ticketCount}}
          </button>
          <image
            style="margin-left:36rpx"
            class="iconfont"
            src="/static/svgs/arrow.svg"
          />
        </div>
      </div>
    </div>

    <div class="ticketDetail">
      <button
        class="addButton"
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
      stampCount: 1,
      ticketCount: 1
    };
  },
  methods: {
    async getList() {
      const { user } = getApp().globalData;
      this.stampCount = user.stampCount;
      this.ticketCount = user.ticketCount;
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


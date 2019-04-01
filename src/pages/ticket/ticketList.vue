<template>
  <view class="ticket flex column j-between">
    <div
      class="list"
      style="margin-left:0"
    >
      <div
        class="ticketList flex j-between"
        @tap="welfareDetail('STAMP')"
      >
        <div class="flex center">
          <image
            class="iconfont"
            src="/static/svgs/stamp-icon.svg"
          />
          <span class="my_contact_item-text">邮票</span>
        </div>
        <div class="flex center">
          <div class="btnStyle flex center">
            {{ stampCount }}
          </div>
          <image
            class="iconfont"
            src="/static/svgs/arrow.svg"
          />
        </div>
      </div>
      <div
        class="solutionList flex j-between"
        @tap="welfareDetail('TICKET')"
      >
        <div class="flex center">
          <image
            class="iconfont"
            src="/static/svgs/ticket.svg"
          />
          <span class="my_contact_item-text">解忧券</span>
        </div>
        <div class="flex center">
          <div class="btnStyle flex center">
            {{ ticketCount }}
          </div>
          <image
            class="iconfont"
            src="/static/svgs/arrow.svg"
          />
        </div>
      </div>
    </div>

    <div class="ticketDetail">
      <button
        class="darkButton"
        @click="ticketDetail"
      >
        票券明细
      </button>
    </div>
  </view>
</template>
<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      list: {},
      stampCount: 0,
      ticketCount: 0
    };
  },
  methods: {
    getList() {
      this.$request.getUser().then(res => {
        this.stampCount = res.stampCount;
        this.ticketCount = res.ticketCount;
      });
    },
    ticketDetail(tab = "ticket") {
      this.$router.push({ path: "/pages/ticket/ticketDetail" });
    },
    welfareDetail(active){
      this.$router.push({ query: { active: active },path: "/pages/welfare/index" });
    }
  },
  onShow() {
    this.getList();
  }
};
</script>
<style lang="less">
page{
  background-color: #ffffff;
}
.ticket {
  margin: 40rpx;
  min-height: 100vh;
  color: #4d495b;
}
.ticketList {
  height: 132rpx;
}
.solutionList {
  height: 132rpx;
}
.ticketDetail {
  margin: 60rpx auto;
}
.my_contact_item-text {
  margin-left: 20rpx;
  font-size: 32rpx;
  color: #4D495B;
}
.btnStyle {
  background-color: #FFFEFB;
  color: #BDBDC0;
  height: 56rpx;
  font-size: 32rpx;
  margin-right: 22rpx;
}

.addButton {
  font-size: 28rpx;
}
.darkButton{
  padding: 26rpx 102rpx;
  line-height:46rpx;
}
</style>


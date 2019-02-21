<template>
  <view class="ticket flex column j-between">
    <div class="list" style="margin-left:0">
      <div class="ticketList flex j-between" @tap="welfareDetail('mail')">
        <div class="flex center">
          <image class="iconfont" src="/static/svgs/solutionNum.svg"/>
          <span class="my_contact_item-text">邮票</span>
        </div>
        <div class="flex center">
          <button class="btnStyle btnWidth flex center" @click="mailTicket">{{stampCount}}</button>
          <image style="margin-left:74rpx" class="iconfont" src="/static/svgs/arrow.svg"/>
        </div>
      </div>
      <div class="solutionList flex j-between" @tap="welfareDetail('solution')">
        <div class="flex center">
          <image class="iconfont" src="/static/svgs/mailNum.svg"/>
          <span class="my_contact_item-text">解忧券</span>
        </div>
        <div class="flex center">
          <button class="btnStyle btnWidth flex center" @click="solutionTicket">{{ticketCount}}</button>
          <image style="margin-left:74rpx" class="iconfont" src="/static/svgs/arrow.svg"/>
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
    },
    welfareDetail(active){
      this.$router.push({ query: { active: active },path: "/pages/welfare/index" });
    }
  },
  onShow() {
    this.getList();
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  }
};
</script>
<style lang="less">
page{
  background-color: #ffffff;
}
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
  background-color: #FFFEFB;
  color: #BDBDC0;
  font-size: 28rpx;
}
.btnWidth {
  height: 56rpx;
}

.addButton {
  font-size: 28rpx;
}
.darkButton{
  padding: 26rpx 102rpx;
  line-height:46rpx;
}
</style>


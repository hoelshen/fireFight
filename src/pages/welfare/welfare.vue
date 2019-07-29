<template>
  <view class="ticket flex column j-between">
    <session class="navigatabar flex j-around">
      <div
        :class="active == 'TICKET' ? 'borderColor' :''"
        class="navigatabar_item   flex center"
        @click="toggle('TICKET')"
      >
        我要解忧券
      </div>
      <div
        :class="active == 'STAMP' ? 'borderColor' :''"
        class="navigatabar_item  flex center"
        @click="toggle('STAMP')"
      >
        我要邮票
      </div>
    </session>
    <session
      v-if="active === 'TICKET'"
      class="list"
    >
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image
            class="iconfont"
            src="/static/svgs/ticket.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">购买解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">使用 9.9 元人民币购买 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button
            class="flex center"
            @click="toPay"
          >
            购买
          </button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex">
          <image
            class="iconfont"
            src="/static/svgs/ticket.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">邮票兑换解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">使用10张邮票兑换 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button           
            :disabled="canExchange"
            class="flex center"
            @click="toExchange"
          >
            兑换
          </button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image
            class="iconfont"
            src="/static/svgs/ticket.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">关注服务号得解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">关注后可免费领取 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange flex center">
          <button
            class="flex center "
            @click="FocusServer"
          >
            去关注
          </button>
        </div>
      </div>

      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image
            class="iconfont"
            src="/static/svgs/ticket.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">关注订阅号得解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">关注后可免费领取 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange flex center">
          <button
            class="flex center "
            @click="FocusSubscript"
          >
            去关注
          </button>
        </div>
      </div>

      <div
        v-for="item in tasks"
        :key="item._id"
        class="list_item flex  j-between "
      >
        <div class="flex ">
          <image
            class="iconfont"
            src="/static/svgs/stamp-icon.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">{{ item.name }}</span>
              <span class="count">×{{ item.rewardCount }}</span>
            </div>
            <span class="welfare_content">{{ item.tipsText }}</span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button
            :disabled="item.isReceived"
            class="flex center"
            @click="doTask(item)"
          >
            {{ item.isReceived ? '已完成' : '去领取' }}
          </button>
        </div>
      </div>
    </session>
    <session
      v-if="active === 'STAMP'"
      class="list"
    >
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image
            class="iconfont"
            src="/static/svgs/stamp-icon.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">解答咨询得邮票</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">解答和被感谢均可获得邮票 </span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button
            class="flex center"
            @click="toReply"
          >
            去解答
          </button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image
            class="iconfont"
            src="/static/svgs/stamp-icon.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">分享 Tell 得邮票</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">分享好友加入 Tell 可获得邮票 </span>
          </div>
        </div>
        <div class="exchange flex center">
          <button
            class="flex center "
            @click="toShare"
          >
            去分享
          </button>
        </div>
      </div>
      <div
        v-for="item in tasks"
        :key="item._id"
        class="list_item flex  j-between "
      >
        <div class="flex ">
          <image
            class="iconfont"
            src="/static/svgs/stamp-icon.svg"
          />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">{{ item.name }}</span>
              <span class="count">×{{ item.rewardCount }}</span>
            </div>
            <span class="welfare_content">{{ item.tipsText }}</span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button
            :disabled="item.isReceived"
            class="flex center"
            @click="doTask(item)"
          >
            {{ item.isReceived ? '已完成' : '去领取' }}
          </button>
        </div>
      </div>
    </session>
  </view>
</template>
<script>


import shareMix from "@/mixins/mixin";
export default {
  components: {
 
  },
  mixins: [shareMix],
  data() {
    return {
      active: "TICKET",
      isShowModal: false,
      modal: {
        title: "",
        content: "",
        confirmButtonText: "",
        type: "",
        sureButtonText: ""
      },
      tasks: [],
      canExchange: false //邮票兑换解忧券
    };
  },
  methods: {
    toggle(tab) {
      if (this.active != tab) {
        this.active = tab;
        this.tasks = [];
        this.getTask();
      }
    },
    toReply() {

    },
    async toExchange() {

    },
    async toPay() {
      wx.showLoading({
        title: "",
        mask: true
      });
      let orederRes = await this.$request.post("pay/order");
      if (orederRes.success) {
        let order = orederRes.data;
        wx.requestPayment({
          timeStamp: order.timeStamp,
          nonceStr: order.nonceStr,
          package: order.package,
          signType: order.signType,
          paySign: order.paySign,
          success(res) {
            wx.hideLoading();
            wx.showToast({ title: "购买成功" });
          },
          fail(res) {
            wx.hideLoading();
            wx.showToast({ title: "支付失败", icon: "none" });
          }
        });
      }
    },
    FocusServer() {

    },
    FocusSubscript() {

    },

    doTask(task) {
      if (task.isReceived) return;
    },

  
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.active = query.active || this.active;
    const { taskState } = getApp().globalData;
    const { user } = getApp().globalData;
    this.canExchange = user.ticketCount > 0 ;

    this.taskHandle(taskState || "");
  }
};
</script>
<style lang="less" scope>
page {
  background-color: #ffffff;
}
.list {
  padding: 0 40rpx;
  &_item {
    background-color: #ffffff;
    margin-bottom: 40rpx;
    margin-top: 20rpx;
  }
  .count {
    color: #6eff92;
    margin-left: 8rpx;
    font-weight: 600;
  }
}
.list_item_span {
  font-size: 32rpx;
  color: #4d495b;
}
.exchange {
  margin-left: 40rpx;
  & button {
    box-sizing: border-box;
    border: #6eff92 2rpx solid;
    border-radius: 32rpx;
    height: 64rpx;
    width: 168rpx;
    font-size: 28rpx;
    color: #2b2b2b;
    font-weight: 600;
  }
}
.welfare_content {
  margin-top: 12rpx;
  color: #bdbdc0;
  font-size: 24rpx;
}

.iconfont {
  margin-right: 20rpx;
}

.desc {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #bdbdc0;
  font-size: 28rpx;
  padding: 60rpx;
}
button[disabled] {
  color: rgba(77, 73, 91, 0.5) !important;
  border-color: rgba(255, 200, 109, 0.5) !important;
  background-color: #ffffff !important;
}
</style>


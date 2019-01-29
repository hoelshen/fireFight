<template>
  <view class="ticket flex column j-between">
    <session class="navigatabar flex ">
      <div
        @click="toggleSolution"
        :class="{borderColor:isActive}"
        class="navigatabar_item  flex center"
      >我要解忧券</div>
      <div
        @click="toggleMail"
        :class="{borderColor:!isActive}"
        class="navigatabar_item flex center"
      >我要邮票</div>
    </session>
    <session
      class="list"
      v-if="active === 'solution'"
    >
      <div class="list_item flex  j-between ">
        <div class="flex column j-between">
          <div class="flex">
            <span class="list_item_span">邮票兑换解忧券</span>
            <div
              class="iconfont icon-gift"
              style="margin-left:20rpx;"
            >+1</div>
          </div>
          <span>用户可以使用10张邮票兑换1张解忧券</span>
        </div>
        <button
          @click="mailExchange"
          class="flex center"
        >兑换</button>
      </div>
    </session>
    <session
      class="list"
      v-if="active === 'solution'"
    >
      <div class="list_item flex  j-between ">
        <div class="flex column j-between ">
          <div class="flex">
            <span>关注服务号得解忧券</span>
            <div
              class="iconfont icon-gift"
              style="margin-right:20rpx;"
            ></div>
          </div>
          <span>进入客服会话后发送「服务号」，按提示进行操作。关注服务号后即可领取解忧券。</span>
        </div>
        <div class="exchange">
          <button
            @click="helpExchange"
            class="flex center "
          >兑换
          </button>
        </div>
      </div>
    </session>

  </view>

</template>
<script>
export default {
  data() {
    return {
      active: "solution",
      outboxList: [],
      inboxList: [],
      isActive: true,
      list: [
        {
          title: "烦恼咨询",
          day: "2019/1/19",
          num: 2
        },
        {
          title: "连续签到5天奖励",
          day: "2019/1/19",
          num: 9
        }
      ]
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    toggleSolution() {
      this.active = "solution";
      this.isActive = !this.isActive;
      // this.getList();
    },
    toggleMail() {
      this.active = "mail";
      this.isActive = !this.isActive;
      // this.getList();
    },
    helpExchange() {},
    mailExchange() {},
    async getList() {
      let res;
      if (this.active === "solution") {
        // res = await this.$request.get("/mail/mine/outbox"); //解忧券
      }
      if (this.active === "mail") {
        // res = await this.$request.get("/mail/mine/inbox"); //邮票
      }
      // this.list = res.data;
    }
  }
};
</script>
<style lang="less" scope>
.navigatabar {
  width: 630rpx;
  height: 92rpx;
  margin: 20rpx 60rpx 20rpx 60rpx;
  border-radius: 2px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  background-color: #ffffff;
  align-items: flex-end;
  justify-content: space-around;

  &_item {
    width: 162rpx;
    height: 66rpx;
    align-items: flex-end;
    border-style: solid;
    border-color: #ffffff;

    &.borderColor {
      border-color: #ffffff #ffffff #ffc86d #ffffff;
    }
  }
}
.list {
  margin-left: 20rpx;
  border: 1px solid #ffffff;
  width: 100%;
  height: auto;
  &_item {
    width: 630rpx;
    height: 136rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    margin-left: 60rpx;
  }
}
.list_item_span {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
.exchange {
  margin-top: 16rpx;
  border-radius: 23px;
  width: 182rpx;
  height: 92rpx;
  border: 1px solid #FFC86D;
}
</style>


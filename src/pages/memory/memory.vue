<template>
  <view class="app">
    <session class="navigatabar flex ">
      <div
        @click="toggleQuestion"
        :class="{borderColor:isActive}"
        class="navigatabar_item  flex center"
      >我的咨询</div>
      <div
        @click="toggleAnswer"
        :class="{borderColor:!isActive}"
        class="navigatabar_item flex center"
      >我的解答</div>
    </session>

    <session class="list">
      <div
        class="list_item flex column j-between"
        v-for="(item,index) in list"
        @click="show(index)"
        :key="index"
      >
        <div class="list_item-sendName flex wrap j-between">
          <div class="flex column j-between">
            <div class="list_item-receiverName">
              <span class="list_item-receiverNameSpan">{{item.aliasName}}</span>
              <span>收</span>
            </div>
            <div class="list_item-content ">
              <span>{{item.content}}</span>
            </div>
          </div>
          <div class="flex">
            <img
              class="mail-svg"
              src="/static/svgs/mail.svg"
              alt=""
            >
          </div>
        </div>

        <div class="list_item-sendName flex j-end">
          <span>{{item.creator}}</span>
        </div>
      </div>
    </session>

  </view>

</template>
<script>
export default {
  data() {
    return {
      active: "question",
      outboxList: [],
      inboxList: [],
      isActive: true,
      list: []
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    toggleQuestion() {
      this.active = "question";
      this.isActive = !this.isActive;
      this.getList();
    },
    toggleAnswer() {
      this.active = "answer";
      this.isActive = !this.isActive;
      this.getList();
    },
    async getList() {
      let res;
      if (this.active === "question") {
        res = await this.$request.get("/mail/mine/outbox"); //我的咨询
      }
      if (this.active === "answer") {
        res = await this.$request.get("/mail/mine/inbox"); //我的解答
      }
      this.list = res.data;
    },
    show() {
      //this.$router.push()
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
      border-color: #ffffff #ffffff #ff4d6b #ffffff;
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
    height: 280rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    margin-left: 60rpx;
    &-receiverName {
      display: inline-block;
      color: #a9a9a9;
    }
    &-receiverNameSpan {
      margin-right: 10rpx;
      margin-top: 20rpx;
      color: #a9a9a9;
    }
    &-content {
      margin-top: 18rpx;
      font-family: "PingFang SC";
      font-size: 34rpx;
    }
    &-sendName {
      margin-top: 18rpx;
      font-size: 28rpx;
      color: #a9a9a9;
    }
  }
}
</style>


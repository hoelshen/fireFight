<template>
  <view class="app">
    <session class="navigatabar flex ">
      <div
        @click="toggleQuestion"
        class="navigatabar_item"
      >我的咨询</div>
      <div
        @clcik="toggleAnswer"
        class="navigatabar_item"
      >我的解答</div>
    </session>

    <session class="list">
      <div
        class="list_item flex column j-between"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="list_item-receiverName">
          <span class="list_item-receiverNameSpan">{{item.receiverName}}</span>
          <span>收</span>
        </div>
        <div class="list_item-content">
          <span></span>{{item.content}}
        </div>
        <div class="list_item-sendName flex j-end">
          <span></span>
          {{item.sendName}}
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
      list: [
        {
          receiverName: "sjh",
          content: "we are family",
          sendName: "shj"
        },
        {
          receiverName: "shy",
          content: "we are family",
          sendName: "syh"
        }
      ]
    };
  },
  onShow() {
    console.log("list", this.list);
  },
  methods: {
    toggleQuestion() {
      this.list = "2";
      this.active = "question";
    },
    toggleAnswer() {
      this.list = "1";
      this.active = "answer";
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


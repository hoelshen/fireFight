<template>
  <view class="app">
    <session class="navigatabar flex ">
      <div class="navigatabar_item">我的咨询</div>
      <div class="navigatabar_item">我的解答</div>

    </session>

    <session class="list">
      <div
        class="list_item flex cloumn"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="list_item-receiverName">
          {{item.receiverName}}
        </div>收
        <div class="list_item-content">
          {{item.content}}
        </div>
        <div class="list_item-sendName">
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
    sjh() {
      cosnole.list("ss");
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
  margin-top: 20rpx;
  margin-left: 20rpx;
  border: 1px solid #ffffff;
  width: 100%;
  height: auto;
  &_item {
    width: 630rpx;
    height: 280rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    &-receiverName {
    }
    &-content {
    }
    &-sendName {
    }
  }
}
</style>


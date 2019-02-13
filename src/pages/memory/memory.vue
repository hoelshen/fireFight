<template>
  <view class="app">
    <session class="navigatabar flex ">
      <div @click="toggleQuestion" :class="{borderColor:isActive}" class="navigatabar_item  flex center">我的咨询</div>
      <div @click="toggleAnswer" :class="{borderColor:!isActive}" class="navigatabar_item flex center">我的解答</div>
    </session>
    <session class="list">
      <Envelope station="memory" :mail="item" v-for="(item,index) in list" :key="index">
      </Envelope>
    </session>
  </view>
</template>
<script>
import Envelope from "@/components/Envelope";
export default {
  components: {
    Envelope
  },
  data() {
    return {
      active: "question",
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
    }
  }
};
</script>
<style lang="less" scope>
.navigatabar {
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
      color: #ffc86d;
      border-color: #ffffff #ffffff #ffc86d #ffffff;
    }
  }
}
</style>


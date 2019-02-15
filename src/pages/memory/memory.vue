<template>
  <view class="app">
    <session class="navigatabar flex ">
      <div @click="toggleQuestion" :class="{borderColor:isActive}" class="navigatabar_item  flex center">我的咨询</div>
      <div @click="toggleAnswer" :class="{borderColor:!isActive}" class="navigatabar_item flex center">我的解答</div>
    </session>
    <session class="list">
      <Envelope station="memory" :mail="item" v-for="(item,index) in list" :key="index">
      </Envelope>
      <div v-if="list.length === 0" class="noMail flex center">
        暂无记忆
      </div>
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
<style lang="less" scope>
.noMail{
  height: 400rpx;
  margin: 80rpx
}
</style>


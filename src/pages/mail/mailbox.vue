<template>
  <view class="app">
    <div class="mailbox_title" v-if="num">
      <button @click="openMail">{{num}}封信正在路上</button>
    </div>
    <div class="noMail" v-if="this.list.length===0">您的信箱没有信，你可以去发表我的故事。</div>
    <Tlist v-if="list" :list="list"></Tlist>
  </view>
</template>
<script>
import Tlist from "@/components/Tlist";
export default {
  components: {
    Tlist
  },
  data() {
    return {
      num: 0,
      list: []
    };
  },
  onShow() {
    this.getList();
    this.getCount();
  },
  methods: {
    openMail() {
      this.$router.push({ path: "/pages/mail/mailDay" });
    },
    async getCount() {
      const res = await this.$request.get("/dialog/way/count");
      this.num = res.data;
    },
    async getList() {
      const res = await this.$request.get("/dialog");
      this.list = res.data;
    }
  }
};
</script>
<style lang="less">
.mailbox_title {
  width: 266rpx;
  height: 92rpx;
  border-radius: 23px;
  margin: auto;
  padding-top: 40rpx;
  & button {
    border: 1px solid #ffc86d;
    border-radius: 23px;
    font-size: 28rpx;
  }
}
.noMail {
  padding: 40rpx 40rpx;
  margin: auto;
}
.mailText {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

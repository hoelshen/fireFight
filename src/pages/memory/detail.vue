<template>
  <view class="app box">
    <Mail :mail="item" v-for="item in list" :key="item._id"></Mail>
  </view>
</template>


<script>
import Mail from "@/components/Mail";

export default {
  components: {
    Mail
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getContent(id) {
      let res = await this.$request.get(`/mail/detail/${id}/link`);
      this.list = res.data;
    },
  },
  async onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.id = query.id;
    this.getContent(this.id);
  }
};
</script>
<style lang="less">
.app {
  padding: 40rpx 60rpx;
}
.showReply_button {
  color:#ffffff;
  margin-bottom: 60rpx;
}
.replay_text {
  color: #a9a9a9;
  font-size: 24rpx;
  margin-top: 24rpx;
}
.reply_button {
  margin-top: 60rpx;
  border-radius: 23px;
  width: 316rpx;
  line-height: 92rpx;
  color: #ffffff;
  border: 1 solid #a9a9a9;
  background-color: #ffc86d;
  font-size: 28rpx;
}
</style>

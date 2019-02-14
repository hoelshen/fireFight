<template>
  <view class="app box">
    <Mail :mail="item" v-for="item in list" :key="item._id"></Mail>
    <Mail :mail="currentMail" v-if="currentMail"></Mail>
    <!-- <Mail :mail="replyMail" v-if="replyMail"> </Mail> -->
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
      currentMail: null,
      replyMail: null,
      list: []
    };
  },
  methods: {
    async getCurrentMail(id) {
      let res = await this.$request.get(`/mail/detail/${id}`);
      this.currentMail = res.data;
    },
    // async getReplyMail(id) {
    //   let res = await this.$request.get(`/mail/detail/${id}/reply`);
    //   this.replyMail = res.data;
    // },
    async getTargetLink(id) {
      let res = await this.$request.get(`/mail/detail/${id}/link`);
      this.list = res.data || [];
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.id = query.id;
    this.getCurrentMail(this.id);
    this.getTargetLink(this.id);
    //this.getReplyMail(this.id);
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
.app {
  padding: 40rpx 60rpx;
}
.showReply_button {
  color: #ffffff;
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

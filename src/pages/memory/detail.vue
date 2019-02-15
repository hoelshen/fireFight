<template>
  <view class="app box">
    <div class="new" v-if="mailList">
      <Mail :mail="newMail" v-for="newMail in mailList" :key="newMail._id"></Mail>
    </div>

    <div class="old" v-else>
      <Mail :mail="oldMail" v-for="oldMail in list" :key="oldMail._id"></Mail>
      <Mail :mail="currentMail" v-if="currentMail"></Mail>
    </div>

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
      mailList: null,
      list: []
    };
  },
  methods: {
    async getCurrentMail(id) {
      let res = await this.$request.get(`/mail/detail/${id}`);
      let mail = res.data;
      if (mail.type == "STORY") {
        this.currentMail = mail;
      } else if (mail.targetDialog) {
        this.getTargetDialog(mail.targetDialog);
      } else if (mail.targetLink) {
        this.currentMail = mail;
        this.getTargetLink(id);
      }
    },
    async getTargetDialog(id) {
      let res = await this.$request.get(`/dialog/detail/${id}`);
      this.mailList = res.data.mailList;
      console.log(this.mailList);
    },
    async getTargetLink(id) {
      let res = await this.$request.get(`/mail/detail/${id}/link`);
      this.list = res.data || [];
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.getCurrentMail(query.id);
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

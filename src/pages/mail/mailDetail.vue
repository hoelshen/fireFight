<template>
  <view class="app list">
    <Mail :mail="item" v-for="item in list" :key="item._id"></Mail>
    <Mail :mail="replyMail" v-if="replyMail"></Mail>
    <Reply v-if="isReply" :target="target" tag="mail" :id="id"></Reply>
    <div class="flex column center showReply_button" v-if="!isReply && !isFromSystem">
      <button :disabled="isDisabled" class="reply_button" @click="showReply"> 回信</button>
      <span class="replay_text">需要使用 1 张邮票</span>
    </div>
  </view>
</template>


<script>
import Mail from "@/components/Mail";
import Reply from "@/components/Reply";

export default {
  components: {
    Mail,
    Reply
  },
  data() {
    const days = this.$day().format("YYYY/MM/DD");
    return {
      id: "",
      userId: "",
      list: [],
      replyMail: null,
      target: {},
      days: days,
      stampCount: 0,
      isReply: false,
      isDisabled: true,
      isFromSystem: false
    };
  },
  methods: {
    async getContent(id) {
      let res = await this.$request.get(`/dialog/detail/${id}`);
      let dialog = res.data;
      let mailList = dialog.mailList;
      let lastMail = mailList[mailList.length - 1];
      this.list = mailList;
      this.target = lastMail.aliasName;
      this.isFromSystem = dialog.fromSystem;
      this.getReplyMail(dialog, lastMail._id);
    },
    getReplyMail(dialog, lastMailId) {
      this.$request.get(`/mail/detail/${lastMailId}/reply`).then(res => {
        if (res.data) {
          this.replyMail = res.data;
          this.isDisabled = true;
        } else {
          this.isDisabled = dialog.fromUser === this.userId ? true : false;
        }
      });
    },
    showReply() {
      if (this.stampCount === 0) {
        return wx.showToast({
          title: "邮票不足",
          icon: "none",
          duration: 2000
        });
      }
      this.isReply = true;
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.id = query.id;
    this.getContent(this.id);
    const { user } = getApp().globalData;
    this.userId = user._id;
    this.stampCount = user.stampCount;
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
<style lang="less" scoped>
.app {
  padding: 40rpx 0rpx;
}
.mail {
  width: 630rpx;
  min-height: 620rpx;
  margin: 81rpx 60rpx 36rpx 60rpx;
}

.reply_button {
  margin-top: 16rpx;
  border-radius: 23px;
  width: 316rpx;
  height: 92rpx;
  color: #ffffff;
  border: 1 solid #a9a9a9;
  background-color: #ffc86d;
}
.replay_text {
  color: #a9a9a9;
  font-size: 24rpx;
  margin-top: 24rpx;
}

.showReply_button {
  margin-bottom: 60rpx;
}
</style>


<template>
  <view class="app">
    <div class="mail box">
      <div class="mail_title">
        <span>Tell烦恼咨询中心</span>
        <span>收</span>
      </div>
      <div class="mail_content">
        {{mail.content}}
      </div>
      <div class="mail_reply">
        <span>{{mail.aliasName}}</span>
        <span>{{mail.createdAt}} {{mail.weather}}</span>
      </div>
    </div>
    <div class="reply_button">
      <button @click="replyMail">回信</button>
      <span>今天还可以回复1次</span>
    </div>
  </view>
</template>


<script>
export default {
  data() {
    return {
      id: "",
      mail: {},
      reply: {
        content: "test",
        weather: "晴"
      }
    };
  },
  methods: {
    async showReply(id) {
      let res = await this.$request.get(`/mail/detail/${id}`);
      this.mail = res.data;
    },
    replyMail() {
      this.$request
        .post(`/mail/story/${this.id}`, {
          content: this.reply.content,
          weather: this.reply.weather
        })
        .then(res => {
          console.log("res", res);
        });
    }
  },
  async onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.id = query.id;
    this.showReply(this.id);
  }
};
</script>
<style lang="less">
.mail {
  width: 630rpx;
  height: 892rpx;
  margin: 81rpx 60rpx 36rpx 60rpx;
}
.mail_title {
}
.mail_content {
}
.mail_reply {
}
.reply_button {
}
</style>


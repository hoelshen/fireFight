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
    <div
      class="replay_content borderColor"
      v-if="isReply"
    >
      <textarea
        class="textArea"
        maxlength="50"
        :value="reply.content"
        @input="bindTextAreaBlur"
      />
      <div class="reply_weather flex column j-end">
        <div class="flex j-end">{{days}}</div>
        <div class="flex j-end">{{reply.weather}}晴</div>
      </div>
      <button
        class="reply_button"
        @click="replyMail"
      >发送</button>
    </div>
    <div class="flex column center" v-if="!isReply">
      <button
        class="reply_button"
        @click="showReply"
      >回信</button>
      <span class="replay_text">今天还可以回复1次</span>
    </div>


  </view>
</template>


<script>
export default {
  data() {
    const days = this.$day().format("YYYY/MM/DD");
    return {
      id: "",
      days: days,
      mail: {},
      reply: {
        content: "",
        weather: ""
      },
      isReply: false,
      isActive: false
    };
  },
  methods: {
    async getContent(id) {
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
    },
    dayFormat(value) {
      return this.$day(value).format("YYYY/MM/DD");
    },
    showReply() {
      this.isReply = true;
      this.isActive = true;
    },
    bindTextAreaBlur(e) {
      this.reply.content = e.detail.value;
    },
    async getWeather() {
      let res = this.$request.get("/weather");
      this.reply.weather = res.data;
    }
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
.mail {
  width: 630rpx;
  height: 892rpx;
  margin: 81rpx 60rpx 36rpx 60rpx;
}
.borderColor {
  border-top: 1px dashed #ffc86d; //粉色虚线边框
}
.textArea {
  min-height: 200px;
  width: 630rpx;
  height: 375rpx;
  background-color: rgba(169, 169, 169, 0.05);
  color: #4d495b;
}
.reply_weather {
  height: 200rpx;
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
  transform: 0.8333;
}
.replay_content {
  margin: 81rpx 60rpx 36rpx 60rpx;
}
</style>


<template>
  <view class="app list">
    <div
      class="mail box flex column j-between list_item"
      :class="{borderColor:isActive}"
      v-for="item in list"
      :key="item._id"
    >
      <div class="mail_title list_item-sendName flex wrap j-between">
        <span class="list_item-receiverNameSpan">{{item.creator}}</span>
        <span>收</span>
      </div>
      <div class="mail_content">
        {{item.content}}
      </div>
      <div class="mail_reply flex j-end">
        <span>{{item.aliasName}}</span>
        <span>{{item.createdAt | dayFormat}} {{item.weather}}</span>
      </div>
    </div>
    <div
      class="replay_content"
      v-if="isReply"
    >
      <textarea
        class="textArea"
        maxlength="50"
        :value="reply.content"
        @input="bindTextAreaBlur"
      />
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
    return {
      id: "",
      list: [],
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
      let res = await this.$request.get(`/dialog/detail/${id}`);
      this.mail = res.data;
      this.list = this.mail.mailList;
      console.log("this.mail: ", this.list);
    },
    replyMail() {
      this.$request
        .put(`/dialog/${this.id}`, {
          content: this.reply.content,
          weather: this.reply.weather
        })
        .then(res => {
          console.log("res", res);
        });
    },
    showReply() {
      this.isReply = true;
      this.isActive = true;
    },
    bindTextAreaBlur(e) {
      this.reply.content = e.detail.value;
    }
  },
  async onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.id = query.id;
    this.getContent(this.id);

    this.$request
      .get("/weather")
      .then(res => {
        this.reply.weather = res.data;
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};
</script>
<style lang="less">
@import url(../../styles/mail.less);
.mail {
  width: 630rpx;
  height: 620rpx;
  margin: 81rpx 60rpx 36rpx 60rpx;
}
.borderColor {
  border-bottom: 1px dashed #FFC86D; //粉色虚线边框
}

.reply_button {
  margin-top: 16rpx;
  border-radius: 23px;
  width: 316rpx;
  height: 92rpx;
  color: #ffffff;
  border: 1 solid #a9a9a9;
  background-color: #FFC86D;
}
.replay_text {
  color: #a9a9a9;
  transform: 0.8333;
}
.replay_content {
  margin: 81rpx 60rpx 36rpx 60rpx;
}
</style>


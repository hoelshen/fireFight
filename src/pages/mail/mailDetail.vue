<template>
  <view class="app list">
    <Mail :mail="item" v-for="item in list" :key="item._id"></Mail>

    <div class="replay_content borderColor" v-if="isReply">
      <div class="penName">回信将不再匿名，若对方再次回复，你们将成为笔友</div>
      <div class="flex">{{mail._id}}收</div>
      <textarea class="textArea" maxlength="50" :value="reply.content" @input="bindTextAreaBlur" />
      <div class="reply_weather_love flex j-bwtween">
        <div class="reply_weather_love_button">
          <button class="flex center">
            <span class="flex center">感谢</span>
            <img class="reply_weather_name iconfont" src="/static/svgs/love.svg">
          </button>
        </div>
      </div>
      <div class="reply_weather flex column">
        <div class="flex wrap j-end">
          <img class="reply_weather_name" :src="reply.aliasPortrait">
          <span>{{reply.aliasName}}</span>
        </div>

        <div class="reply_weather_weather flex wrap j-end">
          <div class="flex j-end">{{days}}</div>
          <div class="flex j-end">{{reply.weather}}</div>
        </div>
      </div>
      <button class="reply_button" @click="replyMail">发送</button>
    </div>
    <div class="flex column center showReply_button" v-if="!isReply">
      <button :disabled="fromUserId === user._id" class="reply_button" @click="showReply">回信</button>
      <span class="replay_text">需要使用 1 张邮票</span>
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
    const days = this.$day().format("YYYY/MM/DD");
    return {
      id: "",
      list: [],
      mail: {},
      days: days,
      reply: {
        aliasName: "",
        aliasPortrait: "",
        content: "",
        weather: ""
      },
      user: {},
      fromUserId: "",
      stampCount: 0,
      isReply: false,
      isActive: false
    };
  },
  methods: {
    async getContent(id) {
      let res = await this.$request.get(`/dialog/detail/${id}`);
      this.mail = res.data;
      this.fromUserId = res.data.fromUser;
      this.list = this.mail.mailList;
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
      if (this.stampCount === 0) {
        return wx.showToast({
          title: "邮票不足",
          icon: "none",
          duration: 2000
        });
      }
      this.isReply = true;
      this.isActive = true;
    },
    bindTextAreaBlur(e) {
      this.reply.content = e.detail.value;
    },
    async getWeather() {
      let res = await this.$request.get("/weather");
      this.reply.weather = res.data;
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.id = query.id;
    this.getContent(this.id);
    this.getWeather();
    const { user } = getApp().globalData;
    this.user = user;
    this.stampCount = user.stampCount;
    this.reply.aliasName = user.aliasName;
    this.reply.aliasPortrait = user.aliasPortrait;
  }
};
</script>
<style lang="less">
.mail {
  width: 630rpx;
  height: 620rpx;
  margin: 81rpx 60rpx 36rpx 60rpx;
}
.reply_weather_love {
  color: #ffc86d;
  font-size: 28rpx;
  & label {
    margin-right: 20rpx;
  }
}
.textArea {
  min-height: 200px;
  width: 630rpx;
  height: 375rpx;
  background-color: rgba(169, 169, 169, 0.05);
  color: #4d495b;
  font-size: 28rpx;
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
.replay_content {
  margin: 81rpx 60rpx 36rpx 60rpx;
}
.showReply_button {
  margin-bottom: 60rpx;
}
.reply_weather_name {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
</style>


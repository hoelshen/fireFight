<template>
  <div class="replay_content">
    <div class="content">
      <div class="flex target">{{target}}收</div>
      <textarea class="textArea" maxlength="50" :value="reply.content" @input="bindTextAreaBlur"/>
      <div class="reply_weather_love flex j-bwtween">
        <div class="reply_weather_love_button">
          <button class="lightButton flex center">
            <span class="flex center">感谢</span>
            <img class="reply_weather_name iconfont" src="/static/svgs/love.svg">
          </button>
        </div>
      </div>

      <div class="reply_weather flex column">
        <div class="flex wrap j-end">
          <img class="reply_weather_name" :src="reply.aliasPortrait">
          <span class="replyaliasName">{{reply.aliasName}}</span>
        </div>

        <div class="reply_weather_weather flex wrap j-end">
          <div class="days flex j-end">{{days | dayFormat}}</div>
          <div class="flex j-end">{{reply.weather}}</div>
        </div>
      </div>
    </div>
    <button class="reply_button flex center" @click="replyMail">发送</button>
  </div>
</template>
<script>
export default {
  props: {
    target: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    const days = this.$day().format("YYYY/MM/DD");
    return {
      days: days,
      reply: {
        content: "",
        weather: "",
        aliasPortrait: "",
        aliasName: ""
      }
    };
  },
  methods: {
    bindTextAreaBlur(e) {
      this.reply.content = e.detail.value;
    },
    async getWeather() {
      let res = await this.$request.get("/weather");
      this.reply.weather = res.data;
    },
    replyMail() {
      this.$request
        .post(`/mail/story/${this.id}`, {
          content: this.reply.content,
          weather: this.reply.weather
        })
        .then(res => {
          this.$router.push({
            query: { targetUser: this.mail.aliasName },
            path: "/pages/solution/promptPage"
          });
        });
    }
  },
  async created() {
    const { user } = getApp().globalData;
    this.reply.aliasName = user.aliasName;
    this.reply.aliasPortrait = user.aliasPortrait;
    this.getWeather();
  }
};
</script>
<style lang="less" scoped>
.reply_weather {
  margin-top: 42rpx;
  margin-bottom: 26rpx;
}
.reply_weather_weather {
  color: #bdbdc0;
  font-size: 22rpx;
  margin-top: 26rpx;
  margin-bottom: 40rpx;
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
  background-color: #ffffff;
  border: 2rpx solid #bdbdc0;
  width: 100%;
  height: 100%;
  color: #4d495b;
  font-size: 28rpx;
}

.replay_content {
  margin: 0rpx 0rpx 36rpx 0rpx;
  background: #fff;
}

.reply_weather_name {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.days {
  margin-right: 10rpx;
}
.content {
  padding: 60rpx 40rpx 0rpx 40rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
}
.target {
  padding: 0rpx 20rpx 40rpx 0rpx;
}
</style>

<template>
  <div class="replay_content">
    <div class="content">
      <div class="flex target">
        <span class="target">{{target}}</span>收
      </div>
      <textarea class="textArea" maxlength="5000" :value="reply.content" @input="bindTextAreaBlur"/>
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
    <div class="flex center reply_div">
        <button class="reply_button flex center" @click="replyMail">发送</button>
    </div>
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
    },
    tag: {
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
      },
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
      if (this.reply.content.length < 30) {
        return wx.showToast({
          title: "认真的讲诉更容易获得解答，多谢几句吧",
          icon: "none",
          duration: 2000
        });
      }
      if (this.reply.content.length > 3000) {
        return wx.showToast({
          icon: "none",
          title: "请控制在5000字以内"
        });
      }
      const obj = { content: this.reply.content, weather: this.reply.weather };
      if (this.tag === "mail") {
        this.$request.put(`/dialog/${this.id}`, obj).then(() => {
          this.$router.push({
            query: { tag: this.tag, active: "mail", targetUser: this.target },
            path: "/pages/solution/promptPage"
          });
        });
      }
      if (this.tag === "solution") {
        this.$request.post(`/mail/story/${this.id}`, obj).then(() => {
          this.$router.push({
            query: {
              tag: this.tag,
              active: "solution",
              targetUser: this.target
            },
            path: "/pages/solution/promptPage"
          });
        });
      }
    }
  },
  async created() {
    const { user } = getApp().globalData;
    this.reply.aliasName = user.aliasName;
    this.reply.aliasPortrait = user.aliasPortrait;
    this.getWeather();
  },
  onHide(){
    this.reply.content = '';
  }
};
</script>
<style lang="less" scoped>
.reply_weather {
  margin-top: 42rpx;
  margin-bottom: 26rpx;
}
.reply_weather_weather {
  font-size: 28rpx;
  margin-top: 26rpx;
  margin-bottom: 40rpx;
}
.textArea {
  min-height: 400rpx;
  padding: 40rpx;
  background-color: #ffffff;
  border: 2rpx solid #bdbdc0;
  width: 100%;
  color: #4d495b;
  font-size: 28rpx;
  box-sizing: border-box;
}

.replay_content {
  margin: 0rpx 60rpx 36rpx 60rpx;
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
  & view {
    margin-right: 10rpx;
  }
}
.reply_div{
  background-color:#FFFEFB;
}
</style>

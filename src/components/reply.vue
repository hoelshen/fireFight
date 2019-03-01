<template>
  <div class="replay_content">
    <div class="content">
      <div class="flex">
        <span class="target">{{target}}</span>
        <span class="target" style="margin-left:10rpx;">收</span>
      </div>
      <textarea :focus="true" :auto-height="true" class="textArea" maxlength="5000" cursor-spacing="30" :value="reply.content" @input="bindTextAreaBlur"/>
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
          title: "认真的讲述更容易获得解答，多谢几句吧",
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
          this.$emit("submit", false);
          this.$router.push({
            query: { tag: this.tag, active: "mail", targetUser: this.target },
            path: "/pages/solution/promptPage"
          });
        });
      }
      if (this.tag === "solution") {
        this.$request.post(`/mail/story/${this.id}`, obj).then(() => {
          this.$emit("submit", false);
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
  margin-right:40rpx;
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
  width: 100%;
  color: #4D495B;
  font-size: 34rpx;
  box-sizing: border-box;
  line-height:52rpx;
}

.replay_content {
  margin: 60rpx 20rpx 60rpx 20rpx;
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
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
}
.target {
  margin-top: 60rpx;
  margin-left:  40rpx;
  font-size: 34rpx;
  color: #4D495B;
  font-weight: 600;
  box-sizing: border-box
}
.reply_div{
  background-color:#FFFEFB;
}
.replyaliasName{
  font-size: 34rpx;
  font-weight: 600;
  color: #4D495B;
}
</style>

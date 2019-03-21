<template>
  <div
    v-if="mail._id"
    class="mail box flex column j-between list_item shadow"
  >
    <div class="mail_title">
      {{ mail.targetUserName || 'Tell烦恼咨询中心' }} {{ mail.fromSystem ? "" :"收" }}
    </div>
    <div class="mail_content">
      {{ mail.content }}
    </div>

    <div
      v-if="mail.type==='REPLY' && user._id == mail.targetUser"
      class="reply_weather_love flex j-bwtween"
    >
      <div class="reply_weather_love_button">
        <button
          class="lightButton flex center"
          @click="likeBtn(mail)"
        >
          <span class="flex center">感谢</span>
          <img
            v-if="mail.like"
            class="reply_weather_name iconfont"
            src="/static/svgs/love-active.svg"
          >
          <img
            v-else
            class="reply_weather_name iconfont"
            src="/static/svgs/love.svg"
          >
        </button>
      </div>
    </div>
    <div class="mail_reply flex column j-end">
      <div class="flex wrap j-end">
        <img
          v-if="mail.type != 'STORY'"
          class="mail_weather_name"
          :src="mail.aliasPortrait"
        >
        <span class="mail_reply_aliasName">{{ mail.aliasName }}</span>
        <img
          v-if="mail.type != 'STORY' && mail.badgeImgUrl"
          class="mail_reply_badge"
          :src="mail.badgeImgUrl"
        >
      </div>
      <span class="flex wrap j-end mail_reply_weather">{{ mail.createdAt | dateFormat }} {{ mail.weather }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mail",
  props: {
    mail: {
      type: Object,
      requred: true,
      default:()=>{
        return {};
      }
    }
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = getApp().globalData.user;
  },
  methods: {
    likeBtn(mail) {
      if (mail.like) {
        return wx.showToast({
          title: "不能重复感谢喔",
          icon: "none"
        });
      }
      mail.like = true;
      this.mail = {...mail};
      this.$request.put(`/mail/reply/${this.mail._id}`).then(res => {});
      wx.showToast({
        title: "已感谢，对方会获得解忧券",
        icon: "none"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mail {
  min-height: 620rpx;
  padding: 60rpx 40rpx;
  color: #4d495b;
  background: #fff;
  margin:40rpx 20rpx;
}
.mail_title {
  font-size: 32rpx;
  font-weight: bold;
}
.mail_content {
  font-size: 28rpx;
  margin-top: 40rpx;
  margin-bottom: 80rpx;
  line-height: 52rpx;
  min-height: 200rpx;
  white-space: pre-line;
  word-wrap: break-word;
  text-align: justify;
  letter-spacing: 2rpx;
  &:after{
      content: '';
      width:100%;
      display: inine-block;
  }
}
.mail-sendName {
  color: #4d495b;
  font-size: 34rpx;
}
.penName {
  background: rgba(189, 189, 192, 0.05);
  font-size: 24rpx;
  margin-bottom: 52rpx;
}
.reply_weather_love {
  color: #ffc86d;
  font-size: 28rpx;
  margin-bottom: 40rpx;
  & label {
    margin-right: 20rpx;
  }
}
.lightButton {
  height: 64rpx;
  padding: 8rpx 40rpx;
  margin-top: 0;
  min-height: 0;
  line-height:normal;
}
.mail_weather_name {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.mail_reply_aliasName {
  color: #4d495b;
  font-size: 32rpx;
  font-weight: bold;
}
.mail_reply_badge{
  width: 44rpx;
  height: 44rpx;
  margin-left: 20rpx;
}
.mail_reply_weather {
  margin-top: 24rpx;
  font-size: 28rpx;
}
</style>
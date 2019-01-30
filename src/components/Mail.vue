<template>
  <div class="mail box flex column j-between list_item shadow">
    <div class="mail_title">
      {{mail.targetUserName || 'Tell烦恼咨询中心'}} {{mail.fromSystem ? "" :"收"}}
    </div>
    <div class="mail_content">{{mail.content}}</div>
    <div class="mail_reply flex column j-end">
      <div class="flex wrap j-end">
        <!-- <img
            class="mail_reply_img"
            :src="item. || 'https://cdn.tellers.cn/tell_v2/static/default-avatar.svg'"
            mode="scaleToFill"
            @click="login"
          >-->
        <span class="mail_reply_aliasName">{{mail.aliasName}}</span>
      </div>

      <span class="flex wrap j-end mail_reply_weather">{{mail.createdAt | dayFormat}} {{mail.weather}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mail",
  props: {
    mail: {
      type: Object,
      requred: true
    }
  },
  data() {
    return {};
  },
  methods: {
    toMail() {}
  }
};
</script>

<style lang="less" scoped>
.mail {
  padding: 60rpx 40rpx;
  color: #4d495b;
  margin-bottom: 40rpx;
  background: #fff;
}
.mail_title {
  font-size: 34rpx;
  font-weight: bold;
}
.mail_content {
  font-size: 28rpx;
  margin: 40rpx 0;
  line-height: 52rpx;
  min-height: 200rpx;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: justify;
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
.mail_reply_img {
  width: 44rpx;
  height: 44rpx;
  border-radius: 11;
}
.mail_reply_aliasName {
  color: #4d495b;
  font-size: 34rpx;
  font-weight: bold;
}
.mail_reply_weather {
  margin-top: 24rpx;
  font-size: 28rpx;
}
</style>
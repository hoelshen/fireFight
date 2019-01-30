<template>
  <div class="app">
    <div class="my_info flex column">
      <img class="my_info_user-avatarUrl" :src="user.aliasPortrait || 'https://cdn.tellers.cn/tell_v2/static/default-avatar.svg'" mode="scaleToFill" @click="login">
      <button @click="login" v-if="!user.aliasPortrait">点击登录</button>
      <div class="flex column center" v-else>
        <div class="flex j-around my_info_user-nickName">
          <div>{{user.aliasName}}</div>
          <div class="iconfont icon-badge flex a-center"></div>
        </div>
        <div class="my_info_user-address flex wrap">{{user.aliasAddress}}</div>
      </div>
    </div>

    <session class="my_function flex">
      <button @tap="memory" class="my_function_item-button flex column center">
        <image class="iconfont" src="/static/svgs/moment.svg" />
        <span class="my_function_item-text">记忆</span>
      </button>

      <button @click="ticket" class="my_function_item-button flex column center">
        <image class="iconfont" src="/static/svgs/ticket.svg" />
        <span class="my_function_item-text">票券</span>
      </button>

      <button @click="welfare" class="my_function_item-button flex column center">
        <image class="iconfont" src="/static/svgs/welfare.svg" />
        <span class="my_function_item-text">福利社</span>
      </button>
    </session>

    <session class="my_contact flex column">
      <button class="my_contact_item-button flex wrap center grow" open-type="contact" send-message-img :session-from="{
          'nickName':user.aliasName, 
          'avatarUrl':user.aliasPortrait
          }" @contact="joinGroup">
        <image class="iconfont" src="/static/svgs/joinGroup.svg" />
        <span class="my_contact_item-text grow">加入群聊</span>
        <image class="iconfont flex center" src="/static/svgs/arrow.svg" />
      </button>

      <button class="my_contact_item-button flex wrap center grow" open-type="contact" :session-from="{
          'nickName':user.aliasName, 
          'avatarUrl':user.aliasPortrait
          }" @contact="AnswerQuestion">
        <image class="iconfont" src="/static/svgs/question.svg" />
        <span class="my_contact_item-text grow">问题与反馈</span>
        <image class="iconfont flex center" src="/static/svgs/arrow.svg" />
      </button>
    </session>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: "",
      date: new Date(),
      user: {
        aliasPortrait: ""
      }
    };
  },
  async onShow() {
    await this.$request.getUser();
    const { user } = getApp().globalData;
    this.user = user;
  },
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
  methods: {
    login() {
      const status = this.$checkAuth(this.user);
      if (status) {
        this.$router.push({
          query: { id: 1 },
          path: "/pages/setPenName/index"
        });
      }
    },
    memory() {
      const status = this.$checkAuth(this.user);
      if (status) {
        this.$router.push({ query: { id: 1 }, path: "/pages/memory/index" });
      }
    },
    ticket() {
      const status = this.$checkAuth(this.user);
      if (status) {
        this.$router.push({
          query: { id: 1 },
          path: "/pages/ticket/ticketList"
        });
      }
    },
    badge() {
      wx.showToast({
        title: "入口暂未开放",
        icon: "none",
        duration: 2000
      });
      return;
      this.$router.push({ query: { id: 1 }, path: "/pages/badge/index" });
    },
    welfare() {
      const status = this.$checkAuth(this.user);
      if (status) {
        this.$router.push({
          query: { id: 1 },
          path: "/pages/welfare/index"
        });
      }
    },
    joinGroup(e) {
      console.log("joinGroup: ", e);
    },
    AnswerQuestion(e) {
      console.log("AnswerQuestion: ", e);
    }
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    const obj = {
      title: "现实中的解忧杂货店",
      imageUrl: "https://cdn.tellers.cn/tell_v2/static/share_default.jpg",
      path: "/pages/home/index",
      success: function(res) {
        //转发成功
      },
      fail: function(res) {
        //转发失败
      }
    };
    return obj;
  }
};
</script>

<style lang="less" scoped>
.app {
  font-family: "PingFang SC";
  background-color: #fffefb;
  padding-top: 32rpx;
  .my_info {
    width: 630rpx;
    height: 508rpx;
    margin: 0 60rpx;
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
    &_user {
      &-avatarUrl {
        display: block;
        border-radius: 50%;
        height: 216rpx;
        width: 216rpx;
        margin: 20px auto;
        box-shadow: 0 0 36rpx 0 rgba(255, 77, 107, 0.19);
      }
      &-nickName {
        height: 84rpx;
        font-size: 60rpx;
        text-align: center;
      }
      &-nickNameImg {
        width: 36rpx;
        height: 36rpx;
      }
      &-address {
        height: 40rpx;
        font-size: 28rpx;
        text-align: center;
      }
    }
  }
  .my_function {
    width: 630rpx;
    height: 172rpx;
    margin: 32rpx 60rpx;
    background-color: #ffffff;
    box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
    &_item {
      height: 172rpx;
      width: 210rpx;
      background-color: #ffffff;
      &-button {
        height: 172rpx;
        width: 210rpx;
      }

      &-text {
        font-size: 28rpx;
      }
    }
  }
  .my_contact {
    width: 630rpx;
    height: 216rpx;
    margin: 32rpx 60rpx;
    background-color: #ffffff;
    box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
    &_item {
      width: 630rpx;
      height: 108rpx;
      background-color: #ffffff;
      &-button {
        width: 100%;
        padding: 32rpx 40rpx;
        align-items: center;
      }
      &-img {
        height: 36rpx;
        width: 36rpx;
        margin: 18rpx 20rpx;
      }
      &-text {
        margin-left: 24rpx;
        font-size: 28rpx;
        text-align: left;
      }
    }
  }
  .my_share {
    & button {
      border: 2rpx #ffc86d solid;
      border-radius: 46px;
      height: 92rpx;
      width: 316rpx;
      font-size: 28rpx;
      &.active {
        background: #fff;
      }
    }
  }
}

.button-hover {
  background: #fff;
}
</style>

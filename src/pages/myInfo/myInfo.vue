<template>
  <div class="app">
    <!-- TODO:还需要调适配，以适应短屏 -->
    <div class="my_info flex column">
      <img
        class="my_info_user-avatarUrl"
        :src="user.aliasPortrait"
        mode="aspectFit"
        @touchstart="login"
      >
      <button
        @click="login"
        v-if="!user.aliasPortrait"
      >点击登录</button>
      <div
        class="flex column center"
        v-else
      >
        <div class="flex j-around my_info_user-nickName">
          <div style="margin-left:20rpx;padding-right:10rpx;">{{user.aliasName}}</div>
          <div class="iconfont icon-badge flex a-center"></div>
        </div>
        <div class="my_info_user-address flex wrap">{{user.city}}</div>
      </div>
    </div>

    <session class="my_function flex">
      <form
        class="my_function_item flex"
        @submit="memory"
        report-submit="true"
      >
        <button
          class="my_function_item-button flex column center"
          form-type="submit"
        >
          <div class="iconfont icon-memery"></div>
          <span class="my_function_item-text">记忆</span>
        </button>
      </form>

      <form
        class="my_function_item flex"
        @submit="ticket"
        report-submit="true"
      >
        <button
          class="my_function_item-button flex column center"
          form-type="submit"
        >
          <div class="iconfont icon-ticket"></div>
          <span class="my_function_item-text">票券</span>
        </button>
      </form>

      <form
        class="my_function_item flex"
        @submit="welfare"
        report-submit="true"
      >
        <button
          class="my_function_item-button flex column center"
          form-type="submit"
        >
          <div class="iconfont icon-badge"></div>
          <span class="my_function_item-text">福利社</span>
        </button>
      </form>

    </session>

    <session class="my_contact flex column">
      <!-- <form
        class="my_contact_item flex "
        @submit="welfare"
        report-submit="true"
      >
        <button
          class="my_contact_item-button flex wrap j-start "
          form-type="submit"
        >
          <div class="iconfont icon-gift"></div>
          <span class="my_contact_item-text">福利社</span>
        </button>
      </form> -->

      <form
        class="my_contact-item flex "
        @submit="joinGroup"
        report-submit="true"
      >
        <button
          class="my_contact_item-button flex wrap j-start "
          form-type="submit"
          open-type="contact"
          send-message-img
          :session-from="{
          'nickName':user.aliasName, 
          'avatarUrl':user.aliasPortrait
          }"
          @contact="joinGroup"
        >
          <div class="iconfont icon-group"></div>
          <span class="my_contact_item-text">加入群聊</span>
        </button>
      </form>

      <form
        class="my_contact-item flex  "
        @submit="AnswerQuestion"
        report-submit="true"
      >
        <button
          class="my_contact_item-button flex wrap j-start "
          form-type="submit"
          open-type="contact"
          :session-from="{
          'nickName':user.aliasName, 
          'avatarUrl':user.aliasPortrait
          }"
          @contact="AnswerQuestion"
        >
          <div class="iconfont icon-feedback"></div>
          <span class="my_contact_item-text">问题与反馈</span>
        </button>
      </form>

    </session>

    <session class="my_share flex center">
      <div>
        <button open-type="share">安利Tell给好友
        </button>
      </div>
    </session>

    <TtabBar></TtabBar>
  </div>
</template>

<script>
import TtabBar from "@/components/TtabBar";
export default {
  components: {
    TtabBar
  },
  data() {
    return {
      logo: "",
      date: new Date(),
      user: {}
    };
  },
  beforeCreate() {
    console.log("Page [my] Vue beforeCreate");
  },
  created() {
    console.log("Page [my] Vue created");
    // console.log(appInstance.globalData) // I am global data
  },
  beforeMount() {
    console.log("Page [my] Vue beforeMount");
  },
  mounted() {
    console.log("Page [my] Vue mounted");
  },
  async onShow() {
    await this.$request.getUser();
    const { user } = getApp().globalData;
    console.log("user: ", user);

    this.user = user;
  },
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
  methods: {
    login() {
      const status = this.$checkAuth(this.user);
      if (status) {
        this.$router.push({ query: { id: 1 }, path: "/pages/setPenName/index" });
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
      title: "安利Tell给好友",
      imageUrl: "../../static/cdn/shareTell.png",
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
  width: 750rpx;
  min-height: 100vh;
  font-family: "PingFang SC";
  background-color: #f6f6f8;
  padding-top: 32rpx;
  padding-bottom: 124rpx;
  .my_info {
    width: 630rpx;
    height: 508rpx;
    margin: 0 60rpx;
    border-radius: 2px;
    background-color: #ffffff;
    &_user {
      &-avatarUrl {
        display: block;
        border-radius: 50%;
        border-style: solid;
        height: 216rpx;
        width: 216rpx;
        margin: 20px auto;
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
    &_item {
      height: 172rpx;
      width: 210rpx;
      background-color: #ffffff;
      &-button {
        height: 172rpx;
        width: 210rpx;
      }
      .iconfont {
        font-size: 36rpx;
        width: 52rpx;
        height: 52rpx;
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
    &_item {
      width: 630rpx;
      height: 108rpx;
      background-color: #ffffff;
      &-button {
        width: 630rpx;
        height: 108rpx;
        align-items: center;
      }
      &-img {
        height: 36rpx;
        width: 36rpx;
        margin: 18rpx 20rpx;
      }
      &-text {
        font-size: 34rpx;
        margin-left: 20rpx;
      }
    }
  }
  .my_share {
    & button {
      border-style: solid;
      border-color: #ff4d6b;
      border-radius: 23px;
      height: 92rpx;
      width: 316rpx;
    }
  }
  // .button-hover {
  //   background-color: #fff1f3;
  // }
}
</style>

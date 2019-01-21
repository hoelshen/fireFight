<template>
  <div class="app">
    <!-- TODO:还需要调适配，以适应短屏 -->
    <div class="my_info flex column">
      <img
        class="my_info_user-avatarUrl"
        :src="user.avatarUrl"
        mode="aspectFit"
        @touchstart="login"
      >
      <button
        @click="login"
        v-if="!user.avatarUrl"
      >点击登录</button>
      <div
        class="flex column center"
        v-else
      >
        <div class="flex j-around my_info_user-nickName">
          <div
            class=""
            style="margin-left:20rpx;"
          >{{user.nickName}}</div>
          <div class="iconfont icon-badge"></div>
        </div>
        <div class="my_info_user-address">{{user.city}}</div>
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
        @submit="badge"
        report-submit="true"
      >
        <button
          class="my_function_item-button flex column center"
          form-type="submit"
        >
          <div class="iconfont icon-badge"></div>
          <span class="my_function_item-text">徽章</span>
        </button>
      </form>

    </session>

    <session class="my_contact flex column">
      <form
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
      </form>

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
          'nickName':user.nickName, 
          'avatarUrl':user.avatarUrl
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
          'nickName':user.nickName, 
          'avatarUrl':user.avatarUrl
          }"
          open-type="contact"
          @contact="AnswerQuestion"
        >
          <div class="iconfont icon-feedback"></div>
          <span class="my_contact_item-text">问题与反馈</span>
        </button>
      </form>

    </session>

    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  components: {
    TabBar
  },
  data() {
    return {
      logo:
        "https://user-images.githubusercontent.com/20720117/48262986-80e02780-e45f-11e8-8426-2872916adad9.png",
      message: "sjh",
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
  onLoad: function(options) {
    // Do some initialize when page load.
    // wx.hideTabBar({})
    console.log("Page [my] onLoad");
  },
  onReady: function() {
    // Do something when page ready.
    console.log("Page [my] onReady");
  },
  onShow: function() {
    // Do something when page show.
    // setTimeout(() => {
    //   wx.showShareMenu({
    //     withShareTicket: true
    //   });
    // }, 5000);
    const { user } = getApp().globalData;
    console.log("user: ", user);

    this.user = user;
  },
  onHide: function() {
    // Do something when page hide.
    console.log("Page [my] onHide");
  },
  onUnload: function() {
    // Do something when page close.
    console.log("Page [my] onUnload");
  },
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
  methods: {
    login() {
      this.$router.push({ query: { id: 1 }, path: "/pages/login/index" });
    },
    memory() {
      this.$router.push({ query: { id: 1 }, path: "/pages/memory/index" });
    },
    ticket() {
      this.$router.push({ query: { id: 1 }, path: "/pages/ticket/index" });
    },
    badge() {
      this.$router.push({ query: { id: 1 }, path: "/pages/badge/index" });
    },
    welfare() {
      this.$router.push({ query: { id: 1 }, path: "/pages/welfare/index" });
    },
    joinGroup() {},
    AnswerQuestion(e) {
      console.log("AnswerQuestion: ", e);
    }
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "分享",
      path: "/pages/home/index",
      imageUrl: "@/static/imgs/home.png",
      success: function(res) {
        wx.showToast({
          title: "转发成功",
          icon: "none",
          image: "@/static/imgs/home.png",
          duration: 1500,
          mask: false,
          success: result => {},
          fail: () => {},
          complete: () => {}
        });
        //转发成功
      },
      fail: function(res) {
        //转发失败
      }
    };
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
        font-size: 30rpx;
        text-align: center;
      }
      &-nickNameImg {
        width: 36rpx;
        height: 36rpx;
      }
      &-address {
        width: 146rpx;
        height: 40rpx;
        font-size: 14rpx;
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
        font-size: 38rpx;
      }
    }
  }
  .my_contact {
    width: 630rpx;
    height: 324rpx;
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
        &:after {
          content: "";
          width: 16rpx;
          height: 16rpx;
          border-left: 1rpx solid #666;
          border-bottom: 1rpx solid #666;
          transform: rotate(225deg);
          -webkit-transform: rotate(225deg);
          position: absolute;
          left: 580rpx;
          top: 54rpx;
        }
      }
      &-img {
        height: 36rpx;
        width: 36rpx;
        margin: 18rpx 20rpx;
      }
      &-text {
        font-size: 28rpx;
        margin-left: 20rpx;
      }
    }
  }
  .my_share {
    & button {
      border-style: solid;
      border-radius: 50%;
      height: 80px;
      line-height: 80px;
      width: 80px;
    }
  }
  // .button-hover {
  //   background-color: #fff1f3;
  // }
}
</style>

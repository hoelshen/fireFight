<template>
  <view class="page">
    <div class="intros box">
      <div class="title flex a-around">
        <div class="left txt flex j-start a-center">MAKE YOU</div>
        <div class="right txt flex center">STRONGER</div>
      </div>

      <div class="sub-title">
        <div class="up">感恩生命中的磨难</div>
        <div class="bottom">使我们变成更好的自己</div>
      </div>
      <div class="content">
        Make You Stronger，来自 What doesn’t kill you makes you stronger，意为“杀不死你的，会让你更强大”。 生活中，总会面对各种挫折和磨难。我们希望通过叙述和分享彼此的故事，帮助每一个人更好地认识挫折和磨难——它们并不可怕，当它们无法击败你时，你会变得更强大。
      </div>
    </div>

    <div class="tabs flex j-around box relative">
      <div
        class="tab flex j-start grow"
        @tap="onTabChange('everyone')"
        :class="tab == 'everyone'?'active':''"
      >
        大家的故事
      </div>

      <div
        class="tab flex j-start grow"
        @tap="onTabChange('friends')"
        :class="tab == 'friends'?'active':''"
      >
        来自可能认识的人
      </div>
    </div>

    <div
      class="tips flex a-center j-start"
      v-if="tab=='friends'"
    >
      立于阳光之下，才可环视四周。
    </div>

    <div
      class="tips-more"
      v-if="tab=='friends'"
    >
      MYS 不提倡朋友之间窥私，因此以下内容只对分享过故事的用户开放。
    </div>

    <div
      class="mails grow"
      v-if="tab=='everyone'"
    >

      <div
        v-for="mail in everyoneMails"
        :key="mail._id"
      >
        <MailCard :mail="mail"></MailCard>
      </div>

      <img
        class="tell-card"
        src="https://cdn.tellers.cn/stronger/tell_card.svg"
        alt=""
        v-if="everyoneMails.length > 0"
        @tap="toHome"
      >

      <div class="more flex column a-center">
        <button
          class="change"
          hover-class="active"
          @tap="refresh"
        >换一批</button>
        <div
          class="desc"
          v-if="countdownMinute==0"
        >当前可以立即刷新</div>
        <div
          class="desc"
          v-else
        >{{countdownMinute}}分钟后可以刷新</div>
      </div>
    </div>

    <div
      class="mails grow"
      v-if="tab=='friends'"
    >
      <div
        v-for="mail in friendsMails"
        :key="mail._id"
      >
        <MailCard
          :mail="mail"
          :lock="!isMonmentOpened"
        ></MailCard>
      </div>
    </div>

    <button
      class="btns flex center"
      hover-class="active"
      @tap="toMyStory"
      v-if="isStoryWrote"
    >我的故事</button>
    <button
      class="btns flex center"
      open-type="getUserInfo"
      hover-class="active"
      @getuserinfo="onGetUserInfo"
      v-else
    >写我的故事</button>
  </view>
</template>

<script>
import MailCard from "@/components/story.vue";
import sRequest from "@/utils/stronger-request";

export default {
  mpType: "page",
  components: {
    MailCard
  },
  data() {
    return {
      everyoneMails: [],
      friendsMails: [],
      tab: "everyone",
      tabHeight: 0,
      isStoryWrote: false,
      userId: null,
      scrollHeight: "600px",
      countdownMinute: 0
    };
  },
  onShareAppMessage: function(res) {
    let userId = this.userId;
    let shareImgs = [
      "https://cdn.tellers.cn/stronger/share-app.png",
      "https://cdn.tellers.cn/stronger/share-app-2.png"
    ];
    let index = Math.floor(Math.random() * shareImgs.length);
    return {
      title: "分享了一段经历",
      path: `pages/stronger-home/index?refer=${userId}`,
      imageUrl: shareImgs[index]
    };
  },
  async onLoad() {
    let loginRes = await sRequest.login(
      getApp().globalData.options.query.refer
    );
    let userInfo = getApp().globalData.mys;
    this.isStoryWrote = userInfo.isStoryWrote;
    this.isMonmentOpened = userInfo.isMonmentOpened;
    this.userId = userInfo._id;
    if (this.everyoneMails.length > 0) {
      return false;
    }
    sRequest.get("/story/everybody").then(
      function(res) {
        this.everyoneMails = res.data.storyList;
      }.bind(this)
    );
    sRequest.get("/story/friends").then(
      function(res) {
        this.friendsMails = res.data.storyList;
      }.bind(this)
    );
  },

  onShow() {
    wx.getStorage({
      key: "refreshTime",
      success: function(res) {
        let lastRefreshtime = res.data;
        let timeDiff = this.$dayjs(new Date()).diff(lastRefreshtime, "minute");
        this.countdownMinute = timeDiff >= 10 ? 0 : 10 - timeDiff;
      }.bind(this)
    });
  },

  methods: {
    toWrite() {
      wx.navigateTo({
        url: "/pages/stronger-write/index"
      });
    },
    toMyStory() {
      wx.navigateTo({
        url: "/pages/stronger-mail/index?own=1"
      });
    },
    checkRefreshTime() {},

    onGetUserInfo(e) {
      wx.showLoading({
        title: "授权中",
        mask: true
      });

      let detail = e.detail;
      if (!detail.userInfo) {
        return wx.hideLoading();
      }
      sRequest.post("/auth", detail).then(
        function(authRes) {
          wx.hideLoading();
          this.toWrite();
        }.bind(this)
      );
    },
    onTabChange(tab) {
      this.tab = tab;
      if (tab == "friends") {
        sRequest.get("/story/friends").then(
          function(res) {
            this.friendsMails = res.data.storyList;
          }.bind(this)
        );
      }
    },

    toHome() {
      wx.navigateTo({
        url: "/pages/home/index"
      });
    },
    async refresh() {
      if (this.countdownMinute > 0) {
        return wx.showToast({
          icon: "none",
          title: "请" + this.countdownMinute + "分钟后再试"
        });
      }
      this.everyoneMails = [];
      wx.showLoading({
        title: "刷新中",
        mask: true
      });
      let res = await sRequest.get("/story/everybody");
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.everyoneMails = res.data.storyList;
      wx.showToast({
        title: "刷新成功"
      });
      wx.hideLoading();
      this.countdownMinute = 10;
      wx.setStorage({
        key: "refreshTime",
        data: new Date().getTime()
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background: #fafafa;
  overflow-x: hidden;
  padding-bottom: 100rpx;
}

.intros {
  width: 756rpx;
  height: 712rpx;
  padding: 50rpx;
  font-size: 28rpx;
  line-height: 1.8;
  color: #7a7e82;
  text-align: justify;
  background: url("https://cdn.tellers.cn/stronger/home-top-background.svg")
    no-repeat;
  background-size: cover;
  background-position: -2rpx top;
  border: 0;
  overflow: hidden;

  .title {
    font-size: 52rpx;
    .txt {
      width: 330rpx;
      height: 80rpx;
    }
    .left {
      color: #ffc75d;
      background: transparent;
    }
    .right {
      color: #292a2b;
      background: #ffc75d;
    }
  }
  .sub-title {
    font-size: 32rpx;
    color: #fff;
    line-height: 1.8;
    margin: 40rpx 0;
  }
}

.tabs {
  position: sticky;
  top: 0;
  z-index: 8;
  font-size: 40rpx;
  padding: 40rpx;
  background: #fafafa;
  .tab {
    position: relative;
    color: #c0c6cc;
    &.active {
      font-weight: bold;
      color: #292a2b;
    }
  }
}

.tips {
  margin-left: 40rpx;
  padding-left: 40rpx;
  height: 80rpx;
  color: #fff;
  font-size: 24rpx;
  border-top-left-radius: 40rpx;
  border-bottom-left-radius: 40rpx;
  background: linear-gradient(to right, #737373, #fff);
}

.tips-more {
  font-size: 24rpx;
  padding: 40rpx;
  line-height: 1.8;
}

.mails {
  margin: 0 40rpx 60rpx 40rpx;
  .more {
    line-height: 2;
    margin: 30rpx 0;
    .change {
      font-size: 28rpx;
      color: #ffc75d;
      font-size: 32rpx;
      margin-bottom: 10rpx;
      &.active {
        color: lighten(#ffc75d, 10%);
      }
    }
    .desc {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.btns {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  font-size: 32rpx;
  background: #353535;
  z-index: 12;
  color: #fff;
  &.active {
    background: lighten(#353535, 5%);
  }
}

.tell-card {
  width: 676rpx;
  height: 144rpx;
}
</style>

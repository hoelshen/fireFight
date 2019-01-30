<template>
  <view class="page flex column">
    <!-- 首页 -->
    <div class="pannel grow" v-if="tab == 'home'">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="item in banners" :key="item">
          <swiper-item>
            <image :src="item.imgUrl" class="img" />
          </swiper-item>
        </block>
      </swiper>
      <div class="entries flex center">
        <image class="left" @click="toConsulting" src="/static/svgs/home_left.svg" />
        <image class="right" @click="toSolution" src="/static/svgs/home_right.svg" />
      </div>
    </div>

    <!-- 信箱 -->
    <div class="pannel grow" v-else-if="tab == 'mail'">
      <div class="mailbox_title flex center" v-if="wayCount">
        <button class="flex center" @click="openMail">{{wayCount}} 封信正在邮寄的路上</button>
      </div>
      <div class="list" v-for="item in dialogs" :key="item._id">
        <Envelope :mail="item.toMail" :isRead="item.isRead" v-if="item.fromSystem"></Envelope>
        <Envelope :mail="item.toMail" :isRead="item.isRead" :dialogId="item._id" v-else-if="userId == item.toUser._id"></Envelope>
        <Envelope :mail="item.fromMail" :isRead="item.isRead" :dialogId="item._id" v-else></Envelope>
      </div>
    </div>

    <!-- 我的 -->
    <div class="pannel grow" v-else>
      <div class="my_info flex column">
        <image class="my_info_user-avatarUrl" :src="user.aliasPortrait || 'https://cdn.tellers.cn/tell_v2/static/default-avatar.svg'" mode="scaleToFill" @click="login" />
        <button @click="login" v-if="!user.aliasPortrait">点击登录</button>
        <div class="flex column center" v-else>
          <div class="flex j-around my_info_user-nickName">
            <div>{{user.aliasName}}</div>
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

    <HomeBar @change="onTabChange"></HomeBar>
  </view>
</template>
<script>
import HomeBar from "@/components/TtabBar";
import Envelope from "@/components/Envelope";

export default {
  components: {
    HomeBar,
    Envelope
  },
  data() {
    return {
      tab: "home",
      banners: [],
      wayCount: 0,
      dialogs: [],
      user: {}
    };
  },
  onLoad(opt) {
    this.onTabChange(opt.tab);
  },
  onShow() {
    this.$request.getUser();
    this.getBanners();
    this.getWayCount();
    this.getDialogs();
  },
  onShareAppMessage(res) {
    return {
      title: "现实中的解忧杂货店",
      imageUrl: "https://cdn.tellers.cn/tell_v2/static/share_default.jpg",
      path: "/pages/home/index"
    };
  },
  methods: {
    onTabChange(tab = "home") {
      this.user = getApp().globalData.user;
      this.tab = tab;
    },
    openMail() {
      this.$router.push({ path: "/pages/mail/mailDay" });
    },
    async getBanners() {
      const res = await this.$request.get("/banner");
      this.banners = res.data;
    },
    async getWayCount() {
      const res = await this.$request.get("/dialog/way/count");
      this.wayCount = res.data;
    },
    async getDialogs() {
      const res = await this.$request.get("/dialog");
      this.dialogs = res.data;
    },
    toConsulting() {
      this.$router.push({ path: "/pages/consultingBox/index" });
    },
    toSolution() {
      const { user } = getApp().globalData;
      const status = this.$checkAuth(user);
      if (status) {
        if (!user.becomeAnswererAt) {
          return this.$router.push({
            query: { active: "solverDetail" },
            path: "/pages/detail/index"
          });
        }
        return this.$router.push({ path: "/pages/solution/solutionRoom" });
      }
    },
    memory() {
      this.$router.push({ query: { id: 1 }, path: "/pages/memory/index" });
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
    welfare() {
      const status = this.$checkAuth(this.user);
      if (status) {
        this.$router.push({
          query: { id: 1 },
          path: "/pages/welfare/index"
        });
      }
    },
    login() {
      const status = this.$checkAuth(this.user);
      if (status) {
        this.$router.push({
          query: { id: 1 },
          path: "/pages/setPenName/index"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  height: 100vh;
}

.swiper {
  width: 630rpx;
  height: 160rpx;
  margin: 0 60rpx;
  .img {
    width: 630rpx;
    height: 160rpx;
  }
}

.entries {
  .left {
    width: 316rpx;
    height: 610rpx;
    padding: 0;
  }
  .right {
    width: 316rpx;
    height: 610rpx;
    padding: 0;
  }
}

.mailbox_title {
  margin: 40rpx auto;
  & button {
    height: 92rpx;;
    padding: 0 40rpx;
    border: 1px solid #ffc86d;
    border-radius: 46px;
    font-size: 28rpx;
  }
}
.mailText {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

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
      color: #bdbdc0;
      margin-top: 24rpx;
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
      .iconfont {
        width: 32rpx;
        height: 32rpx;
      }
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
</style>


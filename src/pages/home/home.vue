<template>
  <view class="page flex column">
    <!-- 首页 -->
    <div class="pannel grow" v-if="tab == 'home'">
      <scroll-view class="entries" scroll-y :style='`height: ${scrolHeight}px`'>
        <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
          <block v-for="item in banners" :key="item">
            <swiper-item>
              <image :src="item.imgUrl" class="img" />
            </swiper-item>
          </block>
        </swiper>
        <image class="home flex center" :style="`height: ${(scrolHeight - 80)}px`" src="/static/svgs/homeBg.jpg"></image>
        <div class="left" @click="toConsulting" />
        <div class="right" @click="toSolution" />
      </scroll-view>
    </div>

    <!-- 信箱 -->
    <div class="pannel grow" v-else-if="tab == 'mail'">
      <scroll-view scroll-y :style='`height: ${scrolHeight}px`'>
        <div class="mailbox_title flex center" v-if="wayCount">
          <button class="flex center" @click="openMail">{{wayCount}} 封信正在邮寄的路上</button>
        </div>
        <div class="list" v-for="item in dialogs" :key="item._id">
          <Envelope station="dialogId" :mail="item.toMail" :isRead="item.isRead" :isReplied="item.isReplied" :dialogId="item._id" v-if="user._id == item.toUser"></Envelope>
          <Envelope station="dialogId" :mail="item.fromMail" :isRead="true" :isReplied="true" :dialogId="item._id" v-else></Envelope>
        </div>
      </scroll-view>
    </div>

    <!-- 我的 -->
    <div class="pannel grow" v-else>
      <scroll-view scroll-y :style='`height: ${scrolHeight}px`'>
        <div class="my_info flex column">
          <img class="my_info_user-avatarUrl" :src="user.aliasPortrait || 'https://cdn.tellers.cn/tell_v2/static/default-avatar_v2.svg'" mode="scaleToFill" @click="login" />
          <button @click="login" v-if="!user.aliasPortrait">点击登录</button>
          <div class="flex column center" v-else>
            <div class="flex j-around my_info_user-nickName">
              <div @click="login">{{user.aliasName}}</div>
            </div>
            <div class="my_info_user-address flex wrap" @click="showAddressModal">{{user.aliasAddress}}</div>
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
          <button class="my_contact_item-button flex wrap center grow" open-type="contact" :show-message-card="true" send-message-title=“加入群聊” session-from="{'nickName':user.aliasName, 'avatarUrl':user.aliasPortrait}">
            <image class="iconfont" src="/static/svgs/joinGroup.svg" />

            <span class="my_contact_item-text grow">加入群聊</span>
            <image class="group flex center" src="/static/svgs/group.png" />
            <image class="iconfont flex center" src="/static/svgs/arrow.svg" />
          </button>

          <button class="my_contact_item-button flex wrap center grow" @tap="toFaq">
            <image class="iconfont" src="/static/svgs/question.svg" />
            <span class="my_contact_item-text grow">问题与反馈</span>
            <image class="iconfont flex center" src="/static/svgs/arrow.svg" />
          </button>
        </session>

        <session class="my_share flex center">
          <button class="flex center" hover-class="active" @click="toShare">安利Tell给好友</button>
        </session>
      </scroll-view>
    </div>

    <Modal v-if="isShowModal" :type="modal.type" :title="modal.title" :content="modal.content" :confirm="modal.confirm" :sure="modal.sure" @change="showModal"></Modal>

    <HomeTabbar @change="onTabChange" :mailCount="unreadMessages"></HomeTabbar>
  </view>
</template>
<script>
import HomeTabbar from "@/components/HomeTabbar";
import Envelope from "@/components/Envelope";
import Modal from "@/components/Modal";
export default {
  components: {
    HomeTabbar,
    Envelope,
    Modal
  },
  data() {
    return {
      tab: "home",
      banners: [],
      wayCount: 0,
      dialogs: [],
      user: {},
      scrolHeight: 541,
      isShowModal: false,
      modal: {
        title: "",
        content: "",
        confirm: "",
        type: "",
        sure: ""
      },
      unreadMessages: 0
    };
  },
  onLoad(opt) {
    this.onTabChange(opt.tab);
  },
  onLaunch() {},
  onShow() {
    this.getTips();
    this.getScroll();
    this.$request.getUser().then((res)=>{
      this.user = res;
    });
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  },
  methods: {
    onTabChange(tab = "home") {
      this.tab = tab;
      if (this.tab === "home") {
        this.getBanners();
      }
      if (this.tab === "mail") {
        this.getWayCount();
        this.getDialogs();
      }
      if (this.tab === "mine") {
        this.$request.getUser();
      }
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
      this.$router.push({ path: "/pages/consultingBox/consultingBox" });
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
    toShare() {
      this.$router.push({ path: "/pages/share/index" });
    },
    memory() {
      const { user } = getApp().globalData;
      const status = this.$checkAuth(user);
      if (status) {
        this.$router.push({ query: { id: 1 }, path: "/pages/memory/memory" });
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
    },
    toFaq() {
      this.$router.push({
        path: "/pages/faq/index"
      });
    },
    getScroll() {
      const query = wx.createSelectorQuery();
      const res = query
        .select(".bar")
        .boundingClientRect()
        .exec(
          function(res) {
            let barHeight = res[0].height;
            let systemInfo = wx.getSystemInfoSync();
            this.scrolHeight = systemInfo.windowHeight - barHeight;
          }.bind(this)
        );
    },
    showAddressModal() {
      let { title, content, type, confirm, sure } = this.modal;

      this.isShowModal = true;
      title = "Tell 住址";
      content =
        "这是你在 Tell 的住址，用于收取书信。未来会提供更多相关功能，敬请期待！";
      confirm = "no";
      sure = "好的";
    },
    getTips() {
      this.$request.get("/tips").then(res => {
        const { lastTips } = res.data;
        this.unreadMessages = res.data.unreadMessages;
        let { title, content, type, confirm, sure } = this.modal;
        if (lastTips) {
          this.isShowModal = true;
          title = lastTips.title;
          content = lastTips.content;
          type = lastTips.type;
          confirm = "前往解答室";
          sure = "好的";
        }
      });
    },
    showModal() {
      this.isShowModal = false;
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
    border-radius: 4rpx;
  }
}

.entries {
  position: relative;
  .home {
    width: 630rpx;
    margin: 10rpx 60rpx 0 60rpx;
    position: absolute;
    left: 0;
    top: 160rpx;
  }
  .left {
    width: 315rpx;
    height: 906rpx;
    padding: 0;
    z-index: 99;
    position: absolute;
    left: 0;
    top: 160rpx;
    padding-left: 60rpx;
  }
  .right {
    width: 315rpx;
    height: 906rpx;
    padding: 0;
    z-index: 99;
    position: absolute;
    left: 375rpx;
    top: 160rpx;
  }
}

.mailbox_title {
  margin: 40rpx auto;
  & button {
    height: 92rpx;
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
  margin: 40rpx 60rpx 0;
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
    }
    &-nickName {
      font-weight: 600;
      height: 84rpx;
      font-size: 60rpx;
      text-align: center;
      color: #4d495b;
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
  margin: 40rpx 60rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  &_item {
    height: 172rpx;
    width: 210rpx;
    background-color: #ffffff;
    &-button {
      height: 172rpx;
      width: 210rpx;
      color: #4d495b;
      font-weight: 600;
    }

    &-text {
      font-size: 28rpx;
    }
  }
}
.my_contact {
  width: 630rpx;
  height: 216rpx;
  margin: 40rpx 60rpx;
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
      color: #4d495b;
      font-weight: 600;
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
  .group {
    width: 72rpx;
    height: 72rpx;
    margin-right: 20rpx;
  }
}
.my_share {
  margin: 40rpx 60rpx;
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


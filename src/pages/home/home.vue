<template>
  <view class="page flex column">
    <!-- 首页 -->
    <div
      v-if="tab == 'home'"
      class="pannel grow"
    >
      <scroll-view
        class="entries"
        scroll-y
        :style="`height: ${scrolHeight}px`"
      >
        <swiper
          class="swiper"
          :indicator-dots=" banners.length > 1 "
          autoplay="true"
          interval="5000"
          duration="1000"
          circular="true"
        >
          <block
            v-for="item in banners"
            :key="item"
          >
            <swiper-item>
              <image
                :src="item.imgUrl"
                class="img"
                @click="toBanner(item)"
              />
            </swiper-item>
          </block>
        </swiper>
        <image
          class="home flex center"
          src="/static/jpg/homeBg.jpg"
        />
        <div
          class="left"
          @click="toConsulting"
        />
        <div
          v-if="user.unionid"
          class="right"
          @click="toSolution"
        />
        <div
          v-else
          class="right"
        >
          <button
            class="rightButton"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="onGotUserInfo"
          />
        </div>
      </scroll-view>
    </div>

    <!-- 信箱 -->
    <div
      v-else-if="tab == 'mail'"
      class="pannel grow"
    >
      <scroll-view
        scroll-y
        :style="`height: ${scrolHeight}px`"
        @scrolltolower="scrolltolower"
      >
        <div
          v-if="wayCount"
          class="mailbox_title flex center"
        >
          <button
            class="flex center"
            @click="openMail"
          >
            {{ wayCount }} 封信正在邮寄的路上
          </button>
        </div>
        <div
          v-for="item in dialogs"
          :key="item._id"
          class="list"
        >
          <Envelope
            v-if="user._id == item.toUser"
            station="dialogId"
            :mail="item.toMail"
            :is-read="item.isRead"
            :is-special="item.special"
            :is-replied="item.isSpecial"
            :dialog-id="item._id"
            :show-refer="true"
            :refer-mail="item.fromMail"
          />
          <Envelope
            v-else
            station="dialogId"
            :mail="item.fromMail"
            :is-read="true"
            :is-replied="true"            
            :dialog-id="item._id"
            :show-refer="true"
          />
        </div>
      </scroll-view>
    </div>

    <!-- 我的 -->
    <div
      v-else
      class="pannel grow"
    >
      <scroll-view
        scroll-y
        :style="`height: ${scrolHeight}px`"
      >
        <div class="my_info flex column">
          <button
            v-if="!user.aliasPortrait"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="onGotUserInfo"
          >
            <img
              class="my_info_user_avatarUrl"
              src="https://cdn.tellers.cn/tell_v2/static/default-avatar_v2.svg"
              mode="scaleToFill"
              @click="login"
            >
          </button>
          <img
            v-else
            class="my_info_user_avatarUrl"
            :src="user.aliasPortrait || 'https://cdn.tellers.cn/tell_v2/static/default-avatar_v2.svg'"
            mode="scaleToFill"
            @click="login"
          >

          <div
            v-if="!user.aliasPortrait"
            class="flex column center"
          >
            <button
              class="lightButton"
              open-type="getUserInfo"
              lang="zh_CN"
              @getuserinfo="onGotUserInfo"
            >
              点击登录
            </button>
            <div class="my_info_user_address flex wrap">
              登录后体验完整功能
            </div>
          </div>

          <div
            v-else
            class="flex column center"
          >
            <div class="flex j-around my_info_user_nickName">
              <div @click="loginName">
                {{ user.aliasName }}
              </div>
              <button
                class="my_info_user_badgeBtn flex center"
                @click="openbadge"
              >
                <image
                  v-if="badge"
                  class="my_info_user_badge"
                  :src="badge.imgUrl"
                />
              </button>
            </div>
            <div
              class="my_info_user_address flex wrap"
              @click="showAddressModal"
            >
              {{ user.aliasAddress }}
            </div>
          </div>
        </div>

        <session class="my_function flex">
          <button
            class="my_function_item_button flex column center"
            @tap="memory"
          >
            <image
              class="iconfont"
              src="/static/svgs/moment.svg"
            />
            <span class="my_function_item_text">记忆</span>
          </button>

          <button
            class="my_function_item_button flex column center"
            @click="ticket"
          >
            <image
              class="iconfont"
              src="/static/svgs/ticket.svg"
            />
            <span class="my_function_item_text">票券</span>
          </button>

          <button
            v-if="!user.unionid"
            class="my_function_item_button flex column center"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="onGotUserInfo"
          >
            <image
              class="iconfont"
              src="/static/svgs/badge.svg"
            />
            <span class="my_function_item_text">徽章</span>
          </button>

          <button
            v-else
            class="my_function_item_button flex column center"
            @click="openbadge"
          >
            <image
              class="iconfont"
              src="/static/svgs/badge.svg"
            />
            <span class="my_function_item_text">徽章</span>
          </button>
        </session>

        <session class="my_contact flex column">
          <button
            v-if="!user.unionid"
            class="my_contact_item_button flex wrap center grow"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="onGotUserInfo"
          >
            <image
              class="iconfont"
              src="/static/svgs/welfare.svg"
            />
            <span class="my_contact_item_text grow">福利社</span>
            <image
              class="iconfont flex center"
              src="/static/svgs/arrow.svg"
            />
          </button>

          <button
            v-else
            class="my_contact_item_button flex wrap center grow"
            @click="welfare"
          >
            <image
              class="iconfont"
              src="/static/svgs/welfare.svg"
            />
            <span class="my_contact_item_text grow">福利社</span>
            <image
              class="iconfont flex center"
              src="/static/svgs/arrow.svg"
            />
          </button>

          <button
            class="my_contact_item_button flex wrap center grow"
            @click="joinGroup"
          >
            <image
              class="iconfont"
              src="/static/svgs/joinGroup.svg"
            />
            <span class="my_contact_item_text grow">加入群聊</span>
            <image
              class="group flex center"
              src="/static/jpg/group.png"
            />
            <image
              class="iconfont flex center"
              src="/static/svgs/arrow.svg"
            />
          </button>

          <button
            class="my_contact_item_button flex wrap center grow"
            @click="toFaq"
          >
            <image
              class="iconfont"
              src="/static/svgs/question.svg"
            />
            <span class="my_contact_item_text grow">问题与反馈</span>
            <image
              class="iconfont flex center"
              src="/static/svgs/arrow.svg"
            />
          </button>
        </session>

        <session class="my_share flex center">
          <button
            class="flex center"
            hover-class="active"
            @click="toShare"
          >
            分享Tell给好友
          </button>
        </session>
      </scroll-view>
      <div
        v-if="showSetName"
        class="modal"
        @click="clickMask"
      >
        <div class="modalCard">
          <div class="set">
            设置笔名
          </div>
          <input
            type="text"
            :value="setName"
            placeholder="设置笔名"
            maxlength="10"
            focus
            @input="setNameFun"
          >
          <div class="saveButton">
            <button @click="saveNameFun">
              保存
            </button>
          </div>
        </div>
      </div>
    </div>


    <Modal ref="mymodal" />
    <ImgModal ref="myImgmodal" />

    <HomeTabbar
      :mail-count="unreadMessages"
      @change="onTabChange"
    />
  </view>
</template>
<script>
import HomeTabbar from "@/components/HomeTabbar";
import Envelope from "@/components/Envelope";
import Modal from "@/components/Modal";
import ImgModal from "@/components/ImgModal";


export default {
  components: {
    HomeTabbar,
    Envelope,
    Modal,
    ImgModal
  },
  data() {
    return {
      tab: "home",
      banners: [],
      wayCount: 0,
      dialogs: [],
      badge: {
        imgUrl: ""
      },
      user: {
        aliasPortrait: "",
        aliasName: ""
      },
      scrolHeight: 541,
      isShowModal: false,
      modal: {
        title: "",
        content: "",
        confirmButtonText: "",
        type: "",
        sure: ""
      },
      unreadMessages: 0,
      toPage: null,
      page: 1,
      hasMore: true,
      getPhoto: false,
      showSetName: false,
      setName: ""
    };
  },
  onLoad(opt) {
    this.toPage = opt.toPage;
    this.tab = opt.tab;
  },
  onShow() {
    if (this.toPage) {
      let toPage = this.toPage;
      this.toPage = null;
      return this.$router.push({
        path: toPage,
        query: this.$mp.query
      });
    }
    this.sjh = "ss";
    this.getTips();
    this.getScroll();
    if(this.getPhoto) return;
    this.$request.getUser().then(res => {
      this.user = res;
    });

    this.isFlage = false;
    this.onTabChange(this.tab);
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
        this.getBadge();
      }
    },
    onGotUserInfo(e) {
      this.$request.auth(e.detail);
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
    async getDialogs(page = 1) {
      if (this.hasMore === false) return false;
      let res = await this.$request.get(`/dialog?page=${page}`);
      if(res.data.length === 0){
        this.hasMore = false;
        return false;
      }
      if (page == 1) {
        this.page = 1;
        this.dialogs = res.data;
      } else if (res.data.length > 0) {
        this.page = page;
        this.dialogs = this.dialogs.concat(res.data);
      }

    },
    toConsulting() {
      this.$router.push({ path: "/pages/consultingBox/consultingBox" });
    },
    toSolution() {
      const { user } = getApp().globalData;
      if (!user.becomeAnswererAt) {
        return this.$router.push({
          query: { active: "solverDetail" },
          path: "/pages/manual/index"
        });
      }
      return this.$router.push({ path: "/pages/solution/solutionRoom" });
    },
    toShare() {
      this.$router.push({ path: "/pages/share/share" });
    },
    memory() {
      this.$router.push({ query: { id: 1 }, path: "/pages/memory/memory" });
    },
    ticket() {
      this.$router.push({
        query: { id: 1 },
        path: "/pages/ticket/ticketList"
      });
    },
    welfare() {
      this.$router.push({
        query: { id: 1 },
        path: "/pages/welfare/index"
      });
    },
    openbadge() {
      this.$router.push({ path: "/pages/badge/badge" });
    },
    login() {
      let sourceType = [];
      const that = this;
      wx.showActionSheet({
      itemList: ['从相册选择新头像', '拍个新头像'],
        success(res) {
          if(res.tapIndex === 0){
            sourceType = ['album']
          }
          if(res.tapIndex === 1){
            sourceType = ['camera']
          }
          if(res.tapIndex === 2){
            return;
          } 
          that.getPhoto = true;
          wx.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: sourceType,
            success: function(res) {
              wx.showLoading({
                title: "上传中",
                mask: true
              });
              const tempFilePaths = res.tempFilePaths;
              that.$request.uploadFile(tempFilePaths[0]).then(
                function(res) {
                  let data = JSON.parse(res.data);
                  let user = this.user;
                  user.aliasPortrait = data.data;
                  this.user = user;
                  const { aliasName, aliasPortrait } = this.user;
                  this.$request.put("/user", {
                    aliasName,
                    aliasPortrait
                  });
                  wx.hideLoading();
                }.bind(that)
              );
            }.bind(this),
            fail(e) {
              wx.hideLoading();
            }
          });
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
    loginName() {
      this.setName = this.user.aliasName;
      this.showSetName = true;
    },
    clickMask(){
      this.showSetName = false;
    },
    setNameFun(e) {
      this.setName = e.detail.value;
    },
    saveNameFun(){
      const aliasName = this.setName;
      const aliasPortrait = this.user.aliasPortrait;
      if (aliasName) {
        if (aliasName.length < 2) {
          return wx.showToast({ title: "请设置大于2个字符的笔名" });
        }

        if(aliasName.length > 10){
          return wx.showToast({ title: "请设置小于10个字符的笔名" });
        }
        if(!aliasName){
          return wx.showToast({ title: "请设置头像" });
        }
        this.$request
          .put("/user", {
            aliasName,
            aliasPortrait
          })
          .then(res => {
            this.user.aliasName = this.setName;
            this.showSetName = false;
          });
      }
      
    },
    getBadge() {
      this.$request.get("/badge/mine").then(res => {
        this.badge = res.data;
      });
    },
    toFaq() {
      this.$router.push({
        path: "/pages/faq/index"
      });
    },
    scrolltolower() {
      this.getDialogs(this.page + 1);
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
      this.$refs.mymodal.show({
        title: "Tell 住址",
        content: "这是你在 Tell 的住址，用于收取书信。未来会提供更多相关功能，敬请期待！"
      });
    },
    joinGroup() {
      this.$refs.myImgmodal.show({
        title: "如何加群",
        type: "ALERT",
        sureButtonText: "马上开始"
      });
    },
    getTips() {
      this.$request.get("/tips").then(res => {
        const { lastTips } = res.data;
        this.unreadMessages = res.data.unreadMessages;
        if (lastTips) {
          this.$refs.mymodal.show({
            title: lastTips.title,
            content: lastTips.content,
            type: lastTips.type,
            confirmButtonText: lastTips.confirmButtonText
          });
        }
      });
    },
    toBanner(banner) {
      switch (banner.type) {
        case "MINI":
          wx.navigateToMiniProgram({
            appId: banner.appId,
            path: banner.path
          });
          break;
        case "WEBVIEW":
          wx.navigateTo({
            url: `/pages/webview/index?url=${banner.url}&title=${banner.title}`
          })
          break;
        case "PAGE":
          this.$router.push({
            query: banner.query,
            path: banner.path
          });
          break;
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
    border-radius: 4rpx;
  }
}

.entries {
  position: relative;
  background: #ffffff;
  .home {
    width: 612rpx;
    height: 906rpx;
    margin: 20rpx 60rpx 0 60rpx;
    position: absolute;
    left: 0;
    top: 160rpx;
  }
  .left {
    width: 315rpx;
    height: 906rpx;
    z-index: 99;
    position: absolute;
    left: 0;
    top: 160rpx;
    margin: 20rpx 0rpx 0 60rpx;
  }
  .right {
    width: 315rpx;
    height: 906rpx;
    z-index: 99;
    position: absolute;
    left: 375rpx;
    top: 160rpx;
    margin: 20rpx 60rpx 0 0;
  }
  .rightButton {
    width: 315rpx;
    height: 906rpx;
    z-index: 99;
    position: absolute;
    background-color: transparent;
    padding: 0;
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
  height: 526rpx;
  margin: 40rpx 40rpx;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  &_user {
    &_badgeBtn {
      padding: 0;
      margin-left: 12rpx;
    }
    &_badge {
      width: 60rpx;
      height: 60rpx;
    }
    &_avatarUrl {
      display: block;
      border-radius: 50%;
      height: 216rpx;
      width: 216rpx;
      margin: 60rpx auto 44rpx;
    }
    &_nickName {
      font-weight: 600;
      height: 84rpx;
      font-size: 60rpx;
      text-align: center;
      color: #4d495b;
    }
    &_address {
      height: 40rpx;
      font-size: 32rpx;
      text-align: center;
      color: #bdbdc0;
      margin-top: 20rpx;
      margin-bottom: 60rpx;
    }
  }
  .lightButton {
    margin-bottom: 20rpx;
    margin-top: 0rpx;
    height: 64rpx;
    // line-height: 64rpx;
  }
}

.my_function {
  height: 172rpx;
  margin: 40rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  &_item {
    height: 172rpx;
    width: 210rpx;
    background-color: #ffffff;
    &_button {
      height: 172rpx;
      width: 222rpx;
      color: #4d495b;
    }
    &_text {
      font-size: 32rpx;
      color: #4d495b;
    }
  }
}
.my_contact {
  height: 324rpx;
  margin: 40rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  &_item {
    &_button {
      width: 100%;
      height: 108rpx;
      padding: 32rpx 40rpx;
      align-items: center;
      color: #4d495b;
      background-color: #ffffff;
    }
    &_img {
      height: 36rpx;
      width: 36rpx;
      margin: 18rpx 20rpx;
    }
    &_text {
      margin-left: 20rpx;
      font-size: 32rpx;
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
    font-weight: 600;
    &.active {
      background: #fff;
    }
  }
}

.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index:99;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(77, 73, 91, 0.3);
}
.modalCard{
  width: 630rpx;
  max-height: 598rpx;
  min-height: 402rpx;
  background-color: #ffffff;
  border-radius: 4rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);  
  & .set{
    margin: 40rpx;
    color: #4d495b;
  }
  & input {
    margin:40rpx;
    border-radius: 4rpx;
    height: 84rpx;
    width: 500rpx;
    padding-left: 20rpx;
    background-color: rgba(189, 189, 192, 0.15);
  }
}
.saveButton {
  width: 316rpx;
  height: 92rpx;
  margin: auto;
  margin-bottom: 60rpx;
  & button {
    background-color: #ffc86d;
    color: #ffffff;
    border-radius: 23px;
  }
}

</style>


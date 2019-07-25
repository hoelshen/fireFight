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
          :indicator-dots="banners.length > 1"
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
        <session class="my_function flex">
          <button
            class="my_function_item_button flex column center"
            @tap="joinGroup"
          >
            <image
              class="iconfont"
              src="/static/svgs/moment.svg"
            />
            <span class="my_function_item_text">钱包</span>
          </button>

          <button
            class="my_function_item_button flex column center"
            @click="ticket"
          >
            <image
              class="iconfont"
              src="/static/svgs/ticket.svg"
            />
            <span class="my_function_item_text">停车券</span>
          </button>

          <button
            class="my_function_item_button flex column center"
            @click="ticket"
          >
            <image
              class="iconfont"
              src="/static/svgs/badge.svg"
            />
            <span class="my_function_item_text">积分</span>
          </button>
          <button
            class="my_function_item_button flex column center"
            @click="joinGroup"
          >
            <image
              class="iconfont"
              src="/static/svgs/badge.svg"
            />
            <span class="my_function_item_text">缴费</span>
          </button>
        </session>

        <session class="my_contact flex column">
          <div class="flex j-between">
            <div class="flex a-center ">
              <img
                class="my_info_user_avatarUrl"
                src="https://cdn.tellers.cn/tell_v2/static/default-avatar_v2.svg"
                mode="scaleToFill"
                @click="login"
              >
              <span class="carPhone">8G079</span>
            </div>
            <switch
              class="flex center"
              checked
              @change="switch1Change"
            >
              自动支付
            </switch>
          </div>
          <div class="flex center carPark">
            您尚未驶入停车场
          </div>
        </session>
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
        <div class="flex car_block">
          <input
            class="input"
            maxlength="1"
            type="number"
            :focus="focusInput"
            :value="name"
            @input="bindCarNumber"
          >
          <input
            class="input"
            maxlength="1"
            type="number"
            :focus="focusInput"
            :value="letter"
            @input="bindCarNumber"
          >
          <input
            class="input"
            maxlength="1"
            :focus="focusInput"
            :value="oneNumber"
            @input="bindCarNumber"
          >
          <input
            class="input"
            maxlength="1"
            type="number"
            :focus="focusInput"
            :value="twoNumber"
            @input="bindCarNumber"
          >
          <input
            class="input"
            maxlength="1"
            type="number"
            :focus="focusInput"
            :value="threeNumber"
            @input="bindCarNumber"
          >
          <input
            class="input"
            maxlength="1"
            type="number"
            :focus="focusInput"
            :value="fourNumber"
            @input="bindCarNumber"
          >
          <input
            class="input"
            maxlength="1"
            type="number"
            :focus="focusInput"
            :value="fiveNumber"
            @input="bindCarNumber"
          >
          <button class="newButton">
            +新能源
          </button>
        </div>
        <div
          class="flex center lightButton"
          @click="continu"
        >
          查询缴费
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
        <div class="my_info flex a-center">
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
          <span class="my_function_item_text">18664306047</span>
          <button>退出</button>
        </div>

        <session class="my_function flex">
          <button
            class="my_function_item_button flex column center"
            @tap="joinGroup"
          >
            <image
              class="iconfont"
              src="/static/svgs/moment.svg"
            />
            <span class="my_function_item_text">账户余额</span>
          </button>

          <button
            class="my_function_item_button flex column center"
            @click="ticket"
          >
            <image
              class="iconfont"
              src="/static/svgs/ticket.svg"
            />
            <span class="my_function_item_text">停车券</span>
          </button>

          <button
            class="my_function_item_button flex column center"
            @click="ticket"
          >
            <image
              class="iconfont"
              src="/static/svgs/badge.svg"
            />
            <span class="my_function_item_text">积分</span>
          </button>
          <button
            class="my_function_item_button flex column center"
            @click="joinGroup"
          >
            <image
              class="iconfont"
              src="/static/svgs/badge.svg"
            />
            <span class="my_function_item_text">我的钱包</span>
          </button>
        </session>

        <session class="my_contact flex column">
          <button
            class="my_contact_item_button flex wrap center grow"
            @click="joinGroup"
          >
            <image
              class="iconfont"
              src="/static/svgs/welfare.svg"
            />
            <span class="my_contact_item_text grow">积分兑换</span>
            <image
              class="iconfont_sixteen flex center"
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
            <span class="my_contact_item_text grow">停车记录</span>

            <image
              class="iconfont_sixteen flex center"
              src="/static/svgs/arrow.svg"
            />
          </button>

          <button
            class="my_contact_item_button flex wrap center grow"
            @click="carManage"
          >
            <image
              class="iconfont"
              src="/static/svgs/joinGroup.svg"
            />
            <span class="my_contact_item_text grow">车辆管理</span>

            <image
              class="iconfont_sixteen flex center"
              src="/static/svgs/arrow.svg"
            />
          </button>

          <button
            class="my_contact_item_button flex wrap center grow"
            @click="joinGroup"
          >
            <image
              class="iconfont"
              src="/static/svgs/question.svg"
            />
            <span class="my_contact_item_text grow">问题与反馈</span>
            <image
              class="iconfont_sixteen flex center"
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
            <span class="my_contact_item_text grow">发票</span>

            <image
              class="iconfont_sixteen flex center"
              src="/static/svgs/arrow.svg"
            />
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

    <HomeTabbar
      :mail-count="unreadMessages"
      @change="onTabChange"
    />
  </view>
</template>
<script>
import HomeTabbar from "@/components/HomeTabbar";

import shareMix from "@/mixins/mixin";
export default {
  components: {
    HomeTabbar
  },
  mixins: [shareMix],
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
      setName: "",
      focusInput: false,
      name: "浙",
      letter: "B",
      oneNumber: "1", //车牌号码
      twoNumber: "2",
      threeNumber: "3",
      fourNumber: "4",
      fiveNumber: "5"
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

    this.getScroll();
    if (this.getPhoto) return;
    // this.$request.getUser().then(res => {
    //   this.user = res;
    // });

    this.isFlage = false;
    this.onTabChange(this.tab);
  },
  methods: {
    onTabChange(tab = "home") {
      this.tab = tab;
      if (this.tab === "home") {
        this.getBanners();
      }
      if (this.tab === "mail") {
      }
      if (this.tab === "mine") {
      }
    },
    onGotUserInfo(e) {
      this.$request.auth(e.detail);
    },
    async getBanners() {
      wx.request({
        url: "https://www.meitingpark.com/mobile/index.html", 
        dataType: 'json',
        data:{},
        method:"get",
        header: {
          "content-type": "application/json" // 默认值
        },
        success(res) {
          console.log(res.data);
        }
      });

      // const res = await this.$request.post("/index.html");
      this.banners = res.data;
    },
    toShare() {
      this.$router.push({ path: "/pages/share/share" });
    },
    ticket() {
      this.$router.push({
        query: { id: 1 },
        path: "/pages/errors/index"
      });
    },
    login() {
      let sourceType = [];
      const that = this;
      wx.showActionSheet({
        itemList: ["从相册选择新头像", "拍个新头像"],
        success(res) {
          if (res.tapIndex === 0) {
            sourceType = ["album"];
          }
          if (res.tapIndex === 1) {
            sourceType = ["camera"];
          }
          if (res.tapIndex === 2) {
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
          console.log(res.errMsg);
        }
      });
    },
    loginName() {
      this.setName = this.user.aliasName;
      this.showSetName = true;
    },
    clickMask() {
      this.showSetName = false;
    },
    setNameFun(e) {
      this.setName = e.detail.value;
    },
    saveNameFun() {},
    scrolltolower() {},
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
    joinGroup() {
      this.$router.push({
        path: "/pages/errors/index"
      });
    },
    carManage() {
      this.$router.push({
        path: "/pages/carManage/index"
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
        case "PAGE":
          this.$router.push({
            query: banner.query,
            path: banner.path
          });
          break;
      }
    },
    bindCarNumber() {},
    continu() {}
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
  height: 326rpx;
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
      height: 88rpx;
      width: 88rpx;
      margin: 60rpx auto 44rpx 40rpx;
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
    background-color: #ffffff;
    &_button {
      height: 172rpx;
      color: #4d495b;
    }
    &_text {
      font-size: 32rpx;
      color: #4d495b;
    }
  }
}
.my_contact {
  height: 524rpx;
  margin: 40rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  .carPark {
    margin-top: 80rpx;
    border-top-color: rgba(191, 189, 192, 0.15);
    border-top-style: solid;
    border-top-width: 2rpx;
  }
  .carPhone {
    margin-left: 40rpx;
  }
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
  z-index: 99;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(77, 73, 91, 0.3);
}
.modalCard {
  width: 630rpx;
  max-height: 598rpx;
  min-height: 402rpx;
  background-color: #ffffff;
  border-radius: 4rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  & .set {
    margin: 40rpx;
    color: #4d495b;
  }
  & input {
    margin: 40rpx;
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
.iconfont_sixteen {
  width: 32rpx;
  height: 32rpx;
}

.newButton {
  box-sizing: border-box;
  border: 2rpx solid rgba(189, 189, 192, 0.1);
}
.input {
  width: 50rpx;

  height: 84rpx;
  padding-left: 20rpx;
  background-color: rgba(189, 189, 192, 0.1);
}
.wait {
  font-size: 32rpx;
}
.car_block {
  padding-left: 40rpx;
}
</style>


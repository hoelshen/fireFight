<template>
  <div class="app flex column center">
    <div
      v-if="!showContent"
      class="prompt flex column center grow"
    >
      <div class="flex column j-between">
        <span class="text">如果需要更及时专业的帮助</span>
        <span class="text">请尽快联系心理救援机构</span>
        <span
          class="flex center psychological"
          hover-class="active"
          @tap="show"
        >查看心理救援机构</span>
        <button
          class="flex center darkButton"
          hover-class="active"
          @tap="send"
        >
          继续投递
        </button>
      </div>
    </div>

    <scroll-view
      v-else
      class="scroll"
      scroll-y
    >
      <div class="list">
        <div class="list_item flex column j-between">
          <div class="flex j-start card">
            <image
              class="iconfont"
              src="/static/svgs/psychological.svg"
            />
            <div class="title">
              北京心理危机研究与干预中心
            </div>
          </div>
          <div
            class="phone"
            data-tel="8008101117"
            @tap="makePhone"
          >
            8008101117
          </div>
          <div class="time">
            24小时热线
          </div>
        </div>

        <div class="list_item flex column j-between">
          <div class="flex j-start card">
            <image
              class="iconfont"
              src="/static/svgs/psychological.svg"
            />
            <div class="title">
              深圳市心理危机干预中心
            </div>
          </div>
          <div
            class="phone"
            data-tel="075525629459 "
            @tap="makePhone"
          >
            0755-25629459
          </div>
          <div class="time">
            8:00 - 23:00
          </div>
        </div>

        <div class="list_item flex column j-between">
          <div class="flex j-start card">
            <image
              class="iconfont"
              src="/static/svgs/psychological.svg"
            />
            <div class="title">
              长春市心理援助热线
            </div>
          </div>
          <div
            class="phone"
            data-tel="043189685000"
            @tap="makePhone"
          >
            0431-89685000
          </div>
          <div class="time">
            24小时热线
          </div>
          <div
            class="phone"
            data-tel="043189685333"
            @tap="makePhone"
          >
            0431-89685333
          </div>
          <div class="time">
            8:00 - 16:00
          </div>
        </div>

        <div class="list_item flex column j-between">
          <div class="flex j-start card">
            <image
              class="iconfont"
              src="/static/svgs/psychological.svg"
            />
            <div class="title">
              青岛市心理危机干预中心
            </div>
          </div>
          <div
            class="phone"
            data-tel="053285669120"
            @tap="makePhone"
          >
            0532-85669120
          </div>
          <div class="time">
            24小时热线
          </div>
        </div>

        <div class="list_item flex column j-between">
          <div class="flex j-start card">
            <image
              class="iconfont"
              src="/static/svgs/psychological.svg"
            />
            <div class="title">
              广州市心理危机干预中心热线
            </div>
          </div>
          <div
            class="phone"
            data-tel="02081899120"
            @tap="makePhone"
          >
            020-81899120
          </div>
          <div class="time">
            24小时热线
          </div>
        </div>

        <div class=" flex center">
          <button
            class="flex center darkButton"
            hover-class="active"
            @tap="send"
          >
            继续投递
          </button>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      showContent: false,
      scrolHeight: 562
    };
  },
  methods: {
    show() {
      this.showContent = true;
    },
    back() {
      this.showContent = false;
    },
    async send() {
      let { content, weather, aliasName } = getApp().globalData.mail;
      let res = await this.$request.post("/mail/story", {
        content,
        weather,
        aliasName
      });
      if (res.success) {
        wx.removeStorage({
          key: "story"
        });
        this.$router.push({
          query: {
            active: "story",
            targetUser: this.target
          },
          path: "/pages/solution/promptPage"
        });
      }
    },
    makePhone(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    }
  },
  onLoad() {},
};
</script>

<style scoped lang="less">
.scroll {
  height: 100vh;
}
.app {
  padding-bottom: 40rpx;
}
.text {
  font-size: 32rpx;
}
.psychological {
  font-size: 28rpx;
  color: #ffc86d;
  font-weight: 600;
  margin-top: 60rpx;
}
.card {
  margin: 40rpx 40rpx 20rpx 40rpx;
}
.darkButton {
  padding: 0rpx 102rpx;
  margin-top: 60rpx;
}
.title {
  margin-left: 20rpx;
  font-size: 32rpx;
  font-weight: 600;
}
.phone {
  font-size: 28rpx;
  margin: 20rpx 40rpx;
  color: #ffc86d;
}
.time {
  font-size: 24rpx;
  margin: 20rpx 40rpx 40rpx;
  color: #bdbdc0;
}
.list_item {
  width: 670rpx;
  margin: 40rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  color: #4d495b;
  border-radius: 4rpx;
}
</style>

<template>
  <view class="app">
    <div class="solverDetailStyle flex column center" v-if="active === 'solverDetail'">
      <div class="flex center column grow">
        <p>需要先成为解答者，才能查阅这里的信件</p>
        <p>你可以阅读手册来了解相关约定</p>
        <button class="flex center solverDetailStyleBtn" @click="onDetail">
          <span class="solverDetailStyleBtnSpan">解答者手册</span>
          <image class="iconfont" src="/static/svgs/left_arrow.svg">
          </image>
        </button>
      </div>

      <div class="flex j-end solverDetailBtn column">
        <button class="darkButton" @click="onSoluter">申请成为解答者</button>
        <div class="flex center solverDetailcheck">
          <checkbox :checked="checked" @click="ensure" />
          <span class="flex solverDetailspan">同意并遵守《解答者手册》的约定</span>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  name: "Manual",
  data() {
    return {
      active: "solverDetail",
      listData: [],
      checked: true
    };
  },
  onShow(opts) {
    const { currentRoute: { query } } = this.$router;
    this.active = query.active;
    const navigationBar = {
      solverDetail: "解答者手册",
      solutionLimit: "每日解答上限说明"
    };
    wx.setNavigationBarTitle({
      title: navigationBar[this.active]
    });
    this.bade();
  },
  methods: {
    onDetail() {
      this.$router.push({
        query: { page: "Solver-Manual" },
        path: "/pages/webview/index"
      });
    },
    onSoluter() {
      const { user } = getApp().globalData;
      if (this.checked) {
        if (!user.authAt)
          return this.$router.push({ path: "/pages/penName/index" });

        return this.$router.push({ path: "pages/solution/tags" });
      } else {
        wx.showToast({
          title: "请同意并遵守《解答者手册》的约定",
          icon: "none",
          duration: 2000
        });
      }
    },
    ensure() {
      this.checked = !this.checked;
    },
    async bade() {
      const bade = await this.$request.get("/badge");
      this.listData = bade.data;
    },
    onShareAppMessage(res) {
      let { title, imageUrl, path, user } = getApp().globalData;
      path = user._id ? `${path}&refer=${user._id}` : path;
      return {
        title,
        imageUrl,
        path
      };
    }
  }
};
</script>
<style lang="less">
.solverDetailStyle {
  height: 100vh;
  background-color: #ffffff;
  .solverDetailBtn {
    margin-bottom: 60rpx;
    button {
      margin-top: 24rpx;
    }
  }
}
.solverDetailcheck {
  margin-top: 24rpx;
}
.solverDetailspan {
  color: #a9a9a9;
  font-size: 28rpx;
  margin-left: 10rpx;
}
.solverDetailStyleBtn {
  margin-top: 60rpx;
}
.solverDetailStyleBtnSpan {
  margin-right: 20rpx;
  font-size:28rpx;
  font-weight:600;
}

.solutionLimit {
  &_title {
    width: 670rpx;
    height: 80rpx;
    margin: 20rpx 60rpx 20rpx 60rpx;
  }
}

</style>
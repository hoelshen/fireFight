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
          <checkbox :value="checked" @click="ensure" />
          <span class="flex solverDetailspan">同意并遵守《解答者手册》的约定</span>
        </div>
      </div>
    </div>

    <div v-if="active === 'solutionLimit'">
      <div class="solutionLimit_title">每日收取到的咨询以及可解答次数与你持有的徽章会有关，具体关系如下</div>
      <view class="table">
        <view class="tr bg-w">
          <view class="th">持有徽章</view>
          <view class="th">每日收取</view>
          <view class="th">每日可解答</view>
        </view>
        <block v-for="(item,index) in listData" :key="index">
          <view class="tr bg-g" v-if="index % 2 == 0">
            <view class="td">
              <!-- <img
                :src="item.imgUrl"
                alt=""
              >-->
              <span>{{item.name}}</span>
            </view>
            <view class="td">{{item.mailboxLimit}}</view>
            <view class="td">{{item.replyLimit}}</view>
          </view>

          <view class="tr" v-else>
            <view class="td">{{item.name}}</view>
            <view class="td">{{item.mailboxLimit}}</view>
            <view class="td">{{item.replyLimit}}</view>
          </view>
        </block>
      </view>
    </div>
  </view>
</template>

<script>
export default {
  name: "Tdetail",
  data() {
    return {
      active: "solverDetail",
      listData: [],
      checked: false
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
      console.log("this.checked: ", this.checked);
      if (this.checked) {
        if (!user.authAt)
          return this.$router.push({ path: "/pages/setPenName/index" });

        return this.$router.push({ path: "pages/solution/solutionDetail" });
      } else {
        wx.showToast({
          title: "请点击确定",
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
}
.solverDetailStyleBtn {
  margin-top: 60rpx;
}
.solverDetailStyleBtnSpan {
  margin-right: 20rpx;
}

.solutionLimit {
  &_title {
    width: 670rpx;
    height: 80rpx;
    margin: 20rpx 60rpx 20rpx 60rpx;
  }
}
.table {
  width: 670rpx;
  height: 80rpx;
  margin: 20rpx 60rpx 20rpx 60rpx;
  background: #ffffff;
}
.tr {
  display: flex;
  justify-content: center;
  height: 3rem;
  align-items: center;
  border: 1px solid #000000;
}
.td {
  width: 250rpx;
  justify-content: center;
  text-align: center;
  height: 3rem;
  border: 1rpx solid #000000;
}
.bg-w {
  background: #ffffff;
}
.th {
  width: 424rpx;
  justify-content: center;
  border: 1px solid #000000;
  background: #ffffff;
  color: #000000;
  display: flex;
  height: 3rem;
  align-items: center;
}
</style>
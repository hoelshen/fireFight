<template>
  <view class="app flex column j-between">
    <div class="soDetail">
      <div class="title">
        选择你最愿意看到的话题
      </div>
      <div
        v-for="(item,index) in titles"
        :key="index"
        class="tag box"
        :class="activeIndex == index ?'active' :''"
        @click="select(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="foot">
      <button
        v-if="!isFlag"
        class="titleButton flex center darkButton"
        @click="add"
      >
        提交申请
      </button>
      <button
        v-else
        class="titleButton flex center darkButton"
        @click="add"
      >
        修改
      </button>
      <span class="titleButtonSpan">你收到的咨询会在一定数量上接近该话题以后你也可以随时修改，并在次日生效</span>
    </div>
  </view>
</template>
<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      titles: [],
      title: {},
      isFlag: false,
      activeIndex: -1
    };
  },
  methods: {
    async getTags() {
      let res = await this.$request.get("/tag");
      this.titles = res.data;
    },
    select(index) {
      this.title = this.titles[index];
      this.activeIndex = index;
    },
    async add() {
      if (!this.title._id) {
        return wx.showToast({
          title: "请选择标签",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false
        });
      }
      await this.$request.put("/tag", { _id: this.title._id });
      if (this.isFlag) {
        wx.navigateBack({
          data: 1
        });
      } else {
        this.$router.push({ path: "/pages/solution/becomeSolutor" });
      }
    }
  },
  async onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    const { user } = getApp().globalData;
    if (user.becomeAnswererAt) {
      this.isFlag = true;
    }
    let tagName = null;
    await this.getTags();

    if (query.name) {
      tagName = query.name;
      this.titles.forEach((item, index) => {
        if (item.name === tagName) {
          this.title = item;
          this.activeIndex = index;
          return;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.soDetail {
  margin: 20rpx 60rpx 0 60rpx;
}
.title {
  margin: 40rpx 40rpx 40rpx 0;
  font-size: 32rpx;
}
.foot {
  margin: 60rpx;
  & button {
    margin-bottom: 40rpx;
  }
}

.darkButton {
  width: 358rpx;
}
.titleButtonSpan {
  color: #a9a9a9;
  font-size: 28rpx;
  line-height: 52rpx;
}

.tags {
  padding: 40rpx 10rpx 40rpx 40rpx;
  height: 700rpx;
  overflow-y: auto;
}

.tag {
  display: inline-block;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  border-radius: 4rpx;
  color: #bdbdc0;
  background: transparent;
  background-color: rgba(189, 189, 192, 0.05);
  margin-right: 24rpx;
  margin-bottom: 24rpx;
  padding: 0 26rpx;
  font-size: 32rpx;
  border: 2rpx transparent solid;
  &.active {
    border: 2rpx #ffc86d solid;
  }
  &.focus {
    border: 2rpx #ffc86d solid;
  }
}
</style>

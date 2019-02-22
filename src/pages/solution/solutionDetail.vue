<template>
  <view class="app flex column j-between">
    <div class="soDetail">
      <div class="title">选择你最愿意看到的话题</div>
      <div class="tag box" hover-class="active" :class="activeIndex == index ?'lightColor' :''" v-for="(item,index) in titles" :key="index" @click="select(index)">
        {{item.name}}
      </div>
    </div>
    <div class="foot">
      <button v-if="!isFlag" class="titleButton flex center darkButton" @click="add">提交申请</button>
      <button v-else class="titleButton flex center darkButton" @click="add">修改</button>
      <span class="titleButtonSpan">你收到的咨询会在一定数量上接近该话题以后你也可以随时修改，并在次日生效</span>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      titles: [],
      title: {},
      isFlag: false,
      activeIndex: -1,
      islightColor: false
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
    add() {
      if (!this.title._id) {
        return wx.showToast({
          title: "请选择标签",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false
        });
      }
      this.$request.put("/tag", { _id: this.title._id });
      this.$router.push({ path: "/pages/solution/becomeSolutor" });
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    const { user } = getApp().globalData;
    if (user.becomeAnswererAt) {
      this.isFlag = true;
    }
    this.active = query.active;
    this.tiltes = this.getTags();
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
};
</script>
<style lang="less" scoped>
.soDetail {
  margin: 20rpx 60rpx 0 60rpx;
}
.title {
  margin: 40rpx 40rpx 40rpx 0;
  font-size: 34rpx;
}
.foot {
  margin: 60rpx;
  & button {
    margin-bottom: 40rpx;
  }
}
.lightColor {
  border: 2rpx #ffc86d solid;
  background-color: #ffffff;
}
.darkButton {
  width: 358rpx;
}
.titleButtonSpan {
  color: #a9a9a9;
  font-size: 28rpx;
}
</style>

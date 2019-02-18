<template>
  <view class="app flex column j-between">
    <div class="soDetail">
      <div class="title">选择你最愿意看到的话题</div>
      <div class="tag box" hover-class="active" 
          :class="activeIndex == index ?'lightColor' :''"
          v-for="(item,index) in titles" 
          :key="index" @click="select(index)"
      >
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
      activeIndex:-1,
      islightColor: false
    };
  },
  methods: {
    async tag() {
      await this.$request
        .get("/tag")
        .then(res => {
          this.titles = res.data;
        })
        .catch(err => {
          return console.log(err);
        });
    },
    select(index) {
      this.title = this.titles[index];
      this.activeIndex =index;
    },
    add() {
      this.$request.put("/tag", { _id: this.title._id }).then(res => {
        wx.showToast({
          title: "申请成功",
          icon: "none",
          duration: 1500,
          mask: false,
          success: result => {
            this.$router.push({ path: "/pages/solution/solutionRoom" });
          },
          fail: () => {},
          complete: () => {}
        });
      });
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    const { user } = getApp().globalData;
    if (user.becomeAnswererAt) {
      this.isFlag = true;
    }
    this.active = query.active;
    this.tiltes = this.tag();
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
  margin: 0 60rpx 60rpx 60rpx;
  & button {
    margin-bottom: 40rpx;
  }
}
.lightColor{
  border: 2rpx #ffc86d solid;
}
.titleButtonSpan {
  color: #a9a9a9;
  font-size: 22rpx;
}
</style>

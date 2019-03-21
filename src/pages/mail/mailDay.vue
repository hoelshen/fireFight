<template>
  <view class="page">
    <div
      v-for="item in list"
      :key="item._id"
      class="list shadow"
    >
      <div
        class="mailDay flex center"
        @click="showToast(index)"
      >
        来自
        <span class="mailDayName">{{ item.aliasName }}</span>的信将于 {{ item.createdAt | timeIntervalFormat }} 到达
      </div>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$request.get("/dialog/way/list");
      this.list = res.data;
    },
    showToast(){
      // const moments = this.$day()
      // wx.showToast({
      //   title: `到达时间`,
      //   icon: 'none',
      //   image: '',
      //   duration: 1500,
      //   mask: false,
      // })
    }
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
</script>
<style lang="less" scoped>
.page{
  padding: 40rpx 40rpx;
  background-color: #fffefb;
  height:100vh;
}
.list{
  margin-bottom: 40rpx;
  background-color: #fff;
}
.mailDay {
  height: 120rpx;
  font-size: 28rpx;
}
.mailDayName {
  font-size: 32rpx;
  color: #2b2b2b;
  font-weight: 600;
  margin: 0 12rpx;
}
</style>

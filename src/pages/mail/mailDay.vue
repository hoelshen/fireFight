<template>
  <view class="page">
    <div class="list shadow" v-for="item in list" :key="item._id">
      <div class="mailDay flex center" @click="showToast(index)">来自
        <span class="mailDayName">{{item.aliasName}}</span>的信于 {{item.createdAd | momentFormat}} 时到达</div>
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
  padding: 40rpx 60rpx;
  background-color: #fffefb;
  height:100vh;
}
.list{
  margin-bottom: 40rpx;
  background-color: #fff;
}
.mailDay {
  height: 120rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  font-size: 28rpx;
}
.mailDayName {
  font-size: 34rpx;
  color: #2b2b2b;
  margin: 0 12rpx;
}
</style>

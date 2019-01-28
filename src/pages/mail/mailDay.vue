<template>
  <view>
    <div
      class="list"
      v-for="item in list"
      :key="item._id"
    >
      <div class="mailDay flex center">来自
        <span class="mailDayName">{{item.fromUser.aliasName}}</span>的信于{{item.sentAt | dayFormat}}分到达</div>
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
    }
  }
};
</script>
<style lang="less">
.mailDay {
  width: 630rpx;
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

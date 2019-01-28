<template>
  <view>
    <div
      class="list"
      v-for="item,index in list"
      :key="index"
    >
      <div class="mailDay flex center">来自<span class="mailDayName">{{item.name}}</span>的信于12:52分到达</div>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: "sjh",
          id: 1
        },
        {
          name: "shj",
          id: 2
        }
      ]
    };
  },
  onShow() {},
  methods: {}
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
